"use client";

import ScrollReveal from "./ScrollReveal";
import { SectionHeading, SectionFooter } from "./PageElements";
import { useLang } from "@/contexts/LanguageContext";

const checkIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>;
const linkedinIcon = <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.5h4.52V23H.24V8.5zM8 8.5h4.33v1.98h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.43 3.02 5.43 6.94V23h-4.52v-7.02c0-1.67-.03-3.83-2.33-3.83-2.34 0-2.7 1.83-2.7 3.71V23H8V8.5z"/></svg>;

const t = (l: string) => ({
  tag: l==="es"?"Quiénes somos":"Who we are",
  h2: l==="es"?<>Dos ingenieros.<br/>Una obsesión.</>:<>Two engineers.<br/>One obsession.</>,
  sub: l==="es"?"Estudiantes de Ingeniería Civil Industrial con Diploma TI en la PUC. Construimos Folil Labs porque creemos que la IA debe ser accesible para todas las empresas.":"Industrial Civil Engineering students with TI Diploma at PUC. We built Folil Labs because we believe AI should be accessible to all companies.",
  members: [
    { initials:"PA", name:"Patricio Acevedo", image:"/Patricio.jpg", role:"Co-founder", edu:"ICI + Diploma TI · PUC", linkedin:"https://www.linkedin.com/in/patricio-acevedo-flores-63300b30b", highlights: l==="es"?["Agentes IA y automatización de procesos aplicada en banca y defensa — CiberLab UC.","Intern en Novo Nordisk — proyectos de IA aplicada en salud.","Ayudante en programación, optimización y bases de datos."]:["AI agents and process automation applied in banking and defense — CiberLab UC.","Intern at Novo Nordisk — applied AI projects in healthcare.","Teaching assistant in programming, optimization and databases."], tags:["Python","SQL","R","Power BI","Claude API","Kali Linux","Dataiku","Jupyter","Ciberseguridad"] },
    { initials:"AN", name:"Álvaro Navarrete", image:"/Alvaro.jpg", role:"Co-founder", edu:"ICI + Magíster CS + Diploma TI · PUC", linkedin:"https://www.linkedin.com/in/%C3%A1lvaro-navarrete-257a1423a/", highlights: l==="es"?["Ciberinteligencia con IA para análisis de incidentes del sector financiero — CiberLab UC.","Jefe de Tecnologías del CAi UC — infraestructura y coordinación de eventos tecnológicos.","Coordinador del Cuerpo de Tutores Ingeniería UC: lideró 124 tutores y diseñó capacitaciones."]:["AI-powered cyber intelligence for financial sector incident analysis — CiberLab UC.","Head of Technology at CAi UC — infrastructure and tech event coordination.","Coordinator of UC Engineering Tutoring Corps: led 124 tutors and designed training programs."], tags:["Python","Pandas","R","Power BI","Tableau","Mathematica","Inglés B2","Liderazgo"] },
  ],
});

export default function Team() {
  const { lang } = useLang();
  const txt = t(lang);
  const es = lang === "es";
  return (
    <section id="team" aria-labelledby="team-title">
      <div className="container">
        <SectionHeading id="team-title" eyebrow={txt.tag} description={txt.sub}>
          {es ? <>Dos ingenieros.<br /><em>Una obsesión.</em></> : <>Two engineers.<br /><em>One obsession.</em></>}
        </SectionHeading>
        <div className="team-grid">
          {txt.members.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 100}>
              <article className="team-card">
                <div className="team-card-top">
                  <div className="avatar-ring"><img className="avatar" src={member.image} alt={member.name} width="100" height="120" loading="lazy" /></div>
                  <div className="team-card-meta">
                    <h3>{member.name}</h3><div className="role">{member.role}</div><div className="edu">{member.edu}</div>
                    <a className="team-link" href={member.linkedin} target="_blank" rel="noopener noreferrer">{linkedinIcon} LinkedIn<span className="sr-only"> · {member.name}</span></a>
                  </div>
                </div>
                <div className="team-divider" />
                <div className="team-highlights">{member.highlights.map(highlight => <div className="team-highlight" key={highlight}>{checkIcon}<span>{highlight}</span></div>)}</div>
                <div className="team-tags">{member.tags.map(tag => <span className="team-tag" key={tag}>{tag}</span>)}</div>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <SectionFooter number="06" label={es ? "Desde Santiago, Chile" : "From Santiago, Chile"} href="#waitlist" link={es ? "Construyamos juntos" : "Let's build together"} />
      </div>
    </section>
  );
}
