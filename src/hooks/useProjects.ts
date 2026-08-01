import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Project {
  id: string;
  name: string;
  slug: string;
  industry: string;
  client: string;
  problem: string;
  solution: string;
  outcome: string;
  timeline: string | null;
  gradient_class: string | null;
  image_url: string | null;
  technologies: string[];
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        
        // If Supabase is not configured, just finish loading with empty array
        if (!supabase) {
          setLoading(false);
          return;
        }
        
        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true });

        if (projectsError) throw projectsError;

        // Fetch technologies for each project
        const projectsWithTech = await Promise.all(
          (projectsData || []).map(async (project) => {
            if (!supabase) {
              return { ...project, technologies: [] };
            }
            
            const { data: techData } = await supabase
              .from('project_technologies')
              .select('technology')
              .eq('project_id', project.id);

            return {
              ...project,
              technologies: techData?.map((t) => t.technology) || [],
            };
          })
        );

        setProjects(projectsWithTech);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}
