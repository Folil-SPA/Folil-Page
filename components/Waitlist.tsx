"use client";

import { useState, type FormEvent } from "react";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/contexts/LanguageContext";
import { Arrow, SectionHeading, SectionFooter } from "./PageElements";

export default function Waitlist() {
  const { lang } = useLang();
  const es = lang === "es";
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(false);
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.get("name"), email: data.get("email"), company: data.get("company") }),
      });
      if (!response.ok) throw new Error("Contact request failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" aria-labelledby="waitlist-title">
      <div className="container">
        <div className="waitlist-layout">
          <SectionHeading id="waitlist-title" eyebrow={es ? "Construyamos juntos" : "Let's build together"} description={es ? "Somos un equipo pequeño y selectivo. Únete a la lista y conversemos sobre tu proyecto." : "We're a small and selective team. Join the list and let's talk about your project."}>
            {es ? <>Tu idea.<br /><em>Nuestra próxima</em><br />raíz.</> : <>Your idea.<br /><em>Our next</em><br />root.</>}
          </SectionHeading>
          <ScrollReveal delay={100}>
            {submitted ? (
              <div className="form-success" role="status">
                <span className="section-tag">{es ? "Mensaje recibido" : "Message received"}</span>
                <p className="success-text">{es ? "Listo. Te contactaremos pronto." : "Done. We'll be in touch soon."}</p>
                <p className="success-sub">{es ? "Revisamos cada solicitud personalmente." : "We review every request personally."}</p>
              </div>
            ) : (
              <form className="waitlist-form" onSubmit={handleSubmit} aria-busy={loading}>
                <div className="field"><label htmlFor="contact-name">{es ? "01 / Tu nombre" : "01 / Your name"}</label><input id="contact-name" name="name" type="text" placeholder={es ? "¿Cómo te llamas?" : "What's your name?"} autoComplete="name" required maxLength={160} /></div>
                <div className="field"><label htmlFor="contact-email">02 / Email</label><input id="contact-email" name="email" type="email" placeholder={es ? "tu@empresa.com" : "you@company.com"} autoComplete="email" required maxLength={254} /></div>
                <div className="field"><label htmlFor="contact-company">{es ? "03 / Empresa (opcional)" : "03 / Company (optional)"}</label><input id="contact-company" name="company" type="text" placeholder={es ? "¿Dónde quieres crear impacto?" : "Where do you want to make an impact?"} autoComplete="organization" maxLength={180} /></div>
                {error && <p className="form-error" role="alert">{es ? "No pudimos enviar tu solicitud. Intenta nuevamente o escríbenos a " : "We couldn't send your request. Please try again or write to "}<a href="mailto:contacto@folillabs.com">contacto@folillabs.com</a>.</p>}
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? (es ? "Enviando…" : "Sending…") : (es ? "Unirme a la lista" : "Join the waitlist")}<Arrow /></button>
                <p className="form-note">{es ? "Una conversación es un buen comienzo." : "A conversation is a good place to start."}</p>
              </form>
            )}
          </ScrollReveal>
        </div>
        <SectionFooter number="07" label={es ? "Todo comienza con una idea" : "It all starts with an idea"} href="mailto:contacto@folillabs.com" link="contacto@folillabs.com" />
      </div>
    </section>
  );
}
