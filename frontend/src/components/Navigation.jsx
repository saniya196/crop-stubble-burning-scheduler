import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
    <nav className={`fixed left-0 top-0 h-screen bg-ink text-white shadow-lg transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} z-50 flex flex-col`}>
      {/* Header with Logo */}
      <div className="p-4 border-b border-white/20 flex items-center justify-between">
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

      {/* User Info */}
      {!collapsed && user && (
        <div className="p-4 border-b border-white/20 bg-white/5">
          <p className="text-xs text-gray-300">Logged in as</p>
          <p className="font-semibold truncate">{user.name}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>
      )}

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
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

      {/* Logout Button */}
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
  );
}
