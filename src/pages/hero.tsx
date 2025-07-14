import { Rocket, Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {

  const scrollToSection = (hash: string) => {
    if (location.pathname === "/") {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/${hash}`;
    }
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-15">
            Hey, I'm Gabriel!
          </h1>
          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Crafting the next level of{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Minecraft Add-Ons
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Bedrock Add-On & Java Developer | Gameplay Enginer | Minecraft
              Enthusiast
              <br />
              Transforming imaginations into reality within the game
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="transition-all hover:scale-105">
                <Link key="Projects" to="#projects" onClick={() => scrollToSection("#projects")}>
                  <Rocket className="h-4 w-4" /> My Projects
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="transition-all hover:scale-105"
              >
                <Link key="Contact" to="#contact" onClick={() => scrollToSection("#contact")}>
                  <Mail className="mr-1 h-4 w-4" />
                  Let's Build Together
                </Link>
              </Button>
            </div>
            <div className="flex gap-4 pt-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/gabrideiros" target="_blank">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="relative h-[400px] w-[400px] md:h-[500px] md:w-[500px]">
            <div className="absolute inset-0 rounded-full" />
            <img
              src="./character.gif"
              alt="Personagem em Pixel Art"
              width={600}
              height={600}
              className="relative z-10 h-full w-full object-contain rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
