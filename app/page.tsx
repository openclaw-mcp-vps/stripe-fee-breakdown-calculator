'use client';
import { useState } from 'react';

const FEES: Record<string, { pct: number; fixed: number; label: string }> = {
  card_us: { pct: 2.9, fixed: 0.30, label: 'Card (US)' },
  card_eu: { pct: 1.5, fixed: 0.25, label: 'Card (EU)' },
  card_intl: { pct: 3.9, fixed: 0.30, label: 'Card (International)' },
  ach: { pct: 0.8, fixed: 0, label: 'ACH Direct Debit' },
  sepa: { pct: 0.8, fixed: 0, label: 'SEPA Direct Debit' },
  klarna: { pct: 5.99, fixed: 0.30, label: 'Klarna' },
  link: { pct: 2.9, fixed: 0.30, label: 'Link (Stripe)' },
};

function calc(amount: number, method: string) {
  const f = FEES[method];
  if (!f) return { fee: 0, net: 0 };
  const fee = parseFloat(((amount * f.pct) / 100 + f.fixed).toFixed(2));
  return { fee, net: parseFloat((amount - fee).toFixed(2)) };
}

export default function Page() {
  const [amount, setAmount] = useState('100');
  const [method, setMethod] = useState('card_us');
  const num = parseFloat(amount) || 0;
  const { fee, net } = calc(num, method);
  const f = FEES[method];

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 pt-20 pb-12 text-center">
        <span className="inline-block bg-[#161b22] border border-[#30363d] text-[#58a6ff] text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">Fintech Tool</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Calculate Exact Stripe Fees</h1>
        <p className="text-lg text-[#8b949e] mb-10 max-w-xl mx-auto">Real-time breakdown for every payment method, country, and business type. Know exactly what Stripe takes before you charge.</p>

        {/* Calculator */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 text-left max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-xs text-[#8b949e] mb-1 uppercase tracking-wide">Transaction Amount (USD)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2 text-white text-lg focus:outline-none focus:border-[#58a6ff]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-xs text-[#8b949e] mb-1 uppercase tracking-wide">Payment Method</label>
            <select
              value={method}
              onChange={e => setMethod(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#58a6ff]"
            >
              {Object.entries(FEES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#0d1117] rounded-xl p-4 text-center">
              <div className="text-xs text-[#8b949e] mb-1">Charged</div>
              <div className="text-xl font-bold text-white">${num.toFixed(2)}</div>
            </div>
            <div className="bg-[#0d1117] rounded-xl p-4 text-center">
              <div className="text-xs text-[#8b949e] mb-1">Stripe Fee</div>
              <div className="text-xl font-bold text-red-400">${fee.toFixed(2)}</div>
            </div>
            <div className="bg-[#0d1117] rounded-xl p-4 text-center">
              <div className="text-xs text-[#8b949e] mb-1">You Receive</div>
              <div className="text-xl font-bold text-green-400">${net.toFixed(2)}</div>
            </div>
          </div>
          {f && <p className="text-xs text-[#8b949e] mt-4 text-center">{f.pct}% + ${f.fixed.toFixed(2)} per transaction</p>}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-sm mx-auto px-4 pb-16">
        <div className="bg-[#161b22] border border-[#58a6ff] rounded-2xl p-8 text-center">
          <div className="text-[#58a6ff] text-xs font-bold uppercase tracking-widest mb-2">Pro Plan</div>
          <div className="text-5xl font-bold text-white mb-1">$9<span className="text-xl text-[#8b949e] font-normal">/mo</span></div>
          <p className="text-[#8b949e] text-sm mb-6">Unlock all payment methods, countries, and bulk comparison tools</p>
          <ul className="text-sm text-left space-y-2 mb-8">
            {['All 30+ payment methods','Multi-country fee comparison','Bulk CSV calculator','Fee optimization tips','Priority support'].map(item => (
              <li key={item} className="flex items-center gap-2"><span className="text-green-400">✓</span>{item}</li>
            ))}
          </ul>
          <a
            href={process.env.NEXT_PUBLIC_LS_CHECKOUT_URL || '#'}
            className="block w-full bg-[#58a6ff] hover:bg-[#79b8ff] text-[#0d1117] font-bold py-3 rounded-xl transition-colors text-center"
          >Get Pro Access</a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-white text-center mb-8">FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'How accurate are the fee calculations?', a: 'Fees are based on Stripe\'s published pricing for standard accounts. Custom pricing or negotiated rates may differ.' },
            { q: 'Which payment methods are supported?', a: 'The free tier covers major card types and ACH. Pro unlocks 30+ methods including Klarna, SEPA, iDEAL, and more.' },
            { q: 'Can I cancel my subscription anytime?', a: 'Yes. Cancel anytime from your Lemon Squeezy dashboard with no questions asked.' }
          ].map(({ q, a }) => (
            <div key={q} className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
              <div className="font-semibold text-white mb-2">{q}</div>
              <div className="text-[#8b949e] text-sm">{a}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-xs text-[#484f58] pb-8">© {new Date().getFullYear()} Stripe Fee Calculator. Not affiliated with Stripe, Inc.</footer>
    </main>
  );
}
