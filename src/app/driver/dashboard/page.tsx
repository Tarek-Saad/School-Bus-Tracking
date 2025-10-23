'use client';

import { useState, useEffect } from 'react';
import { dashboardApi, routesApi, busesApi, attendanceApi, notificationsApi } from '@/lib/api';
import type { DriverDashboard, Route, Bus, Attendance, Notification } from '@/types/api';
import AuthLayout from '@/components/AuthLayout';

export default function DriverDashboard() {
  const [dashboardData, setDashboardData] = useState<DriverDashboard | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboard, routesData, busesData, notificationsData] = await Promise.all([
          dashboardApi.getDriverDashboard(),
          routesApi.getRoutes(),
          busesApi.getBuses(),
          notificationsApi.getNotifications(),
        ]);

        setDashboardData(dashboard);
        setRoutes(routesData);
        setBuses(busesData);
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBusStatusUpdate = async (busId: string, status: Bus['status']) => {
    try {
      await busesApi.updateBusStatus(busId, { status });
      // Refresh buses data
      const updatedBuses = await busesApi.getBuses();
      setBuses(updatedBuses);
    } catch (error) {
      console.error('Error updating bus status:', error);
    }
  };

  if (isLoading) {
    return (
      <AuthLayout requiredRole="driver">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout requiredRole="driver">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'routes', name: 'My Routes' },
              { id: 'buses', name: 'My Buses' },
              { id: 'attendance', name: 'Attendance' },
              { id: 'notifications', name: 'Notifications' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'overview' && dashboardData && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">🚌</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Assigned Routes
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {dashboardData.assignedRoutes?.length || 0}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">🎒</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Today's Students
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {dashboardData.todaysStudents?.length || 0}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">📢</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Unread Notifications
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {notifications.filter(n => !n.isRead).length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'routes' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">My Routes</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Routes assigned to you
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {routes.map((route) => (
                  <li key={route.id}>
                    <div className="px-4 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-indigo-600">🚌</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{route.name}</div>
                            <div className="text-sm text-gray-500">
                              {route.startPoint} → {route.endPoint}
                            </div>
                            <div className="text-sm text-gray-500">
                              Duration: {route.estimatedDuration} minutes
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            route.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {route.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'buses' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">My Buses</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Buses assigned to you
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {buses.map((bus) => (
                  <li key={bus.id}>
                    <div className="px-4 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-yellow-600">🚌</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{bus.busNumber}</div>
                            <div className="text-sm text-gray-500">{bus.licensePlate}</div>
                            <div className="text-sm text-gray-500">Capacity: {bus.capacity}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <select
                            value={bus.status}
                            onChange={(e) => handleBusStatusUpdate(bus.id, e.target.value as Bus['status'])}
                            className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="offline">Offline</option>
                            <option value="active">Active</option>
                            <option value="in_route">In Route</option>
                            <option value="stopped">Stopped</option>
                            <option value="maintenance">Maintenance</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Attendance</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Record student attendance
                </p>
              </div>
              <div className="px-4 py-5">
                <div className="text-center text-gray-500">
                  <p>Attendance recording functionality will be implemented here</p>
                  <p className="text-sm mt-2">You can record present/absent status for students on your routes</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Your notifications and messages
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <li key={notification.id}>
                    <div className="px-4 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-3 w-3 rounded-full ${
                          notification.isRead ? 'bg-gray-300' : 'bg-blue-500'
                        }`}></div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{notification.title}</div>
                          <div className="text-sm text-gray-500">{notification.message}</div>
                          <div className="text-xs text-gray-400">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          notification.type === 'alert' ? 'bg-red-100 text-red-800' :
                          notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          notification.type === 'reminder' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
