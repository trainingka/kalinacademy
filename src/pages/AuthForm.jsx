import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { Target, ShieldCheck, Mail, Key, User, Zap, Lock } from 'lucide-react'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState('staff') // 'admin' or 'staff'
  const navigate = useNavigate()

  useEffect(() => {
    const savedEmail = localStorage.getItem('kpisync_email')
    if (savedEmail) setEmail(savedEmail)
  }, [])

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    localStorage.setItem('kpisync_email', email)
    
    try {
      // Demo logic: If email doesn't exist, sign up, then sign in
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { role: role }
            }
          })
          if (signUpError) throw signUpError
          alert('Account created! Please sign in with those credentials.')
        } else {
          throw signInError
        }
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex flex-col items-center justify-center p-6 transition-colors duration-500 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center mb-10">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6 shadow-inner transition-colors">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em]">V2.0 Elite Security</span>
           </div>
           
           <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-12 w-12 bg-sky-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.5)]">
                 <Target size={28} className="text-white" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none transition-colors">KPISync</h1>
           </div>
           
           <h2 className="text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-2 leading-none transition-colors">Welcome Back</h2>
           <p className="text-xs font-medium text-slate-400 dark:text-slate-500 tracking-wide transition-colors">Sign in to synchronize your enterprise metrics.</p>
        </div>

        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/60 rounded-[40px] p-10 shadow-2xl transition-all">
           <form onSubmit={handleAuth} className="space-y-8">
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1 leading-none">Identity Selection</label>
                 <div className="grid grid-cols-2 gap-4 p-1.5 bg-slate-50 dark:bg-slate-950 rounded-[22px] border border-slate-200 dark:border-slate-800 transition-colors">
                    <button 
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`flex items-center justify-center gap-3 py-3.5 rounded-2xl transition-all uppercase tracking-widest text-[9px] font-black ${role === 'admin' ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'}`}
                    >
                       <ShieldCheck size={16} />
                       THE BOSS
                    </button>
                    <button 
                      type="button"
                      onClick={() => setRole('staff')}
                      className={`flex items-center justify-center gap-3 py-3.5 rounded-2xl transition-all uppercase tracking-widest text-[9px] font-black ${role === 'staff' ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'}`}
                    >
                       <User size={16} />
                       THE STAFF
                    </button>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-700 group-focus-within:text-sky-500 transition-colors">
                       <Mail size={20} />
                    </div>
                    <input 
                      type="email" 
                      placeholder="ENTER IDENTITY EMAIL"
                      className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 pl-14 text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-800 focus:border-sky-500 outline-none transition-all shadow-inner dark:shadow-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                 </div>

                 <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-700 group-focus-within:text-sky-500 transition-colors">
                       <Key size={20} />
                    </div>
                    <input 
                      type="password" 
                      placeholder="PROTECTION KEY"
                      className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 pl-14 text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-800 focus:border-sky-500 outline-none transition-all shadow-inner dark:shadow-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-sky-500 text-white font-black py-5 rounded-[22px] shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-sky-500/60 transition-all uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 overflow-hidden relative group"
              >
                 <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                 {loading ? <Zap className="animate-spin" size={20} /> : <Lock size={20} />}
                 {loading ? 'SYNCHRONIZING...' : 'AUTHORIZE ACCESS'}
              </button>
           </form>

           <div className="mt-10 flex items-center justify-between px-2">
              <button className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest hover:text-sky-500 transition-colors leading-none">Emergency Reset</button>
              <div className="h-1 w-1 bg-slate-300 dark:bg-slate-800 rounded-full" />
              <button className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest hover:text-sky-500 transition-colors leading-none">Security Protocols</button>
           </div>
        </div>

        <div className="mt-12 text-center opacity-30">
           <p className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-[0.5em]">KPISync ENTERPRISE OS V2.0 ELITE</p>
        </div>
      </div>
    </div>
  )
}
