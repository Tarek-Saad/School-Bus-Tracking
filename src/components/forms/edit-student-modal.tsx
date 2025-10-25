'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { studentsApi } from '@/lib/api';
import type { Student } from '@/types/api';

const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  grade: z.string().min(1, 'Grade is required'),
  pickupAddress: z.string().min(5, 'Pickup address must be at least 5 characters'),
  dropoffAddress: z.string().min(5, 'Dropoff address must be at least 5 characters'),
  emergencyContact: z.string().min(2, 'Emergency contact name is required'),
  emergencyPhone: z.string().min(10, 'Emergency phone must be at least 10 characters'),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface EditStudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditStudentModal({ student, isOpen, onClose, onSuccess }: EditStudentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  useEffect(() => {
    if (student && isOpen) {
      reset({
        name: student.name,
        grade: student.grade,
        pickupAddress: student.pickupAddress,
        dropoffAddress: student.dropoffAddress,
        emergencyContact: student.emergencyContact,
        emergencyPhone: student.emergencyPhone,
      });
      setMessage(null);
    }
  }, [student, isOpen, reset]);

  const onSubmit = async (data: StudentFormData) => {
    if (!student) return;
    
    setIsLoading(true);
    setMessage(null);

    try {
      await studentsApi.updateStudent(student.id, data);
      setMessage({ type: 'success', text: 'Student updated successfully!' });
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update student' 
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
                    Edit Student
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
                        Student Name
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter student name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                        Grade
                      </label>
                      <input
                        {...register('grade')}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter grade"
                      />
                      {errors.grade && (
                        <p className="mt-1 text-sm text-red-600">{errors.grade.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-700">
                        Pickup Address
                      </label>
                      <textarea
                        {...register('pickupAddress')}
                        rows={2}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter pickup address"
                      />
                      {errors.pickupAddress && (
                        <p className="mt-1 text-sm text-red-600">{errors.pickupAddress.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="dropoffAddress" className="block text-sm font-medium text-gray-700">
                        Dropoff Address
                      </label>
                      <textarea
                        {...register('dropoffAddress')}
                        rows={2}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter dropoff address"
                      />
                      {errors.dropoffAddress && (
                        <p className="mt-1 text-sm text-red-600">{errors.dropoffAddress.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
                        Emergency Contact Name
                      </label>
                      <input
                        {...register('emergencyContact')}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter emergency contact name"
                      />
                      {errors.emergencyContact && (
                        <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700">
                        Emergency Phone
                      </label>
                      <input
                        {...register('emergencyPhone')}
                        type="tel"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter emergency phone number"
                      />
                      {errors.emergencyPhone && (
                        <p className="mt-1 text-sm text-red-600">{errors.emergencyPhone.message}</p>
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
                {isLoading ? 'Updating...' : 'Update Student'}
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
