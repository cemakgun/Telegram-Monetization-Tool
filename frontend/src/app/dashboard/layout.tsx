import React from 'react';
import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        </div>
        <nav className="mt-6">
          <Link href="/dashboard" className="block px-4 py-2 text-gray-600 hover:bg-gray-200">
            Overview
          </Link>
          <Link href="/dashboard/channels" className="block px-4 py-2 text-gray-600 hover:bg-gray-200">
            Channels
          </Link>
          <Link href="/dashboard/analytics" className="block px-4 py-2 text-gray-600 hover:bg-gray-200">
            Analytics
          </Link>
          <Link href="/dashboard/settings" className="block px-4 py-2 text-gray-600 hover:bg-gray-200">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome to your Dashboard</h2>
          <UserButton afterSignOutUrl="/" />
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
