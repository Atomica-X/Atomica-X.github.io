import { useEffect, useState, FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react';

interface Stat {
  id: string;
  key: string;
  number: string;
  label: string;
  description: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
}

const emptyForm = { key: '', number: '', label: '', description: '', display_order: 0, is_published: true };

export default function AdminStatistics() {
  const [items, setItems] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Stat | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from('statistics').select('*').order('display_order');
    if (error) toast.error(error.message);
    else setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm, display_order: items.length }); setModalOpen(true); };
  const openEdit = (s: Stat) => {
    setEditing(s);
    setForm({ key: s.key, number: s.number, label: s.label, description: s.description || '', display_order: s.display_order, is_published: s.is_published });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    const payload = { ...form, description: form.description || null };
    if (editing) {
      const { error } = await supabase.from('statistics').update(payload).eq('id', editing.id);
      if (error) toast.error(error.message);
      else { toast.success('Updated'); setModalOpen(false); fetchItems(); }
    } else {
      const { error } = await supabase.from('statistics').insert([payload]);
      if (error) toast.error(error.message);
      else { toast.success('Created'); setModalOpen(false); fetchItems(); }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm('Delete this statistic?')) return;
    const { error } = await supabase.from('statistics').delete().eq('id', id);
    if (error) toast.error(error.message); else { toast.success('Deleted'); fetchItems(); }
  };

  const togglePublish = async (s: Stat) => {
    if (!supabase) return;
    await supabase.from('statistics').update({ is_published: !s.is_published }).eq('id', s.id);
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Statistics</h1>
          <p className="text-white/50 text-sm mt-1">{items.length} entries</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors">
          <Plus size={16} /> Add Stat
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-white/30"><p>No statistics yet</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((s) => (
            <div key={s.id} className="bg-[#12121a] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs text-white/30 font-mono">{s.key}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => togglePublish(s)} className={`p-1.5 rounded-lg transition-all ${s.is_published ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-white/30 hover:bg-white/5'}`}>
                    {s.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={() => openEdit(s)} className="p-1.5 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(s.id)} className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/[0.08] rounded-lg transition-all"><Trash2 size={14} /></button>
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{s.number}</p>
              <p className="text-white/60 text-sm mt-1">{s.label}</p>
              {s.description && <p className="text-white/30 text-xs mt-2">{s.description}</p>}
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-start justify-center overflow-y-auto py-10 px-4">
          <div className="bg-[#14141e] border border-white/[0.08] rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <h2 className="text-white font-semibold">{editing ? 'Edit Statistic' : 'New Statistic'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Inp label="Key" value={form.key} set={(v) => setForm({ ...form, key: v })} required placeholder="e.g. clients" />
                <Inp label="Number" value={form.number} set={(v) => setForm({ ...form, number: v })} required placeholder="e.g. 150+" />
              </div>
              <Inp label="Label" value={form.label} set={(v) => setForm({ ...form, label: v })} required placeholder="e.g. Happy Clients" />
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-colors resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Inp label="Display Order" value={String(form.display_order)} set={(v) => setForm({ ...form, display_order: Number(v) || 0 })} type="number" />
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
                    <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="accent-violet-500" /> Published
                  </label>
                </div>
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

function Inp({ label, value, set, type = 'text', required, placeholder }: {
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
