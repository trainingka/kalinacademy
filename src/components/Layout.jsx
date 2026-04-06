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
  AlertCircle
} from 'lucide-react'

export default function Layout() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const menuItems = profile?.role === 'admin' ? [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Goals Breakdown', icon: Target, path: '/goals' },
    { label: 'Staff Performance', icon: Users, path: '/performance' },
    { label: 'Flag Issues', icon: AlertCircle, path: '/flagged-issues' },
  ] : [
    { label: 'My Daily Tasks', icon: CheckSquare, path: '/' },
    { label: 'My KPIs', icon: Target, path: '/my-kpis' },
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

        <nav className="flex-1 px-4 mt-4 space-y-1.5">
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
            <span className="text-sm font-semibold">Switch Role</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-72 min-h-screen relative">
        {/* Top Header */}
        <header className="h-20 bg-slate-950/40 backdrop-blur-md border-b border-slate-800/40 sticky top-0 z-10 px-8 flex items-center justify-between">
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
              <button className="p-2.5 text-slate-500 hover:text-sky-400 hover:bg-slate-800/50 rounded-xl transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-950" />
              </button>
              <button className="p-2.5 text-slate-500 hover:text-sky-400 hover:bg-slate-800/50 rounded-xl transition-all">
                <Settings size={20} />
              </button>
            </div>
            
            <div className="h-10 w-px bg-slate-800/60 mx-2" />
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white leading-none">{profile?.email.split('@')[0]}</p>
                <p className="text-[10px] font-bold text-sky-500 uppercase tracking-widest mt-1">{profile?.role}</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shadow-lg p-0.5">
                 <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.email}`} 
                    alt="Avatar" 
                    className="rounded-lg w-full h-full object-cover"
                 />
              </div>
            </div>
          </div>
        </header>

        {/* Page Area */}
        <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
