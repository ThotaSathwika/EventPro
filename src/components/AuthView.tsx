import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Key, KeyRound, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { AppUser, ThemePalette } from '../types';

interface AuthViewProps {
  theme: ThemePalette;
  users: AppUser[];
  onLoginSuccess: (user: AppUser) => void;
  onRegisterUser: (name: string, email: string, pass: string) => void;
  onResetPassword: (email: string, pass: string) => boolean;
}

export default function AuthView({
  theme,
  users,
  onLoginSuccess,
  onRegisterUser,
  onResetPassword
}: AuthViewProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  
  // Field values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [resetCompleted, setResetCompleted] = useState(false);

  // UI state feedback
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPass, setShowPass] = useState(false);

  // Form submit handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please supply both email address and password credentials.');
      return;
    }

    const matchedUser = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!matchedUser) {
      setErrorMsg('No registered account details found match with that email.');
      return;
    }

    if (matchedUser.isBanned) {
      setErrorMsg('Access denied. This user account has been banned/suspended by system administrators.');
      return;
    }

    // Since this is a local simulated database, we accept any password for seeded users, 
    // or validate custom passwords with simple fallback:
    if (matchedUser.password && matchedUser.password !== password) {
      setErrorMsg('Invalid password entered. Please try again.');
      return;
    }

    onLoginSuccess(matchedUser);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name || !email || !password) {
      setErrorMsg('All registration detail entry fields are strictly required.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('For security, your password must contain at least 6 characters.');
      return;
    }

    const emailExist = users.some(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (emailExist) {
      setErrorMsg('That email address is already associated with another active profile.');
      return;
    }

    onRegisterUser(name, email, password);
    setSuccessMsg(`Welcome aboard! Account details verified for ${name}. Loading interface...`);
  };

  const handleSendReset = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email) {
      setErrorMsg('Please state your registered accounts email address to proceed.');
      return;
    }

    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      setErrorMsg('Email matching database row not found. Check and retry.');
      return;
    }

    // Mock code send
    setResetCode('EPRO-4819');
    setCodeSent(true);
    setSuccessMsg('Mock secure reset access token generated. Use verification code: EPRO-4819');
  };

  const handleCompleteReset = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (resetCode !== 'EPRO-4819') {
      setErrorMsg('Invalid simulated confirmation security code. Verify token detail and retry.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('New password is essential and must be at least 6 characters in length.');
      return;
    }

    const ok = onResetPassword(email, password);
    if (ok) {
      setResetCompleted(true);
      setSuccessMsg('Passkey restored! Your credentials have been securely updated. You can log in now.');
      setTimeout(() => {
        setMode('login');
        setPassword('');
        setCodeSent(false);
        setResetCompleted(false);
        setSuccessMsg('');
      }, 3500);
    } else {
      setErrorMsg('An internal error occurred while trying to restore profile password.');
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4 relative z-50">
      
      {/* Brand Launcher banner */}
      <motion.div 
        className="flex items-center gap-2.5 mb-8 select-none"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className={`w-10 h-10 rounded-2xl ${theme.accentBg} ${theme.glowShadow} flex items-center justify-center text-white border border-white/10`}>
          <KeyRound className="w-5 h-5 animate-pulse" />
        </div>
        <span className="text-2xl font-black tracking-tight text-white uppercase font-sans">
          Event<span className={theme.accentColor}>Pro</span> Secure
        </span>
      </motion.div>

      <motion.div
        className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.5)] overflow-hidden relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Background gradient subtle flare */}
        <div className={`absolute top-0 right-0 w-32 h-32 ${theme.bubbleColors[0]} opacity-20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none`}></div>
        <div className={`absolute bottom-0 left-0 w-32 h-32 ${theme.bubbleColors[1]} opacity-10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none`}></div>

        <AnimatePresence mode="wait">
          {mode === 'login' && (
            <motion.div
              key="login"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-1.5 text-left">
                <h3 className="text-xl font-bold tracking-tight text-white font-headline-lg-mobile">Sign In Profile</h3>
                <p className="text-xs text-slate-400 font-semibold">Welcome back! Please access your Event Management workspace.</p>
              </div>

              {errorMsg && (
                <div className="flex gap-2.5 items-start p-3 bg-rose-500/15 border border-rose-500/25 rounded-2xl text-[11px] font-bold text-rose-300 leading-normal">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="flex gap-2.5 items-start p-3 bg-emerald-500/15 border border-emerald-500/25 rounded-2xl text-[11px] font-bold text-emerald-300 leading-normal">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Mail className="w-4 h-4" /></span>
                    <input 
                      type="email" 
                      placeholder="e.g. sathwikathota20@gmail.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-xs outline-none rounded-xl placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Profile Passphrase</label>
                    <button 
                      type="button" 
                      onClick={() => setMode('forgot')}
                      className={`text-[10px] font-bold ${theme.accentColor} hover:underline cursor-pointer`}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Lock className="w-4 h-4" /></span>
                    <input 
                      type={showPass ? 'text' : 'password'} 
                      placeholder="Enter minimum 6 character password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3 border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-xs outline-none rounded-xl placeholder:text-slate-500"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl ${theme.accentBg} ${theme.accentHoverBg} text-white font-bold text-xs ${theme.glowShadow} transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2`}
                >
                  <span>Authenticate Credentials</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-2 text-center text-xs">
                <span className="text-slate-400 font-semibold">New to EventPro ecosystems? </span>
                <button 
                  onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`${theme.accentColor} font-bold hover:underline cursor-pointer`}
                >
                  Create free Account
                </button>
              </div>

              {/* Seed Creds Helper notice */}
              <div className="p-3 bg-white/3 border border-white/5 rounded-2xl text-[10px] text-slate-400 font-medium leading-relaxed text-left space-y-1">
                <p className="font-bold text-slate-300">💡 Local Prototype Seed Logins:</p>
                <p>• Admin: <span className="font-bold text-indigo-300">sathwikathota20@gmail.com</span> (any password or blank)</p>
                <p>• Guest: <span className="font-bold text-emerald-300">guest@eventpro.io</span></p>
                <p>• Banned: <span className="font-bold text-rose-300">banned_user@eventpro.io</span> (test restriction rules)</p>
              </div>

            </motion.div>
          )}

          {mode === 'signup' && (
            <motion.div
              key="signup"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-1.5 text-left">
                <h3 className="text-xl font-bold tracking-tight text-white font-headline-lg-mobile">Create Account</h3>
                <p className="text-xs text-slate-400 font-semibold">Join the logistics network to manage or coordinate regional event schedules.</p>
              </div>

              {errorMsg && (
                <div className="flex gap-2.5 items-start p-3 bg-rose-500/15 border border-rose-500/25 rounded-2xl text-[11px] font-bold text-rose-300 leading-normal">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="flex gap-2.5 items-start p-3 bg-emerald-500/15 border border-emerald-500/25 rounded-2xl text-[11px] font-bold text-emerald-300 leading-normal">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><User className="w-4 h-4" /></span>
                    <input 
                      type="text" 
                      placeholder="e.g. Sathwika Thota" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-xs outline-none rounded-xl placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Mail className="w-4 h-4" /></span>
                    <input 
                      type="email" 
                      placeholder="e.g. user@domain.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-xs outline-none rounded-xl placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Choose Passphrase</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Lock className="w-4 h-4" /></span>
                    <input 
                      type={showPass ? 'text' : 'password'} 
                      placeholder="Minimum 6 characters long" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3 border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-xs outline-none rounded-xl placeholder:text-slate-500"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl ${theme.accentBg} ${theme.accentHoverBg} text-white font-bold text-xs ${theme.glowShadow} transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2`}
                >
                  <span>Build Logistical Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-2 text-center text-xs">
                <span className="text-slate-400 font-semibold">Already have an registered account? </span>
                <button 
                  onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`${theme.accentColor} font-bold hover:underline cursor-pointer`}
                >
                  Log In Profile
                </button>
              </div>
            </motion.div>
          )}

          {mode === 'forgot' && (
            <motion.div
              key="forgot"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-1.5 text-left">
                <h3 className="text-xl font-bold tracking-tight text-white font-headline-lg-mobile">Reset Passkey</h3>
                <p className="text-xs text-slate-400 font-semibold">Recover profile access safely. Retrospect simulated token dispatch.</p>
              </div>

              {errorMsg && (
                <div className="flex gap-2.5 items-start p-3 bg-rose-500/15 border border-rose-500/25 rounded-2xl text-[11px] font-bold text-rose-300 leading-normal">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="flex gap-2.5 items-start p-3 bg-emerald-500/15 border border-emerald-500/25 rounded-2xl text-[11px] font-bold text-emerald-300 leading-normal">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                  <span>{successMsg}</span>
                </div>
              )}

              {!codeSent ? (
                <form onSubmit={handleSendReset} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Account Email</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Mail className="w-4 h-4" /></span>
                      <input 
                        type="email" 
                        placeholder="e.g. sathwikathota20@gmail.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-xs outline-none rounded-xl placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 rounded-xl ${theme.accentBg} ${theme.accentHoverBg} text-white font-bold text-xs ${theme.glowShadow} transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2`}
                  >
                    <span>Request Reset Token</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleCompleteReset} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Validation Security Code</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Key className="w-4 h-4" /></span>
                      <input 
                        type="text" 
                        placeholder="Enter simulated code: EPRO-4819" 
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-xs outline-none rounded-xl placeholder:text-slate-500"
                        disabled={resetCompleted}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Set New Password</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Lock className="w-4 h-4" /></span>
                      <input 
                        type={showPass ? 'text' : 'password'} 
                        placeholder="Enter absolute minimum 6 characters" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-3 border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-xs outline-none rounded-xl placeholder:text-slate-500"
                        disabled={resetCompleted}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={resetCompleted}
                    className={`w-full py-3 rounded-xl ${theme.accentBg} ${theme.accentHoverBg} text-white font-bold text-xs ${theme.glowShadow} transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50`}
                  >
                    <span>Store New Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              <div className="pt-2 text-center text-xs">
                <button 
                  onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); setCodeSent(false); }}
                  className="text-slate-400 font-bold hover:text-white hover:underline cursor-pointer"
                >
                  Wait, recall password and double check? Go back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
