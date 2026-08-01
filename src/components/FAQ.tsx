import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: 'What industries do you serve?',
    answer: 'We work across all major industries including e-commerce, healthcare, finance, education, logistics, creative agencies, and more. Our technology solutions are adaptable to any sector looking to innovate.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. Most projects range from 8 to 20 weeks from discovery to launch. We provide detailed timelines during our initial consultation.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer: 'Yes. We provide comprehensive post-launch support including maintenance, feature enhancements, performance monitoring, security updates, and dedicated technical assistance as your business evolves.',
  },
  {
    question: 'What is your development process?',
    answer: 'We follow a proven 7-stage methodology: Discovery, Strategy, Design, Development, Testing, Launch, and Support. This ensures quality, transparency, and alignment with your business objectives at every phase.',
  },
  {
    question: 'Can you integrate with existing systems?',
    answer: 'Absolutely. We specialize in seamless integrations with existing platforms, databases, APIs, and third-party services. Our solutions are designed to enhance, not replace, your current technology stack.',
  },
  {
    question: 'What makes VORTX different from other agencies?',
    answer: 'We combine strategic thinking with technical excellence. Our team includes AI engineers, full-stack developers, and award-winning designers who work together to deliver solutions that drive real business impact, not just pretty interfaces.',
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="section-shell section-shell--deep py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="section-orb top-[-100px] right-[10%] w-[460px] h-[460px] bg-white/5" />
      <div className="section-orb bottom-[-120px] left-[8%] w-[380px] h-[380px] bg-blue-400/6" />
      <div className="max-w-4xl mx-auto relative">
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
            Frequently Asked Questions
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="section-rail w-24 mb-5" />
          <p className="section-eyebrow">Clarifying the work</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="section-title mb-16"
        >
          Questions that usually
          <br />
          come up
        </motion.h2>

        {/* FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
                className="section-card w-full text-left rounded-2xl p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-white text-lg md:text-xl font-medium tracking-tight flex-1">
                    {faq.question}
                  </h3>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-90' : ''
                    }`}
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                {openIndex === index && (
                  <motion.div
                    id={`faq-panel-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-white/70 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
