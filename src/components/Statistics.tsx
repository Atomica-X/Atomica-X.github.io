import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  {
    value: '8 652',
    label: 'Товарных партий продано',
    description: 'Реальное количество партий, которые мы выкупили и перепродали.',
  },
  {
    value: '€21,6 млн',
    label: 'Экономия для клиентов',
    description: 'Сумма, которую сэкономили наши партнёры благодаря ценам ниже рынка.',
  },
  {
    value: '884',
    label: 'Довольных партнёров',
    description: 'Количество дистрибьюторов и оптовиков, которые работают с нами.',
  },
  {
    value: '35+',
    label: 'Стран присутствия',
    description: 'Количество стран, куда мы поставляем товар.',
  },
];

export default function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (isInView) {
      const intervals = stats.map((stat, index) => {
        const target = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
        const isCurrency = stat.value.includes('€');
        const isPercent = stat.value.includes('%');
        const isPlus = stat.value.includes('+');
        const step = Math.max(1, Math.floor(target / 60));
        let current = 0;

        return setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(intervals[index]);
          }
          const formatted = isCurrency
            ? `€${current.toLocaleString()}${isPlus ? '+' : ''}${isPercent ? '%' : ''}`
            : isPercent
            ? `${current}%`
            : isPlus
            ? `${current}+`
            : current.toLocaleString();
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = formatted;
            return newCounts;
          });
        }, 20);
      });

      return () => intervals.forEach((interval) => clearInterval(interval));
    }
  }, [isInView]);

  return (
    <section ref={ref} className="section-shell section-shell--deep py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="section-orb top-[-120px] left-[12%] w-[520px] h-[520px] bg-orange-500/8" />
      <div className="section-orb bottom-[-140px] right-[8%] w-[640px] h-[640px] bg-white/5" />
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
            Наши результаты в цифрах
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="section-rail w-24 mb-5" />
          <p className="section-eyebrow">Цифры и факты</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="section-title mb-16"
        >
          Наши результаты в цифрах
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                {counts[index] || stat.value}
              </div>
              <div className="text-white/70 text-sm font-medium mb-2">{stat.label}</div>
              <div className="text-white/40 text-xs leading-relaxed">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
