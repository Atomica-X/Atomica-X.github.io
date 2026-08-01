# VORTX Deployment Guide

## 🚀 Production Deployment Checklist

### Prerequisites
- ✅ Node.js 18+ installed
- ✅ Supabase account created
- ✅ Domain name (optional)
- ✅ Vercel/Netlify account (or hosting provider)

---

## Phase 1: Supabase Backend Setup

### Step 1: Create Supabase Project
1. Visit [https://supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization
4. Enter project details:
   - Name: `vortx-production`
   - Database Password: (generate strong password)
   - Region: Choose closest to your users
5. Wait for project to initialize (~2 minutes)

### Step 2: Configure Database
1. Go to SQL Editor in Supabase Dashboard
2. Create new query
3. Copy entire content of `supabase/schema.sql`
4. Run query (this creates all tables, indexes, RLS policies)
5. Verify: Check "Table Editor" - you should see 15+ tables

### Step 3: Seed Database
1. Create another new query in SQL Editor
2. Copy entire content of `supabase/seed.sql`
3. Run query (this populates initial data)
4. Verify: Open `projects` table - should see 6 projects

### Step 4: Create Storage Buckets
1. Go to "Storage" in Supabase Dashboard
2. Create these buckets:
   - `projects` (public)
   - `testimonials` (public)
   - `media` (public)
   - `general` (public)

3. For each bucket, set policies:
```sql
-- Allow public read access
CREATE POLICY "Public can view" ON storage.objects
FOR SELECT USING (bucket_id = 'projects');

-- Allow authenticated uploads (admins only)
CREATE POLICY "Admins can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'projects' AND auth.role() = 'authenticated');

-- Allow authenticated delete (admins only)
CREATE POLICY "Admins can delete" ON storage.objects
FOR DELETE USING (bucket_id = 'projects' AND auth.role() = 'authenticated');
```

Repeat for all buckets.

### Step 5: Get API Credentials
1. Go to "Settings" > "API"
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOi...` (safe for client-side)
   - ⚠️ **NEVER USE service_role key on client**

---

## Phase 2: Frontend Configuration

### Step 1: Environment Variables
1. Create `.env` file in project root:
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
```

2. **IMPORTANT**: Add `.env` to `.gitignore`:
```
.env
.env.local
.env.production
```

3. Never commit real credentials to Git

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Test Locally
```bash
npm run dev
```

Visit `http://localhost:5173` and verify:
- ✅ Page loads without errors
- ✅ Projects display from database
- ✅ Services load correctly
- ✅ Contact form submission works
- ✅ Newsletter signup works
- ✅ Toast notifications appear

---

## Phase 3: Production Deployment

### Option A: Vercel (Recommended)

1. **Install Vercel CLI** (optional):
```bash
npm i -g vercel
```

2. **Deploy via GitHub**:
   - Push code to GitHub
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Configure:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Add Environment Variables in Vercel**:
   - Go to Project Settings > Environment Variables
   - Add:
     - `VITE_SUPABASE_URL` = your-url
     - `VITE_SUPABASE_ANON_KEY` = your-key
   - Save and redeploy

4. **Custom Domain** (optional):
   - Go to Project Settings > Domains
   - Add your custom domain
   - Update DNS records as shown

### Option B: Netlify

1. **Deploy**:
   ```bash
   npm run build
   ```

2. **Via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

3. **Via Netlify UI**:
   - Drag `dist` folder to netlify.app/drop
   - Or connect GitHub repository

4. **Environment Variables**:
   - Site Settings > Build & Deploy > Environment
   - Add both Supabase variables

### Option C: Other Hosting

**Any static hosting works:**
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting
- DigitalOcean App Platform

**Build steps:**
```bash
npm run build
# Upload dist/ folder to hosting
```

---

## Phase 4: Post-Deployment

### Step 1: Verify Production

Visit your live URL and test:
- ✅ All pages load
- ✅ Images display
- ✅ Animations work
- ✅ Forms submit successfully
- ✅ Database queries execute
- ✅ No console errors

### Step 2: Update SEO

1. Add your domain to Supabase allowed origins:
   - Supabase Dashboard > Settings > API
   - Add your production URL to "Site URL"

2. Generate sitemap (manual or tool):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://yourdomain.com/</loc></url>
  <url><loc>https://yourdomain.com/#about</loc></url>
  <url><loc>https://yourdomain.com/#services</loc></url>
  <url><loc>https://yourdomain.com/#projects</loc></url>
  <url><loc>https://yourdomain.com/#contact</loc></url>
</urlset>
```

3. Add to `public/sitemap.xml`

4. Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

### Step 3: Analytics (Optional)

Add Google Analytics to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Step 4: Performance Optimization

1. **Enable Vercel/Netlify CDN** (automatic)
2. **Enable compression** (automatic on most hosts)
3. **Optimize images**:
   - Use WebP format
   - Compress before upload
   - Use Supabase Image Transformation

4. **Monitor performance**:
   - Lighthouse score (aim for 90+)
   - Core Web Vitals
   - Supabase dashboard metrics

---

## Phase 5: Security Hardening

### Step 1: Verify RLS Policies
```sql
-- Test in Supabase SQL Editor
SELECT * FROM projects WHERE is_published = false;
-- Should return empty (public can't see unpublished)

INSERT INTO admins (email, password_hash, full_name) 
VALUES ('test@test.com', 'hash', 'Test');
-- Should fail (public can't insert admins)
```

### Step 2: Rotate Admin Password
```sql
-- In Supabase SQL Editor
UPDATE admins 
SET password_hash = 'new-hashed-password' 
WHERE email = 'admin@vortx.io';
```

Use proper password hashing (bcrypt) in production.

### Step 3: Enable Rate Limiting

In Supabase Dashboard:
- Go to Database > Extensions
- Enable `pg_cron` for scheduled tasks
- Create rate limit function (optional)

### Step 4: Monitor Security

- Enable Supabase audit logs
- Set up alerts for unusual activity
- Regular backups (automatic on Supabase)

---

## Maintenance Checklist

### Daily
- [ ] Check contact form submissions
- [ ] Review newsletter signups
- [ ] Monitor Supabase logs for errors

### Weekly
- [ ] Backup database (automatic, verify)
- [ ] Check website performance
- [ ] Review analytics

### Monthly
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance optimization
- [ ] Content updates

---

## Troubleshooting

### Issue: Forms don't submit
**Solution**: Check environment variables are set correctly in hosting platform

### Issue: Database queries fail
**Solution**: Verify RLS policies in Supabase, check anon key permissions

### Issue: Images don't load
**Solution**: Check storage bucket policies, verify public access enabled

### Issue: CORS errors
**Solution**: Add your domain to Supabase allowed origins

### Issue: Slow loading
**Solution**: Enable CDN, optimize images, check Supabase region

---

## Support Channels

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev

---

## Backup & Recovery

### Automated Backups (Supabase)
- Daily automatic backups
- 7-day retention (free tier)
- 30+ days (paid tiers)

### Manual Backup
```bash
# Export database
pg_dump -h db.your-project.supabase.co -U postgres -d postgres > backup.sql

# Restore database
psql -h db.your-project.supabase.co -U postgres -d postgres < backup.sql
```

### Export Data
```sql
-- Export to CSV
COPY projects TO '/path/to/projects.csv' CSV HEADER;
```

---

## Scaling Considerations

### When to Upgrade Supabase Plan
- > 500 MB database size (Free tier limit)
- > 2 GB file storage (Free tier limit)
- > 50,000 monthly active users
- Need for dedicated resources

### Performance Optimization
1. Add database indexes (already included in schema)
2. Use Supabase CDN for images
3. Enable caching headers
4. Implement lazy loading
5. Use connection pooling

### High Traffic Preparation
1. Upgrade to Supabase Pro plan
2. Enable database read replicas
3. Use edge functions for heavy computation
4. Implement request queuing
5. Add monitoring and alerts

---

**Deployment Status**: ✅ Production Ready

**Last Updated**: 2026-01-XX

**Version**: 1.0.0
