import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Trophy } from 'lucide-react';
import dsaTopics from '../data/dsaTopics';

export default function Sidebar({ activeSection, onSectionClick, sidebarOpen, onClose, completedCounts }) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-overlay lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`} id="main-sidebar">
        <div style={{ padding: '16px 12px' }}>
          {/* Dashboard Link */}
          <button
            onClick={() => { onSectionClick(null); onClose(); }}
            className={`sidebar-item ${activeSection === null ? 'active' : ''}`}
            id="sidebar-dashboard"
            style={{ marginBottom: '8px' }}
          >
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(139,92,246,0.1)', flexShrink: 0
            }}>
              <LayoutGrid size={15} style={{ color: '#a78bfa' }} />
            </div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Dashboard
            </p>
          </button>

          {/* Section Label */}
          <p style={{
            fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px',
            color: 'var(--text-muted)', marginBottom: '10px', paddingLeft: '14px', fontWeight: 700
          }}>
            DSA Patterns
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {dsaTopics.map((topic) => {
              const Icon = topic.icon;
              const totalChildren = topic.subtopics.reduce((s, sub) => s + sub.children.length, 0);
              const completedCount = completedCounts[topic.id] || 0;
              const isActive = activeSection === topic.id;
              const pct = totalChildren > 0 ? Math.round((completedCount / totalChildren) * 100) : 0;
              const isFullyComplete = completedCount === totalChildren && totalChildren > 0;

              return (
                <motion.button
                  key={topic.id}
                  id={`sidebar-${topic.id}`}
                  onClick={() => { onSectionClick(topic.id); onClose(); }}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.15 }}
                >
                  <div
                    style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isFullyComplete ? 'rgba(16,185,129,0.12)' : `${topic.color}12`,
                      border: `1px solid ${isFullyComplete ? 'rgba(16,185,129,0.2)' : `${topic.color}20`}`,
                      flexShrink: 0, transition: 'all 0.25s'
                    }}
                  >
                    {isFullyComplete ? (
                      <Trophy size={14} style={{ color: '#34d399' }} />
                    ) : (
                      <Icon size={15} style={{ color: topic.color }} />
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <p style={{
                        fontSize: '13px', fontWeight: isActive ? 700 : 500, color: 'var(--text-primary)',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        transition: 'font-weight 0.2s'
                      }}>
                        {topic.title}
                      </p>
                      {isFullyComplete && (
                        <span style={{
                          fontSize: '8px', fontWeight: 700, padding: '1px 6px', borderRadius: '10px',
                          background: 'rgba(16,185,129,0.1)', color: '#34d399',
                          border: '1px solid rgba(16,185,129,0.15)', letterSpacing: '0.5px',
                          flexShrink: 0
                        }}>
                          ✓
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                      <div style={{
                        flex: 1, height: '3px', borderRadius: '10px',
                        background: 'rgba(255,255,255,0.04)', overflow: 'hidden'
                      }}>
                        <motion.div
                          style={{
                            height: '100%', borderRadius: '10px',
                            background: isFullyComplete
                              ? 'linear-gradient(90deg, #10b981, #34d399)'
                              : topic.color
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                      <span style={{
                        fontSize: '10px', fontFamily: "'JetBrains Mono', monospace",
                        color: isFullyComplete ? '#34d399' : 'var(--text-muted)',
                        flexShrink: 0, fontWeight: 600
                      }}>
                        {completedCount}/{totalChildren}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
