export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-inner">
        <div className="stat">
          <span className="stat-num">ICI + Diploma TI</span>
          <span className="stat-label">Pontificia Universidad Católica de Chile</span>
        </div>
        <div className="stat">
          <span className="stat-num">Sin overhead</span>
          <span className="stat-label">Sin estructura de consultora — precio justo por proyecto</span>
        </div>
        <div className="stat">
          <span className="stat-num">IA-first</span>
          <span className="stat-label">No adaptamos tecnología antigua — construimos con IA desde el núcleo</span>
        </div>
      </div>

      <style jsx>{`
        .stats-bar {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--surface);
        }
        .stats-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
        }
        .stat {
          background: var(--surface);
          padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 3vw, 2rem);
          text-align: center;
        }
        .stat-num {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(1rem, 2.2vw, 1.4rem);
          font-weight: 600;
          letter-spacing: 0.01em;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.25rem;
        }
        .stat-label {
          font-size: 0.78rem;
          color: var(--muted);
          line-height: 1.5;
        }
        @media (max-width: 640px) {
          .stats-inner { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
