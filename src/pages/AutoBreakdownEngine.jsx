import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useData } from '../hooks/useData'
import { Target, Zap, ChevronLeft, RefreshCcw, LayoutGrid, CheckCircle2, Sparkles, TrendingUp, BarChart4 } from 'lucide-react'

export default function AutoBreakdownEngine() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { yearlyGoals, fetchYearlyGoals, fetchMonthlyKpis, monthlyKpis, loading } = useData()
  const [goal, setGoal] = useState(null)
  const [initialFetchDone, setInitialFetchDone] = useState(false)

  useEffect(() => {
    // Initial fetch if store is empty
    if (yearlyGoals.length === 0 && !initialFetchDone) {
      fetchYearlyGoals().then(() => setInitialFetchDone(true))
    } else {
      setInitialFetchDone(true)
    }
  }, [yearlyGoals, fetchYearlyGoals, initialFetchDone])

  useEffect(() => {
    if (initialFetchDone) {
      const currentGoal = yearlyGoals.find(g => g.id === id)
      if (currentGoal) {
        setGoal(currentGoal)
        fetchMonthlyKpis(id)
      } else {
        // Fallback to Mockup Goal if specific ID is not found (for demo purposes)
        setGoal({
          id: 'mock-id',
          title: 'Auto-Breakdown Simulation',
          target_value: 1200000,
          description: 'Historical simulation based on FY23 baseline.'
        })
      }
    }
  }, [id, yearlyGoals, initialFetchDone, fetchMonthlyKpis])

  // Only show the spinner during the very first global fetch
  if (loading && !initialFetchDone && !goal) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
    </div>
  )

  // Use mockup goal if still null
  const activeGoal = goal || {
    id: 'mock-id',
    title: 'Auto-Breakdown Simulation',
    target_value: 1200000,
    description: 'Historical simulation based on FY23 baseline.'
  }

  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-800/40 pb-10">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
             <button 
                onClick={() => navigate(-1)} 
                className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-all text-slate-500 hover:text-white"
             >
                <ChevronLeft size={16} />
             </button>
             <span className="text-[9px] font-black text-sky-500 uppercase tracking-[0.3em] px-2">Engine Interface V2.4</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white leading-none uppercase">
            Auto-Breakdown Engine
          </h2>
          <p className="text-slate-500 mt-4 font-medium text-base leading-relaxed max-w-2xl">
            Transform monolithic yearly objectives into actionable monthly milestones using our proprietary distribution algorithm.
          </p>
        </div>

        <button className="bg-sky-500 text-white font-black py-4 px-8 rounded-2xl flex items-center gap-3 shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:shadow-sky-500/60 transition-all uppercase tracking-[0.2em] text-[10px] group">
          <Zap size={18} className="fill-white group-hover:scale-110 transition-transform" />
          Apply Breakdown
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Controls) */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[32px] p-6 shadow-xl">
             <p className="text-[9px] font-black tracking-[0.2em] text-slate-500 uppercase mb-6 ml-2 leading-none">Target Metric</p>
             <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-6 flex items-center justify-center relative group overflow-hidden">
                <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-3xl font-black text-sky-400 tracking-tighter drop-shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                  $ {activeGoal.target_value.toLocaleString()}
                </h3>
             </div>

             <div className="mt-10 space-y-6">
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Distribution Logic</label>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-slate-700 transition-all cursor-pointer">
                    <span className="text-xs font-black text-white">Historical Seasonal Trend</span>
                    <LayoutGrid size={16} className="text-slate-600" />
                  </div>
                </div>

                {/* AI Recommendation Box */}
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 relative group overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all">
                      <Sparkles size={40} className="text-indigo-400" />
                   </div>
                   <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                         <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Sparkles size={16} className="text-white" />
                         </div>
                         <div>
                            <h5 className="text-xs font-black text-indigo-100 uppercase tracking-tight leading-none">AI Recommendation</h5>
                            <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Confidence: 94%</p>
                         </div>
                      </div>
                      <p className="text-indigo-100/60 text-[10px] font-medium leading-relaxed">
                        Based on FY23 data, we recommend weighting Q4 at 35% to account for market volatility.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column (Monthly KPI Map) */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[32px] p-8 shadow-xl">
           <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-xl font-black text-white tracking-tight">Monthly KPI Map</h3>
              <div className="flex gap-3">
                 <button className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 hover:text-sky-400 hover:border-sky-500/40 transition-all">
                    <RefreshCcw size={16} />
                 </button>
                 <button className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 hover:text-sky-400 hover:border-sky-500/40 transition-all">
                    <LayoutGrid size={16} />
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {monthNames.map((month, idx) => (
                <div key={month} className="bg-slate-950/60 border border-slate-800/60 rounded-2xl p-5 transition-all group hover:bg-slate-950 hover:border-sky-500/40 relative overflow-hidden">
                   <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest leading-none">{month}</span>
                      <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/20 leading-none">8.3%</span>
                   </div>
                   <p className="text-lg font-black text-white group-hover:text-sky-400 transition-colors tracking-tight leading-none">
                     $ {(activeGoal.target_value / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                   </p>
                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500/20 overflow-hidden">
                      <div className="h-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)] w-full translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                   </div>
                </div>
              ))}
           </div>

           {/* Summary Metrics (Bottom Stats) */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {[
                { label: 'TOTAL ALLOCATED', value: `$ ${activeGoal.target_value.toLocaleString()}`, color: 'text-white' },
                { label: 'REMAINING', value: '$ 0', color: 'text-emerald-400' },
                { label: 'PEAK MONTH', value: 'December', color: 'text-white' },
                { label: 'AVG. GROWTH', value: '+4.2%', color: 'text-sky-400' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60 text-center hover:bg-slate-950 transition-all">
                  <p className="text-[9px] font-black text-slate-600 mb-1.5 uppercase tracking-widest leading-none">{item.label}</p>
                  <p className={`text-xs font-black ${item.color} tracking-tight leading-none`}>{item.value}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}
