'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { routesApi } from '@/lib/api';
import type { Route } from '@/types/api';

const routeSchema = z.object({
  name: z.string().min(2, 'Route name must be at least 2 characters'),
  startPoint: z.string().min(2, 'Start point must be at least 2 characters'),
  endPoint: z.string().min(2, 'End point must be at least 2 characters'),
  estimatedDuration: z.number().min(1, 'Duration must be at least 1 minute'),
  isActive: z.boolean(),
});

type RouteFormData = z.infer<typeof routeSchema>;

interface EditRouteModalProps {
  route: Route | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditRouteModal({ route, isOpen, onClose, onSuccess }: EditRouteModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RouteFormData>({
    resolver: zodResolver(routeSchema),
  });

  useEffect(() => {
    if (route && isOpen) {
      reset({
        name: route.name,
        startPoint: route.startPoint,
        endPoint: route.endPoint,
        estimatedDuration: route.estimatedDuration,
        isActive: route.isActive,
      });
      setMessage(null);
    }
  }, [route, isOpen, reset]);

  const onSubmit = async (data: RouteFormData) => {
    if (!route) return;
    
    setIsLoading(true);
    setMessage(null);

    try {
      await routesApi.updateRoute(route.id, data);
      setMessage({ type: 'success', text: 'Route updated successfully!' });
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update route' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Edit Route
                  </h3>

                  {message && (
                    <div className={`mb-4 px-4 py-3 rounded-md ${
                      message.type === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-600'
                        : 'bg-red-50 border border-red-200 text-red-600'
                    }`}>
                      {message.text}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Route Name
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter route name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="startPoint" className="block text-sm font-medium text-gray-700">
                        Start Point
                      </label>
                      <input
                        {...register('startPoint')}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter start point"
                      />
                      {errors.startPoint && (
                        <p className="mt-1 text-sm text-red-600">{errors.startPoint.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="endPoint" className="block text-sm font-medium text-gray-700">
                        End Point
                      </label>
                      <input
                        {...register('endPoint')}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter end point"
                      />
                      {errors.endPoint && (
                        <p className="mt-1 text-sm text-red-600">{errors.endPoint.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="estimatedDuration" className="block text-sm font-medium text-gray-700">
                        Estimated Duration (minutes)
                      </label>
                      <input
                        {...register('estimatedDuration', { valueAsNumber: true })}
                        type="number"
                        min="1"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter duration in minutes"
                      />
                      {errors.estimatedDuration && (
                        <p className="mt-1 text-sm text-red-600">{errors.estimatedDuration.message}</p>
                      )}
                    </div>

                    <div className="flex items-center">
                      <input
                        {...register('isActive')}
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                        Route is active
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Updating...' : 'Update Route'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
