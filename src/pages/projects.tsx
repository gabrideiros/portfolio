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
import { useEffect, useState } from "react";
import { apiClient, type Project } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import MediaPreview from "@/components/MediaPreview";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.getProjects();

        if (response.success && response.data) {
          setProjects(response.data);
        } else {
          setError(response.error || "Failed to load projects");
        }
      } catch (err) {
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl text-left">
            My Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="border-none">
                <Skeleton className="h-40 w-full rounded-t-lg" />
                <CardContent className="pt-40 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-24 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl text-left">
            My Projects
          </h2>
          <div className="text-red-500 p-4 rounded-lg bg-red-500/10">
            {error}
          </div>
        </div>
      </section>
    );
  }

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
              {projects.map((project) => (
                <CarouselItem
                  key={project.id}
                  className="pl-1 basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="p-1">
                    <Card className="group overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:-translate-y-1 relative">
                      <div className="aspect-video bg-muted/50 relative overflow-hidden">
                        <MediaPreview
                          url={project.image}
                          type={project.media_type}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="relative">
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
                            <a href={project.link || "#"}>View Details</a>
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
