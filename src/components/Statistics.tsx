import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { number: '240+', label: 'Completed Projects', description: 'Across 6 continents' },
  { number: '38', label: 'Countries Served', description: 'Global reach and impact' },
  { number: '85+', label: 'Team Members', description: 'Expert professionals' },
  { number: '98%', label: 'Client Satisfaction', description: 'Average rating score' },
  { number: '8', label: 'Years of Excellence', description: 'Since 2018' },
  { number: '24', label: 'Industry Awards', description: 'International recognition' },
];

export default function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-shell section-shell--alt py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="section-orb top-[8%] right-[10%] w-[680px] h-[680px] bg-indigo-500/8" />
      <div className="section-orb bottom-[-160px] left-[12%] w-[520px] h-[520px] bg-white/5" />

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
            By The Numbers
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="section-rail w-24 mb-5" />
          <p className="section-eyebrow">Performance signal</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="section-title mb-16"
        >
          Measured by the work,
          <br />
          not the noise
        </motion.h2>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Hover glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative text-center">
                <div className="text-white text-4xl md:text-5xl font-medium mb-3 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm mb-1 font-medium">
                  {stat.label}
                </div>
                <div className="text-white/40 text-xs">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
