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
