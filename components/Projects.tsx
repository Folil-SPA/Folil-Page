"use client";

import ScrollReveal from "./ScrollReveal";
import { SectionHeading, SectionFooter } from "./PageElements";
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
  const es = lang === "es";
  return (
    <section id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading id="projects-title" eyebrow={txt.tag} description={txt.sub}>
          {es ? <>Lo que hemos<br /><em>construido.</em></> : <>What we have<br /><em>built.</em></>}
        </SectionHeading>
        <div className="projects-grid">
          {txt.projects.map((project, i) => (
            <ScrollReveal key={project.org} delay={(i % 2) * 100}>
              <article className="project-card">
                <div className="project-header"><span className="project-sector">0{i + 1} / {es ? ["Banca", "Defensa", "Salud", "Educación"][i] : ["Banking", "Defense", "Healthcare", "Education"][i]}</span></div>
                <div className="project-org">{project.org}</div>
                <h3>{project.title}</h3><p>{project.desc}</p>
                <div className="project-tags">{project.tags.map(tag => <span className="project-tag" key={tag}>{tag}</span>)}</div>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <SectionFooter number="03" label={es ? "Ingeniería en acción" : "Engineering in action"} href="#services" link={es ? "Qué construimos contigo" : "What we build with you"} />
      </div>
    </section>
  );
}
