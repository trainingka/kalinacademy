import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useData } from '../hooks/useData'
import { 
  Rocket, 
  Zap, 
  Target, 
  Star, 
  GraduationCap, 
  HelpCircle, 
  TrendingUp, 
  Wallet, 
  Headphones, 
  Terminal,
  HelpCircle as HelpIcon,
  RefreshCw
} from 'lucide-react'

export default function MyKPIs() {
  const { user, profile } = useAuth()
  const { monthlyKpis, fetchMonthlyKpis, tasks, fetchTasks, loading } = useData()

  useEffect(() => {
    if (user) {
      fetchMonthlyKpis()
      fetchTasks(user.id)
    }
  }, [user])

  const milestones = tasks.filter(t => t.status !== 'completed').slice(0, 3)

  const KpiCard = ({ title, value, target, progress, icon: Icon, color, shadowColor, progressLabel }) => (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[32px] p-8 relative overflow-hidden group hover:bg-slate-900/60 transition-all border-b-4 border-b-transparent hover:border-b-sky-500/50">
       <div className="flex items-start justify-between relative z-10 mb-8">
          <div>
             <p className="text-[9px] font-black tracking-[0.2em] text-slate-500 uppercase mb-3 leading-none">{title}</p>
             <h3 className="text-3xl font-black text-white tracking-tighter leading-none mb-3">
                {value}<span className={`text-[11px] font-bold ml-2 ${progress >= 90 ? 'text-emerald-500' : 'text-slate-500'}`}>{target}</span>
             </h3>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-xl text-slate-600 group-hover:text-sky-400 group-hover:bg-sky-500/10 transition-all">
             <Icon size={20} />
          </div>
       </div>

       <div className="space-y-3">
          <div className="flex justify-between items-end">
             <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">{progressLabel}</p>
             <span className={`text-[10px] font-black ${color.replace('bg-', 'text-')} leading-none`}>{progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden shadow-inner border border-slate-900/40">
             <div 
               className={`h-full rounded-full transition-all duration-1000 ${color} ${shadowColor}`} 
               style={{ width: `${progress}%` }} 
             />
          </div>
       </div>
    </div>
  )

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-800/40 pb-10">
        <div className="relative">
          <h2 className="text-3xl font-black tracking-tight text-white leading-none uppercase">
            Monthly KPI Map
          </h2>
          <p className="text-slate-500 mt-4 font-medium text-base max-w-xl">
             Real-time performance distribution for October 2023
          </p>
        </div>

        <div className="flex gap-3">
           <div className="px-5 py-2 bg-emerald-500/10 text-emerald-400 text-[9px] font-black rounded-full border border-emerald-400/20 uppercase tracking-[0.3em] flex items-center gap-2.5 leading-none">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              On Track
           </div>
           <div className="px-5 py-2 bg-slate-800/40 text-slate-500 text-[9px] font-black rounded-full border border-slate-800/60 uppercase tracking-[0.3em] leading-none">
              Review Required
           </div>
        </div>
      </div>

      {/* KPI Tiles Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <KpiCard 
           title="Sales Revenue" value="$124.5k" target="/$150k" progress={83} 
           icon={Wallet} color="bg-sky-500" shadowColor="shadow-[0_0_15px_rgba(14,165,233,0.5)]"
           progressLabel="PROGRESS"
         />
         <KpiCard 
           title="Resolved Calls" value="942" target="/1,000" progress={94.2} 
           icon={Headphones} color="bg-emerald-400" shadowColor="shadow-[0_0_15px_rgba(52,211,153,0.5)]"
           progressLabel="EFFICIENCY"
         />
         <KpiCard 
           title="Code Quality Index" value="78" target="/100" progress={78} 
           icon={Terminal} color="bg-rose-500" shadowColor="shadow-[0_0_15px_rgba(244,63,94,0.5)]"
           progressLabel="ACCURACY"
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
        {/* Upcoming Milestones Section */}
        <div className="lg:col-span-2 space-y-8">
           <h3 className="text-xl font-black text-white tracking-tight uppercase tracking-[0.2em] border-l-4 border-sky-500 pl-4 ml-1">Upcoming Milestones</h3>
           <div className="space-y-4">
              {[
                { title: 'Quarterly Review Readiness', desc: 'Finalize all documentation and metric proofs.', icon: Rocket, color: 'text-sky-500', bg: 'bg-sky-500/10', date: 'OCT 24', delta: 'IN 3 DAYS' },
                { title: 'Lead Generation Target', desc: 'Reach the 200 high-intent leads threshold.', icon: Star, color: 'text-emerald-500', bg: 'bg-emerald-500/10', date: 'OCT 30', delta: 'IN 9 DAYS' },
                { title: 'Leadership Certification', desc: 'Complete Module 4: Conflict Resolution.', icon: GraduationCap, color: 'text-rose-500', bg: 'bg-rose-500/10', date: 'NOV 05', delta: 'IN 15 DAYS' },
              ].map((m, idx) => (
                <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[28px] p-6 flex items-center justify-between group hover:bg-slate-900/60 hover:border-slate-700 transition-all">
                   <div className="flex items-center gap-6">
                      <div className={`h-14 w-14 ${m.bg} ${m.color} rounded-2xl flex items-center justify-center border border-current opacity-60 group-hover:opacity-100 transition-opacity`}>
                         <m.icon size={20} />
                      </div>
                      <div>
                         <h4 className="text-base font-black text-white leading-none mb-2 group-hover:text-sky-400 transition-colors uppercase tracking-tight">{m.title}</h4>
                         <p className="text-xs font-bold text-slate-500">{m.desc}</p>
                      </div>
                   </div>
                   <div className="text-right flex flex-col items-end">
                      <p className={`text-xs font-black ${m.color} mb-1 uppercase tracking-widest leading-none`}>{m.date}</p>
                      <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest leading-none">{m.delta}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Support & Context Section */}
        <div className="space-y-8">
           <h3 className="text-xl font-black text-white tracking-tight leading-none ml-1 uppercase">Support & Context</h3>
           
           <div className="bg-gradient-to-br from-sky-400 to-sky-600 rounded-[40px] p-8 relative overflow-hidden group shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:shadow-sky-500/50 transition-all active:scale-[0.98]">
              <div className="absolute top-0 right-0 p-8 text-white/10 group-hover:text-white/20 transition-all opacity-40">
                 <HelpIcon size={100} />
              </div>
              
              <div className="relative z-10">
                 <h4 className="text-2xl font-black text-white leading-none mb-6 uppercase tracking-tight">Stuck on a metric?</h4>
                 <p className="text-sky-50 text-xs font-medium leading-relaxed mb-8 opacity-90">
                    If you're facing blockers or need resource adjustments, reach out to your line manager directly.
                 </p>
                 <button className="w-full bg-white text-sky-600 font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:bg-sky-50 transition-all uppercase tracking-[0.2em] text-[10px]">
                    <Zap size={16} className="fill-sky-600" />
                    Request Assistance
                 </button>
              </div>
           </div>

           <div className="bg-slate-900/60 border border-slate-800/60 rounded-[32px] p-6 group relative overflow-hidden">
              <p className="text-[9px] font-black text-sky-500 uppercase tracking-[0.3em] mb-6 ml-1 leading-none">Your Team Comparison</p>
              
              <div className="flex items-center gap-5 mb-8">
                 <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-950 bg-slate-900 group-hover:border-slate-800 transition-all">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 777}`} alt="team member" className="rounded-full" />
                      </div>
                    ))}
                    <div className="h-8 w-8 rounded-full border-2 border-slate-950 bg-sky-500 flex items-center justify-center text-[9px] font-black text-white shadow-lg">+5</div>
                 </div>
                 
                 <p className="text-[10px] font-bold text-slate-500 leading-tight">
                    You are in the <span className="text-emerald-400 font-black">top 15%</span> of your department.
                 </p>
              </div>

              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900/60">
                 <div className="h-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]" style={{ width: '85%' }} />
              </div>
           </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="fixed bottom-10 right-10 z-[100]">
         <button className="h-16 w-16 bg-sky-500 text-white rounded-[22px] flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.5)] active:scale-95 transition-all group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <RefreshCw size={28} className="relative z-10 group-hover:rotate-180 transition-transform duration-700" />
         </button>
      </div>
    </div>
  )
}
