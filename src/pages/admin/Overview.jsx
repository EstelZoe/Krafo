import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { apiClient } from '../../api/client';
import { useTheme } from '../../context/ThemeContext';
import PendingTransferBanner from './superadmin/PendingTransferBanner';

const Overview = () => {
  const { isDark, colors } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const createMenuRef = useRef(null);
  const [stats, setStats] = useState({
    events: { total: 0, active: 0 },
    blogs: { total: 0, active: 0 },
    popups: { total: 0, active: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('events');
  const [recentItems, setRecentItems] = useState([]);
  const [allData, setAllData] = useState({
    events: [],
    blogs: [],
    popups: [],
  });

  // Reusable fetcher so manual refresh + mount + re-navigate all share one path.
  const fetchAllData = useCallback(async ({ silent = false } = {}) => {
    try {
      if (silent) setRefreshing(true);
      else setLoading(true);
      const [eventsRes, blogsRes, popupsRes] = await Promise.all([
        apiClient.get('/admin/content/events'),
        apiClient.get('/admin/content/blogs'),
        apiClient.get('/admin/content/popups'),
      ]);

      const eventsData = Array.isArray(eventsRes.data) ? eventsRes.data : [];
      const blogsData = Array.isArray(blogsRes.data) ? blogsRes.data : [];
      const popupsData = Array.isArray(popupsRes.data) ? popupsRes.data : [];

      setAllData({ events: eventsData, blogs: blogsData, popups: popupsData });

      setStats({
        events: {
          total: eventsData.length,
          active: eventsData.filter((e) => e.isActive !== false).length,
        },
        blogs: {
          total: blogsData.length,
          active: blogsData.filter((b) => b.isActive !== false).length,
        },
        popups: {
          total: popupsData.length,
          active: popupsData.filter((p) => p.isActive === true).length,
        },
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setAllData({ events: [], blogs: [], popups: [] });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Re-fetch whenever the user (re-)lands on the dashboard root. Cheap, keeps
  // the stat cards in sync with whatever's been edited elsewhere.
  useEffect(() => {
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      fetchAllData({ silent: !loading });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  useEffect(() => {
    if (!loading) {
      const data = allData[activeTab] || [];
      setRecentItems(data.slice(0, 5));
    }
  }, [activeTab, allData, loading]);

  // Close create menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createMenuRef.current && !createMenuRef.current.contains(event.target)) {
        setCreateMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const createOptions = [
    {
      title: 'Create Event',
      description: 'Add a new event',
      path: '/admin/events',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Create Blog Post',
      description: 'Write a new article',
      path: '/admin/blogs',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Create Popup',
      description: 'Add an announcement',
      path: '/admin/popups',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const statCards = [
    {
      title: 'Events',
      total: stats.events.total,
      active: stats.events.active,
      path: '/admin/events',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      iconColor: 'text-blue-500',
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-500/10',
    },
    {
      title: 'Blog Posts',
      total: stats.blogs.total,
      active: stats.blogs.active,
      path: '/admin/blogs',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      iconColor: 'text-emerald-500',
      bgLight: 'bg-emerald-50',
      bgDark: 'bg-emerald-500/10',
    },
    {
      title: 'Popups',
      total: stats.popups.total,
      active: stats.popups.active,
      path: '/admin/popups',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      iconColor: 'text-purple-500',
      bgLight: 'bg-purple-50',
      bgDark: 'bg-purple-500/10',
    },
  ];

  const tabs = [
    { id: 'events', label: 'Events' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'popups', label: 'Popups' },
  ];

  return (
    <div className="space-y-6">
      <PendingTransferBanner />
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, #F2600B 0%, #ff8534 50%, #F2600B 100%)',
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Welcome back!
              </h2>
              <p className="mt-2 text-white/80 max-w-lg">
                Here's what's happening with your content today. Manage events, blogs, and popups from one place.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-2">
              <button
                onClick={() => fetchAllData({ silent: true })}
                disabled={refreshing || loading}
                className="inline-flex items-center px-4 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-medium rounded-xl transition-all duration-200 border border-white/20 disabled:opacity-60"
                title="Reload stats"
              >
                <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                <span className="ml-2 hidden sm:inline">Refresh</span>
              </button>
              <div className="relative" ref={createMenuRef}>
                <button
                  onClick={() => setCreateMenuOpen(!createMenuOpen)}
                  className="inline-flex items-center px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium rounded-xl transition-all duration-200 border border-white/20"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Content
                  <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${createMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {createMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 rounded-xl shadow-2xl border overflow-hidden z-[100]"
                      style={{
                        backgroundColor: colors.bgCard,
                      borderColor: colors.border,
                    }}
                  >
                    <div className="p-2">
                      {createOptions.map((option) => (
                        <button
                          key={option.path}
                          onClick={() => {
                            navigate(option.path);
                            setCreateMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-orange-500/10 group"
                        >
                          <div className={`p-2 rounded-lg ${option.bgColor}`}>
                            <span className={option.color}>{option.icon}</span>
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-sm" style={{ color: colors.text }}>
                              {option.title}
                            </p>
                            <p className="text-xs" style={{ color: colors.textMuted }}>
                              {option.description}
                            </p>
                          </div>
                          <svg 
                            className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={card.path}
              className="block p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl group relative overflow-hidden"
              style={{
                backgroundColor: colors.bgCard,
                borderColor: colors.border,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F2600B';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(242, 96, 11, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {/* Hover arrow indicator */}
              <div
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300"
                style={{ color: '#F2600B' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textMuted }}>
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold mt-2" style={{ color: colors.text }}>
                    {loading ? (
                      <span 
                        className="inline-block w-12 h-8 rounded animate-pulse"
                        style={{ backgroundColor: colors.bgTertiary }}
                      />
                    ) : (
                      card.total
                    )}
                  </p>
                  <div className="flex items-center mt-3 space-x-2">
                    <span 
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: colors.successBg,
                        color: colors.success,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
                      {loading ? '...' : `${card.active} active`}
                    </span>
                  </div>
                </div>
                <div 
                  className={`p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${isDark ? card.bgDark : card.bgLight}`}
                >
                  <span className={card.iconColor}>
                    {card.icon}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: colors.bgCard,
          borderColor: colors.border,
        }}
      >
        <div className="p-6 border-b" style={{ borderColor: colors.border }}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold" style={{ color: colors.text }}>
              Recent Content
            </h2>
            <span className="text-sm" style={{ color: colors.textMuted }}>
              Last 5 items
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div 
          className="flex space-x-1 p-2 border-b"
          style={{ 
            backgroundColor: colors.bgTertiary,
            borderColor: colors.border 
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#F2600B] text-white shadow-lg shadow-orange-500/20'
                  : ''
              }`}
              style={activeTab !== tab.id ? { color: colors.textSecondary } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-10 h-10 border-3 border-[#F2600B] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : recentItems.length > 0 ? (
            <div className="space-y-3">
              {recentItems.map((item, index) => {
                const itemId = item._id || item.id;
                return (
                  <motion.div
                    key={itemId || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl transition-colors"
                    style={{ backgroundColor: colors.bgTertiary }}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="font-medium truncate"
                        style={{ color: colors.text }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-sm mt-1 truncate"
                        style={{ color: colors.textMuted }}
                      >
                        {item.description || item.content?.substring(0, 80)}
                      </p>
                      {item.category && (
                        <span 
                          className="inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded"
                          style={{
                            backgroundColor: colors.infoBg,
                            color: colors.info,
                          }}
                        >
                          {item.category}
                        </span>
                      )}
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: item.isActive !== false ? colors.successBg : colors.bgTertiary,
                          color: item.isActive !== false ? colors.success : colors.textMuted,
                        }}
                      >
                        {item.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div 
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: colors.bgTertiary }}
              >
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ color: colors.textMuted }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-sm font-medium" style={{ color: colors.text }}>
                No {activeTab} found
              </h3>
              <p className="mt-1 text-sm" style={{ color: colors.textMuted }}>
                Get started by creating a new {activeTab.slice(0, -1)}.
              </p>
              <Link
                to={`/admin/${activeTab}`}
                className="inline-flex items-center mt-4 px-4 py-2 text-sm font-medium text-[#F2600B] border border-[#F2600B]/30 rounded-lg hover:bg-[#F2600B]/10 transition-colors"
              >
                Create {activeTab.slice(0, -1)}
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
