"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Value from "@/components/Value";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import CtaBanner from "@/components/CtaBanner";
import UseCases from "@/components/UseCases";
import Team from "@/components/Team";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    const progressBar = document.getElementById("scroll-progress");
    const nav = document.getElementById("main-nav");

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar) {
        progressBar.style.width =
          (total > 0 ? (scrolled / total) * 100 : 0) + "%";
      }
      if (nav) {
        nav.classList.toggle("scrolled", scrolled > 40);
      }
    };

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    window.addEventListener("scroll", onScroll, { passive: true });
    document.querySelectorAll(".reveal-anim").forEach((el) => revealObs.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      revealObs.disconnect();
    };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Value />
        <Process />
        <Projects />
        <Services />
        <CtaBanner />
        <UseCases />
        <Team />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
