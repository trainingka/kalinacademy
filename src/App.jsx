import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { useAuth } from './hooks/useAuth'
import AuthForm from './pages/AuthForm'
import BossDashboard from './pages/BossDashboard'
import StaffDashboard from './pages/StaffDashboard'
import AutoBreakdownEngine from './pages/AutoBreakdownEngine'
import MyKPIs from './pages/MyKPIs'
import ResetPassword from './pages/ResetPassword'
import FlaggedIssues from './pages/FlaggedIssues'
import StaffPerformance from './pages/StaffPerformance'
import UserProfile from './pages/UserProfile'
import Layout from './components/Layout'

function App() {
  const { user, profile, loading, setUser, setProfile, setLoading, fetchProfile } = useAuth()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      setLoading(false)
    })

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
      <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Explicit Login Route */}
        <Route path="/login" element={!user ? <AuthForm /> : <Navigate to="/dashboard" />} />
        
        {/* Core Application Shell */}
        <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
          {/* Root Redirect to Dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard Routes */}
          <Route path="dashboard" element={<BossDashboard />} />
          <Route path="staff-dashboard" element={<StaffDashboard />} />
          
          {/* Feature Routes */}
          <Route path="breakdown" element={<AutoBreakdownEngine />} />
          <Route path="performance" element={<StaffPerformance />} />
          <Route path="my-kpis" element={<MyKPIs />} />
          <Route path="flagged-issues" element={<FlaggedIssues />} />
          <Route path="profile" element={<UserProfile />} />
          
          {/* Legacy/Deep Link support */}
          <Route path="goals" element={<Navigate to="/dashboard" replace />} />
          <Route path="goals/:id/breakdown" element={<AutoBreakdownEngine />} />
        </Route>
        
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
