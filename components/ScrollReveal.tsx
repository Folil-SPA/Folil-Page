"use client";

import { useEffect, useRef } from "react";

type RevealType = "fade-up" | "slide-left" | "slide-right" | "scale";

interface ScrollRevealProps {
  children: React.ReactNode;
  type?: RevealType;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  type = "fade-up",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("reveal-visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal-${type} ${className}`}>
      {children}
    </div>
  );
}
