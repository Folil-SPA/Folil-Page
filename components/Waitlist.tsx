"use client";

import { useState, FormEvent } from "react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/contexts/LanguageContext";

const t = (lang: string) => ({
  tag: lang==="es"?"Únete":"Join",
  h2: lang==="es"?<>¿Listo para crecer<br/>desde la raíz?</>:<>Ready to grow<br/>from the root?</>,
  sub: lang==="es"?"Somos un equipo pequeño y selectivo. Únete a la lista y conversamos sobre tu proyecto.":"We're a small and selective team. Join the list and let's talk about your project.",
  name: lang==="es"?"Nombre":"Name",
  email: "Email",
  company: lang==="es"?"Empresa":"Company",
  btn: lang==="es"?"Unirme a la lista →":"Join the list →",
  sending: lang==="es"?"Enviando...":"Sending...",
  success: lang==="es"?"Listo. Te contactaremos pronto.":"Done. We'll be in touch soon.",
  successSub: lang==="es"?"Revisamos cada solicitud personalmente.":"We review every request personally.",
  error: lang==="es"?"Error al enviar el formulario. Intenta de nuevo.":"Error submitting form. Please try again.",
});

export default function Waitlist() {
  const { lang } = useLang();
  const txt = t(lang);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setLoading(true);
    const form = e.currentTarget; const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", { method:"POST", headers:{Accept:"application/json","Content-Type":"application/json"}, body:JSON.stringify({name:data.get("name"),email:data.get("email"),company:data.get("company")}) });
      if(!res.ok) throw new Error();
      setSubmitted(true);
    } catch { alert(txt.error); }
    finally { setLoading(false); }
  };

  return (
    <section id="waitlist">
      <div className="waitlist-bg"/>
      <div className="container">
        <ScrollReveal><span className="section-tag">{txt.tag}</span></ScrollReveal>
        <ScrollReveal delay={80}><h2>{txt.h2}</h2></ScrollReveal>
        <ScrollReveal delay={160}><p className="section-sub" style={{margin:"0 auto",textAlign:"center"}}>{txt.sub}</p></ScrollReveal>
        {submitted ? (
          <div className="form-success">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" stroke="#e8903c" strokeWidth="1.5" opacity="0.4"/><path d="M12 20.5l6 6 10-12" stroke="#e8903c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="success-text">{txt.success}</span>
            <span className="success-sub">{txt.successSub}</span>
          </div>
        ) : (
          <ScrollReveal delay={200}>
            <form className="waitlist-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field"><input type="text" name="name" placeholder={txt.name} autoComplete="name" required/></div>
                <div className="field"><input type="email" name="email" placeholder={txt.email} autoComplete="email" required/></div>
              </div>
              <div className="field"><input type="text" name="company" placeholder={txt.company}/></div>
              <button type="submit" className="btn-submit" disabled={loading}>{loading?txt.sending:txt.btn}</button>
            </form>
          </ScrollReveal>
        )}
      </div>
      <style jsx>{`
        #waitlist { position: relative; overflow: hidden; text-align: center; background: #0c0c09; }
        .waitlist-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, rgba(232,144,60,0.06) 0%, transparent 50%); pointer-events: none; }
        .waitlist-form { max-width: 480px; margin: 2rem auto 0; position: relative; z-index: 1; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem; }
        .field input { width: 100%; padding: 0.9rem 1rem; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; color: var(--text); font-family: var(--font-body); font-size: 0.9rem; outline: none; transition: all 0.2s; }
        .field input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(232,144,60,0.08); }
        .field input::placeholder { color: var(--muted); }
        .btn-submit { width: 100%; padding: 1rem; background: var(--accent); color: #000; border: none; border-radius: 12px; font-family: var(--font-display); font-size: 0.95rem; font-weight: 600; cursor: pointer; margin-top: 0.75rem; box-shadow: 0 0 48px rgba(232,144,60,0.25), 0 4px 24px rgba(232,144,60,0.15); transition: all 0.2s var(--ease-spring); position: relative; overflow: hidden; }
        .btn-submit::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent); animation: btnShine 2.8s ease-in-out infinite; }
        .btn-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 56px rgba(232,144,60,0.3), 0 4px 32px rgba(232,144,60,0.2); }
        .btn-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
        .form-success { padding: 3rem 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
        .success-text { font-family: var(--font-display); font-size: 1.05rem; font-weight: 600; }
        .success-sub { font-size: 0.85rem; color: var(--muted); }
        @keyframes btnShine { 0% { left: -100%; } 50%, 100% { left: 100%; } }
        @media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
