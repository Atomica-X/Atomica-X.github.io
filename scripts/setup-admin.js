import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate secure 18-character password
function generateSecurePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
  let password = '';
  password += 'Vortx!';
  const randomBytes = crypto.randomBytes(12);
  for (let i = 0; i < 12; i++) {
    password += chars[randomBytes[i] % chars.length];
  }
  return password;
}

const adminEmail = 'admin@vortx.io';
const adminPassword = generateSecurePassword();

console.log('\n======================================================');
console.log('       VORTXLAB SUPABASE ADMIN REGISTRATION SCRIPT     ');
console.log('======================================================\n');
console.log(`Email:    ${adminEmail}`);
console.log(`Password: ${adminPassword}`);
console.log('\n======================================================\n');

// Generate SQL Script
const sqlContent = `-- =====================================================
-- REGISTER ADMIN USER IN SUPABASE AUTH & PUBLIC SCHEMA
-- Target Email: ${adminEmail}
-- Generated Password: ${adminPassword}
-- =====================================================

-- Ensure pgcrypto extension is active for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
  -- 1. Insert or Update User in Supabase Auth (auth.users)
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = '${adminEmail}') THEN
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
      '${adminEmail}',
      crypt('${adminPassword}', gen_salt('bf')),
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
    SET encrypted_password = crypt('${adminPassword}', gen_salt('bf')),
        email_confirmed_at = NOW(),
        updated_at = NOW()
    WHERE email = '${adminEmail}';
  END IF;

  -- 2. Insert or Update User in public.admins table
  IF NOT EXISTS (SELECT 1 FROM public.admins WHERE email = '${adminEmail}') THEN
    INSERT INTO public.admins (
      email,
      password_hash,
      full_name,
      role,
      is_active,
      created_at,
      updated_at
    ) VALUES (
      '${adminEmail}',
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
    WHERE email = '${adminEmail}';
  END IF;
END $$;
`;

const sqlFilePath = path.join(__dirname, '..', 'supabase', 'register_admin.sql');
fs.writeFileSync(sqlFilePath, sqlContent, 'utf-8');

console.log(`[✓] Generated SQL query saved to: supabase/register_admin.sql`);
console.log(`[i] To activate in Supabase:`);
console.log(`    1. Open your Supabase Dashboard -> SQL Editor`);
console.log(`    2. Paste and run the contents of supabase/register_admin.sql`);
console.log(`    3. Log in at /admin/login with email '${adminEmail}' and password '${adminPassword}'\n`);
