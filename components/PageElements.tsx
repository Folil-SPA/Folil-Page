import type { ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";

export function Arrow({ direction = "right" }: { direction?: "right" | "down" | "up" }) {
  return (
    <svg className={`arrow arrow-${direction}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 5l7 7-7 7" />
    </svg>
  );
}

export function HeadingLine({ children }: { children: ReactNode }) {
  return <span className="heading-line"><span>{children}</span></span>;
}

export function SectionHeading({ id, eyebrow, children, description, className = "" }: {
  id: string;
  eyebrow: string;
  children: ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <ScrollReveal className={`section-heading ${className}`}>
      <p className="section-tag">{eyebrow}</p>
      <h2 id={id}>{children}</h2>
      {description ? <p className="section-sub">{description}</p> : null}
    </ScrollReveal>
  );
}

export function SectionFooter({ number, label, href, link }: { number: string; label: string; href: string; link: string }) {
  return (
    <div className="section-footer">
      <span><b>{number}</b> / {label}</span>
      <a href={href}>{link}<Arrow /></a>
    </div>
  );
}
