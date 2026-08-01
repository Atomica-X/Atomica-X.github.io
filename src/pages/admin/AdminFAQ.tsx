import { useEffect, useState, FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
}

const emptyForm = { question: '', answer: '', category: '', is_published: true, display_order: 0 };

export default function AdminFAQ() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from('faq').select('*').order('display_order');
    if (error) toast.error(error.message);
    else setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm, display_order: items.length }); setModalOpen(true); };
  const openEdit = (f: FAQ) => {
    setEditing(f);
    setForm({ question: f.question, answer: f.answer, category: f.category || '', is_published: f.is_published, display_order: f.display_order });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    const payload = { ...form, category: form.category || null };
    if (editing) {
      const { error } = await supabase.from('faq').update(payload).eq('id', editing.id);
      if (error) toast.error(error.message);
      else { toast.success('Updated'); setModalOpen(false); fetchItems(); }
    } else {
      const { error } = await supabase.from('faq').insert([payload]);
      if (error) toast.error(error.message);
      else { toast.success('Created'); setModalOpen(false); fetchItems(); }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm('Delete this FAQ?')) return;
    const { error } = await supabase.from('faq').delete().eq('id', id);
    if (error) toast.error(error.message); else { toast.success('Deleted'); fetchItems(); }
  };

  const togglePublish = async (f: FAQ) => {
    if (!supabase) return;
    await supabase.from('faq').update({ is_published: !f.is_published }).eq('id', f.id);
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">FAQ</h1>
          <p className="text-white/50 text-sm mt-1">{items.length} questions</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors">
          <Plus size={16} /> Add Question
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-white/30"><p>No FAQs yet</p></div>
      ) : (
        <div className="space-y-3">
          {items.map((f) => (
            <div key={f.id} className="bg-[#12121a] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium text-sm">{f.question}</h3>
                    {f.category && <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400">{f.category}</span>}
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{f.answer}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => togglePublish(f)} className={`p-1.5 rounded-lg transition-all ${f.is_published ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-white/30 hover:bg-white/5'}`}>
                    {f.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={() => openEdit(f)} className="p-1.5 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(f.id)} className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/[0.08] rounded-lg transition-all"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-start justify-center overflow-y-auto py-10 px-4">
          <div className="bg-[#14141e] border border-white/[0.08] rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <h2 className="text-white font-semibold">{editing ? 'Edit FAQ' : 'New FAQ'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">Question</label>
                <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-colors" />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">Answer</label>
                <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required rows={4}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-colors resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-colors" />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">Display Order</label>
                  <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) || 0 })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-colors" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="accent-violet-500" /> Published
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
