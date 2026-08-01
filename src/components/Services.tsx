import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, X, Sparkles, Send } from 'lucide-react';
import { useServices } from '../hooks/useServices';
import toast from 'react-hot-toast';

interface ServiceDetail {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  deliverables: string[];
  timeline: string;
  keyFeatures: string[];
}

const fallbackServices: ServiceDetail[] = [
  {
    number: '01',
    title: 'AI Engineering',
    description:
      'Custom machine learning models, natural language processing, computer vision, and intelligent automation systems that transform raw data into actionable intelligence.',
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain'],
    deliverables: [
      'Custom LLM Fine-Tuning & Prompt Pipelines',
      'Real-Time Computer Vision & OCR Systems',
      'Predictive Analytics & Recommendation Engines',
      'Automated MLOps & Continuous Training Pipelines',
    ],
    timeline: '6 - 12 Weeks',
    keyFeatures: ['99.5% Accuracy Thresholds', 'Sub-100ms Inference Latency', 'SOC2 Compliant Data Privacy'],
  },
  {
    number: '02',
    title: 'Web Development',
    description:
      'High-performance web applications built with modern frameworks, optimized for speed, accessibility, and seamless user experiences across all devices.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    deliverables: [
      'Headless Architecture & SSR Web Platforms',
      'Sub-Second Page Load Optimization',
      'Cross-Platform Mobile Progressive Apps',
      'Custom Microservices & GraphQL APIs',
    ],
    timeline: '4 - 10 Weeks',
    keyFeatures: ['100/100 Lighthouse Performance', 'SEO & Accessibility Optimized', 'Global Edge CDN Deployment'],
  },
  {
    number: '03',
    title: 'Creative Design',
    description:
      'Award-winning visual identities, immersive interfaces, and motion design that captivate audiences and elevate brand perception to new heights.',
    technologies: ['Figma', 'After Effects', 'Blender', 'Cinema 4D'],
    deliverables: [
      'Interactive Design Systems & UI Components',
      '3D Product Motion Graphics & Visuals',
      'High-Fidelity Wireframes & User Prototypes',
      'UX Journey Optimization & Heatmap Audits',
    ],
    timeline: '3 - 8 Weeks',
    keyFeatures: ['Pixel-Perfect Token Libraries', '60fps Micro-Animations', 'Multi-Brand System Scalability'],
  },
  {
    number: '04',
    title: 'Automation Systems',
    description:
      'End-to-end workflow automation, intelligent process optimization, and custom integrations that eliminate manual tasks and accelerate business operations.',
    technologies: ['Zapier', 'n8n', 'Python', 'Selenium'],
    deliverables: [
      'Enterprise Workflow Orchestration Engine',
      'Automated Document Processing & Parsing',
      'Cross-SaaS API Synchronization Bots',
      'Error Recovery & Audit Alerting Logging',
    ],
    timeline: '2 - 6 Weeks',
    keyFeatures: ['80%+ Reduction in Manual Hours', 'Real-Time Failure Notifications', 'Self-Healing Retry Logic'],
  },
  {
    number: '05',
    title: 'Cloud Infrastructure',
    description:
      'Scalable cloud architecture, containerized deployments, serverless computing, and DevOps pipelines designed for reliability and performance.',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    deliverables: [
      'Infrastructure as Code (IaC) Repositories',
      'Multi-Region Kubernetes Auto-Scaling',
      'Zero-Downtime CI/CD Build Pipelines',
      'Disaster Recovery & Automated Backup Plans',
    ],
    timeline: '4 - 8 Weeks',
    keyFeatures: ['99.99% Uptime SLA', 'Automated Cost Savings Optimization', 'Bank-Grade Security Hardening'],
  },
  {
    number: '06',
    title: 'Brand Identity',
    description:
      'Comprehensive brand strategy, visual systems, and messaging frameworks that create memorable identities and drive market differentiation.',
    technologies: ['Strategy', 'Typography', 'Guidelines', 'Systems'],
    deliverables: [
      'Complete Brand Book & Style Guidelines',
      'Custom Typography & Color Palette Tokens',
      'Marketing Collateral & Presentation Decks',
      'Brand Voice & Messaging Playbook',
    ],
    timeline: '3 - 6 Weeks',
    keyFeatures: ['100% Brand Ownership Rights', 'Multi-Channel Scalability', 'Vector Master Asset Library'],
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { services: dbServices } = useServices();

  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const services = dbServices.length > 0
    ? dbServices.map((s, idx) => ({
        number: s.number,
        title: s.title,
        description: s.description,
        technologies: s.technologies,
        deliverables: fallbackServices[idx]?.deliverables || [
          'Custom Architecture & Codebase',
          'Production Deployment & Docs',
          'Quality Assurance & Security Checks',
        ],
        timeline: fallbackServices[idx]?.timeline || '4-8 Weeks',
        keyFeatures: fallbackServices[idx]?.keyFeatures || ['High Scalability', 'Enterprise Support'],
      }))
    : fallbackServices;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(`Inquiry for ${selectedService?.title} submitted successfully!`);
      setSelectedService(null);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryNotes('');
    }, 600);
  };

  return (
    <section ref={ref} id="services" className="section-shell section-shell--deep py-24 md:py-32 px-6 md:px-10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-white/40" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <span className="section-label">
            Our Services
          </span>
        </motion.div>

        {/* Main heading & Header CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="section-title"

          >
            Systems shaped for
            <br />
            ambitious product teams
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 shrink-0"
          >
            <a
              href="#contact"
              className="section-cta btn-cut px-6 py-3.5 text-sm font-medium rounded-xl"
            >
              <span>Custom Service Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="group relative">
              {/* Hover glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
                className="section-card rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between"
              >
                <div>
                  {/* Number badge & Timeline */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/30 text-sm font-light">{service.number}</span>
                    <span className="text-xs text-white/40 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      Est: {service.timeline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-2xl md:text-3xl font-medium mb-4 tracking-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed mb-6 text-sm md:text-base">
                    {service.description}
                  </p>

                  {/* Key Features Bullet List */}
                  <div className="space-y-2 mb-6">
                    {service.keyFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-white/50">
                        <CheckCircle2 size={13} className="text-white/40 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-2 text-white text-sm hover:text-white/80 transition-all duration-300 font-medium"
                  >
                    <span>View Deliverables & Spec</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs section-cta-outline px-3.5 py-2 rounded-lg border border-white/15 transition-all"
                  >
                    Request Consultation
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Service Spec & Inquiry Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#12121a] border border-white/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs font-mono text-white">
                    {selectedService.number}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">{selectedService.title}</h3>
                    <p className="text-white/40 text-xs">Full Specification & Deliverables</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                <p className="text-white/70 text-sm leading-relaxed">{selectedService.description}</p>

                {/* Key Deliverables */}
                <div>
                  <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3 text-white/50">
                    Included Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-start gap-2.5"
                      >
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-white/80 text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Consultation Form */}
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                  <h4 className="text-white text-sm font-medium mb-1 flex items-center gap-2">
                    <Sparkles size={14} className="text-blue-400" />
                    Request Service Consultation
                  </h4>
                  <p className="text-white/40 text-xs mb-4">
                    Send your project details for an immediate response from our engineering lead.
                  </p>

                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Work Email"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Brief notes or requirements (optional)..."
                      value={inquiryNotes}
                      onChange={(e) => setInquiryNotes(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="bg-white text-black px-5 py-2 text-xs font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Send size={12} />
                        {submitting ? 'Submitting...' : 'Submit Inquiry'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
