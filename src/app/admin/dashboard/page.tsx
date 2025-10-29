import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Welcome, Admin!</h1>
        <p className="mt-4 text-gray-700">This is a protected admin dashboard.</p>
      </div>
    </ProtectedRoute>
  );
}
