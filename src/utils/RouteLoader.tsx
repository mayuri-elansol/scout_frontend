"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../app/components/atoms/Loader/Loader";

interface RouteLoaderProps {
  readonly children: React.ReactNode;
}

export default function RouteLoader({ children }: RouteLoaderProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 50,
          right: 0,
          bottom: 0,
        }}
      >
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
