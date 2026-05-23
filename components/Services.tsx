"use client";

import { useState } from "react";

const services = [
  {
    svg: <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    tag: "Strategy",
    title: "Diagnóstico IA",
    desc: "Conversamos sobre tu negocio, mapeamos dónde la IA puede tener impacto real y te entregamos un diagnóstico honesto de por dónde empezar.",
    detailTitle: "Qué incluye el diagnóstico",
    details: [
      "Sesión de 1–2 horas para entender tu operación y procesos actuales",
      "Mapa de los 3–5 procesos con mayor potencial de automatización o mejora con IA",
      "Recomendación de por dónde empezar según esfuerzo e impacto estimados",
      "Documento de diagnóstico entregable, sin compromiso de contratación",
    ],
  },
  {
    svg: (
      <>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </>
    ),
    tag: "Automation",
    title: "Automatización de procesos",
    desc: "Analizamos tu operación para identificar dónde la automatización genera más impacto y construimos las soluciones técnicas para lograrlo.",
    detailTitle: "Ejemplos de lo que podemos construir",
    details: [
      "Script que genera reportes semanales automáticos desde tus datos (Excel, SQL, APIs)",
      "Flujo que extrae datos de un formulario web y los registra en una base de datos o planilla",
      "Automatización de tareas repetitivas de backoffice con Python o n8n",
      "Dashboard en tiempo real conectado a tus fuentes de datos actuales",
    ],
  },
  {
    svg: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </>
    ),
    tag: "MVP",
    title: "Prototipado rápido (MVP)",
    desc: "¿Tienes una idea? Te ayudamos a definir el alcance mínimo para validarla y construimos ese primer prototipo funcional contigo.",
    detailTitle: "Ejemplos de lo que podemos construir",
    details: [
      "Aplicación web simple con autenticación, base de datos y lógica de negocio básica",
      "Prototipo de producto con IA integrada para validar con primeros usuarios",
      "Landing page + formulario de captura conectado a notificaciones automáticas",
      "POC técnico para demostrar viabilidad de una idea ante inversores o stakeholders",
    ],
  },
  {
    svg: (
      <>
        <path d="M12 8V4H8" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M3 14.5c0-2.76 2.24-5 5-5h8c2.76 0 5 2.24 5 5v0c0 2.76-2.24 5-5 5H8c-2.76 0-5-2.24-5-5z" />
        <path d="M8 14h.01M12 14h.01M16 14h.01" />
      </>
    ),
    tag: "AI Engineering",
    title: "Agentes IA & Productos custom",
    desc: "Diseñamos e implementamos soluciones IA a medida: desde agentes que automatizan tareas hasta sistemas que procesan y analizan información de tu negocio.",
    detailTitle: "Ejemplos de lo que podemos construir",
    details: [
      "Chatbot con acceso a documentos internos de tu empresa (RAG)",
      "Agente que lee emails, clasifica solicitudes y genera respuestas borradores",
      "Sistema de extracción y resumen automático de información desde PDFs o formularios",
      "Pipeline de análisis de datos con generación automática de reportes",
    ],
  },
];

export default function Services() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <section id="services">
      <div className="container">
        <span className="section-tag">Servicios</span>
        <h2>Lo que construimos<br />contigo</h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <div
              className={`service-card ${openIdx === i ? "open" : ""}`}
              key={i}
              onClick={() => toggle(i)}
            >
              <div className="service-card-top">
                <div className="service-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {s.svg}
                  </svg>
                </div>
                <svg className="service-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="service-tag">{s.tag}</span>
              <div className="service-detail">
                <div className="service-detail-inner">
                  <div className="service-detail-title">{s.detailTitle}</div>
                  <div className="service-examples">
                    {s.details.map((d) => (
                      <div className="service-example" key={d}>{d}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--border);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .service-card {
          background: #0f0f0f;
          padding: clamp(1.5rem, 3vw, 2.5rem);
          position: relative;
          cursor: pointer;
          transition: all 0.35s ease;
        }
        .service-card::after {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle at 30% 30%, rgba(232, 144, 60, 0.1) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .service-card:hover::after { opacity: 1; }
        .service-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .service-icon {
          width: 40px; height: 40px;
          background: var(--accent-dim);
          border: 1px solid rgba(232, 144, 60, 0.18);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          box-shadow: 0 0 24px rgba(232, 144, 60, 0.08);
          transition: all 0.3s ease;
        }
        .service-card:hover .service-icon {
          transform: scale(1.12);
          box-shadow: 0 0 32px rgba(232, 144, 60, 0.15);
        }
        .service-chevron {
          color: var(--muted);
          transition: transform 0.3s ease;
        }
        .service-card.open .service-chevron {
          transform: rotate(180deg);
        }
        h3 {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }
        p {
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .service-tag {
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          font-size: 0.7rem;
          padding: 0.2rem 0.65rem;
          color: var(--muted);
          font-family: var(--font-body);
        }
        .service-detail {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s var(--ease-spring);
        }
        .service-card.open .service-detail {
          grid-template-rows: 1fr;
        }
        .service-detail-inner {
          overflow: hidden;
        }
        .service-detail-title {
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--accent);
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
        }
        .service-examples {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .service-example {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.6;
          padding-left: 0.75rem;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
