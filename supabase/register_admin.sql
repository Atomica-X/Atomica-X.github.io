-- =====================================================
-- REGISTER ADMIN USER IN SUPABASE AUTH & PUBLIC SCHEMA
-- Target Email: admin@vortx.io
-- Generated Password: Vortx!&dSWUQ8d4Mha
-- =====================================================

-- Ensure pgcrypto extension is active for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
  -- 1. Insert or Update User in Supabase Auth (auth.users)
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@vortx.io') THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@vortx.io',
      crypt('Vortx!&dSWUQ8d4Mha', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Vortx Administrator","role":"admin"}',
      false,
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );
  ELSE
    UPDATE auth.users
    SET encrypted_password = crypt('Vortx!&dSWUQ8d4Mha', gen_salt('bf')),
        email_confirmed_at = NOW(),
        updated_at = NOW()
    WHERE email = 'admin@vortx.io';
  END IF;

  -- 2. Insert or Update User in public.admins table
  IF NOT EXISTS (SELECT 1 FROM public.admins WHERE email = 'admin@vortx.io') THEN
    INSERT INTO public.admins (
      email,
      password_hash,
      full_name,
      role,
      is_active,
      created_at,
      updated_at
    ) VALUES (
      'admin@vortx.io',
      'SUPABASE_AUTH_MANAGED',
      'Vortx Administrator',
      'admin',
      true,
      NOW(),
      NOW()
    );
  ELSE
    UPDATE public.admins
    SET is_active = true,
        updated_at = NOW()
    WHERE email = 'admin@vortx.io';
  END IF;
END $$;
