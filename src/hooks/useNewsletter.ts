import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { saveLocalSubscriber } from '../utils/localStore';
import toast from 'react-hot-toast';

export function useNewsletter() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const subscribe = async (email: string) => {
    setLoading(true);
    setSuccess(false);

    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      const cleanEmail = email.trim().toLowerCase();

      if (supabase) {
        try {
          // Check if already subscribed
          const { data: existing } = await supabase
            .from('newsletter')
            .select('id, is_active')
            .eq('email', cleanEmail)
            .single();

          if (existing) {
            if (existing.is_active) {
              toast('You\'re already subscribed!');
              return false;
            } else {
              // Reactivate subscription
              const { error } = await supabase
                .from('newsletter')
                .update({ is_active: true, unsubscribed_at: null })
                .eq('email', cleanEmail);

              if (error) throw error;
            }
          } else {
            // New subscription
            const { error } = await supabase
              .from('newsletter')
              .insert([{ email: cleanEmail }]);

            if (error) throw error;
          }
        } catch (dbErr) {
          console.warn('Supabase newsletter subscription failed, falling back to local storage:', dbErr);
          const { alreadySubscribed } = saveLocalSubscriber(cleanEmail);
          if (alreadySubscribed) {
            toast('You\'re already subscribed!');
            return false;
          }
        }
      } else {
        const { alreadySubscribed } = saveLocalSubscriber(cleanEmail);
        if (alreadySubscribed) {
          toast('You\'re already subscribed!');
          return false;
        }
      }

      setSuccess(true);
      toast.success('Successfully subscribed to our newsletter!');
      return true;
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to subscribe');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading, success };
}
