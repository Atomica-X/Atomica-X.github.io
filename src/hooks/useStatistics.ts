import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Statistic {
  id: string;
  key: string;
  number: string;
  label: string;
  description: string | null;
}

export function useStatistics() {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        setLoading(true);
        
        if (!supabase) {
          setLoading(false);
          return;
        }
        
        const { data, error: fetchError } = await supabase
          .from('statistics')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true });

        if (fetchError) throw fetchError;

        setStatistics(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    }

    fetchStatistics();
  }, []);

  return { statistics, loading, error };
}
