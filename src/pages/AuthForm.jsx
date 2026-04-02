import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Mail, Lock, Shield, User as UserIcon, ArrowRight } from 'lucide-react'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('staff')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password, role)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-sky-500 mb-2">KPISync</h1>
          <p className="text-slate-500 font-medium tracking-wide text-xs uppercase">Precision Performance Orchestration</p>
        </div>

        <div className="glass-card p-8 border-slate-200 shadow-soft">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-slate-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-slate-500 text-sm mt-1">{isLogin ? 'Sign in to synchronize your metrics.' : 'Join the KPI ecosystem today.'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="bg-slate-100 p-1 rounded-xl flex gap-1 mb-6">
                <button
                  type="button"
                  onClick={() => setRole('staff')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${role === 'staff' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <UserIcon size={16} /> The Staff
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${role === 'admin' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Shield size={16} /> The Boss
                </button>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  placeholder="Corporate Email"
                  className="input-field pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  placeholder="Secure Access Key"
                  className="input-field pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 group"
            >
              {loading ? 'Processing...' : (
                <>
                  {isLogin ? 'INITIATE SYNC' : 'REGISTER PROFILE'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
            <p className="text-slate-600 text-sm">
              {isLogin ? 'New to the ecosystem?' : 'Already registered?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-sky-600 font-semibold hover:text-sky-700 hover:underline transition-all"
              >
                {isLogin ? 'REQUEST ENTERPRISE ACCESS' : 'LOGIN TO ACCESS'}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-8 opacity-50">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            <Shield size={12} /> Encrypted
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
             Real-time
          </div>
        </div>
      </div>
    </div>
  )
}
