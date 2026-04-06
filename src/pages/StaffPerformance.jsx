import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../hooks/useData'
import { 
  Users, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  ShieldCheck, 
  Award,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react'

export default function StaffPerformance() {
  const { id } = useParams()
  const { tasks, fetchTasks, loading } = useData()
  const [selectedStaff, setSelectedStaff] = useState(null)

  // Mock staff data for demo
  const staffMembers = [
    { id: '1', name: 'Sarah Jenkins', role: 'Senior Account Lead', efficiency: 92, status: 'On Track', tasks: 24, issues: 0, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
    { id: '2', name: 'David Chen', role: 'Lead Developer', efficiency: 42, status: 'Action Req.', statusColor: 'text-rose-500', tasks: 8, issues: 3, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' },
    { id: '3', name: 'Elena Rodriguez', role: 'Ops Manager', efficiency: 76, status: 'On Track', tasks: 18, issues: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena' }
  ]

  useEffect(() => {
    if (id) {
      const staff = staffMembers.find(s => s.id === id)
      if (staff) setSelectedStaff(staff)
    } else {
      setSelectedStaff(staffMembers[0]) // Default to Sarah
    }
  }, [id])

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 relative">
      {/* Performance Profile Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 dark:border-slate-800/40 pb-12 transition-colors">
        <div className="flex flex-col md:flex-row items-center gap-10">
           <div className="relative">
              <div className="h-32 w-32 rounded-[28px] bg-sky-500/10 border-4 border-white dark:border-slate-900 shadow-2xl p-1 overflow-hidden relative group">
                 <img src={selectedStaff?.avatar} alt={selectedStaff?.name} className="w-full h-full object-cover rounded-[22px] group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-emerald-500 rounded-xl border-4 border-white dark:border-slate-950 flex items-center justify-center shadow-lg">
                 <Award size={14} className="text-white" />
              </div>
           </div>
           <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                 <div className="w-8 h-1 bg-sky-500 rounded-full" />
                 <span className="text-[9px] font-black text-sky-600 dark:text-sky-500 uppercase tracking-[0.3em]">Operator Identity</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-none mb-4 lowercase">{selectedStaff?.name}</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">{selectedStaff?.role}</p>
           </div>
        </div>

        <div className="flex gap-4">
           <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-[28px] px-8 py-5 flex flex-col items-center justify-center min-w-[140px] shadow-sm dark:shadow-none transition-colors">
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 leading-none">Net Velocity</p>
              <p className="text-2xl font-black text-emerald-500 dark:text-emerald-400 tracking-tight leading-none">{selectedStaff?.efficiency}%</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Core Metrics Donuts (Left) */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[40px] p-10 flex flex-col items-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all shadow-sm dark:shadow-none">
           <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-12 self-start leading-none pl-2 border-l-4 border-sky-500">Analytics Map</h3>
           
           <div className="relative h-48 w-48 mb-12">
              <svg className="h-full w-full transform -rotate-90">
                 <circle cx="96" cy="96" r="72" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                 <circle 
                   cx="96" cy="96" r="72" stroke="currentColor" strokeWidth="16" fill="transparent" 
                   strokeDasharray="452.16" strokeDashoffset={452.16 - (452.16 * selectedStaff?.efficiency / 100)} 
                   className="text-sky-500 drop-shadow-[0_0_15px_rgba(14,165,233,0.4)] transition-all duration-1000"
                 />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                 <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{selectedStaff?.efficiency}%</p>
                 <p className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">Global Efficiency</p>
              </div>
           </div>

           <div className="w-full space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/40 transition-colors">
                 <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">Resolved</p>
                 </div>
                 <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{selectedStaff?.tasks}</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/40 transition-colors">
                 <div className="flex items-center gap-3">
                    <AlertCircle size={16} className="text-rose-500" />
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">Flagged</p>
                 </div>
                 <p className="text-sm font-black text-rose-500 leading-none">{selectedStaff?.issues}</p>
              </div>
           </div>
        </div>

        {/* Tactical Performance Cards (Right) */}
        <div className="lg:col-span-2 space-y-10">
           <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-[40px] p-10 flex flex-col gap-10 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all shadow-sm dark:shadow-none">
              <div className="flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Operational Velocity</h3>
                 <TrendingUp size={24} className="text-emerald-500" />
              </div>
              
              <div className="space-y-10">
                 {[
                   { label: 'System Integration Velocity', val: 88, color: 'bg-sky-500' },
                   { label: 'Strategic Alignment Protocol', val: 74, color: 'bg-emerald-400' },
                   { label: 'Cross-Functional Performance', val: 95, color: 'bg-sky-500' },
                 ].map((metric) => (
                   <div key={metric.label}>
                      <div className="flex justify-between items-end mb-4 px-1">
                         <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">{metric.label}</p>
                         <span className="text-sm font-black text-slate-900 dark:text-white leading-none">{metric.val}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                         <div 
                           className={`h-full rounded-full transition-all duration-1000 ${metric.color} shadow-[0_0_10px_rgba(14,165,233,0.3)]`} 
                           style={{ width: `${metric.val}%` }} 
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-8 flex flex-col items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all shadow-sm dark:shadow-none">
                 <div className="p-4 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-2xl border border-sky-500/20 mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <Activity size={24} />
                 </div>
                 <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-3">Live Utilization</p>
                 <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">98.2%</p>
              </div>
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-8 flex flex-col items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all shadow-sm dark:shadow-none">
                 <div className="p-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-500/20 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <ShieldCheck size={24} />
                 </div>
                 <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-3">Compliance Score</p>
                 <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">100%</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
