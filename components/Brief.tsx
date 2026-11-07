"use client";

import { useLang } from "@/contexts/LanguageContext";
import ScrollReveal from "./ScrollReveal";

export default function Brief() {
  const { lang } = useLang();
  const es = lang === "es";
  return (
    <aside className="editorial-brief" aria-label={es ? "Nuestra forma de construir" : "Our approach to building"}>
      <ScrollReveal className="container brief-grid">
        <p className="section-tag">{es ? "La idea es el comienzo." : "The idea is the beginning."}</p>
        <p className="brief-statement">{es ? <>Ingeniería rigurosa.<br />IA en el centro. <span>Contigo, desde cero.</span></> : <>Rigorous engineering.<br />AI at the core. <span>With you, from scratch.</span></>}</p>
        <span className="brief-mark" aria-hidden="true">↘</span>
      </ScrollReveal>
    </aside>
  );
}
