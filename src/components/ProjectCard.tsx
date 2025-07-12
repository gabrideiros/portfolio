import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MediaPreview } from '@/components/MediaPreview';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import type { Project } from '@/components/ProjectForm';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:-translate-y-1">
      <div className="aspect-video">
        <MediaPreview 
          url={project.image} 
          type={project.mediaType}
          className="w-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold tracking-tight">{project.title}</CardTitle>
            <CardDescription className="mt-2 text-sm leading-relaxed">
              {project.description}
            </CardDescription>
          </div>
          <div className="flex gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(project)}
              className="h-8 w-8 hover:bg-primary/10"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(project.id)}
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-6">
        <div className="space-y-4">
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-muted/50">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {project.link && (
            <Button variant="outline" size="sm" asChild className="w-full shadow-sm hover:shadow-md transition-shadow">
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