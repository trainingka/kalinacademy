import { Outlet, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LayoutDashboard, Target, Users, CheckSquare, Bell, Settings, LogOut, ChevronRight } from 'lucide-react'

export default function Layout() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const menuItems = profile?.role === 'admin' ? [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Goals Breakdown', icon: Target, path: '/goals' },
    { label: 'Staff Performance', icon: Users, path: '/performance' },
  ] : [
    { label: 'My Daily Tasks', icon: CheckSquare, path: '/' },
    { label: 'My KPIs', icon: Target, path: '/my-kpis' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-slate-900 text-white h-screen hidden md:flex flex-col sticky top-0">
        <div className="p-8">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            KPISync
          </h1>
          <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-1">Enterprise Suite</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all group"
            >
              <item.icon size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all group"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Switch Role</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 p-4 px-8 flex items-center justify-between">
          <div className="md:hidden">
             <h1 className="text-xl font-bold text-sky-500">KPISync</h1>
          </div>
          
          <div className="flex-1 hidden md:block">
            {/* Context breadcrumb if needed */}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Settings size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.email}`} alt="Avatar" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Nav Bar */}
      <nav className="md:hidden bg-white border-t border-slate-200 fixed bottom-0 left-0 right-0 p-2 flex justify-around items-center z-10">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-primary transition-all"
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
