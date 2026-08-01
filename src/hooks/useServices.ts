import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Service {
  id: string;
  number: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        
        if (!supabase) {
          setLoading(false);
          return;
        }
        
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true });

        if (servicesError) throw servicesError;

        const servicesWithTech = await Promise.all(
          (servicesData || []).map(async (service) => {
            if (!supabase) {
              return { ...service, technologies: [] };
            }
            
            const { data: techData } = await supabase
              .from('service_technologies')
              .select('technology')
              .eq('service_id', service.id);

            return {
              ...service,
              technologies: techData?.map((t) => t.technology) || [],
            };
          })
        );

        setServices(servicesWithTech);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return { services, loading, error };
}
