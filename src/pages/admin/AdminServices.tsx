import { useEffect, useState, FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react';

interface Service {
  id: string;
  number: string;
  title: string;
  slug: string;
  description: string;
  icon_name: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
}

const emptyForm = {
  number: '', title: '', slug: '', description: '', icon_name: '',
  is_published: true, display_order: 0,
};

export default function AdminServices() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from('services').select('*').order('display_order');
    if (error) toast.error(error.message);
    else setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm, display_order: items.length }); setModalOpen(true); };
  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({ number: s.number, title: s.title, slug: s.slug, description: s.description, icon_name: s.icon_name || '', is_published: s.is_published, display_order: s.display_order });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    const payload = { ...form, slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'), icon_name: form.icon_name || null };
    if (editing) {
      const { error } = await supabase.from('services').update(payload).eq('id', editing.id);
      if (error) toast.error(error.message);
      else { toast.success('Updated'); setModalOpen(false); fetchItems(); }
    } else {
      const { error } = await supabase.from('services').insert([payload]);
      if (error) toast.error(error.message);
      else { toast.success('Created'); setModalOpen(false); fetchItems(); }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm('Delete this service?')) return;
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) toast.error(error.message); else { toast.success('Deleted'); fetchItems(); }
  };

  const togglePublish = async (s: Service) => {
    if (!supabase) return;
    await supabase.from('services').update({ is_published: !s.is_published }).eq('id', s.id);
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-white/50 text-sm mt-1">{items.length} total</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-white/30"><p>No services yet</p></div>
      ) : (
        <div className="bg-[#12121a] border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/[0.06]">
              <th className="text-left text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">#</th>
              <th className="text-left text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">Title</th>
              <th className="text-left text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">Description</th>
              <th className="text-left text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">Status</th>
              <th className="text-right text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-white/[0.04]">
              {items.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-white/40 font-mono">{s.number}</td>
                  <td className="px-4 py-3 text-white font-medium">{s.title}</td>
                  <td className="px-4 py-3 text-white/50 max-w-xs truncate">{s.description}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublish(s)} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${s.is_published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
                      {s.is_published ? <><Eye size={12} /> Live</> : <><EyeOff size={12} /> Draft</>}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(s)} className="p-2 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(s.id)} className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/[0.08] rounded-lg transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-start justify-center overflow-y-auto py-10 px-4">
          <div className="bg-[#14141e] border border-white/[0.08] rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <h2 className="text-white font-semibold">{editing ? 'Edit Service' : 'New Service'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Number" value={form.number} set={(v) => setForm({ ...form, number: v })} required placeholder="01" />
                <Field label="Title" value={form.title} set={(v) => setForm({ ...form, title: v })} required />
              </div>
              <Field label="Slug" value={form.slug} set={(v) => setForm({ ...form, slug: v })} placeholder="auto-generated" />
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-colors resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Icon Name" value={form.icon_name} set={(v) => setForm({ ...form, icon_name: v })} />
                <Field label="Display Order" value={String(form.display_order)} set={(v) => setForm({ ...form, display_order: Number(v) || 0 })} type="number" />
              </div>
              <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="accent-violet-500" />
                Published
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 disabled:opacity-50 transition-colors">
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, set, type = 'text', required, placeholder }: {
  label: string; value: string; set: (v: string) => void; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-white/50 text-xs font-medium mb-1.5 block">{label}</label>
      <input type={type} value={value} onChange={(e) => set(e.target.value)} required={required} placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors" />
    </div>
  );
}
