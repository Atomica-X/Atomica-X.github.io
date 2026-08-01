import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const techCategories = [
  {
    category: 'Frontend',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'Python', 'Express', 'FastAPI', 'GraphQL', 'REST APIs'],
  },
  {
    category: 'AI & ML',
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'Hugging Face', 'scikit-learn'],
  },
  {
    category: 'Database',
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase', 'Pinecone'],
  },
  {
    category: 'DevOps',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'Vercel'],
  },
  {
    category: 'Animation',
    technologies: ['GSAP', 'Lottie', 'Rive', 'WebGL', 'Canvas API', 'SVG'],
  },
];

export default function Technologies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-shell section-shell--charcoal py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="section-orb bottom-[-140px] right-[6%] w-[660px] h-[660px] bg-blue-500/8" />
      <div className="section-orb top-[8%] left-[8%] w-[320px] h-[320px] bg-white/4" />

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
            Technology Stack
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="section-rail w-24 mb-5" />
          <p className="section-eyebrow">Tooling & systems</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="section-title mb-16"
        >
          Cutting-edge tools
          <br />
          with serious depth
        </motion.h2>

        {/* Tech grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="section-card rounded-2xl p-8">
                {/* Category label */}
                <h3 className="text-white text-xl font-medium mb-6 tracking-tight">
                  {category.category}
                </h3>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-sm text-white/70 bg-white/5 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
