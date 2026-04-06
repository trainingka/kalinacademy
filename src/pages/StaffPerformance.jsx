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
    <div className="bg-slate-950/40 border border-slate-800/40 rounded-xl p-3 flex flex-col items-center justify-center min-w-[100px]">
      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 leading-none">{label}</p>
      <p className={`text-lg font-black ${color} tracking-tight leading-none`}>{value}</p>
      {subtext && <p className="text-[8px] font-bold text-slate-500 uppercase mt-1 leading-none">{subtext}</p>}
    </div>
  )

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
      {/* Top Header Profile */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 border-b border-slate-800/40 pb-10">
        <div className="flex items-center gap-8">
          <div className="relative group">
            <div className="h-32 w-32 rounded-[32px] bg-slate-800 p-1 shadow-2xl overflow-hidden border-2 border-slate-700">
               <img 
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=elena" 
                 alt="Elena Rodriguez" 
                 className="w-full h-full object-cover rounded-[28px]"
               />
            </div>
            <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-emerald-500 text-white text-[8px] font-black rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.5)] border-2 border-slate-950 uppercase tracking-widest">
               Active
            </div>
          </div>

          <div>
             <button 
               onClick={() => navigate(-1)} 
               className="flex items-center gap-2 text-sky-500 font-black text-[9px] uppercase tracking-[0.2em] mb-3 hover:translate-x-[-4px] transition-transform"
             >
                <ChevronLeft size={12} /> Performance Details
             </button>
             <h2 className="text-3xl font-black text-white tracking-tighter leading-none mb-3 uppercase">Elena Rodriguez</h2>
             <p className="text-slate-500 font-bold text-xs uppercase tracking-widest px-1 border-l-2 border-sky-500 ml-1">
                Senior Frontend Engineer • Engineering Team A
             </p>
             
             <div className="flex gap-3 mt-6">
                <button className="bg-sky-500 text-white font-black py-3 px-6 rounded-xl flex items-center gap-2 shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:shadow-sky-500/60 transition-all uppercase tracking-[0.2em] text-[9px]">
                   <MessageSquare size={14} /> Communicate
                </button>
                <button className="bg-slate-900 border border-slate-800 text-slate-400 font-black py-3 px-6 rounded-xl flex items-center gap-2 hover:bg-slate-800 hover:text-white transition-all uppercase tracking-[0.2em] text-[9px]">
                   <Settings size={14} /> Adjust KPIs
                </button>
             </div>
          </div>
        </div>

        <div className="flex gap-8 xl:pr-8">
           <div className="text-center xl:text-right">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-1.5 leading-none">Tenure</p>
              <p className="text-3xl font-black text-white tracking-tighter leading-none">2.4 <span className="text-sm text-slate-500 ml-0.5 font-bold italic">Years</span></p>
           </div>
           <div className="text-center xl:text-right">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-1.5 leading-none">Peer Rating</p>
              <p className="text-3xl font-black text-emerald-400 tracking-tighter drop-shadow-[0_0_10px_rgba(52,211,153,0.3)] leading-none">4.9/5.0</p>
           </div>
        </div>
      </div>

      {/* Middle Row (Analytics Matrix) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Goal Achievement Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[40px] p-10 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Award size={100} className="text-sky-500" />
           </div>
           <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10 leading-none">Goal Achievement</h3>
           
           <div className="flex flex-col items-center">
              <div className="relative h-48 w-48 mb-10">
                 <svg className="h-full w-full transform -rotate-90">
                    <circle 
                      cx="96" cy="96" r="82" 
                      stroke="currentColor" strokeWidth="18" fill="transparent" 
                      className="text-slate-800"
                    />
                    <circle 
                      cx="96" cy="96" r="82" 
                      stroke="currentColor" strokeWidth="18" fill="transparent" 
                      strokeDasharray="515.2" strokeDashoffset="103"
                      className="text-sky-500 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all duration-1000"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-4xl font-black text-white tracking-tighter leading-none">80<span className="text-xl font-bold ml-0.5">%</span></p>
                    <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mt-1.5 leading-none">Exceeding Average</p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <StatBox label="Current Q4" value="92%" />
                 <StatBox label="Target Q4" value="85%" />
              </div>
           </div>
        </div>

        {/* Productivity Trends Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[40px] p-10 relative group">
           <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1.5 leading-none">Productivity Trends</p>
                <h3 className="text-xl font-black text-white tracking-tight leading-none uppercase">Output Consistency</h3>
              </div>
              <div className="flex gap-2.5">
                 <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-400 text-[9px] font-black rounded-full uppercase tracking-widest leading-none">6 Months</span>
                 <span className="px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[9px] font-black rounded-full uppercase tracking-widest leading-none">Active</span>
              </div>
           </div>

           <div className="flex items-end justify-between gap-3 h-52 px-2 relative">
              {[
                { month: 'JUL', val: '35%' },
                { month: 'AUG', val: '50%' },
                { month: 'SEP', val: '68%' },
                { month: 'OCT', val: '82%', isPeak: true },
                { month: 'NOV', val: '95%' },
                { month: 'DEC', val: '72%' },
              ].map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-4 group/bar relative">
                   {item.isPeak && (
                      <div className="absolute -top-8 px-2 py-0.5 bg-sky-500 rounded-md shadow-lg shadow-sky-500/30">
                         <span className="text-[9px] font-black text-white leading-none tracking-tighter">82</span>
                      </div>
                   )}
                   <div 
                     className={`w-full rounded-t-2xl transition-all duration-700 relative overflow-hidden ${
                       item.isPeak ? 'bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.3)]' : 'bg-slate-800 group-hover/bar:bg-slate-700'
                     }`} 
                     style={{ height: item.val }}
                   />
                   <span className={`text-[9px] font-black ${item.isPeak ? 'text-sky-500' : 'text-slate-600'} tracking-widest leading-none`}>{item.month}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Bottom Row (Details Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Flagged Issues Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[40px] p-10 hover:bg-slate-900/50 transition-all group">
           <div className="flex items-center gap-5 mb-10">
              <div className="h-11 w-11 bg-rose-500/10 text-rose-500 rounded-xl flex items-center justify-center border border-rose-500/20">
                 <AlertCircle size={24} />
              </div>
              <h3 className="text-xl font-black text-white tracking-tight uppercase">Flagged Issues</h3>
           </div>

           <div className="space-y-4">
              {[
                { title: 'Documentation Latency', desc: 'System flags consistent 48hr delay in closing sprint documentation tasks.', status: 'URGENT REVIEW', color: 'border-l-rose-500', statusColor: 'text-rose-500' },
                { title: 'Peer Review Balance', desc: 'Elena is reviewing 4x more code than she is submitting. Risk of burnout.', status: 'SYSTEM SUGGESTION', color: 'border-l-emerald-400', statusColor: 'text-emerald-400' },
              ].map((issue) => (
                <div key={issue.title} className={`p-6 bg-slate-950/40 border border-slate-800/60 rounded-3xl border-l-[4px] ${issue.color} group/issue transition-all hover:bg-slate-900`}>
                   <h4 className="text-sm font-black text-white mb-2 uppercase tracking-tight group-hover/issue:text-sky-400 transition-colors leading-none">{issue.title}</h4>
                   <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">{issue.desc}</p>
                   <span className={`text-[9px] font-black tracking-widest uppercase ${issue.statusColor} leading-none`}>{issue.status}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Task Activity Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[40px] p-10 relative hover:bg-slate-900/50 transition-all group">
           <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-5">
                <div className="h-11 w-11 bg-sky-500/10 text-sky-400 rounded-xl flex items-center justify-center border border-sky-500/20">
                   <Clock size={24} />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight uppercase">Task Activity</h3>
              </div>
              <button className="text-[9px] font-black text-slate-600 hover:text-sky-500 uppercase tracking-widest transition-colors leading-none">View All</button>
           </div>

           <div className="space-y-4 flex-1">
              {[
                { title: 'Refactor Dashboard Charts', meta: 'Completed 2h ago • Sprint 44', status: 'COMPLETED', statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: Code2 },
                { title: 'UI Liquid Aesthetic Audit', meta: 'In Progress • Design Ops', status: 'ACTIVE', statusColor: 'text-sky-400 bg-sky-400/10 border-sky-400/20', icon: Zap },
                { title: 'API Integration - Layer 4', meta: 'Completed Yesterday • Backend Sync', status: 'COMPLETED', statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: Layers },
              ].map((task) => (
                <div key={task.title} className="p-4 bg-slate-950/40 rounded-2xl border border-slate-800/60 flex items-center justify-between group/task hover:border-slate-700 transition-all">
                   <div className="flex items-center gap-5">
                      <div className="h-10 w-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-600 group-hover/task:text-sky-400 transition-colors">
                         <task.icon size={18} />
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-white leading-none mb-1.5 uppercase">{task.title}</h4>
                         <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none">{task.meta}</p>
                      </div>
                   </div>
                   <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${task.statusColor} leading-none`}>
                      {task.status}
                   </span>
                </div>
              ))}
           </div>

            {/* FAB Integration */}
            <button className="absolute -right-5 top-1/2 -translate-y-1/2 h-16 w-16 bg-sky-500 text-white rounded-[22px] flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.5)] active:scale-95 transition-all z-[10] group/fab overflow-hidden">
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/fab:translate-y-0 transition-transform duration-500" />
               <Plus size={28} className="relative z-10" />
            </button>
        </div>
      </div>

      {/* Footer Meta */}
      <footer className="pt-8 text-center">
         <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">
            Data synced with GitHub and Slack ecosystems • Last Update 4m ago
         </p>
      </footer>
    </div>
  )
}
