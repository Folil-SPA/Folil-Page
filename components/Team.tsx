const checkIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>
);

const linkedinIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.5h4.52V23H.24V8.5zM8 8.5h4.33v1.98h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.43 3.02 5.43 6.94V23h-4.52v-7.02c0-1.67-.03-3.83-2.33-3.83-2.34 0-2.7 1.83-2.7 3.71V23H8V8.5z" />
  </svg>
);

const teamData = [
  {
    initials: "PA",
    name: "Patricio Acevedo",
    role: "Co-founder",
    edu: "ICI + Diploma TI · PUC",
    linkedin: "https://www.linkedin.com/in/patricio-acevedo-flores-63300b30b",
    highlights: [
      "Agentes IA y automatización de procesos aplicada en banca y defensa — CiberLab UC.",
      "Intern en Novo Nordisk — proyectos de IA aplicada en salud.",
      "Ayudante en programación, optimización y bases de datos.",
    ],
    tags: [
      "Python", "SQL", "R", "Power BI", "Claude API",
      "Kali Linux", "Dataiku", "Jupyter", "Ciberseguridad",
    ],
  },
  {
    initials: "AN",
    name: "Álvaro Navarrete",
    role: "Co-founder",
    edu: "ICI + Magíster CS + Diploma TI · PUC",
    linkedin: "https://www.linkedin.com/in/%C3%A1lvaro-navarrete-257a1423a/",
    highlights: [
      "Ciberinteligencia con IA para análisis de incidentes del sector financiero — CiberLab UC.",
      "Jefe de Tecnologías del CAi UC — infraestructura y coordinación de eventos tecnológicos.",
      "Coordinador del Cuerpo de Tutores Ingeniería UC: lideró 124 tutores y diseñó capacitaciones.",
    ],
    tags: [
      "Python", "Pandas", "R", "Power BI", "Tableau",
      "Mathematica", "Inglés B2", "Liderazgo",
    ],
  },
];

export default function Team() {
  return (
    <section id="team">
      <div className="container">
        <span className="section-tag">Quiénes somos</span>
        <h2>Dos ingenieros.<br />Una obsesión.</h2>
        <p className="section-sub">
          Estudiantes de Ingeniería Civil Industrial con Diploma TI en la PUC. Construimos folil labs porque creemos que la IA debe ser accesible para todas las empresas.
        </p>
        <div className="team-grid">
          {teamData.map((member) => (
            <div className="team-card" key={member.name}>
              <div className="team-card-header">
                <div className="avatar">{member.initials}</div>
                <div className="team-card-meta">
                  <h3>{member.name}</h3>
                  <a
                    className="team-link"
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener"
                    aria-label={`LinkedIn de ${member.name}`}
                  >
                    {linkedinIcon} LinkedIn
                  </a>
                  <div className="role">{member.role}</div>
                  <div className="edu">{member.edu}</div>
                </div>
              </div>
              <div className="team-divider" />
              <div className="team-highlights">
                {member.highlights.map((h) => (
                  <div className="team-highlight" key={h}>
                    {checkIcon}
                    <span>{h}</span>
                  </div>
                ))}
              </div>
              <div className="team-tags">
                {member.tags.map((tag) => (
                  <span className="team-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .team-card {
          background: #0f0f0f;
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: clamp(1.5rem, 3vw, 2.5rem);
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
        }
        .team-card::after {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle at 30% 30%, rgba(232, 144, 60, 0.08) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .team-card:hover::after { opacity: 1; }
        .team-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }
        .team-card-header {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        .avatar {
          width: 52px; height: 52px;
          border-radius: 12px;
          background: var(--accent-dim);
          border: 1px solid rgba(232, 144, 60, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--accent);
          flex-shrink: 0;
        }
        .team-card-meta {
          flex: 1;
          min-width: 0;
        }
        h3 {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin-bottom: 0.25rem;
        }
        .team-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--accent);
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 500;
          margin-bottom: 0.35rem;
          transition: opacity 0.2s;
        }
        .team-link:hover { opacity: 0.75; }
        .role {
          font-size: 0.8rem;
          color: var(--muted);
          font-weight: 500;
        }
        .edu {
          font-size: 0.75rem;
          color: var(--muted);
          margin-top: 0.1rem;
        }
        .team-divider {
          height: 1px;
          background: var(--border);
          margin: 1.25rem 0;
        }
        .team-highlights {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }
        .team-highlight {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.6;
        }
        .team-highlight :global(svg) {
          margin-top: 3px;
          flex-shrink: 0;
          color: var(--accent2);
        }
        .team-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .team-tag {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          font-size: 0.68rem;
          padding: 0.15rem 0.55rem;
          color: var(--muted);
          font-family: var(--font-body);
        }
        @media (max-width: 768px) {
          .team-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
