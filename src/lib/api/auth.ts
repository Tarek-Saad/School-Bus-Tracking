import { api } from '../http';
import type { LoginCredentials, LoginResponse, RegisterData, User } from '@/types/api';

export const authApi = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  // Register user
  register: async (data: RegisterData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/register', data);
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    const response = await api.post<{ token: string }>('/auth/refresh', { refreshToken });
    return response.data;
  },
};
