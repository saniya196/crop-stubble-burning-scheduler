import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        addToast(`Welcome back, ${email.split('@')[0]}!`, 'success');
        navigate('/');
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 800);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login('farmer@example.com', 'password123');
      addToast('Demo account loaded successfully!', 'success');
      navigate('/');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green to-blue flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 drop-shadow-lg">🌾</div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">StubbleSched</h1>
          <p className="text-green-100">Crop Stubble Burning Scheduler</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-ink mb-6">Welcome Back</h2>

          {error && (
            <div className="mb-4 p-3 bg-red/10 border border-red/30 rounded-lg text-red text-sm font-semibold flex items-start gap-2">
              <span>✕</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer@example.com"
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent disabled:opacity-50"
              />
              <p className="text-xs text-gray-500 mt-1">Min 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-green text-white font-semibold rounded-lg hover:bg-green/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? '⟳ Logging in...' : '🔓 Login'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or try demo</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full px-4 py-3 bg-gray-100 text-ink font-semibold rounded-lg hover:bg-gray-200 transition border border-gray-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? '⟳ Loading...' : '🚀 Demo Login'}
          </button>

          <div className="mt-6 p-3 bg-blue/5 border border-blue/20 rounded-lg">
            <p className="text-xs font-mono text-gray-700 text-center">
              <strong>Demo:</strong> farmer@example.com / password123
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white text-sm">
          <p>© 2026 StubbleSched</p>
          <p className="text-green-100">Optimizing Crop Stubble Burning Practices</p>
        </div>
      </div>
    </div>
  );
}
