import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useData } from '../hooks/useData'
import { CheckCircle2, AlertTriangle, Clock, Plus, Target, CheckSquare, Search } from 'lucide-react'

export default function StaffDashboard() {
  const { user, profile } = useAuth()
  const { tasks, fetchTasks, updateTaskStatus } = useData()
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (user) {
      fetchTasks(user.id)
    }
  }, [user])

  const handleStatusChange = async (taskId, status) => {
    try {
      await updateTaskStatus(taskId, status)
    } catch (err) {
      alert(err.message)
    }
  }

  const filteredTasks = tasks.filter(t => filter === 'all' || t.status === filter)

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 flex items-center gap-4">
             Daily Tasks <span className="text-sky-500 italic">Matrix</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Precision execution for KPI-driven objectives</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-soft flex items-center gap-8">
             <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed</p>
                <p className="text-xl font-bold text-emerald-500">
                  {tasks.filter(t => t.status === 'completed').length}/{tasks.length}
                </p>
             </div>
             <div className="h-10 w-px bg-slate-200" />
             <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stuck</p>
                <p className="text-xl font-bold text-red-500">
                  {tasks.filter(t => t.status === 'stuck').length}
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <input 
             className="input-field pl-12 py-4" 
             placeholder="Search tasks, KPIs, or ad-hoc items..." 
           />
        </div>
        
        <div className="bg-slate-100 p-1 rounded-2xl flex gap-1">
          {['all', 'pending', 'completed', 'stuck'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                filter === f ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4 pb-20">
        {filteredTasks.map(task => (
          <div 
            key={task.id} 
            className={`glass-card p-6 transition-all border-l-[6px] ${
              task.status === 'completed' ? 'border-l-emerald-500 opacity-60' : 
              task.status === 'stuck' ? 'border-l-red-500' : 
              'border-l-sky-500'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-5">
                <div className={`p-4 rounded-2xl ${
                  task.task_type === 'kpi_driven' ? 'bg-sky-50 text-sky-500' : 'bg-slate-50 text-slate-500'
                }`}>
                  {task.task_type === 'kpi_driven' ? <Target size={24} /> : <CheckSquare size={24} />}
                </div>
                
                <div>
                   <div className="flex items-center gap-3">
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        task.task_type === 'kpi_driven' ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-700'
                     }`}>
                       {task.task_type.replace('_', '-')}
                     </span>
                     {task.status === 'stuck' && (
                       <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 uppercase tracking-wider animate-pulse">
                         CRITICAL BLOCKED
                       </span>
                     )}
                   </div>
                   <h4 className={`text-lg font-bold mt-2 ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                     {task.title}
                   </h4>
                   <p className="text-slate-500 text-sm mt-1">Ref: {task.kpisync_monthly_kpis?.kpisync_yearly_goals?.title || 'Ad-hoc Execution'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                 {task.status !== 'completed' && (
                   <button 
                     onClick={() => handleStatusChange(task.id, 'stuck')}
                     className={`p-3 rounded-xl transition-all ${
                       task.status === 'stuck' ? 'bg-red-500 text-white shadow-soft-red' : 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white'
                     }`}
                     title="Flag as Blocked / Stuck"
                   >
                     <AlertTriangle size={20} />
                   </button>
                 )}
                 
                 <button 
                    onClick={() => handleStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                    className={`p-3 rounded-xl transition-all ${
                      task.status === 'completed' ? 'bg-emerald-500 text-white shadow-soft-emerald' : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                    }`}
                    title="Mark as Complete"
                 >
                    <CheckCircle2 size={20} />
                 </button>
              </div>
            </div>
            
            {task.status === 'stuck' && (
               <div className="mt-4 p-4 bg-red-50/50 border border-red-100 rounded-2xl">
                  <p className="text-red-800 text-xs font-semibold flex items-center gap-2 uppercase tracking-widest">
                    <Clock size={14} /> Waiting for Response from Admin
                  </p>
               </div>
            )}
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center glass-card border-dashed bg-transparent border-slate-300">
             <CheckSquare size={48} className="text-slate-200 mb-4" />
             <h4 className="text-slate-900 font-bold text-lg">No Tasks Found</h4>
             <p className="text-slate-500 text-sm mt-1">Wait for your manager to assign new objectives.</p>
          </div>
        )}
      </div>

      {/* Floating Action (Example) */}
      <button className="md:hidden fixed bottom-24 right-6 w-16 h-16 bg-sky-500 text-white rounded-full shadow-2xl flex items-center justify-center animate-bounce">
         <Plus size={32} />
      </button>
    </div>
  )
}
