import { useState, useEffect } from 'react';
import { calculateAudit } from './utils/engine';
import { TOOLS_DATABASE } from './utils/pricing';
import { supabase } from './lib/supabase';
import { History,  FileText, X, CheckCircle, Sun, Moon,  Zap, ShieldCheck, Activity, TrendingUp } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [tool, setTool] = useState('chatgpt');
  const [seats, setSeats] = useState(1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const result = calculateAudit(tool, seats);
  const currentTool = TOOLS_DATABASE.find(t => t.id === tool);
  const monthlySpend = (currentTool?.price || 0) * seats;
  const credexSpend = monthlySpend - result.savings;

  const fetchHistory = async () => {
    const { data, error } = await supabase.from('audits').select('*').order('created_at', { ascending: false }).limit(5);
    if (!error && data) setHistory(data);
  };

  useEffect(() => { fetchHistory(); }, []);

  const handleGenerateAudit = async () => {
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Professional work email required!");
      return;
    }
    
    if (loading) return; 

    setLoading(true);
    setShowResults(false);
    const tId = toast.loading("Executing Deep Saas Audit...");

    try {
      await supabase.from('audits').insert([{ email, tool, seats, savings: result.savings }]);
      
      
      setTimeout(() => {
        setLoading(false);
        setShowResults(true);
        toast.success("Audit Complete!", { id: tId });
        fetchHistory();
      }, 1500); 
    } catch (error) {
      toast.error("Database Sync Error", { id: tId });
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto p-4 md:p-10">
        <nav className="flex justify-between items-center mb-8 bg-white/5 backdrop-blur-lg border border-white/10 p-3 rounded-full shadow-2xl">
          <div className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase px-3">
            <div className="bg-blue-600 p-1.5 rounded-full shadow-lg shadow-blue-600/30">
                <Zap className="text-white fill-white" size={16} />
            </div>
            Credex<span className="text-blue-500 font-black">Audit</span>
          </div>
          <div className="flex items-center gap-1.5">
             <button onClick={() => setIsDark(!isDark)} className={`p-2.5 rounded-full transition-all ${isDark ? 'hover:bg-white/10 text-yellow-400' : 'hover:bg-slate-200 text-slate-600'}`}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             <button onClick={() => setShowHistory(true)} className="p-2.5 hover:bg-blue-500/10 rounded-full transition-all opacity-60">
                <History size={18} />
             </button>
          </div>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-10">
            <header>
              <h2 className="text-5xl font-black mb-6 tracking-tighter leading-tight">Stop <span className="text-blue-500 underline decoration-blue-500/20">Overpaying</span> for AI Seats.</h2>
              <p className="text-slate-400 font-medium text-lg">One consolidated bill. 30% flat savings. Professional auditing.</p>
            </header>

            <div className={`p-8 rounded-[3rem] border transition-all ${isDark ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-lg'}`}>
              <div className="space-y-6">
                <div className="flex gap-2.5 mb-2 overflow-x-auto pb-2 flex-wrap">
                    {['Enterprise-Ready Audit', 'ISO Verified', 'GDPR Ready'].map(tag => (
                        <div key={tag} className="text-[10px] font-black uppercase px-3.5 py-1.5 bg-blue-500/10 text-blue-500 rounded-full border border-blue-500/20 flex items-center gap-1.5">
                            <ShieldCheck size={12} className="text-blue-500"/>
                            {tag}
                        </div>
                    ))}
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest opacity-50">SaaS Hub</label>
                  <select value={tool} onChange={(e) => setTool(e.target.value)} className={`w-full mt-3 p-4 rounded-xl border outline-none font-bold ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>
                    {TOOLS_DATABASE.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[11px] font-black uppercase tracking-widest opacity-50">Users: <span className="text-blue-500 text-lg ml-1 font-black">{seats}</span></label>
                  </div>
                  <div className="relative group">
                    <input 
                        type="range" min="1" max="100" 
                        value={seats} 
                        onChange={(e) => setSeats(Number(e.target.value))}
                        className="w-full h-3 bg-blue-500/10 rounded-full appearance-none cursor-pointer accent-blue-600 transition-all hover:bg-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest opacity-50">Company Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="anshu@company.com" className={`w-full mt-3 p-4 rounded-xl border outline-none font-bold ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`} />
                </div>
                <button onClick={handleGenerateAudit} disabled={loading} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-500 active:scale-95 transition-all shadow-xl shadow-blue-500/30 disabled:opacity-50 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4">
                  {loading ? <Activity className="animate-pulse" size={18} /> : <ShieldCheck size={18} />}
                  {loading ? 'Performing AI Audit...' : 'Execute Official Audit'}
                </button>
              </div>
            </div>
          </div>

         
          <div className="lg:col-span-5 h-full">
            {showResults ? (
              <div id="audit-results-card" className="animate-in fade-in zoom-in duration-700 h-full flex flex-col gap-6">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl border border-white/20">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 opacity-60">
                        <TrendingUp size={16} />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Total Annual Savings</h3>
                    </div>
                    
                    <div className="text-6xl font-black tracking-tighter mb-8 leading-none flex items-start gap-1">
                      <span className="text-2xl mt-1 opacity-50 font-bold">$</span>
                      {result.savings * 12}
                    </div>
                    <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-start gap-3">
                      <CheckCircle className="text-emerald-400 mt-0.5 flex-shrink-0" size={18} />
                      <p className="text-xs font-bold leading-tight text-blue-50">{result.recommendation}</p>
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-[90px]"></div>
                </div>

                <div className={`p-8 rounded-[2.5rem] border backdrop-blur-xl transition-all ${isDark ? 'bg-white/5 border-white/10 shadow-lg' : 'bg-white border-slate-200'}`}>
                   <div className="space-y-6">
                     <div className="flex justify-between items-center group">
                        <span className="text-[11px] font-black opacity-40 uppercase tracking-widest">Market Spend</span>
                        <span className="font-bold text-red-400">-${monthlySpend}/mo</span>
                     </div>
                     <div className="flex justify-between items-center group">
                        <span className="text-[11px] font-black opacity-40 uppercase tracking-widest">Credex Exclusive</span>
                        <span className="font-bold text-emerald-400">-${credexSpend}/mo</span>
                     </div>
                     
                     <div className="pt-6 border-t border-dashed border-white/10 flex justify-between items-end">
                        <div>
                           <p className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Monthly ROI</p>
                           <p className="text-3xl font-black text-blue-500 mt-1">${result.savings}</p>
                        </div>
                        <div className="text-[10px] font-black px-3.5 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg border border-emerald-500/20 shadow-inner">
                            30% DISCOUNT
                        </div>
                     </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className={`h-full min-h-[550px] border-4 border-dashed rounded-[3.5rem] flex flex-col items-center justify-center transition-all duration-500 ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-slate-300 bg-slate-100'}`}>
                {loading ? (
                   <div className="text-center">
                      <div className="relative w-16 h-16 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-500 animate-pulse">Running Deep Scan...</p>
                   </div>
                ) : (
                  <div className="text-center opacity-15">
                    <FileText size={64} className="mx-auto mb-4" />
                    <p className="text-sm font-black uppercase tracking-widest">Awaiting Analysis Data</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showHistory && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex justify-end transition-all">
          <div className={`w-full max-w-sm h-full p-10 border-l animate-in slide-in-from-right duration-300 ${isDark ? 'bg-slate-900 border-white/10 shadow-2xl' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center mb-10">
               <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3"><History className="text-blue-500" /> Audit History</h2>
               <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-white/10 rounded-full text-slate-400"><X /></button>
            </div>
            <div className="space-y-4">
              {history.map((item, index) => (
                <div key={index} className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-white/5 border-white/5 hover:border-blue-500/40' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
                  <div className="flex justify-between text-[10px] font-black opacity-50 mb-3 uppercase tracking-[0.2em]">
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    <span className="text-emerald-400">-${item.savings * 12} saved</span>
                  </div>
                  <p className="text-sm font-bold truncate mb-1">{item.email}</p>
                  <p className="text-[10px] opacity-70 uppercase font-black">{item.tool} • {item.seats} Seats</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;