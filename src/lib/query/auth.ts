import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api';
import { queryKeys } from '@/types/api';
import type { LoginCredentials, RegisterData, User } from '@/types/api';

// Get current user
export function useMe() {
  return useQuery<User>({
    queryKey: queryKeys.auth.me,
    queryFn: authApi.getProfile,
    retry: false, // Don't retry on 401
  });
}

// Login mutation
export function useLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Store token
      localStorage.setItem('authToken', data.token);
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
  });
}

// Register mutation
export function useRegister() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      // Store token
      localStorage.setItem('authToken', data.token);
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
  });
}

// Logout mutation
export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear token
      localStorage.removeItem('authToken');
      // Clear all queries
      queryClient.clear();
    },
  });
}
