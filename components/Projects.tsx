"use client";

import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/contexts/LanguageContext";

const t = (l: string) => ({
  tag: l==="es"?"Track record":"Track record",
  h2: l==="es"?<>Lo que hemos<br/>construido</>:<>What we've<br/>built</>,
  sub: l==="es"?"Proyectos reales para instituciones reales, no ejercicios académicos.":"Real projects for real institutions, not academic exercises.",
  projects: [
    { org:"Asociación de Bancos · CiberLab UC", title: l==="es"?"Plataforma de ciberinteligencia IA":"AI Cyber Intelligence Platform", desc: l==="es"?"Plataforma de análisis y gestión de incidentes de ciberseguridad para el sector financiero chileno, con IA para clasificación y reportería automática.":"Cybersecurity incident analysis and management platform for the Chilean financial sector, with AI for automatic classification and reporting.", tags:["Python","IA","Ciberseguridad","Automatización"] },
    { org:"Ejército de Chile · CiberLab UC", title: l==="es"?"Simulador de ciberdefensa":"Cyber Defense Simulator", desc: l==="es"?"Desarrollo de simulador para protección de infraestructuras críticas con clasificación de malware mediante inteligencia artificial.":"Development of a simulator for critical infrastructure protection with AI-powered malware classification.", tags:["Python","Machine Learning","Ciberseguridad","Simulación"] },
    { org:"Novo Nordisk", title: l==="es"?"Agentes IA en salud":"AI Agents in Healthcare", desc: l==="es"?"Automatización de procesos de experiencia del paciente usando agentes de IA, análisis de datos y optimización de recorridos clínicos.":"Automation of patient experience processes using AI agents, data analysis, and clinical journey optimization.", tags:["Python","IA Agents","Salud","Data Analysis"] },
    { org:"CAi UC", title: l==="es"?"Infraestructura tecnológica estudiantil":"Student Tech Infrastructure", desc: l==="es"?"Desarrollo y coordinación de infraestructura tecnológica para eventos y servicios del Centro de Alumnos de Ingeniería UC.":"Development and coordination of tech infrastructure for events and services at the UC Engineering Student Center.", tags:["Infraestructura","Liderazgo","Gestión","Eventos"] },
  ],
});

export default function Projects() {
  const { lang } = useLang();
  const txt = t(lang);
  return (
    <section id="projects">
      <div className="container">
        <ScrollReveal><span className="section-tag">{txt.tag}</span></ScrollReveal>
        <ScrollReveal delay={80}><h2>{txt.h2}</h2></ScrollReveal>
        <ScrollReveal delay={160}><p className="section-sub">{txt.sub}</p></ScrollReveal>
        <div className="projects-grid">
          {txt.projects.map((p, i) => (
            <ScrollReveal key={i} type={i%2===0?"slide-left":"slide-right"} delay={200+i*120}>
              <div className="project-card">
                <div className="project-accent"/>
                <div className="project-org">{p.org}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <style jsx>{`
        #projects { background: var(--surface); }
        .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        .project-card { background: #0c0c09; border: 1px solid var(--border); border-radius: 14px; padding: clamp(1.5rem,3vw,2.25rem); position: relative; overflow: hidden; transition: all 0.3s ease; height: 100%; }
        .project-card:hover { border-color: rgba(232,144,60,0.18); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        .project-accent { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--accent); }
        .project-card:nth-child(2) .project-accent, .project-card:nth-child(4) .project-accent { background: var(--accent2); }
        .project-org { font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); font-family: var(--font-display); font-weight: 500; margin-bottom: 0.75rem; opacity: 0.8; }
        h3 { font-family: var(--font-display); font-size: 1.05rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.5rem; color: var(--text); }
        p { font-size: 0.85rem; color: var(--muted); line-height: 1.65; margin-bottom: 1.25rem; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .project-tags span { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; font-size: 0.68rem; padding: 0.15rem 0.55rem; color: var(--muted); font-family: var(--font-body); }
        @media (max-width: 640px) { .projects-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
