import { createClient } from '@supabase/supabase-js';

// Environment variables - NEVER expose service role key to client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate env vars - must be non-empty strings
const hasUrl = supabaseUrl && supabaseUrl.trim().length > 0;
const hasKey = supabaseAnonKey && supabaseAnonKey.trim().length > 0;

// Create Supabase client with anon key (safe for client-side)
// If env vars are missing, set to null so app works without backend
export const supabase = (hasUrl && hasKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => supabase !== null;

// Database types
export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          full_name: string;
          role: string;
          avatar_url: string | null;
          is_active: boolean;
          last_login_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['admins']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['admins']['Insert']>;
      };
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company: string | null;
          phone: string | null;
          is_subscribed: boolean;
          subscription_date: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      projects: {
        Row: {
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
          updated_at: string;
        };
      };
      services: {
        Row: {
          id: string;
          number: string;
          title: string;
          slug: string;
          description: string;
          icon_name: string | null;
          is_published: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
      };
      statistics: {
        Row: {
          id: string;
          key: string;
          number: string;
          label: string;
          description: string | null;
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string;
          company: string;
          location: string;
          quote: string;
          rating: number;
          avatar_url: string | null;
          is_featured: boolean;
          is_published: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
      };
      faq: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string | null;
          is_published: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
      };
      messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          message: string;
          is_read: boolean;
          is_archived: boolean;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      newsletter: {
        Row: {
          id: string;
          email: string;
          is_active: boolean;
          unsubscribed_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      media: {
        Row: {
          id: string;
          filename: string;
          original_filename: string;
          file_path: string;
          file_url: string;
          file_size: number | null;
          mime_type: string | null;
          width: number | null;
          height: number | null;
          alt_text: string | null;
          uploaded_by: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      website_settings: {
        Row: {
          id: string;
          key: string;
          value: string | null;
          type: string;
          group_name: string | null;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      seo: {
        Row: {
          id: string;
          page: string;
          title: string | null;
          description: string | null;
          keywords: string | null;
          og_title: string | null;
          og_description: string | null;
          og_image: string | null;
          twitter_title: string | null;
          twitter_description: string | null;
          twitter_image: string | null;
          canonical_url: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}
