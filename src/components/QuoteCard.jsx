import { motion, AnimatePresence } from 'framer-motion';
import { Quote, RefreshCw, Sparkles } from 'lucide-react';

export default function QuoteCard({ quote, onRefresh }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glow-card"
      style={{ padding: '24px 28px', position: 'relative', overflow: 'hidden' }}
      id="quote-card"
    >
      {/* Decorative gradient glow */}
      <div style={{
        position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px',
        borderRadius: '50%', opacity: 0.06, filter: 'blur(50px)', pointerEvents: 'none',
        background: 'linear-gradient(135deg, #8b5cf6, #10b981)'
      }} />
      <div style={{
        position: 'absolute', bottom: '-20px', left: '-20px', width: '100px', height: '100px',
        borderRadius: '50%', opacity: 0.04, filter: 'blur(40px)', pointerEvents: 'none',
        background: 'linear-gradient(135deg, #f59e0b, #ec4899)'
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(139,92,246,0.08)', flexShrink: 0,
          border: '1px solid rgba(139,92,246,0.12)'
        }}>
          <Sparkles size={18} color="#a78bfa" />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={quote.text}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <p style={{
                fontSize: '15px', color: 'var(--text-primary)', fontStyle: 'italic',
                lineHeight: 1.7, fontWeight: 500, letterSpacing: '-0.1px'
              }}>
                "{quote.text}"
              </p>
              <p style={{
                fontSize: '12px', color: 'var(--accent-purple)', marginTop: '10px',
                fontWeight: 600, letterSpacing: '0.3px'
              }}>
                — {quote.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          onClick={onRefresh}
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
          style={{
            padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer',
            color: 'var(--text-muted)', flexShrink: 0, display: 'flex'
          }}
          title="New quote"
          id="refresh-quote"
        >
          <RefreshCw size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
}
