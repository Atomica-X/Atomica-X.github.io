-- =====================================================
-- VORTX DATABASE SEED DATA
-- Populate database with existing frontend content
-- =====================================================

-- =====================================================
-- PROJECTS
-- =====================================================
INSERT INTO projects (name, slug, industry, client, problem, solution, outcome, timeline, is_featured, is_published, display_order, gradient_class) VALUES
('Nexus Commerce', 'nexus-commerce', 'E-Commerce', 'GlobalRetail Inc.', 'Outdated platform causing 40% cart abandonment and poor mobile experience.', 'Built a headless commerce platform with AI-powered recommendations and real-time inventory sync.', 'Reduced cart abandonment to 12%, increased mobile conversions by 180%, generated $4.2M additional revenue in first quarter.', '14 weeks', true, true, 1, 'from-blue-500/20 to-cyan-500/20'),
('Aurora Health', 'aurora-health', 'Healthcare', 'MediCare Partners', 'Fragmented patient data across 12 systems limiting care coordination.', 'Developed HIPAA-compliant AI platform unifying patient records with predictive health analytics.', 'Unified 500K+ patient records, reduced administrative time by 65%, improved diagnostic accuracy by 34%.', '22 weeks', true, true, 2, 'from-purple-500/20 to-pink-500/20'),
('Quantum Finance', 'quantum-finance', 'FinTech', 'Meridian Capital', 'Manual trading analysis taking 8+ hours daily, missing market opportunities.', 'Created real-time market intelligence platform with ML-driven trading signals.', 'Reduced analysis time to 12 minutes, identified 240% more opportunities, generated $12M profit increase.', '18 weeks', true, true, 3, 'from-green-500/20 to-emerald-500/20'),
('EduVerse Platform', 'eduverse-platform', 'Education', 'Global Learning Network', 'Low engagement in online courses with 78% dropout rate.', 'Built immersive learning platform with gamification, AI tutors, and adaptive content.', 'Reduced dropout to 23%, increased completion by 310%, serving 85K+ active students.', '16 weeks', true, true, 4, 'from-orange-500/20 to-amber-500/20'),
('VelocityAI Logistics', 'velocityai-logistics', 'Supply Chain', 'TransWorld Shipping', 'Inefficient route planning causing 35% fuel waste and delivery delays.', 'Deployed AI-powered logistics optimization with real-time route adjustment.', 'Cut fuel costs by 42%, improved on-time delivery to 96%, saved $8.4M annually.', '20 weeks', true, true, 5, 'from-red-500/20 to-rose-500/20'),
('Stellar Brand Studio', 'stellar-brand-studio', 'Creative Agency', 'Stellar Creative Co.', 'Manual asset management losing 15+ hours weekly, inconsistent brand delivery.', 'Built automated DAM system with AI tagging, version control, and brand guidelines engine.', 'Saved 720 hours annually, ensured 100% brand compliance, accelerated campaigns by 45%.', '12 weeks', true, true, 6, 'from-indigo-500/20 to-violet-500/20');

-- =====================================================
-- PROJECT TECHNOLOGIES
-- =====================================================
INSERT INTO project_technologies (project_id, technology) 
SELECT id, unnest(ARRAY['Next.js', 'Shopify', 'TensorFlow', 'Stripe']) FROM projects WHERE slug = 'nexus-commerce';

INSERT INTO project_technologies (project_id, technology)
SELECT id, unnest(ARRAY['React', 'Python', 'AWS', 'OpenAI']) FROM projects WHERE slug = 'aurora-health';

INSERT INTO project_technologies (project_id, technology)
SELECT id, unnest(ARRAY['TypeScript', 'Python', 'WebSocket', 'TensorFlow']) FROM projects WHERE slug = 'quantum-finance';

INSERT INTO project_technologies (project_id, technology)
SELECT id, unnest(ARRAY['Next.js', 'Three.js', 'OpenAI', 'Supabase']) FROM projects WHERE slug = 'eduverse-platform';

INSERT INTO project_technologies (project_id, technology)
SELECT id, unnest(ARRAY['Python', 'TensorFlow', 'Google Maps', 'Docker']) FROM projects WHERE slug = 'velocityai-logistics';

INSERT INTO project_technologies (project_id, technology)
SELECT id, unnest(ARRAY['React', 'Node.js', 'AWS S3', 'OpenAI']) FROM projects WHERE slug = 'stellar-brand-studio';

-- =====================================================
-- SERVICES
-- =====================================================
INSERT INTO services (number, title, slug, description, is_published, display_order) VALUES
('01', 'AI Engineering', 'ai-engineering', 'Custom machine learning models, natural language processing, computer vision, and intelligent automation systems that transform raw data into actionable intelligence.', true, 1),
('02', 'Web Development', 'web-development', 'High-performance web applications built with modern frameworks, optimized for speed, accessibility, and seamless user experiences across all devices.', true, 2),
('03', 'Creative Design', 'creative-design', 'Award-winning visual identities, immersive interfaces, and motion design that captivate audiences and elevate brand perception to new heights.', true, 3),
('04', 'Automation Systems', 'automation-systems', 'End-to-end workflow automation, intelligent process optimization, and custom integrations that eliminate manual tasks and accelerate business operations.', true, 4),
('05', 'Cloud Infrastructure', 'cloud-infrastructure', 'Scalable cloud architecture, containerized deployments, serverless computing, and DevOps pipelines designed for reliability and performance.', true, 5),
('06', 'Brand Identity', 'brand-identity', 'Comprehensive brand strategy, visual systems, and messaging frameworks that create memorable identities and drive market differentiation.', true, 6);

-- =====================================================
-- SERVICE TECHNOLOGIES
-- =====================================================
INSERT INTO service_technologies (service_id, technology)
SELECT id, unnest(ARRAY['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain']) FROM services WHERE slug = 'ai-engineering';

INSERT INTO service_technologies (service_id, technology)
SELECT id, unnest(ARRAY['React', 'Next.js', 'TypeScript', 'Node.js']) FROM services WHERE slug = 'web-development';

INSERT INTO service_technologies (service_id, technology)
SELECT id, unnest(ARRAY['Figma', 'After Effects', 'Blender', 'Cinema 4D']) FROM services WHERE slug = 'creative-design';

INSERT INTO service_technologies (service_id, technology)
SELECT id, unnest(ARRAY['Zapier', 'n8n', 'Python', 'Selenium']) FROM services WHERE slug = 'automation-systems';

INSERT INTO service_technologies (service_id, technology)
SELECT id, unnest(ARRAY['AWS', 'Docker', 'Kubernetes', 'Terraform']) FROM services WHERE slug = 'cloud-infrastructure';

INSERT INTO service_technologies (service_id, technology)
SELECT id, unnest(ARRAY['Strategy', 'Typography', 'Guidelines', 'Systems']) FROM services WHERE slug = 'brand-identity';

-- =====================================================
-- STATISTICS
-- =====================================================
INSERT INTO statistics (key, number, label, description, display_order, is_published) VALUES
('projects', '240+', 'Completed Projects', 'Across 6 continents', 1, true),
('countries', '38', 'Countries Served', 'Global reach and impact', 2, true),
('team', '85+', 'Team Members', 'Expert professionals', 3, true),
('satisfaction', '98%', 'Client Satisfaction', 'Average rating score', 4, true),
('years', '8', 'Years of Excellence', 'Since 2018', 5, true),
('awards', '24', 'Industry Awards', 'International recognition', 6, true);

-- =====================================================
-- TESTIMONIALS
-- =====================================================
INSERT INTO testimonials (name, role, company, location, quote, rating, is_featured, is_published, display_order) VALUES
('Sarah Chen', 'Chief Technology Officer', 'GlobalRetail Inc.', 'San Francisco, USA', 'VORTX transformed our entire digital infrastructure in under four months. Their AI-powered commerce platform increased our revenue by $4.2M in the first quarter alone. The team''s technical expertise and strategic thinking are unmatched.', 5, true, true, 1),
('Marcus Andersson', 'Head of Digital Innovation', 'MediCare Partners', 'Stockholm, Sweden', 'Working with VORTX felt like having a true technology partner, not just a vendor. They unified our fragmented patient data systems and delivered insights that improved our diagnostic accuracy by 34%. Exceptional work.', 5, true, true, 2),
('Priya Sharma', 'Managing Director', 'Meridian Capital', 'Singapore', 'The trading intelligence platform VORTX built for us is nothing short of revolutionary. What used to take our team 8 hours now takes 12 minutes. We''ve seen a $12M profit increase directly attributable to their solution.', 5, true, true, 3),
('James OConnor', 'VP of Product', 'Global Learning Network', 'Dublin, Ireland', 'VORTX did not just build us a platform they reimagined online education. Student engagement skyrocketed, dropout rates plummeted, and we now serve over 85,000 active learners. Their creativity and technical skill are world-class.', 5, true, true, 4),
('Elena Rodriguez', 'Chief Operations Officer', 'TransWorld Shipping', 'Barcelona, Spain', 'The logistics optimization system delivered by VORTX saved us $8.4M annually while improving our on-time delivery rate to 96%. Their AI-powered routing is a game-changer for our entire operation.', 5, true, true, 5),
('David Kim', 'Creative Director', 'Stellar Creative Co.', 'Seoul, South Korea', 'VORTX built us an asset management system that feels like magic. We''ve saved over 720 hours annually, ensured 100% brand compliance, and accelerated our campaign delivery by 45%. Simply outstanding.', 5, true, true, 6);

-- =====================================================
-- FAQ
-- =====================================================
INSERT INTO faq (question, answer, category, is_published, display_order) VALUES
('What industries do you serve?', 'We work across all major industries including e-commerce, healthcare, finance, education, logistics, creative agencies, and more. Our technology solutions are adaptable to any sector looking to innovate.', 'general', true, 1),
('How long does a typical project take?', 'Project timelines vary based on scope and complexity. Most projects range from 8 to 20 weeks from discovery to launch. We provide detailed timelines during our initial consultation.', 'general', true, 2),
('Do you offer ongoing support after launch?', 'Yes. We provide comprehensive post-launch support including maintenance, feature enhancements, performance monitoring, security updates, and dedicated technical assistance as your business evolves.', 'services', true, 3),
('What is your development process?', 'We follow a proven 7-stage methodology: Discovery, Strategy, Design, Development, Testing, Launch, and Support. This ensures quality, transparency, and alignment with your business objectives at every phase.', 'process', true, 4),
('Can you integrate with existing systems?', 'Absolutely. We specialize in seamless integrations with existing platforms, databases, APIs, and third-party services. Our solutions are designed to enhance, not replace, your current technology stack.', 'technical', true, 5),
('What makes VORTX different from other agencies?', 'We combine strategic thinking with technical excellence. Our team includes AI engineers, full-stack developers, and award-winning designers who work together to deliver solutions that drive real business impact, not just pretty interfaces.', 'general', true, 6);
