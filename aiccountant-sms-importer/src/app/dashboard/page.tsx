'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Protect this route
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, {user.name}! 👋
          </h1>
          <p className="text-gray-600 mb-8">
            You're successfully logged in. This is your protected dashboard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 mb-1">Transactions</h3>
              <p className="text-sm text-gray-600">
                CSV import coming in Step 2
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold text-gray-900 mb-1">SMS Import</h3>
              <p className="text-sm text-gray-600">
                Batch processing ready
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-semibold text-gray-900 mb-1">Auth Working</h3>
              <p className="text-sm text-gray-600">
                Token stored & protected
              </p>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">🔐 Auth Status</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ User authenticated: {user.email}</li>
              <li>✓ Bearer token attached to API calls</li>
              <li>✓ 401 errors handled with auto-logout</li>
              <li>✓ Protected routes working</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}