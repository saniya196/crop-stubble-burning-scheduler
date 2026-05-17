import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { checkEmail } from '../api/auth';
import {
  getEmailHelperText,
  getPasswordHelperText,
  getPasswordRequirements,
  validateEmail,
  validatePassword,
} from '../utils/validation';

const initialEmailState = { state: 'idle', message: '' };

const requirementLabels = [
  { key: 'length', label: '8+ characters' },
  { key: 'uppercase', label: 'One uppercase letter' },
  { key: 'lowercase', label: 'One lowercase letter' },
  { key: 'number', label: 'One number' },
  { key: 'special', label: 'One special character' },
];

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [emailFeedback, setEmailFeedback] = useState(initialEmailState);
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const { login, signup } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const emailRequestRef = useRef(0);

  const passwordRequirements = getPasswordRequirements(password);
  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);
  const emailCheckPassed = emailFeedback.state === 'valid';
  const allValid = emailIsValid && passwordIsValid && emailCheckPassed;
  const canSubmit = allValid && !loading;

  useEffect(() => {
    setSubmitError('');

    if (!email.trim()) {
      setEmailFeedback(initialEmailState);
      return;
    }

    if (!validateEmail(email)) {
      setEmailFeedback({ state: 'invalid', message: 'Please enter a valid email address' });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const requestId = emailRequestRef.current + 1;
    emailRequestRef.current = requestId;

    setEmailFeedback({ state: 'checking', message: 'Checking email status...' });

    const timer = window.setTimeout(async () => {
      try {
        const response = await checkEmail(normalizedEmail);
        if (emailRequestRef.current !== requestId) {
          return;
        }

        const exists = Boolean(response.data?.exists);
        const nextState = mode === 'signup'
          ? (exists ? 'invalid' : 'valid')
          : (exists ? 'valid' : 'invalid');

        const nextMessage = mode === 'signup'
          ? (exists ? 'Email already registered' : 'Email available')
          : (exists ? 'Email found' : 'Email not found');

        setEmailFeedback({ state: nextState, message: nextMessage });
      } catch {
        if (emailRequestRef.current === requestId) {
          setEmailFeedback({ state: 'error', message: 'Unable to verify email right now' });
        }
      }
    }, 450);

    return () => window.clearTimeout(timer);
  }, [email, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!allValid) {
      setSubmitError('Please fix the highlighted validations before continuing');
      return;
    }

    setLoading(true);
    const result = mode === 'login'
      ? await login(email.trim(), password)
      : await signup(email.trim(), password);

    if (result.success) {
      addToast(mode === 'login' ? 'Welcome back!' : 'Account created successfully', 'success');
      navigate('/');
      return;
    }

    setSubmitError(result.error);
    setLoading(false);
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setSubmitError('');
    setEmailFeedback(initialEmailState);
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    const result = await login('farmer@example.com', 'password123');
    if (result.success) {
      addToast('Demo account loaded successfully!', 'success');
      navigate('/');
      return;
    }

    setSubmitError(result.error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(22,163,74,0.20),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(37,99,235,0.15),_transparent_28%),linear-gradient(135deg,_#0f172a,_#14532d_55%,_#1e293b)] px-4 py-6 md:px-6 md:py-8 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-6xl grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-center animate-fadeUp">
        <section className="hidden lg:block text-white pr-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 mb-6">
            <span>🌾</span>
            <span className="text-sm font-semibold tracking-wide uppercase">StubbleSched</span>
          </div>
          <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight mb-5">
            Cleaner scheduling with safer access controls.
          </h1>
          <p className="text-lg text-white/80 max-w-xl mb-8 leading-relaxed">
            Validate email format, enforce strong passwords, and verify account existence before the app accepts a login or signup.
          </p>
          <div className="grid gap-4 max-w-lg">
            <div className="rounded-2xl border border-white/10 bg-white/8 backdrop-blur px-5 py-4">
              <p className="font-semibold mb-1">Real-time checks</p>
              <p className="text-sm text-white/75">Email and password feedback updates while typing, without waiting for form submission.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/8 backdrop-blur px-5 py-4">
              <p className="font-semibold mb-1">Responsive by default</p>
              <p className="text-sm text-white/75">The login screen, sidebar, and content shell now adapt cleanly from small phones to large desktops.</p>
            </div>
          </div>
        </section>

        <section className="bg-white/96 backdrop-blur-xl rounded-3xl shadow-[0_30px_80px_rgba(15,23,42,0.25)] border border-white/20 p-5 sm:p-8 lg:p-10">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="lg:hidden inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-green text-xs font-semibold mb-3">
                <span>🌾</span>
                <span>StubbleSched</span>
              </div>
              <h2 className="text-3xl font-bold text-ink">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
              <p className="text-sm text-gray-500 mt-2">
                {mode === 'login'
                  ? 'Sign in with validated credentials.'
                  : 'Register only after format, password, and email checks pass.'}
              </p>
            </div>
            <div className="hidden sm:flex rounded-2xl bg-ink/5 p-1 gap-1">
              <button
                type="button"
                onClick={() => handleModeChange('login')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${mode === 'login' ? 'bg-ink text-white shadow-soft' : 'text-gray-600 hover:text-ink'}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('signup')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${mode === 'signup' ? 'bg-green text-white shadow-soft' : 'text-gray-600 hover:text-ink'}`}
              >
                Signup
              </button>
            </div>
          </div>

          <div className="sm:hidden grid grid-cols-2 gap-2 mb-5">
            <button
              type="button"
              onClick={() => handleModeChange('login')}
              className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${mode === 'login' ? 'bg-ink text-white' : 'bg-ink/5 text-gray-600'}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('signup')}
              className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${mode === 'signup' ? 'bg-green text-white' : 'bg-ink/5 text-gray-600'}`}
            >
              Signup
            </button>
          </div>

          {submitError && (
            <div className="mb-5 rounded-2xl border border-red/20 bg-red/5 px-4 py-3 text-red text-sm font-medium flex items-start gap-3 animate-fadeUp">
              <span>✕</span>
              <span>{submitError}</span>
            </div>
          )}

          {allValid && !loading && (
            <div className="mb-5 rounded-2xl border border-green/20 bg-green/8 px-4 py-3 text-green text-sm font-semibold flex items-center gap-2 animate-fadeUp">
              <span>✓</span>
              <span>All validations passed ✅</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="auth-email" className="block text-sm font-semibold text-ink mb-2">
                Email address
              </label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailTouched(true);
                }}
                onBlur={() => setEmailTouched(true)}
                placeholder="user@gmail.com"
                autoComplete="email"
                disabled={loading}
                className={`w-full px-4 py-3 rounded-2xl border bg-white outline-none transition-all duration-200 focus:ring-4 ${
                  emailTouched && !emailIsValid
                    ? 'border-red/40 focus:ring-red/10'
                    : emailFeedback.state === 'valid'
                      ? 'border-green/40 focus:ring-green/10'
                      : 'border-gray-300 focus:ring-green/10'
                } disabled:opacity-60`}
              />
              <div className="mt-2 min-h-5 text-sm transition-all duration-200">
                {emailTouched && !email && <p className="text-red">Email is required</p>}
                {emailTouched && email && !emailIsValid && <p className="text-red">Please enter a valid email address</p>}
                {emailIsValid && emailFeedback.message && (
                  <p className={`${emailFeedback.state === 'invalid' || emailFeedback.state === 'error' ? 'text-red' : 'text-green'}`}>
                    {emailFeedback.state === 'checking' ? 'Checking email status...' : emailFeedback.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="auth-password" className="block text-sm font-semibold text-ink mb-2">
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordTouched(true);
                }}
                onBlur={() => setPasswordTouched(true)}
                placeholder="••••••••"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                disabled={loading}
                className={`w-full px-4 py-3 rounded-2xl border bg-white outline-none transition-all duration-200 focus:ring-4 ${
                  passwordTouched && !passwordIsValid
                    ? 'border-red/40 focus:ring-red/10'
                    : passwordIsValid
                      ? 'border-green/40 focus:ring-green/10'
                      : 'border-gray-300 focus:ring-green/10'
                } disabled:opacity-60`}
              />
              <div className="mt-2 min-h-5 text-sm transition-all duration-200">
                {passwordTouched && !password && <p className="text-red">Password is required</p>}
                {passwordTouched && password && !passwordIsValid && <p className="text-red">{getPasswordHelperText(password)}</p>}
                {passwordIsValid && <p className="text-green">Password looks strong</p>}
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {requirementLabels.map((item) => {
                  const met = passwordRequirements[item.key];
                  return (
                    <div
                      key={item.key}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${met ? 'border-green/30 bg-green/5 text-green' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
                    >
                      <span>{met ? '✓' : '•'}</span>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {mode === 'signup' && (
              <div className="rounded-2xl border border-blue/15 bg-blue/5 px-4 py-3 text-sm text-ink/80">
                {getEmailHelperText(email)}
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full px-4 py-3 rounded-2xl font-semibold text-white transition-all duration-200 shadow-soft flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-600 hover:to-green"
            >
              {loading ? '⟳ Validating...' : mode === 'login' ? '🔓 Login' : '✨ Create account'}
            </button>
          </form>

          {mode === 'login' && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">Demo access</span>
                </div>
              </div>

              <button
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full px-4 py-3 rounded-2xl bg-ink/5 text-ink font-semibold hover:bg-ink/10 transition border border-gray-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? '⟳ Loading...' : '🚀 Demo Login'}
              </button>

              <div className="mt-5 p-4 rounded-2xl bg-ink/5 border border-gray-200 text-sm text-gray-600">
                <p className="font-semibold text-ink mb-1">Test account</p>
                <p className="font-mono text-xs break-all">farmer@example.com / password123</p>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}