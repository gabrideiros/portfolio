import { useState, useEffect } from 'react';
import { apiClient, type Project } from '@/lib/api';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getProjects();
      
      if (response.success && response.data) {
        setProjects(response.data);
      } else {
        setError(response.error || 'Failed to fetch projects');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: Omit<Project, 'id'>) => {
    try {
      const response = await apiClient.createProject(projectData);
      
      if (response.success && response.data) {
        setProjects(prev => [...prev, response.data!]);
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Failed to create project' };
      }
    } catch (err) {
      return { success: false, error: 'Network error' };
    }
  };

  const updateProject = async (id: string, projectData: Omit<Project, 'id'>) => {
    try {
      const response = await apiClient.updateProject(id, projectData);
      
      if (response.success && response.data) {
        setProjects(prev => 
          prev.map(p => p.id === id ? response.data! : p)
        );
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Failed to update project' };
      }
    } catch (err) {
      return { success: false, error: 'Network error' };
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const response = await apiClient.deleteProject(id);
      
      if (response.success) {
        setProjects(prev => prev.filter(p => p.id !== id));
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Failed to delete project' };
      }
    } catch (err) {
      return { success: false, error: 'Network error' };
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject
  };
}