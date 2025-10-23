import axios from 'axios';
import type { LoginCredentials, LoginResponse, RegisterData, User, ApiResponse } from '@/types/api';
import { API_BASE_URL } from './config';

// Create axios instance for remote API
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/users/login', credentials);
    return response.data.data;
  },

  // Register user
  register: async (data: RegisterData): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/users/register', data);
    return response.data.data;
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/profile');
    return response.data.data;
  },

  // Update profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put<ApiResponse<User>>('/profile', data);
    return response.data.data;
  },

  // Logout user (clear token)
  logout: async (): Promise<void> => {
    localStorage.removeItem('authToken');
  },
};
