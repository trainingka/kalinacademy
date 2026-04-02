import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useData } from '../hooks/useData'
import { Target, Zap, ChevronLeft, RefreshCcw, LayoutGrid, CheckCircle2 } from 'lucide-react'

export default function AutoBreakdownEngine() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { yearlyGoals, fetchMonthlyKpis, monthlyKpis, loading } = useData()
  const [goal, setGoal] = useState(null)

  useEffect(() => {
    const currentGoal = yearlyGoals.find(g => g.id === id)
    if (currentGoal) {
      setGoal(currentGoal)
      fetchMonthlyKpis(id)
    } else {
      // Fetch if not present
      // For MVP we assume it's in the store
    }
  }, [id, yearlyGoals])

  if (!goal) return <div>Loading Engine Interface...</div>

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 rounded-full transition-all">
          <ChevronLeft />
        </button>
        <div>
          <p className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.2em] mb-1">Engine Interface V2.4</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Auto-Breakdown <span className="text-sky-500 italic">Engine</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card p-8 border-slate-200">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Target Metric</h4>
            <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
               <div className="p-3 bg-sky-500 text-white rounded-xl shadow-soft">
                  <Target size={24} />
               </div>
               <div>
                  <p className="text-xs text-slate-500 font-medium font-inter">Consolidated Annual Goal</p>
                  <p className="text-3xl font-bold text-slate-900">${goal.target_value.toLocaleString()}</p>
               </div>
            </div>

            <div className="mt-10">
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Distribution Logic</label>
               <select className="input-field py-4 font-bold text-slate-800">
                  <option>Even-Split (MVP Default)</option>
                  <option>Historical Seasonal Trend</option>
                  <option>AI Recommendation (Elite Only)</option>
               </select>
            </div>

            <div className="mt-8 p-6 bg-sky-50/50 border border-sky-100 rounded-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all">
                  <Zap size={80} />
               </div>
               <div className="relative z-10">
                  <h5 className="flex items-center gap-2 text-sky-700 font-bold text-sm uppercase italic">
                    <Zap size={16} /> Engine Analysis
                  </h5>
                  <p className="text-slate-600 text-xs mt-3 leading-relaxed">
                    The engine has calculated a target distribution of <strong>${(goal.target_value / 12).toLocaleString()}</strong> per calendar month.
                  </p>
               </div>
            </div>
          </div>
          
          <button className="w-full btn-primary py-5 flex items-center justify-center gap-4 text-lg animate-pulse hover:animate-none">
             <Zap size={24} fill="currentColor" />
             APPLY BREAKDOWN
          </button>
        </div>

        <div className="md:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Monthly KPI Map</h3>
              <div className="flex gap-2">
                 <button className="p-2 border rounded-lg text-slate-400 hover:text-sky-500 transition-all"><RefreshCcw size={16} /></button>
                 <button className="p-2 border rounded-lg text-slate-400 hover:text-sky-500 transition-all"><LayoutGrid size={16} /></button>
              </div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {monthlyKpis.map((kpi, idx) => (
                <div key={kpi.id} className="glass-card p-5 border-slate-100 transition-all hover:scale-105 hover:border-sky-300">
                   <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-slate-900 uppercase">
                        {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][idx]}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-500">8.3%</span>
                   </div>
                   <p className="text-xl font-extrabold text-slate-900">${(kpi.target_value).toLocaleString()}</p>
                   <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500" style={{ width: '0%' }} />
                   </div>
                </div>
              ))}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
              {[
                { label: 'TOTAL ALLOCATED', value: `$${goal.target_value.toLocaleString()}`, color: 'text-slate-900' },
                { label: 'REMAINING', value: '$0', color: 'text-emerald-500' },
                { label: 'PEAK MONTH', value: 'Consistent', color: 'text-slate-900' },
                { label: 'AVG. GROWTH', value: '+0.0%', color: 'text-sky-500' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white border p-4 rounded-2xl text-center shadow-soft">
                  <p className="text-[8px] font-extrabold text-slate-400 mb-1">{item.label}</p>
                  <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}
