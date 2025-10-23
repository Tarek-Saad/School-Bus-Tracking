export { API_BASE_URL } from './config';

// Export all API modules
export { authApi } from './auth';
export { usersApi, studentsApi, routesApi, busesApi, attendanceApi, notificationsApi, dashboardApi, systemApi, profileApi } from './remote';

// Re-export types for convenience
export type { User, LoginCredentials, LoginResponse, RegisterData } from '@/types/api';
export type { Student, Route, Bus, Attendance, Notification, AdminDashboard, DriverDashboard, ParentDashboard } from '@/types/api';
export type { PaginatedResponse, PaginationParams } from '@/types/api';
export type { ApiError } from '@/types/api';
