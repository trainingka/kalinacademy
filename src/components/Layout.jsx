import { useState } from 'react'
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { 
  LayoutDashboard, 
  Target, 
  Users, 
  CheckSquare, 
  Bell, 
  Settings, 
  LogOut, 
  AlertCircle,
  Zap,
  BarChart3,
  User,
  ShieldCheck
} from 'lucide-react'

export default function Layout() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  const handleSettingsClick = () => {
    alert('Enterprise Settings module coming soon!')
  }

  // Demo Mode Menu Items
  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Goals Breakdown', icon: Zap, path: '/breakdown' },
    { label: 'Staff Performance', icon: Users, path: '/performance' },
    { label: 'My Daily Tasks', icon: CheckSquare, path: '/staff-dashboard' },
    { label: 'My KPIs', icon: BarChart3, path: '/my-kpis' },
    { label: 'Flag Issues', icon: AlertCircle, path: '/flagged-issues' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-400 font-sans selection:bg-sky-500/30">
      {/* Sidebar Desktop */}
      <aside className="fixed left-0 top-0 w-72 h-full bg-slate-950/90 border-r border-slate-800/60 backdrop-blur-xl z-20 hidden lg:flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.5)]">
               <Target size={20} className="text-white" />
            </div>
            <div>
               <h1 className="text-lg font-black text-white leading-none tracking-tight">KPISync</h1>
               <p className="text-[10px] font-bold tracking-widest text-sky-500 uppercase mt-1">Enterprise Suite</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive(item.path) 
                  ? 'bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.25)]' 
                  : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <item.icon size={20} className={`${isActive(item.path) ? 'text-white' : 'text-slate-500 group-hover:text-sky-400'} transition-colors`} />
              <span className="text-sm font-semibold">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 transition-all group"
          >
            <LogOut size={20} />
            <span className="text-sm font-semibold">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:pl-72 min-h-screen relative">
        {/* Universal Top Header */}
        <header className="h-20 bg-slate-950/40 backdrop-blur-md border-b border-slate-800/40 sticky top-0 z-50 px-8 flex items-center justify-between">
          <div className="lg:hidden">
             <h1 className="text-xl font-black text-white">KPISync</h1>
          </div>
          
          <div className="hidden lg:block">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              {menuItems.find(i => isActive(i.path))?.label || 'Security Terminal'}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               {/* Notification Bell */}
               <div className="relative">
                 <button 
                   onClick={() => {
                     setShowNotifications(!showNotifications)
                     setShowProfileMenu(false)
                   }}
                   className={`p-2.5 rounded-xl transition-all relative ${showNotifications ? 'bg-slate-800 text-sky-400' : 'text-slate-500 hover:text-sky-400 hover:bg-slate-800/50'}`}
                 >
                   <Bell size={20} />
                   <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-slate-950 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                 </button>

                 {/* Notifications Dropdown */}
                 {showNotifications && (
                   <div className="absolute right-0 mt-4 w-80 bg-slate-900/95 border border-slate-800 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                     <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Security Notifications</h4>
                        <span className="text-[8px] font-black bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded uppercase">3 New</span>
                     </div>
                     <div className="max-h-96 overflow-y-auto">
                        <div className="p-4 border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors cursor-pointer">
                           <p className="text-xs font-black text-white mb-1">New task assigned by Boss</p>
                           <p className="text-[10px] font-bold text-slate-400">Quarterly audit verification required</p>
                           <p className="text-[8px] font-black text-sky-500 mt-2 uppercase">2m ago</p>
                        </div>
                        <div className="p-4 border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors cursor-pointer">
                           <p className="text-xs font-black text-white mb-1">System update V2.0 Elite</p>
                           <p className="text-[10px] font-bold text-slate-400">Protocol optimization successfully deployed</p>
                           <p className="text-[8px] font-black text-sky-500 mt-2 uppercase">1h ago</p>
                        </div>
                        <div className="p-4 hover:bg-slate-800/30 transition-colors cursor-pointer">
                           <p className="text-xs font-black text-white mb-1">Metric Alert</p>
                           <p className="text-[10px] font-bold text-slate-400">Sales target reached 85% for Q4</p>
                           <p className="text-[8px] font-black text-emerald-400 mt-2 uppercase">4h ago</p>
                        </div>
                     </div>
                     <div className="p-3 bg-slate-950/40 text-center">
                        <button className="text-[9px] font-black text-slate-500 hover:text-sky-400 uppercase tracking-[0.2em] transition-colors">Clear All Protocols</button>
                     </div>
                   </div>
                 )}
               </div>

               {/* Settings Button */}
               <button 
                 onClick={handleSettingsClick}
                 className="p-2.5 text-slate-500 hover:text-sky-400 hover:bg-slate-800/50 rounded-xl transition-all"
               >
                 <Settings size={20} />
               </button>
            </div>
            
            <div className="h-10 w-px bg-slate-800/60 mx-2" />
            
            {/* User Profile Area */}
            <div className="relative">
              <div 
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu)
                  setShowNotifications(false)
                }}
                className="flex items-center gap-3 pl-2 cursor-pointer group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-white leading-none uppercase tracking-tight group-hover:text-sky-400 transition-colors">
                    {profile?.email?.split('@')[0] || 'Unknown Identity'}
                  </p>
                  <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mt-1.5 flex items-center justify-end gap-1.5">
                     <span className="w-1 h-1 bg-sky-500 rounded-full" />
                     {profile?.role || 'System Root'}
                  </p>
                </div>
                <div 
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/profile')
                    setShowProfileMenu(false)
                  }}
                  className={`h-11 w-11 rounded-[14px] bg-slate-800 border-[1.5px] overflow-hidden shadow-2xl p-0.5 transition-all ${showProfileMenu ? 'border-sky-500' : 'border-slate-700 group-hover:border-sky-500/50'}`}
                >
                   <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.email || 'admin'}`} 
                      alt="Avatar" 
                      className="rounded-[10px] w-full h-full object-cover group-hover:scale-110 transition-transform"
                   />
                </div>
              </div>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-4 w-60 bg-slate-900/95 border border-slate-800 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-5 border-b border-slate-800 bg-slate-950/20">
                     <p className="text-xs font-black text-white uppercase tracking-tight truncate">{profile?.email || 'root@kpisync.elite'}</p>
                     <p className="text-[9px] font-black text-sky-500 uppercase tracking-[0.2em] mt-1">Status: Authorized</p>
                  </div>
                  <div className="p-2">
                     <button 
                        onClick={() => {
                          navigate('/profile')
                          setShowProfileMenu(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all text-left"
                     >
                        <User size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">My Profile</span>
                     </button>
                     <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all text-left">
                        <ShieldCheck size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Security Access</span>
                     </button>
                     <div className="h-px bg-slate-800 my-2 mx-2" />
                     <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 transition-all text-left group"
                     >
                        <LogOut size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>
                     </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Outlet Stage */}
        <div className="p-8 lg:p-12 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">
           <Outlet />
        </div>
        
        {/* Sub-context Footer Metadata */}
        <footer className="px-12 pb-12 opacity-30 pointer-events-none">
           <div className="border-t border-slate-800/40 pt-8 flex justify-between items-center">
              <p className="text-[9px] font-black uppercase tracking-[0.4em]">KPISync ENTERPRISE OS V2.0 • PROTOCOL ACTIVE</p>
              <p className="text-[9px] font-black uppercase tracking-[0.4em]">INTERNAL DEMO BUILD #412</p>
           </div>
        </footer>
      </main>
    </div>
  )
}
