import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { logosApi } from '@/lib/api';
import { queryKeys } from '@/types/api';
import type { Logo, CreateLogoData, UpdateLogoData, PaginationParams } from '@/types/api';

// Get all logos
export function useLogos(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.logos.list(params || {}),
    queryFn: () => logosApi.getAll(params),
  });
}

// Get logo by ID
export function useLogo(id: string) {
  return useQuery({
    queryKey: queryKeys.logos.detail(id),
    queryFn: () => logosApi.getById(id),
    enabled: !!id,
  });
}

// Search logos
export function useSearchLogos(query: string, params?: PaginationParams) {
  return useQuery({
    queryKey: [...queryKeys.logos.all, 'search', query, params],
    queryFn: () => logosApi.search(query, params),
    enabled: !!query,
  });
}

// Create logo mutation
export function useCreateLogo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: logosApi.create,
    onSuccess: () => {
      // Invalidate logos list
      queryClient.invalidateQueries({ queryKey: queryKeys.logos.all });
    },
  });
}

// Update logo mutation
export function useUpdateLogo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLogoData }) =>
      logosApi.update(id, data),
    onSuccess: (data, variables) => {
      // Update the logo in cache
      queryClient.setQueryData(queryKeys.logos.detail(variables.id), data);
      // Invalidate logos list
      queryClient.invalidateQueries({ queryKey: queryKeys.logos.all });
    },
  });
}

// Delete logo mutation
export function useDeleteLogo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: logosApi.delete,
    onSuccess: (_, id) => {
      // Remove logo from cache
      queryClient.removeQueries({ queryKey: queryKeys.logos.detail(id) });
      // Invalidate logos list
      queryClient.invalidateQueries({ queryKey: queryKeys.logos.all });
    },
  });
}
