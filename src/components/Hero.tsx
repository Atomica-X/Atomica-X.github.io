import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="h-screen w-full bg-black p-3 md:p-4 font-inter">
      <div className="w-full h-full rounded-2xl flex flex-col overflow-hidden relative bg-black">
        {/* Background Video */}
        <video
          src="/video/background.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/video/poster.jpg"
          className="absolute inset-0 w-full h-full object-cover anim-fade"
          style={{ animationDelay: '0.2s' }}
        />

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
          {/* Logo block */}
          <div
            className="flex flex-col items-center anim-stagger"
            style={{ animationDelay: '0.1s' }}
          >
            <img src="/atomica-logo.svg" alt="ATOMICA" className="w-14 h-14 md:w-16 md:h-16 object-contain" />
            <span className="text-white text-[10px] md:text-xs tracking-[0.4em] mt-1 font-light">
              A T O M I C A
            </span>
          </div>

          {/* Nav buttons */}
          <div
            className="flex items-center gap-3 anim-stagger"
            style={{ animationDelay: '0.2s' }}
          >
            <a href="/freight" className="hidden md:block px-5 py-2.5 text-white text-sm hover:bg-white/10 hover:-translate-y-0.5 btn-cut-border">
              <span>Калькулятор фрахта</span>
            </a>
            <a href="/tracking" className="hidden md:block px-5 py-2.5 bg-white text-black text-sm hover:bg-white/90 hover:-translate-y-0.5 btn-cut">
              Отслеживание
            </a>
          </div>
        </nav>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-6 md:px-10 pb-8 md:pb-10">
          {/* Top section */}
          <div className="flex-1 flex items-center relative">
            {/* Left column */}
            <div
              className="hidden lg:flex flex-col gap-6 absolute left-0 top-[18%] anim-stagger"
              style={{ animationDelay: '0.4s' }}
            >
              <p className="text-white/80 text-base leading-relaxed max-w-[220px]">
                AI для логистики<br />
                отслеживание<br />
                и расчет фрахта
              </p>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full border border-white/40" />
                  <div className="w-4 h-4 rounded-full border border-white/40" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-white/70 text-xs">
                    B2B Платформа
                  </span>
                  <span className="text-white/50 text-xs">01</span>
                </div>
              </div>
            </div>

            {/* Center heading */}
            <div
              className="w-full text-center anim-stagger"
              style={{ animationDelay: '0.5s' }}
            >
              <h1
                className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.1] tracking-[-0.04em]"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.25)' }}
              >
                ATOMICA —<br />
                Торговая платформа<br />
                для логистики
              </h1>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mt-8">
            {/* Col 1 */}
            <div
              className="flex items-center justify-center md:justify-end anim-stagger"
              style={{ animationDelay: '0.7s' }}
            >
              <p className="text-white text-sm leading-relaxed max-w-[260px] text-center md:text-left md:ml-auto">
                AI-консультант, отслеживание посылок, расчет фрахта, конвертер валют и поиск поставщиков
              </p>
            </div>

            {/* Col 2 */}
            <div
              className="flex flex-col items-center gap-8 md:gap-24 anim-stagger"
              style={{ animationDelay: '0.85s' }}
            >
              <span className="text-white text-2xl md:text-3xl font-medium">
                Инновации бизнеса
              </span>
              <button
                onClick={() => {
                  const elem = document.getElementById('services');
                  if (elem) {
                    elem.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full max-w-[280px] py-3.5 bg-white flex items-center justify-center gap-2 text-black hover:bg-white/90 hover:-translate-y-0.5 transition-colors group btn-cut cursor-pointer"
              >
                <span className="text-sm font-medium">Начать работу</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Col 3 */}
            <div
              className="flex items-center justify-center md:justify-end gap-3 anim-stagger"
              style={{ animationDelay: '1s' }}
            >
              {/* Telegram */}
              <a href="https://t.me/Atomica_XBot" className="w-10 h-10 bg-white flex items-center justify-center text-black hover:bg-white/90 transition-colors btn-cut-sm">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.37 3.37 9.95 8 11.43V12.5L7.5 11l3.5 3-3.5 3v-5.5l3.5 3v-9.5L11 7.5l3.5 3v-5.5L19.5 11l3.5 3v-9.5L17 4.5l3.5 3v-1.5C20.63 5.37 24 0 24 0h0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}