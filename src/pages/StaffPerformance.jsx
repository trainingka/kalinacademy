import { useNavigate } from 'react-router-dom'
import { 
  ChevronLeft, 
  MessageSquare, 
  Settings, 
  TrendingUp, 
  Award, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Plus, 
  Code2, 
  Layers, 
  FileCheck 
} from 'lucide-react'

export default function StaffPerformance() {
  const navigate = useNavigate()

  const StatBox = ({ label, value, subtext, color = "text-white" }) => (
    <div className="bg-slate-950/40 border border-slate-800/40 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px]">
      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-xl font-black ${color} tracking-tight`}>{value}</p>
      {subtext && <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">{subtext}</p>}
    </div>
  )

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
      {/* Top Header Profile */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10 border-b border-slate-800/40 pb-12">
        <div className="flex items-center gap-10">
          <div className="relative group">
            <div className="h-44 w-44 rounded-[40px] bg-slate-800 p-1 shadow-2xl overflow-hidden border-2 border-slate-700">
               <img 
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=elena" 
                 alt="Elena Rodriguez" 
                 className="w-full h-full object-cover rounded-[36px]"
               />
            </div>
            <div className="absolute -bottom-3 -right-3 px-4 py-2 bg-emerald-500 text-white text-[10px] font-black rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.5)] border-4 border-slate-950 uppercase tracking-widest">
               Active
            </div>
          </div>

          <div>
             <button 
               onClick={() => navigate(-1)} 
               className="flex items-center gap-2 text-sky-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4 hover:translate-x-[-4px] transition-transform"
             >
                <ChevronLeft size={14} /> Performance Details
             </button>
             <h2 className="text-6xl font-black text-white tracking-tighter leading-none mb-4">Elena Rodriguez</h2>
             <p className="text-slate-500 font-bold text-sm uppercase tracking-widest px-1 border-l-2 border-sky-500 ml-1">
                Senior Frontend Engineer • Engineering Team A
             </p>
             
             <div className="flex gap-4 mt-8">
                <button className="bg-sky-500 text-white font-black py-4 px-8 rounded-2xl flex items-center gap-3 shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:shadow-sky-500/60 transition-all uppercase tracking-[0.2em] text-[10px]">
                   <MessageSquare size={16} /> Communicate
                </button>
                <button className="bg-slate-900 border border-slate-800 text-slate-400 font-black py-4 px-8 rounded-2xl flex items-center gap-3 hover:bg-slate-800 hover:text-white transition-all uppercase tracking-[0.2em] text-[10px]">
                   <Settings size={16} /> Adjust KPIs
                </button>
             </div>
          </div>
        </div>

        <div className="flex gap-12 xl:pr-12">
           <div className="text-center xl:text-right">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-2">Tenure</p>
              <p className="text-4xl font-black text-white tracking-tighter">2.4 <span className="text-lg text-slate-500 ml-1 font-bold italic">Years</span></p>
           </div>
           <div className="text-center xl:text-right">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-2">Peer Rating</p>
              <p className="text-4xl font-black text-emerald-400 tracking-tighter drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">4.9/5.0</p>
           </div>
        </div>
      </div>

      {/* Middle Row (Analytics Matrix) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Goal Achievement Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[48px] p-12 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Award size={120} className="text-sky-500" />
           </div>
           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-12">Goal Achievement</h3>
           
           <div className="flex flex-col items-center">
              <div className="relative h-64 w-64 mb-12">
                 <svg className="h-full w-full transform -rotate-90">
                    <circle 
                      cx="128" cy="128" r="110" 
                      stroke="currentColor" strokeWidth="24" fill="transparent" 
                      className="text-slate-800"
                    />
                    <circle 
                      cx="128" cy="128" r="110" 
                      stroke="currentColor" strokeWidth="24" fill="transparent" 
                      strokeDasharray="690.8" strokeDashoffset="138"
                      className="text-sky-500 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all duration-1000"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-7xl font-black text-white tracking-tighter leading-none">80<span className="text-3xl font-bold ml-1">%</span></p>
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-2">Exceeding Average</p>
                 </div>
              </div>

              <div className="flex gap-6">
                 <StatBox label="Current Q4" value="92%" />
                 <StatBox label="Target Q4" value="85%" />
              </div>
           </div>
        </div>

        {/* Productivity Trends Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[48px] p-12 relative group">
           <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Productivity Trends</p>
                <h3 className="text-4xl font-black text-white tracking-tight leading-none">Output Consistency</h3>
              </div>
              <div className="flex gap-3">
                 <span className="px-4 py-1.5 bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-black rounded-full uppercase tracking-widest">6 Months</span>
                 <span className="px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-black rounded-full uppercase tracking-widest">Active</span>
              </div>
           </div>

           <div className="flex items-end justify-between gap-4 h-64 px-2 relative">
              {[
                { month: 'JUL', val: '35%' },
                { month: 'AUG', val: '50%' },
                { month: 'SEP', val: '68%' },
                { month: 'OCT', val: '82%', isPeak: true },
                { month: 'NOV', val: '95%' },
                { month: 'DEC', val: '72%' },
              ].map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-6 group/bar relative">
                   {item.isPeak && (
                      <div className="absolute -top-10 px-3 py-1 bg-sky-500 rounded-lg shadow-lg shadow-sky-500/30">
                         <span className="text-[10px] font-black text-white leading-none tracking-tighter">82</span>
                      </div>
                   )}
                   <div 
                     className={`w-full rounded-t-3xl transition-all duration-700 relative overflow-hidden ${
                       item.isPeak ? 'bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.3)]' : 'bg-slate-800 group-hover/bar:bg-slate-700'
                     }`} 
                     style={{ height: item.val }}
                   />
                   <span className={`text-[10px] font-black ${item.isPeak ? 'text-sky-500' : 'text-slate-600'} tracking-widest`}>{item.month}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Bottom Row (Details Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Flagged Issues Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[48px] p-12 hover:bg-slate-900/50 transition-all group">
           <div className="flex items-center gap-6 mb-12">
              <div className="h-14 w-14 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center border border-rose-500/20">
                 <AlertCircle size={32} />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">Flagged Issues</h3>
           </div>

           <div className="space-y-6">
              {[
                { title: 'Documentation Latency', desc: 'System flags consistent 48hr delay in closing sprint documentation tasks.', status: 'URGENT REVIEW', color: 'border-l-rose-500', statusColor: 'text-rose-500' },
                { title: 'Peer Review Balance', desc: 'Elena is reviewing 4x more code than she is submitting. Risk of burnout.', status: 'SYSTEM SUGGESTION', color: 'border-l-emerald-400', statusColor: 'text-emerald-400' },
              ].map((issue) => (
                <div key={issue.title} className={`p-8 bg-slate-950/40 border border-slate-800/60 rounded-3xl border-l-[6px] ${issue.color} group/issue transition-all hover:bg-slate-900`}>
                   <h4 className="text-base font-black text-white mb-2 uppercase tracking-tight group-hover/issue:text-sky-400 transition-colors">{issue.title}</h4>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">{issue.desc}</p>
                   <span className={`text-[10px] font-black tracking-widest uppercase ${issue.statusColor}`}>{issue.status}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Task Activity Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[48px] p-12 relative hover:bg-slate-900/50 transition-all group">
           <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-sky-500/10 text-sky-400 rounded-2xl flex items-center justify-center border border-sky-500/20">
                   <Clock size={32} />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight">Task Activity</h3>
              </div>
              <button className="text-[10px] font-black text-slate-600 hover:text-sky-500 uppercase tracking-widest transition-colors">View All</button>
           </div>

           <div className="space-y-6 flex-1">
              {[
                { title: 'Refactor Dashboard Charts', meta: 'Completed 2h ago • Sprint 44', status: 'COMPLETED', statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: Code2 },
                { title: 'UI Liquid Aesthetic Audit', meta: 'In Progress • Design Ops', status: 'ACTIVE', statusColor: 'text-sky-400 bg-sky-400/10 border-sky-400/20', icon: Zap },
                { title: 'API Integration - Layer 4', meta: 'Completed Yesterday • Backend Sync', status: 'COMPLETED', statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: Layers },
              ].map((task) => (
                <div key={task.title} className="p-6 bg-slate-950/40 rounded-3xl border border-slate-800/60 flex items-center justify-between group/task hover:border-slate-700 transition-all">
                   <div className="flex items-center gap-6">
                      <div className="h-12 w-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-600 group-hover/task:text-sky-400 transition-colors">
                         <task.icon size={20} />
                      </div>
                      <div>
                         <h4 className="text-base font-black text-white leading-none mb-1.5">{task.title}</h4>
                         <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{task.meta}</p>
                      </div>
                   </div>
                   <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${task.statusColor}`}>
                      {task.status}
                   </span>
                </div>
              ))}
           </div>

            {/* FAB Integration */}
            <button className="absolute -right-6 top-1/2 -translate-y-1/2 h-20 w-20 bg-sky-500 text-white rounded-[28px] flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.5)] active:scale-95 transition-all z-[10] group/fab overflow-hidden">
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/fab:translate-y-0 transition-transform duration-500" />
               <Plus size={36} className="relative z-10" />
            </button>
        </div>
      </div>

      {/* Footer Meta */}
      <footer className="pt-12 text-center">
         <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">
            Data synced with GitHub and Slack ecosystems • Last Update 4m ago
         </p>
      </footer>
    </div>
  )
}
