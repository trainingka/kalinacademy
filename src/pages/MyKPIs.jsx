import { useEffect, useState } from 'react'
import { useData } from '../hooks/useData'
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  BarChart3, 
  Zap,
  MoreHorizontal
} from 'lucide-react'

export default function MyKPIs() {
  const { monthlyKpis, fetchMonthlyKpis, loading } = useData()

  useEffect(() => {
    fetchMonthlyKpis()
  }, [])

  const KpiCard = ({ title, value, target, progress, icon: Icon, color }) => (
    <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-8 group hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all shadow-sm dark:shadow-none relative overflow-hidden">
      <div className="flex items-start justify-between relative z-10 mb-8">
        <div className="flex items-center gap-4">
           <div className={`p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 ${color} shadow-inner`}>
              <Icon size={22} strokeWidth={2.5} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Operational Metric</p>
              <h4 className="text-base font-black text-slate-900 dark:text-white mt-1 uppercase tracking-tight leading-none">{title}</h4>
           </div>
        </div>
        <button className="text-slate-300 dark:text-slate-700 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
           <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="flex items-baseline gap-2">
           <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{value}</span>
           <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">/ {target} unit</span>
        </div>

        <div className="space-y-3">
           <div className="flex justify-between items-end px-1">
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Protocol Progress</p>
              <span className={`text-[11px] font-black leading-none ${progress >= 90 ? 'text-emerald-500' : 'text-sky-500'}`}>{progress}%</span>
           </div>
           <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${progress >= 90 ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]' : 'bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.3)]'}`} 
                style={{ width: `${progress}%` }} 
              />
           </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 relative">
      {/* KPI Identity Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800/40 pb-10 transition-colors">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-1 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
             <span className="text-[9px] font-black text-sky-600 dark:text-sky-500 uppercase tracking-[0.3em]">Execution Protocol Layer</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
            My KPIs
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium text-sm leading-relaxed max-w-lg">Monitoring individual strategic benchmarks. Absolute alignment with quarterly targets is mandatory.</p>
        </div>

        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-2xl px-6 py-4 flex flex-col items-center justify-center min-w-[140px] shadow-sm dark:shadow-none transition-colors">
           <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 leading-none">Total Value</p>
           <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">$12.4M</p>
        </div>
      </div>

      {/* Main KPI Matrix Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <KpiCard title="Revenue Growth" value="$420k" target="$500k" progress={84} icon={TrendingUp} color="text-sky-600 dark:text-sky-400" />
        <KpiCard title="Client Acquisition" value="12" target="15" progress={80} icon={Zap} color="text-emerald-500" />
        <KpiCard title="Operational Uptime" value="99.9%" target="99.9%" progress={100} icon={BarChart3} color="text-sky-600 dark:text-sky-400" />
      </div>

      {/* Milestone Protocol Section */}
      <section className="space-y-6 pt-10">
         <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Milestone Roadmap</h3>
            <button className="text-[9px] font-black text-sky-600 dark:text-sky-500 uppercase tracking-widest leading-none">Request Extension</button>
         </div>

         <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[40px] p-10 shadow-sm dark:shadow-none hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all">
            <div className="space-y-8">
               {[
                 { label: 'Q3 Operational Architecture Finalization', date: 'Oct 12, 2024', status: 'In Progress', icon: Clock, iconColor: 'text-sky-500' },
                 { label: 'Global Scaling Protocol Deployment', date: 'Nov 04, 2024', status: 'Pending', icon: Calendar, iconColor: 'text-slate-400 dark:text-slate-600' },
                 { label: 'Annual Security Review', date: 'Dec 15, 2024', status: 'Verified', icon: CheckCircle2, iconColor: 'text-emerald-500' }
               ].map((milestone, idx) => (
                 <div key={milestone.label} className="flex items-center justify-between group transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                       <div className={`p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 ${milestone.iconColor}`}>
                          <milestone.icon size={22} />
                       </div>
                       <div>
                          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-2 leading-none">{milestone.label}</h4>
                          <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">{milestone.date}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg border uppercase tracking-widest transition-colors ${milestone.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'}`}>
                          {milestone.status}
                       </span>
                       <ChevronRight size={18} className="text-slate-300 dark:text-slate-800 group-hover:text-sky-500 transition-all" />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  )
}
