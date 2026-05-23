"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/contexts/LanguageContext";

const t = (l: string) => ({
  tag: l==="es"?"Servicios":"Services",
  h2: l==="es"?<>Lo que construimos<br/>contigo</>:<>What we build<br/>with you</>,
  cards: [
    { svg: <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>, tag:"Strategy", title: l==="es"?"Diagnóstico IA":"AI Diagnosis", desc: l==="es"?"Conversamos sobre tu negocio, mapeamos dónde la IA puede tener impacto real y te entregamos un diagnóstico honesto de por dónde empezar.":"We talk about your business, map where AI can have real impact, and give you an honest diagnosis of where to start.", detailTitle: l==="es"?"Qué incluye el diagnóstico":"What the diagnosis includes", details: l==="es"?["Sesión de 1–2 horas para entender tu operación y procesos actuales","Mapa de los 3–5 procesos con mayor potencial de automatización o mejora con IA","Recomendación de por dónde empezar según esfuerzo e impacto estimados","Documento de diagnóstico entregable, sin compromiso de contratación"]:["1–2 hour session to understand your operation and current processes","Map of 3–5 processes with highest potential for automation or AI improvement","Recommendation on where to start based on estimated effort and impact","Deliverable diagnosis document, with no commitment to hire"] },
    { svg: <g><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></g>, tag:"Automation", title: l==="es"?"Automatización de procesos":"Process Automation", desc: l==="es"?"Analizamos tu operación para identificar dónde la automatización genera más impacto y construimos las soluciones técnicas para lograrlo.":"We analyze your operation to identify where automation generates the most impact and build the technical solutions to achieve it.", detailTitle: l==="es"?"Ejemplos de lo que podemos construir":"Examples of what we can build", details: l==="es"?["Script que genera reportes semanales automáticos desde tus datos (Excel, SQL, APIs)","Flujo que extrae datos de un formulario web y los registra en una base de datos o planilla","Automatización de tareas repetitivas de backoffice con Python o n8n","Dashboard en tiempo real conectado a tus fuentes de datos actuales"]:["Script that auto-generates weekly reports from your data (Excel, SQL, APIs)","Flow that extracts web form data and records it in a database or spreadsheet","Automation of repetitive back-office tasks with Python or n8n","Real-time dashboard connected to your current data sources"] },
    { svg: <g><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></g>, tag:"MVP", title: l==="es"?"Prototipado rápido (MVP)":"Fast Prototyping (MVP)", desc: l==="es"?"¿Tienes una idea? Te ayudamos a definir el alcance mínimo para validarla y construimos ese primer prototipo funcional contigo.":"Have an idea? We help you define the minimum scope to validate it and build that first functional prototype with you.", detailTitle: l==="es"?"Ejemplos de lo que podemos construir":"Examples of what we can build", details: l==="es"?["Aplicación web simple con autenticación, base de datos y lógica de negocio básica","Prototipo de producto con IA integrada para validar con primeros usuarios","Landing page + formulario de captura conectado a notificaciones automáticas","POC técnico para demostrar viabilidad de una idea ante inversores o stakeholders"]:["Simple web app with auth, database and basic business logic","Product prototype with integrated AI to validate with first users","Landing page + capture form connected to automatic notifications","Technical POC to demonstrate viability to investors or stakeholders"] },
    { svg: <g><path d="M12 8V4H8"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M3 14.5c0-2.76 2.24-5 5-5h8c2.76 0 5 2.24 5 5v0c0 2.76-2.24 5-5 5H8c-2.76 0-5-2.24-5-5z"/><path d="M8 14h.01M12 14h.01M16 14h.01"/></g>, tag:"AI Engineering", title: l==="es"?"Agentes IA & Productos custom":"AI Agents & Custom Products", desc: l==="es"?"Diseñamos e implementamos soluciones IA a medida: desde agentes que automatizan tareas hasta sistemas que procesan y analizan información de tu negocio.":"We design and implement custom AI solutions: from agents that automate tasks to systems that process and analyze your business information.", detailTitle: l==="es"?"Ejemplos de lo que podemos construir":"Examples of what we can build", details: l==="es"?["Chatbot con acceso a documentos internos de tu empresa (RAG)","Agente que lee emails, clasifica solicitudes y genera respuestas borradores","Sistema de extracción y resumen automático de información desde PDFs o formularios","Pipeline de análisis de datos con generación automática de reportes"]:["Chatbot with access to your company's internal documents (RAG)","Agent that reads emails, classifies requests and generates draft responses","Automatic extraction and summarization system from PDFs or forms","Data analysis pipeline with automatic report generation"] },
  ],
});

export default function Services() {
  const { lang } = useLang();
  const txt = t(lang);
  const [openIdx, setOpenIdx] = useState<number|null>(null);
  return (
    <section id="services">
      <div className="container">
        <ScrollReveal><span className="section-tag">{txt.tag}</span></ScrollReveal>
        <ScrollReveal delay={80}><h2>{txt.h2}</h2></ScrollReveal>
        <div className="services-grid">
          {txt.cards.map((s,i)=>(
            <ScrollReveal key={i} type="fade-up" delay={200+i*120}>
              <div className={`service-card ${openIdx===i?"open":""}`} onClick={()=>setOpenIdx(openIdx===i?null:i)}>
                <div className="service-top">
                  <div className="service-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{s.svg}</svg></div>
                  <div className="service-head"><h3>{s.title}</h3><span className="service-tag">{s.tag}</span></div>
                  <svg className={`service-chevron ${openIdx===i?"open":""}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <p>{s.desc}</p>
                <div className="service-detail"><div className="service-detail-inner">
                  <div className="service-detail-title">{s.detailTitle}</div>
                  <div className="service-examples">{s.details.map(d=><div className="service-example" key={d}>{d}</div>)}</div>
                </div></div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <style jsx>{`
        #services { background: var(--surface); overflow: hidden; }
        .services-grid { display: flex; flex-direction: column; gap: 1rem; max-width: 760px; }
        .service-card { background: #0c0c09; border: 1px solid var(--border); border-left: 3px solid transparent; border-radius: 0 14px 14px 0; padding: 1.5rem 1.75rem; cursor: pointer; transition: all 0.3s ease; }
        .service-card:hover, .service-card.open { border-color: var(--border); border-left-color: var(--accent); background: #0f0f0c; }
        .service-card.open { border-left-color: var(--accent); box-shadow: 0 0 24px rgba(232,144,60,0.08); }
        .service-top { display: flex; align-items: center; gap: 1rem; }
        .service-icon { width: 48px; height: 48px; flex-shrink: 0; background: var(--accent-dim); border: 1px solid rgba(232,144,60,0.15); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--accent); }
        .service-head { flex: 1; min-width: 0; }
        h3 { font-family: var(--font-display); font-size: 1rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.2rem; }
        .service-tag { font-size: 0.62rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); opacity: 0.7; font-family: var(--font-display); font-weight: 500; }
        .service-chevron { color: var(--muted); flex-shrink: 0; transition: transform 0.3s ease; }
        .service-chevron.open { transform: rotate(180deg); color: var(--accent); }
        p { font-size: 0.85rem; color: var(--muted); line-height: 1.65; margin: 1rem 0 0 0; }
        .service-detail { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s var(--ease-spring); }
        .service-card.open .service-detail { grid-template-rows: 1fr; }
        .service-detail-inner { overflow: hidden; }
        .service-detail-title { font-size: 0.78rem; font-weight: 600; color: var(--accent); font-family: var(--font-display); margin-top: 1rem; margin-bottom: 0.5rem; }
        .service-examples { display: flex; flex-direction: column; gap: 0.4rem; }
        .service-example { font-size: 0.8rem; color: var(--muted); line-height: 1.5; padding-left: 0.75rem; border-left: 1px solid rgba(255,255,255,0.06); }
      `}</style>
    </section>
  );
}
