import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
}

export function useFAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        setLoading(true);
        
        if (!supabase) {
          setLoading(false);
          return;
        }
        
        const { data, error: fetchError } = await supabase
          .from('faq')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true });

        if (fetchError) throw fetchError;

        setFaqs(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch FAQs');
      } finally {
        setLoading(false);
      }
    }

    fetchFAQs();
  }, []);

  return { faqs, loading, error };
}
