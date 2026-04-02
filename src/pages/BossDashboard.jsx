import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../hooks/useData'
import { Plus, TrendingUp, Users, AlertTriangle, CheckCircle2, ChevronRight, Target } from 'lucide-react'

export default function BossDashboard() {
  const { yearlyGoals, fetchYearlyGoals, createYearlyGoal, loading } = useData()
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({ title: '', target_value: '', priority: 'Medium' })

  useEffect(() => {
    fetchYearlyGoals()
  }, [])

  const handleAddGoal = async (e) => {
    e.preventDefault()
    try {
      await createYearlyGoal({
        ...newGoal,
        target_value: parseFloat(newGoal.target_value)
      })
      setShowAddGoal(false)
      setNewGoal({ title: '', target_value: '', priority: 'Medium' })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="space-y-10">
      {/* Eagle-Eye Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">
            Eagle-Eye <span className="text-sky-500 italic">Overview</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Real-time enterprise performance tracking</p>
        </div>
        
        <button 
          onClick={() => setShowAddGoal(true)}
          className="btn-primary flex items-center gap-2 px-6 py-3"
        >
          <Plus size={20} />
          <span>NEW YEARLY GOAL</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'AVG EFFICIENCY', value: '92.4%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'ACTIVE STAFF', value: '14 / 16', icon: Users, color: 'text-sky-500', bg: 'bg-sky-50' },
          { label: 'CRITICAL FLAGS', value: '02', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'SYNC STATUS', value: 'Live Data', icon: CheckCircle2, color: 'text-slate-500', bg: 'bg-slate-50' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-card p-6 flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{stat.label}</p>
              <h3 className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon size={20} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Yearly Goals Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
             Macro Business Objectives
          </h3>
          <button className="text-sky-600 text-sm font-semibold hover:underline flex items-center gap-1">
            VIEW ANALYTICS <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yearlyGoals.map((goal) => (
            <div key={goal.id} className="glass-card overflow-hidden transition-all hover:shadow-lg group">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                      goal.priority === 'High' ? 'bg-red-50 text-red-600' : 
                      goal.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {goal.priority} PRIORITY
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-3 group-hover:text-sky-600 transition-colors">{goal.title}</h4>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-sky-50 transition-colors">
                    <Target size={20} className="text-slate-400 group-hover:text-primary" />
                  </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Current Variance</p>
                        <p className="text-xl font-bold text-slate-900">$1.2M / $5.0M</p>
                      </div>
                      <div className="text-right">
                         <span className="text-sm font-bold text-emerald-500">24%</span>
                      </div>
                   </div>
                   
                   <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full transition-all duration-1000" style={{ width: '24%' }} />
                   </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium">12 Monthly KPIs Active</p>
                <Link to={`/goals/${goal.id}/breakdown`} className="text-sky-600 text-xs font-bold hover:underline">MANAGE BREAKDOWN</Link>
              </div>
            </div>
          ))}

          {yearlyGoals.length === 0 && !loading && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center glass-card border-dashed bg-transparent border-slate-300">
               <div className="p-4 bg-slate-100 rounded-full mb-4">
                  <Plus size={32} className="text-slate-400" />
               </div>
               <h4 className="text-slate-900 font-bold text-lg">No Macro Goals Found</h4>
               <p className="text-slate-500 text-sm mt-1">Initiate your first yearly objective to begin the cascade.</p>
               <button 
                  onClick={() => setShowAddGoal(true)}
                  className="mt-6 text-sky-600 font-bold border-b-2 border-sky-600 pb-1"
               >
                 LAUNCH ENGINE
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Goal Modal (Simple for now) */}
      {showAddGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
           <div className="glass-card w-full max-w-lg p-8 shadow-soft">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Manifest New Yearly Objective</h3>
              <form onSubmit={handleAddGoal} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Objective Title</label>
                  <input 
                    className="input-field py-4" 
                    placeholder="e.g. Q4 Market Domination" 
                    value={newGoal.title}
                    onChange={e => setNewGoal({...newGoal, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Target Value</label>
                    <input 
                      type="number" 
                      className="input-field" 
                      placeholder="5,000,000" 
                      value={newGoal.target_value}
                      onChange={e => setNewGoal({...newGoal, target_value: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Priority Status</label>
                    <select 
                      className="input-field"
                      value={newGoal.priority}
                      onChange={e => setNewGoal({...newGoal, priority: e.target.value})}
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowAddGoal(false)}
                    className="flex-1 py-4 text-slate-500 font-bold hover:text-slate-700"
                  >
                    ABORT
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 btn-primary py-4"
                  >
                    INITIALIZE GOAL
                  </button>
                </div>
              </form>
           </div>
        </div>
      )}
    </div>
  )
}
