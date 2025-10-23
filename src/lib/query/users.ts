import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/lib/api';
import { queryKeys } from '@/types/api';
import type { User, PaginationParams } from '@/types/api';

// Get all users
export function useUsers(params?: PaginationParams) {
  return useQuery({
    queryKey: [...queryKeys.users.all, params],
    queryFn: () => usersApi.getUsers(),
  });
}

// Get user by ID
export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
  });
}

// Update user mutation
export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      usersApi.updateUser(id, data),
    onSuccess: (data, variables) => {
      // Update the user in cache
      queryClient.setQueryData(queryKeys.users.detail(variables.id), data);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}

// Delete user mutation
export function useDeleteUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: (_, id) => {
      // Remove user from cache
      queryClient.removeQueries({ queryKey: queryKeys.users.detail(id) });
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}
