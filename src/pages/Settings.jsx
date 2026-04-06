import { useState, useEffect } from 'react'
import { 
  Users, 
  Slack, 
  Github, 
  Database, 
  Layout, 
  Save, 
  Download, 
  Plus, 
  Pencil, 
  Clock, 
  Mail, 
  Sun, 
  Moon,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Zap,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react'

export default function Settings() {
  const [theme, setTheme] = useState(() => localStorage.getItem('kpisync_theme') || 'dark')
  
  // Theme Toggle Syncing
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('kpisync_theme', theme)
  }, [theme])

  const [integrations, setIntegrations] = useState({
    slack: true,
    jira: true,
    github: false
  })

  const toggleIntegration = (key) => {
    setIntegrations(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    alert('System Configuration Updated Successfully!')
  }

  const handleExport = () => {
    alert('Exporting Global Protocol Configuration...')
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* Global Metadata Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200 dark:border-slate-800/40 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-1 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
             <span className="text-[9px] font-black text-sky-600 dark:text-sky-500 uppercase tracking-[0.3em]">System Config</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
            SYSTEM <span className="text-sky-500">SETTINGS</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-5 font-medium text-sm leading-relaxed max-w-xl">
            Global configuration for KPISync Enterprise. Manage organizational units, metric schemas, and automated workflows.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleExport}
            className="px-6 py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-700/50 hover:bg-slate-800 dark:hover:bg-slate-700 transition-all flex items-center gap-3 group"
          >
            <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
            Export Config
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-4 bg-sky-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] hover:bg-sky-400 transition-all flex items-center gap-3"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Unit Infrastructure (Left) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-8 shadow-sm transition-all duration-500 hover:border-sky-500/20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Team Management</h3>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-3 leading-none">3 active units currently monitoring metrics</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black rounded-lg border border-emerald-500/20 uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
              <Plus size={14} />
              Add Team
            </button>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Engineering', members: 24, flows: 12, icon: Database, color: 'text-sky-500' },
              { name: 'Sales', members: 18, flows: 8, icon: TrendingUp, color: 'text-emerald-500' },
              { name: 'Design', members: 12, flows: 5, icon: Layout, color: 'text-violet-500' },
            ].map((team) => (
              <div key={team.name} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/60 group hover:border-sky-500/30 transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className={`h-14 w-14 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${team.color}`}>
                    <team.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-800 dark:text-white mb-1 leading-none">{team.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                      {team.members} Members • {team.flows} Active Flows
                    </p>
                  </div>
                </div>
                <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Pencil size={14} className="text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Neural Connectors (Right) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-8 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase mb-10">Integrations</h3>
          
          <div className="space-y-6">
            {[
              { id: 'slack', name: 'Slack', status: integrations.slack ? 'Active' : 'Disabled', icon: MessageSquare, color: 'text-[#4A154B]' },
              { id: 'jira', name: 'Jira', status: integrations.jira ? 'Active' : 'Disabled', icon: CheckCircle2, color: 'text-[#0052CC]' },
              { id: 'github', name: 'GitHub', status: integrations.github ? 'Active' : 'Disabled', icon: Github, color: 'text-[#181717] dark:text-white' },
            ].map((service) => (
              <div key={service.id} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-5">
                   <div className={`p-3 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 ${service.color}`}>
                      <service.icon size={22} />
                   </div>
                   <div>
                      <p className="text-sm font-black text-slate-800 dark:text-white leading-none mb-1.5">{service.name}</p>
                      <p className={`text-[9px] font-black uppercase tracking-widest leading-none ${integrations[service.id] ? 'text-emerald-500' : 'text-slate-400'}`}>
                        {service.status}
                      </p>
                   </div>
                </div>
                <button 
                  onClick={() => toggleIntegration(service.id)}
                  className={`w-12 h-6 rounded-full p-1 transition-all duration-300 relative ${integrations[service.id] ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-lg transition-all duration-300 ${integrations[service.id] ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logic Schemas Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
           <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Global Metric Schemas</h3>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2 leading-none">6 total categories defined</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { tag: 'REVENUE', desc: 'Tracking MRR, ARR, and net retention across all tiers.', status: ['STABLE', 'CORE'], color: 'text-sky-500' },
            { tag: 'CHURN', desc: 'Percentage of customers canceling subscription services.', status: ['HIGH RISK'], color: 'text-rose-500' },
            { tag: 'EFFICIENCY', desc: 'Resource utilization and output per head-count ratio.', status: ['STABLE'], color: 'text-emerald-500' },
            { tag: 'VELOCITY', desc: 'Speed of feature delivery from backlog to production.', status: ['TRENDING UP'], color: 'text-violet-500' },
          ].map((item) => (
            <div key={item.tag} className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-8 group hover:border-sky-500/20 transition-all shadow-sm">
                <div className="flex justify-between items-start mb-6">
                   <h4 className={`text-base font-black ${item.color} leading-none uppercase tracking-tight`}>{item.tag}</h4>
                   <Pencil size={14} className="text-slate-300 dark:text-slate-600 group-hover:text-sky-500 cursor-pointer transition-colors" />
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-500 mb-8 leading-relaxed h-12 overflow-hidden">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                   {item.status.map(s => (
                     <span key={s} className={`text-[8px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest ${s === 'HIGH RISK' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-sky-500/10 text-sky-600 dark:text-sky-500 border border-sky-500/20'}`}>
                        {s}
                     </span>
                   ))}
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* Appearance & Protocols Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Visual Preferences */}
         <div className="lg:col-span-4 bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-8 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase mb-10">Appearance Settings</h3>
            <div className="space-y-8">
               <div className="bg-slate-50 dark:bg-slate-950/60 p-2 rounded-2xl flex gap-1 border border-slate-100 dark:border-slate-800/60">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'light' ? 'bg-white dark:bg-slate-800 shadow-lg text-sky-500 border border-slate-100 dark:border-slate-700' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                  >
                    <Sun size={14} />
                    Light Mode
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-white dark:bg-slate-800 shadow-lg text-sky-500 border border-slate-100 dark:border-slate-700' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                  >
                    <Moon size={14} />
                    Dark Mode
                  </button>
               </div>
               
               <div className="p-4 bg-sky-500/5 dark:bg-sky-500/10 rounded-2xl border border-sky-500/10">
                  <div className="flex gap-4">
                     <AlertCircle size={20} className="text-sky-500 shrink-0" />
                     <p className="text-[11px] font-medium text-sky-500 leading-relaxed uppercase tracking-wide">Interface optimization protocol is currently synchronized with system accessibility standards.</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Distribution Schedules */}
         <div className="lg:col-span-8 bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-[32px] p-8 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase mb-10 px-2 flex justify-between items-center transition-all">
              Schedules
              <Clock size={20} className="text-slate-300 dark:text-slate-600" />
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
               <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-[28px] p-8 group hover:border-sky-500/30 transition-all cursor-pointer shadow-sm">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="p-3 bg-sky-500/10 text-sky-500 rounded-2xl border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                        <Mail size={22} />
                     </div>
                     <h4 className="text-base font-black text-slate-800 dark:text-white uppercase leading-none">Weekly Boss Summary</h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mb-8 leading-relaxed">Full organizational performance audit sent to executive board every Monday.</p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200/50 dark:border-slate-700/30 transition-colors">
                     <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-sm">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="user" />
                          </div>
                        ))}
                        <div className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                           <span className="text-[8px] font-black text-slate-400">+8</span>
                        </div>
                     </div>
                     <span className="text-[9px] font-black text-sky-500 uppercase tracking-widest leading-none bg-sky-500/10 px-3 py-1.5 rounded-full">Monday 09:00 AM</span>
                  </div>
               </div>

               <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-[28px] p-8 group hover:border-sky-500/30 transition-all cursor-pointer shadow-sm">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                        <Zap size={22} />
                     </div>
                     <h4 className="text-base font-black text-slate-800 dark:text-white uppercase leading-none">Daily Staff Pulse</h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mb-8 leading-relaxed">Daily momentum updates sent to all engineering and design Slack channels.</p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200/50 dark:border-slate-700/30 transition-colors">
                     <div className="flex items-center gap-2">
                        <Slack size={14} className="text-slate-400" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none truncate max-w-[120px]">#growth-eng-internal</span>
                     </div>
                     <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none bg-emerald-500/10 px-3 py-1.5 rounded-full">Daily 08:30 AM</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
