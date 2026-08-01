import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Filter, Play, CheckCircle2, X, Send } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import toast from 'react-hot-toast';

interface ProjectItem {
  name: string;
  industry: string;
  client: string;
  problem: string;
  solution: string;
  outcome: string;
  timeline: string;
  gradient: string;
  stack: string[];
}

const fallbackProjects: ProjectItem[] = [
  {
    name: 'Nexus Commerce',
    industry: 'E-Commerce',
    client: 'GlobalRetail Inc.',
    problem: 'Outdated platform causing 40% cart abandonment and poor mobile experience.',
    solution: 'Built a headless commerce platform with AI-powered recommendations and real-time inventory sync.',
    stack: ['Next.js', 'Shopify', 'TensorFlow', 'Stripe'],
    timeline: '14 weeks',
    outcome: 'Reduced cart abandonment to 12%, increased mobile conversions by 180%, generated $4.2M additional revenue in first quarter.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    name: 'Aurora Health',
    industry: 'Healthcare',
    client: 'MediCare Partners',
    problem: 'Fragmented patient data across 12 systems limiting care coordination.',
    solution: 'Developed HIPAA-compliant AI platform unifying patient records with predictive health analytics.',
    stack: ['React', 'Python', 'AWS', 'OpenAI'],
    timeline: '22 weeks',
    outcome: 'Unified 500K+ patient records, reduced administrative time by 65%, improved diagnostic accuracy by 34%.',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    name: 'Quantum Finance',
    industry: 'FinTech',
    client: 'Meridian Capital',
    problem: 'Manual trading analysis taking 8+ hours daily, missing market opportunities.',
    solution: 'Created real-time market intelligence platform with ML-driven trading signals.',
    stack: ['TypeScript', 'Python', 'WebSocket', 'TensorFlow'],
    timeline: '18 weeks',
    outcome: 'Reduced analysis time to 12 minutes, identified 240% more opportunities, generated $12M profit increase.',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    name: 'EduVerse Platform',
    industry: 'Education',
    client: 'Global Learning Network',
    problem: 'Low engagement in online courses with 78% dropout rate.',
    solution: 'Built immersive learning platform with gamification, AI tutors, and adaptive content.',
    stack: ['Next.js', 'Three.js', 'OpenAI', 'Supabase'],
    timeline: '16 weeks',
    outcome: 'Reduced dropout to 23%, increased completion by 310%, serving 85K+ active students.',
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  {
    name: 'VelocityAI Logistics',
    industry: 'Supply Chain',
    client: 'TransWorld Shipping',
    problem: 'Inefficient route planning causing 35% fuel waste and delivery delays.',
    solution: 'Deployed AI-powered logistics optimization with real-time route adjustment.',
    stack: ['Python', 'TensorFlow', 'Google Maps', 'Docker'],
    timeline: '20 weeks',
    outcome: 'Cut fuel costs by 42%, improved on-time delivery to 96%, saved $8.4M annually.',
    gradient: 'from-red-500/20 to-rose-500/20',
  },
  {
    name: 'Stellar Brand Studio',
    industry: 'Creative Agency',
    client: 'Stellar Creative Co.',
    problem: 'Manual asset management losing 15+ hours weekly, inconsistent brand delivery.',
    solution: 'Built automated DAM system with AI tagging, version control, and brand guidelines engine.',
    stack: ['React', 'Node.js', 'AWS S3', 'OpenAI'],
    timeline: '12 weeks',
    outcome: 'Saved 720 hours annually, ensured 100% brand compliance, accelerated campaigns by 45%.',
    gradient: 'from-indigo-500/20 to-violet-500/20',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { projects: dbProjects } = useProjects();
  
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [demoModalProject, setDemoModalProject] = useState<ProjectItem | null>(null);
  const [demoEmail, setDemoEmail] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [demoSubmitting, setDemoSubmitting] = useState(false);

  const rawProjects = dbProjects.length > 0
    ? dbProjects.map(p => ({
        name: p.name,
        industry: p.industry,
        client: p.client,
        problem: p.problem,
        solution: p.solution,
        outcome: p.outcome,
        timeline: p.timeline || '',
        gradient: p.gradient_class || 'from-blue-500/20 to-cyan-500/20',
        stack: p.technologies,
      }))
    : fallbackProjects;

  const categories = ['All', 'AI & ML', 'FinTech & E-Com', 'Healthcare & Supply Chain'];

  const filteredProjects = rawProjects.filter((p) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'AI & ML') return p.stack.some(t => ['TensorFlow', 'OpenAI', 'Python'].includes(t));
    if (activeCategory === 'FinTech & E-Com') return ['E-Commerce', 'FinTech'].includes(p.industry);
    if (activeCategory === 'Healthcare & Supply Chain') return ['Healthcare', 'Supply Chain'].includes(p.industry);
    return true;
  });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitting(true);
    setTimeout(() => {
      setDemoSubmitting(false);
      toast.success(`Live demo request for ${demoModalProject?.name} submitted!`);
      setDemoModalProject(null);
      setDemoEmail('');
    }, 600);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Architecture review requested! Our lead will email you shortly.');
    setReviewEmail('');
  };

  return (
    <section ref={ref} id="projects" className="section-shell section-shell--navy py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="section-orb top-[-120px] left-[5%] w-[520px] h-[520px] bg-fuchsia-500/10" />
      <div className="section-orb bottom-[-160px] right-[8%] w-[620px] h-[620px] bg-cyan-500/8" />

      <div className="max-w-7xl mx-auto relative">
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
            Featured Work
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="section-rail w-24 mb-5" />
          <p className="section-eyebrow">Selected work</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="section-title max-w-3xl"
          >
            Selected work that
            <br />
            carries real weight
          </motion.h2>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10 shrink-0 backdrop-blur-sm"
          >
            <Filter size={14} className="text-white/40 ml-2" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-black shadow-md'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute -inset-4 bg-gradient-to-br ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700`} />

              <div className="section-card rounded-2xl p-8 h-full flex flex-col justify-between">
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-white text-2xl font-medium mb-2 tracking-tight">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-white/50 text-sm">{project.industry}</span>
                        <span className="text-white/20">•</span>
                        <span className="text-white/50 text-sm">{project.client}</span>
                      </div>
                    </div>

                    {project.timeline && (
                      <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        {project.timeline}
                      </span>
                    )}
                  </div>

                  {/* Problem & Solution */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
                        Challenge
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
                        Solution
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Impact Outcome Badge */}
                  <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4 mb-6">
                    <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <CheckCircle2 size={13} />
                      Key Result & Impact
                    </div>
                    <p className="text-white/90 text-sm font-medium leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                </div>

                {/* Tech Stack & Action Buttons */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <button
                      onClick={() => setDemoModalProject(project)}
                      className="section-cta-outline px-4 py-2.5 rounded-xl"
                    >
                      <Play size={12} className="fill-white" />
                      <span>Request Live Demo</span>
                    </button>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
                    >
                      <span>Similar Inquiry</span>
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Architecture Review Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="section-card bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-black rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="max-w-2xl">
            <h3 className="text-white text-2xl md:text-3xl font-medium mb-3">
              Have a Similar Enterprise Vision?
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Get a complimentary 30-minute system architecture review & estimate from our Principal Engineers.
            </p>

            <form onSubmit={handleReviewSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter work email..."
                value={reviewEmail}
                onChange={(e) => setReviewEmail(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 flex-1 transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-black px-6 py-3 text-sm font-medium rounded-xl hover:bg-white/90 transition-all shrink-0 btn-cut"
              >
                Request Free Review
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Live Demo Request Modal */}
      <AnimatePresence>
        {demoModalProject && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#12121a] border border-white/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6 relative"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Play size={16} className="text-blue-400 fill-blue-400" />
                  <h3 className="text-white font-medium">Request Live Demo</h3>
                </div>
                <button
                  onClick={() => setDemoModalProject(null)}
                  className="text-white/40 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-semibold text-lg">{demoModalProject.name}</h4>
                <p className="text-white/50 text-xs mt-1">{demoModalProject.solution}</p>
              </div>

              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <label className="text-white/60 text-xs font-medium mb-1.5 block">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setDemoModalProject(null)}
                    className="px-4 py-2.5 text-xs text-white/60 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={demoSubmitting}
                    className="bg-white text-black px-5 py-2.5 text-xs font-medium rounded-xl hover:bg-white/90 transition-colors flex items-center gap-1.5 disabled:opacity-50 btn-cut"
                  >
                    <Send size={12} />
                    {demoSubmitting ? 'Sending...' : 'Schedule Walkthrough'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
