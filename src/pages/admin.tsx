import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ProjectForm } from "@/components/ProjectForm";
import type { Project } from "@/components/ProjectForm";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Plus, Settings, FolderOpen, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";

export default function AdminPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isReordering, setIsReordering] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.getProjects();

        if (response.success && response.data) {
          setProjects(response.data);
        } else {
          toast.error("Failed to load projects", {
            description: response.error || "Please try again later",
          });
        }
      } catch (error) {
        toast.error("Network error", {
          description: "Failed to connect to the server",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleReorder = async (reorderedProjects: Project[]) => {
    const optimisticProjects = reorderedProjects.map((project, index) => ({
      ...project,
      order_index: index,
    }));
    
    setProjects(optimisticProjects);
    setIsReordering(true);

    try {
      const projectOrders = reorderedProjects.map((project, index) => ({
        id: project.id,
        order: index,
      }));

      const response = await apiClient.updateProjectOrder(projectOrders);

      if (response.success) {
        setProjects(optimisticProjects);
        
        toast.success("Project order updated successfully");
      } else {
        const fetchResponse = await apiClient.getProjects();
        if (fetchResponse.success && fetchResponse.data) {
          setProjects(fetchResponse.data);
        }
        
        toast.error("Failed to update project order", {
          description: response.error || "Please try again",
        });
      }
    } catch (error) {
      const fetchResponse = await apiClient.getProjects();
      if (fetchResponse.success && fetchResponse.data) {
        setProjects(fetchResponse.data);
      }
      
      toast.error("Network error", {
        description: "Failed to update project order",
      });
    } finally {
      setIsReordering(false);
    }
  };

  const handleAddProject = async (projectData: Omit<Project, "id">) => {
    try {
      setIsLoading(true);
      const response = await apiClient.createProject(projectData);

      if (response.success && response.data) {
        setProjects((prev) => [...prev, response.data!]);
        toast.success("Project created successfully");
        setIsDialogOpen(false);
      } else {
        toast.error("Failed to create project", {
          description: response.error || "Please try again",
        });
      }
    } catch (error) {
      toast.error("Network error", {
        description: "Failed to connect to the server",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProject = async (projectData: Omit<Project, "id">) => {
    if (!editingProject) return;

    console.warn("Editing project:", editingProject.id, projectData);

    try {
      setIsLoading(true);
      const response = await apiClient.updateProject(
        editingProject.id,
        projectData
      );

      if (response.success && response.data) {
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? response.data! : p))
        );
        toast.success("Project updated successfully");
        setEditingProject(undefined);
        setIsDialogOpen(false);
      } else {
        toast.error("Failed to update project", {
          description: response.error || "Please try again",
        });
      }
    } catch (error) {
      toast.error("Network error", {
        description: "Failed to connect to the server",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      setIsLoading(true);
      const response = await apiClient.deleteProject(projectToDelete);

      if (response.success) {
        setProjects((prev) => prev.filter((p) => p.id !== projectToDelete));
        toast.success("Project deleted successfully");
      } else {
        toast.error("Failed to delete project", {
          description: response.error || "Please try again",
        });
      }
    } catch (error) {
      toast.error("Network error", {
        description: "Failed to connect to the server",
      });
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
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

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("admin-authenticated");
    navigate("/admin");
  };

  if (isLoading && projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-sm">
                <Settings className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Portfolio Admin
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage your projects
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={openAddDialog}
                    className="gap-2 shadow-sm"
                    disabled={isLoading}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add Project</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProject ? "Edit Project" : "Add New Project"}
                    </DialogTitle>
                  </DialogHeader>
                  <ProjectForm
                    project={editingProject}
                    onSave={
                      editingProject ? handleEditProject : handleAddProject
                    }
                    onCancel={closeDialog}
                    isLoading={isLoading}
                  />
                </DialogContent>
              </Dialog>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <FolderOpen className="h-4 w-4" />
            <span className="text-sm font-medium">
              Total Projects: {projects.length}
            </span>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-muted/50 rounded-2xl flex items-center justify-center mb-6">
              <FolderOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Get started by adding your first project
            </p>
            <Button
              onClick={openAddDialog}
              size="lg"
              className="shadow-sm"
              disabled={isLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </div>
        ) : (
          <ProjectGrid
            projects={projects}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
            onReorder={handleReorder}
            isLoading={isLoading || isReordering}
          />
        )}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete this project? This action cannot
                be undone.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteProject}
                disabled={isLoading || isReordering}
              >
                {isLoading || isReordering ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
