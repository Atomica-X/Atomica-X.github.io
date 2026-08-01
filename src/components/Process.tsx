import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Calculator, CheckCircle2, Clock, Calendar, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'Deep research into your business, users, and market landscape. We analyze competitors, identify opportunities, and define success metrics.',
    duration: '1-2 weeks',
    deliverables: ['Stakeholder Interviews', 'Competitive Matrix', 'Technical Requirements Spec'],
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'Comprehensive roadmap development with technical architecture, user flows, and feature prioritization aligned to business objectives.',
    duration: '1-2 weeks',
    deliverables: ['System Architecture Blueprint', 'User Journey Mapping', 'Sprint Backlog & Scope'],
  },
  {
    number: '03',
    title: 'Design',
    description:
      'High-fidelity prototypes, design systems, and interactive mockups that bring your vision to life before a single line of code is written.',
    duration: '2-4 weeks',
    deliverables: ['Figma Token System', 'Clickable Prototype', 'Usability Test Reports'],
  },
  {
    number: '04',
    title: 'Development',
    description:
      'Agile development sprints with clean code, comprehensive testing, and weekly demos to ensure alignment and rapid iteration.',
    duration: '4-12 weeks',
    deliverables: ['Production Ready Codebase', 'Automated CI/CD Pipeline', 'Weekly Staging Demos'],
  },
  {
    number: '05',
    title: 'Testing',
    description:
      'Rigorous QA across devices, browsers, and use cases. Performance optimization, security audits, and accessibility compliance.',
    duration: '1-2 weeks',
    deliverables: ['Penetration Testing Audit', 'Lighthouse 95+ Score Report', 'Cross-Browser Suite'],
  },
  {
    number: '06',
    title: 'Launch',
    description:
      'Strategic deployment with monitoring, analytics integration, and post-launch optimization to ensure flawless performance.',
    duration: '1 week',
    deliverables: ['DNS & CDN Switchover', 'Real-Time Error Alerting', 'Analytics Dashboard'],
  },
  {
    number: '07',
    title: 'Support',
    description:
      'Ongoing maintenance, feature enhancements, and dedicated support to evolve your product as your business grows.',
    duration: 'Ongoing',
    deliverables: ['SLA Guarantee', '24/7 Server Monitoring', 'Monthly Feature Releases'],
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Interactive Estimator State
  const [projectType, setProjectType] = useState<'web' | 'ai' | 'cloud' | 'full'>('web');
  const [scopeSize, setScopeSize] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [estimatedWeeks, setEstimatedWeeks] = useState(8);

  const calculateEstimate = (type: typeof projectType, scope: typeof scopeSize) => {
    let weeks = 6;
    if (type === 'ai') weeks += 4;
    if (type === 'cloud') weeks += 2;
    if (type === 'full') weeks += 6;

    if (scope === 'growth') weeks += 4;
    if (scope === 'enterprise') weeks += 8;

    return weeks;
  };

  const handleTypeChange = (type: typeof projectType) => {
    setProjectType(type);
    setEstimatedWeeks(calculateEstimate(type, scopeSize));
  };

  const handleScopeChange = (scope: typeof scopeSize) => {
    setScopeSize(scope);
    setEstimatedWeeks(calculateEstimate(projectType, scope));
  };

  const handleBookDiscovery = () => {
    toast.success(`Estimate booked! Calculated timeframe: ${estimatedWeeks} weeks.`);
    const contactElem = document.getElementById('contact');
    if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} id="process" className="section-shell section-shell--graphite py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="section-orb top-[10%] right-[6%] w-[560px] h-[560px] bg-blue-500/8" />
      <div className="section-orb bottom-[-120px] left-[8%] w-[480px] h-[480px] bg-white/5" />
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
            Our Process
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="section-rail w-24 mb-5" />
          <p className="section-eyebrow">Delivery framework</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="section-title max-w-3xl"
          >
            A deliberate path
            <br />
            from concept to launch
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 shrink-0"
          >
            <a
              href="#contact"
              className="section-cta btn-cut px-6 py-3.5 text-sm font-medium rounded-xl"
            >
              <span>Schedule Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/70 text-lg leading-relaxed max-w-3xl mb-16"
        >
          We move with clarity from first conversation to launch, keeping the product sharp, the collaboration calm, and the delivery confident.
        </motion.p>

        {/* Process steps */}
        <div className="relative mb-24">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent hidden md:block" />

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 4, transition: { duration: 0.25 } }}
                className="group relative"
              >
                <div className="flex items-start gap-8">
                  {/* Number badge */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500">
                      <span className="text-white/60 text-sm font-light">{step.number}</span>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white text-2xl font-medium tracking-tight">
                        {step.title}
                      </h3>
                      <span className="text-white/40 text-sm hidden md:block flex items-center gap-1.5">
                        <Clock size={13} />
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-white/60 leading-relaxed max-w-2xl mb-4 text-sm md:text-base">
                      {step.description}
                    </p>

                    {/* Step Deliverables */}
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((del, dIdx) => (
                        <span
                          key={dIdx}
                          className="text-xs text-white/50 bg-white/5 px-3 py-1 rounded-lg border border-white/10 flex items-center gap-1.5"
                        >
                          <CheckCircle2 size={11} className="text-white/40" />
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Project Timeline & Scope Estimator Widget */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-card rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Calculator size={20} />
            </div>
            <div>
              <h3 className="text-white text-xl font-medium">Interactive Project Estimator</h3>
              <p className="text-white/50 text-xs">Estimate your delivery timeline based on project scope</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Input selectors */}
            <div className="lg:col-span-2 space-y-6">
              {/* Type Select */}
              <div>
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider block mb-3">
                  Project Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'web', label: 'Web Platform' },
                    { id: 'ai', label: 'AI Solution' },
                    { id: 'cloud', label: 'Cloud Migration' },
                    { id: 'full', label: 'Full Product Suite' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTypeChange(item.id as typeof projectType)}
                      className={`px-4 py-3 rounded-xl text-xs font-medium border transition-all text-center ${
                        projectType === item.id
                          ? 'bg-white text-black border-white font-semibold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scope Size */}
              <div>
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider block mb-3">
                  Project Scale
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'mvp', label: 'Core MVP (Fast Launch)' },
                    { id: 'growth', label: 'Growth Platform (Full Features)' },
                    { id: 'enterprise', label: 'Enterprise Ecosystem' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleScopeChange(item.id as typeof scopeSize)}
                      className={`px-4 py-3 rounded-xl text-xs font-medium border transition-all text-center ${
                        scopeSize === item.id
                          ? 'bg-white text-black border-white font-semibold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-2xl p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider mb-2">
                  <Calendar size={14} />
                  Estimated Delivery Time
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {estimatedWeeks} <span className="text-lg font-normal text-white/60">Weeks</span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed mb-6">
                  Includes full Discovery, Architecture, Agile Sprints, QA, and Production Launch.
                </p>
              </div>

              <button
                onClick={handleBookDiscovery}
                className="w-full section-cta py-3.5 px-4 text-xs font-medium rounded-xl flex items-center justify-center gap-2 btn-cut"
              >
                <Sparkles size={14} />
                <span>Book This Timeline</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
