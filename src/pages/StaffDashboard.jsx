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
        className={`bg-slate-900/50 backdrop-blur-md border border-slate-800/60 rounded-[32px] p-8 transition-all group relative overflow-hidden ${
          isStuck ? 'border-l-4 border-l-rose-500' : 'hover:bg-slate-900/80'
        }`}
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-6">
            <div className={`p-4 rounded-2xl ${isStuck ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-800 text-sky-500'}`}>
               {task.task_type === 'manual' ? (
                 task.title.toLowerCase().includes('mail') ? <Mail size={24} /> : <CheckSquare size={24} />
               ) : (
                 task.title.toLowerCase().includes('sla') ? <Zap size={24} /> : <Target size={24} />
               )}
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h4 className={`text-xl font-black ${isCompleted ? 'text-slate-500 line-through' : 'text-white'} group-hover:text-sky-400 transition-colors`}>
                  {task.title}
                </h4>
                {isStuck && (
                  <span className="px-3 py-1 bg-rose-500/10 text-rose-500 text-[10px] font-black rounded-lg uppercase tracking-widest border border-rose-500/20">
                    STUCK
                  </span>
                )}
              </div>
              <p className={`text-sm font-bold tracking-tight ${isStuck ? 'text-rose-400' : 'text-slate-500'}`}>
                {isStuck ? (task.description || "Awaiting management feedback for metric verification") : (task.description || "Update tracking documentation for synchronization")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {task.task_type === 'manual' && !isCompleted && (
               <AlertTriangle size={24} className="text-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]" />
            )}
            
            {isStuck ? (
              <button 
                onClick={() => handleStatusChange(task.id, 'pending')}
                className="bg-slate-800 text-white font-black py-4 px-8 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-sky-500 transition-all shadow-lg active:scale-95"
              >
                Resolve
              </button>
            ) : (
              <button 
                onClick={() => handleStatusChange(task.id, isCompleted ? 'pending' : 'completed')}
                className={`h-12 w-12 rounded-full border-2 transition-all flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                    : 'border-slate-700 text-transparent hover:border-sky-500'
                }`}
              >
                <CheckCircle2 size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 relative">
      {/* Header Section */}
      <div className="relative pt-4">
        <div className="flex items-end justify-between mb-8">
           <div>
              <h2 className="text-6xl font-black tracking-tight text-white leading-none">Daily <span className="text-sky-500 italic">Tasks</span></h2>
              <p className="text-slate-500 mt-6 font-bold text-lg">
                 Tuesday, Oct 24 • <span className="text-sky-400 uppercase tracking-widest">{progressPercent}% Complete</span>
              </p>
           </div>
           <div className="text-right">
              <h3 className="text-6xl font-black text-sky-500 tracking-tighter leading-none shadow-sky-500/20 drop-shadow-xl">{completedCount}/{totalCount}</h3>
           </div>
        </div>
        
        {/* Glow Progress Bar */}
        <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 shadow-inner relative">
           <div 
             className="h-full bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.6)] rounded-full transition-all duration-1000 ease-out"
             style={{ width: `${progressPercent}%` }}
           />
        </div>
      </div>

      {/* KPI-DRIVEN OBJECTIVES Section */}
      <section className="space-y-8">
        <h3 className="text-[10px] font-black text-sky-500 uppercase tracking-[0.3em] px-2 border-l-4 border-sky-500">KPI-Driven Objectives</h3>
        <div className="space-y-4">
          {kpiTasks.length > 0 ? kpiTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          )) : (
            <div className="bg-slate-950/40 border border-dashed border-slate-800 rounded-[32px] p-20 flex flex-col items-center">
               <Target size={48} className="text-slate-800 mb-4" />
               <p className="text-slate-500 font-black uppercase tracking-widest text-xs">No Objectives assigned</p>
            </div>
          )}
        </div>
      </section>

      {/* MANUAL AD-HOC TASKS Section */}
      <section className="space-y-8">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 border-l-4 border-slate-700">Manual Ad-Hoc Tasks</h3>
        <div className="space-y-4">
          {manualTasks.length > 0 ? manualTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          )) : (
            <div className="bg-slate-950/40 border border-dashed border-slate-800 rounded-[32px] p-12 flex flex-col items-center">
               <span className="text-slate-600 font-bold italic text-sm">System clear for ad-hoc intervention</span>
            </div>
          )}
        </div>
      </section>

      {/* Footer & FAB */}
      <footer className="pt-12 text-center">
         <p className="text-slate-600 font-bold italic text-sm tracking-wide">
            All tasks synced with KPISync Enterprise Suite v2.4
         </p>
      </footer>

      {/* Floating Action Button */}
      <button className="fixed bottom-12 right-12 h-20 w-20 bg-sky-500 text-white rounded-[28px] flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.5)] active:scale-95 transition-all z-[100] group overflow-hidden">
         <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
         <Plus size={36} className="relative z-10" />
      </button>
    </div>
  )
}
