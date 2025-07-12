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
import { useProjects } from "@/hooks/useProjects";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

// Fallback projects for when API is not available
const fallbackProjects = [
  {
    id: "1",
    title: "Rio de Janeiro",
    description: "Minecraft Experience in Rio de Janeiro - TBD",
    tags: ["Behavior Pack", "Resource Pack", "Custom Entities"],
    link: "#",
    image: "./rio.png",
    mediaType: "image" as const,
  },
  {
    id: "2",
    title: "Vernearth",
    description: "Minecraft Experience in Vernearth",
    tags: ["Behavior Pack", "Resource Pack", "Custom Entities"],
    link: "https://discord.gg/aQXkkkXy",
    image: "./vernearth.png",
    mediaType: "image" as const,
  },
  {
    id: "3",
    title: "Dragons Expansion",
    description: "Dragons Expansion for Minecraft",
    tags: ["Behavior Pack", "Resource Pack", "Custom Entities"],
    link: "https://www.minecraft.net/pt-br/marketplace/pdp/venift/dragons-add--on/488351d9-6d5c-4f07-93fd-4954f4442b90",
    image: "./dragons.jpg",
    mediaType: "image" as const,
  },
  {
    id: "4",
    title: "Coming Soon",
    description: ".-.",
    tags: ["Behavior Pack", "Resource Pack", "Custom Entities"],
    link: "#",
    image: "./mystery.png",
    mediaType: "image" as const,
  },
];

export default function Projects() {
  const { projects: apiProjects, loading, error, refetch } = useProjects();
  
  // Use API projects if available, otherwise fallback to static projects
  const projects = apiProjects.length > 0 ? apiProjects : fallbackProjects;

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl text-left">
            My Projects
          </h2>
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading projects...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && apiProjects.length === 0) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl text-left">
            My Projects
          </h2>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <AlertCircle className="h-6 w-6 text-orange-500" />
              <span>Unable to load projects from server</span>
            </div>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Showing fallback projects. The backend might be offline.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refetch}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-left">
            My Projects
          </h2>
          {error && apiProjects.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={refetch}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          )}
        </div>

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
                            <a href={project.link} target="_blank" rel="noopener noreferrer">View Details</a>
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