import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Value from "@/components/Value";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
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
        <Value />
        <Process />
        <Projects />
        <Services />
        <UseCases />
        <Team />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
