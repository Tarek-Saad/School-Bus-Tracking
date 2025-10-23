'use client';

import { useState, useEffect } from 'react';
import { dashboardApi, studentsApi, notificationsApi, attendanceApi } from '@/lib/api';
import type { ParentDashboard, Student, Notification, Attendance } from '@/types/api';
import AuthLayout from '@/components/AuthLayout';

export default function ParentDashboard() {
  const [dashboardData, setDashboardData] = useState<ParentDashboard | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [attendanceHistory, setAttendanceHistory] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboard, studentsData, notificationsData] = await Promise.all([
          dashboardApi.getParentDashboard(),
          studentsApi.getStudents(),
          notificationsApi.getNotifications(),
        ]);

        setDashboardData(dashboard);
        setStudents(studentsData);
        setNotifications(notificationsData);

        // Fetch attendance history for each student
        if (studentsData.length > 0) {
          const attendancePromises = studentsData.map((student: Student) => 
            attendanceApi.getStudentAttendance(student.id)
          );
          const attendanceData = await Promise.all(attendancePromises);
          setAttendanceHistory(attendanceData.flat());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <AuthLayout requiredRole="parent">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout requiredRole="parent">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'students', name: 'My Children' },
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
                      <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">🎒</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          My Children
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {students.length}
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
                      <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">🚌</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Bus Status
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {dashboardData.busLocation ? 'On Route' : 'Not Available'}
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

          {activeTab === 'students' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">My Children</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Information about your children
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {students.map((student) => (
                  <li key={student.id}>
                    <div className="px-4 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {student.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.grade}</div>
                            <div className="text-sm text-gray-500">
                              Pickup: {student.pickupAddress}
                            </div>
                            <div className="text-sm text-gray-500">
                              Dropoff: {student.dropoffAddress}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {student.grade}
                          </span>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Emergency Contact</div>
                            <div className="text-sm font-medium text-gray-900">{student.emergencyContact}</div>
                            <div className="text-sm text-gray-500">{student.emergencyPhone}</div>
                          </div>
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
                <h3 className="text-lg leading-6 font-medium text-gray-900">Attendance History</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Track your children's attendance
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {attendanceHistory.length > 0 ? (
                  attendanceHistory.map((attendance) => (
                    <li key={attendance.id}>
                      <div className="px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              attendance.status === 'present' ? 'bg-green-100' :
                              attendance.status === 'absent' ? 'bg-red-100' :
                              'bg-yellow-100'
                            }`}>
                              <span className={`text-sm font-medium ${
                                attendance.status === 'present' ? 'text-green-600' :
                                attendance.status === 'absent' ? 'text-red-600' :
                                'text-yellow-600'
                              }`}>
                                {attendance.status === 'present' ? '✓' :
                                 attendance.status === 'absent' ? '✗' : '⚠'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(attendance.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              Status: {attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}
                            </div>
                            {attendance.pickupTime && (
                              <div className="text-sm text-gray-500">
                                Pickup: {attendance.pickupTime}
                              </div>
                            )}
                            {attendance.dropoffTime && (
                              <div className="text-sm text-gray-500">
                                Dropoff: {attendance.dropoffTime}
                              </div>
                            )}
                          </div>
                        </div>
                        {attendance.notes && (
                          <div className="text-sm text-gray-500 max-w-xs">
                            {attendance.notes}
                          </div>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-8 text-center text-gray-500">
                    No attendance records found
                  </li>
                )}
              </ul>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Important updates about your children
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
