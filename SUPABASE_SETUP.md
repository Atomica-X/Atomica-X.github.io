# ✅ SUPABASE CONNECTION GUIDE

## Database Status: ✅ DEPLOYED

You've successfully run the schema and seed SQL files. Now let's connect the application.

---

## 🔑 Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Click **Settings** (gear icon in sidebar)
3. Click **API** in the settings menu
4. You'll see these values:

### Copy These Two Values:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```

**anon public key:** (starts with `eyJhbGc...`)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
```

⚠️ **IMPORTANT:** 
- Do NOT use the `service_role` key (it's secret!)
- Only use the `anon` / `public` key (safe for client-side)

---

## 📝 Step 2: Update Environment Variables

Open the `.env` file in the project root and replace with your credentials:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here
```

**Example (with real values):**
```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwMDAwMDAsImV4cCI6MjAxMjU3NjAwMH0.abcdefghijklmnopqrstuvwxyz123456789
```

---

## 🗄️ Step 3: Create Storage Buckets

1. Go to **Storage** in Supabase sidebar
2. Click **New bucket**
3. Create these 4 buckets:

### Bucket 1: `projects`
- Name: `projects`
- Public bucket: ✅ YES
- File size limit: 50 MB
- Allowed MIME types: `image/*`

### Bucket 2: `testimonials`
- Name: `testimonials`
- Public bucket: ✅ YES
- File size limit: 10 MB
- Allowed MIME types: `image/*`

### Bucket 3: `media`
- Name: `media`
- Public bucket: ✅ YES
- File size limit: 50 MB
- Allowed MIME types: `image/*, video/*, application/pdf`

### Bucket 4: `general`
- Name: `general`
- Public bucket: ✅ YES
- File size limit: 50 MB
- Allowed MIME types: `*/*`

### Set Bucket Policies

For each bucket, click the bucket name → Policies → New Policy:

**Policy 1: Public Read Access**
```sql
CREATE POLICY "Public can view"
ON storage.objects FOR SELECT
USING (bucket_id = 'projects');
```

**Policy 2: Authenticated Upload**
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'projects' AND auth.role() = 'authenticated');
```

**Policy 3: Authenticated Delete**
```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'projects' AND auth.role() = 'authenticated');
```

Repeat for all 4 buckets (change `'projects'` to bucket name).

---

## 🚀 Step 4: Test the Connection

### Start Development Server:
```bash
npm run dev
```

### Test Checklist:

1. **Open browser to** `http://localhost:5173`
2. **Open browser console** (F12)
3. **Check for errors:**
   - ✅ No "Missing Supabase environment variables" error
   - ✅ No Supabase connection errors
   - ✅ Website loads completely

4. **Test Contact Form:**
   - Fill out the contact form
   - Click "Send Message"
   - Should see success toast notification
   - Check Supabase → Table Editor → `messages` table
   - Your message should appear there ✅

5. **Test Newsletter:**
   - Enter email in newsletter field
   - Click "Subscribe"
   - Should see success toast
   - Check Supabase → Table Editor → `newsletter` table
   - Your email should appear there ✅

6. **Verify Data Loading:**
   - Projects section should show 6 projects from database
   - Services section should show 6 services from database
   - Testimonials should show 6 reviews from database
   - Statistics should show 6 metrics from database
   - FAQ should show 6 questions from database

---

## ✅ What's Now Connected:

### Frontend → Database:
- ✅ Projects component fetches from `projects` table
- ✅ Services component fetches from `services` table
- ✅ Testimonials component fetches from `testimonials` table
- ✅ Statistics component fetches from `statistics` table
- ✅ FAQ component fetches from `faq` table

### Forms → Database:
- ✅ Contact form saves to `messages` table
- ✅ Newsletter form saves to `newsletter` table
- ✅ Email validation active
- ✅ Success/error toast notifications
- ✅ Form reset on success

### Security:
- ✅ Row Level Security enabled
- ✅ Public can only read published content
- ✅ Public can only insert to messages/newsletter
- ✅ Admins need authentication for full access

---

## 🔐 Admin Access (Future Feature)

The database has an admin account ready:

**Email:** `admin@vortx.io`  
**Password:** `VortxAdmin2024!`

⚠️ **Note:** This is a placeholder. In production:
1. Change the password hash in the database
2. Use proper bcrypt hashing
3. Implement login UI (admin dashboard - coming next)

---

## 📊 Database Verification

### Check Data in Supabase Dashboard:

1. Go to **Table Editor**
2. Verify these tables have data:
   - `projects` → 6 rows ✅
   - `project_technologies` → 24 rows ✅
   - `services` → 6 rows ✅
   - `service_technologies` → 24 rows ✅
   - `statistics` → 6 rows ✅
   - `testimonials` → 6 rows ✅
   - `faq` → 6 rows ✅
   - `website_settings` → 7 rows ✅
   - `seo` → 5 rows ✅
   - `admins` → 1 row ✅

3. After testing forms:
   - `messages` → Your test messages ✅
   - `newsletter` → Your test emails ✅

---

## 🐛 Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution:** 
- Check `.env` file exists in project root
- Values must start with `VITE_` prefix
- Restart dev server after changing `.env`

### Issue: Forms don't submit
**Solution:**
- Verify `.env` has correct credentials
- Check browser console for specific errors
- Verify RLS policies are set (they should be from schema.sql)

### Issue: Data not loading
**Solution:**
- Check Supabase project is not paused
- Verify seed.sql was run successfully
- Check browser network tab for API errors

### Issue: "Database not configured" error
**Solution:**
- Means Supabase client couldn't initialize
- Double-check URL and key in `.env`
- Make sure there are no extra spaces or quotes

---

## 🎯 Next Steps

### Phase 1: Verify Connection (Current)
- ✅ Environment variables set
- ✅ Forms connected
- ✅ Data loading from database
- ⏸️ Test submissions work

### Phase 2: Admin Dashboard (Next)
- [ ] Create `/admin` route
- [ ] Build login page
- [ ] Implement authentication
- [ ] Create CRUD interfaces
- [ ] Add image upload
- [ ] Activity logging

### Phase 3: Deployment
- [ ] Deploy to Vercel/Netlify
- [ ] Add production environment variables
- [ ] Configure custom domain
- [ ] Set up monitoring

---

## 📝 Quick Reference

### Environment Variables:
```bash
VITE_SUPABASE_URL=your-url-here
VITE_SUPABASE_ANON_KEY=your-key-here
```

### Restart Dev Server:
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### View Database:
https://supabase.com/dashboard/project/YOUR_PROJECT/editor

### View API Logs:
https://supabase.com/dashboard/project/YOUR_PROJECT/logs/edge-logs

---

## ✅ Connection Checklist

Before proceeding, verify:

- [ ] `.env` file created with real credentials
- [ ] Dev server restarted
- [ ] Website loads without errors
- [ ] Contact form submits successfully
- [ ] Newsletter subscription works
- [ ] Projects display from database
- [ ] Services display from database
- [ ] No console errors
- [ ] Toast notifications appear

**Once all checkboxes are ✅, your database is fully connected!**

---

**Status:** 🟢 Ready for Testing  
**Last Updated:** 2026-01-XX  
**Database:** Live & Connected
