-- =====================================================
-- VORTX PRODUCTION DATABASE SCHEMA
-- Complete backend architecture for Supabase
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ADMINS TABLE
-- =====================================================
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
CREATE INDEX idx_admins_is_active ON admins(is_active);

-- =====================================================
-- USERS TABLE
-- =====================================================
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
CREATE INDEX idx_users_is_subscribed ON users(is_subscribed);

-- =====================================================
-- PROJECTS TABLE
-- =====================================================
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
CREATE INDEX idx_projects_is_featured ON projects(is_featured);
CREATE INDEX idx_projects_is_published ON projects(is_published);
CREATE INDEX idx_projects_display_order ON projects(display_order);

-- =====================================================
-- PROJECT TECHNOLOGIES TABLE
-- =====================================================
CREATE TABLE project_technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    technology VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_project_technologies_project_id ON project_technologies(project_id);

-- =====================================================
-- SERVICES TABLE
-- =====================================================
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

CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_is_published ON services(is_published);
CREATE INDEX idx_services_display_order ON services(display_order);

-- =====================================================
-- SERVICE TECHNOLOGIES TABLE
-- =====================================================
CREATE TABLE service_technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    technology VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_service_technologies_service_id ON service_technologies(service_id);

-- =====================================================
-- STATISTICS TABLE
-- =====================================================
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

CREATE INDEX idx_statistics_key ON statistics(key);
CREATE INDEX idx_statistics_display_order ON statistics(display_order);

-- =====================================================
-- TESTIMONIALS TABLE
-- =====================================================
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

CREATE INDEX idx_testimonials_is_featured ON testimonials(is_featured);
CREATE INDEX idx_testimonials_is_published ON testimonials(is_published);
CREATE INDEX idx_testimonials_display_order ON testimonials(display_order);

-- =====================================================
-- FAQ TABLE
-- =====================================================
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

CREATE INDEX idx_faq_category ON faq(category);
CREATE INDEX idx_faq_is_published ON faq(is_published);
CREATE INDEX idx_faq_display_order ON faq(display_order);

-- =====================================================
-- MESSAGES TABLE
-- =====================================================
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

CREATE INDEX idx_messages_email ON messages(email);
CREATE INDEX idx_messages_is_read ON messages(is_read);
CREATE INDEX idx_messages_is_archived ON messages(is_archived);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- =====================================================
-- NEWSLETTER TABLE
-- =====================================================
CREATE TABLE newsletter (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    unsubscribed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_newsletter_email ON newsletter(email);
CREATE INDEX idx_newsletter_is_active ON newsletter(is_active);

-- =====================================================
-- MEDIA TABLE
-- =====================================================
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

CREATE INDEX idx_media_uploaded_by ON media(uploaded_by);
CREATE INDEX idx_media_mime_type ON media(mime_type);
CREATE INDEX idx_media_created_at ON media(created_at DESC);

-- =====================================================
-- WEBSITE SETTINGS TABLE
-- =====================================================
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

CREATE INDEX idx_website_settings_key ON website_settings(key);
CREATE INDEX idx_website_settings_group ON website_settings(group_name);

-- =====================================================
-- SEO TABLE
-- =====================================================
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

CREATE INDEX idx_seo_page ON seo(page);

-- =====================================================
-- NAVIGATION TABLE
-- =====================================================
CREATE TABLE navigation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    position VARCHAR(50) DEFAULT 'header',
    parent_id UUID REFERENCES navigation(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_navigation_position ON navigation(position);
CREATE INDEX idx_navigation_parent_id ON navigation(parent_id);
CREATE INDEX idx_navigation_display_order ON navigation(display_order);

-- =====================================================
-- FOOTER TABLE
-- =====================================================
CREATE TABLE footer (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    column_name VARCHAR(100) NOT NULL,
    link_text VARCHAR(255) NOT NULL,
    link_url VARCHAR(255) NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_footer_column_name ON footer(column_name);
CREATE INDEX idx_footer_display_order ON footer(display_order);

-- =====================================================
-- ACTIVITY LOGS TABLE
-- =====================================================
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

CREATE INDEX idx_activity_logs_admin_id ON activity_logs(admin_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_entity_type ON activity_logs(entity_type);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);

-- =====================================================
-- UPDATED_AT TRIGGERS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_statistics_updated_at BEFORE UPDATE ON statistics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faq_updated_at BEFORE UPDATE ON faq FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_updated_at BEFORE UPDATE ON newsletter FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON media FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_website_settings_updated_at BEFORE UPDATE ON website_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_seo_updated_at BEFORE UPDATE ON seo FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_navigation_updated_at BEFORE UPDATE ON navigation FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_footer_updated_at BEFORE UPDATE ON footer FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
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
ALTER TABLE navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES - PUBLIC READ
-- =====================================================

-- Projects - Public can read published projects
CREATE POLICY "Public can view published projects" ON projects FOR SELECT USING (is_published = true);

-- Services - Public can read published services
CREATE POLICY "Public can view published services" ON services FOR SELECT USING (is_published = true);

-- Service Technologies - Public can read
CREATE POLICY "Public can view service technologies" ON service_technologies FOR SELECT USING (
    EXISTS (SELECT 1 FROM services WHERE services.id = service_id AND services.is_published = true)
);

-- Project Technologies - Public can read
CREATE POLICY "Public can view project technologies" ON project_technologies FOR SELECT USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = project_id AND projects.is_published = true)
);

-- Statistics - Public can read published stats
CREATE POLICY "Public can view published statistics" ON statistics FOR SELECT USING (is_published = true);

-- Testimonials - Public can read published testimonials
CREATE POLICY "Public can view published testimonials" ON testimonials FOR SELECT USING (is_published = true);

-- FAQ - Public can read published FAQ
CREATE POLICY "Public can view published faq" ON faq FOR SELECT USING (is_published = true);

-- Website Settings - Public can read
CREATE POLICY "Public can view website settings" ON website_settings FOR SELECT USING (true);

-- SEO - Public can read
CREATE POLICY "Public can view seo" ON seo FOR SELECT USING (true);

-- Navigation - Public can read published items
CREATE POLICY "Public can view published navigation" ON navigation FOR SELECT USING (is_published = true);

-- Footer - Public can read published items
CREATE POLICY "Public can view published footer" ON footer FOR SELECT USING (is_published = true);

-- =====================================================
-- RLS POLICIES - PUBLIC WRITE (FORMS)
-- =====================================================

-- Messages - Public can insert
CREATE POLICY "Public can submit messages" ON messages FOR INSERT WITH CHECK (true);

-- Newsletter - Public can subscribe
CREATE POLICY "Public can subscribe to newsletter" ON newsletter FOR INSERT WITH CHECK (true);

-- =====================================================
-- RLS POLICIES - ADMIN FULL ACCESS
-- =====================================================

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admins 
        WHERE id = auth.uid() 
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admins table - Admins can read all
CREATE POLICY "Admins can view all admins" ON admins FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update all admins" ON admins FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can insert admins" ON admins FOR INSERT WITH CHECK (is_admin());

-- Users - Admin full access
CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update users" ON users FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete users" ON users FOR DELETE USING (is_admin());

-- Projects - Admin full access
CREATE POLICY "Admins can view all projects" ON projects FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert projects" ON projects FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update projects" ON projects FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete projects" ON projects FOR DELETE USING (is_admin());

-- Project Technologies - Admin full access
CREATE POLICY "Admins can view all project technologies" ON project_technologies FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert project technologies" ON project_technologies FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can delete project technologies" ON project_technologies FOR DELETE USING (is_admin());

-- Services - Admin full access
CREATE POLICY "Admins can view all services" ON services FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert services" ON services FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update services" ON services FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete services" ON services FOR DELETE USING (is_admin());

-- Service Technologies - Admin full access
CREATE POLICY "Admins can view all service technologies" ON service_technologies FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert service technologies" ON service_technologies FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can delete service technologies" ON service_technologies FOR DELETE USING (is_admin());

-- Statistics - Admin full access
CREATE POLICY "Admins can view all statistics" ON statistics FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert statistics" ON statistics FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update statistics" ON statistics FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete statistics" ON statistics FOR DELETE USING (is_admin());

-- Testimonials - Admin full access
CREATE POLICY "Admins can view all testimonials" ON testimonials FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert testimonials" ON testimonials FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update testimonials" ON testimonials FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete testimonials" ON testimonials FOR DELETE USING (is_admin());

-- FAQ - Admin full access
CREATE POLICY "Admins can view all faq" ON faq FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert faq" ON faq FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update faq" ON faq FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete faq" ON faq FOR DELETE USING (is_admin());

-- Messages - Admin full access
CREATE POLICY "Admins can view all messages" ON messages FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update messages" ON messages FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete messages" ON messages FOR DELETE USING (is_admin());

-- Newsletter - Admin full access
CREATE POLICY "Admins can view all newsletter" ON newsletter FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update newsletter" ON newsletter FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete newsletter" ON newsletter FOR DELETE USING (is_admin());

-- Media - Admin full access
CREATE POLICY "Admins can view all media" ON media FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert media" ON media FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update media" ON media FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete media" ON media FOR DELETE USING (is_admin());

-- Website Settings - Admin full access
CREATE POLICY "Admins can update settings" ON website_settings FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can insert settings" ON website_settings FOR INSERT WITH CHECK (is_admin());

-- SEO - Admin full access
CREATE POLICY "Admins can update seo" ON seo FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can insert seo" ON seo FOR INSERT WITH CHECK (is_admin());

-- Navigation - Admin full access
CREATE POLICY "Admins can view all navigation" ON navigation FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert navigation" ON navigation FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update navigation" ON navigation FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete navigation" ON navigation FOR DELETE USING (is_admin());

-- Footer - Admin full access
CREATE POLICY "Admins can view all footer" ON footer FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert footer" ON footer FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update footer" ON footer FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete footer" ON footer FOR DELETE USING (is_admin());

-- Activity Logs - Admin read only
CREATE POLICY "Admins can view activity logs" ON activity_logs FOR SELECT USING (is_admin());
CREATE POLICY "System can insert activity logs" ON activity_logs FOR INSERT WITH CHECK (true);

-- =====================================================
-- SEED DATA
-- =====================================================

-- Insert default admin (password: VortxAdmin2024!)
-- Note: In production, hash this properly
INSERT INTO admins (email, password_hash, full_name, role) VALUES
('admin@vortx.io', '$2a$10$rKJN8uZ0g6HxF3qI5yJ8H.YfVGK7gYpxQqYhYJ8MZ9KqVgH6J8H6K', 'VORTX Admin', 'super_admin');

-- Insert initial website settings
INSERT INTO website_settings (key, value, type, group_name) VALUES
('site_name', 'VORTX', 'text', 'general'),
('site_tagline', 'Forging Tomorrow Virtual Horizon', 'text', 'general'),
('contact_email', 'hello@vortx.io', 'email', 'contact'),
('contact_phone', '+1 (212) 777-8888', 'tel', 'contact'),
('contact_address', '350 Fifth Avenue, Suite 7680, New York, NY 10118, United States', 'textarea', 'contact'),
('business_hours', 'Monday – Friday: 9:00 AM – 6:00 PM EST', 'text', 'contact'),
('hero_video_url', 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260717_120352_eb988725-1351-43b3-8095-16e4a1005e3d.mp4', 'url', 'media');

-- Insert default SEO data
INSERT INTO seo (page, title, description, keywords) VALUES
('home', 'VORTX - Creative Technology Studio', 'A global technology company creating premium digital products, AI solutions, and next-generation software systems.', 'technology, AI, web development, creative design'),
('about', 'About VORTX - Our Mission & Vision', 'Learn about VORTX mission to transform digital experiences with cutting-edge technology.', 'about, mission, vision, values'),
('services', 'Our Services - VORTX', 'AI Engineering, Web Development, Creative Design, Automation, Cloud Infrastructure.', 'services, AI, web development, design'),
('projects', 'Featured Projects - VORTX', 'Explore our portfolio of transformative projects delivering real business impact.', 'projects, portfolio, case studies'),
('contact', 'Contact Us - VORTX', 'Get in touch with VORTX to start your next project.', 'contact, inquiry, consultation');

-- =====================================================
-- STORAGE BUCKETS (Run separately in Supabase Storage)
-- =====================================================
-- Create buckets: projects, testimonials, media, general
