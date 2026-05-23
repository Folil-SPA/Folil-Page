export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <h2>¿Conversamos?</h2>
        <p>
          Escuchamos tu idea y te damos una primera impresión sin compromiso. Somos dos ingenieros, no un ejército de vendedores.
        </p>
        <a href="#waitlist" className="btn-primary">Escríbenos →</a>
      </div>

      <style jsx>{`
        .cta-banner {
          background: var(--surface);
          text-align: center;
          padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem);
        }
        h2 {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 700;
          letter-spacing: -0.035em;
          margin-bottom: 1rem;
          line-height: 1.1;
        }
        p {
          font-size: 1rem;
          color: var(--muted);
          max-width: 520px;
          margin: 0 auto 2rem;
          line-height: 1.7;
        }
        .btn-primary {
          font-size: 0.95rem;
          padding: 0.95rem 2rem;
        }
      `}</style>
    </section>
  );
}
