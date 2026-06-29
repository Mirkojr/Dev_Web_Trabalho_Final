"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import type { AuthUser } from "@/types/auth";

export function useAdminGuard() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    authService
      .me()
      .then((me) => {
        if (!active) return;
        if (me.role !== "ADMIN") {
          router.replace("/swipe");
          return;
        }
        setUser(me);
        setChecking(false);
      })
      .catch(() => router.replace("/login"));

    return () => {
      active = false;
    };
  }, [router]);

  return { user, checking };
}