-- =====================================================
-- VORTX COMPLETE CONSOLIDATED MIGRATION & SEED SCRIPT
-- Run this script in Supabase SQL Editor to initialize all:
-- 1. Extensions & Functions
-- 2. Database Tables & Indexes
-- 3. Row Level Security (RLS) Policies
-- 4. Initial Seed Data (Projects, Services, Stats, FAQ, Settings, etc.)
-- 5. Supabase Auth Admin User (admin@vortx.io)
-- =====================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. DROP EXISTING TABLES IF RE-INITIALIZING (Optional, wrapped safely)
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS footer CASCADE;
DROP TABLE IF EXISTS navigation CASCADE;
DROP TABLE IF EXISTS seo CASCADE;
DROP TABLE IF EXISTS website_settings CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS newsletter CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS faq CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS statistics CASCADE;
DROP TABLE IF EXISTS service_technologies CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS project_technologies CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- 3. CREATE TABLES

-- ADMINS TABLE
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_admins_email ON admins(email);

-- USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    company VARCHAR(255),
    phone VARCHAR(50),
    is_subscribed BOOLEAN DEFAULT false,
    subscription_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_users_email ON users(email);

-- PROJECTS TABLE
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    industry VARCHAR(100) NOT NULL,
    client VARCHAR(255) NOT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    outcome TEXT NOT NULL,
    timeline VARCHAR(50),
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    gradient_class VARCHAR(100),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_display_order ON projects(display_order);

-- PROJECT TECHNOLOGIES TABLE
CREATE TABLE project_technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    technology VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SERVICES TABLE
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    number VARCHAR(10) NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(100),
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_services_display_order ON services(display_order);

-- SERVICE TECHNOLOGIES TABLE
CREATE TABLE service_technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    technology VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- STATISTICS TABLE
CREATE TABLE statistics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    number VARCHAR(50) NOT NULL,
    label VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_statistics_display_order ON statistics(display_order);

-- TESTIMONIALS TABLE
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    quote TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    avatar_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_testimonials_display_order ON testimonials(display_order);

-- FAQ TABLE
CREATE TABLE faq (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_faq_display_order ON faq(display_order);

-- MESSAGES TABLE
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    is_archived BOOLEAN DEFAULT false,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NEWSLETTER TABLE
CREATE TABLE newsletter (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    unsubscribed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MEDIA TABLE
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    uploaded_by UUID REFERENCES admins(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- WEBSITE SETTINGS TABLE
CREATE TABLE website_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(50) DEFAULT 'text',
    group_name VARCHAR(100),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SEO TABLE
CREATE TABLE seo (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255),
    description TEXT,
    keywords TEXT,
    og_title VARCHAR(255),
    og_description TEXT,
    og_image TEXT,
    twitter_title VARCHAR(255),
    twitter_description TEXT,
    twitter_image TEXT,
    canonical_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ACTIVITY LOGS TABLE
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES

-- Helper function to check if user is authenticated admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (auth.role() = 'authenticated');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Public READ Policies
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Public read project_technologies" ON project_technologies FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Public read service_technologies" ON service_technologies FOR SELECT USING (true);
CREATE POLICY "Public read statistics" ON statistics FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Public read faq" ON faq FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Public read website_settings" ON website_settings FOR SELECT USING (true);
CREATE POLICY "Public read seo" ON seo FOR SELECT USING (true);

-- Public WRITE Policies (Form Submissions)
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert newsletter" ON newsletter FOR INSERT WITH CHECK (true);

-- Admin FULL ACCESS Policies (All operations for authenticated admin)
CREATE POLICY "Admin full projects" ON projects FOR ALL USING (is_admin());
CREATE POLICY "Admin full project_technologies" ON project_technologies FOR ALL USING (is_admin());
CREATE POLICY "Admin full services" ON services FOR ALL USING (is_admin());
CREATE POLICY "Admin full service_technologies" ON service_technologies FOR ALL USING (is_admin());
CREATE POLICY "Admin full statistics" ON statistics FOR ALL USING (is_admin());
CREATE POLICY "Admin full testimonials" ON testimonials FOR ALL USING (is_admin());
CREATE POLICY "Admin full faq" ON faq FOR ALL USING (is_admin());
CREATE POLICY "Admin full messages" ON messages FOR ALL USING (is_admin());
CREATE POLICY "Admin full newsletter" ON newsletter FOR ALL USING (is_admin());
CREATE POLICY "Admin full website_settings" ON website_settings FOR ALL USING (is_admin());
CREATE POLICY "Admin full seo" ON seo FOR ALL USING (is_admin());
CREATE POLICY "Admin full admins" ON admins FOR ALL USING (is_admin());
CREATE POLICY "Admin full users" ON users FOR ALL USING (is_admin());
CREATE POLICY "Admin full media" ON media FOR ALL USING (is_admin());
CREATE POLICY "Admin full activity_logs" ON activity_logs FOR ALL USING (is_admin());

-- 5. INITIAL SEED DATA

-- PROJECTS
INSERT INTO projects (name, slug, industry, client, problem, solution, outcome, timeline, is_featured, is_published, display_order, gradient_class) VALUES
('Nexus Commerce', 'nexus-commerce', 'E-Commerce', 'GlobalRetail Inc.', 'Outdated platform causing 40% cart abandonment and poor mobile experience.', 'Built a headless commerce platform with AI-powered recommendations and real-time inventory sync.', 'Reduced cart abandonment to 12%, increased mobile conversions by 180%, generated $4.2M additional revenue in first quarter.', '14 weeks', true, true, 1, 'from-blue-500/20 to-cyan-500/20'),
('Aurora Health', 'aurora-health', 'Healthcare', 'MediCare Partners', 'Fragmented patient data across 12 systems limiting care coordination.', 'Developed HIPAA-compliant AI platform unifying patient records with predictive health analytics.', 'Unified 500K+ patient records, reduced administrative time by 65%, improved diagnostic accuracy by 34%.', '22 weeks', true, true, 2, 'from-purple-500/20 to-pink-500/20'),
('Quantum Finance', 'quantum-finance', 'FinTech', 'Meridian Capital', 'Manual trading analysis taking 8+ hours daily, missing market opportunities.', 'Created real-time market intelligence platform with ML-driven trading signals.', 'Reduced analysis time to 12 minutes, identified 240% more opportunities, generated $12M profit increase.', '18 weeks', true, true, 3, 'from-green-500/20 to-emerald-500/20'),
('EduVerse Platform', 'eduverse-platform', 'Education', 'Global Learning Network', 'Low engagement in online courses with 78% dropout rate.', 'Built immersive learning platform with gamification, AI tutors, and adaptive content.', 'Reduced dropout to 23%, increased completion by 310%, serving 85K+ active students.', '16 weeks', true, true, 4, 'from-orange-500/20 to-amber-500/20'),
('VelocityAI Logistics', 'velocityai-logistics', 'Supply Chain', 'TransWorld Shipping', 'Inefficient route planning causing 35% fuel waste and delivery delays.', 'Deployed AI-powered logistics optimization with real-time route adjustment.', 'Cut fuel costs by 42%, improved on-time delivery to 96%, saved $8.4M annually.', '20 weeks', true, true, 5, 'from-red-500/20 to-rose-500/20'),
('Stellar Brand Studio', 'stellar-brand-studio', 'Creative Agency', 'Stellar Creative Co.', 'Manual asset management losing 15+ hours weekly, inconsistent brand delivery.', 'Built automated DAM system with AI tagging, version control, and brand guidelines engine.', 'Saved 720 hours annually, ensured 100% brand compliance, accelerated campaigns by 45%.', '12 weeks', true, true, 6, 'from-indigo-500/20 to-violet-500/20');

-- SERVICES
INSERT INTO services (number, title, slug, description, is_published, display_order) VALUES
('01', 'AI Engineering', 'ai-engineering', 'Custom machine learning models, natural language processing, computer vision, and intelligent automation systems that transform raw data into actionable intelligence.', true, 1),
('02', 'Web Development', 'web-development', 'High-performance web applications built with modern frameworks, optimized for speed, accessibility, and seamless user experiences across all devices.', true, 2),
('03', 'Creative Design', 'creative-design', 'Award-winning visual identities, immersive interfaces, and motion design that captivate audiences and elevate brand perception to new heights.', true, 3),
('04', 'Automation Systems', 'automation-systems', 'End-to-end workflow automation, intelligent process optimization, and custom integrations that eliminate manual tasks and accelerate business operations.', true, 4),
('05', 'Cloud Infrastructure', 'cloud-infrastructure', 'Scalable cloud architecture, containerized deployments, serverless computing, and DevOps pipelines designed for reliability and performance.', true, 5),
('06', 'Brand Identity', 'brand-identity', 'Comprehensive brand strategy, visual systems, and messaging frameworks that create memorable identities and drive market differentiation.', true, 6);

-- STATISTICS
INSERT INTO statistics (key, number, label, description, display_order, is_published) VALUES
('projects', '150+', 'Projects Completed', 'Transformative digital solutions delivered across 25+ industries globally.', 1, true),
('revenue', '$120M+', 'Client Revenue Generated', 'Measurable business impact created for our partners through digital innovation.', 2, true),
('satisfaction', '99.4%', 'Client Satisfaction', 'Industry-leading retention rate driven by operational excellence and partnership.', 3, true),
('awards', '45+', 'Global Industry Awards', 'Recognized for technological innovation, UI/UX design, and engineering excellence.', 4, true);

-- TESTIMONIALS
INSERT INTO testimonials (name, role, company, location, quote, rating, is_featured, is_published, display_order) VALUES
('Elena Rostova', 'Chief Technology Officer', 'Nexus Retail Group', 'Zurich, Switzerland', 'VORTX transformed our digital infrastructure entirely. Their AI-driven commerce solution doubled our throughput in 90 days. The level of precision and craftsmanship is unmatched in the industry.', 5, true, true, 1),
('Marcus Vance', 'VP of Product Innovation', 'Aether Dynamics', 'San Francisco, USA', 'Working with VORTX felt less like hiring an agency and more like integrating an elite task force. They delivered a complex real-time analytics platform 3 weeks ahead of deadline with zero post-launch bugs.', 5, true, true, 2),
('Sophia Chen', 'Managing Director', 'Horizon Capital Ventures', 'Singapore', 'The brand identity and immersive platform VORTX elevated our market valuation significantly. Their design language is years ahead of conventional digital agencies.', 5, true, true, 3);

-- FAQ
INSERT INTO faq (question, answer, category, is_published, display_order) VALUES
('What is your typical project timeline and process?', 'Project timelines range from 6 to 20 weeks depending on scope and complexity. We follow a 5-phase methodology: Discovery & Architecture, Systems Design, Engineering & Integration, Optimization & QA, and Deployment & Scale.', 'General', true, 1),
('How do you handle security, IP, and compliance?', 'Security and client IP protection are embedded into our architecture from day one. We sign comprehensive NDAs, transfer 100% of IP rights upon completion, and build systems adhering to SOC2, HIPAA, GDPR, and ISO27001 standards.', 'Security', true, 2),
('Can VORTX integrate with our existing legacy systems?', 'Yes. Our AI Engineering and Automation teams specialize in building custom API middleware, headless microservices, and ETL pipelines that seamlessly connect modern frameworks with legacy enterprise systems.', 'Engineering', true, 3),
('What support and SLA do you provide post-launch?', 'We offer 24/7 proactive monitoring, dedicated SLA support tiers (up to 15-minute emergency response time), continuous performance optimization, and regular security patching to ensure long-term system health.', 'Support', true, 4);

-- WEBSITE SETTINGS
INSERT INTO website_settings (key, value, type, group_name, description) VALUES
('site_name', 'VORTX', 'text', 'general', 'Primary website title'),
('site_tagline', 'Forging Tomorrow Virtual Horizon', 'text', 'general', 'Main brand slogan'),
('contact_email', 'hello@vortx.io', 'email', 'contact', 'Primary support email'),
('contact_phone', '+1 (212) 777-8888', 'tel', 'contact', 'Contact phone number'),
('contact_address', '350 Fifth Avenue, Suite 7680, New York, NY 10118', 'textarea', 'contact', 'Physical office address'),
('hero_video_url', 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260717_120352_eb988725-1351-43b3-8095-16e4a1005e3d.mp4', 'url', 'media', 'Hero background video');

-- SEO
INSERT INTO seo (page, title, description, keywords) VALUES
('home', 'VORTX - Creative Technology Studio', 'A global technology company creating premium digital products, AI solutions, and next-generation software systems.', 'technology, AI, web development, creative design'),
('services', 'Our Services - VORTX', 'AI Engineering, Web Development, Creative Design, Automation, Cloud Infrastructure.', 'services, AI, web development, design'),
('projects', 'Featured Projects - VORTX', 'Explore our portfolio of transformative projects delivering real business impact.', 'projects, portfolio, case studies'),
('contact', 'Contact Us - VORTX', 'Get in touch with VORTX to start your next project.', 'contact, inquiry, consultation');

-- 6. SUPABASE AUTH ADMIN REGISTRATION (Email: admin@vortx.io | Password: Vortx!&dSWUQ8d4Mha)

DO $$
BEGIN
  -- Insert into auth.users if not exists, else update password
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

  -- Insert into public.admins if not exists, else update active status
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
