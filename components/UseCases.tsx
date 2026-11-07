"use client";

import ScrollReveal from "./ScrollReveal";
import { SectionHeading, SectionFooter } from "./PageElements";
import { useLang } from "@/contexts/LanguageContext";

const t = (l: string) => ({
  tag: l==="es"?"Industrias":"Industries",
  h2: l==="es"?<>Dónde sembramos<br/>las raíces</>:<>Where we plant<br/>the roots</>,
  sub: l==="es"?"Queremos trabajar con empresas que quieran moverse primero, sin importar la industria.":"We want to work with companies that want to move first, regardless of industry.",
  cases: [
    { svg: <g><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></g>, label:"Tech" },
    { svg: <g><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></g>, label: l==="es"?"Banca":"Banking" },
    { svg: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>, label: l==="es"?"Salud":"Health" },
    { svg: <g><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></g>, label: l==="es"?"Educación":"Education" },
    { svg: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, label: l==="es"?"Legal":"Legal" },
  ],
});

export default function UseCases() {
  const { lang } = useLang();
  const txt = t(lang);
  const es = lang === "es";
  return (
    <section id="usecases" aria-labelledby="usecases-title">
      <div className="container">
        <SectionHeading id="usecases-title" eyebrow={txt.tag} description={txt.sub}>
          {es ? <>Nuevas ideas.<br /><em>En tu industria.</em></> : <>New ideas.<br /><em>In your industry.</em></>}
        </SectionHeading>
        <div className="cases-grid">
          {txt.cases.map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="case-chip">
                <span className="case-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{item.svg}</svg></span>
                <span>{item.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <SectionFooter number="05" label={es ? "Sin fronteras de industria" : "Across industries"} href="#team" link={es ? "Conoce al equipo" : "Meet the team"} />
      </div>
    </section>
  );
}
