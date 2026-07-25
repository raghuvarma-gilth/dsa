import { motion } from 'framer-motion';
import { Target, CheckCircle2, Clock, Flame, TrendingUp } from 'lucide-react';
import ProgressRing from './ProgressRing';

export default function StatsCards({ totalTopics, completedTopics, pendingTopics, overallProgress, streak, dailyGoal }) {
  const stats = [
    { id: 'total', title: 'Total Patterns', value: totalTopics, icon: Target, iconColor: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', cardClass: 'stat-card-purple' },
    { id: 'completed', title: 'Conquered', value: completedTopics, icon: CheckCircle2, iconColor: '#10b981', bg: 'rgba(16,185,129,0.08)', cardClass: 'stat-card-green' },
    { id: 'pending', title: 'Remaining', value: pendingTopics, icon: Clock, iconColor: '#f59e0b', bg: 'rgba(245,158,11,0.08)', cardClass: 'stat-card-orange' },
    { id: 'streak', title: 'Day Streak', value: streak, icon: Flame, iconColor: '#10b981', bg: 'rgba(16,185,129,0.08)', cardClass: 'stat-card-green', suffix: streak === 1 ? ' day' : ' days' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))',
      gap: '14px'
    }}>
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
            className={`glow-card stat-card ${stat.cardClass}`}
            style={{ padding: '22px', cursor: 'default' }}
            id={`stat-${stat.id}`}
          >
            <div style={{
              width: '42px', height: '42px', borderRadius: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: stat.bg, marginBottom: '16px'
            }}>
              <Icon size={20} style={{ color: stat.iconColor }} />
            </div>
            <p style={{
              fontSize: '32px', fontWeight: 800, fontFamily: "'JetBrains Mono', monospace",
              color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-1px'
            }}>
              {stat.value}{stat.suffix && <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0' }}>{stat.suffix}</span>}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px', fontWeight: 500 }}>
              {stat.title}
            </p>
          </motion.div>
        );
      })}

      {/* Overall Progress Ring */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.32, ease: [0.4, 0, 0.2, 1] }}
        className="glow-card stat-card stat-card-purple"
        style={{ padding: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}
        id="stat-completion"
      >
        <ProgressRing progress={overallProgress} size={68} strokeWidth={5} color="#8b5cf6" />
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px', fontWeight: 500 }}>Overall</p>
      </motion.div>

      {/* Daily Goal Ring */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="glow-card stat-card stat-card-green"
        style={{ padding: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}
        id="stat-daily-goal"
      >
        <ProgressRing
          progress={dailyGoal.target > 0 ? Math.min(100, (dailyGoal.completed / dailyGoal.target) * 100) : 0}
          size={68}
          strokeWidth={5}
          color="#10b981"
        />
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px', fontWeight: 500 }}>
          Goal ({dailyGoal.completed}/{dailyGoal.target})
        </p>
      </motion.div>
    </div>
  );
}
