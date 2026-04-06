import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { 
  User, 
  Mail, 
  Building2, 
  Calendar, 
  Bell, 
  Zap, 
  Fingerprint, 
  Key, 
  LogOut, 
  CheckCircle2, 
  ShieldCheck, 
  Edit3 
} from 'lucide-react'

export default function UserProfile() {
  const { profile, signOut } = useAuth()
  const [toggleState, setToggleState] = useState({
    notifications: true,
    slack: true,
    biometrics: false
  })

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  const ToggleSwitch = ({ active, onToggle }) => (
    <button 
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${active ? 'bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.4)]' : 'bg-slate-800'}`}
    >
      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${active ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )

  const AccountInput = ({ label, value, icon: Icon }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 leading-none">{label}</label>
      <div className="relative group">
         <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-slate-600 group-hover:text-sky-400 transition-colors">
            <Icon size={16} />
         </div>
         <input 
            readOnly 
            value={value} 
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 pl-12 text-sm font-bold text-white outline-none cursor-default shadow-inner"
         />
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 px-4">
      {/* Top Hero Profile Card */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[40px] p-8 md:p-12 relative overflow-hidden group hover:bg-slate-900/60 transition-all">
        <div className="absolute -top-24 -right-24 h-64 w-64 bg-sky-500/5 rounded-full blur-3xl group-hover:bg-sky-500/10 transition-all" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
             <div className="relative">
                <div className="h-40 w-40 rounded-full bg-slate-800 p-1 shadow-2xl border-4 border-sky-500 shadow-[0_0_25px_rgba(14,165,233,0.3)] relative overflow-hidden group/avatar">
                   <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.email || 'alex'}`} 
                      alt="Avatar" 
                      className="w-full h-full object-cover rounded-full group-hover/avatar:scale-110 transition-transform duration-500"
                   />
                </div>
                <div className="absolute bottom-2 right-2 h-8 w-8 bg-emerald-500 rounded-full border-4 border-slate-950 shadow-lg shadow-emerald-500/20" />
             </div>

             <div className="text-center md:text-left">
                <h2 className="text-3xl font-black text-white tracking-tighter leading-none mb-4 uppercase">{profile?.email?.split('@')[0] || 'Alex Rivera'}</h2>
                <p className="text-sky-400 font-bold text-sm uppercase tracking-widest flex items-center justify-center md:justify-start gap-3">
                   <ShieldCheck size={18} />
                   {profile?.role || 'Lead Analyst'} • Operations Strategy
                </p>
             </div>
          </div>

          <button className="bg-sky-500 text-white font-black py-4 px-10 rounded-2xl flex items-center gap-3 shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:shadow-sky-400/70 transition-all uppercase tracking-[0.2em] text-xs">
             <Edit3 size={18} />
             Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left Column: Performance Matrix */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[40px] p-10 flex flex-col items-center">
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-12 self-start leading-none pl-2 border-l-4 border-sky-500">Performance Matrix</h3>
              
              <div className="space-y-12 w-full flex flex-col items-center">
                {/* 85% Completion */}
                <div className="flex flex-col items-center group">
                   <div className="relative h-44 w-44 mb-6">
                      <svg className="h-full w-full transform -rotate-90">
                         <circle cx="88" cy="88" r="76" stroke="currentColor" strokeWidth="14" fill="transparent" className="text-slate-800" />
                         <circle 
                            cx="88" cy="88" r="76" stroke="currentColor" strokeWidth="14" fill="transparent" 
                            strokeDasharray="477.5" strokeDashoffset="71.6"
                            className="text-sky-500 drop-shadow-[0_0_15px_rgba(14,165,233,0.4)] transition-all duration-1000 group-hover:stroke-sky-400"
                         />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <p className="text-3xl font-black text-white tracking-tighter">85%</p>
                      </div>
                   </div>
                   <p className="text-sm font-black text-white uppercase tracking-tight mb-1">Monthly Completion</p>
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target: 90%</p>
                </div>

                {/* 94% Efficiency */}
                <div className="flex flex-col items-center group">
                   <div className="relative h-44 w-44 mb-6">
                      <svg className="h-full w-full transform -rotate-90">
                         <circle cx="88" cy="88" r="76" stroke="currentColor" strokeWidth="14" fill="transparent" className="text-slate-800" />
                         <circle 
                            cx="88" cy="88" r="76" stroke="currentColor" strokeWidth="14" fill="transparent" 
                            strokeDasharray="477.5" strokeDashoffset="28.6"
                            className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)] transition-all duration-1000 group-hover:stroke-emerald-300"
                         />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <p className="text-3xl font-black text-white tracking-tighter">94%</p>
                      </div>
                   </div>
                   <p className="text-sm font-black text-white uppercase tracking-tight mb-1">Overall Efficiency</p>
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Avg: 82%</p>
                </div>
              </div>
           </div>
        </div>

        {/* Right Column: Information & Preferences */}
        <div className="lg:col-span-3 space-y-10">
           {/* Account Information */}
           <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[40px] p-10 shadow-xl">
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10 leading-none pl-2 border-l-4 border-sky-500">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <AccountInput label="Full Name" value={profile?.email?.split('@')[0].toUpperCase() || 'ALEX RIVERA'} icon={User} />
                 <AccountInput label="Email Address" value={profile?.email || 'a.rivera@kpisync.io'} icon={Mail} />
                 <AccountInput label="Department" value={profile?.role === 'admin' ? 'Strategic Operations' : 'Business Intelligence'} icon={Building2} />
                 <AccountInput label="Join Date" value="March 12, 2022" icon={Calendar} />
              </div>
           </div>

           {/* Preferences & Sync */}
           <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[40px] p-10 shadow-xl">
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10 leading-none pl-2 border-l-4 border-sky-500">Preferences & Sync</h3>
              <div className="space-y-6">
                 <div className="flex items-center justify-between p-5 bg-slate-950/40 rounded-2xl border border-slate-800/40 group hover:border-slate-800 transition-all">
                    <div className="flex items-center gap-5">
                       <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                          <Bell size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-white uppercase tracking-tight">Email Notifications</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Daily digest and threshold alerts</p>
                       </div>
                    </div>
                    <ToggleSwitch 
                       active={toggleState.notifications} 
                       onToggle={() => setToggleState({...toggleState, notifications: !toggleState.notifications})} 
                    />
                 </div>

                 <div className="flex items-center justify-between p-5 bg-slate-950/40 rounded-2xl border border-slate-800/40 group hover:border-slate-800 transition-all">
                    <div className="flex items-center gap-5">
                       <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 group-hover:bg-emerald-400 group-hover:text-white transition-all duration-300">
                          <Zap size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-white uppercase tracking-tight">Slack Sync</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Post updates to #team-performance</p>
                       </div>
                    </div>
                    <ToggleSwitch 
                       active={toggleState.slack} 
                       onToggle={() => setToggleState({...toggleState, slack: !toggleState.slack})} 
                    />
                 </div>

                 <div className="flex items-center justify-between p-5 bg-slate-950/40 rounded-2xl border border-slate-800/40 group hover:border-slate-800 transition-all">
                    <div className="flex items-center gap-5">
                       <div className="p-3 bg-slate-800 text-slate-500 rounded-xl border border-slate-700 group-hover:bg-slate-700 group-hover:text-white transition-all duration-300">
                          <Fingerprint size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-white uppercase tracking-tight">Biometric Login</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Use FaceID or Fingerprint for access</p>
                       </div>
                    </div>
                    <ToggleSwitch 
                       active={toggleState.biometrics} 
                       onToggle={() => setToggleState({...toggleState, biometrics: !toggleState.biometrics})} 
                    />
                 </div>
              </div>
           </div>

           {/* Footer Actions */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <button className="flex items-center justify-center gap-3 bg-slate-900 border border-slate-800 text-slate-400 font-black py-5 rounded-2xl hover:bg-slate-800 hover:text-white transition-all uppercase tracking-[0.2em] text-[10px]">
                 <Key size={18} />
                 Change Password
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 font-black py-5 rounded-2xl hover:bg-rose-500 hover:text-white transition-all uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-rose-950/20"
              >
                 <LogOut size={18} />
                 Logout Session
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}
