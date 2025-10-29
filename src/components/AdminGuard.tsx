"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRoleFromToken } from "@/lib/auth";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // ✅ Wait for client-side hydration
    const checkRole = async () => {
      try {
        const role = getRoleFromToken();
        if (!role) {
          // no token or invalid token
          router.replace("/login");
          return;
        }
        if (role !== "admin") {
          router.replace("/unauthorized"); // or /login if you prefer
          return;
        }
      } finally {
        setIsChecking(false); // ✅ finished checking, allow rendering
      }
    };

    checkRole();
  }, [router]);

  // Prevent flicker or redirect loops while verifying
  if (isChecking) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return <>{children}</>;
}
