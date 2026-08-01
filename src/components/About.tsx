import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Sparkles, Shield, Rocket, Globe } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');

  const tabs = [
    {
      id: 'mission' as const,
      icon: Rocket,
      title: 'Mission',
      subtitle: 'Driving Measurable Impact',
      description:
        'To empower organizations with intelligent technology solutions that drive measurable impact, foster innovation, and create lasting value in an ever-evolving digital landscape.',
      highlights: [
        'Enterprise AI & Machine Learning Integration',
        'High-Throughput Distributed Cloud Systems',
        'Human-Centered Digital Product Design',
      ],
    },
    {
      id: 'vision' as const,
      icon: Sparkles,
      title: 'Vision',
      subtitle: 'Global Excellence Benchmark',
      description:
        'To be recognized as the global standard for excellence in creative technology, where every project we deliver becomes a benchmark for innovation, speed, and craftsmanship.',
      highlights: [
        'Next-Gen Spatial & Web3 Architectures',
        '99.99% Availability Infrastructure SLAs',
        'Continuous AI Model Optimization Pipelines',
      ],
    },
    {
      id: 'values' as const,
      icon: Shield,
      title: 'Core Values',
      subtitle: 'Principles Without Compromise',
      description:
        'Excellence without compromise. Relentless innovation. Transparent collaboration. Sustainable growth. Ethical technology. Human-centered design.',
      highlights: [
        'Zero-Trust Security & IP Confidentiality',
        'Agile Iteration with 100% Code Transparency',
        'Dedicated Senior Engineering Taskforces',
      ],
    },
  ];

  return (
    <section ref={ref} id="about" className="section-shell section-shell--alt py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="section-orb top-[-120px] left-[12%] w-[520px] h-[520px] bg-blue-500/12" />
      <div className="section-orb bottom-[-140px] right-[8%] w-[640px] h-[640px] bg-indigo-400/8" />

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
            About VORTX
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="section-rail w-24 mb-5" />
          <p className="section-eyebrow">Studio philosophy</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="section-title mb-8 max-w-4xl"
        >
          Quietly building the future
          <br />
          of digital experience
        </motion.h2>

        {/* Description & Action buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl"
          >
            We are a compact studio of strategists, engineers, and designers building systems that feel precise, calm, and unmistakably modern. Our work lives at the intersection of product thinking, engineering rigor, and visual craft.
          </motion.p>

          {/* Interactive CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 shrink-0"
          >
            <a
              href="#contact"
              className="section-cta btn-cut px-6 py-3.5 text-sm font-medium rounded-xl"
            >
              <span>Request Demo</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#services"
              className="section-cta-outline btn-cut px-6 py-3.5 text-sm font-medium rounded-xl"
            >
              <span>View Services</span>
            </a>
          </motion.div>
        </div>

        {/* Three-column interactive tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
                onClick={() => setActiveTab(tab.id)}
                className={`section-card cursor-pointer group relative rounded-2xl p-8 transition-all duration-500 ${
                  isActive
                    ? 'border-white/40 bg-white/[0.08] shadow-2xl shadow-blue-500/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                    <Icon size={22} />
                  </div>
                  <span className="text-xs text-white/40 font-mono tracking-widest uppercase">
                    {tab.subtitle}
                  </span>
                </div>

                <h3 className="text-white text-2xl font-medium mb-3 tracking-tight">
                  {tab.title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm mb-6">
                  {tab.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  {tab.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-white/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Impact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-card rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Globe className="text-white w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-lg font-medium">Global Delivery Capability</h4>
              <p className="text-white/50 text-sm">Teams distributed across North America, Europe, and Asia Pacific.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="section-cta-outline px-5 py-3 rounded-xl shrink-0"
          >
            <span>Contact Global Team</span>
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
