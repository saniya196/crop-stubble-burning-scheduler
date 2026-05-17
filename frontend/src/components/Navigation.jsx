import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileMenu = () => setMobileOpen(false);

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/results', label: 'Results' },
    { path: '/gantt', label: 'Gantt Chart' },
    { path: '/complexity', label: 'Complexity' },
    { path: '/comparison', label: 'Comparison' },
    { path: '/extras', label: 'Extras & AI' },
    { path: '/trace', label: 'Trace' },
    { path: '/settings', label: 'Settings' },
  ];

  const icons = {
    '/': '📊',
    '/results': '📈',
    '/gantt': '📅',
    '/complexity': '⚙️',
    '/comparison': '🔄',
    '/extras': '✨',
    '/trace': '🔍',
    '/settings': '⚙️',
  };

  return (
    <>
      <div className="md:hidden fixed inset-x-0 top-0 z-50 bg-ink text-white shadow-lg px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl">🌾</span>
          <div className="min-w-0">
            <h1 className="text-base font-bold leading-tight">StubbleSched</h1>
            <p className="text-xs text-gray-300 truncate">{user?.name || 'Scheduling dashboard'}</p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen((value) => !value)}
          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition"
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </div>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={closeMobileMenu}
          className="md:hidden fixed inset-0 z-40 bg-black/40"
        />
      )}

      <nav className={`fixed left-0 top-0 h-screen bg-ink text-white shadow-lg transition-all duration-300 z-50 flex flex-col w-72 md:w-64 ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${collapsed ? 'md:w-20' : 'md:w-64'}`}>
        <div className="p-4 border-b border-white/20 hidden md:flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌾</span>
              <h1 className="text-lg font-bold">StubbleSched</h1>
            </div>
          )}
          {collapsed && <span className="text-2xl mx-auto">🌾</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-white/10 rounded transition text-lg"
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <div className="md:hidden p-4 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl">🌾</span>
            <div className="min-w-0">
              <h1 className="text-lg font-bold">StubbleSched</h1>
              <p className="text-xs text-gray-300 truncate">{user?.email || 'Secure scheduling'}</p>
            </div>
          </div>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        {!collapsed && user && (
          <div className="p-4 border-b border-white/20 bg-white/5 hidden md:block">
            <p className="text-xs text-gray-300">Logged in as</p>
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                location.pathname === item.path
                  ? 'bg-green text-white font-semibold'
                  : 'hover:bg-white/10 text-gray-200'
              }`}
              title={collapsed ? item.label : ''}
            >
              <span className="text-lg flex-shrink-0">{icons[item.path]}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-white/20 space-y-2">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red/10 hover:bg-red/20 text-red font-semibold transition ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Logout' : ''}
          >
            <span className="text-lg">🚪</span>
            {!collapsed && <span>Logout</span>}
          </button>
          {!collapsed && <p className="text-xs text-gray-400 text-center">v1.0.0</p>}
        </div>
      </nav>
    </>
  );
}
