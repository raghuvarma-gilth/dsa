import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sun, Moon, Menu, X, Download, Upload, Swords, Play, LogOut, ChevronDown } from 'lucide-react';
import ProgressRing from './ProgressRing';
import { useAuth } from '../context/AuthContext';

export default function Navbar({
  isDark, toggleTheme, overallProgress, searchQuery, setSearchQuery,
  onExport, onImport, onResume, onToggleSidebar, sidebarOpen
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    try { await logout(); } catch (err) { console.error('Logout failed:', err); }
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const dropdownStyle = {
    position: 'absolute', right: 0, top: 'calc(100% + 10px)',
    zIndex: 200, background: 'rgba(8, 10, 20, 0.97)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', overflow: 'hidden',
    boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset',
  };

  return (
    <nav className="navbar" id="main-navbar">
      {/* Left: Hamburger + Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <button
          onClick={onToggleSidebar}
          style={{
            padding: '8px', borderRadius: '10px',
            background: sidebarOpen ? 'rgba(139,92,246,0.1)' : 'none',
            border: sidebarOpen ? '1px solid rgba(139,92,246,0.2)' : '1px solid transparent',
            color: sidebarOpen ? 'var(--accent-purple)' : 'var(--text-secondary)', cursor: 'pointer',
            display: 'flex', transition: 'all 0.2s'
          }}
          id="sidebar-toggle"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            style={{
              width: '38px', height: '38px', borderRadius: '12px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              boxShadow: '0 4px 16px rgba(139,92,246,0.3)'
            }}
          >
            <Swords size={18} color="white" />
          </motion.div>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.5px' }}>
              DSA WAR
            </h1>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1, fontWeight: 500 }}>
              Conquer Every Pattern
            </p>
          </div>
        </div>
      </div>

      {/* Center: Search */}
      <div style={{ flex: 1, maxWidth: '420px', margin: '0 16px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input
            id="search-input"
            type="text"
            placeholder="Search topics, patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Right: Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {/* Progress Ring */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 4px' }}>
          <ProgressRing progress={overallProgress} size={38} strokeWidth={3} />
          <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-secondary)', minWidth: '32px' }}>
            {Math.round(overallProgress)}%
          </span>
        </div>

        {/* Resume Button */}
        <motion.button
          onClick={onResume}
          id="resume-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '8px 16px', borderRadius: '10px',
            fontSize: '12px', fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            boxShadow: '0 4px 16px rgba(139,92,246,0.2)', letterSpacing: '0.3px'
          }}
        >
          <Play size={12} fill="white" /> Resume
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ rotate: 20 }}
          style={{
            padding: '8px', borderRadius: '10px', background: 'none', border: '1px solid transparent',
            cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', transition: 'all 0.2s'
          }}
          id="theme-toggle"
          title="Toggle Theme"
        >
          {isDark ? <Sun size={17} color="#facc15" /> : <Moon size={17} color="#818cf8" />}
        </motion.button>

        {/* User Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '36px', height: '36px', borderRadius: '10px', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                color: 'white', fontSize: '12px', fontWeight: 800,
                boxShadow: '0 4px 12px rgba(16,185,129,0.15)',
                letterSpacing: '0.5px'
              }}
              id="user-avatar"
              title={displayName}
            >
              {initials}
            </div>
            <div className="hidden sm:block" style={{ maxWidth: '100px' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                {displayName}
              </p>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                {user?.email?.split('@')[0]}
              </p>
            </div>
          </div>

          {/* Visible Logout Button */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 700,
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              color: '#f87171', cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.2px'
            }}
            id="logout-btn"
            title="Sign Out"
          >
            <LogOut size={14} /> Logout
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

