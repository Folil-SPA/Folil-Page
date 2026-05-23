"use client";

import ScrollReveal from "./ScrollReveal";

const steps = [
  { num: "01", phase: "Diagnóstico", title: "Entendemos tu contexto", desc: "Mapeamos tu negocio, datos y el problema real. Definimos el alcance del MVP con criterios claros de éxito y ROI medible." },
  { num: "02", phase: "Diseño & Build", title: "Construimos con precisión", desc: "Ciclos cortos de feedback, demos semanales. Usamos los mejores modelos y herramientas IA disponibles en el mercado." },
  { num: "03", phase: "Deploy & Escala", title: "Lanzamos y transferimos", desc: "Desplegamos la solución y te acompañamos en los primeros pasos. El objetivo es que quede en tus manos y puedas seguir construyendo sobre ella." },
];

export default function Process() {
  return (
    <section id="process">
      <div className="container">
        <ScrollReveal><span className="section-tag">Cómo trabajamos</span></ScrollReveal>
        <ScrollReveal delay={80}><h2>De la raíz al producto,<br />en tres pasos</h2></ScrollReveal>
        <div className="process-steps">
          {steps.map((s, i) => (
            <ScrollReveal key={s.num} type={i === 0 ? "slide-left" : i === 2 ? "slide-right" : "fade-up"} delay={200 + i * 120}>
              <div className="step">
                <div className="step-num">{s.num} — <span>{s.phase}</span></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <style jsx>{`
        .process-steps {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--border);
          border-radius: 18px; overflow: hidden;
          border: 1px solid var(--border);
        }
        .step {
          background: #0f0f0f; padding: clamp(1.5rem, 3vw, 2.5rem);
          height: 100%; position: relative; transition: all 0.35s ease;
        }
        .step::after {
          content: ''; position: absolute; top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle at 30% 30%, rgba(232, 144, 60, 0.12) 0%, transparent 50%);
          opacity: 0; transition: opacity 0.35s ease; pointer-events: none;
        }
        .step:hover::after { opacity: 1; }
        .step:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        .step-num { font-family: var(--font-display); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 1rem; }
        .step-num span { color: var(--accent); }
        h3 { font-family: var(--font-display); font-size: 1.05rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
        p { font-size: 0.875rem; color: var(--muted); line-height: 1.7; }
        @media (max-width: 768px) { .process-steps { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
