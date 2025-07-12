import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProjectForm } from '@/components/ProjectForm';
import type { Project } from '@/components/ProjectForm';
import { ProjectCard } from '@/components/ProjectCard';
import { Plus, Settings, FolderOpen } from 'lucide-react';

// Initial projects data matching your portfolio structure
const initialProjects: Project[] = [
  {
    id: '1',
    title: "Rio de Janeiro",
    description: "Minecraft Experience in Rio de Janeiro - TBD",
    tags: ["Behavior Pack", "Resource Pack", "Custom Entities"],
    link: "#",
    image: "./rio.png",
    mediaType: 'image'
  },
  {
    id: '2',
    title: "Vernearth",
    description: "Minecraft Experience in Vernearth",
    tags: ["Behavior Pack", "Resource Pack", "Custom Entities"],
    link: "https://discord.gg/aQXkkkXy",
    image: "./vernearth.png",
    mediaType: 'image'
  },
  {
    id: '3',
    title: "Dragons Expansion",
    description: "Dragons Expansion for Minecraft",
    tags: ["Behavior Pack", "Resource Pack", "Custom Entities"],
    link: "https://www.minecraft.net/pt-br/marketplace/pdp/venift/dragons-add--on/488351d9-6d5c-4f07-93fd-4954f4442b90",
    image: "./dragons.jpg",
    mediaType: 'image'
  },
  {
    id: '4',
    title: "Coming Soon",
    description: ".-.",
    tags: ["Behavior Pack", "Resource Pack", "Custom Entities"],
    link: "#",
    image: "./mystery.png",
    mediaType: 'image'
  },
];

export default function AdminPanel() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  const handleAddProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString()
    };
    setProjects(prev => [...prev, newProject]);
    setIsDialogOpen(false);
  };

  const handleEditProject = (projectData: Omit<Project, 'id'>) => {
    if (editingProject) {
      setProjects(prev => 
        prev.map(p => p.id === editingProject.id ? { ...projectData, id: editingProject.id } : p)
      );
      setEditingProject(undefined);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingProject(undefined);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Settings className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Portfolio Admin</h1>
                <p className="text-muted-foreground">Manage your projects</p>
              </div>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </DialogTitle>
                </DialogHeader>
                <ProjectForm
                  project={editingProject}
                  onSave={editingProject ? handleEditProject : handleAddProject}
                  onCancel={closeDialog}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <FolderOpen className="h-4 w-4" />
            <span className="text-sm">Total Projects: {projects.length}</span>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first project
            </p>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={openEditDialog}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}