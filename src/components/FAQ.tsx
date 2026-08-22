import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: 'Как происходит закупка партий?',
    answer: 'Мы покупаем товар за собственные средства — это не посредничество. 190 AI-агентов и собственные парсеры непрерывно мониторят складские остатки, банкротные и ликвидационные активы, а также стоковую продукцию. Когда система обнаруживает подходящую партию, она автономно оценивает риски, рассчитывает TCO и формирует предложение за минуты. Мы покупаем контейнерами и фурами, а не штуками — каждая позиция — это полная партия, готовая к отгрузке.',
  },
  {
    question: 'Какие гарантии, что товар реально есть в наличии?',
    answer: 'Вся информация о товарах синхронизируется с SQL-базами данных, где хранится полная история операций и товарных остатков. Мы интегрируемся напрямую с поставщиками через MCP-шлюзы, что позволяет проверять наличие в реальном времени. Для банкротных активов дополнительно проводим юридическую проверку через 15 AI-агентов, которые сканируют судебные реестры и таможенные данные.',
  },
  {
    question: 'Как обеспечивается конфиденциальность коммерческих условий?',
    answer: 'ATOMICA — платформа закрытого типа. Доступ предоставляется только по приглашению и после проверки компании. Мы не превращаем платформу в открытый маркетплейс. Коммерческие условия защищены через закрытый контур, где каждый компонент взаимодействует с остальными через API и общие протоколы. Никто, кроме приглашённых партнёров, не видит ваши цены, объёмы или условия.',
  },
  {
    question: 'Как быстро я могу получить предложение?',
    answer: 'Благодаря автономным агентам и системам парсинга мы видим изменения рынка до того, как они становятся общедоступными. Когда вы запрашиваете партию, система уже имеет актуальные данные. Стандартное предложение формируется за 5–15 минут. Экстренные запросы обрабатываются за 2–3 минуты. Никаких дней ожидания — только минуты.',
  },
  {
    question: 'Какие валюты и платёжные системы поддерживаются?',
    answer: 'Мы работаем в международной финансовой среде, оперируя 47 фиатными валютами и 12 криптовалютами. Поддерживаются Stripe, PayPal, Wise, банковские SEPA/SWIFT переводы, а также прямые интеграции с ведущими банками. Криптовалютные расчёты позволяют обходить санкционные ограничения и сокращают время расчётов с 5–10 дней до 10 минут. Все конвертации выполняются по курсу реального времени с учётом налогов и комиссий.',
  },
  {
    question: 'Что такое Zero Human на практике?',
    answer: 'Zero Human — это рабочий стандарт, а не лозунг. Каждое действие в системе ATOMICA — от парсинга рыночной информации до подготовки коммерческого предложения — может выполняться автономно, в режиме 24/7, без задержек и человеческих ошибок. Мы обрабатываем тысячи источников данных в реальном времени, принимаем решения о сделках за минуты и исключаем влияние субъективного фактора. При этом стратегическое управление и ответственность за ключевые решения остаются за руководством компании. Zero Human — это отсутствие лишних звеньев между идеей и результатом, а не отсутствие людей.',
  },
  {
    question: 'Как подключить партнёров к экосистеме?',
    answer: 'Для контрагентов мы предлагаем бесплатное подключение к экосистеме ATOMICA. Каждый партнёр получает собственного AI-агента, который постоянно синхронизирован с нашей системой, оперативно информирует о новых стоках и изменении цен, предоставляет доступ к калькуляторам фрахта и валютным инструментам, помогает автоматизировать закупки и документооборот. Подключение занимает 1–2 дня. Мы не берём плату за подключение — мы зарабатываем на товарной наценке и заинтересованы в долгосрочном росте каждого партнёра.',
  },
  {
    question: 'Предоставляете ли вы юридическое сопровождение сделок?',
    answer: 'Да. Все сделки проходят автоматическую юридическую проверку через 15 AI-агентов, которые анализируют договоры, проверяют юридические реквизиты контрагентов и сканируют санкционные списки в реальном времени. Мы работаем с электронной подписью для всех документов и используем blockchain-реестры для подтверждения сертификатов. Юридическая чистота подтверждается аудитом ежеквартально. За каждой сделкой стоит не только алгоритм, но и реальная структура, способная отвечать за результат.',
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="section-shell section-shell--deep py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="section-orb top-[-100px] right-[10%] w-[460px] h-[460px] bg-white/5" />
      <div className="section-orb bottom-[-120px] left-[8%] w-[380px] h-[380px] bg-orange-400/6" />
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
            Часто задаваемые вопросы
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="section-rail w-24 mb-5" />
          <p className="section-eyebrow">Ответы на важные вопросы</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="section-title mb-16"
        >
          Часто задаваемые вопросы
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
