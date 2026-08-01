import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Chief Technology Officer',
    company: 'GlobalRetail Inc.',
    location: 'San Francisco, USA',
    quote: 'VORTX transformed our entire digital infrastructure in under four months. Their AI-powered commerce platform increased our revenue by $4.2M in the first quarter alone. The team\'s technical expertise and strategic thinking are unmatched.',
    rating: 5,
  },
  {
    name: 'Marcus Andersson',
    role: 'Head of Digital Innovation',
    company: 'MediCare Partners',
    location: 'Stockholm, Sweden',
    quote: 'Working with VORTX felt like having a true technology partner, not just a vendor. They unified our fragmented patient data systems and delivered insights that improved our diagnostic accuracy by 34%. Exceptional work.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Managing Director',
    company: 'Meridian Capital',
    location: 'Singapore',
    quote: 'The trading intelligence platform VORTX built for us is nothing short of revolutionary. What used to take our team 8 hours now takes 12 minutes. We\'ve seen a $12M profit increase directly attributable to their solution.',
    rating: 5,
  },
  {
    name: 'James OConnor',
    role: 'VP of Product',
    company: 'Global Learning Network',
    location: 'Dublin, Ireland',
    quote: 'VORTX did not just build us a platform they reimagined online education. Student engagement skyrocketed, dropout rates plummeted, and we now serve over 85,000 active learners. Their creativity and technical skill are world-class.',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Chief Operations Officer',
    company: 'TransWorld Shipping',
    location: 'Barcelona, Spain',
    quote: 'The logistics optimization system delivered by VORTX saved us $8.4M annually while improving our on-time delivery rate to 96%. Their AI-powered routing is a game-changer for our entire operation.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Creative Director',
    company: 'Stellar Creative Co.',
    location: 'Seoul, South Korea',
    quote: 'VORTX built us an asset management system that feels like magic. We\'ve saved over 720 hours annually, ensured 100% brand compliance, and accelerated our campaign delivery by 45%. Simply outstanding.',
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-shell section-shell--slate py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="section-orb top-[-120px] left-[12%] w-[480px] h-[480px] bg-white/5" />
      <div className="section-orb bottom-[-140px] right-[8%] w-[580px] h-[580px] bg-cyan-500/8" />
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
            Client Testimonials
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="section-rail w-24 mb-5" />
          <p className="section-eyebrow">Client voice</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="section-title mb-16"
        >
          Trusted by teams
          <br />
          that value precision
        </motion.h2>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
              className="group"
            >
              <div className="section-card rounded-2xl p-8 h-full flex flex-col">
                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-white/60"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/70 leading-relaxed mb-8 flex-1">
                  &quot;{testimonial.quote}&quot;
                </p>

                {/* Author info */}
                <div className="flex items-start gap-4 pt-6 border-t border-white/10">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg font-medium">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>

                  {/* Details */}
                  <div>
                    <div className="text-white font-medium mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-white/50 text-sm">
                      {testimonial.role}
                    </div>
                    <div className="text-white/40 text-sm">
                      {testimonial.company} · {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
