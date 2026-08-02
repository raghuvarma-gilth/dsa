import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, X, Clock, StickyNote, Sparkles, Trophy, ExternalLink, BookOpen, Lightbulb, AlertTriangle, Brain, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import ProgressRing from './ProgressRing';

// Helper to get child name (supports both string and object format)
const getChildName = (child) => typeof child === 'string' ? child : child.name;
const getChildLink = (child) => typeof child === 'string' ? null : child.gfgLink;

export default function TopicSection({
  topic, isComplete, toggleComplete, getTimestamp,
  getNote, setNote, filter, searchQuery, openPractice
}) {
  const [expandedSubs, setExpandedSubs] = useState({});
  const [showNotes, setShowNotes] = useState({});
  const [showPatternGuide, setShowPatternGuide] = useState({});
  const prevCompleteRef = useRef(false);
  const sectionRef = useRef(null);

  let totalChildren = 0;
  let completedChildren = 0;
  topic.subtopics.forEach(sub => {
    sub.children.forEach((_, ci) => {
      totalChildren++;
      if (isComplete(topic.id, sub.id, ci)) completedChildren++;
    });
  });
  const sectionProgress = totalChildren > 0 ? (completedChildren / totalChildren) * 100 : 0;
  const isFullyComplete = completedChildren === totalChildren && totalChildren > 0;

  useEffect(() => {
    if (isFullyComplete && !prevCompleteRef.current && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ['#10b981', '#34d399', '#8b5cf6', '#3b82f6', '#f59e0b'],
      });
    }
    prevCompleteRef.current = isFullyComplete;
  }, [isFullyComplete]);

  const toggleSub = (subId) => {
    setExpandedSubs(prev => ({ ...prev, [subId]: !prev[subId] }));
  };

  const toggleNoteVisibility = (subId) => {
    setShowNotes(prev => ({ ...prev, [subId]: !prev[subId] }));
  };

  const togglePatternGuide = (subId) => {
    setShowPatternGuide(prev => ({ ...prev, [subId]: !prev[subId] }));
  };

  const filteredSubtopics = topic.subtopics.map(sub => {
    const filteredChildren = sub.children.map((child, ci) => {
      const complete = isComplete(topic.id, sub.id, ci);
      if (filter === 'completed' && !complete) return null;
      if (filter === 'pending' && complete) return null;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const childName = getChildName(child);
        if (!childName.toLowerCase().includes(q) &&
            !sub.title.toLowerCase().includes(q) &&
            !topic.title.toLowerCase().includes(q)) return null;
      }
      return { child, ci, complete };
    }).filter(Boolean);
    return { ...sub, filteredChildren };
  }).filter(sub => sub.filteredChildren.length > 0);

  if (filteredSubtopics.length === 0) return null;

  const Icon = topic.icon;

  return (
    <motion.div
      ref={sectionRef}
      id={`section-${topic.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`glow-card ${isFullyComplete ? 'pulse-glow' : ''}`}
      style={{ overflow: 'hidden' }}
    >
      {/* ======= SECTION HEADER ======= */}
      <div className="topic-header">
        <div className="topic-icon" style={{
          background: `${topic.color}12`,
          border: `1px solid ${topic.color}20`,
          boxShadow: `0 0 24px ${topic.color}08`
        }}>
          <Icon size={24} style={{ color: topic.color }} />
        </div>

        <div className="topic-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h2 className="topic-title">{topic.title}</h2>
            {isFullyComplete && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '3px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 700,
                  background: 'rgba(16,185,129,0.12)', color: '#34d399',
                  border: '1px solid rgba(16,185,129,0.2)',
                  letterSpacing: '0.5px'
                }}
              >
                <Trophy size={10} /> CONQUERED
              </motion.span>
            )}
          </div>
          <p className="topic-meta">
            <span style={{ color: '#34d399', fontWeight: 600 }}>{completedChildren}</span>
            <span> / {totalChildren} patterns mastered</span>
          </p>
        </div>

        <div style={{ flexShrink: 0 }}>
          <ProgressRing progress={sectionProgress} size={56} strokeWidth={4} color={topic.color} />
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '0 28px 10px' }}>
        <div style={{ height: '3px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', borderRadius: '10px', background: `linear-gradient(90deg, ${topic.color}, ${topic.color}60)` }}
            initial={{ width: 0 }}
            animate={{ width: `${sectionProgress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* ======= SUBTOPICS ======= */}
      <div style={{ padding: '8px 20px 24px' }}>
        {filteredSubtopics.map((sub) => {
          const isExpanded = expandedSubs[sub.id] !== false;
          const subCompleted = sub.filteredChildren.filter(c => c.complete).length;
          const subTotal = sub.filteredChildren.length;

          return (
            <div key={sub.id} style={{
              borderRadius: '14px', border: '1px solid rgba(255,255,255,0.04)',
              marginBottom: '10px', overflow: 'hidden',
              background: 'rgba(255,255,255,0.01)'
            }}>
              <div
                className="subtopic-header"
                onClick={() => toggleSub(sub.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleSub(sub.id); }}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ flexShrink: 0 }}
                >
                  <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
                </motion.div>

                <span style={{
                  fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)',
                  flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap', letterSpacing: '-0.1px'
                }}>
                  {sub.title}
                </span>

                <span className={`badge-${sub.difficulty}`}>
                  {sub.difficulty.toUpperCase()}
                </span>

                <span style={{
                  fontSize: '11px', fontFamily: "'JetBrains Mono', monospace",
                  color: subCompleted === subTotal && subTotal > 0 ? '#34d399' : 'var(--text-muted)',
                  flexShrink: 0, marginLeft: '8px', fontWeight: 600
                }}>
                  {subCompleted}/{subTotal}
                </span>

                <button
                  onClick={(e) => { e.stopPropagation(); toggleNoteVisibility(sub.id); }}
                  style={{
                    padding: '5px', borderRadius: '8px',
                    background: showNotes[sub.id] ? 'rgba(139,92,246,0.1)' : 'none',
                    border: showNotes[sub.id] ? '1px solid rgba(139,92,246,0.2)' : '1px solid transparent',
                    cursor: 'pointer', color: showNotes[sub.id] ? '#a78bfa' : 'var(--text-muted)',
                    flexShrink: 0, marginLeft: '4px', display: 'flex', alignItems: 'center',
                    transition: 'all 0.2s'
                  }}
                  title="Toggle notes"
                >
                  <StickyNote size={13} />
                </button>
                {sub.patternGuide && (
                  <button
                    onClick={(e) => { e.stopPropagation(); togglePatternGuide(sub.id); }}
                    style={{
                      padding: '5px 8px', borderRadius: '8px',
                      background: showPatternGuide[sub.id] ? 'rgba(16,185,129,0.1)' : 'none',
                      border: showPatternGuide[sub.id] ? '1px solid rgba(16,185,129,0.25)' : '1px solid transparent',
                      cursor: 'pointer', color: showPatternGuide[sub.id] ? '#34d399' : 'var(--text-muted)',
                      flexShrink: 0, marginLeft: '4px', display: 'flex', alignItems: 'center', gap: '4px',
                      transition: 'all 0.2s', fontSize: '10px', fontWeight: 600
                    }}
                    title="Pattern Recognition Guide"
                  >
                    <BookOpen size={12} />
                    <span style={{ display: 'none' }}>Pattern</span>
                  </button>
                )}
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '4px 14px 14px' }}>
                      {sub.filteredChildren.map(({ child, ci, complete }) => {
                        const ts = getTimestamp(topic.id, sub.id, ci);
                        const childName = getChildName(child);
                        const gfgLink = getChildLink(child);
                        return (
                          <motion.div
                            key={ci}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: ci * 0.03 }}
                            className={`child-item ${complete ? 'completed-item' : ''}`}
                          >
                            {/* Number */}
                            <span style={{
                              width: '22px', height: '22px', borderRadius: '7px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '10px', fontWeight: 700, flexShrink: 0,
                              background: complete ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.03)',
                              color: complete ? '#34d399' : 'var(--text-muted)',
                              border: `1px solid ${complete ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.04)'}`,
                              fontFamily: "'JetBrains Mono', monospace"
                            }}>
                              {complete ? <Check size={11} /> : ci + 1}
                            </span>

                            <span className={`child-name ${complete ? 'done' : ''}`}>
                              {childName}
                            </span>

                            {/* GFG Practice Link */}
                            {gfgLink && (
                              <a
                                href={gfgLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gfg-link-btn"
                                title="Practice on GeeksforGeeks"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none"/>
                                  <text x="4" y="17" fontSize="14" fontWeight="800" fill="currentColor" fontFamily="Arial">G</text>
                                </svg>
                                <span>GFG</span>
                                <ExternalLink size={10} />
                              </a>
                            )}

                            {/* Internal Practice Arena Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const probId = childName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                openPractice(probId);
                              }}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(16,185,129,0.2)',
                                background: 'rgba(16,185,129,0.1)', color: '#34d399', fontSize: '11px',
                                fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                              }}
                              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16,185,129,0.2)'; }}
                              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(16,185,129,0.1)'; }}
                            >
                              <Play size={10} />
                              Practice Arena
                            </button>

                            {ts && complete && (
                              <span className="child-timestamp">
                                <Clock size={10} />
                                {new Date(ts).toLocaleDateString()}
                              </span>
                            )}

                            <div className="child-actions">
                              <button
                                onClick={() => toggleComplete(topic.id, sub.id, ci)}
                                className={`btn-complete ${complete ? 'completed' : ''}`}
                                id={`complete-${topic.id}-${sub.id}-${ci}`}
                              >
                                <Check size={12} />
                                {complete ? 'Done' : 'Complete'}
                              </button>
                              {complete && (
                                <button
                                  onClick={() => toggleComplete(topic.id, sub.id, ci)}
                                  className="btn-incomplete"
                                  id={`undo-${topic.id}-${sub.id}-${ci}`}
                                >
                                  <X size={12} />
                                </button>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}

                      <AnimatePresence>
                        {showNotes[sub.id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <textarea
                              className="notes-area"
                              rows={3}
                              placeholder="Write your notes, key insights, or solution approaches here..."
                              value={getNote(topic.id, sub.id)}
                              onChange={(e) => setNote(topic.id, sub.id, e.target.value)}
                              id={`notes-${topic.id}-${sub.id}`}
                              style={{ marginTop: '12px' }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* ===== PATTERN GUIDE PANEL ===== */}
                      <AnimatePresence>
                        {sub.patternGuide && showPatternGuide[sub.id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div style={{
                              marginTop: '14px', borderRadius: '12px', overflow: 'hidden',
                              border: '1px solid rgba(16,185,129,0.15)',
                              background: 'rgba(16,185,129,0.03)'
                            }}>
                              {/* Header bar */}
                              <div style={{
                                padding: '10px 16px', borderBottom: '1px solid rgba(16,185,129,0.1)',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                background: 'rgba(16,185,129,0.06)'
                              }}>
                                <BookOpen size={14} style={{ color: '#34d399' }} />
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#34d399', letterSpacing: '0.5px' }}>
                                  PATTERN RECOGNITION GUIDE
                                </span>
                                {sub.patternGuide.complexity && (
                                  <span style={{
                                    marginLeft: 'auto', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace",
                                    color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)',
                                    padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)'
                                  }}>
                                    ⏱ {sub.patternGuide.complexity.time} &nbsp;|&nbsp; 💾 {sub.patternGuide.complexity.space}
                                  </span>
                                )}
                              </div>

                              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

                                {/* Brain Says */}
                                {sub.patternGuide.brainSays && (
                                  <div style={{
                                    padding: '10px 14px', borderRadius: '10px',
                                    background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)',
                                    display: 'flex', gap: '10px', alignItems: 'flex-start'
                                  }}>
                                    <Brain size={14} style={{ color: '#a78bfa', flexShrink: 0, marginTop: '1px' }} />
                                    <span style={{ fontSize: '12px', color: '#c4b5fd', fontStyle: 'italic', lineHeight: 1.6 }}>
                                      {sub.patternGuide.brainSays}
                                    </span>
                                  </div>
                                )}

                                {/* Two-column: Clues + Anti-Clues */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                  {/* Clues */}
                                  <div style={{
                                    borderRadius: '10px', padding: '10px 12px',
                                    background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)'
                                  }}>
                                    <div style={{
                                      display: 'flex', alignItems: 'center', gap: '6px',
                                      marginBottom: '8px'
                                    }}>
                                      <Lightbulb size={12} style={{ color: '#34d399' }} />
                                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#34d399', letterSpacing: '0.5px' }}>USE WHEN YOU SEE</span>
                                    </div>
                                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                      {sub.patternGuide.clues.map((clue, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                                          <span style={{ color: '#34d399', fontSize: '10px', marginTop: '2px', flexShrink: 0 }}>✓</span>
                                          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{clue}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Anti-Clues */}
                                  {sub.patternGuide.antiClues && (
                                    <div style={{
                                      borderRadius: '10px', padding: '10px 12px',
                                      background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.12)'
                                    }}>
                                      <div style={{
                                        display: 'flex', alignItems: 'center', gap: '6px',
                                        marginBottom: '8px'
                                      }}>
                                        <AlertTriangle size={12} style={{ color: '#fb7185' }} />
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#fb7185', letterSpacing: '0.5px' }}>DON'T USE WHEN</span>
                                      </div>
                                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        {sub.patternGuide.antiClues.map((clue, i) => (
                                          <li key={i} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#fb7185', fontSize: '10px', marginTop: '2px', flexShrink: 0 }}>✗</span>
                                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{clue}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>

                                {/* Identification Examples */}
                                {sub.patternGuide.examples && sub.patternGuide.examples.length > 0 && (
                                  <div>
                                    <div style={{
                                      display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px'
                                    }}>
                                      <Sparkles size={12} style={{ color: '#f59e0b' }} />
                                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#fbbf24', letterSpacing: '0.5px' }}>IDENTIFICATION EXAMPLES</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                      {sub.patternGuide.examples.map((ex, i) => (
                                        <div key={i} style={{
                                          borderRadius: '10px', padding: '10px 12px',
                                          background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.12)'
                                        }}>
                                          <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '6px' }}>
                                            {i + 1}. {ex.problem}
                                          </div>
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                                              <span style={{ color: '#34d399', fontWeight: 600 }}>🔑 Clue: </span>{ex.clue}
                                            </div>
                                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                                              <span style={{ color: '#60a5fa', fontWeight: 600 }}>💡 Why: </span>{ex.why}
                                            </div>
                                            {ex.trap && (
                                              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                                                <span style={{ color: '#fb7185', fontWeight: 600 }}>⚠ Trap: </span>{ex.trap}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
