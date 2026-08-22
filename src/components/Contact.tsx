import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, DollarSign, Clock } from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';
import { useNewsletter } from '../hooks/useNewsletter';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const { submitContact, loading: contactLoading } = useContactForm();
  const { subscribe, loading: newsletterLoading } = useNewsletter();
  
  const [selectedBudget, setSelectedBudget] = useState<string>('$50k-$100k');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('1-3 Months');

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const budgets = ['<$25k', '$25k-$50k', '$50k-$100k', '$100k+'];
  const timelines = ['< 1 Month', '1-3 Months', '3-6 Months', 'Long Term'];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMessage = `[Budget: ${selectedBudget} | Timeline: ${selectedTimeline}]\n\n${contactForm.message}`;
    const success = await submitContact({
      ...contactForm,
      message: formattedMessage,
    });
    if (success) {
      setContactForm({ name: '', email: '', company: '', message: '' });
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await subscribe(newsletterEmail);
    if (success) {
      setNewsletterEmail('');
    }
  };

  return (
    <section ref={ref} id="contact" className="section-shell section-shell--navy py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="section-orb top-[-180px] left-[50%] -translate-x-1/2 w-[900px] h-[900px] bg-orange-500/8" />
      <div className="section-orb bottom-[-120px] right-[8%] w-[480px] h-[480px] bg-orange-500/8" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <div>
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
                Контакты
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <div className="section-rail w-24 mb-5" />
              <p className="section-eyebrow">Свяжитесь с нами</p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="section-title mb-8"
            >
              Обсудите ваш проект
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/70 text-lg leading-relaxed mb-12"
            >
              Если вы ищете доступ к закрытым партиям или хотите продать свои остатки — мы готовы помочь. Оставьте заявку, и мы свяжемся с вами в течение 15 минут.
            </motion.p>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Офис</div>
                <div className="text-white/80 text-lg">
                  42 Rue de la Paix, 75002 Paris
                  <br />
                  France
                </div>
              </div>

              <div>
                <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Email</div>
                <a
                  href="mailto:hello@atomica.io"
                  className="text-white/80 text-lg hover:text-white transition-colors"
                >
                  hello@atomica.io
                </a>
              </div>

              <div>
                <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Телефон</div>
                <a
                  href="tel:+33142778899"
                  className="text-white/80 text-lg hover:text-white transition-colors"
                >
                  +33 (1) 42 77 88 99
                </a>
              </div>

              <div>
                <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Часы работы</div>
                <div className="text-white/80">
                  Пн–Пт: 09:00 – 18:00 (CET)
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12"
            >
              <div className="text-white/40 text-xs uppercase tracking-wider mb-4">Мы в соцсетях</div>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-white/60" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-white/60" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-white/60" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-white/60" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right column - Contact Form with Selectors */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-card rounded-2xl p-8 md:p-10">
              <h3 className="text-white text-2xl font-medium mb-8 tracking-tight">
                Отправить заявку
              </h3>

              <form className="space-y-6" onSubmit={handleContactSubmit}>
                {/* Budget Selection Buttons */}
                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <DollarSign size={13} className="text-emerald-400" />
                    Бюджет
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBudget(b)}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                          selectedBudget === b
                            ? 'bg-white text-black border-white font-semibold'
                            : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline Selection Buttons */}
                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Clock size={13} className="text-blue-400" />
                    Срок
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timelines.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTimeline(t)}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                          selectedTimeline === t
                            ? 'bg-white text-black border-white font-semibold'
                            : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">Ваше имя</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Иван Иванов"
                    required
                  />
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="ivan@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">Компания</label>
                  <input
                    type="text"
                    value={contactForm.company}
                    onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Ваша компания"
                  />
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">Описание запроса</label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Расскажите о вашем запросе..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full section-cta py-3.5 flex items-center justify-center gap-2 group btn-cut disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-sm font-medium">
                    {contactLoading ? 'Отправка...' : 'Отправить заявку'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Newsletter - теперь это призыв, а не подписка */}
              <div className="mt-10 pt-10 border-t border-white/10">
                <h4 className="text-white text-lg font-medium mb-3">Получите доступ к закрытым партиям</h4>
                <p className="text-white/60 text-sm mb-6">
                  Оставьте заявку — мы свяжемся с вами в течение 15 минут и подберём партию под ваш запрос. Торгуйте без посредников. Покупайте по цене ниже рынка. Оставайтесь впереди.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Ваш e-mail..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={newsletterLoading}
                    className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {newsletterLoading ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
