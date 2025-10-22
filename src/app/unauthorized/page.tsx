'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to appropriate dashboard after 3 seconds
    const timer = setTimeout(() => {
      const role = localStorage.getItem('userRole');
      switch (role) {
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'driver':
          router.push('/driver/dashboard');
          break;
        case 'parent':
          router.push('/parent/dashboard');
          break;
        default:
          router.push('/login');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto h-12 w-12 text-red-500">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
        
        <div className="mt-8">
          <button
            onClick={() => {
              const role = localStorage.getItem('userRole');
              switch (role) {
                case 'admin':
                  router.push('/admin/dashboard');
                  break;
                case 'driver':
                  router.push('/driver/dashboard');
                  break;
                case 'parent':
                  router.push('/parent/dashboard');
                  break;
                default:
                  router.push('/login');
              }
            }}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to My Dashboard
          </button>
        </div>

        <div className="text-sm text-gray-500">
          <p>Redirecting automatically in 3 seconds...</p>
        </div>
      </div>
    </div>
  );
}
