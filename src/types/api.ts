// School Bus Tracking System Types

// User Types
export type UserRole = 'admin' | 'driver' | 'parent';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
}

// Student Types
export interface Student {
  id: string;
  name: string;
  grade: string;
  parentId: string;
  routeId: string;
  busId?: string;
  pickupAddress: string;
  dropoffAddress: string;
  emergencyContact: string;
  emergencyPhone: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentData {
  name: string;
  grade: string;
  parentId: string;
  routeId: string;
  pickupAddress: string;
  dropoffAddress: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface UpdateStudentData {
  name?: string;
  grade?: string;
  parentId?: string;
  routeId?: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

// Route Types
export interface Route {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  driverId?: string;
  estimatedDuration: number; // in minutes
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRouteData {
  name: string;
  startPoint: string;
  endPoint: string;
  driverId?: string;
  estimatedDuration: number;
}

export interface UpdateRouteData {
  name?: string;
  startPoint?: string;
  endPoint?: string;
  driverId?: string;
  estimatedDuration?: number;
  isActive?: boolean;
}

// Bus Types
export type BusStatus = 'active' | 'stopped' | 'in_route' | 'maintenance' | 'offline';

export interface Bus {
  id: string;
  busNumber: string;
  licensePlate: string;
  capacity: number;
  driverId?: string;
  routeId?: string;
  status: BusStatus;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBusData {
  busNumber: string;
  licensePlate: string;
  capacity: number;
  driverId?: string;
  routeId?: string;
}

export interface UpdateBusData {
  busNumber?: string;
  licensePlate?: string;
  capacity?: number;
  driverId?: string;
  routeId?: string;
  status?: BusStatus;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
}

// Attendance Types
export type AttendanceStatus = 'present' | 'absent' | 'late';

export interface Attendance {
  id: string;
  studentId: string;
  routeId: string;
  busId: string;
  driverId: string;
  status: AttendanceStatus;
  date: string;
  pickupTime?: string;
  dropoffTime?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAttendanceData {
  studentId: string;
  routeId: string;
  busId: string;
  driverId: string;
  status: AttendanceStatus;
  date: string;
  pickupTime?: string;
  dropoffTime?: string;
  notes?: string;
}

// Notification Types
export type NotificationType = 'info' | 'warning' | 'alert' | 'reminder';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  recipientId: string;
  senderId: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationData {
  title: string;
  message: string;
  type: NotificationType;
  recipientId: string;
}

// Dashboard Types
export interface AdminDashboard {
  totalDrivers: number;
  totalStudents: number;
  totalBuses: number;
  activeBuses: number;
  totalRoutes: number;
  activeRoutes: number;
  todayAttendance: {
    present: number;
    absent: number;
    late: number;
  };
  recentNotifications: Notification[];
}

export interface DriverDashboard {
  assignedRoutes: Route[];
  todaysStudents: Student[];
  busInfo?: Bus;
  notifications: Notification[];
  todaysAttendance: Attendance[];
}

export interface ParentDashboard {
  student: Student;
  busInfo?: Bus;
  routeInfo?: Route;
  recentAttendance: Attendance[];
  notifications: Notification[];
  busLocation?: {
    latitude: number;
    longitude: number;
    lastUpdated: string;
  };
}

// Common Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  code: string;
  details?: Record<string, any>;
}

// Query key factories for React Query
export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  users: {
    all: ['users'] as const,
    detail: (id: string) => ['users', id] as const,
  },
  students: {
    all: ['students'] as const,
    detail: (id: string) => ['students', id] as const,
    byParent: (parentId: string) => ['students', 'parent', parentId] as const,
  },
  routes: {
    all: ['routes'] as const,
    detail: (id: string) => ['routes', id] as const,
    byDriver: (driverId: string) => ['routes', 'driver', driverId] as const,
  },
  buses: {
    all: ['buses'] as const,
    detail: (id: string) => ['buses', id] as const,
    byDriver: (driverId: string) => ['buses', 'driver', driverId] as const,
  },
  attendance: {
    all: ['attendance'] as const,
    byStudent: (studentId: string) => ['attendance', 'student', studentId] as const,
    byRoute: (routeId: string) => ['attendance', 'route', routeId] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    byUser: (userId: string) => ['notifications', 'user', userId] as const,
  },
  dashboard: {
    admin: ['dashboard', 'admin'] as const,
    driver: ['dashboard', 'driver'] as const,
    parent: ['dashboard', 'parent'] as const,
  },
} as const;
