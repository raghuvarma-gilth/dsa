import { useState, useCallback, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Target, Flame, Settings, ChevronUp } from 'lucide-react';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import StatsCards from './components/StatsCards';
import Heatmap from './components/Heatmap';
import QuoteCard from './components/QuoteCard';
import TopicSection from './components/TopicSection';
import dsaTopics from './data/dsaTopics';
import quotes from './data/quotes';
import {
  useProgress, useStreak, useNotes, useDailyGoal,
  useTheme, useHeatmap, useExportImport,
} from './hooks/useStorage';

export default function App() {
  const { completed, toggleComplete: rawToggle, isComplete, getTimestamp } = useProgress();
  const { currentStreak, longestStreak, recordActivity } = useStreak();
  const { setNote, getNote } = useNotes();
  const dailyGoal = useDailyGoal();
  const { isDark, toggleTheme } = useTheme();
  const { heatmap, recordDay } = useHeatmap();
  const { exportData, importData } = useExportImport();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeSection, setActiveSection] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(() => Math.floor(Math.random() * quotes.length));
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle complete with activity tracking
  const toggleComplete = useCallback((topicId, subtopicId, childIdx) => {
    const key = `${topicId}__${subtopicId}__${childIdx}`;
    const wasComplete = !!completed[key];
    rawToggle(topicId, subtopicId, childIdx);
    if (!wasComplete) {
      recordActivity();
      recordDay();
      dailyGoal.incrementGoal();
    } else {
      dailyGoal.decrementGoal();
    }
  }, [completed, rawToggle, recordActivity, recordDay, dailyGoal]);

  // Compute stats
  const { totalTopics, completedTopics, completedCounts } = useMemo(() => {
    let total = 0;
    let done = 0;
    const counts = {};
    dsaTopics.forEach(topic => {
      let topicDone = 0;
      topic.subtopics.forEach(sub => {
        sub.children.forEach((_, ci) => {
          total++;
          if (completed[`${topic.id}__${sub.id}__${ci}`]) {
            done++;
            topicDone++;
          }
        });
      });
      counts[topic.id] = topicDone;
    });
    return { totalTopics: total, completedTopics: done, completedCounts: counts };
  }, [completed]);

  const pendingTopics = totalTopics - completedTopics;
  const overallProgress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  // Navigate to section — sets active section (tab-style)
  const handleSectionClick = useCallback((id) => {
    setActiveSection(prev => prev === id ? null : id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Resume from last incomplete
  const handleResume = useCallback(() => {
    for (const topic of dsaTopics) {
      for (const sub of topic.subtopics) {
        for (let ci = 0; ci < sub.children.length; ci++) {
          if (!completed[`${topic.id}__${sub.id}__${ci}`]) {
            setActiveSection(topic.id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
        }
      }
    }
  }, [completed]);

  // Get the currently selected topic object
  const activeTopic = useMemo(() => {
    if (!activeSection) return null;
    return dsaTopics.find(t => t.id === activeSection) || null;
  }, [activeSection]);

  // Import handler
  const handleImport = useCallback(async (file) => {
    try {
      await importData(file);
      window.location.reload();
    } catch (err) {
      console.error('Import failed:', err);
    }
  }, [importData]);

  const refreshQuote = useCallback(() => {
    setQuoteIdx(prev => (prev + 1) % quotes.length);
  }, []);

  return (
    <div className={!isDark ? 'light-mode' : ''}>
      {/* Navbar */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        overallProgress={overallProgress}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onExport={exportData}
        onImport={handleImport}
        onResume={handleResume}
        onToggleSidebar={() => setSidebarOpen(p => !p)}
        sidebarOpen={sidebarOpen}
      />

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        completedCounts={completedCounts}
      />

      {/* ============ MAIN CONTENT ============ */}
      <div className="main-content">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* ===== DASHBOARD VIEW (no topic selected) ===== */}
          {!activeTopic && (
            <>
              {/* Stats Cards */}
              <StatsCards
                totalTopics={totalTopics}
                completedTopics={completedTopics}
                pendingTopics={pendingTopics}
                overallProgress={overallProgress}
                streak={currentStreak}
                dailyGoal={dailyGoal}
              />

              {/* Streak + Daily Goal */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '20px' }}>
                {/* Streak Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="glow-card"
                  style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
                  id="streak-card"
                >
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(16,185,129,0.05)', filter: 'blur(30px)', pointerEvents: 'none' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', position: 'relative' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(16,185,129,0.12)'
                    }}>
                      <Flame size={20} color="#34d399" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>Daily Streak</h3>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Keep the fire burning!</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', position: 'relative' }}>
                    <div>
                      <p className="streak-text" style={{ fontSize: '42px', fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1, letterSpacing: '-1px' }}>
                        {currentStreak}
                      </p>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 600 }}>Current streak</p>
                    </div>
                    <div style={{ paddingBottom: '4px' }}>
                      <p style={{ fontSize: '20px', fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: '#10b981', letterSpacing: '-0.5px' }}>
                        {longestStreak}
                      </p>
                      <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>Best streak</p>
                    </div>
                  </div>
                </motion.div>

                {/* Daily Goal Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="glow-card"
                  style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
                  id="daily-goal-card"
                >
                  <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(6,182,212,0.05)', filter: 'blur(30px)', pointerEvents: 'none' }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(6,182,212,0.12)'
                      }}>
                        <Target size={20} color="#22d3ee" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>Daily Goal</h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          {dailyGoal.completed}/{dailyGoal.target} topics today
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowGoalModal(true)}
                      style={{
                        padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', color: 'var(--text-muted)',
                        transition: 'all 0.2s'
                      }}
                      id="set-goal-btn"
                      title="Set daily goal"
                    >
                      <Settings size={16} />
                    </button>
                  </div>
                  <div style={{ height: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', overflow: 'hidden', position: 'relative' }}>
                    <motion.div
                      style={{ height: '100%', borderRadius: '12px', background: 'linear-gradient(90deg, #10b981, #06b6d4)', boxShadow: '0 0 10px rgba(6,182,212,0.4)' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (dailyGoal.completed / dailyGoal.target) * 100)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  {dailyGoal.completed >= dailyGoal.target && (
                    <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                      style={{ fontSize: '12px', color: '#10b981', marginTop: '12px', fontWeight: 700, letterSpacing: '0.2px' }}
                    >
                      🎉 Daily goal achieved! You're on fire!
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Heatmap */}
              <div style={{ marginTop: '20px' }}>
                <Heatmap heatmapData={heatmap} />
              </div>

              {/* Quote */}
              <div style={{ marginTop: '20px' }}>
                <QuoteCard quote={quotes[quoteIdx]} onRefresh={refreshQuote} />
              </div>

              {/* Prompt to select a topic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glow-card"
                style={{ marginTop: '24px', padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.04), transparent 70%)', pointerEvents: 'none' }} />
                <motion.p
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  style={{ fontSize: '52px', marginBottom: '16px', display: 'inline-block' }}
                >⚔️</motion.p>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px', letterSpacing: '-0.5px' }}>
                  Select a Topic to Begin
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '380px', margin: '0 auto', lineHeight: 1.7 }}>
                  Choose a DSA pattern from the sidebar to start tracking your progress. Conquer one section at a time!
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
                  {['Arrays', 'Strings', 'Trees', 'Graphs', 'DP'].map(tag => (
                    <span key={tag} style={{ padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, background: 'rgba(139,92,246,0.08)', color: 'var(--accent-purple)', border: '1px solid rgba(139,92,246,0.15)', letterSpacing: '0.3px' }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {/* ===== TOPIC VIEW (specific topic selected) ===== */}
          {activeTopic && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTopic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Back to Dashboard */}
                <motion.button
                  onClick={() => setActiveSection(null)}
                  whileHover={{ x: -3 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '10px 20px', borderRadius: '12px', fontSize: '13px',
                    fontWeight: 700, cursor: 'pointer', marginBottom: '24px',
                    background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)',
                    color: 'var(--accent-purple)', transition: 'all 0.2s', letterSpacing: '0.2px'
                  }}
                  id="back-to-dashboard"
                >
                  ← Back to Dashboard
                </motion.button>

                {/* Filter Bar */}
                <div style={{
                  display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '20px'
                }} id="filter-bar">
                  {['all', 'completed', 'pending'].map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`filter-btn ${filter === f ? 'active' : ''}`}
                      id={`filter-${f}`}
                    >
                      {f === 'all' ? 'All Topics' : f === 'completed' ? 'Completed' : 'Pending'}
                    </button>
                  ))}
                  <div style={{ flex: 1 }} />
                  <span style={{
                    fontSize: '12px', fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--text-muted)'
                  }}>
                    {completedCounts[activeTopic.id] || 0} / {activeTopic.subtopics.reduce((s, sub) => s + sub.children.length, 0)} patterns
                  </span>
                </div>

                {/* Single Topic Section */}
                <TopicSection
                  topic={activeTopic}
                  isComplete={isComplete}
                  toggleComplete={toggleComplete}
                  getTimestamp={getTimestamp}
                  getNote={getNote}
                  setNote={setNote}
                  filter={filter}
                  searchQuery={searchQuery}
                />
              </motion.div>
            </AnimatePresence>
          )}

        </div>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed', bottom: '24px', right: '24px', width: '44px', height: '44px',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 50, border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)'
            }}
            id="scroll-top-btn"
          >
            <ChevronUp size={20} color="white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Goal Modal */}
      <AnimatePresence>
        {showGoalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowGoalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glow-card"
              style={{ padding: '36px', width: '100%', maxWidth: '380px', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(139,92,246,0.05)', filter: 'blur(40px)', pointerEvents: 'none' }} />
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid rgba(139,92,246,0.15)' }}>
                  <Target size={22} color="#a78bfa" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                  Set Daily Goal
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>How many patterns per day?</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
                <motion.button
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => dailyGoal.setTarget(dailyGoal.target - 1)}
                  style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', fontWeight: 700, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-primary)',
                    background: 'rgba(255,255,255,0.03)', transition: 'all 0.2s'
                  }}
                >
                  −
                </motion.button>
                <span className="gradient-text" style={{ fontSize: '44px', fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '-2px', minWidth: '60px', textAlign: 'center' }}>
                  {dailyGoal.target}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => dailyGoal.setTarget(dailyGoal.target + 1)}
                  style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', fontWeight: 700, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-primary)',
                    background: 'rgba(255,255,255,0.03)', transition: 'all 0.2s'
                  }}
                >
                  +
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => setShowGoalModal(false)}
                style={{
                  width: '100%', padding: '14px', borderRadius: '14px', fontSize: '14px',
                  fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  boxShadow: '0 4px 20px rgba(139,92,246,0.25)', letterSpacing: '0.3px'
                }}
              >
                Save Goal ✓
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
