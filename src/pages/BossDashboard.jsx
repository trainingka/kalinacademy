import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../hooks/useData'
import { Plus, TrendingUp, Users, AlertTriangle, CheckCircle2, ChevronRight, Target, MoreHorizontal, BarChart3, AlertCircle } from 'lucide-react'

export default function BossDashboard() {
  const { yearlyGoals, fetchYearlyGoals, createYearlyGoal, loading, tasks, fetchStuckTasks } = useData()
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({ title: '', target_value: '', priority: 'Medium' })

  useEffect(() => {
    fetchYearlyGoals()
    fetchStuckTasks()
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

  const StatCard = ({ label, value, icon: Icon, color, isAccent = false }) => (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-2xl p-5 relative overflow-hidden group hover:border-sky-500/30 dark:hover:border-slate-700 transition-all shadow-sm dark:shadow-none">
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-[9px] font-black tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase mb-3">{label}</p>
          <h3 className={`text-2xl font-black ${color} tracking-tight`}>{value}</h3>
        </div>
        <div className={`p-2 rounded-xl ${isAccent ? 'bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.4)]' : 'bg-slate-100 dark:bg-slate-800'}`}>
          <Icon size={18} className={isAccent ? 'text-white' : color} />
        </div>
      </div>
      {label === "SYNC STATUS" && (
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-4">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 tracking-widest">ENCRYPTED</span>
           </div>
           <MoreHorizontal size={12} className="text-slate-400 dark:text-slate-600" />
        </div>
      )}
    </div>
  )

  const StaffCard = ({ name, role, progress, status, statusColor, tasks, issues, avatar }) => (
    <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-6 relative group hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all border-b-4 border-b-transparent hover:border-b-sky-500/50 shadow-sm dark:shadow-none">
      <div className="absolute top-5 right-5">
         <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest ${statusColor}`}>
           {status}
         </span>
      </div>
      
      <div className="flex items-center gap-5 mb-8">
        <div className="h-14 w-14 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-lg p-0.5 overflow-hidden">
          <img src={avatar} alt={name} className="w-full h-full object-cover rounded-lg" />
        </div>
        <div>
          <h4 className="text-base font-black text-slate-900 dark:text-white leading-none mb-1.5">{name}</h4>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">{role}</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-end mb-2">
            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">KPI Progress</p>
            <span className="text-[11px] font-black text-slate-900 dark:text-white leading-none">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
             <div 
               className={`h-full rounded-full transition-all duration-1000 ${progress < 50 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]'}`} 
               style={{ width: `${progress}%` }} 
             />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
           <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 border border-slate-100 dark:border-slate-800/40 transition-colors">
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 text-center leading-none">Tasks</p>
              <p className="text-base font-black text-slate-900 dark:text-white text-center tracking-tight leading-none">{tasks}</p>
           </div>
           <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 border border-slate-100 dark:border-slate-800/40 transition-colors">
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 text-center leading-none">Issues</p>
              <p className="text-base font-black text-slate-900 dark:text-white text-center tracking-tight leading-none">
                 <span className={issues > 0 ? 'text-rose-500' : 'text-emerald-500'}>{issues}</span>
              </p>
           </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 relative">
      {/* Eagle-Eye Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800/40 pb-10 transition-colors">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-1 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
             <span className="text-[9px] font-black text-sky-600 dark:text-sky-500 uppercase tracking-[0.3em]">Protocol Overload</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
            Eagle-Eye Overview
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium text-sm leading-relaxed max-w-lg">Real-time enterprise performance tracking and system-level intervention terminal.</p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Avg Efficiency" value="92.4%" icon={TrendingUp} color="text-emerald-500 dark:text-emerald-400" />
        <StatCard label="Active Staff" value="14 / 16" icon={Users} color="text-sky-600 dark:text-sky-400" />
        <StatCard label="Critical Flags" value="02" icon={AlertTriangle} color="text-rose-500" />
        <StatCard label="Sync Status" value="Live Data" icon={CheckCircle2} color="text-slate-900 dark:text-white" isAccent />
      </div>

      {/* Staff Performance Matrix Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Staff Performance Matrix</h3>
            <div className="flex gap-3">
                <span className="px-5 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black rounded-full border border-emerald-500/20 uppercase tracking-widest">On Track</span>
                <span className="px-5 py-1.5 bg-rose-500/10 text-rose-500 text-[9px] font-black rounded-full border border-rose-500/20 uppercase tracking-widest">Stuck</span>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StaffCard 
            name="Sarah Jenkins" role="Senior Account Lead" progress={92} status="88% OK" statusColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            tasks="24/26" issues={0} avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
          />
          <StaffCard 
            name="David Chen" role="Lead Developer" progress={42} status="ACTION REQ." statusColor="bg-rose-500/10 text-rose-500"
            tasks="08/20" issues={3} avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=david"
          />
          <StaffCard 
            name="Elena Rodriguez" role="Ops Manager" progress={76} status="75% OK" statusColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            tasks="18/24" issues={1} avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=elena"
          />
        </div>
      </section>

      {/* Bottom Visualization Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        {/* Operational Velocity (Left) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-8 group relative transition-all hover:bg-slate-50 dark:hover:bg-slate-900/50 shadow-sm dark:shadow-none">
           <div className="flex items-center justify-between mb-10">
              <div>
                 <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Operational Velocity</h3>
                 <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-3 px-1 border-l-2 border-sky-500 ml-1 leading-none">Task completion rate across departments</p>
              </div>
              <div className="p-3 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                 <BarChart3 size={20} />
              </div>
           </div>

           <div className="flex items-end justify-between gap-4 h-60 px-4 relative">
              {/* Reference Grid */}
              <div className="absolute inset-0 flex flex-col justify-between py-2 border-b border-slate-100 dark:border-slate-800/20 pointer-events-none opacity-20">
                 <div className="border-t border-slate-200 dark:border-slate-800" />
                 <div className="border-t border-slate-200 dark:border-slate-800" />
                 <div className="border-t border-slate-200 dark:border-slate-800" />
                 <div className="border-t border-slate-200 dark:border-slate-800" />
              </div>

              {[
                { day: 'MON', val: '40%' },
                { day: 'TUE', val: '65%' },
                { day: 'WED', val: '55%' },
                { day: 'THU', val: '95%', isPeak: true },
                { day: 'FRI', val: '30%' },
                { day: 'SAT', val: '75%' },
                { day: 'SUN', val: '60%' },
              ].map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-4 group/bar relative">
                  {item.isPeak && (
                    <div className="absolute -top-10 px-2.5 py-0.5 bg-sky-500 rounded-md shadow-[0_0_15px_rgba(14,165,233,0.4)] animate-bounce">
                       <span className="text-[9px] font-black text-white uppercase tracking-tighter">Peak</span>
                    </div>
                  )}
                  <div 
                    className={`w-full rounded-t-xl transition-all duration-700 relative overflow-hidden ${
                      item.isPeak ? 'bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.25)]' : 'bg-slate-200 dark:bg-slate-800 group-hover/bar:bg-slate-300 dark:group-hover/bar:bg-slate-700'
                    }`} 
                    style={{ height: item.val }}
                  >
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                  </div>
                  <span className={`text-[9px] font-black ${item.isPeak ? 'text-sky-600 dark:text-sky-500' : 'text-slate-400 dark:text-slate-600'} tracking-widest leading-none`}>{item.day}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Flagged Issues (Right) */}
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-rose-950/20 rounded-[32px] p-8 flex flex-col hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all group shadow-sm dark:shadow-none">
           <div className="flex items-center gap-4 mb-8">
              <div className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl border border-rose-500/20">
                 <AlertTriangle size={20} />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-rose-50 uppercase tracking-tighter leading-none">Flagged Issues</h3>
           </div>

           <div className="space-y-4 flex-1">
              {[
                { id: '01', title: 'API Latency Spike', user: 'David Chen', time: '2h ago' },
                { id: '02', title: 'Resource Shortage', user: 'Sarah Jenkins', time: '5h ago' },
              ].map((issue) => (
                <div key={issue.id} className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/60 group/issue hover:border-rose-500/30 transition-all cursor-pointer">
                  <div className="flex gap-4 items-start">
                    <span className="text-xl font-black text-rose-500/20 dark:text-rose-500/30 group-hover/issue:text-rose-500 transition-colors duration-500">{issue.id}</span>
                    <div>
                       <h4 className="text-sm font-black text-slate-800 dark:text-white group-hover/issue:text-rose-500 transition-colors uppercase tracking-tight leading-none">{issue.title}</h4>
                       <p className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-2 leading-none">{issue.user} • {issue.time}</p>
                    </div>
                  </div>
                </div>
              ))}
           </div>

           <button className="mt-8 w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-rose-600 dark:text-rose-500 py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-rose-600 dark:hover:bg-rose-500 hover:text-white transition-all duration-300">
              View All Issues
           </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowAddGoal(true)}
        className="fixed bottom-10 right-10 h-16 w-16 bg-sky-500 text-white rounded-[22px] flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.5)] active:scale-95 transition-all z-[100] group overflow-hidden"
      >
         <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
         <Plus size={28} className="relative z-10" />
      </button>

      {/* Manifest Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 w-full max-w-xl p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 h-48 w-48 bg-sky-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-10 w-1 bg-sky-500 rounded-full" />
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Manifest Objective</h3>
                </div>
                
                <form onSubmit={handleAddGoal} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Objective Title</label>
                    <input 
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-slate-900 dark:text-white text-sm font-bold placeholder:text-slate-300 dark:placeholder:text-slate-800 focus:border-sky-500 transition-all outline-none" 
                      placeholder="e.g. Q4 Global Scaling Architecture" 
                      value={newGoal.title}
                      onChange={e => setNewGoal({...newGoal, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Target Magnitude ($)</label>
                      <input 
                        type="number" 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-slate-900 dark:text-white text-sm font-bold placeholder:text-slate-300 dark:placeholder:text-slate-800 focus:border-sky-500 outline-none" 
                        placeholder="5,000,000" 
                        value={newGoal.target_value}
                        onChange={e => setNewGoal({...newGoal, target_value: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Priority Protocol</label>
                      <select 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-slate-900 dark:text-white text-sm font-bold focus:border-sky-500 outline-none appearance-none cursor-pointer"
                        value={newGoal.priority}
                        onChange={e => setNewGoal({...newGoal, priority: e.target.value})}
                      >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-8">
                    <button 
                      type="button" 
                      onClick={() => setShowAddGoal(false)}
                      className="flex-1 py-5 text-slate-400 dark:text-slate-600 font-black uppercase text-[9px] tracking-[0.3em] hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      Abort Command
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 bg-sky-500 text-white font-black py-5 rounded-2xl shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-sky-500/50 transition-all uppercase tracking-[0.2em] text-[11px]"
                    >
                      Initiate Cascade
                    </button>
                  </div>
                </form>
              </div>
           </div>
        </div>
      )}
    </div>
  )
}
