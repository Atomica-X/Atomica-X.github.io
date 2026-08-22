import { useState, useEffect } from 'react';
import { BarChart3, Truck, Package, Calculator, Globe } from 'lucide-react';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        close: () => void;
        expand: () => void;
        minimize: () => void;
        MainButton: {
          setText: (text: string) => void;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        initData: string;
      };
    };
  }
}

export default function TelegramWebAppButton() {
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    // Проверяем, запущено ли приложение в Telegram
    const isTg = typeof window !== 'undefined' && 
                 (window.Telegram?.WebApp || 
                  (typeof navigator !== 'undefined' && 
                   navigator.userAgent.includes('Telegram')));
    setIsTelegram(!!isTg);
    
    if (isTg && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      
      // Настраиваем кнопку Telegram
      const mainButton = window.Telegram.WebApp.MainButton;
      mainButton.setText('🚚 Мини-приложения ATOMICA');
      mainButton.show();
      
      mainButton.onClick(() => {
        // Открываем Telegram Web App
        window.open('https://t.me/Atomica_XBot?start=launcher', '_blank');
      });
    }
  }, []);

  // Если не в Telegram, показываем обычную кнопку
  if (!isTelegram) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => window.open('https://t.me/Atomica_XBot?start=launcher', '_blank')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-colors"
        >
          <BarChart3 size={20} />
          <span>Mini Apps ATOMICA</span>
        </button>
        <div className="absolute -bottom-2 -right-2 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          <span>NEW</span>
        </div>
      </div>
    );
  }

  return null;
}