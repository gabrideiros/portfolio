import About from "./about";
import Contact from "./contact";
import Footer from "./footer";
import Header from "./header";
import Hero from "./hero";
import Projects from "./projects";
import Skills from "./skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br bg-background">
      <Header />
      <div className="mx-auto px-4 sm:px-6 max-w-7xl">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
