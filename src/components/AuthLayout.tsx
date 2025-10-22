'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authApi } from '@/lib/api';
import { User } from '@/types/api';

interface AuthLayoutProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'driver' | 'parent';
}

export default function AuthLayout({ children, requiredRole }: AuthLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const userData = await authApi.getProfile();
        setUser(userData);

        // Check role-based access
        if (requiredRole && userData.role !== requiredRole) {
          router.push('/unauthorized');
          return;
        }

        // Redirect to appropriate dashboard if on root
        if (pathname === '/') {
          switch (userData.role) {
            case 'admin':
              router.push('/admin/dashboard');
              break;
            case 'driver':
              router.push('/driver/dashboard');
              break;
            case 'parent':
              router.push('/parent/dashboard');
              break;
          }
        }
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname, requiredRole]);

  const handleLogout = async () => {
    await authApi.logout();
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                🚌 School Bus Tracking
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user.name}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
