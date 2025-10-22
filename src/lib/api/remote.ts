import axios from 'axios';
import type { User, Student, Route, Bus, Attendance, Notification, DashboardData } from '@/types/api';
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
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  // Update user (Admin only)
  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },

  // Delete user (Admin only)
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

export const studentsApi = {
  // Get all students
  getStudents: async (): Promise<Student[]> => {
    const response = await api.get<Student[]>('/students');
    return response.data;
  },

  // Add new student (Admin only)
  createStudent: async (data: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> => {
    const response = await api.post<Student>('/students', data);
    return response.data;
  },

  // Update student
  updateStudent: async (id: string, data: Partial<Student>): Promise<Student> => {
    const response = await api.put<Student>(`/students/${id}`, data);
    return response.data;
  },

  // Delete student (Admin only)
  deleteStudent: async (id: string): Promise<void> => {
    await api.delete(`/students/${id}`);
  },
};

export const routesApi = {
  // Get all routes
  getRoutes: async (): Promise<Route[]> => {
    const response = await api.get<Route[]>('/routes');
    return response.data;
  },

  // Add new route (Admin only)
  createRoute: async (data: Omit<Route, 'id' | 'createdAt' | 'updatedAt'>): Promise<Route> => {
    const response = await api.post<Route>('/routes', data);
    return response.data;
  },

  // Update route
  updateRoute: async (id: string, data: Partial<Route>): Promise<Route> => {
    const response = await api.put<Route>(`/routes/${id}`, data);
    return response.data;
  },
};

export const busesApi = {
  // Get all buses
  getBuses: async (): Promise<Bus[]> => {
    const response = await api.get<Bus[]>('/buses');
    return response.data;
  },

  // Add new bus (Admin only)
  createBus: async (data: Omit<Bus, 'id' | 'createdAt' | 'updatedAt' | 'lastUpdated'>): Promise<Bus> => {
    const response = await api.post<Bus>('/buses', data);
    return response.data;
  },

  // Update bus status
  updateBusStatus: async (id: string, status: Bus['status']): Promise<Bus> => {
    const response = await api.patch<Bus>(`/buses/${id}/status`, { status });
    return response.data;
  },
};

export const attendanceApi = {
  // Record attendance
  recordAttendance: async (data: Omit<Attendance, 'id' | 'createdAt' | 'updatedAt'>): Promise<Attendance> => {
    const response = await api.post<Attendance>('/attendance', data);
    return response.data;
  },

  // Get student attendance history
  getStudentAttendance: async (studentId: string): Promise<Attendance[]> => {
    const response = await api.get<Attendance[]>(`/attendance/student/${studentId}`);
    return response.data;
  },

  // Get route attendance summary
  getRouteAttendance: async (routeId: string): Promise<Attendance[]> => {
    const response = await api.get<Attendance[]>(`/attendance/route/${routeId}`);
    return response.data;
  },
};

export const notificationsApi = {
  // Get all notifications
  getNotifications: async (): Promise<Notification[]> => {
    const response = await api.get<Notification[]>('/notifications');
    return response.data;
  },

  // Send notification
  sendNotification: async (data: Omit<Notification, 'id' | 'createdAt' | 'updatedAt' | 'isRead'>): Promise<Notification> => {
    const response = await api.post<Notification>('/notifications', data);
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (id: string): Promise<void> => {
    await api.patch(`/notifications/${id}/read`);
  },
};

export const dashboardApi = {
  // Get admin dashboard data
  getAdminDashboard: async (): Promise<DashboardData> => {
    const response = await api.get<DashboardData>('/dashboard/admin');
    return response.data;
  },

  // Get driver dashboard data
  getDriverDashboard: async (): Promise<DashboardData> => {
    const response = await api.get<DashboardData>('/dashboard/driver');
    return response.data;
  },

  // Get parent dashboard data
  getParentDashboard: async (): Promise<DashboardData> => {
    const response = await api.get<DashboardData>('/dashboard/parent');
    return response.data;
  },
};
