import { useState, useEffect } from 'react'
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
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react'

// Mock Title for accessibility if Dialog exists (Prevents radix error)
const DialogTitle = ({ children, ...props }) => <h3 {...props}>{children}</h3>

export default function Layout() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  
  // Theme State Configuration
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('kpisync_theme') || 'dark'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('kpisync_theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // Mood Avatar synchronization
  const completion = 85
  const target = 90
  const isPerforming = completion >= target
  const moodAvatar = isPerforming ? '/happy_avatar.svg' : '/crying_avatar.svg'

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  const handleSettingsClick = () => {
    navigate('/settings')
  }

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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-400 font-sans selection:bg-sky-500/30 transition-colors duration-300">
      {/* Sidebar Terminal */}
      <aside className="fixed left-0 top-0 w-72 h-full bg-white dark:bg-slate-950/90 border-r border-slate-200 dark:border-slate-800/60 backdrop-blur-xl z-50 hidden lg:flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.5)]">
               <Target size={20} className="text-white" />
            </div>
            <div>
               <h1 className="text-lg font-black text-slate-900 dark:text-white leading-none tracking-tight">KPISync</h1>
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
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <item.icon size={20} className={`${isActive(item.path) ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-sky-500 dark:group-hover:text-sky-400'} transition-colors`} />
              <span className="text-sm font-semibold">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800/60 transition-colors">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 transition-all group"
          >
            <LogOut size={20} />
            <span className="text-sm font-semibold">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Execution Shell */}
      <main className="lg:pl-72 min-h-screen relative">
        {/* Universal Top Deployment Header */}
        <header className="h-20 bg-white/70 dark:bg-slate-950/40 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/40 sticky top-0 z-50 px-8 flex items-center justify-between transition-colors">
          <div className="lg:hidden">
             <h1 className="text-xl font-black text-slate-900 dark:text-white">KPISync</h1>
          </div>
          
          <div className="hidden lg:block transition-all">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-none">
              {location.pathname === '/settings' ? 'System Settings' : (menuItems.find(i => isActive(i.path))?.label || 'Security Terminal')}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               {/* Notification Bell Interface */}
               <div className="relative">
                 <button 
                   onClick={() => {
                     setShowNotifications(!showNotifications)
                     setShowProfileMenu(false)
                   }}
                   className={`p-2.5 rounded-xl transition-all relative ${showNotifications ? 'bg-slate-100 dark:bg-slate-800 text-sky-500 dark:text-sky-400' : 'text-slate-400 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}
                 >
                   <Bell size={20} />
                   <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                 </button>

                 {/* Notifications Dropdown UI Container */}
                 {showNotifications && (
                   <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                     <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center transition-colors">
                        <DialogTitle className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none">Security Notifications</DialogTitle>
                        <span className="text-[8px] font-black bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded uppercase">3 New</span>
                     </div>
                     <div className="max-h-96 overflow-y-auto">
                        <div className="p-4 border-b border-slate-50 dark:border-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                           <p className="text-xs font-black text-slate-900 dark:text-white mb-1">New task assigned by Boss</p>
                           <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Quarterly audit verification required</p>
                           <p className="text-[8px] font-black text-sky-500 mt-2 uppercase transition-all">2m ago</p>
                        </div>
                        <div className="p-4 border-b border-slate-50 dark:border-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                           <p className="text-xs font-black text-slate-900 dark:text-white mb-1">System update V2.0 Elite</p>
                           <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Protocol optimization successfully deployed</p>
                           <p className="text-[8px] font-black text-sky-500 mt-2 uppercase transition-all">1h ago</p>
                        </div>
                        <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                           <p className="text-xs font-black text-slate-900 dark:text-white mb-1">Metric Alert</p>
                           <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Sales target reached 85% for Q4</p>
                           <p className="text-[8px] font-black text-emerald-500 mt-2 uppercase transition-all">4h ago</p>
                        </div>
                     </div>
                     <div className="p-3 bg-slate-50/50 dark:bg-slate-950/40 text-center transition-colors">
                        <button className="text-[9px] font-black text-slate-400 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-400 uppercase tracking-[0.2em] transition-colors leading-none">Clear All Protocols</button>
                     </div>
                   </div>
                 )}
               </div>

               {/* Settings Module Activation */}
               <button 
                 onClick={handleSettingsClick}
                 className="p-2.5 text-slate-400 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl transition-all"
               >
                 <Settings size={20} />
               </button>
            </div>
            
            {/* Global Theme Toggle - REPOSITIONED BETWEEN SETTINGS AND PROFILE */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 bg-slate-100 dark:bg-slate-800/50 text-sky-600 dark:text-sky-400 hover:bg-sky-500 dark:hover:bg-sky-500 hover:text-white rounded-xl transition-all shadow-sm border border-slate-200 dark:border-slate-700/50 flex items-center justify-center min-w-[42px]"
              title={theme === 'dark' ? "Switch to Light Protocol" : "Switch to Dark Protocol"}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="h-10 w-px bg-slate-200 dark:bg-slate-800/60 mx-1 transition-colors" />
            
            {/* Operator Identify Port */}
            <div className="relative">
              <div 
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu)
                  setShowNotifications(false)
                }}
                className="flex items-center gap-3 pl-2 cursor-pointer group"
              >
                <div className="text-right hidden sm:block transition-all">
                  <p className="text-sm font-black text-slate-900 dark:text-white leading-none uppercase tracking-tight group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                    {profile?.email?.split('@')[0] || 'Unknown Identity'}
                  </p>
                  <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mt-1.5 flex items-center justify-end gap-1.5 leading-none transition-all">
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
                  className={`h-11 w-11 rounded-[14px] bg-slate-100 dark:bg-slate-800 border-[1.5px] overflow-hidden shadow-xl dark:shadow-2xl p-0.5 transition-all ${showProfileMenu ? 'border-sky-500' : 'border-slate-200 dark:border-slate-700 group-hover:border-sky-500/50'}`}
                >
                   <img 
                      src={moodAvatar} 
                      alt="Avatar" 
                      className="rounded-[10px] w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   />
                </div>
              </div>

              {/* Profile Dropdown Context Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-4 w-60 bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 transition-colors flex flex-col gap-2">
                     <DialogTitle className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight truncate leading-none">{profile?.email || 'root@kpisync.elite'}</DialogTitle>
                     <p className="text-[9px] font-black text-sky-600 dark:text-sky-500 uppercase tracking-[0.2em] leading-none transition-all">Status: Authorized</p>
                  </div>
                  <div className="p-2 transition-all">
                     <button 
                        onClick={() => {
                          navigate('/profile')
                          setShowProfileMenu(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-left"
                     >
                        <User size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">My Profile</span>
                     </button>
                     <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-left">
                        <ShieldCheck size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Security Access</span>
                     </button>
                     <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-2 transition-colors" />
                     <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-500/10 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-500 transition-all text-left group"
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

        {/* Dynamic Outlet Delivery Stage */}
        <div className="p-8 lg:p-12 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">
           <Outlet />
        </div>
        
        {/* Hardware-Metadata Peripheral Footer */}
        <footer className="px-12 pb-12 opacity-30 pointer-events-none transition-colors">
           <div className="border-t border-slate-200 dark:border-slate-800/40 pt-8 flex justify-between items-center transition-all">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-900 dark:text-slate-400">KPISync ENTERPRISE OS V2.0 • PROTOCOL ACTIVE</p>
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-900 dark:text-slate-400 transition-all">BUILD: 14042024</p>
           </div>
        </footer>
      </main>
    </div>
  )
}
