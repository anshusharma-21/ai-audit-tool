
// import { useState, useEffect } from 'react';
// import { calculateAudit } from './utils/engine';
// import { TOOLS_DATABASE } from './utils/pricing';
// import { supabase } from './lib/supabase';
// import { History, Download, LayoutDashboard, FileText, X, CheckCircle } from 'lucide-react';
// import toast, { Toaster } from 'react-hot-toast';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// function App() {
//   const [tool, setTool] = useState('chatgpt');
//   const [seats, setSeats] = useState(1);
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showHistory, setShowHistory] = useState(false);
//   const [history, setHistory] = useState<any[]>([]);

//   const result = calculateAudit(tool, seats);
//   const currentTool = TOOLS_DATABASE.find(t => t.id === tool);
//   const monthlySpend = (currentTool?.price || 0) * seats;
//   const credexSpend = monthlySpend - result.savings;

//   // 1. Fetch History Logic
//   const fetchHistory = async () => {
//     const { data, error } = await supabase
//       .from('audits')
//       .select('*')
//       .order('created_at', { ascending: false })
//       .limit(6);
//     if (!error && data) setHistory(data);
//   };

//   useEffect(() => { fetchHistory(); }, []);

//   // 2. PDF Download Logic
//   const handleDownloadPDF = async () => {
//     const element = document.getElementById('audit-content');
//     if (!element) return;
//     const tId = toast.loading("Generating your PDF...");
    
//     try {
//       const canvas = await html2canvas(element, { scale: 2 });
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       pdf.addImage(imgData, 'PNG', 10, 10, 190, 160);
//       pdf.save(`Credex_Audit_${email || 'Report'}.pdf`);
//       toast.success("Report Downloaded!", { id: tId });
//     } catch (err) {
//       toast.error("PDF Failed", { id: tId });
//     }
//   };

//   const handleGenerateAudit = async () => {
//     if (!email || !email.includes('@')) {
//       toast.error("Please enter a valid work email!");
//       return;
//     }

//     setLoading(true);
//     const tId = toast.loading("Syncing with Credex Database...");
    
//     try {
//       const { error } = await supabase
//         .from('audits')
//         .insert([
//           { email, tool, seats, savings: result.savings }
//         ]);

//       if (error) throw error;
//       toast.success("🚀 Audit Report Saved!", { id: tId });
//       fetchHistory(); // Update history list
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error("Submission failed. Check connection.", { id: tId });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0f172a] p-4 md:p-10 font-sans text-slate-100 selection:bg-blue-500/30">
//       <Toaster position="top-center" />
      
//       {/* Background Decorative Blur */}
//       <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
//       </div>

//       <div className="max-w-6xl mx-auto">
//         {/* Professional Header */}
//         <header className="mb-12 text-center relative">
//           <div className="flex justify-center gap-4 absolute top-0 right-0">
//              <button onClick={() => setShowHistory(true)} className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-slate-400 hover:text-white">
//                 <History size={20} />
//              </button>
//              <button onClick={handleDownloadPDF} className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-blue-400">
//                 <Download size={20} />
//              </button>
//           </div>

//           <div className="inline-block bg-blue-500/10 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full border border-blue-500/20 mb-6 tracking-widest">
//             CREDEX ENTERPRISE AUDIT 2.6
//           </div>
//           <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
//             Stop Overpaying for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">AI Seats</span>
//           </h1>
//           <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
//             Consolidate your subscriptions into one Credex bill and save flat 30%.
//           </p>
//         </header>

//         {/* Main Content Area */}
//         <div id="audit-content" className="grid gap-8 lg:grid-cols-12">
          
//           {/* Left Panel: Inputs */}
//           <div className="lg:col-span-7 space-y-6">
//             <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl">
//               <div className="flex items-center gap-2 mb-8 text-blue-400">
//                 <LayoutDashboard size={20} />
//                 <span className="text-xs font-black uppercase tracking-widest text-slate-400">Audit Configuration</span>
//               </div>
              
//               <div className="space-y-8">
//                 <div>
//                   <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-[0.2em]">Select Tool</label>
//                   <select 
//                     className="w-full p-4 rounded-xl border border-white/10 bg-white/5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all cursor-pointer font-bold text-slate-200"
//                     value={tool}
//                     onChange={(e) => setTool(e.target.value)}
//                   >
//                     {TOOLS_DATABASE.map(t => (
//                       <option key={t.id} value={t.id} className="bg-slate-900">{t.name} (${t.price}/mo)</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-[0.2em]">Active Seats</label>
//                   <input 
//                     type="number" min="1"
//                     className="w-full p-4 rounded-xl border border-white/10 bg-white/5 focus:ring-2 focus:ring-blue-500/50 outline-none font-bold text-slate-200"
//                     value={seats}
//                     onChange={(e) => setSeats(Number(e.target.value))}
//                   />
//                 </div>

//                 <div className="pt-6 border-t border-white/5">
//                   <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-[0.2em]">Corporate Email</label>
//                   <input 
//                     type="email" 
//                     placeholder="anshu@company.com"
//                     className="w-full p-4 rounded-xl border border-white/10 bg-white/5 mb-6 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <button 
//                     disabled={loading}
//                     onClick={handleGenerateAudit}
//                     className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20 disabled:opacity-50 uppercase tracking-widest text-sm"
//                   >
//                     {loading ? 'Processing Analysis...' : 'Generate Official Audit Report'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Panel: Results */}
//           <div className="lg:col-span-5 space-y-6">
//             <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[320px] border border-blue-400/20">
//               <div className="relative z-10">
//                 <h2 className="text-blue-100 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Annual Guaranteed Savings</h2>
//                 <div className="text-7xl font-black tracking-tighter mb-6 flex items-start">
//                   <span className="text-3xl mt-2 opacity-50">$</span>
//                   {result.savings * 12}
//                 </div>
//                 <div className="inline-flex items-center gap-3 p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-xl">
//                    <div className="p-2 bg-emerald-400/20 rounded-lg"><CheckCircle size={18} className="text-emerald-400"/></div>
//                   <p className="text-sm font-bold leading-tight text-blue-50">{result.recommendation}</p>
//                 </div>
//               </div>
//               <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
//             </div>

//             <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
//               <h3 className="font-black mb-6 text-slate-500 text-[10px] uppercase tracking-[0.2em] border-b border-white/5 pb-4">Audit Financial Breakdown</h3>
//               <div className="space-y-5">
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="text-slate-400 font-mono">Market Rate Spend</span>
//                   <span className="font-bold text-red-400">${monthlySpend}/mo</span>
//                 </div>
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="text-slate-400 font-mono">Credex Exclusive</span>
//                   <span className="font-bold text-emerald-400">${credexSpend}/mo</span>
//                 </div>
//                 <div className="pt-4 border-t border-dashed border-white/10 flex justify-between items-end">
//                   <div>
//                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Monthly Net Gain</p>
//                     <p className="text-3xl font-black text-blue-400 leading-none mt-1">${result.savings}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Instant ROI</p>
//                     <p className="text-lg font-bold text-emerald-400">30% DISCOUNT</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <footer className="mt-16 text-center text-slate-600 text-[9px] uppercase tracking-[0.4em] font-black">
//           © 2026 Credex Enterprise • Secure Audit Portal • Level 4 Encryption
//         </footer>
//       </div>

//       {/* History Slide-over Sidebar */}
//       {showHistory && (
//         <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex justify-end transition-all">
//           <div className="w-full max-w-md bg-[#0f172a] h-full p-8 border-l border-white/10 shadow-2xl relative animate-in slide-in-from-right duration-300">
//             <div className="flex justify-between items-center mb-10">
//               <h2 className="text-xl font-black flex items-center gap-3 uppercase tracking-tighter">
//                 <History className="text-blue-500"/> Recent Audits
//               </h2>
//               <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-white/10 rounded-full transition-all text-slate-400"><X /></button>
//             </div>
            
//             <div className="space-y-4">
//               {history.length > 0 ? history.map((item, index) => (
//                 <div key={index} className="p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-blue-500/40 transition-all group">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{new Date(item.created_at).toLocaleDateString()}</span>
//                     <span className="text-xs text-emerald-400 font-black tracking-tighter italic">-${item.savings * 12} saved</span>
//                   </div>
//                   <p className="text-sm font-bold text-slate-200 truncate">{item.email}</p>
//                   <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">{item.tool} • {item.seats} Seats</p>
//                 </div>
//               )) : (
//                 <p className="text-center text-slate-500 font-bold py-20 italic">No audits found in history.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;












// import { useState, useEffect } from 'react';
// import { calculateAudit } from './utils/engine';
// import { TOOLS_DATABASE } from './utils/pricing';
// import { supabase } from './lib/supabase';
// import { History, Download, LayoutDashboard, FileText, X, CheckCircle, Sun, Moon, Search, TrendingDown, Wallet } from 'lucide-react';
// import toast, { Toaster } from 'react-hot-toast';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// function App() {
//   const [tool, setTool] = useState('chatgpt');
//   const [seats, setSeats] = useState(1);
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [isDark, setIsDark] = useState(true);
//   const [showHistory, setShowHistory] = useState(false);
//   const [history, setHistory] = useState<any[]>([]);

//   const result = calculateAudit(tool, seats);
//   const currentTool = TOOLS_DATABASE.find(t => t.id === tool);
//   const monthlySpend = (currentTool?.price || 0) * seats;
//   const credexSpend = monthlySpend - result.savings;

//   const fetchHistory = async () => {
//     const { data, error } = await supabase.from('audits').select('*').order('created_at', { ascending: false }).limit(6);
//     if (!error && data) setHistory(data);
//   };

//   useEffect(() => { fetchHistory(); }, []);

//   // FIXED PDF LOGIC: Using specific ID and better config
//   const handleDownloadPDF = async () => {
//     const element = document.getElementById('report-area'); // Target the whole results section
//     if (!element) {
//       toast.error("Please generate an audit first!");
//       return;
//     }
    
//     const tId = toast.loading("Finalizing PDF Report...");
//     try {
//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: isDark ? "#0f172a" : "#ffffff",
//       });
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
//       pdf.save(`Credex_Audit_Report.pdf`);
//       toast.success("PDF Saved!", { id: tId });
//     } catch (err) {
//       toast.error("Render failed. Try again.", { id: tId });
//     }
//   };

//   const handleGenerateAudit = async () => {
//     if (!email.includes('@')) {
//       toast.error("Valid work email required!");
//       return;
//     }
//     setLoading(true);
//     setShowResults(false);
//     const tId = toast.loading("Scanning tool pricing APIs...");

//     try {
//       const { error } = await supabase.from('audits').insert([{ email, tool, seats, savings: result.savings }]);
//       if (error) throw error;

//       setTimeout(() => {
//         setLoading(false);
//         setShowResults(true);
//         toast.success("Audit Generated!", { id: tId });
//         fetchHistory();
//       }, 2000);
//     } catch (error) {
//       toast.error("Network Error", { id: tId });
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
//       <Toaster position="top-center" />
      
//       <div className="max-w-6xl mx-auto p-4 md:p-10">
//         <header className="mb-12 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg">C</div>
//              <h1 className="text-2xl font-black tracking-tighter uppercase">Credex<span className="text-blue-500">Audit</span></h1>
//           </div>
//           <div className="flex items-center gap-3 bg-white/5 p-2 rounded-full border border-white/10">
//              <button onClick={() => setIsDark(!isDark)} className="p-2 hover:bg-white/10 rounded-full transition-all">
//                 {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-600" />}
//              </button>
//              <button onClick={() => setShowHistory(true)} className="p-2 hover:bg-white/10 rounded-full transition-all">
//                 <History size={18} className="text-slate-400" />
//              </button>
//              <button onClick={handleDownloadPDF} className="p-2 hover:bg-white/10 rounded-full transition-all">
//                 <Download size={18} className="text-blue-500" />
//              </button>
//           </div>
//         </header>

//         <div className="grid gap-8 lg:grid-cols-12 items-start">
//           {/* Input Section */}
//           <div className="lg:col-span-6 space-y-6">
//             <div className={`p-8 rounded-[2rem] border transition-all ${isDark ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-md'}`}>
//               <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 opacity-50 flex items-center gap-2">
//                 <LayoutDashboard size={14} /> Configuration
//               </h3>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-[10px] font-bold uppercase mb-2 opacity-60">SaaS Platform</label>
//                   <select value={tool} onChange={(e) => setTool(e.target.value)} className={`w-full p-4 rounded-xl border outline-none font-bold ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
//                     {TOOLS_DATABASE.map(t => <option key={t.id} value={t.id} className={isDark ? 'bg-slate-900' : 'bg-white'}>{t.name}</option>)}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-[10px] font-bold uppercase mb-2 opacity-60">Seat Count</label>
//                   <input type="number" value={seats} onChange={(e) => setSeats(Number(e.target.value))} className={`w-full p-4 rounded-xl border outline-none font-bold ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`} />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] font-bold uppercase mb-2 opacity-60">Corporate Email</label>
//                   <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className={`w-full p-4 rounded-xl border outline-none font-bold mb-4 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`} />
//                 </div>
//                 <button onClick={handleGenerateAudit} disabled={loading} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
//                   {loading ? <Search className="animate-spin" size={16} /> : null}
//                   {loading ? 'Processing...' : 'Generate Official Audit'}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Results Section - This is what the PDF captures */}
//           <div className="lg:col-span-6 h-full" id="report-area">
//             {showResults ? (
//               <div className="animate-in fade-in zoom-in duration-700 space-y-6">
//                 {/* Hero Savings Card */}
//                 <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
//                   <div className="relative z-10">
//                     <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">Annual Savings</h4>
//                     <div className="text-8xl font-black tracking-tighter mb-4">${result.savings * 12}</div>
//                     <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
//                       <CheckCircle className="text-emerald-400 flex-shrink-0" size={20} />
//                       <p className="text-xs font-bold leading-tight">{result.recommendation}</p>
//                     </div>
//                   </div>
//                   <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
//                 </div>

//                 {/* Detailed Monthly Breakdown Card */}
//                 <div className={`p-8 rounded-[2rem] border transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
//                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 opacity-50 border-b border-white/5 pb-4 flex items-center gap-2">
//                     <TrendingDown size={14} /> Monthly Financial Breakdown
//                   </h3>
                  
//                   <div className="space-y-6">
//                     <div className="flex justify-between items-center group">
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-red-400/10 rounded-lg"><TrendingDown size={18} className="text-red-400" /></div>
//                         <div>
//                           <p className="text-[10px] font-bold uppercase opacity-40">Current Market Cost</p>
//                           <p className="font-bold text-slate-300">Standard Pricing</p>
//                         </div>
//                       </div>
//                       <span className="text-xl font-black text-red-400">-${monthlySpend}</span>
//                     </div>

//                     <div className="flex justify-between items-center group">
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-emerald-400/10 rounded-lg"><Wallet size={18} className="text-emerald-400" /></div>
//                         <div>
//                           <p className="text-[10px] font-bold uppercase opacity-40">Credex Optimized Cost</p>
//                           <p className="font-bold text-slate-300">Unified Billing</p>
//                         </div>
//                       </div>
//                       <span className="text-xl font-black text-emerald-400">-${credexSpend}</span>
//                     </div>

//                     <div className={`mt-6 pt-6 border-t border-dashed ${isDark ? 'border-white/10' : 'border-slate-200'} flex justify-between items-center`}>
//                        <p className="text-xs font-black uppercase tracking-widest text-blue-500">Net Monthly Savings</p>
//                        <p className="text-4xl font-black text-blue-500 tracking-tighter">+${result.savings}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className={`h-full min-h-[450px] border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center opacity-40 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-300 bg-slate-100'}`}>
//                 {loading ? (
//                    <div className="text-center space-y-4">
//                       <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//                       <p className="text-[10px] font-black uppercase tracking-widest">Scanning {tool} pricing tiers...</p>
//                    </div>
//                 ) : (
//                   <div className="text-center">
//                     <FileText size={48} className="mx-auto mb-4" />
//                     <p className="text-xs font-black uppercase tracking-widest">Generate Audit to see results</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* History Sidebar */}
//       {showHistory && (
//         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex justify-end">
//           <div className={`w-full max-w-md h-full p-8 border-l animate-in slide-in-from-right duration-300 ${isDark ? 'bg-slate-900 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
//             <div className="flex justify-between items-center mb-10">
//                <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3"><History className="text-blue-500" /> Recent Audits</h2>
//                <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400"><X /></button>
//             </div>
//             <div className="space-y-4">
//               {history.map((item, index) => (
//                 <div key={index} className={`p-5 rounded-2xl border transition-all ${isDark ? 'bg-white/5 border-white/5 hover:border-blue-500/40' : 'bg-slate-50 border-slate-200 hover:border-blue-500/40 shadow-sm'}`}>
//                   <div className="flex justify-between text-[10px] font-black opacity-50 mb-2 uppercase">
//                     <span>{new Date(item.created_at).toLocaleDateString()}</span>
//                     <span className="text-emerald-400">-${item.savings * 12} saved</span>
//                   </div>
//                   <p className="text-sm font-bold truncate mb-1">{item.email}</p>
//                   <p className="text-[10px] opacity-70 uppercase font-black">{item.tool} • {item.seats} Seats</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


















import { useState, useEffect } from 'react';
import { calculateAudit } from './utils/engine';
import { TOOLS_DATABASE } from './utils/pricing';
import { supabase } from './lib/supabase';
import { History, LayoutDashboard, FileText, X, CheckCircle, Sun, Moon, Search, Zap, ShieldCheck, Activity, TrendingUp } from 'lucide-react';
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
    // 🛡️ SECURITY: Form Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Professional work email required!");
      return;
    }
    
    if (loading) return; // Prevent spam

    setLoading(true);
    setShowResults(false);
    const tId = toast.loading("Executing Deep Saas Audit...");

    try {
      await supabase.from('audits').insert([{ email, tool, seats, savings: result.savings }]);
      
      // 🧠 Pulse Animation Delay
      setTimeout(() => {
        setLoading(false);
        setShowResults(true);
        toast.success("Audit Complete!", { id: tId });
        fetchHistory();
      }, 1500); // 1.5s professional delay
    } catch (error) {
      toast.error("Database Sync Error", { id: tId });
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto p-4 md:p-10">
        {/* Compact Navbar */}
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
          {/* Input Side (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            <header>
              {/* Spacing updated, chipka nhi lag raha */}
              <h2 className="text-5xl font-black mb-6 tracking-tighter leading-tight">Stop <span className="text-blue-500 underline decoration-blue-500/20">Overpaying</span> for AI Seats.</h2>
              <p className="text-slate-400 font-medium text-lg">One consolidated bill. 30% flat savings. Professional auditing.</p>
            </header>

            <div className={`p-8 rounded-[3rem] border transition-all ${isDark ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-lg'}`}>
              <div className="space-y-6">
                {/* Security/Trust Badges */}
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
                  {/* FEATURE: Interactive Slider */}
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

                {/* SECURITY: debounced handler */}
                <button onClick={handleGenerateAudit} disabled={loading} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-500 active:scale-95 transition-all shadow-xl shadow-blue-500/30 disabled:opacity-50 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4">
                  {loading ? <Activity className="animate-pulse" size={18} /> : <ShieldCheck size={18} />}
                  {loading ? 'Performing AI Audit...' : 'Execute Official Audit'}
                </button>
              </div>
            </div>
          </div>

          {/* Results Side (PDF Hta diya) */}
          <div className="lg:col-span-5 h-full">
            {showResults ? (
              <div id="audit-results-card" className="animate-in fade-in zoom-in duration-700 h-full flex flex-col gap-6">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl border border-white/20">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 opacity-60">
                        <TrendingUp size={16} />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Total Annual Savings</h3>
                    </div>
                    {/* Numbers smaller kr diya (7xl -> 6xl) */}
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

      {/* History Sidebar */}
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