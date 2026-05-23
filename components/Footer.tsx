export default function Footer() {
  return (
    <footer>
      <a href="#" className="footer-logo">
        <svg className="logo-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true" width="20" height="20">
          <path d="M16 25V11" stroke="#e8903c" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M16 18c-4.4-1.4-6.8-4.2-7.2-8.2M16 18c4.4-1.4 6.8-4.2 7.2-8.2M16 23c-4.2-1-7-3.2-8.4-6.8M16 23c4.2-1 7-3.2 8.4-6.8" stroke="#7fb069" strokeWidth="1.9" strokeLinecap="round" />
          <circle cx="16" cy="8" r="2.1" fill="#e8903c" />
          <circle cx="8.6" cy="9.4" r="1.8" fill="#7fb069" />
          <circle cx="23.4" cy="9.4" r="1.8" fill="#7fb069" />
          <path d="M11.8 25.4c1.9-1.3 3.3-2.5 4.2-3.7.9 1.2 2.3 2.4 4.2 3.7" stroke="#e8903c" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        folil labs
      </a>
      <p>&copy; 2025 Folil Labs · Santiago, Chile · PUC</p>
      <div className="footer-links">
        <a href="mailto:contacto@folil.com">contacto@folil.com</a>
        <a href="https://www.linkedin.com/in/patricio-acevedo-flores-63300b30b" target="_blank" rel="noopener">LinkedIn Patricio</a>
        <a href="https://www.linkedin.com/in/%C3%A1lvaro-navarrete-257a1423a/" target="_blank" rel="noopener">LinkedIn Alvaro</a>
        <a href="#waitlist">Lista de espera</a>
      </div>

      <style jsx>{`
        footer {
          text-align: center;
          padding: 3rem clamp(1.5rem, 5vw, 4rem) 2.5rem;
          border-top: 1px solid var(--border);
        }
        .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text);
          text-decoration: none;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }
        p {
          font-size: 0.78rem;
          color: var(--muted);
          margin-bottom: 1.25rem;
        }
        .footer-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.25rem;
        }
        .footer-links a {
          font-size: 0.8rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--text); }
      `}</style>
    </footer>
  );
}
