import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Calculator, CheckCircle2, Clock, Calendar, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Глубокий аудит ваших бизнес-процессов, IT-инфраструктуры и точек боли. 190 AI-агентов одновременно анализируют ваши данные, интервьюируют ключевых сотрудников и сравнивают с нашей внутренней базой кейсов.',
    duration: '3–5 дней',
    deliverables: ['Техническая спецификация', 'Карта боли', 'ROI-калькуляция'],
  },
  {
    number: '02',
    title: 'Подбор партий',
    description: 'Автономный поиск подходящих партий на основе ваших требований. 190 AI-агентов и собственные парсеры мониторят складские остатки, банкротные и ликвидационные активы, а также стоковую продукцию в реальном времени. Система находит оптимальные партии за минуты, а не дни.',
    duration: '1–3 дня',
    deliverables: ['Список доступных партий', 'Расчёт TCO', 'Рекомендации по выбору'],
  },
  {
    number: '03',
    title: 'Оценка и предложение',
    description: 'Автономная оценка найденных партий через 15 AI-агентов, которые проверяют юридические реквизиты, сканируют санкционные списки, анализируют рыночные цены и рассчитывают полную себестоимость. Формируется персонализированное коммерческое предложение.',
    duration: '1–2 дня',
    deliverables: ['Коммерческое предложение', 'Детали партии', 'Условия оплаты'],
  },
  {
    number: '04',
    title: 'Согласование и контракт',
    description: 'Подготовка и согласование договора через SLM-модели анализа документов. Все условия проверяются на соответствие вашим требованиям и регуляторным стандартам. Поддержка электронной подписи для мгновенного подписания.',
    duration: '2–4 дня',
    deliverables: ['Подписанный договор', 'Платёжный порядок', 'Подтверждение партии'],
  },
  {
    number: '05',
    title: 'Логистика и фрахт',
    description: 'Автономная оптимизация логистических маршрутов через цифровой фрахт. 47 AI-агентов анализируют морские расписания, транспортные ограничения и погодные условия для выбора оптимального маршрута. Интеграция с вашими логистическими партнёрами через MCP-шлюзы.',
    duration: '1–2 дня',
    deliverables: ['Маршрут доставки', 'Расчёт фрахта', 'Трек-номер', 'План отгрузки'],
  },
  {
    number: '06',
    title: 'Отгрузка и расчёты',
    description: 'Координация отгрузки через наших партнёров и выполнение расчётов через платёжный шлюз. Поддержка 47 фиатных валют и 12 криптовалют с мгновенной конвертацией по курсу реального времени. Автоматическая генерация счетов и актов.',
    duration: '1–3 дня',
    deliverables: ['Подтверждение отгрузки', 'Финансовые документы', 'Подтверждение оплаты', 'Передача товара'],
  },
  {
    number: '07',
    title: 'Поддержка и развитие партнёрства',
    description: 'Постоянный мониторинг эффективности через BI-аналитику, ежемесячные AI-аудиты и автоматическое масштабирование. Мы не сдаём проект — мы растём вместе с вашим бизнесом, находя новые возможности для оптимизации.',
    duration: 'ongoing',
    deliverables: ['Ежемесячные отчёты', 'Roadmap на следующий квартал', 'SLA 15 минут на критические задачи'],
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
    toast.success(`Расчёт выполнен! Примерный срок: ${estimatedWeeks} недель.`);
    const contactElem = document.getElementById('contact');
    if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} id="process" className="section-shell section-shell--graphite py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="section-orb top-[10%] right-[6%] w-[560px] h-[560px] bg-orange-500/8" />
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
            Как мы работаем
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="section-rail w-24 mb-5" />
          <p className="section-eyebrow">Процесс</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="section-title max-w-3xl"
          >
            От запроса до отгрузки — за считанные дни
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
              <span>Оставить заявку</span>
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
          Мы сопровождаем вас на каждом этапе: от подбора партии до поставки. Никаких задержек, только прозрачность и скорость.
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
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Calculator size={20} />
            </div>
            <div>
              <h3 className="text-white text-xl font-medium">Калькулятор вашей сделки</h3>
              <p className="text-white/50 text-xs">Оцените примерный срок и стоимость партии под ваш запрос</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Input selectors */}
            <div className="lg:col-span-2 space-y-6">
              {/* Type Select */}
              <div>
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider block mb-3">
                  Тип сделки
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'web', label: 'Стандартная партия' },
                    { id: 'ai', label: 'Сложный поиск' },
                    { id: 'cloud', label: 'Крупная партия' },
                    { id: 'full', label: 'Полный пакет' },
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
                  Объём партии
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'mvp', label: 'До 10 контейнеров' },
                    { id: 'growth', label: '10–50 контейнеров' },
                    { id: 'enterprise', label: '50+ контейнеров' },
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
                  Примерный срок
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {estimatedWeeks} <span className="text-lg font-normal text-white/60">недель</span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed mb-6">
                  Включает подбор партии, оценку, логистику и полное сопровождение сделки.
                </p>
              </div>

              <button
                onClick={handleBookDiscovery}
                className="w-full section-cta py-3.5 px-4 text-xs font-medium rounded-xl flex items-center justify-center gap-2 btn-cut"
              >
                <Sparkles size={14} />
                <span>Запросить расчёт</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
