const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}

export interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao fazer login');
    }

    return data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Erro ao criar conta');
    }

    return result;
  },

  async logout() {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'GET',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  },

  async forgotPassword(email: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao enviar email');
    }

    return data;
  },

  async resetPassword(token: string, newPassword: string, confirmPassword: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ token, newPassword, confirmPassword }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao redefinir senha');
    }

    return data;
  },

  async changePassword(currentPassword: string, newPassword: string, confirmPassword: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao alterar senha');
    }

    return data;
  },

  async getProfile(): Promise<User | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/perfil`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
  },

  async updateProfile(fullName: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/perfil`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ fullName }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao atualizar perfil');
    }

    return data;
  },
};
