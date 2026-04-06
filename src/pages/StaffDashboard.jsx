import { useState, useEffect } from 'react'
import { useData } from '../hooks/useData'
import { useAuth } from '../hooks/useAuth'
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Target,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react'

export default function StaffDashboard() {
  const { tasks, fetchTasks, updateTaskStatus, loading } = useData()
  const { user } = useAuth()

  useEffect(() => {
    if (user) fetchTasks(user.id)
  }, [user])

  const TaskCard = ({ task }) => (
    <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-6 group hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all border-l-4 border-l-transparent hover:border-l-sky-500/50 shadow-sm dark:shadow-none">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
           <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 ${task.status === 'stuck' ? 'text-rose-500' : 'text-sky-500'}`}>
              {task.status === 'completed' ? <CheckCircle2 size={18} /> : 
               task.status === 'stuck' ? <AlertCircle size={18} /> : <Clock size={18} />}
           </div>
           <div>
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Task Protocol</p>
              <h4 className="text-sm font-black text-slate-900 dark:text-white mt-1 uppercase tracking-tight leading-none">{task.title}</h4>
           </div>
        </div>
        <button className="text-slate-300 dark:text-slate-700 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
           <MoreHorizontal size={18} />
        </button>
      </div>

      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-8 line-clamp-2">
        {task.description || 'System mission critical operation in progress. Protocol alignment required for final validation.'}
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/60">
        <div className="flex -space-x-2">
           <div className="h-7 w-7 rounded-lg bg-sky-500 border-2 border-white dark:border-slate-900 shadow-lg flex items-center justify-center">
              <span className="text-[8px] font-black text-white">R1</span>
           </div>
           <div className="h-7 w-7 rounded-lg bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-lg flex items-center justify-center">
              <span className="text-[8px] font-black text-white">S4</span>
           </div>
        </div>
        
        <div className="flex gap-2">
           {task.status !== 'completed' && (
             <button 
               onClick={() => updateTaskStatus(task.id, 'completed')}
               className="px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black rounded-lg border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all uppercase tracking-widest leading-none"
             >
               Finalize
             </button>
           )}
           {task.status !== 'stuck' && (
             <button 
               onClick={() => updateTaskStatus(task.id, 'stuck')}
               className="px-4 py-2 bg-rose-500/10 text-rose-500 text-[9px] font-black rounded-lg border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all uppercase tracking-widest leading-none"
             >
               Flag Issue
             </button>
           )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 relative">
      {/* Dynamic Identity Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800/40 pb-10 transition-colors">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-1 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
             <span className="text-[9px] font-black text-sky-600 dark:text-sky-500 uppercase tracking-[0.3em]">Operational Level 4</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
            Daily Tasks
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium text-sm leading-relaxed max-w-lg">Executing real-time performance protocols. Focus on high-velocity task resolution.</p>
        </div>

        <div className="flex gap-4">
           <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-2xl px-6 py-4 flex flex-col items-center justify-center min-w-[120px] shadow-sm dark:shadow-none">
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 leading-none">Efficiency</p>
              <p className="text-xl font-black text-emerald-500 dark:text-emerald-400 tracking-tight leading-none">94%</p>
           </div>
           <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-2xl px-6 py-4 flex flex-col items-center justify-center min-w-[120px] shadow-sm dark:shadow-none">
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 leading-none">Pending</p>
              <p className="text-xl font-black text-sky-600 dark:text-sky-400 tracking-tight leading-none">{tasks.filter(t => t.status !== 'completed').length}</p>
           </div>
        </div>
      </div>

      {/* Main Task Grid Section */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {tasks.length > 0 ? (
             tasks.map(task => <TaskCard key={task.id} task={task} />)
           ) : (
             <div className="lg:col-span-3 py-20 flex flex-col items-center justify-center opacity-20 transition-opacity">
                <Target size={60} className="mb-6 text-slate-400" />
                <h3 className="text-xl font-black uppercase tracking-[0.3em] text-slate-400">Zero Pending Protocols</h3>
             </div>
           )}
        </div>
      </section>

      {/* Secondary Progress Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10">
         <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-[40px] p-10 flex flex-col gap-8 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between">
               <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Monthly Velocity</h3>
               <TrendingUp size={20} className="text-emerald-500" />
            </div>
            <div className="flex items-center gap-10">
               <div className="relative h-28 w-28">
                  <svg className="h-full w-full transform -rotate-90">
                     <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                     <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="301.5" strokeDashoffset="45" className="text-emerald-400 dark:text-emerald-500 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)] transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">85%</p>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="w-3 h-3 bg-emerald-400 rounded-sm" />
                     <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">Resolved Protocols</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-3 h-3 bg-slate-200 dark:bg-slate-800 rounded-sm" />
                     <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest leading-none">Remaining Quota</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-white dark:bg-sky-950/10 border border-slate-200 dark:border-sky-900/20 rounded-[40px] p-10 flex flex-col justify-between hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all shadow-sm dark:shadow-none">
             <div>
                <h3 className="text-lg font-black text-sky-600 dark:text-sky-200 uppercase tracking-tighter leading-none mb-4">Protocol Synchronization</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-sky-300/60 leading-relaxed">Your performance is currently being synchronized with the global enterprise target. Continue at peak velocity.</p>
             </div>
             <button className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-black text-[10px] uppercase tracking-widest group leading-none pt-6">
                View detailed analytics
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </button>
         </div>
      </div>
    </div>
  )
}
