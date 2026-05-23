"use client";

import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/contexts/LanguageContext";

const checkIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>;
const linkedinIcon = <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.5h4.52V23H.24V8.5zM8 8.5h4.33v1.98h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.43 3.02 5.43 6.94V23h-4.52v-7.02c0-1.67-.03-3.83-2.33-3.83-2.34 0-2.7 1.83-2.7 3.71V23H8V8.5z"/></svg>;

const t = (l: string) => ({
  tag: l==="es"?"Quiénes somos":"Who we are",
  h2: l==="es"?<>Dos ingenieros.<br/>Una obsesión.</>:<>Two engineers.<br/>One obsession.</>,
  sub: l==="es"?"Estudiantes de Ingeniería Civil Industrial con Diploma TI en la PUC. Construimos folil labs porque creemos que la IA debe ser accesible para todas las empresas.":"Industrial Civil Engineering students with TI Diploma at PUC. We built folil labs because we believe AI should be accessible to all companies.",
  members: [
    { initials:"PA", name:"Patricio Acevedo", role:"Co-founder", edu:"ICI + Diploma TI · PUC", linkedin:"https://www.linkedin.com/in/patricio-acevedo-flores-63300b30b", highlights: l==="es"?["Agentes IA y automatización de procesos aplicada en banca y defensa — CiberLab UC.","Intern en Novo Nordisk — proyectos de IA aplicada en salud.","Ayudante en programación, optimización y bases de datos."]:["AI agents and process automation applied in banking and defense — CiberLab UC.","Intern at Novo Nordisk — applied AI projects in healthcare.","Teaching assistant in programming, optimization and databases."], tags:["Python","SQL","R","Power BI","Claude API","Kali Linux","Dataiku","Jupyter","Ciberseguridad"] },
    { initials:"AN", name:"Álvaro Navarrete", role:"Co-founder", edu:"ICI + Magíster CS + Diploma TI · PUC", linkedin:"https://www.linkedin.com/in/%C3%A1lvaro-navarrete-257a1423a/", highlights: l==="es"?["Ciberinteligencia con IA para análisis de incidentes del sector financiero — CiberLab UC.","Jefe de Tecnologías del CAi UC — infraestructura y coordinación de eventos tecnológicos.","Coordinador del Cuerpo de Tutores Ingeniería UC: lideró 124 tutores y diseñó capacitaciones."]:["AI-powered cyber intelligence for financial sector incident analysis — CiberLab UC.","Head of Technology at CAi UC — infrastructure and tech event coordination.","Coordinator of UC Engineering Tutoring Corps: led 124 tutors and designed training programs."], tags:["Python","Pandas","R","Power BI","Tableau","Mathematica","Inglés B2","Liderazgo"] },
  ],
});

export default function Team() {
  const { lang } = useLang();
  const txt = t(lang);
  return (
    <section id="team">
      <div className="container">
        <ScrollReveal><span className="section-tag">{txt.tag}</span></ScrollReveal>
        <ScrollReveal delay={80}><h2>{txt.h2}</h2></ScrollReveal>
        <ScrollReveal delay={160}><p className="section-sub">{txt.sub}</p></ScrollReveal>
        <div className="team-grid">
          {txt.members.map((m,i)=>(
            <ScrollReveal key={m.name} type={i===0?"slide-left":"slide-right"} delay={200}>
              <div className="team-card">
                <div className="team-card-top">
                  <div className="avatar-ring"><div className="avatar">{m.initials}</div></div>
                  <div className="team-card-meta">
                    <h3>{m.name}</h3>
                    <div className="role">{m.role}</div>
                    <div className="edu">{m.edu}</div>
                    <a className="team-link" href={m.linkedin} target="_blank" rel="noopener">{linkedinIcon} LinkedIn</a>
                  </div>
                </div>
                <div className="team-divider"/>
                <div className="team-highlights">{m.highlights.map(h=><div className="team-highlight" key={h}>{checkIcon}<span>{h}</span></div>)}</div>
                <div className="team-tags">{m.tags.map(t=><span className="team-tag" key={t}>{t}</span>)}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <style jsx>{`
        #team { background: var(--surface); overflow: hidden; }
        .team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .team-card { background: #0c0c09; border: 1px solid var(--border); border-radius: 18px; padding: clamp(1.5rem,3vw,2.5rem); position: relative; overflow: hidden; transition: all 0.3s ease; height: 100%; display: flex; flex-direction: column; }
        .team-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--accent), var(--accent2)); opacity: 0.6; }
        .team-card:hover { border-color: rgba(232,144,60,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.3); transform: translateY(-2px); }
        .team-card-top { display: flex; gap: 1rem; align-items: flex-start; }
        .avatar-ring { width: 60px; height: 60px; flex-shrink: 0; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2)); padding: 2px; }
        .avatar { width: 100%; height: 100%; border-radius: 50%; background: #0c0c09; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 0.85rem; font-weight: 700; color: var(--accent); }
        .team-card-meta { flex: 1; min-width: 0; }
        h3 { font-family: var(--font-display); font-size: 1.05rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.2rem; }
        .role { font-size: 0.8rem; color: var(--accent); font-family: var(--font-display); font-weight: 500; margin-bottom: 0.1rem; }
        .edu { font-size: 0.72rem; color: var(--muted); margin-bottom: 0.4rem; }
        .team-link { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.75rem; color: var(--muted); text-decoration: none; font-family: var(--font-display); font-weight: 500; transition: color 0.2s; }
        .team-link:hover { color: var(--accent); }
        .team-divider { height: 1px; background: var(--border); margin: 1.25rem 0; }
        .team-highlights { display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.25rem; }
        .team-highlight { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.82rem; color: var(--muted); line-height: 1.5; }
        .team-highlight :global(svg) { margin-top: 3px; flex-shrink: 0; color: var(--accent2); }
        .team-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: auto; padding-top: 1rem; }
        .team-tag { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; font-size: 0.66rem; padding: 0.15rem 0.5rem; color: var(--muted); font-family: var(--font-body); }
        @media (max-width: 768px) { .team-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
