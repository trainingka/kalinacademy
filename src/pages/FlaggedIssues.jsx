import { useEffect } from 'react'
import { useData } from '../hooks/useData'
import { AlertCircle, Clock, CheckCircle2, User, HelpCircle, ChevronRight, MessageSquare } from 'lucide-react'

export default function FlaggedIssues() {
  const { tasks, fetchStuckTasks, updateTaskStatus, loading } = useData()

  useEffect(() => {
    fetchStuckTasks()
  }, [])

  const handleResolve = async (taskId) => {
    try {
      await updateTaskStatus(taskId, 'completed')
    } catch (err) {
      alert(err.message)
    }
  }

  const criticalCount = tasks.length
  const pendingCount = tasks.filter(t => t.status === 'stuck').length // For now, stuck is our pending review

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Flagged Issues <span className="text-sky-500 italic">Board</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium tracking-wide">Enterprise Monitoring & Tactical Intervention</p>
        </div>
        
        <div className="flex gap-4">
           <div className="glass-card px-6 py-4 flex flex-col items-center justify-center border-red-100 bg-red-50/50">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Critical (Stuck)</span>
              <span className="text-2xl font-black text-red-600">{criticalCount}</span>
           </div>
           <div className="glass-card px-6 py-4 flex flex-col items-center justify-center border-sky-100 bg-sky-50/50">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-1">Pending Review</span>
              <span className="text-2xl font-black text-sky-600">{pendingCount}</span>
           </div>
        </div>
      </div>

      {/* Main Board Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
           <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
             Live "Stuck" Items 
             <span className="h-3 w-3 bg-red-500 rounded-full animate-ping" />
           </h3>
           <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sort by Latest</span>
              <div className="h-4 w-px bg-slate-200 mx-2" />
              <button className="p-2 border rounded-lg text-slate-400 hover:text-sky-500 transition-colors"><MessageSquare size={16} /></button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="glass-card overflow-hidden border-slate-200 group hover:shadow-xl transition-all border-l-4 border-l-red-500">
              <div className="p-8">
                {/* Assignee Identity */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-12 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.kpisync_profiles?.email}`} alt="Assignee" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 truncate max-w-[150px]">{task.kpisync_profiles?.email.split('@')[0]}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{task.kpisync_profiles?.role || 'Staff'}</p>
                  </div>
                  <div className="ml-auto text-right">
                     <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Clock size={10} /> 2h ago
                     </p>
                  </div>
                </div>

                {/* Blocker Metadata */}
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50/50 inline-block px-2 py-0.5 rounded border border-red-100">Task Blocked</p>
                    <h5 className="text-xl font-extrabold text-slate-900 mt-3 group-hover:text-red-600 transition-colors">{task.title}</h5>
                  </div>
                  
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                    {task.description || "Database connection timed out repeatedly during staging deployment phase. Awaiting HR documentation from backend."}
                  </p>
                </div>

                {/* Resolution Action */}
                <div className="mt-10 flex gap-3">
                  <button 
                    onClick={() => handleResolve(task.id)}
                    className="flex-1 bg-red-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 hover:bg-red-600 active:scale-95 transition-all"
                  >
                    <CheckCircle2 size={20} />
                    RESOLVE
                  </button>
                  <button className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all">
                     <User size={20} />
                  </button>
                </div>
              </div>

              {/* Sub-context footer */}
              <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                 <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 italic">
                    Ref: {task.kpisync_monthly_kpis?.kpisync_yearly_goals?.title || 'System Operational'}
                 </p>
                 <HelpCircle size={14} className="text-slate-300" />
              </div>
            </div>
          ))}

          {tasks.length === 0 && !loading && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center glass-card border-dashed bg-transparent border-slate-300">
               <div className="p-6 bg-emerald-50 text-emerald-500 rounded-full mb-6">
                  <CheckCircle2 size={40} />
               </div>
               <h4 className="text-slate-900 font-extrabold text-2xl">Board is "Clear"</h4>
               <p className="text-slate-500 mt-2 font-medium">All critical bottlenecks have been neutralized.</p>
               <button onClick={() => fetchStuckTasks()} className="mt-8 text-sky-600 font-bold flex items-center gap-2 hover:underline">
                  REFRESH STREAM <ChevronRight size={16} />
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
