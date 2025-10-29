// app/admin/layout.tsx
"use client";

import { ReactNode } from "react";
import AdminGuard from "@/components/AdminGuard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        {/* Sidebar (optional placeholder) */}
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
          <ul className="space-y-2">
            <li><a href="/admin/dashboard" className="hover:text-gray-300">Dashboard</a></li>
            <li><a href="/admin/videos" className="hover:text-gray-300">Videos</a></li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-100 p-6">{children}</main>
      </div>
     </AdminGuard>
  );
}
