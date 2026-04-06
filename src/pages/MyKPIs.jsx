import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useData } from '../hooks/useData'
import { Target, Zap, Rocket, Star, GraduationCap, HelpCircle, ArrowRight, TrendingUp, CheckCircle2, Clock } from 'lucide-react'

export default function MyKPIs() {
  const { user } = useAuth()
  const { monthlyKpis, fetchMonthlyKpis, tasks, fetchTasks, loading } = useData()

  useEffect(() => {
    if (user) {
      // Fetch all KPIs for the organization map
      fetchMonthlyKpis()
      // Fetch specifically tasks assigned to the user
      fetchTasks(user.id)
    }
  }, [user])

  // Get first 3 KPIs for the monthly map
  const topKpis = monthlyKpis.slice(0, 3)

  // Filter tasks to show active "Milestones"
  const milestones = tasks
    .filter(t => t.status !== 'completed')
    .slice(0, 3)

  const KpiCard = ({ kpi, icon: Icon, colorClass }) => {
    const progress = (kpi.current_progress / kpi.target_value) * 100
    return (
      <div className="glass-card p-8 border-slate-200 shadow-soft transition-all hover:scale-[1.02] bg-white group">
        <div className="flex items-start justify-between mb-8">
          <div className={`p-4 rounded-2xl ${colorClass} bg-opacity-10`}>
            <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Target Value</p>
            <p className="text-2xl font-black text-slate-900 leading-none">
              ${(kpi.target_value / 1000).toFixed(1)}k
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">Current Progress</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-extrabold text-slate-900">${(kpi.current_progress / 1000).toFixed(1)}k</p>
                <span className="text-[10px] text-slate-400">/ ${kpi.target_value.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-sm font-black ${progress >= 90 ? 'text-emerald-500' : progress >= 50 ? 'text-sky-500' : 'text-amber-500'}`}>
                {progress.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${progress >= 90 ? 'bg-emerald-500' : progress >= 50 ? 'bg-sky-500' : 'bg-amber-500'}`}
              style={{ width: `${Math.min(progress, 100)}%` }} 
            />
          </div>
          <div className="flex justify-between items-center pt-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.kpisync_yearly_goals?.title || 'General Performance'}</p>
            <TrendingUp size={12} className="text-slate-300" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
             <span className="h-2 w-2 bg-sky-500 rounded-full animate-pulse" />
             <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em]">Live Operational Cycle</p>
          </div>
          <h2 className="text-5xl font-black tracking-tight text-slate-900">
            My <span className="text-sky-500 italic">KPIs</span>
          </h2>
          <p className="text-slate-500 mt-4 font-medium text-lg">Real-time performance distribution for the current cycle</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">On Track</span>
           </div>
           <div className="px-6 py-3 bg-slate-100 border border-slate-200 rounded-2xl flex items-center gap-3">
              <Clock size={18} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Next Review: 4d</span>
           </div>
        </div>
      </div>

      {/* Monthly KPI Map Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Monthly KPI Map</h3>
            <button className="text-xs font-bold text-sky-600 hover:text-sky-700 uppercase tracking-widest flex items-center gap-2 group transition-all">
               Deep Dive Analysis <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topKpis.length > 0 ? (
            <>
              {topKpis[0] && <KpiCard kpi={topKpis[0]} icon={Rocket} colorClass="bg-sky-500" />}
              {topKpis[1] && <KpiCard kpi={topKpis[1]} icon={Zap} colorClass="bg-emerald-500" />}
              {topKpis[2] && <KpiCard kpi={topKpis[2]} icon={Target} colorClass="bg-red-500" />}
            </>
          ) : (
            [1, 2, 3].map(i => (
              <div key={i} className="glass-card h-64 bg-slate-50 animate-pulse border-slate-100 border-dashed" />
            ))
          )}
        </div>
      </section>

      {/* Grid for Milestones and Support */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
        {/* Upcoming Milestones */}
        <section className="lg:col-span-2 space-y-8">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Upcoming Milestones</h3>
          <div className="space-y-4">
            {milestones.length > 0 ? milestones.map((m, idx) => (
              <div key={m.id} className="glass-card p-6 flex items-center justify-between border-slate-100 group hover:border-sky-300 transition-all hover:bg-white hover:shadow-xl hover:shadow-sky-500/5">
                <div className="flex items-center gap-8">
                  <div className={`p-5 rounded-[22px] transition-colors ${idx % 3 === 0 ? 'bg-sky-50 text-sky-500' : idx % 3 === 1 ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                    {idx % 3 === 0 ? <Rocket size={24} /> : idx % 3 === 1 ? <Star size={24} /> : <GraduationCap size={24} />}
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors uppercase tracking-tight">{m.title}</h4>
                    <p className="text-slate-500 text-sm font-medium">Ref: {m.kpisync_monthly_kpis?.kpisync_yearly_goals?.title || 'System Operational'}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                   <p className="text-sm font-black text-sky-600 uppercase tracking-widest mb-1">OCT 24</p>
                   <div className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">IN 3 DAYS</p>
                   </div>
                </div>
              </div>
            )) : (
              <div className="glass-card p-20 flex flex-col items-center justify-center border-dashed border-slate-300 bg-transparent">
                <Target size={48} className="text-slate-200 mb-4" />
                <p className="text-slate-400 font-extrabold text-lg">No High-Priority Milestones</p>
                <p className="text-slate-300 text-sm mt-1">Operational stream is clear for the next 48h.</p>
              </div>
            )}
          </div>
        </section>

        {/* Support & Context Area */}
        <section className="space-y-8">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Support & Context</h3>
          
          <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-[40px] p-10 text-white shadow-2xl shadow-sky-500/30 relative overflow-hidden group">
            {/* Abstract Background Decoration */}
            <div className="absolute -top-12 -right-12 p-20 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
            <div className="absolute -bottom-12 -left-12 p-20 bg-black/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="h-14 w-14 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-8">
                 <HelpCircle size={32} className="text-white" />
              </div>
              <h4 className="text-3xl font-black leading-[1.1] mb-6">Stuck on a <span className="text-sky-200 italic">metric?</span></h4>
              <p className="text-sky-50 text-base mt-4 leading-relaxed font-medium opacity-90">
                If you're facing functional blockers or need tactical adjustments, reach out to your line manager for immediate assistance.
              </p>
              
              <button className="mt-10 w-full bg-white text-sky-600 font-black py-5 rounded-3xl flex items-center justify-center gap-3 hover:bg-sky-50 transition-all shadow-xl active:scale-95 uppercase tracking-[0.1em] text-sm">
                <Zap size={20} fill="currentColor" />
                REQUEST ASSISTANCE
              </button>
            </div>
          </div>

          <div className="glass-card p-8 bg-white border-slate-100 mt-4 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 bg-emerald-50 text-emerald-500 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                <Star size={16} fill="currentColor" />
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Benchmarking Context</p>
             <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-4">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="h-10 w-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 543}`} alt="avatar" />
                     </div>
                   ))}
                   <div className="h-10 w-10 rounded-full border-4 border-white bg-sky-500 flex items-center justify-center text-xs font-black text-white shadow-sm">
                      +12
                   </div>
                </div>
                <div>
                   <p className="text-xs font-bold text-slate-600">You are in the <span className="text-emerald-500 font-extrabold">top 15%</span></p>
                   <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-0.5">Sales Dept. Tier A</p>
                </div>
             </div>
             <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]" style={{ width: '85%' }} />
             </div>
          </div>
        </section>
      </div>
    </div>
  )
}
