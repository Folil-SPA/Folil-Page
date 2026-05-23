"use client";

import { useState, FormEvent } from "react";

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
        }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      alert("Error al enviar el formulario. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist">
      <div className="container">
        <span className="section-tag">Únete</span>
        <h2>¿Listo para crecer<br />desde la raíz?</h2>
        <p className="section-sub" style={{ margin: "0 auto", textAlign: "center" }}>
          Somos un equipo pequeño y selectivo. Únete a la lista y conversamos sobre tu proyecto.
        </p>

        {submitted ? (
          <div className="form-success">
            <svg className="success-icon" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" stroke="#e8903c" strokeWidth="1.5" opacity="0.4" />
              <path d="M12 20.5l6 6 10-12" stroke="#e8903c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="success-text">Listo. Te contactaremos pronto.</span>
            <span className="success-sub">Revisamos cada solicitud personalmente.</span>
          </div>
        ) : (
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <input type="text" name="name" placeholder="Nombre / Name" autoComplete="name" required />
              </div>
              <div className="field">
                <input type="email" name="email" placeholder="Email" autoComplete="email" required />
              </div>
            </div>
            <div className="field">
              <input type="text" name="company" placeholder="Empresa / Company" />
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Enviando..." : "Unirme a la lista →"}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        #waitlist {
          background: var(--surface);
          text-align: center;
        }
        .waitlist-form {
          max-width: 520px;
          margin: 2rem auto 0;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .field input {
          width: 100%;
          padding: 0.85rem 1rem;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--text);
          font-family: var(--font-body);
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .field input:focus {
          border-color: rgba(232, 144, 60, 0.4);
          box-shadow: 0 0 0 3px rgba(232, 144, 60, 0.08);
        }
        .field input::placeholder { color: var(--muted); }
        .btn-submit {
          width: 100%;
          padding: 0.95rem;
          background: var(--accent);
          color: #000;
          border: none;
          border-radius: 10px;
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.75rem;
          box-shadow: 0 0 40px rgba(232, 144, 60, 0.22), 0 2px 20px rgba(232, 144, 60, 0.15);
          transition: all 0.2s var(--ease-spring);
        }
        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 48px rgba(232, 144, 60, 0.22), 0 2px 20px rgba(232, 144, 60, 0.25);
        }
        .btn-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
        .form-success {
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .success-text {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 600;
        }
        .success-sub {
          font-size: 0.85rem;
          color: var(--muted);
        }
        @media (max-width: 480px) {
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
