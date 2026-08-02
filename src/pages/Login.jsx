import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Swords, ArrowRight, Zap, Shield, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [isReset, setIsReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    setLoading(true);

    if (isReset) {
      try {
        await resetPassword(email);
        setMsg('Password reset link sent to your email kindly check in spam.');
      } catch (err) {
        setError(err.message.replace('Firebase: ', ''));
      }
    } else {
      try {
        await login(email, password);
        navigate('/');
      } catch (err) {
        setError(err.code === 'auth/invalid-credential'
          ? 'Invalid email or password.'
          : err.message.replace('Firebase: ', ''));
      }
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }
  };

  // Generate code rain
  const [codeLines] = useState(() => Array.from({ length: 15 }, () => ({
    id: Math.random(),
    left: `${Math.random() * 100}%`,
    duration: `${10 + Math.random() * 15}s`,
    delay: `${Math.random() * 10}s`,
    text: ['BFS', 'DFS', 'O(n)', 'O(log n)', 'DP', 'Trie', 'Graph', 'Tree', 'Array', 'Map'].sort(() => 0.5 - Math.random()).join(' ')
  })));

  return (
    <div className="login-3d-scene" style={{ background: 'var(--bg-primary)', width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Code Rain */}
      {codeLines.map((code) => (
        <div key={code.id} className="code-rain" style={{
          left: code.left,
          animationDuration: code.duration,
          animationDelay: code.delay,
        }}>
          {code.text}
        </div>
      ))}

      <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', zIndex: 10 }}>
        {/* Left: Branding panel (desktop) */}
        <div className="hidden lg:flex" style={{
          flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          padding: '60px', position: 'relative', zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{ maxWidth: '420px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                boxShadow: '0 8px 32px rgba(139,92,246,0.5)',
              }}>
                <Swords size={32} color="white" />
              </div>
              <div>
                <h1 className="gradient-text" style={{ fontSize: '36px', fontWeight: 900 }}>DSA WAR</h1>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Conquer Every Pattern</p>
              </div>
            </div>

            <h2 style={{ fontSize: '40px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '20px' }}>
              Master Data Structures<br />& Algorithms
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '40px' }}>
              Track your progress across 244+ patterns. Build streaks, set goals, and conquer every DSA concept with our premium tracking system.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: Zap, text: '244+ DSA patterns organized by category', color: '#f59e0b' },
                { icon: Shield, text: 'Track progress with daily streaks & goals', color: '#10b981' },
                { icon: Trophy, text: 'Confetti celebrations on completion', color: '#8b5cf6' },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.15, type: 'spring' }}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '16px 20px', borderRadius: '16px',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${f.color}15`,
                  }}>
                    <f.icon size={20} style={{ color: f.color }} />
                  </div>
                  <span style={{ fontSize: '15px', color: 'var(--text-secondary)', fontWeight: 500 }}>{f.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Login form */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px', position: 'relative', zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', delay: 0.1 }}
            className="card-3d"
            style={{
              width: '100%', maxWidth: '440px', padding: '48px 40px',
              transform: 'none', perspective: 'none', transformStyle: 'flat'
            }}
          >
            <div>
              {/* Mobile logo */}
              <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', justifyContent: 'center' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                }}>
                  <Swords size={24} color="white" />
                </div>
                <h1 className="gradient-text" style={{ fontSize: '26px', fontWeight: 900 }}>DSA WAR</h1>
              </div>

              <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {isReset ? 'Reset Password' : 'Welcome back'}
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '32px' }}>
                {isReset ? "Enter your email and we'll send you a reset link" : 'Sign in to continue your conquest'}
              </p>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{
                    padding: '14px 16px', borderRadius: '12px', marginBottom: '24px',
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    fontSize: '14px', color: '#f87171',
                    boxShadow: '0 4px 12px rgba(239,68,68,0.1)'
                  }}
                >
                  {error}
                </motion.div>
              )}

              {msg && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{
                    padding: '14px 16px', borderRadius: '12px', marginBottom: '24px',
                    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                    fontSize: '14px', color: '#34d399',
                    boxShadow: '0 4px 12px rgba(16,185,129,0.1)'
                  }}
                >
                  {msg}
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Email</label>
                  <div className="input-group" style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 2 }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="input-field"
                      style={{
                        width: '100%', padding: '14px 16px 14px 46px', borderRadius: '14px',
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                        color: 'var(--text-primary)', fontSize: '15px', outline: 'none', transition: 'all 0.2s'
                      }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--accent-purple)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                    />
                  </div>
                </div>

                {/* Password */}
                {!isReset && (
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
                      <button
                        type="button"
                        onClick={() => { setIsReset(true); setError(''); setMsg(''); }}
                        style={{ background: 'none', border: 'none', fontSize: '13px', color: 'var(--accent-cyan)', cursor: 'pointer', fontWeight: 600, transition: 'text-shadow 0.2s' }}
                        onMouseOver={(e) => e.target.style.textShadow = '0 0 10px var(--accent-cyan)'}
                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="input-group" style={{ position: 'relative' }}>
                      <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 2 }} />
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="input-field"
                        style={{
                          width: '100%', padding: '14px 46px 14px 46px', borderRadius: '14px',
                          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                          color: 'var(--text-primary)', fontSize: '15px', outline: 'none', transition: 'all 0.2s'
                        }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--accent-purple)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        style={{
                          position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                          background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                          padding: '2px', display: 'flex', zIndex: 2
                        }}
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)',
                    cursor: loading ? 'wait' : 'pointer', fontSize: '16px', fontWeight: 700,
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    boxShadow: '0 8px 24px rgba(139,92,246,0.4), inset 0 2px 10px rgba(255,255,255,0.3)',
                    opacity: loading ? 0.7 : 1, transition: 'all 0.2s', marginBottom: '20px'
                  }}
                  onMouseOver={(e) => { if(!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(139,92,246,0.5), inset 0 2px 10px rgba(255,255,255,0.4)'; } }}
                  onMouseOut={(e) => { if(!loading) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(139,92,246,0.4), inset 0 2px 10px rgba(255,255,255,0.3)'; } }}
                >
                  {loading ? 'Processing...' : isReset ? 'Send Reset Link' : <>Sign In <ArrowRight size={18} /></>}
                </button>
                
                {isReset && (
                  <div style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => { setIsReset(false); setError(''); setMsg(''); }}
                      style={{ background: 'none', border: 'none', fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                    >
                      Back to Sign In
                    </button>
                  </div>
                )}
              </form>

              {!isReset && (
                <div>
                  {/* Divider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '28px 0' }}>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1))' }} />
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(255,255,255,0.1))' }} />
                  </div>

                  {/* Google Sign In */}
                  <button
                    onClick={handleGoogle}
                    style={{
                      width: '100%', padding: '14px', borderRadius: '14px',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer', fontSize: '15px', fontWeight: 600,
                      color: 'var(--text-primary)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '12px', transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.41l3.56-2.76.01-.56z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </button>
                </div>
              )}

              {/* Register link */}
              <p style={{ marginTop: '28px', textAlign: 'center', fontSize: '15px', color: 'var(--text-muted)' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: 'var(--accent-purple)', fontWeight: 600, textDecoration: 'none', padding: '4px' }}>
                  Sign up free
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
