import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { saveLocalMessage } from '../utils/localStore';
import toast from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitContact = async (data: ContactFormData) => {
    setLoading(true);
    setSuccess(false);

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error('Invalid email format');
      }

      // Validate required fields
      if (!data.name || !data.message) {
        throw new Error('Name and message are required');
      }

      if (supabase) {
        try {
          const { error } = await supabase
            .from('messages')
            .insert([
              {
                name: data.name.trim(),
                email: data.email.trim().toLowerCase(),
                company: data.company?.trim() || null,
                message: data.message.trim(),
              },
            ]);
          if (error) throw error;
        } catch (dbErr) {
          console.warn('Supabase submission failed, falling back to local storage:', dbErr);
          saveLocalMessage({
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            company: data.company?.trim(),
            message: data.message.trim(),
          });
        }
      } else {
        // Fallback to local storage persistence
        saveLocalMessage({
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          company: data.company?.trim(),
          message: data.message.trim(),
        });
      }

      setSuccess(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      return true;
    } catch (err) {
      console.error('Error submitting contact form:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to send message');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitContact, loading, success };
}
