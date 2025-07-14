const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://api.medeirosdev.space";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  media_type: "image" | "video";
  order_index?: number;
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
    const token = localStorage.getItem("admin-token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("admin-token");
          localStorage.removeItem("admin-authenticated");
          window.location.href = "/admin";
        }
        return {
          success: false,
          error: data.message || "An error occurred",
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: "Network error or invalid response",
      };
    }
  }

  async login(password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.status === 401) {
        return {
          success: false,
          message: "Invalid password",
        };
      }

      const result = await this.handleResponse<{ token: string }>(response);

      if (result.success && result.data?.token) {
        localStorage.setItem("admin-token", result.data.token);
        localStorage.setItem("admin-authenticated", "true");
        return {
          success: true,
          message: "Login successful",
          token: result.data.token,
        };
      }

      return {
        success: false,
        message: result.error || "Login failed",
      };
    } catch (error) {
      return {
        success: false,
        message: "Network error. Try again later.",
      };
    }
  }

  async verifyToken(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: "POST",
        headers: this.getAuthHeaders(),
      });

      const result = await this.handleResponse(response);
      return result.success;
    } catch (error) {
      return false;
    }
  }

  async getProjects(): Promise<ApiResponse<Project[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<Project[]>(response);
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch projects",
      };
    }
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<Project>(response);
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch project",
      };
    }
  }

  async createProject(
    project: Omit<Project, "id">
  ): Promise<ApiResponse<Project>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(project),
      });

      return this.handleResponse<Project>(response);
    } catch (error) {
      return {
        success: false,
        error: "Failed to create project",
      };
    }
  }

  async updateProject(
    id: string,
    project: Omit<Project, "id">
  ): Promise<ApiResponse<Project>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(project),
      });

      console.warn("Update response:", JSON.stringify(project));

      return this.handleResponse<Project>(response);
    } catch (error) {
      return {
        success: false,
        error: "Failed to update project",
      };
    }
  }

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<void>(response);
    } catch (error) {
      return {
        success: false,
        error: "Failed to delete project",
      };
    }
  }

  async updateProjectOrder(projectOrders: { id: string; order: number }[]): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/reorder`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ 
          projects: projectOrders.map(({ id, order }) => ({ id, order }))
        }),
      });

      return this.handleResponse<void>(response);
    } catch (error) {
      return {
        success: false,
        error: "Failed to update project order",
      };
    }
  }
}

export const apiClient = new ApiClient();
