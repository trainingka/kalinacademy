import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useData } from '../hooks/useData'
import { Target, Zap, Rocket, Star, GraduationCap, HelpCircle, ArrowRight } from 'lucide-react'

export default function MyKPIs() {
  const { user } = useAuth()
  const { monthlyKpis, fetchMonthlyKpis, tasks, fetchTasks, loading } = useData()

  useEffect(() => {
    if (user) {
      // Fetch all KPIs for the organization (as per user's 'all' request)
      fetchMonthlyKpis()
      fetchTasks(user.id)
    }
  }, [user])

  // Repurposing high-priority tasks as milestones for the MVP
  const milestones = tasks
    .filter(t => t.task_type === 'kpi_driven' && t.status !== 'completed')
    .slice(0, 3)

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            My <span className="text-sky-500 italic">KPIs</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Monthly performance distribution and progress</p>
        </div>
        <div className="flex gap-2">
           <span className="px-4 py-2 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100 uppercase tracking-widest">On Track</span>
           <span className="px-4 py-2 bg-slate-100 text-slate-500 text-xs font-bold rounded-full border border-slate-200 uppercase tracking-widest">Review Required</span>
        </div>
      </div>

      {/* Monthly KPI Map */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900">Monthly KPI Map</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {monthlyKpis.slice(0, 3).map((kpi, idx) => {
            const progress = (kpi.current_progress / kpi.target_value) * 100
            const icons = [Rocket, Target, Star]
            const Icon = icons[idx % icons.length]
            
            return (
              <div key={kpi.id} className="glass-card p-8 border-slate-200 shadow-soft transition-all hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-sky-50 transition-colors">
                    <Icon size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Value</p>
                    <p className="text-2xl font-extrabold text-slate-900">${(kpi.target_value / 1000).toFixed(1)}k</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Progress</p>
                      <p className="text-lg font-bold text-slate-900">${(kpi.current_progress / 1000).toFixed(1)}k</p>
                    </div>
                    <p className="text-sm font-bold text-sky-500">{progress.toFixed(0)}%</p>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sky-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(progress, 100)}%` }} 
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Grid for Milestones and Support */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Milestones */}
        <section className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold text-slate-900">Upcoming Milestones</h3>
          <div className="space-y-4">
            {milestones.length > 0 ? milestones.map((m, idx) => (
              <div key={m.id} className="glass-card p-6 flex items-center justify-between border-slate-100 group hover:border-sky-200 transition-all">
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${idx % 2 === 0 ? 'bg-sky-50 text-sky-500' : 'bg-emerald-50 text-emerald-500'}`}>
                    {idx % 2 === 0 ? <Zap size={24} /> : <Star size={24} />}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{m.title}</h4>
                    <p className="text-slate-500 text-sm mt-1">Ref: {m.kpisync_monthly_kpis?.kpisync_yearly_goals?.title}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-sm font-bold text-sky-600 uppercase tracking-widest">OCT 24</p>
                   <p className="text-[10px] font-bold text-slate-400 mt-1">IN 3 DAYS</p>
                </div>
              </div>
            )) : (
              <div className="glass-card p-10 flex flex-col items-center justify-center border-dashed border-slate-300">
                <p className="text-slate-400 font-bold">No High-Priority Milestones</p>
              </div>
            )}
          </div>
        </section>

        {/* Support & Context */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900">Support & Context</h3>
          <div className="bg-sky-500 rounded-[32px] p-8 text-white shadow-xl shadow-sky-500/20 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 p-10 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
            
            <div className="relative z-10">
              <h4 className="text-2xl font-bold leading-tight">Stuck on a metric?</h4>
              <p className="text-sky-50 text-sm mt-4 leading-relaxed opacity-90">
                If you're facing blockers or need resource adjustments, reach out to your line manager directly for tactical assistance.
              </p>
              
              <button className="mt-8 w-full bg-white text-sky-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-sky-50 transition-all shadow-lg active:scale-95">
                <HelpCircle size={20} />
                REQUEST ASSISTANCE
              </button>
            </div>
          </div>

          <div className="glass-card p-6 mt-6 border-slate-100">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Your Team Comparison</p>
             <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="avatar" />
                     </div>
                   ))}
                   <div className="h-8 w-8 rounded-full border-2 border-white bg-sky-500 flex items-center justify-center text-[10px] font-bold text-white">
                      +8
                   </div>
                </div>
                <p className="text-xs font-medium text-slate-600 ml-2">You are in the <span className="text-emerald-500 font-bold">top 15%</span> of your dept.</p>
             </div>
             <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '85%' }} />
             </div>
          </div>
        </section>
      </div>
    </div>
  )
}
