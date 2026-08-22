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
      title: 'Миссия',
      subtitle: 'Исключить человеческий фактор',
      description:
        'Исключить человеческий фактор из операционных решений B2B-торговли, сохранив при этом полную коммерческую ответственность за ключевые развилки. Мы строим автономную среду, где субъективный фактор и операционные задержки полностью устранены.',
      highlights: [
        'Автономная обработка данных 24/7',
        'Принятие решений о сделках за минуты',
        'Полное устранение субъективного фактора',
      ],
    },
    {
      id: 'vision' as const,
      icon: Sparkles,
      title: 'Видение',
      subtitle: 'Стандарт автономной торговли',
      description:
        'Стать стандартом автономной торговли для профессиональных участников рынка, где каждая сделка основывается на данных в реальном времени, а не на устаревших отчётах. Мы формируем будущее, где торговые операции самодостаточны и безопасны.',
      highlights: [
        'Данные в реальном времени',
        'Профессиональные участники рынка',
        'Стандарт отрасли',
      ],
    },
    {
      id: 'values' as const,
      icon: Shield,
      title: 'Ценности',
      subtitle: 'Принципы Zero Human',
      description:
        'Zero Human как стандарт, собственный капитал, скорость обработки данных, конфиденциальность, технологичность, экспертность — шесть принципов, которые определяют каждый наш шаг.',
      highlights: [
        'Zero Human — устранение лишних звеньев',
        'Собственный капитал и полный контроль',
        '190 AI-агентов и парсеры 24/7',
        'Закрытый контур и конфиденциальность',
        'SLM, MCP, SQL, голосовые ассистенты',
      ],
    },
  ];

  return (
    <section ref={ref} id="about" className="section-shell section-shell--alt py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="section-orb top-[-120px] left-[12%] w-[520px] h-[520px] bg-orange-500/12" />
      <div className="section-orb bottom-[-140px] right-[8%] w-[640px] h-[640px] bg-orange-400/8" />

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
            О компании
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="section-rail w-24 mb-5" />
          <p className="section-eyebrow">О компании</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="section-title mb-8 max-w-4xl"
        >
          Торгуем крупными партиями. Работаем с лидерами.
        </motion.h2>

        {/* Description & Action buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl"
          >
            ATOMICA — автономная технологическая торговая платформа, построенная на принципах Zero Human. Мы создали инфраструктуру, в которой ключевые бизнес-процессы — от мониторинга рынка до обработки сделок — выполняются искусственным интеллектом без участия человека. Это не просто автоматизация ради автоматизации. Это новая модель торговой компании, где скорость, точность и конфиденциальность достигаются за счёт глубокой интеграции передовых цифровых систем и собственных вычислительных мощностей.
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
              <span>Оставить заявку</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#services"
              className="section-cta-outline btn-cut px-6 py-3.5 text-sm font-medium rounded-xl"
            >
              <span>Наши услуги</span>
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
                    ? 'border-white/40 bg-white/[0.08] shadow-2xl shadow-orange-500/10'
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
              <h4 className="text-white text-lg font-medium">Глобальное присутствие</h4>
              <p className="text-white/50 text-sm">Команды в Европе, Азии и странах СНГ.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="section-cta-outline px-5 py-3 rounded-xl shrink-0"
          >
            <span>Связаться с командой</span>
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
