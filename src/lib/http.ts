import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Environment configuration
const USE_PROXY = process.env.NEXT_PUBLIC_USE_PROXY === 'true';
const API_BASE_URL = USE_PROXY 
  ? '/api/proxy' 
  : (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api');
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000', 10);

// Create axios instance
const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
httpClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or cookie
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common error cases
    if (error.response?.status === 401) {
      // Clear auth token on unauthorized
      clearAuthToken();
      // Optionally redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    // Transform error to our ApiError format
    const apiError: ApiError = {
      message: (error.response?.data as any)?.message || error.message || 'An error occurred',
      status: error.response?.status || 500,
      code: error.code || 'UNKNOWN_ERROR',
    };
    
    return Promise.reject(apiError);
  }
);

// Auth token management
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
};

export const clearAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
};

// API Error type
export interface ApiError {
  message: string;
  status: number;
  code: string;
}

// Generic API response wrapper
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// HTTP methods with proper typing
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    httpClient.get(url, config).then(res => ({ data: res.data, success: true })),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    httpClient.post(url, data, config).then(res => ({ data: res.data, success: true })),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    httpClient.put(url, data, config).then(res => ({ data: res.data, success: true })),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    httpClient.patch(url, data, config).then(res => ({ data: res.data, success: true })),

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    httpClient.delete(url, config).then(res => ({ data: res.data, success: true })),
};

export default httpClient;
