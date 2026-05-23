export default function UseCases() {
  const cases = [
    {
      svg: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
      label: "Tech",
    },
    {
      svg: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
      label: "Banca",
    },
    {
      svg: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
      label: "Salud",
    },
    {
      svg: <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></>,
      label: "Educación",
    },
    {
      svg: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
      label: "Legal",
    },
  ];

  return (
    <section id="usecases">
      <div className="container">
        <span className="section-tag">Industrias</span>
        <h2>Dónde sembramos<br />las raíces</h2>
        <p className="section-sub">
          Queremos trabajar con empresas que quieran moverse primero, sin importar la industria.
        </p>
        <div className="cases-grid">
          {cases.map((c) => (
            <div className="case-chip" key={c.label}>
              <div className="case-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {c.svg}
                </svg>
              </div>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        #usecases { background: var(--surface); }
        .cases-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }
        .case-chip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem 1.75rem;
          background: #0f0f0f;
          border: 1px solid var(--border);
          border-radius: 14px;
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          transition: all 0.3s ease;
          cursor: default;
        }
        .case-chip:hover {
          border-color: rgba(232, 144, 60, 0.25);
          box-shadow: 0 0 24px rgba(232, 144, 60, 0.12);
        }
        .case-icon {
          width: 40px; height: 40px;
          background: var(--accent-dim);
          border: 1px solid rgba(232, 144, 60, 0.18);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
        }
      `}</style>
    </section>
  );
}
