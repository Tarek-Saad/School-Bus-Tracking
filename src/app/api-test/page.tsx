'use client';

import { useState } from 'react';
import { authApi } from '@/lib/api';

export default function APITestPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testRegistration = async () => {
    setLoading(true);
    setResult('Testing registration...');
    
    try {
      const testEmail = `test_${Date.now()}@example.com`;
      const response = await authApi.register({
        email: testEmail,
        password: 'test123',
        name: 'Test User',
        role: 'parent'
      });
      
      setResult(`✅ Registration successful! Token: ${response.token?.substring(0, 20)}...`);
    } catch (error: any) {
      setResult(`❌ Registration failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setResult('Testing login...');
    
    try {
      const response = await authApi.login({
        email: 'admin@schoolbus.com',
        password: 'admin123'
      });
      
      setResult(`✅ Login successful! Token: ${response.token?.substring(0, 20)}...`);
    } catch (error: any) {
      setResult(`❌ Login failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testProfile = async () => {
    setLoading(true);
    setResult('Testing profile...');
    
    try {
      const response = await authApi.getProfile();
      setResult(`✅ Profile successful! User: ${response.name} (${response.role})`);
    } catch (error: any) {
      setResult(`❌ Profile failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">API Test Page</h1>
        
        <div className="space-y-4">
          <button
            onClick={testRegistration}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Test Registration
          </button>
          
          <button
            onClick={testLogin}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
          >
            Test Login (admin@schoolbus.com)
          </button>
          
          <button
            onClick={testProfile}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            Test Profile (requires token)
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Result:</h3>
          <pre className="text-sm whitespace-pre-wrap">{result}</pre>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-semibold text-yellow-800 mb-2">Note:</h3>
          <p className="text-sm text-yellow-700">
            The remote API is returning 500 errors on registration. This could be due to:
            <br />• Database connection issues
            <br />• Missing required fields
            <br />• Server-side validation errors
            <br />• Rate limiting
          </p>
        </div>
      </div>
    </div>
  );
}
