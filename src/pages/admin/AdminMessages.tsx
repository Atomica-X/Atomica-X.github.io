import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
  getLocalMessages,
  updateLocalMessage,
  deleteLocalMessage,
} from '../../utils/localStore';
import toast from 'react-hot-toast';
import { Mail, Trash2, Archive, ArchiveRestore, ChevronDown, ChevronUp, X } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  is_read: boolean;
  is_archived: boolean;
  admin_notes: string | null;
  created_at: string;
}

type Filter = 'all' | 'unread' | 'archived';

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [noteModal, setNoteModal] = useState<Message | null>(null);
  const [noteText, setNoteText] = useState('');

  const fetchMessages = async () => {
    setLoading(true);
    if (!supabase) {
      const local = getLocalMessages();
      let filtered = local;
      if (filter === 'unread') filtered = local.filter((m) => !m.is_read);
      if (filter === 'archived') filtered = local.filter((m) => m.is_archived);
      if (filter === 'all') filtered = local.filter((m) => !m.is_archived);
      setMessages(filtered);
      setLoading(false);
      return;
    }

    try {
      let query = supabase.from('messages').select('*').order('created_at', { ascending: false });
      if (filter === 'unread') query = query.eq('is_read', false);
      if (filter === 'archived') query = query.eq('is_archived', true);
      if (filter === 'all') query = query.eq('is_archived', false);
      const { data, error } = await query;
      if (error) throw error;
      setMessages(data || []);
    } catch {
      const local = getLocalMessages();
      let filtered = local;
      if (filter === 'unread') filtered = local.filter((m) => !m.is_read);
      if (filter === 'archived') filtered = local.filter((m) => m.is_archived);
      if (filter === 'all') filtered = local.filter((m) => !m.is_archived);
      setMessages(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const markRead = async (m: Message) => {
    if (supabase) {
      try {
        await supabase.from('messages').update({ is_read: true }).eq('id', m.id);
      } catch {
        updateLocalMessage(m.id, { is_read: true });
      }
    } else {
      updateLocalMessage(m.id, { is_read: true });
    }
    fetchMessages();
  };

  const toggleArchive = async (m: Message) => {
    if (supabase) {
      try {
        await supabase.from('messages').update({ is_archived: !m.is_archived }).eq('id', m.id);
      } catch {
        updateLocalMessage(m.id, { is_archived: !m.is_archived });
      }
    } else {
      updateLocalMessage(m.id, { is_archived: !m.is_archived });
    }
    toast.success(m.is_archived ? 'Unarchived' : 'Archived');
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this message?')) return;
    if (supabase) {
      try {
        const { error } = await supabase.from('messages').delete().eq('id', id);
        if (error) throw error;
      } catch {
        deleteLocalMessage(id);
      }
    } else {
      deleteLocalMessage(id);
    }
    toast.success('Deleted');
    fetchMessages();
  };

  const saveNote = async () => {
    if (!noteModal) return;
    if (supabase) {
      try {
        await supabase.from('messages').update({ admin_notes: noteText || null }).eq('id', noteModal.id);
      } catch {
        updateLocalMessage(noteModal.id, { admin_notes: noteText || null });
      }
    } else {
      updateLocalMessage(noteModal.id, { admin_notes: noteText || null });
    }
    toast.success('Note saved');
    setNoteModal(null);
    fetchMessages();
  };

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'Inbox' },
    { key: 'unread', label: 'Unread' },
    { key: 'archived', label: 'Archived' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-white/50 text-sm mt-1">Contact form submissions</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f.key
                ? 'bg-white/[0.08] text-white'
                : 'text-white/40 hover:text-white/60 hover:bg-white/[0.04]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <Mail size={32} className="mx-auto mb-3 opacity-50" />
          <p>No messages</p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`bg-[#12121a] border rounded-xl transition-all ${
                m.is_read ? 'border-white/[0.06]' : 'border-violet-500/20 bg-violet-500/[0.02]'
              }`}
            >
              <div
                className="p-4 flex items-start gap-3 cursor-pointer"
                onClick={() => {
                  setExpanded(expanded === m.id ? null : m.id);
                  if (!m.is_read) markRead(m);
                }}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    m.is_read ? 'bg-white/15' : 'bg-violet-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white text-sm font-medium">{m.name}</span>
                    {m.company && <span className="text-white/30 text-xs">• {m.company}</span>}
                  </div>
                  <p className="text-white/40 text-xs">{m.email}</p>
                  {expanded !== m.id && (
                    <p className="text-white/50 text-xs mt-1 truncate">{m.message}</p>
                  )}
                </div>
                <span className="text-white/25 text-[10px] shrink-0">
                  {new Date(m.created_at).toLocaleDateString()}
                </span>
                {expanded === m.id ? (
                  <ChevronUp size={14} className="text-white/30 shrink-0 mt-1" />
                ) : (
                  <ChevronDown size={14} className="text-white/30 shrink-0 mt-1" />
                )}
              </div>

              {expanded === m.id && (
                <div className="px-4 pb-4 pl-9 space-y-3">
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                    {m.message}
                  </p>
                  {m.admin_notes && (
                    <div className="bg-amber-500/[0.06] border border-amber-500/10 rounded-lg p-3">
                      <p className="text-amber-400/80 text-xs font-medium mb-1">Admin Note</p>
                      <p className="text-white/50 text-xs">{m.admin_notes}</p>
                    </div>
                  )}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => {
                        setNoteModal(m);
                        setNoteText(m.admin_notes || '');
                      }}
                      className="px-3 py-1.5 text-xs text-white/50 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-all"
                    >
                      {m.admin_notes ? 'Edit Note' : 'Add Note'}
                    </button>
                    <button
                      onClick={() => toggleArchive(m)}
                      className="px-3 py-1.5 text-xs text-white/50 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-all flex items-center gap-1"
                    >
                      {m.is_archived ? (
                        <>
                          <ArchiveRestore size={12} /> Unarchive
                        </>
                      ) : (
                        <>
                          <Archive size={12} /> Archive
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="px-3 py-1.5 text-xs text-red-400/60 hover:text-red-400 bg-red-500/[0.04] hover:bg-red-500/[0.08] rounded-lg transition-all flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Note Modal */}
      {noteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center px-4">
          <div className="bg-[#14141e] border border-white/[0.08] rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <h2 className="text-white font-semibold text-sm">Admin Note</h2>
              <button onClick={() => setNoteModal(null)} className="text-white/40 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
                placeholder="Add internal notes..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors resize-none"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setNoteModal(null)}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNote}
                  className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
