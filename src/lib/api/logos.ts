import { api } from '../http';
import type { Logo, CreateLogoData, UpdateLogoData, PaginatedResponse, PaginationParams } from '@/types/api';

export const logosApi = {
  // Get all logos with pagination
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<Logo>> => {
    const response = await api.get<PaginatedResponse<Logo>>('/logos', { params });
    return response.data;
  },

  // Get logo by ID
  getById: async (id: string): Promise<Logo> => {
    const response = await api.get<Logo>(`/logos/${id}`);
    return response.data;
  },

  // Create new logo
  create: async (data: CreateLogoData): Promise<Logo> => {
    const response = await api.post<Logo>('/logos', data);
    return response.data;
  },

  // Update logo
  update: async (id: string, data: UpdateLogoData): Promise<Logo> => {
    const response = await api.put<Logo>(`/logos/${id}`, data);
    return response.data;
  },

  // Delete logo
  delete: async (id: string): Promise<void> => {
    await api.delete(`/logos/${id}`);
  },

  // Search logos
  search: async (query: string, params?: PaginationParams): Promise<PaginatedResponse<Logo>> => {
    const response = await api.get<PaginatedResponse<Logo>>('/logos/search', { 
      params: { q: query, ...params } 
    });
    return response.data;
  },
};
