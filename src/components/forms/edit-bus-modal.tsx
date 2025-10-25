'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { busesApi } from '@/lib/api';
import type { Bus } from '@/types/api';

const busSchema = z.object({
  busNumber: z.string().min(1, 'Bus number is required'),
  licensePlate: z.string().min(1, 'License plate is required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  status: z.enum(['offline', 'active', 'in_route', 'stopped', 'maintenance']),
});

type BusFormData = z.infer<typeof busSchema>;

interface EditBusModalProps {
  bus: Bus | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditBusModal({ bus, isOpen, onClose, onSuccess }: EditBusModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BusFormData>({
    resolver: zodResolver(busSchema),
  });

  useEffect(() => {
    if (bus && isOpen) {
      reset({
        busNumber: bus.busNumber,
        licensePlate: bus.licensePlate,
        capacity: bus.capacity,
        status: bus.status,
      });
      setMessage(null);
    }
  }, [bus, isOpen, reset]);

  const onSubmit = async (data: BusFormData) => {
    if (!bus) return;
    
    setIsLoading(true);
    setMessage(null);

    try {
      await busesApi.updateBusStatus(bus.id, { status: data.status });
      setMessage({ type: 'success', text: 'Bus updated successfully!' });
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update bus' 
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
                    Edit Bus
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
                      <label htmlFor="busNumber" className="block text-sm font-medium text-gray-700">
                        Bus Number
                      </label>
                      <input
                        {...register('busNumber')}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter bus number"
                      />
                      {errors.busNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.busNumber.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">
                        License Plate
                      </label>
                      <input
                        {...register('licensePlate')}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter license plate"
                      />
                      {errors.licensePlate && (
                        <p className="mt-1 text-sm text-red-600">{errors.licensePlate.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                        Capacity
                      </label>
                      <input
                        {...register('capacity', { valueAsNumber: true })}
                        type="number"
                        min="1"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter capacity"
                      />
                      {errors.capacity && (
                        <p className="mt-1 text-sm text-red-600">{errors.capacity.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        {...register('status')}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="offline">Offline</option>
                        <option value="active">Active</option>
                        <option value="in_route">In Route</option>
                        <option value="stopped">Stopped</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                      {errors.status && (
                        <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                      )}
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
                {isLoading ? 'Updating...' : 'Update Bus'}
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
