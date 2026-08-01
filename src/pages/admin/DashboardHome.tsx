import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { getLocalMessages, getLocalSubscribers } from '../../utils/localStore';
import {
  Briefcase, Wrench, MessageSquare, Star, HelpCircle,
  BarChart3, Newspaper, TrendingUp, Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  projects: number;
  services: number;
  testimonials: number;
  faqs: number;
  messages: number;
  unreadMessages: number;
  newsletter: number;
  statistics: number;
}

const defaultStats: DashboardStats = {
  projects: 6, services: 6, testimonials: 3, faqs: 4,
  messages: 0, unreadMessages: 0, newsletter: 0, statistics: 4,
};

export default function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [loading, setLoading] = useState(true);
  const [recentMessages, setRecentMessages] = useState<Array<{
    id: string; name: string; email: string; message: string;
    is_read: boolean; created_at: string;
  }>>([]);

  useEffect(() => {
    async function load() {
      if (!supabase) {
        const msgs = getLocalMessages();
        const subs = getLocalSubscribers();
        setStats({
          projects: 6, services: 6, testimonials: 3, faqs: 4, statistics: 4,
          messages: msgs.length,
          unreadMessages: msgs.filter((m) => !m.is_read).length,
          newsletter: subs.filter((s) => s.is_active).length,
        });
        setRecentMessages(msgs.slice(0, 5));
        setLoading(false);
        return;
      }
      try {
        const [
          { count: projects },
          { count: services },
          { count: testimonials },
          { count: faqs },
          { count: messages },
          { count: unread },
          { count: newsletter },
          { count: statistics },
        ] = await Promise.all([
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('services').select('*', { count: 'exact', head: true }),
          supabase.from('testimonials').select('*', { count: 'exact', head: true }),
          supabase.from('faq').select('*', { count: 'exact', head: true }),
          supabase.from('messages').select('*', { count: 'exact', head: true }),
          supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
          supabase.from('newsletter').select('*', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('statistics').select('*', { count: 'exact', head: true }),
        ]);

        const msgs = getLocalMessages();
        const subs = getLocalSubscribers();
        const totalMsgs = (messages ?? 0) > 0 ? (messages ?? 0) : msgs.length;
        const unreadMsgs = (unread ?? 0) > 0 ? (unread ?? 0) : msgs.filter((m) => !m.is_read).length;
        const activeSubs = (newsletter ?? 0) > 0 ? (newsletter ?? 0) : subs.filter((s) => s.is_active).length;

        setStats({
          projects: projects ?? 6, services: services ?? 6,
          testimonials: testimonials ?? 3, faqs: faqs ?? 4,
          messages: totalMsgs, unreadMessages: unreadMsgs,
          newsletter: activeSubs, statistics: statistics ?? 4,
        });

        const { data: dbMsgs } = await supabase
          .from('messages')
          .select('id, name, email, message, is_read, created_at')
          .order('created_at', { ascending: false })
          .limit(5);
        
        setRecentMessages(dbMsgs && dbMsgs.length > 0 ? dbMsgs : msgs.slice(0, 5));
      } catch {
        const msgs = getLocalMessages();
        const subs = getLocalSubscribers();
        setStats({
          projects: 6, services: 6, testimonials: 3, faqs: 4, statistics: 4,
          messages: msgs.length,
          unreadMessages: msgs.filter((m) => !m.is_read).length,
          newsletter: subs.filter((s) => s.is_active).length,
        });
        setRecentMessages(msgs.slice(0, 5));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    { label: 'Projects', value: stats.projects, icon: Briefcase, color: 'from-violet-500 to-purple-600', to: '/admin/projects' },
    { label: 'Services', value: stats.services, icon: Wrench, color: 'from-blue-500 to-cyan-500', to: '/admin/services' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, color: 'from-amber-500 to-orange-500', to: '/admin/testimonials' },
    { label: 'FAQ', value: stats.faqs, icon: HelpCircle, color: 'from-emerald-500 to-teal-500', to: '/admin/faq' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'from-rose-500 to-pink-500', to: '/admin/messages', badge: stats.unreadMessages },
    { label: 'Subscribers', value: stats.newsletter, icon: Newspaper, color: 'from-indigo-500 to-violet-500', to: '/admin/newsletter' },
    { label: 'Statistics', value: stats.statistics, icon: BarChart3, color: 'from-fuchsia-500 to-pink-500', to: '/admin/statistics' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/50 text-sm mt-1">Welcome back. Here's an overview of your site.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="group relative bg-[#12121a] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider">{card.label}</p>
                <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center opacity-80`}>
                <card.icon size={18} className="text-white" />
              </div>
            </div>
            {card.badge && card.badge > 0 ? (
              <span className="absolute top-3 right-14 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {card.badge}
              </span>
            ) : null}
            <div className="flex items-center gap-1 mt-3 text-white/30 group-hover:text-white/50 text-xs transition-colors">
              <TrendingUp size={12} />
              <span>View all →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="bg-[#12121a] border border-white/[0.06] rounded-xl">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-white/50" />
            <h2 className="text-white font-semibold text-sm">Recent Messages</h2>
          </div>
          <Link to="/admin/messages" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
            View all
          </Link>
        </div>
        {recentMessages.length === 0 ? (
          <div className="p-8 text-center text-white/30 text-sm">
            <Users size={32} className="mx-auto mb-3 opacity-50" />
            <p>No messages yet</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="p-4 flex items-start gap-3 hover:bg-white/[0.02] transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${msg.is_read ? 'bg-white/20' : 'bg-violet-500'}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-sm font-medium">{msg.name}</span>
                    <span className="text-white/30 text-xs">{msg.email}</span>
                  </div>
                  <p className="text-white/50 text-xs truncate">{msg.message}</p>
                </div>
                <span className="text-white/30 text-[10px] shrink-0">
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
