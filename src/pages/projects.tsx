import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const projects = [
  {
    title: "Rio de Janeiro",
    description: "Minecraft Experience in Rio de Janeiro - TBD",
    tags: ["Behavior Pack", "Resource Pack", "Custom Entities"],
    link: "#",
    image: "./rio.png",
  },
  {
    title: "Vernearth",
    description: "Minecraft Experience in Vernearth",
    tags: ["Behavior Pack", "Resource Pack", "Custom Entities"],
    link: "https://discord.gg/aQXkkkXy",
    image: "./vernearth.png",
  },
  {
    title: "Dragons Expansion",
    description: "Dragons Expansion for Minecraft",
    tags: ["Behavior Pack", "Resource Pack", "Custom Entities"],
    link: "https://www.minecraft.net/pt-br/marketplace/pdp/venift/dragons-add--on/488351d9-6d5c-4f07-93fd-4954f4442b90",
    image: "./dragons.jpg",
  },
  {
    title: "Cooming Soon",
    description: ".-.",
    tags: ["Behavior Pack", "Resource Pack", "Custom Entities"],
    link: "#",
    image: "./mystery.png",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl text-left">
          My Projects
        </h2>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {projects.map((project, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="p-1">
                    <Card className="relative hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300 border border-purple-900/10 border-none overflow-hidden rounded-lg group">
                      <div className="overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute top-0 left-0 w-full h-40 object-cover object-top rounded-t-lg transition-all duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="relative pt-40">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-white">
                              {project.title}
                            </CardTitle>
                          </div>
                          <CardDescription className="text-purple-200 mb-6">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-6 flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-purple-900/10 px-3 py-1 text-xs text-purple-200 hover:bg-purple-900/20 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="bg-transparent border-purple-400 text-white hover:bg-purple-900/30 hover:text-white mt-2"
                          >
                            <a href={project.link}>View Details</a>
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10 border border-purple-900/10 h-8 w-8" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10 border border-purple-900/10 h-8 w-8" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
