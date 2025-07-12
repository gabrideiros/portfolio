const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  mediaType: 'image' | 'video';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private getAuthHeaders() {
    const token = localStorage.getItem('admin-token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('admin-token');
          localStorage.removeItem('admin-authenticated');
          window.location.href = '/admin';
        }
        return {
          success: false,
          error: data.message || 'An error occurred'
        };
      }
      
      return {
        success: true,
        data: data.data || data,
        message: data.message
      };
    } catch (error) {
      return {
        success: false,
        error: 'Network error or invalid response'
      };
    }
  }

  // Auth endpoints
  async login(password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const result = await this.handleResponse<{ token: string }>(response);
      
      if (result.success && result.data?.token) {
        localStorage.setItem('admin-token', result.data.token);
        localStorage.setItem('admin-authenticated', 'true');
        return {
          success: true,
          message: result.message || 'Login successful',
          token: result.data.token
        };
      }
      
      return {
        success: false,
        message: result.error || 'Login failed'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Network error'
      };
    }
  }

  async verifyToken(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      const result = await this.handleResponse(response);
      return result.success;
    } catch (error) {
      return false;
    }
  }

  // Project endpoints
  async getProjects(): Promise<ApiResponse<Project[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        headers: this.getAuthHeaders()
      });

      return this.handleResponse<Project[]>(response);
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch projects'
      };
    }
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        headers: this.getAuthHeaders()
      });

      return this.handleResponse<Project>(response);
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch project'
      };
    }
  }

  async createProject(project: Omit<Project, 'id'>): Promise<ApiResponse<Project>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(project)
      });

      return this.handleResponse<Project>(response);
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create project'
      };
    }
  }

  async updateProject(id: string, project: Omit<Project, 'id'>): Promise<ApiResponse<Project>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(project)
      });

      return this.handleResponse<Project>(response);
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update project'
      };
    }
  }

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      return this.handleResponse<void>(response);
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete project'
      };
    }
  }
}

export const apiClient = new ApiClient();