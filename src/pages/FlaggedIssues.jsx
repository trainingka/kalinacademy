import { AlertCircle, Clock, CheckCircle2, MoreHorizontal, User, ShieldAlert, ArrowRight } from 'lucide-react'

export default function FlaggedIssues() {
  const IssueCard = ({ title, user, time, status, statusColor, description, priority }) => (
    <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-6 group hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all border-l-4 border-l-rose-500 shadow-sm dark:shadow-none mb-6 relative overflow-hidden">
      <div className="absolute top-6 right-6">
         <span className={`text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${priority === 'High' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>
            {priority} PRIORITY
         </span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-lg p-0.5 overflow-hidden">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`} alt={user} className="w-full h-full object-cover rounded-lg" />
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">{user}</h4>
          <p className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-tighter leading-none">{time}</p>
        </div>
      </div>

      <h3 className="text-base font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight leading-none truncate">{title}</h3>
      <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-8 line-clamp-2">
        {description || 'System mission critical operation in progress. Protocol alignment required for final validation and issue resolution.'}
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/40 transition-colors">
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
            <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest leading-none">TASK BLOCKED</span>
         </div>
         <button className="bg-rose-500 text-white text-[9px] font-black px-6 py-2.5 rounded-xl uppercase tracking-widest shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-rose-500/50 transition-all leading-none">
            Resolve
         </button>
      </div>
    </div>
  )

  const KanbanColumn = ({ title, count, color, icon: Icon, children }) => (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-200 dark:border-slate-800/40 transition-colors">
         <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${color} shadow-[0_0_10px_currentColor]`} />
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none">{title}</h3>
         </div>
         <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 px-2 py-1 rounded-md leading-none">{count}</span>
      </div>
      <div className="flex-1 min-h-[500px]">
         {children}
      </div>
    </div>
  )

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 relative">
      {/* Flagged Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800/40 pb-10 transition-colors">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4 transition-colors">
             <div className="w-8 h-1 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
             <span className="text-[9px] font-black text-rose-600 dark:text-rose-500 uppercase tracking-[0.3em]">System Overload</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
            Live "Stuck" Items
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium text-sm leading-relaxed max-w-lg">Real-time identification of operational bottlenecks and strategic blockers requiring immediate intervention.</p>
        </div>

        <div className="flex gap-4">
           <div className="bg-white dark:bg-slate-900/40 border border-rose-500/20 dark:border-rose-900/20 rounded-2xl px-6 py-4 flex flex-col items-center justify-center min-w-[140px] shadow-sm dark:shadow-none group transition-colors">
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 leading-none group-hover:text-rose-500">Critical</p>
              <p className="text-xl font-black text-rose-500 tracking-tight leading-none">12</p>
           </div>
           <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-2xl px-6 py-4 flex flex-col items-center justify-center min-w-[140px] shadow-sm dark:shadow-none group transition-colors">
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 leading-none group-hover:text-sky-500">Pending</p>
              <p className="text-xl font-black text-sky-600 dark:text-sky-400 tracking-tight leading-none">28</p>
           </div>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <KanbanColumn title="Critical Issues" count={3} color="bg-rose-500" icon={ShieldAlert}>
           <IssueCard title="API Latency High" user="Sarah" time="2h ago" priority="High" />
           <IssueCard title="Auth Service Timeout" user="David" time="4h ago" priority="High" />
           <IssueCard title="DB Pool Exhaustion" user="Elena" time="5h ago" priority="High" />
        </KanbanColumn>

        <KanbanColumn title="Pending Review" count={2} color="bg-sky-500" icon={Clock}>
           <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 border-dashed rounded-[32px] p-6 mb-6 flex flex-col items-center justify-center opacity-40 hover:opacity-100 transition-all cursor-pointer shadow-sm dark:shadow-none group">
              <ShieldAlert size={32} className="text-slate-400 group-hover:text-sky-500 mb-4 transition-colors" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 leading-none">Drag Issue Here</p>
           </div>
           <IssueCard title="UI Scaling Glitch" user="Sarah" time="1d ago" priority="Medium" />
        </KanbanColumn>

        <KanbanColumn title="Recently Resolved" count={5} color="bg-emerald-500" icon={CheckCircle2}>
           <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-[32px] p-6 opacity-60 hover:opacity-100 transition-all transition-colors">
              <div className="flex items-center justify-between mb-4">
                 <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">System Patch V2.1</h4>
                 <CheckCircle2 size={16} className="text-emerald-500" />
              </div>
              <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Resolved 10m ago</p>
           </div>
        </KanbanColumn>
      </div>
    </div>
  )
}
