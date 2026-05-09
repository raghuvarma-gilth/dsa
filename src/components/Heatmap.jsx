import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function Heatmap({ heatmapData }) {
  const cells = useMemo(() => {
    const today = new Date();
    const result = [];
    for (let i = 139; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const count = heatmapData[key] || 0;
      result.push({ date: key, count, day: d.getDay() });
    }
    return result;
  }, [heatmapData]);

  const totalActivity = useMemo(() => {
    return Object.values(heatmapData).reduce((s, v) => s + v, 0);
  }, [heatmapData]);

  const getColor = (count) => {
    if (count === 0) return 'rgba(255,255,255,0.025)';
    if (count <= 2) return 'rgba(16,185,129,0.2)';
    if (count <= 5) return 'rgba(16,185,129,0.4)';
    if (count <= 10) return 'rgba(16,185,129,0.6)';
    return 'rgba(16,185,129,0.85)';
  };

  const weeks = [];
  let currentWeek = [];
  cells.forEach((cell, i) => {
    currentWeek.push(cell);
    if (currentWeek.length === 7 || i === cells.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glow-card"
      style={{ padding: '24px 28px' }}
      id="heatmap-container"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(16,185,129,0.08)'
          }}>
            <Activity size={18} color="#34d399" />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>Activity Heatmap</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {totalActivity} total activities • Last 20 weeks
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>
          <span>Less</span>
          {[0, 2, 5, 10, 15].map(v => (
            <div key={v} className="heatmap-cell" style={{ background: getColor(v) }} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '3px', overflowX: 'auto', paddingBottom: '6px' }}>
        {/* Day labels column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginRight: '4px', paddingTop: '0' }}>
          {dayLabels.map((label, i) => (
            <div key={i} style={{
              width: '24px', height: '14px', display: 'flex', alignItems: 'center',
              fontSize: '9px', color: 'var(--text-muted)', fontWeight: 500
            }}>
              {label}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {week.map((cell) => (
              <div
                key={cell.date}
                className="heatmap-cell"
                style={{ background: getColor(cell.count) }}
                title={`${cell.date}: ${cell.count} topics completed`}
              />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
