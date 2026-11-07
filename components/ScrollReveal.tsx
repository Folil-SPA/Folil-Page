"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealType = "fade-up" | "slide-left" | "slide-right" | "scale";

export default function ScrollReveal({ children, type = "fade-up", delay = 0, className = "" }: {
  children: ReactNode;
  type?: RevealType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || motion.matches || !("IntersectionObserver" in window)) return;

    // Server-rendered content stays visible. Only off-screen elements are armed.
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    const reveal = () => {
      element.classList.remove("reveal-pending");
      element.classList.add("reveal-visible");
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        reveal();
        observer.disconnect();
      }
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    const onMotionChange = () => {
      if (motion.matches) {
        reveal();
        observer.disconnect();
      }
    };
    element.classList.add("reveal-pending");
    observer.observe(element);
    element.addEventListener("focusin", reveal);
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      element.classList.remove("reveal-pending");
      element.removeEventListener("focusin", reveal);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div ref={ref} className={`reveal reveal-${type} ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
