"use client";

import { useLang } from "@/contexts/LanguageContext";
import { Arrow } from "./PageElements";

export default function Hero() {
  const { lang } = useLang();
  const es = lang === "es";

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-map-slot" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-content" key={lang}>
          <p className="section-tag hero-eyebrow">
            <span className="status-dot" aria-hidden="true" />
            {es ? "Motor IA para empresas early adopters" : "AI engine for early adopter companies"}
          </p>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-line"><span>{es ? "La " : "The "}<em>{es ? "raíz" : "root"}</em></span></span>
            <span className="hero-line"><span>{es ? "de tus" : "of your"}</span></span>
            <span className="hero-line"><span>{es ? "productos IA" : "AI products"}</span></span>
          </h1>
          <p className="hero-sub">
            {es ? (
              <><strong>Dos ingenieros PUC especializados en IA,</strong> listos para construir contigo desde cero. Sin estructura de consultora, sin overhead. Solo ingeniería real aplicada a tu problema.</>
            ) : (
              <><strong>Two PUC engineers specialized in AI,</strong> ready to build with you from scratch. No consulting overhead. Just real engineering applied to your problem.</>
            )}
          </p>
          <div className="hero-actions">
            <a href="#waitlist" className="btn btn-primary">{es ? "Únete a la lista de espera" : "Join the waitlist"}<Arrow /></a>
            <a href="#process" className="btn btn-secondary">{es ? "Cómo trabajamos" : "How we work"}</a>
          </div>
          <dl className="hero-meta">
            <div><dt>{es ? "Fundadores" : "Founders"}</dt><dd>02<span> / PUC</span></dd></div>
            <div><dt>{es ? "Etapas de trabajo" : "Stages of work"}</dt><dd>03<span> / {es ? "Proceso" : "Process"}</span></dd></div>
            <div><dt>{es ? "Servicios" : "Services"}</dt><dd>04<span> / {es ? "IA aplicada" : "Applied AI"}</span></dd></div>
          </dl>
        </div>
        <div className="hero-bottom section-footer">
          <span><span className="brand-name">Folil Labs</span> <b>·</b> Santiago, Chile</span>
          <a href="#value">{es ? "Desde la raíz" : "From the root"}<Arrow direction="down" /></a>
        </div>
      </div>
    </section>
  );
}
