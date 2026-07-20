import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAdminOnboarding } from './onboarding/useAdminOnboarding';
import krafologo from "../../assets/images/KRAFO ORIGINAL WHITEAsset 70@2x.png"

// KRAFO Logo Component
const KrafoLogo = ({ size = 'default' }) => {
  const sizes = {
    small: 'w-8 h-8',
    default: 'w-16 h-16',
    large: 'w-20 h-20',
    xlarge: 'w-24 h-24',
    xxlarge:'w-36 h-36',
  };
  
  return (
    <div className={`${sizes[size]} flex items-center justify-center`}>
      <img 
        src={krafologo} 
        alt="KRAFO Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme, colors } = useTheme();

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isDesktop]);

  const contentNavItems = [
    {
      name: 'Overview',
      path: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
    },
    {
      name: 'Events',
      path: '/admin/events',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Blog Posts',
      path: '/admin/blogs',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      name: 'Popups',
      path: '/admin/popups',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
  ];

  const toolkitNavItems = [
    {
      name: 'Assessments',
      path: '/admin/assessments',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      name: 'Promo Codes',
      path: '/admin/promo-codes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
  ];

  const superAdminNavItems = [
    {
      name: 'Manage Admins',
      path: '/admin/superadmin/admins',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      name: 'Audit Logs',
      path: '/admin/superadmin/audit-logs',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: 'Transfer Super Admin',
      path: '/admin/superadmin/transfer',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      name: 'Change Password',
      path: '/admin/superadmin/password',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  const currentUser = (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  })();
  const isSuperAdmin = currentUser?.role === 'superadmin';

  // Build a stable initial from the current user. Falls back to 'A' only if
  // we genuinely have no user record (which shouldn't happen on /admin).
  const userInitial = (() => {
    if (!currentUser) return 'A';
    const first = (currentUser.firstName || '').trim();
    const last = (currentUser.lastName || '').trim();
    if (first) return first[0].toUpperCase();
    if (last) return last[0].toUpperCase();
    if (currentUser.email) return currentUser.email[0].toUpperCase();
    return 'A';
  })();
  const userFullName = currentUser
    ? `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim() || currentUser.email
    : 'Admin';

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Close the profile menu on any outside click or Esc.
  useEffect(() => {
    if (!profileMenuOpen) return undefined;
    const onClick = (e) => {
      if (!e.target.closest('[data-profile-menu]')) setProfileMenuOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setProfileMenuOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [profileMenuOpen]);

  // Force the password-change page if this admin still has the temporary password.
  // Allow only the change-password route itself; everything else redirects.
  useEffect(() => {
    if (
      currentUser?.mustChangePassword &&
      location.pathname !== '/admin/change-password'
    ) {
      navigate('/admin/change-password', { replace: true });
    }
  }, [currentUser?.mustChangePassword, location.pathname, navigate]);

  // First-time onboarding tour (auto-launches once per browser).
  useAdminOnboarding();

  const navItems = [
    ...contentNavItems,
    ...toolkitNavItems,
    ...(isSuperAdmin ? superAdminNavItems : []),
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: colors.bg }}
    >
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 shadow-2xl`}
        style={{ background: colors.sidebarBg }}
      >
        <div className="h-full px-4 py-6 overflow-y-auto flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between mb-1 px-2">
            <div className="flex items-center justify-center w-full">
              <KrafoLogo size="xxlarge" />
              <div className="ml-3">
                {/* <span className="text-lg font-bold text-white">KRAFO</span> */}
                {/* <span className="block text-xs text-gray-400">Admin Panel</span> */}
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 px-4 mb-3" data-tour="content-nav">
              <span className="block w-1 h-3.5 rounded-full bg-gradient-to-b from-[#F2600B] to-orange-500" />
              <p className="text-xs font-bold text-orange-300/90 uppercase tracking-[0.12em]">
                Content Management
              </p>
            </div>
            {contentNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-[#F2600B] to-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`transition-colors ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-[#F2600B]'}`}>
                  {item.icon}
                </span>
                <span className="ml-3 font-medium">{item.name}</span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                  />
                )}
              </Link>
            ))}

            <div className="flex items-center gap-2 px-4 mb-3 mt-6" data-tour="toolkit-nav">
              <span className="block w-1 h-3.5 rounded-full bg-gradient-to-b from-[#F2600B] to-orange-500" />
              <p className="text-xs font-bold text-orange-300/90 uppercase tracking-[0.12em]">
                Assessment Toolkit
              </p>
            </div>
            {toolkitNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-[#F2600B] to-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`transition-colors ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-[#F2600B]'}`}>
                  {item.icon}
                </span>
                <span className="ml-3 font-medium">{item.name}</span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                  />
                )}
              </Link>
            ))}

            {isSuperAdmin && (
              <>
                <div className="flex items-center gap-2 px-4 mb-3 mt-6" data-tour="superadmin-nav">
                  <span className="block w-1 h-3.5 rounded-full bg-gradient-to-b from-[#F2600B] to-orange-500" />
                  <p className="text-xs font-bold text-orange-300/90 uppercase tracking-[0.12em]">
                    Super Admin
                  </p>
                </div>
                {superAdminNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-[#F2600B] to-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className={`transition-colors ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-[#F2600B]'}`}>
                      {item.icon}
                    </span>
                    <span className="ml-3 font-medium">{item.name}</span>
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeNav"
                        className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                      />
                    )}
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Bottom Section */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              <span className="ml-3 font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {/* User Info */}
            <div className="px-4 py-3">
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full flex items-center justify-center border border-[#F2600B]/30 overflow-hidden bg-gradient-to-br from-[#F2600B]/20 to-orange-500/20">
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-semibold text-[#F2600B]">{userInitial}</span>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {userFullName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isSuperAdmin ? 'Super Administrator' : 'Administrator'}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="ml-3 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen && isDesktop ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <header 
          className="sticky top-0 z-20 backdrop-blur-xl border-b transition-colors duration-300"
          style={{ 
            backgroundColor: isDark ? 'rgba(10, 10, 10, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: colors.border 
          }}
        >
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-xl mr-4 transition-colors"
                  style={{ 
                    color: colors.textSecondary,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div data-tour="welcome">
                  <h1 
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: colors.text }}
                  >
                    {navItems.find((item) => isActive(item.path))?.name || 'Dashboard'}
                  </h1>
                  <p 
                    className="text-sm hidden sm:block"
                    style={{ color: colors.textMuted }}
                  >
                    Manage your content and settings
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {/* View Site Link */}
                <Link
                  to="/"
                  target="_blank"
                  data-tour="view-site"
                  className="hidden sm:flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 border"
                  style={{ 
                    color: colors.textSecondary,
                    borderColor: colors.border,
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#F2600B';
                    e.currentTarget.style.color = '#F2600B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.color = colors.textSecondary;
                  }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Site
                </Link>
                
                {/* Theme Toggle (Mobile) */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-xl transition-colors sm:hidden"
                  style={{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                  }}
                >
                  {isDark ? (
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>

                {/* User Avatar — click to open profile menu */}
                <div className="relative" data-profile-menu data-tour="profile-menu">
                  <button
                    onClick={() => setProfileMenuOpen((v) => !v)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:ring-2 hover:ring-offset-2 hover:ring-[#F2600B]/50 overflow-hidden"
                    style={{
                      backgroundColor: colors.primaryLight,
                      ringOffsetColor: colors.bg,
                    }}
                    aria-label="Open profile menu"
                  >
                    {currentUser?.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-semibold" style={{ color: colors.primary }}>{userInitial}</span>
                    )}
                  </button>

                  {profileMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-64 rounded-xl shadow-2xl border overflow-hidden z-50"
                      style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
                    >
                      <div className="px-4 py-3 border-b" style={{ borderColor: colors.border }}>
                        <p className="text-sm font-semibold truncate" style={{ color: colors.text }}>
                          {userFullName}
                        </p>
                        {currentUser?.email && (
                          <p className="text-xs truncate" style={{ color: colors.textMuted }}>
                            {currentUser.email}
                          </p>
                        )}
                        <p className="text-xs mt-1 font-medium" style={{ color: '#F2600B' }}>
                          {isSuperAdmin ? 'Super Administrator' : 'Administrator'}
                        </p>
                      </div>
                      <Link
                        to="/admin/profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-orange-500/10"
                        style={{ color: colors.text }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>
                      <button
                        onClick={() => { setProfileMenuOpen(false); handleLogout(); }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-red-500/10 border-t"
                        style={{ color: colors.text, borderColor: colors.border }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = colors.text)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
