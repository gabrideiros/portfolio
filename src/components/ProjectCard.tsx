import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MediaPreview from "@/components/MediaPreview";
import { Edit, Trash2, ExternalLink } from "lucide-react";
import type { Project } from "@/components/ProjectForm";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export function ProjectCard({
  project,
  onEdit,
  onDelete,
  isLoading,
}: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:-translate-y-1 relative select-none">
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      <div className="aspect-video bg-muted/50 relative">
        {project.image ? (
          <MediaPreview
            url={project.image}
            type={project.media_type}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No media available
          </div>
        )}
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold tracking-tight">
              {project.title}
            </CardTitle>
            <CardDescription className="mt-2 text-sm leading-relaxed">
              {project.description}
            </CardDescription>
          </div>
          <div className="flex gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => !isLoading && onEdit(project)}
              className="h-8 w-8 hover:bg-primary/10"
              disabled={isLoading}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => !isLoading && onDelete(project.id)}
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs px-2 py-1 bg-muted/50"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {project.link && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full shadow-sm hover:shadow-md transition-shadow"
              disabled={isLoading}
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Project
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
