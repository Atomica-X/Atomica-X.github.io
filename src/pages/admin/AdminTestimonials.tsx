import { useEffect, useState, FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Eye, EyeOff, Star as StarIcon } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  rating: number;
  avatar_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
}

const emptyForm = {
  name: '', role: '', company: '', location: '', quote: '',
  rating: 5, avatar_url: '', is_featured: false, is_published: true, display_order: 0,
};

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from('testimonials').select('*').order('display_order');
    if (error) toast.error(error.message);
    else setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm, display_order: items.length }); setModalOpen(true); };
  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({
      name: t.name, role: t.role, company: t.company, location: t.location,
      quote: t.quote, rating: t.rating, avatar_url: t.avatar_url || '',
      is_featured: t.is_featured, is_published: t.is_published, display_order: t.display_order,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    const payload = { ...form, avatar_url: form.avatar_url || null };
    if (editing) {
      const { error } = await supabase.from('testimonials').update(payload).eq('id', editing.id);
      if (error) toast.error(error.message);
      else { toast.success('Updated'); setModalOpen(false); fetchItems(); }
    } else {
      const { error } = await supabase.from('testimonials').insert([payload]);
      if (error) toast.error(error.message);
      else { toast.success('Created'); setModalOpen(false); fetchItems(); }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm('Delete this testimonial?')) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) toast.error(error.message); else { toast.success('Deleted'); fetchItems(); }
  };

  const togglePublish = async (t: Testimonial) => {
    if (!supabase) return;
    await supabase.from('testimonials').update({ is_published: !t.is_published }).eq('id', t.id);
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-white/50 text-sm mt-1">{items.length} total</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-white/30"><p>No testimonials yet</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((t) => (
            <div key={t.id} className="bg-[#12121a] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-medium">{t.name}</h3>
                  <p className="text-white/40 text-xs">{t.role} at {t.company}</p>
                  <p className="text-white/30 text-xs">{t.location}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => togglePublish(t)} className={`p-1.5 rounded-lg transition-all ${t.is_published ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-white/30 hover:bg-white/5'}`}>
                    {t.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={() => openEdit(t)} className="p-1.5 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/[0.08] rounded-lg transition-all"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} size={12} className={i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-white/10'} />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed line-clamp-3">"{t.quote}"</p>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-start justify-center overflow-y-auto py-10 px-4">
          <div className="bg-[#14141e] border border-white/[0.08] rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <h2 className="text-white font-semibold">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Inp label="Name" value={form.name} set={(v) => setForm({ ...form, name: v })} required />
                <Inp label="Role" value={form.role} set={(v) => setForm({ ...form, role: v })} required />
                <Inp label="Company" value={form.company} set={(v) => setForm({ ...form, company: v })} required />
                <Inp label="Location" value={form.location} set={(v) => setForm({ ...form, location: v })} required />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">Quote</label>
                <textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} required rows={3}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-colors resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Inp label="Rating (1-5)" value={String(form.rating)} set={(v) => setForm({ ...form, rating: Math.min(5, Math.max(1, Number(v) || 1)) })} type="number" />
                <Inp label="Avatar URL" value={form.avatar_url} set={(v) => setForm({ ...form, avatar_url: v })} />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
                  <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="accent-violet-500" /> Published
                </label>
                <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="accent-violet-500" /> Featured
                </label>
              </div>
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

function Inp({ label, value, set, type = 'text', required }: {
  label: string; value: string; set: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="text-white/50 text-xs font-medium mb-1.5 block">{label}</label>
      <input type={type} value={value} onChange={(e) => set(e.target.value)} required={required}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors" />
    </div>
  );
}
