import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { 
  Mail, 
  Lock, 
  Shield, 
  User as UserIcon, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Activity, 
  Briefcase,
  UserCheck
} from 'lucide-react'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('staff') // 'staff' or 'admin'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isResetting, setIsResetting] = useState(false)
  const [message, setMessage] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  
  const { signIn, signUp, sendResetPasswordEmail } = useAuth()

  // Auto-Save Integration
  useEffect(() => {
    const savedEmail = localStorage.getItem('kpisync_last_email')
    if (savedEmail) {
      setEmail(savedEmail)
    }
  }, [])

  const handleEmailChange = (e) => {
    const val = e.target.value
    setEmail(val)
    localStorage.setItem('kpisync_last_email', val)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      if (isResetting) {
        await sendResetPasswordEmail(email)
        setMessage('Reset link sent! Please check your corporate inbox.')
        setError(null)
      } else if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password, role)
      }
    } catch (err) {
      setError(err.message)
      setMessage(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-6 py-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header & Logo */}
      <div className="text-center mb-12 relative z-10 scale-90 md:scale-100">
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.4em]">V2.0 Elite</span>
         </div>
         
         <div className="flex flex-col items-center gap-2 mb-8">
            <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 leading-none">
              KPISync
            </h1>
            <p className="text-[10px] font-black text-white uppercase tracking-[0.5em] opacity-40">Enterprise Suite</p>
         </div>

         <h2 className="text-4xl font-black text-white tracking-tight mb-4">
            {isResetting ? 'Reset Protocol' : (isLogin ? 'Welcome Back' : 'Identity Protocol')}
         </h2>
         <p className="text-slate-500 font-medium tracking-wide">
            {isResetting 
              ? 'Initiate secure link recovery for your account.' 
              : (isLogin ? 'Sign in to synchronize your metrics.' : 'Register your corporate identity profile.')}
         </p>
      </div>

      {/* Main Auth Card */}
      <div className="w-full max-w-[480px] bg-[#111827] backdrop-blur-xl border border-slate-800/60 rounded-[48px] p-10 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative z-10 transition-all hover:shadow-sky-500/5">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Identity Selector */}
          {!isResetting && (
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Identity Selection</label>
              <div className="bg-slate-950 p-1.5 rounded-[24px] flex gap-2 border border-slate-900">
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${role === 'admin' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-600 hover:text-slate-400'}`}
                >
                  <Shield size={16} /> The Boss
                </button>
                <button
                  type="button"
                  onClick={() => setRole('staff')}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${role === 'staff' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-600 hover:text-slate-400'}`}
                >
                  <Briefcase size={16} /> The Staff
                </button>
              </div>
            </div>
          )}

          {/* Input Fields */}
          <div className="space-y-6">
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 transition-colors" size={20} />
              <input
                type="email"
                placeholder="Corporate Email"
                className="w-full bg-slate-950 border border-slate-800/60 rounded-[24px] py-6 pl-16 pr-8 text-white placeholder-slate-600 font-bold focus:outline-none focus:border-sky-500/50 focus:bg-slate-950 transition-all shadow-inner"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            {!isResetting && (
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 transition-colors" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Secure Access Key"
                  className="w-full bg-slate-950 border border-slate-800/60 rounded-[24px] py-6 pl-16 pr-16 text-white placeholder-slate-600 font-bold focus:outline-none focus:border-sky-500/50 focus:bg-slate-950 transition-all shadow-inner"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            )}
          </div>

          {/* Reset Protocol Link */}
          {isLogin && !isResetting && (
            <div className="flex justify-end pr-2">
              <button
                type="button"
                onClick={() => {
                  setIsResetting(true)
                  setError(null)
                  setMessage(null)
                }}
                className="text-[10px] font-black text-slate-500 hover:text-sky-400 transition-all uppercase tracking-[0.2em]"
              >
                Reset Protocol?
              </button>
            </div>
          )}

          {/* Status Messages */}
          {error && (
            <div className="bg-rose-500/10 text-rose-500 text-[11px] font-black p-5 rounded-2xl border border-rose-500/20 animate-in shake duration-300 uppercase tracking-tight">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-emerald-500/10 text-emerald-400 text-[11px] font-black p-5 rounded-2xl border border-emerald-500/20 uppercase tracking-tight">
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 text-white font-black py-7 rounded-[32px] flex items-center justify-center gap-4 shadow-[0_0_40px_rgba(14,165,233,0.4)] hover:shadow-sky-500/60 transition-all active:scale-[0.98] group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-[12px] uppercase tracking-[0.3em]">
              {loading ? 'Processing...' : (isResetting ? 'Send Restore Link' : (isLogin ? 'Initiate Sync' : 'Register Identity'))}
            </span>
            {!loading && <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />}
          </button>
        </form>

        {/* Request Access Link */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 text-[11px] font-black uppercase tracking-widest leading-none">
            {isResetting ? (
              <button
                type="button"
                onClick={() => setIsResetting(false)}
                className="text-sky-400 hover:text-sky-300 transition-all flex items-center gap-2 mx-auto"
              >
                Back To Login
              </button>
            ) : (
              <>
                {isLogin ? 'New to the ecosystem?' : 'Identity Registered?'}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-3 text-sky-400 hover:text-sky-300 transition-all border-b border-transparent hover:border-sky-400 pb-0.5"
                >
                  {isLogin ? 'REQUEST ENTERPRISE ACCESS' : 'LOGIN TO ACCESS'}
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Global Footer Icons */}
      <div className="fixed bottom-12 flex justify-center gap-12 text-slate-700 relative z-10">
        <div className="flex items-center gap-3 group">
           <Shield size={16} className="text-slate-800 group-hover:text-emerald-500 transition-colors" />
           <span className="text-[9px] font-black uppercase tracking-[0.4em] group-hover:text-slate-500 transition-colors">Encrypted</span>
        </div>
        <div className="flex items-center gap-3 group">
           <Activity size={16} className="text-slate-800 group-hover:text-sky-500 transition-colors" />
           <span className="text-[9px] font-black uppercase tracking-[0.4em] group-hover:text-slate-500 transition-colors">Real-Time</span>
        </div>
      </div>
    </div>
  )
}
