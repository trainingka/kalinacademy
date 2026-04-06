import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../hooks/useData'
import { Target, Zap, ChevronRight, BarChart3, ShieldCheck, Activity, Layers } from 'lucide-react'

export default function AutoBreakdownEngine() {
  const { id } = useParams()
  const { yearlyGoals, monthlyKpis, fetchYearlyGoals, fetchMonthlyKpis, loading } = useData()
  const [selectedGoal, setSelectedGoal] = useState(null)

  useEffect(() => {
    fetchYearlyGoals()
  }, [])

  useEffect(() => {
    if (id) {
       fetchMonthlyKpis(id)
       const goal = yearlyGoals.find(g => g.id === id)
       if (goal) setSelectedGoal(goal)
    } else if (yearlyGoals.length > 0) {
       const firstGoal = yearlyGoals[0]
       setSelectedGoal(firstGoal)
       fetchMonthlyKpis(firstGoal.id)
    }
  }, [id, yearlyGoals])

  if (loading && !selectedGoal) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
      </div>
    )
  }

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 relative">
      {/* Engine Interface Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800/40 pb-10 transition-colors">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-1 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
             <span className="text-[9px] font-black text-sky-600 dark:text-sky-500 uppercase tracking-[0.3em]">Quantum Engine Active</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
            Goals Breakdown
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium text-sm leading-relaxed max-w-lg">Cascading yearly high-level objectives into monthly operational KPI protocols.</p>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/60 rounded-2xl shadow-sm dark:shadow-none transition-colors">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-lg">
                 <ShieldCheck size={18} />
              </div>
              <div>
                 <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">System integrity</p>
                 <p className="text-[10px] font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-tighter mt-1 leading-none">Verified</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Metric Overview Terminal (Left) */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-8 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all shadow-sm dark:shadow-none">
              <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-8 leading-none">Yearly Target</h3>
              <div className="space-y-2 mb-8">
                 <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">${selectedGoal?.target_value?.toLocaleString() || '0'}</p>
                 <p className="text-[10px] font-bold text-sky-600 dark:text-sky-500 uppercase tracking-widest leading-none">Global Objective</p>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                 <div className="h-full w-2/3 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.4)]" />
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-8 flex flex-col gap-6 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all shadow-sm dark:shadow-none">
              <div className="flex items-center justify-between">
                 <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Monthly Avg</p>
                 <Activity size={14} className="text-emerald-500" />
              </div>
              <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">${(selectedGoal?.target_value / 12)?.toLocaleString() || '0'}</p>
           </div>
        </div>

        {/* Monthly KPI Protocol Map (Right) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[40px] p-10 relative group transition-all hover:bg-slate-50 dark:hover:bg-slate-900/50 shadow-sm dark:shadow-none">
           <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                 <div className="h-10 w-1 bg-sky-500 rounded-full" />
                 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Operational Cascade</h3>
              </div>
              <button className="bg-sky-500 text-white text-[9px] font-black px-6 py-3 rounded-xl uppercase tracking-widest shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-sky-500/50 transition-all leading-none">Apply Breakdown</button>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {months.map((month, index) => (
                <div key={month} className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/40 rounded-2xl p-5 hover:border-sky-500/30 transition-all group/cell shadow-inner dark:shadow-none text-center">
                   <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-3 leading-none">{month}</p>
                   <p className="text-sm font-black text-slate-900 dark:text-white tracking-tighter mb-4 leading-none">${(selectedGoal?.target_value / 12)?.toLocaleString() || '0'}</p>
                   <div className="h-1 w-full bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden">
                      <div className={`h-full bg-sky-500 transition-all duration-1000 ${index < 4 ? 'w-full' : 'w-0'}`} />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Logic Visualization Overlay */}
      <div className="bg-white dark:bg-sky-950/10 border border-slate-200 dark:border-sky-900/20 rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all shadow-sm dark:shadow-none">
         <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-500/20 shadow-inner">
               <Layers size={28} />
            </div>
            <div>
               <h4 className="text-base font-black text-slate-900 dark:text-sky-100 uppercase tracking-tight leading-none mb-2">Automated Optimization</h4>
               <p className="text-xs font-medium text-slate-500 dark:text-sky-400/60 leading-relaxed">System-level algorithm distributing targets based on historical high-velocity execution periods.</p>
            </div>
         </div>
         <button className="bg-white dark:bg-slate-950/60 text-sky-600 dark:text-sky-400 border border-slate-200 dark:border-slate-800 py-4 px-10 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-sky-500 dark:hover:bg-sky-500 hover:text-white transition-all duration-300 leading-none min-w-[200px]">
            Recalculate Protocol
         </button>
      </div>
    </div>
  )
}
