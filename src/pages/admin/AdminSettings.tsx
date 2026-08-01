import { useEffect, useState, FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { Save, RefreshCw } from 'lucide-react';

interface Setting {
  id: string;
  key: string;
  value: string | null;
  type: string;
  group_name: string | null;
  description: string | null;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});

  const fetchSettings = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from('website_settings').select('*').order('group_name').order('key');
    if (error) toast.error(error.message);
    else {
      setSettings(data || []);
      const values: Record<string, string> = {};
      (data || []).forEach((s) => { values[s.id] = s.value || ''; });
      setEditedValues(values);
    }
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    try {
      for (const setting of settings) {
        const newValue = editedValues[setting.id];
        if (newValue !== (setting.value || '')) {
          const { error } = await supabase.from('website_settings').update({ value: newValue || null }).eq('id', setting.id);
          if (error) throw error;
        }
      }
      toast.success('Settings saved');
      fetchSettings();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  // Group settings by group_name
  const groups = settings.reduce<Record<string, Setting[]>>((acc, s) => {
    const group = s.group_name || 'General';
    if (!acc[group]) acc[group] = [];
    acc[group].push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-white/50 text-sm mt-1">Website configuration</p>
        </div>
        <button onClick={fetchSettings} className="p-2 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all">
          <RefreshCw size={18} />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>
      ) : settings.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <p>No settings configured yet.</p>
          <p className="text-xs mt-1">Add entries to the website_settings table in Supabase.</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {Object.entries(groups).map(([groupName, groupSettings]) => (
            <div key={groupName} className="bg-[#12121a] border border-white/[0.06] rounded-xl">
              <div className="p-5 border-b border-white/[0.06]">
                <h2 className="text-white font-semibold text-sm">{groupName}</h2>
              </div>
              <div className="p-5 space-y-4">
                {groupSettings.map((s) => (
                  <div key={s.id}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <label className="text-white/60 text-xs font-medium">{s.key}</label>
                      <span className="text-[10px] text-white/20 font-mono">({s.type})</span>
                    </div>
                    {s.description && <p className="text-white/30 text-[11px] mb-1.5">{s.description}</p>}
                    {s.type === 'textarea' ? (
                      <textarea
                        value={editedValues[s.id] || ''}
                        onChange={(e) => setEditedValues({ ...editedValues, [s.id]: e.target.value })}
                        rows={3}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-colors resize-none"
                      />
                    ) : s.type === 'boolean' ? (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editedValues[s.id] === 'true'}
                          onChange={(e) => setEditedValues({ ...editedValues, [s.id]: e.target.checked ? 'true' : 'false' })}
                          className="accent-violet-500"
                        />
                        <span className="text-white/50 text-sm">{editedValues[s.id] === 'true' ? 'Enabled' : 'Disabled'}</span>
                      </label>
                    ) : (
                      <input
                        type="text"
                        value={editedValues[s.id] || ''}
                        onChange={(e) => setEditedValues({ ...editedValues, [s.id]: e.target.value })}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-colors"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 disabled:opacity-50 transition-colors">
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
