import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, X, Sparkles, Send } from 'lucide-react';
import { useServices } from '../hooks/useServices';
import toast from 'react-hot-toast';

interface ServiceDetail {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  deliverables: string[];
  timeline: string;
  keyFeatures: string[];
}

const fallbackServices: ServiceDetail[] = [
  {
    number: '01',
    title: 'AI-консультант',
    description: 'Автономный AI-агент, который интегрируется в ваш бизнес-процесс и принимает решения на основе анализа данных с 190 специализированных агентов ATOMICA. Выполняет мониторинг рынка, поиск партий и подготовку коммерческих предложений без участия человека.',
    technologies: ['SLM-модели', 'MCP-шлюзы', 'SQL-базы', 'Парсеры', 'AI-агенты'],
    deliverables: [
      'Автономный мониторинг рынка 24/7',
      'Поиск партий за минуты',
      'Подготовка коммерческих предложений без участия человека',
      'Интеграция через стандартные API'
    ],
    timeline: '2–4 недели',
    keyFeatures: [
      'Работает 24/7/365 без перерывов',
      'Принимает решения за минуты, а не дни',
      'Интеграция без изменения вашей инфраструктуры',
      'Обработка данных из 1000+ источников в реальном времени',
      'Исключение субъективного фактора'
    ],
  },
  {
    number: '02',
    title: 'Цифровой фрахт',
    description: 'Автономная оптимизация логистических маршрутов и расчёт фрахтовых ставок на основе данных о морских расписаниях, транспортных ограничениях и валютных курсах. Сокращает время поиска оптимального маршрута с дней до секунд.',
    technologies: ['MCP-серверы', 'SLM-модели', 'SQL-базы', 'Парсеры', 'API логистики'],
    deliverables: [
      'Оптимальный маршрут за секунды',
      'Расчёт фрахта с учётом НДС и пошлин',
      'Прозрачный трекинг груза в реальном времени',
      'Интеграция с валютными курсами'
    ],
    timeline: '3–6 недель',
    keyFeatures: [
      'Автоматический подбор маршрута за секунды',
      'Экономия на фрахте до 18%',
      'Прозрачный трекинг статуса груза',
      'Интеграция с валютными курсами',
      'Автоматическая адаптация к изменениям цен'
    ],
  },
  {
    number: '03',
    title: 'BI-аналитика',
    description: 'Система автономного сбора, обработки и визуализации бизнес-данных из ваших источников и внешних рыночных источников. Создаёт дашборды и аналитические отчёты без участия аналитика — ИИ сам определяет, какие метрики важны именно вашему бизнесу.',
    technologies: ['SLM-модели', 'SQL-базы', 'MCP-шлюзы', 'AI-агенты', 'ETL-агенты'],
    deliverables: [
      'Автоматическая генерация отчётов по расписанию',
      'Обнаружение скрытых трендов и аномалий',
      'Интеграция с внешними рыночными данными',
      'Экспорт в Excel, PDF, CSV'
    ],
    timeline: '2–5 недель',
    keyFeatures: [
      'Отчёты без участия аналитика',
      'Обнаружение аномалий без ручной настройки',
      'Интеграция с внешними источниками',
      'Экспорт в любые форматы',
      'Централизованное управление доступом'
    ],
  },
  {
    number: '04',
    title: 'Интеграция платежей',
    description: 'Платёжный шлюз для работы с фиатными и криптовалютными активами с автоматическим аудитом и соответствием регуляциям. Обрабатывает расчёты между контрагентами в реальном времени, включая валютные конвертации и налоговые расчёты.',
    technologies: ['MCP-серверы', 'SLM-модели', 'SQL-базы', 'Платёжные модули', 'API'],
    deliverables: [
      'Мгновенная конвертация валют по курсу реального времени',
      'Поддержка 47 фиатных валют и 12 криптовалют',
      'Автоматическая генерация счетов и актов',
      'Полный аудиторский след'
    ],
    timeline: '4–8 недель',
    keyFeatures: [
      'Мгновенная конвертация валют',
      '47 фиатных валют и 12 криптовалют',
      'Автоматическая генерация документов',
      'Шифрование AES-256',
      'Аудит для GDPR, PCI DSS, SOC 2'
    ],
  },
  {
    number: '05',
    title: 'Облачная инфраструктура',
    description: 'Управляемые вычислительные мощности для развёртывания и масштабирования AI-агентов ATOMICA. Обеспечивает 99.99% uptime, автоматическое масштабирование и защиту данных на уровне предприятия.',
    technologies: ['Kubernetes', 'AES-256', 'Edge-узлы', 'SQL-базы', 'SLM-модели'],
    deliverables: [
      'Масштабирование до 10 000 запросов',
      'Балансировка нагрузки между регионами',
      'Zero-downtime деплой новых версий',
      'Автоматическое резервное копирование'
    ],
    timeline: '2–6 недель',
    keyFeatures: [
      'Масштабирование до 10 000 запросов',
      'Балансировка нагрузки между регионами',
      'Zero-downtime деплой',
      'Защита от DDoS и brute-force',
      'Автоматическое резервное копирование'
    ],
  },
  {
    number: '06',
    title: 'Брендинг и стратегия',
    description: 'Разработка позиционирования и коммуникационной стратегии для технологических B2B-компаний. На основе анализа рыночных данных и конкурентного аудита создаётся месседж, который привлекает enterprise-клиентов и удерживает их.',
    technologies: ['AI-агенты', 'SLM-модели', 'SQL-базы', 'MCP-шлюзы', 'Аналитика'],
    deliverables: [
      'Стратегия на основе данных из 1000+ источников',
      'Позиционирование, проверенное на рынке',
      'Контент, который продаёт',
      'Анализ ROI в реальном времени'
    ],
    timeline: '3–8 недель',
    keyFeatures: [
      'Стратегия на основе данных, а не интуиции',
      'Позиционирование, проверенное с первых недель',
      'Контент, который продаёт',
      'Анализ ROI брендинговых кампаний',
      'Интеграция с CRM и аналитикой'
    ],
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { services: dbServices } = useServices();

  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const services = dbServices.length > 0
    ? dbServices.map((s, idx) => ({
        number: s.number,
        title: s.title,
        description: s.description,
        technologies: s.technologies,
        deliverables: fallbackServices[idx]?.deliverables || [
          'Custom Architecture & Codebase',
          'Production Deployment & Docs',
          'Quality Assurance & Security Checks',
        ],
        timeline: fallbackServices[idx]?.timeline || '4-8 Weeks',
        keyFeatures: fallbackServices[idx]?.keyFeatures || ['High Scalability', 'Enterprise Support'],
      }))
    : fallbackServices;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(`Inquiry for ${selectedService?.title} submitted successfully!`);
      setSelectedService(null);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryNotes('');
    }, 600);
  };

  return (
    <section ref={ref} id="services" className="section-shell section-shell--deep py-24 md:py-32 px-6 md:px-10 relative">
      <div className="max-w-7xl mx-auto">
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
            Our Services
          </span>
        </motion.div>

        {/* Main heading & Header CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="section-title"
          >
            Инструменты для быстрых сделок
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 shrink-0"
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

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="group relative">
              {/* Hover glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
                className="section-card rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between"
              >
                <div>
                  {/* Number badge & Timeline */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/30 text-sm font-light">{service.number}</span>
                    <span className="text-xs text-white/40 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      Est: {service.timeline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-2xl md:text-3xl font-medium mb-4 tracking-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed mb-6 text-sm md:text-base">
                    {service.description}
                  </p>

                  {/* Key Features Bullet List */}
                  <div className="space-y-2 mb-6">
                    {service.keyFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-white/50">
                        <CheckCircle2 size={13} className="text-white/40 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-2 text-white text-sm hover:text-white/80 transition-all duration-300 font-medium"
                  >
                    <span>Подробнее</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs section-cta-outline px-3.5 py-2 rounded-lg border border-white/15 transition-all"
                  >
                    Оставить заявку
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Service Spec & Inquiry Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#12121a] border border-white/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs font-mono text-white">
                    {selectedService.number}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">{selectedService.title}</h3>
                    <p className="text-white/40 text-xs">Полная спецификация</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                <p className="text-white/70 text-sm leading-relaxed">{selectedService.description}</p>

                {/* Key Deliverables */}
                <div>
                  <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3 text-white/50">
                    Что вы получите
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-start gap-2.5"
                      >
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-white/80 text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Consultation Form */}
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                  <h4 className="text-white text-sm font-medium mb-1 flex items-center gap-2">
                    <Sparkles size={14} className="text-orange-400" />
                    Оставить заявку
                  </h4>
                  <p className="text-white/40 text-xs mb-4">
                    Отправьте запрос, и мы свяжемся с вами в течение 15 минут.
                  </p>

                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Ваше имя"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Кратко опишите ваш запрос..."
                      value={inquiryNotes}
                      onChange={(e) => setInquiryNotes(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="bg-white text-black px-5 py-2 text-xs font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Send size={12} />
                        {submitting ? 'Отправка...' : 'Отправить'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
