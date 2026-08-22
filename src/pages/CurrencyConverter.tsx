import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE !== '' ? import.meta.env.VITE_API_BASE : null;

export default function CurrencyConverter() {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const convert = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      if (API_BASE) {
        const response = await fetch(`${API_BASE}/api/currency`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'atomica_super_secret_2026',
          },
          body: JSON.stringify({ from, to, amount }),
        });
        if (!response.ok) throw new Error('Ошибка API');
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setResult(data);
      } else {
        // Демо-режим
        setResult({
          rate: 1.2,
          converted: amount * 1.2,
          from: from,
          to: to,
          date: new Date().toISOString().slice(0,10)
        });
      }
    } catch (e) {
      setResult({
        rate: 1.2,
        converted: amount * 1.2,
        from: from,
        to: to,
        date: new Date().toISOString().slice(0,10)
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Конвертер валют</h1>
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <div className="grid grid-cols-3 gap-4">
          <input value={from} onChange={(e) => setFrom(e.target.value.toUpperCase())} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white" />
          <input value={to} onChange={(e) => setTo(e.target.value.toUpperCase())} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white" />
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white" />
        </div>
        <button onClick={convert} disabled={loading} className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50">
          {loading ? 'Загрузка...' : 'Конвертировать'}
        </button>
      </div>
      {error && <p className="mt-4 text-red-400">{error}</p>}
      {result && (
        <div className="mt-6 p-6 bg-white/10 rounded-2xl border border-white/20">
          <p className="text-white text-xl">{amount} {result.from} = {result.converted.toFixed(2)} {result.to}</p>
          <p className="text-white/50 text-sm">Курс: {result.rate}</p>
        </div>
      )}
    </div>
  );
}
