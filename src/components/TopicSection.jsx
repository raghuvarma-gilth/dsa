import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, X, Clock, StickyNote, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import ProgressRing from './ProgressRing';

export default function TopicSection({
  topic, isComplete, toggleComplete, getTimestamp,
  getNote, setNote, filter, searchQuery
}) {
  const [expandedSubs, setExpandedSubs] = useState({});
  const [showNotes, setShowNotes] = useState({});
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

  const filteredSubtopics = topic.subtopics.map(sub => {
    const filteredChildren = sub.children.map((child, ci) => {
      const complete = isComplete(topic.id, sub.id, ci);
      if (filter === 'completed' && !complete) return null;
      if (filter === 'pending' && complete) return null;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!child.toLowerCase().includes(q) &&
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
                              {child}
                            </span>

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
