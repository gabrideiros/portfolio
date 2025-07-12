import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProjectForm } from '@/components/ProjectForm';
import type { Project } from '@/lib/api';
import { ProjectCard } from '@/components/ProjectCard';
import { Plus, Settings, FolderOpen, LogOut, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';

export default function AdminPanel() {
  const { 
    projects, 
    loading, 
    error, 
    refetch, 
    createProject, 
    updateProject, 
    deleteProject 
  } = useProjects();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAddProject = async (projectData: Omit<Project, 'id'>) => {
    setActionLoading(true);
    setActionError(null);
    
    const result = await createProject(projectData);
    
    if (result.success) {
      setIsDialogOpen(false);
    } else {
      setActionError(result.error || 'Failed to create project');
    }
    
    setActionLoading(false);
  };

  const handleEditProject = async (projectData: Omit<Project, 'id'>) => {
    if (editingProject) {
      setActionLoading(true);
      setActionError(null);
      
      const result = await updateProject(editingProject.id, projectData);
      
      if (result.success) {
        setEditingProject(undefined);
        setIsDialogOpen(false);
      } else {
        setActionError(result.error || 'Failed to update project');
      }
      
      setActionLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const result = await deleteProject(id);
      
      if (!result.success) {
        alert(result.error || 'Failed to delete project');
      }
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
    setActionError(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-authenticated');
    navigate('/admin');
  };

  const handleRefresh = () => {
    refetch();
  };

  const isFormDisabled = actionLoading || loading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-sm">
                <Settings className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Portfolio Admin</h1>
                <p className="text-sm text-muted-foreground">Manage your projects</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {error && (
                <Button variant="ghost" size="icon" onClick={handleRefresh} className="text-muted-foreground hover:text-foreground">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={openAddDialog} 
                    className="gap-2 shadow-sm"
                    disabled={isFormDisabled}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add Project</span>
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
                    loading={actionLoading}
                    error={actionError}
                  />
                </DialogContent>
              </Dialog>
              
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Connection Error</span>
            </div>
            <p className="text-sm text-destructive/80 mt-1">{error}</p>
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <FolderOpen className="h-4 w-4" />
            <span className="text-sm font-medium">
              Total Projects: {loading ? '...' : projects.length}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading projects...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-muted/50 rounded-2xl flex items-center justify-center mb-6">
              <FolderOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Get started by adding your first project
            </p>
            <Button onClick={openAddDialog} size="lg" className="shadow-sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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