import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
  getLocalSubscribers,
  updateLocalSubscriber,
  deleteLocalSubscriber,
} from '../../utils/localStore';
import toast from 'react-hot-toast';
import { Trash2, Mail, Search } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  is_active: boolean;
  unsubscribed_at: string | null;
  created_at: string;
}

export default function AdminNewsletter() {
  const [items, setItems] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    if (!supabase) {
      setItems(getLocalSubscribers());
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('newsletter')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch {
      setItems(getLocalSubscribers());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this subscriber?')) return;
    if (supabase) {
      try {
        const { error } = await supabase.from('newsletter').delete().eq('id', id);
        if (error) throw error;
      } catch {
        deleteLocalSubscriber(id);
      }
    } else {
      deleteLocalSubscriber(id);
    }
    toast.success('Removed');
    fetchItems();
  };

  const toggleActive = async (s: Subscriber) => {
    const updateData = s.is_active
      ? { is_active: false, unsubscribed_at: new Date().toISOString() }
      : { is_active: true, unsubscribed_at: null };

    if (supabase) {
      try {
        await supabase.from('newsletter').update(updateData).eq('id', s.id);
      } catch {
        updateLocalSubscriber(s.id, updateData);
      }
    } else {
      updateLocalSubscriber(s.id, updateData);
    }
    fetchItems();
  };

  const filtered = items.filter((s) => s.email.toLowerCase().includes(search.toLowerCase()));
  const activeCount = items.filter((s) => s.is_active).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Newsletter</h1>
          <p className="text-white/50 text-sm mt-1">
            {activeCount} active / {items.length} total subscribers
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email..."
          className="w-full bg-[#12121a] border border-white/[0.06] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <Mail size={32} className="mx-auto mb-3 opacity-50" />
          <p>{search ? 'No results' : 'No subscribers yet'}</p>
        </div>
      ) : (
        <div className="bg-[#12121a] border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">
                  Email
                </th>
                <th className="text-left text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">
                  Subscribed
                </th>
                <th className="text-right text-white/40 font-medium px-4 py-3 text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-white">{s.email}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(s)}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        s.is_active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'
                      }`}
                    >
                      {s.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs">
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/[0.08] rounded-lg transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
