import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE !== '' ? import.meta.env.VITE_API_BASE : null;

export default function ParcelTracker() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('auto');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const track = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      if (API_BASE) {
        const response = await fetch(`${API_BASE}/api/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'atomica_super_secret_2026',
          },
          body: JSON.stringify({ tracking_number: trackingNumber, carrier }),
        });
        if (!response.ok) throw new Error('Ошибка API');
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setResult(data);
      } else {
        // Демо-режим
        setResult({
          status: 'Тестовый трекинг',
          events: ['Посылка зарегистрирована', 'Отправлена', 'В пути', 'Доставлена']
        });
      }
    } catch (e) {
      setResult({
        status: 'Тестовый трекинг (ошибка)',
        events: ['Посылка зарегистрирована', 'Отправлена']
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Отслеживание посылок</h1>
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/60 text-sm mb-1">Трек-номер</label>
            <input value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white" />
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-1">Перевозчик</label>
            <input value={carrier} onChange={(e) => setCarrier(e.target.value)} className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white" />
          </div>
        </div>
        <button onClick={track} disabled={loading} className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50">
          {loading ? 'Поиск...' : 'Отследить'}
        </button>
      </div>
      {error && <p className="mt-4 text-red-400">{error}</p>}
      {result && (
        <div className="mt-6 p-6 bg-white/10 rounded-2xl border border-white/20">
          <h3 className="text-xl font-semibold text-white">Статус</h3>
          <p className="text-white/80 mt-2">{result.status}</p>
          {result.events && result.events.map((ev, i) => (
            <p key={i} className="text-white/50 text-sm mt-1">{ev}</p>
          ))}
        </div>
      )}
    </div>
  );
}
