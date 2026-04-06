import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useData } from '../hooks/useData'
import { CheckCircle2, AlertTriangle, Clock, Plus, Target, CheckSquare, Zap, Smartphone, MessageSquare, Mail } from 'lucide-react'

export default function StaffDashboard() {
  const { user } = useAuth()
  const { tasks, fetchTasks, updateTaskStatus } = useData()

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

  const completedCount = tasks.filter(t => t.status === 'completed').length
  const totalCount = tasks.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const kpiTasks = tasks.filter(t => t.task_type === 'kpi_driven' || !t.task_type) // Defaulting to KPI if undefined
  const manualTasks = tasks.filter(t => t.task_type === 'manual')

  const TaskCard = ({ task }) => {
    const isStuck = task.status === 'stuck'
    const isCompleted = task.status === 'completed'
    
    return (
      <div 
        className={`bg-slate-900/50 backdrop-blur-md border border-slate-800/60 rounded-[28px] p-6 transition-all group relative overflow-hidden ${
          isStuck ? 'border-l-4 border-l-rose-500' : 'hover:bg-slate-900/80'
        }`}
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-5">
            <div className={`p-3 rounded-xl ${isStuck ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-800 text-sky-500'}`}>
               {task.task_type === 'manual' ? (
                 task.title.toLowerCase().includes('mail') ? <Mail size={20} /> : <CheckSquare size={20} />
               ) : (
                 task.title.toLowerCase().includes('sla') ? <Zap size={20} /> : <Target size={20} />
               )}
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h4 className={`text-base font-black ${isCompleted ? 'text-slate-500 line-through' : 'text-white'} group-hover:text-sky-400 transition-colors`}>
                  {task.title}
                </h4>
                {isStuck && (
                  <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 text-[9px] font-black rounded border border-rose-500/20 tracking-widest uppercase">
                    STUCK
                  </span>
                )}
              </div>
              <p className={`text-xs font-bold tracking-tight ${isStuck ? 'text-rose-400' : 'text-slate-500'}`}>
                {isStuck ? (task.description || "Awaiting management feedback for metric verification") : (task.description || "Update tracking documentation for synchronization")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {task.task_type === 'manual' && !isCompleted && (
               <AlertTriangle size={20} className="text-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]" />
            )}
            
            {isStuck ? (
              <button 
                onClick={() => handleStatusChange(task.id, 'pending')}
                className="bg-slate-800 text-white font-black py-3 px-6 rounded-xl text-[9px] uppercase tracking-[0.2em] hover:bg-sky-500 transition-all shadow-lg active:scale-95"
              >
                Resolve
              </button>
            ) : (
              <button 
                onClick={() => handleStatusChange(task.id, isCompleted ? 'pending' : 'completed')}
                className={`h-10 w-10 rounded-full border-2 transition-all flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                    : 'border-slate-700 text-transparent hover:border-sky-500'
                }`}
              >
                <CheckCircle2 size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 relative px-4">
      {/* Header Section */}
      <div className="relative pt-2">
        <div className="flex items-end justify-between mb-6">
           <div>
              <h2 className="text-3xl font-black tracking-tight text-white leading-none uppercase">Daily Tasks</h2>
              <p className="text-slate-500 mt-4 font-bold text-base tracking-wide">
                 Tuesday, Oct 24 • <span className="text-sky-400 uppercase tracking-[0.2em] text-sm">{progressPercent}% Protocol Complete</span>
              </p>
           </div>
           <div className="text-right">
              <h3 className="text-4xl font-black text-sky-500 tracking-tighter leading-none shadow-sky-500/20 drop-shadow-xl">{completedCount}/{totalCount}</h3>
           </div>
        </div>
        
        {/* Glow Progress Bar */}
        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 shadow-inner relative">
           <div 
             className="h-full bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.6)] rounded-full transition-all duration-1000 ease-out"
             style={{ width: `${progressPercent}%` }}
           />
        </div>
      </div>

      {/* KPI-DRIVEN OBJECTIVES Section */}
      <section className="space-y-6">
        <h3 className="text-[9px] font-black text-sky-500 uppercase tracking-[0.3em] px-2 border-l-4 border-sky-500">KPI-Driven Objectives</h3>
        <div className="space-y-4">
          {kpiTasks.length > 0 ? kpiTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          )) : (
            <div className="bg-slate-950/40 border border-dashed border-slate-800 rounded-[28px] p-12 flex flex-col items-center">
               <Target size={32} className="text-slate-800 mb-4" />
               <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">No Objectives assigned</p>
            </div>
          )}
        </div>
      </section>

      {/* MANUAL AD-HOC TASKS Section */}
      <section className="space-y-6">
        <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 border-l-4 border-slate-700">Manual Ad-Hoc Tasks</h3>
        <div className="space-y-4">
          {manualTasks.length > 0 ? manualTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          )) : (
            <div className="bg-slate-950/40 border border-dashed border-slate-800 rounded-[28px] p-8 flex flex-col items-center">
               <span className="text-slate-700 font-bold italic text-xs tracking-widest uppercase">System clear for ad-hoc intervention</span>
            </div>
          )}
        </div>
      </section>

      {/* Footer & FAB */}
      <footer className="pt-8 text-center">
         <p className="text-slate-700 font-bold italic text-xs tracking-[0.2em] uppercase">
            KPISync Enterprise OS v2.4 • Sync Active
         </p>
      </footer>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 h-16 w-16 bg-sky-500 text-white rounded-[22px] flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.5)] active:scale-95 transition-all z-[100] group overflow-hidden">
         <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
         <Plus size={28} className="relative z-10" />
      </button>
    </div>
  )
}
