"use client";

import ScrollReveal from "./ScrollReveal";

const projects = [
  { org: "Asociación de Bancos · CiberLab UC", title: "Plataforma de ciberinteligencia IA", desc: "Plataforma de análisis y gestión de incidentes de ciberseguridad para el sector financiero chileno, con IA para clasificación y reportería automática.", tags: ["Python", "IA", "Ciberseguridad", "Automatización"] },
  { org: "Ejército de Chile · CiberLab UC", title: "Simulador de ciberdefensa", desc: "Desarrollo de simulador para protección de infraestructuras críticas con clasificación de malware mediante inteligencia artificial.", tags: ["Python", "Machine Learning", "Ciberseguridad", "Simulación"] },
  { org: "Novo Nordisk", title: "Agentes IA en salud", desc: "Automatización de procesos de experiencia del paciente usando agentes de IA, análisis de datos y optimización de recorridos clínicos.", tags: ["Python", "IA Agents", "Salud", "Data Analysis"] },
  { org: "CAi UC", title: "Infraestructura tecnológica estudiantil", desc: "Desarrollo y coordinación de infraestructura tecnológica para eventos y servicios del Centro de Alumnos de Ingeniería UC.", tags: ["Infraestructura", "Liderazgo", "Gestión", "Eventos"] },
];

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <ScrollReveal><span className="section-tag">Track record</span></ScrollReveal>
        <ScrollReveal delay={80}><h2>Lo que hemos<br />construido</h2></ScrollReveal>
        <ScrollReveal delay={160}><p className="section-sub">Proyectos reales para instituciones reales, no ejercicios académicos.</p></ScrollReveal>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ScrollReveal key={i} type={i % 2 === 0 ? "slide-left" : "slide-right"} delay={200 + i * 120}>
              <div className="project-card">
                <div className="project-org">{p.org}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <style jsx>{`
        #projects { background: var(--surface); }
        .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .project-card {
          background: #0f0f0f; border: 1px solid var(--border);
          border-radius: 18px; padding: clamp(1.5rem, 3vw, 2.5rem);
          position: relative; overflow: hidden; transition: all 0.35s ease;
        }
        .project-card::after {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle at 30% 30%, rgba(232, 144, 60, 0.1) 0%, transparent 50%);
          opacity: 0; transition: opacity 0.35s ease; pointer-events: none;
        }
        .project-card:hover::after { opacity: 1; }
        .project-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.3); transform: translateY(-2px); }
        .project-org { font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); font-family: var(--font-display); font-weight: 500; margin-bottom: 0.75rem; }
        h3 { font-family: var(--font-display); font-size: 1.05rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.5rem; }
        p { font-size: 0.875rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.25rem; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .project-tags span { border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; font-size: 0.7rem; padding: 0.2rem 0.65rem; color: var(--muted); font-family: var(--font-body); }
        @media (max-width: 640px) { .projects-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
