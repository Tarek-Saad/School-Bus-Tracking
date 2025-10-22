// Common API types
export interface User {
  id: string;
  email: string;
  name: string;
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
}

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

export interface Logo {
  id: string;
  name: string;
  url: string;
  description?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateLogoData {
  name: string;
  url: string;
  description?: string;
  tags?: string[];
}

export interface UpdateLogoData {
  name?: string;
  url?: string;
  description?: string;
  tags?: string[];
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
  logos: {
    all: ['logos'] as const,
    list: (params: PaginationParams) => ['logos', 'list', params] as const,
    detail: (id: string) => ['logos', id] as const,
  },
} as const;
