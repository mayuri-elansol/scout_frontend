"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "@/customhooks/useAuth";
import Loader from "@/app/components/atoms/Loader/Loader";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/Login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return <Loader />;

  // Optionally, block rendering until redirect happens
  if (!isAuthenticated) return null;

  return <>{children}</>;
}

