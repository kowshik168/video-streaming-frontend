"use client";

import { ReactNode } from "react";
import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Video } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Videos", href: "/admin/videos", icon: Video },
  ];

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-900">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 shadow-lg flex-shrink-0">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold tracking-wide">🎥 Admin Panel</h2>
          </div>

          <ul className="mt-6 space-y-1">
            {navItems.map(({ name, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-5 py-3 rounded-md transition-all duration-200 ${
                      active
                        ? "bg-gray-700 text-white shadow-inner"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 p-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
