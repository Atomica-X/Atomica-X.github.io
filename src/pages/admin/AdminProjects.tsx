import { useEffect, useState, FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, GripVertical, Eye, EyeOff } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  slug: string;
  industry: string;
  client: string;
  problem: string;
  solution: string;
  outcome: string;
  timeline: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  gradient_class: string | null;
  image_url: string | null;
  created_at: string;
}

const emptyProject = {
  name: '', slug: '', industry: '', client: '', problem: '', solution: '',
  outcome: '', timeline: '', is_featured: false, is_published: true,
  display_order: 0, gradient_class: '', image_url: '',
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) { toast.error(error.message); }
    else setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyProject, display_order: projects.length });
    setModalOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      name: p.name, slug: p.slug, industry: p.industry, client: p.client,
      problem: p.problem, solution: p.solution, outcome: p.outcome,
      timeline: p.timeline || '', is_featured: p.is_featured,
      is_published: p.is_published, display_order: p.display_order,
      gradient_class: p.gradient_class || '', image_url: p.image_url || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    const payload = {
      ...form,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
      timeline: form.timeline || null,
      gradient_class: form.gradient_class || null,
      image_url: form.image_url || null,
    };
    if (editing) {
      const { error } = await supabase.from('projects').update(payload).eq('id', editing.id);
      if (error) toast.error(error.message);
      else { toast.success('Project updated'); setModalOpen(false); fetchProjects(); }
    } else {
      const { error } = await supabase.from('projects').insert([payload]);
      if (error) toast.error(error.message);
      else { toast.success('Project created'); setModalOpen(false); fetchProjects(); }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm('Delete this project?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) toast.error(error.message);
    else { toast.success('Deleted'); fetchProjects(); }
  };

  const togglePublish = async (p: Project) => {
    if (!supabase) return;
    const { error } = await supabase.from('projects').update({ is_published: !p.is_published }).eq('id', p.id);
    if (error) toast.error(error.message);
    else fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-white/50 text-sm mt-1">{projects.length} total projects</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <p className="text-lg">No projects yet</p>
          <p className="text-sm mt-1">Create your first project to get started.</p>
        </div>
      ) : (
        <div className="bg-[#12121a] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">Order</th>
                  <th className="text-left text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">Name</th>
                  <th className="text-left text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">Industry</th>
                  <th className="text-left text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">Client</th>
                  <th className="text-left text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">Status</th>
                  <th className="text-right text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-white/30"><GripVertical size={14} className="inline" /> {p.display_order}</td>
                    <td className="px-4 py-3 text-white font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-white/60">{p.industry}</td>
                    <td className="px-4 py-3 text-white/60">{p.client}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => togglePublish(p)} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${p.is_published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
                        {p.is_published ? <><Eye size={12} /> Published</> : <><EyeOff size={12} /> Draft</>}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(p)} className="p-2 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/[0.08] rounded-lg transition-all"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-start justify-center overflow-y-auto py-10 px-4">
          <div className="bg-[#14141e] border border-white/[0.08] rounded-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <h2 className="text-white font-semibold">{editing ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <InputField label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="auto-generated" />
                <InputField label="Industry" value={form.industry} onChange={(v) => setForm({ ...form, industry: v })} required />
                <InputField label="Client" value={form.client} onChange={(v) => setForm({ ...form, client: v })} required />
                <InputField label="Timeline" value={form.timeline} onChange={(v) => setForm({ ...form, timeline: v })} />
                <InputField label="Display Order" value={String(form.display_order)} onChange={(v) => setForm({ ...form, display_order: Number(v) || 0 })} type="number" />
              </div>
              <TextareaField label="Problem" value={form.problem} onChange={(v) => setForm({ ...form, problem: v })} required />
              <TextareaField label="Solution" value={form.solution} onChange={(v) => setForm({ ...form, solution: v })} required />
              <TextareaField label="Outcome" value={form.outcome} onChange={(v) => setForm({ ...form, outcome: v })} required />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Gradient Class" value={form.gradient_class} onChange={(v) => setForm({ ...form, gradient_class: v })} />
                <InputField label="Image URL" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
                  <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="accent-violet-500" />
                  Published
                </label>
                <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="accent-violet-500" />
                  Featured
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

function InputField({ label, value, onChange, type = 'text', required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-white/50 text-xs font-medium mb-1.5 block">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors" />
    </div>
  );
}

function TextareaField({ label, value, onChange, required }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div>
      <label className="text-white/50 text-xs font-medium mb-1.5 block">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} required={required} rows={3}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors resize-none" />
    </div>
  );
}
