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
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-4">{label}</p>
          <h3 className={`text-3xl font-black ${color} tracking-tight`}>{value}</h3>
        </div>
        <div className={`p-2.5 rounded-xl ${isAccent ? 'bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.4)]' : 'bg-slate-800'}`}>
          <Icon size={20} className={isAccent ? 'text-white' : color} />
        </div>
      </div>
      {label === "SYNC STATUS" && (
        <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-4">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400">ENCRYPTED</span>
           </div>
           <MoreHorizontal size={14} className="text-slate-600" />
        </div>
      )}
    </div>
  )

  const StaffCard = ({ name, role, progress, status, statusColor, tasks, issues, avatar }) => (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-3xl p-8 relative group hover:bg-slate-900/60 transition-all border-b-4 border-b-transparent hover:border-b-sky-500/50">
      <div className="absolute top-6 right-6">
         <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${statusColor}`}>
           {status}
         </span>
      </div>
      
      <div className="flex items-center gap-6 mb-10">
        <div className="h-16 w-16 rounded-2xl bg-slate-800 border-2 border-slate-700 shadow-lg p-0.5 overflow-hidden">
          <img src={avatar} alt={name} className="w-full h-full object-cover rounded-xl" />
        </div>
        <div>
          <h4 className="text-lg font-black text-white leading-none mb-2">{name}</h4>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{role}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-end mb-3">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Monthly KPI Progress</p>
            <span className="text-xs font-black text-white">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
             <div 
               className={`h-full rounded-full transition-all duration-1000 ${progress < 50 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]'}`} 
               style={{ width: `${progress}%` }} 
             />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
           <div className="bg-slate-950/40 rounded-2xl p-4 border border-slate-800/40">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 text-center">Tasks</p>
              <p className="text-lg font-black text-white text-center tracking-tight">{tasks}</p>
           </div>
           <div className="bg-slate-950/40 rounded-2xl p-4 border border-slate-800/40">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 text-center">Issues</p>
              <p className="text-lg font-black text-white text-center tracking-tight leading-none">
                 <span className={issues > 0 ? 'text-rose-500' : 'text-emerald-500'}>{issues}</span>
              </p>
           </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 relative">
      {/* Eagle-Eye Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/40 pb-12">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-1 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
             <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.3em]">Protocol Overload</span>
          </div>
          <h2 className="text-5xl font-black tracking-tight text-white leading-none">
            Eagle-Eye <span className="text-sky-500 italic">Overview</span>
          </h2>
          <p className="text-slate-400 mt-6 font-medium text-lg leading-relaxed max-w-xl">Real-time enterprise performance tracking and system-level intervention terminal.</p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Avg Efficiency" value="92.4%" icon={TrendingUp} color="text-emerald-400" />
        <StatCard label="Active Staff" value="14 / 16" icon={Users} color="text-sky-400" />
        <StatCard label="Critical Flags" value="02" icon={AlertTriangle} color="text-rose-500" />
        <StatCard label="Sync Status" value="Live Data" icon={CheckCircle2} color="text-white" isAccent />
      </div>

      {/* Staff Performance Matrix Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-black text-white tracking-tight">Staff Performance Matrix</h3>
            <div className="flex gap-4">
                <span className="px-6 py-2 bg-emerald-400/10 text-emerald-400 text-[10px] font-black rounded-full border border-emerald-400/20 uppercase tracking-widest">On Track</span>
                <span className="px-6 py-2 bg-rose-500/10 text-rose-500 text-[10px] font-black rounded-full border border-rose-500/20 uppercase tracking-widest">Stuck</span>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <StaffCard 
            name="Sarah Jenkins" role="Senior Account Lead" progress={92} status="88% OK" statusColor="bg-emerald-400/10 text-emerald-400"
            tasks="24/26" issues={0} avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
          />
          <StaffCard 
            name="David Chen" role="Lead Developer" progress={42} status="ACTION REQ." statusColor="bg-rose-500/10 text-rose-500"
            tasks="08/20" issues={3} avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=david"
          />
          <StaffCard 
            name="Elena Rodriguez" role="Ops Manager" progress={76} status="75% OK" statusColor="bg-emerald-400/10 text-emerald-400"
            tasks="18/24" issues={1} avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=elena"
          />
        </div>
      </section>

      {/* Bottom Visualization Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Operational Velocity (Left) */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[40px] p-10 group relative transition-all hover:bg-slate-900/50">
           <div className="flex items-center justify-between mb-12">
              <div>
                 <h3 className="text-2xl font-black text-white tracking-tight">Operational Velocity</h3>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 px-1 border-l-2 border-sky-500 ml-1">Task completion rate across all departments</p>
              </div>
              <div className="p-4 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                 <BarChart3 size={24} />
              </div>
           </div>

           <div className="flex items-end justify-between gap-4 h-64 px-4 relative">
              {/* Reference Grid */}
              <div className="absolute inset-0 flex flex-col justify-between py-2 border-b border-slate-800/40 pointer-events-none opacity-20">
                 <div className="border-t border-slate-800" />
                 <div className="border-t border-slate-800" />
                 <div className="border-t border-slate-800" />
                 <div className="border-t border-slate-800" />
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
                <div key={item.day} className="flex-1 flex flex-col items-center gap-6 group/bar relative">
                  {item.isPeak && (
                    <div className="absolute -top-12 px-3 py-1 bg-sky-500 rounded-lg shadow-[0_0_15px_rgba(14,165,233,0.4)] animate-bounce">
                       <span className="text-[10px] font-black text-white uppercase tracking-tighter">Peak</span>
                    </div>
                  )}
                  <div 
                    className={`w-full rounded-t-2xl transition-all duration-700 relative overflow-hidden ${
                      item.isPeak ? 'bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.25)]' : 'bg-slate-800 group-hover/bar:bg-slate-700'
                    }`} 
                    style={{ height: item.val }}
                  >
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                  </div>
                  <span className={`text-[10px] font-black ${item.isPeak ? 'text-sky-500' : 'text-slate-600'} tracking-widest`}>{item.day}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Flagged Issues (Right) */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-rose-950/20 rounded-[40px] p-10 flex flex-col hover:bg-slate-900/50 transition-all group">
           <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl border border-rose-500/20">
                 <AlertTriangle size={24} />
              </div>
              <h3 className="text-2xl font-black text-rose-50 uppercase tracking-tighter">Flagged Issues</h3>
           </div>

           <div className="space-y-6 flex-1">
              {[
                { id: '01', title: 'API Latency Spike', user: 'David Chen', time: '2h ago' },
                { id: '02', title: 'Resource Shortage', user: 'Sarah Jenkins', time: '5h ago' },
              ].map((issue) => (
                <div key={issue.id} className="p-6 bg-slate-950/40 rounded-3xl border border-slate-800/60 group/issue hover:border-rose-500/30 transition-all cursor-pointer">
                  <div className="flex gap-6 items-start">
                    <span className="text-2xl font-black text-rose-500/30 group-hover/issue:text-rose-500 transition-colors duration-500">{issue.id}</span>
                    <div>
                       <h4 className="text-base font-black text-white group-hover/issue:text-rose-500 transition-colors uppercase tracking-tight">{issue.title}</h4>
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">{issue.user} • {issue.time}</p>
                    </div>
                  </div>
                </div>
              ))}
           </div>

           <button className="mt-8 w-full bg-slate-950/60 border border-slate-800/80 text-rose-500 py-6 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-rose-500 hover:text-white transition-all duration-300">
              View All Issues
           </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowAddGoal(true)}
        className="fixed bottom-12 right-12 h-20 w-20 bg-sky-500 text-white rounded-[28px] flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.5)] active:scale-95 transition-all z-[100] group overflow-hidden"
      >
         <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
         <Plus size={36} className="relative z-10" />
      </button>

      {/* Manifest Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-slate-900 border border-slate-800/60 w-full max-w-2xl p-12 rounded-[48px] shadow-2xl relative overflow-hidden">
              {/* Abstract decoration */}
              <div className="absolute -top-24 -right-24 h-48 w-48 bg-sky-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-12 w-1 h-sky-500 rounded-full" />
                  <h3 className="text-4xl font-black text-white tracking-tight">Manifest New Objective</h3>
                </div>
                
                <form onSubmit={handleAddGoal} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Objective Title</label>
                    <input 
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white text-lg font-bold placeholder:text-slate-800 focus:border-sky-500 transition-all outline-none" 
                      placeholder="e.g. Q4 Global Scaling Architecture" 
                      value={newGoal.title}
                      onChange={e => setNewGoal({...newGoal, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Target Magnitude ($)</label>
                      <input 
                        type="number" 
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white text-lg font-bold placeholder:text-slate-800 focus:border-sky-500 outline-none" 
                        placeholder="5,000,000" 
                        value={newGoal.target_value}
                        onChange={e => setNewGoal({...newGoal, target_value: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Priority Protocol</label>
                      <select 
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white text-lg font-bold focus:border-sky-500 outline-none appearance-none"
                        value={newGoal.priority}
                        onChange={e => setNewGoal({...newGoal, priority: e.target.value})}
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-6 pt-10">
                    <button 
                      type="button" 
                      onClick={() => setShowAddGoal(false)}
                      className="flex-1 py-6 text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] hover:text-white transition-colors"
                    >
                      Abort Command
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 bg-sky-500 text-white font-black py-6 rounded-3xl shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-sky-500/50 transition-all uppercase tracking-[0.2em] text-[12px]"
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
