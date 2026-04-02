import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { useAuth } from './hooks/useAuth'
import AuthForm from './pages/AuthForm'
import BossDashboard from './pages/BossDashboard'
import StaffDashboard from './pages/StaffDashboard'
import AutoBreakdownEngine from './pages/AutoBreakdownEngine'
import MyKPIs from './pages/MyKPIs'
import FlaggedIssues from './pages/FlaggedIssues'
import Layout from './components/Layout'

function App() {
  const { user, profile, loading, setUser, setProfile, setLoading, fetchProfile } = useAuth()

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [setUser, setProfile, setLoading, fetchProfile])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <AuthForm /> : <Navigate to="/" />} />
        
        <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={
            profile?.role === 'admin' ? <BossDashboard /> : <StaffDashboard />
          } />
          <Route path="/goals" element={<BossDashboard />} />
          <Route path="/goals/:id/breakdown" element={<AutoBreakdownEngine />} />
          <Route path="/my-kpis" element={<MyKPIs />} />
          <Route path="/flagged-issues" element={<FlaggedIssues />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
