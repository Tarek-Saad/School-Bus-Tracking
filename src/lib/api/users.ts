import { api } from '../http';
import type { User, PaginatedResponse, PaginationParams } from '@/types/api';

export const usersApi = {
  // Get all users
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<User>> => {
    const response = await api.get<PaginatedResponse<User>>('/users', { params });
    return response.data;
  },

  // Get user by ID
  getById: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  // Update user
  update: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },

  // Delete user
  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
