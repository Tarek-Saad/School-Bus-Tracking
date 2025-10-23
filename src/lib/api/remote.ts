import axios from 'axios';
import type { User, Student, Route, Bus, Attendance, Notification, AdminDashboard, DriverDashboard, ParentDashboard, ApiResponse, PaginatedApiResponse } from '@/types/api';
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

export const usersApi = {
  // Get all users (Admin only)
  getUsers: async (params?: { page?: number; limit?: number; search?: string; role?: string }): Promise<User[]> => {
    const response = await api.get<PaginatedApiResponse<User>>('/users', { params });
    return response.data.data;
  },

  // Get user by ID (Admin only)
  getUserById: async (id: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
  },

  // Update user (Admin only)
  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data;
  },

  // Delete user (Admin only)
  deleteUser: async (id: string): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/users/${id}`);
  },
};

export const studentsApi = {
  // Get all students
  getStudents: async (params?: { page?: number; limit?: number; search?: string }): Promise<Student[]> => {
    const response = await api.get<PaginatedApiResponse<Student>>('/students', { params });
    return response.data.data;
  },

  // Get student by ID
  getStudentById: async (id: string): Promise<Student> => {
    const response = await api.get<ApiResponse<Student>>(`/students/${id}`);
    return response.data.data;
  },

  // Add new student (Admin only)
  createStudent: async (data: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> => {
    const response = await api.post<ApiResponse<Student>>('/students', data);
    return response.data.data;
  },

  // Update student
  updateStudent: async (id: string, data: Partial<Student>): Promise<Student> => {
    const response = await api.put<ApiResponse<Student>>(`/students/${id}`, data);
    return response.data.data;
  },

  // Delete student (Admin only)
  deleteStudent: async (id: string): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/students/${id}`);
  },

  // Get student attendance
  getStudentAttendance: async (studentId: string, limit?: number): Promise<Attendance[]> => {
    const response = await api.get<ApiResponse<Attendance[]>>(`/attendance/student/${studentId}`, { 
      params: { limit } 
    });
    return response.data.data;
  },
};

export const routesApi = {
  // Get all routes
  getRoutes: async (params?: { page?: number; limit?: number; search?: string }): Promise<Route[]> => {
    const response = await api.get<PaginatedApiResponse<Route>>('/routes', { params });
    return response.data.data;
  },

  // Get route by ID
  getRouteById: async (id: string): Promise<Route> => {
    const response = await api.get<ApiResponse<Route>>(`/routes/${id}`);
    return response.data.data;
  },

  // Add new route (Admin only)
  createRoute: async (data: Omit<Route, 'id' | 'createdAt' | 'updatedAt'>): Promise<Route> => {
    const response = await api.post<ApiResponse<Route>>('/routes', data);
    return response.data.data;
  },

  // Update route
  updateRoute: async (id: string, data: Partial<Route>): Promise<Route> => {
    const response = await api.put<ApiResponse<Route>>(`/routes/${id}`, data);
    return response.data.data;
  },

  // Get route students
  getRouteStudents: async (id: string): Promise<Student[]> => {
    const response = await api.get<ApiResponse<Student[]>>(`/routes/${id}/students`);
    return response.data.data;
  },

  // Get route attendance
  getRouteAttendance: async (id: string, date?: string): Promise<any> => {
    const response = await api.get<ApiResponse<any>>(`/routes/${id}/attendance`, { 
      params: { date } 
    });
    return response.data.data;
  },
};

export const busesApi = {
  // Get all buses
  getBuses: async (params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<Bus[]> => {
    const response = await api.get<PaginatedApiResponse<Bus>>('/buses', { params });
    return response.data.data;
  },

  // Get bus by ID
  getBusById: async (id: string): Promise<Bus> => {
    const response = await api.get<ApiResponse<Bus>>(`/buses/${id}`);
    return response.data.data;
  },

  // Add new bus (Admin only)
  createBus: async (data: Omit<Bus, 'id' | 'createdAt' | 'updatedAt' | 'lastUpdated'>): Promise<Bus> => {
    const response = await api.post<ApiResponse<Bus>>('/buses', data);
    return response.data.data;
  },

  // Update bus status
  updateBusStatus: async (id: string, data: { status?: Bus['status']; current_location?: string }): Promise<Bus> => {
    const response = await api.patch<ApiResponse<Bus>>(`/buses/${id}/status`, data);
    return response.data.data;
  },

  // Get bus students
  getBusStudents: async (id: string): Promise<Student[]> => {
    const response = await api.get<ApiResponse<Student[]>>(`/buses/${id}/students`);
    return response.data.data;
  },

  // Get bus attendance
  getBusAttendance: async (id: string): Promise<Attendance[]> => {
    const response = await api.get<ApiResponse<Attendance[]>>(`/buses/${id}/attendance`);
    return response.data.data;
  },
};

export const attendanceApi = {
  // Record attendance
  recordAttendance: async (data: Omit<Attendance, 'id' | 'createdAt' | 'updatedAt'>): Promise<Attendance> => {
    const response = await api.post<ApiResponse<Attendance>>('/attendance', data);
    return response.data.data;
  },

  // Get student attendance history
  getStudentAttendance: async (studentId: string, limit?: number): Promise<Attendance[]> => {
    const response = await api.get<ApiResponse<Attendance[]>>(`/attendance/student/${studentId}`, { 
      params: { limit } 
    });
    return response.data.data;
  },

  // Get route attendance summary
  getRouteAttendance: async (routeId: string, date?: string): Promise<any> => {
    const response = await api.get<ApiResponse<any>>(`/attendance/route/${routeId}`, { 
      params: { date } 
    });
    return response.data.data;
  },

  // Get today's attendance
  getTodayAttendance: async (): Promise<Attendance[]> => {
    const response = await api.get<ApiResponse<Attendance[]>>('/attendance/today');
    return response.data.data;
  },

  // Get attendance summary by date
  getAttendanceSummary: async (date?: string): Promise<any> => {
    const response = await api.get<ApiResponse<any>>('/attendance/summary', { 
      params: { date } 
    });
    return response.data.data;
  },

  // Update attendance record
  updateAttendance: async (id: string, data: Partial<Attendance>): Promise<Attendance> => {
    const response = await api.put<ApiResponse<Attendance>>(`/attendance/${id}`, data);
    return response.data.data;
  },
};

export const notificationsApi = {
  // Get all notifications
  getNotifications: async (params?: { page?: number; limit?: number; unread_only?: boolean }): Promise<Notification[]> => {
    const response = await api.get<PaginatedApiResponse<Notification>>('/notifications', { params });
    return response.data.data;
  },

  // Get notification by ID
  getNotificationById: async (id: string): Promise<Notification> => {
    const response = await api.get<ApiResponse<Notification>>(`/notifications/${id}`);
    return response.data.data;
  },

  // Send notification
  sendNotification: async (data: { title: string; message: string; recipient_ids: string[]; type: string }): Promise<Notification[]> => {
    const response = await api.post<ApiResponse<Notification[]>>('/notifications', data);
    return response.data.data;
  },

  // Mark notification as read
  markAsRead: async (id: string): Promise<void> => {
    await api.patch<ApiResponse<void>>(`/notifications/${id}/read`);
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<{ count: number }> => {
    const response = await api.patch<ApiResponse<{ count: number }>>('/notifications/read-all');
    return response.data.data;
  },

  // Get unread notification count
  getUnreadCount: async (): Promise<{ count: number }> => {
    const response = await api.get<ApiResponse<{ count: number }>>('/notifications/unread/count');
    return response.data.data;
  },

  // Get recent notifications
  getRecentNotifications: async (limit?: number): Promise<Notification[]> => {
    const response = await api.get<ApiResponse<Notification[]>>('/notifications/recent', { 
      params: { limit } 
    });
    return response.data.data;
  },
};

export const dashboardApi = {
  // Get admin dashboard data
  getAdminDashboard: async (): Promise<AdminDashboard> => {
    const response = await api.get<ApiResponse<AdminDashboard>>('/dashboard/admin');
    return response.data.data;
  },

  // Get driver dashboard data
  getDriverDashboard: async (): Promise<DriverDashboard> => {
    const response = await api.get<ApiResponse<DriverDashboard>>('/dashboard/driver');
    return response.data.data;
  },

  // Get parent dashboard data
  getParentDashboard: async (): Promise<ParentDashboard> => {
    const response = await api.get<ApiResponse<ParentDashboard>>('/dashboard/parent');
    return response.data.data;
  },

  // Get dashboard statistics
  getDashboardStats: async (): Promise<any> => {
    const response = await api.get<ApiResponse<any>>('/dashboard/stats');
    return response.data.data;
  },
};

// Health check and system info
export const systemApi = {
  // Health check
  healthCheck: async (): Promise<{ status: string }> => {
    const response = await api.get<ApiResponse<{ status: string }>>('/../health');
    return response.data.data;
  },

  // API welcome
  getApiInfo: async (): Promise<{ status: string; endpoints: any }> => {
    const response = await api.get<ApiResponse<{ status: string; endpoints: any }>>('/..');
    return response.data.data;
  },
};

// Profile management
export const profileApi = {
  // Get profile
  getProfile: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/profile');
    return response.data.data;
  },

  // Update profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put<ApiResponse<User>>('/profile', data);
    return response.data.data;
  },

  // Update password
  updatePassword: async (data: { currentPassword: string; newPassword: string }): Promise<void> => {
    await api.put<ApiResponse<void>>('/profile/password', data);
  },

  // Get driver routes
  getDriverRoutes: async (): Promise<Route[]> => {
    const response = await api.get<ApiResponse<Route[]>>('/profile/routes');
    return response.data.data;
  },

  // Get parent students
  getParentStudents: async (): Promise<Student[]> => {
    const response = await api.get<ApiResponse<Student[]>>('/profile/students');
    return response.data.data;
  },

  // Get user notifications
  getUserNotifications: async (params?: { page?: number; limit?: number; unread_only?: boolean }): Promise<Notification[]> => {
    const response = await api.get<PaginatedApiResponse<Notification>>('/profile/notifications', { params });
    return response.data.data;
  },
};
