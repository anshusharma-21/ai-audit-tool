import { useState } from 'react';
import { calculateAudit } from './utils/engine';
import { TOOLS_DATABASE } from './utils/pricing';

function App() {
  const [tool, setTool] = useState('chatgpt');
  const [seats, setSeats] = useState(1);
  const [email, setEmail] = useState('');

  const result = calculateAudit(tool, seats);
  const currentTool = TOOLS_DATABASE.find(t => t.id === tool);
  const monthlySpend = (currentTool?.price || 0) * seats;
  const credexSpend = monthlySpend - result.savings;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tight">AI Spend <span className="text-blue-600">Audit</span></h1>
          <p className="text-slate-500 mt-2 text-lg">Analyze 15+ AI tools and cut costs by 30% instantly.</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* LEFT: INPUT FORM (3 Columns) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">STEP 1</span> Configuration
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Select AI Tool</label>
                  <select 
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={tool}
                    onChange={(e) => setTool(e.target.value)}
                  >
                    {TOOLS_DATABASE.map(t => (
                      <option key={t.id} value={t.id}>{t.name} (${t.price}/mo)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Number of Seats</label>
                  <input 
                    type="number" min="1"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">STEP 2</span> Get Results
                </h2>
                <input 
                  type="email" placeholder="Enter work email"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 mb-3 outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg active:scale-95">
                  Generate Official Audit Report
                </button>
                <div className="flex justify-center gap-4 mt-4 opacity-50 grayscale">
                  <span className="text-[10px] font-bold border border-slate-400 px-2 py-1 rounded">ISO 27001</span>
                  <span className="text-[10px] font-bold border border-slate-400 px-2 py-1 rounded">SECURE BILLING</span>
                  <span className="text-[10px] font-bold border border-slate-400 px-2 py-1 rounded">500+ TRUSTED</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE RESULT & TABLE (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-blue-200 text-xs font-bold uppercase tracking-widest">Annual Potential Savings</h2>
                <div className="text-6xl font-black mt-2 tracking-tighter">${result.savings * 12}</div>
                <div className="mt-6 p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md text-sm">
                  <p className="font-bold text-blue-100 uppercase text-[10px] mb-1">Recommendation</p>
                  {result.recommendation}
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold mb-4 text-slate-800">Audit Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Current Monthly Spend:</span>
                  <span className="font-bold text-red-500">${monthlySpend}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Credex Optimized:</span>
                  <span className="font-bold text-emerald-500">${credexSpend}</span>
                </div>
                <div className="pt-3 border-t flex justify-between font-black text-lg">
                  <span>Monthly Savings:</span>
                  <span className="text-blue-600">${result.savings}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-slate-400 text-[10px] uppercase tracking-[0.2em]">
          Internal Tool • Credex AI Spend Audit Challenge • 2026
        </footer>
      </div>
    </div>
  );
}

export default App;