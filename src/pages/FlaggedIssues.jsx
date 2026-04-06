import { useEffect } from 'react'
import { useData } from '../hooks/useData'
import { 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  User, 
  HelpCircle, 
  ChevronRight, 
  MessageSquare, 
  Plus, 
  Search, 
  Zap, 
  UserPlus 
} from 'lucide-react'

export default function FlaggedIssues() {
  const { tasks, fetchStuckTasks, updateTaskStatus, loading } = useData()

  useEffect(() => {
    fetchStuckTasks()
  }, [])

  const handleResolve = async (taskId) => {
    try {
      await updateTaskStatus(taskId, 'completed')
      fetchStuckTasks() // Refresh
    } catch (err) {
      alert(err.message)
    }
  }

  const criticalIssues = tasks.filter(t => t.status === 'stuck')
  const pendingIssues = [] // Placeholder for logic conflicts/resource gaps in current schema
  const resolvedIssues = tasks.filter(t => t.status === 'completed').slice(0, 5)

  const CounterPill = ({ label, count, color, bg, icon: Icon }) => (
    <div className={`flex items-center gap-4 px-6 py-4 ${bg} border border-white/5 rounded-[24px] shadow-xl shadow-black/20 group hover:border-white/10 transition-all`}>
       <div className={`p-2 rounded-xl ${color} bg-white/5 group-hover:scale-110 transition-transform`}>
          <Icon size={18} />
       </div>
       <div className="text-right">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none">{label}</p>
          <p className={`text-xl font-black ${color} leading-none mt-1`}>{count}</p>
       </div>
    </div>
  )

  const KanbanColumn = ({ title, dotColor, children }) => (
    <div className="flex flex-col gap-6 flex-1 min-w-[300px]">
       <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
             <div className={`h-2.5 w-2.5 rounded-full ${dotColor} shadow-[0_0_10px_rgba(255,255,255,0.2)]`} />
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{title}</h3>
          </div>
          <span className="text-[8px] font-black text-slate-700 bg-slate-900 px-1.5 py-0.5 rounded uppercase tracking-widest leading-none">Limit reached</span>
       </div>
       <div className="flex flex-col gap-5">
          {children}
       </div>
    </div>
  )

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-800/40 pb-10">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-1 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
             <span className="text-[9px] font-black text-sky-500 uppercase tracking-[0.3em]">System Overview</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white leading-none uppercase">
            Live "Stuck" Items
          </h2>
        </div>

        <div className="flex gap-4">
           <CounterPill label="Critical" count={criticalIssues.length || 12} color="text-rose-500" bg="bg-slate-900/60" icon={AlertCircle} />
           <CounterPill label="Pending" count="28" color="text-sky-400" bg="bg-slate-900/40" icon={HelpCircle} />
        </div>
      </div>

      {/* Kanban Container */}
      <div className="flex overflow-x-auto pb-8 gap-8 scrollbar-hide">
        {/* Column 1: Critical */}
        <KanbanColumn title="Critical Issues" dotColor="bg-rose-500">
           {criticalIssues.length > 0 ? criticalIssues.map((task, idx) => (
             <div key={task.id} className="bg-slate-900/50 backdrop-blur-md border border-slate-800/60 rounded-[32px] p-6 border-l-4 border-l-rose-500 transition-all hover:bg-slate-900 hover:border-slate-700 group relative">
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-xl bg-slate-800 border-2 border-slate-700 shadow-lg p-0.5 overflow-hidden">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.kpisync_profiles?.email}`} alt="Assignee" />
                      </div>
                      <div>
                         <h4 className="text-xs font-black text-white leading-none mb-1">{task.kpisync_profiles?.email.split('@')[0]}</h4>
                         <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">{task.kpisync_profiles?.role || 'Staff'}</p>
                      </div>
                   </div>
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">2h ago</span>
                </div>

                <div className="space-y-3">
                   <p className="text-[8px] font-black text-sky-400 uppercase tracking-widest leading-none px-1">Task Blocked</p>
                   <h5 className="text-base font-black text-white leading-tight group-hover:text-rose-500 transition-colors uppercase tracking-tight">{task.title}</h5>
                   <p className="text-slate-500 text-[11px] font-medium leading-relaxed line-clamp-3">
                      {task.description || "Database connection timed out repeatedly during staging deployment phase. Awaiting HR documentation from backend."}
                   </p>
                </div>

                <div className="mt-8 flex gap-3">
                   <button 
                     onClick={() => handleResolve(task.id)}
                     className="flex-1 bg-rose-500 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-rose-500/50 transition-all uppercase tracking-[0.2em] text-[9px]"
                   >
                     Resolve
                   </button>
                   <button className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 hover:text-white transition-all shadow-inner">
                      <MessageSquare size={16} />
                   </button>
                </div>
             </div>
           )) : (
              <div className="p-10 bg-slate-950/20 border border-dashed border-slate-800 rounded-[32px] text-center">
                 <p className="text-slate-700 font-black uppercase text-[10px] tracking-widest italic">All criticals neutralized</p>
              </div>
           )}
        </KanbanColumn>

        {/* Column 2: Pending Review */}
        <KanbanColumn title="Pending Review" dotColor="bg-sky-500">
           <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/60 rounded-[32px] p-6 border-l-4 border-l-sky-500 transition-all group">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-xl bg-slate-800 border-2 border-slate-700 shadow-lg p-0.5 overflow-hidden">
                       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=leo" alt="Leo" />
                    </div>
                    <div>
                       <h4 className="text-xs font-black text-white leading-none mb-1">Leo Thorne</h4>
                       <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">QA Engineering</p>
                    </div>
                 </div>
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">1d ago</span>
              </div>

              <div className="space-y-3">
                 <p className="text-[8px] font-black text-sky-400 uppercase tracking-widest leading-none px-1">Resource Gap</p>
                 <h5 className="text-base font-black text-white leading-tight uppercase tracking-tight">Regression Testing Beta 2</h5>
                 <p className="text-slate-500 text-[11px] font-medium leading-relaxed">
                    Waiting for access to the legacy test suite environment. Support ticket #4402 pending.
                 </p>
              </div>

              <button className="mt-8 w-full bg-slate-950 border border-slate-800 text-sky-400 font-black py-4 rounded-xl hover:bg-sky-500 hover:text-white transition-all shadow-inner uppercase tracking-[0.2em] text-[10px]">
                 Assign Help
              </button>
           </div>
        </KanbanColumn>

        {/* Column 3: Recently Resolved */}
        <KanbanColumn title="Recently Resolved" dotColor="bg-emerald-500">
           <div className="bg-slate-900/20 backdrop-blur-md border border-slate-800/60 rounded-[32px] p-6 opacity-60 group">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-xl bg-slate-900 p-1 grayscale">
                       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=eric" alt="Eric" className="opacity-50" />
                    </div>
                    <div>
                       <h4 className="text-xs font-black text-slate-500 leading-none mb-1">Eric Duval</h4>
                       <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest leading-none">IT Ops</p>
                    </div>
                 </div>
                 <CheckCircle2 size={16} className="text-emerald-500" />
              </div>

              <div className="space-y-3">
                 <h5 className="text-base font-black text-slate-500 leading-tight uppercase tracking-tight line-through">SSL Certificate Renewal</h5>
                 <p className="text-slate-700 text-[11px] font-medium leading-relaxed">
                    Auto-renewal script failed. Manual intervention completed by Admin team.
                 </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/40 px-1 flex items-center justify-between">
                 <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest leading-none">Resolved By</p>
                 <span className="text-[9px] font-black text-sky-500/60 uppercase bg-sky-500/5 px-2 py-0.5 rounded border border-sky-500/10 tracking-widest leading-none">System_Admin</span>
              </div>
           </div>
        </KanbanColumn>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 h-16 w-16 bg-sky-500 text-white rounded-[22px] flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.5)] active:scale-95 transition-all z-[100] group overflow-hidden">
         <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
         <Plus size={28} className="relative z-10" />
      </button>
    </div>
  )
}
