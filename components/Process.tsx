"use client";

import ScrollReveal from "./ScrollReveal";
import { SectionHeading, SectionFooter } from "./PageElements";
import { useLang } from "@/contexts/LanguageContext";

const t = (l: string) => ({
  tag: l==="es"?"Cómo trabajamos":"How we work",
  h2: l==="es"?<>De la raíz al producto,<br/>en tres pasos</>:<>From root to product,<br/>in three steps</>,
  steps: [
    { num:"01", phase: l==="es"?"Diagnóstico":"Diagnosis", time: l==="es"?"~1–2 semanas":"~1–2 weeks", title: l==="es"?"Entendemos tu contexto":"We understand your context", desc: l==="es"?"Mapeamos tu negocio, datos y el problema real. Definimos el alcance del MVP con criterios claros de éxito y ROI medible.":"We map your business, data, and the real problem. We define the MVP scope with clear success criteria and measurable ROI." },
    { num:"02", phase: l==="es"?"Diseño & Build":"Design & Build", time: l==="es"?"~4–8 semanas":"~4–8 weeks", title: l==="es"?"Construimos con precisión":"We build with precision", desc: l==="es"?"Ciclos cortos de feedback, demos semanales. Usamos los mejores modelos y herramientas IA disponibles en el mercado.":"Short feedback cycles, weekly demos. We use the best AI models and tools available on the market." },
    { num:"03", phase: l==="es"?"Deploy & Escala":"Deploy & Scale", time: l==="es"?"~8–12 semanas":"~8–12 weeks", title: l==="es"?"Lanzamos y transferimos":"We launch and transfer", desc: l==="es"?"Desplegamos la solución y te acompañamos en los primeros pasos. El objetivo es que quede en tus manos y puedas seguir construyendo sobre ella.":"We deploy the solution and support you in the first steps. The goal is for it to be in your hands so you can keep building on it." },
  ],
});

export default function Process() {
  const { lang } = useLang();
  const txt = t(lang);
  const es = lang === "es";
  return (
    <section id="process" aria-labelledby="process-title">
      <div className="container">
        <div className="process-layout">
          <SectionHeading id="process-title" eyebrow={txt.tag} description={es ? "Un camino claro. Desde entender tu problema hasta poner la solución en tus manos." : "A clear path. From understanding your problem to putting the solution in your hands."}>
            {es ? <>De la raíz<br /><em>al producto.</em></> : <>From the root<br /><em>to your product.</em></>}
          </SectionHeading>
          <div className="process-steps">
            {txt.steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 100}>
                <article className="step">
                  <span className="step-marker">{step.num}</span>
                  <div className="step-body">
                    <div className="step-phase">{step.phase}<span className="step-time">{step.time}</span></div>
                    <h3>{step.title}</h3><p>{step.desc}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <SectionFooter number="02" label={es ? "Así trabajamos" : "How we work"} href="#projects" link={es ? "Experiencia aplicada" : "Applied experience"} />
      </div>
    </section>
  );
}
