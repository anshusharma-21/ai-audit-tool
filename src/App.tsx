
import { useState } from 'react';
import { calculateAudit } from './utils/engine';
import { TOOLS_DATABASE } from './utils/pricing';
import { supabase } from './lib/supabase';

function App() {
  const [tool, setTool] = useState('chatgpt');
  const [seats, setSeats] = useState(1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const result = calculateAudit(tool, seats);
  const currentTool = TOOLS_DATABASE.find(t => t.id === tool);
  const monthlySpend = (currentTool?.price || 0) * seats;
  const credexSpend = monthlySpend - result.savings;

  const handleGenerateAudit = async () => {
    if (!email || !email.includes('@')) {
      alert("Please enter a valid work email!");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('audits')
        .insert([
          { 
            email, 
            tool, 
            seats, 
            savings: result.savings 
          }
        ]);

      if (error) throw error;
      alert("🚀 Audit Report Saved! Our team will contact you with the full PDF.");
    } catch (error) {
      console.error('Error:', error);
      alert("Submission failed. Please check your Supabase connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        {}
        <header className="mb-12 text-center">
          <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
            CREDEX AI AUDIT TOOL 2.0
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-3">
            Stop Overpaying for <span className="text-blue-600">AI Seats</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Consolidate your 15+ AI subscriptions into one Credex bill and save flat 30%.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-12">
          {}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-[11px]">
                    Select Tool to Audit
                  </label>
                  <select 
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer font-medium"
                    value={tool}
                    onChange={(e) => setTool(e.target.value)}
                  >
                    {TOOLS_DATABASE.map(t => (
                      <option key={t.id} value={t.id}>{t.name} (${t.price}/mo per seat)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-[11px]">
                    Number of Active Seats
                  </label>
                  <input 
                    type="number" min="1"
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                  />
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-[11px]">
                    Work Email for Official Report
                  </label>
                  <input 
                    type="email" 
                    placeholder="anshu@company.com"
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 mb-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button 
                    disabled={loading}
                    onClick={handleGenerateAudit}
                    className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50 uppercase tracking-widest text-sm"
                  >
                    {loading ? 'Processing...' : 'Generate Official Audit Report'}
                  </button>
                  
                  {}
                  <div className="flex justify-center gap-6 mt-6 opacity-40 grayscale pointer-events-none">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-black border-2 border-slate-900 px-2 py-1 rounded italic">ISO 27001</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-black border-2 border-slate-900 px-2 py-1 rounded italic">SOC2 READY</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-black border-2 border-slate-900 px-2 py-1 rounded italic">GDPR COMPLIANT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="lg:col-span-5 space-y-6">
            {}
            <div className="bg-blue-600 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[300px]">
              <div className="relative z-10">
                <h2 className="text-blue-200 text-xs font-black uppercase tracking-[0.2em] mb-2">Annual Savings</h2>
                <div className="text-7xl font-black tracking-tighter mb-4">${result.savings * 12}</div>
                <div className="inline-block p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-xl">
                  <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest mb-1">Recommendation</p>
                  <p className="text-base font-semibold leading-tight">{result.recommendation}</p>
                </div>
              </div>
              {}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="font-bold mb-6 text-slate-800 text-xs uppercase tracking-[0.15em] border-b pb-4">Audit Breakdown</h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium font-mono">Current Spend</span>
                  <span className="font-bold text-red-500">${monthlySpend}/mo</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium font-mono">Credex Spend</span>
                  <span className="font-bold text-emerald-500">${credexSpend}/mo</span>
                </div>
                <div className="pt-4 border-t border-dashed border-slate-200 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Net Monthly Savings</p>
                    <p className="text-3xl font-black text-blue-600 leading-none mt-1">${result.savings}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-emerald-500 uppercase">Instant ROI</p>
                    <p className="text-lg font-bold text-emerald-600">30% OFF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-slate-400 text-[9px] uppercase tracking-[0.3em] font-bold">
          © 2026 Credex Enterprise • Authorized Auditor Access Only
        </footer>
      </div>
    </div>
  );
}

export default App;