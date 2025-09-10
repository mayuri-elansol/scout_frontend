"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../app/components/atoms/Loader/Loader";

export default function RouteLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
<<<<<<< HEAD:src/RouteLoader.tsx
    const timer = setTimeout(() => setLoading(false), 800);
=======
    const timer = setTimeout(() => setLoading(false), 800); 
>>>>>>> 2f65c927fee8305a8ec54aebf452fb3c6c861a0b:src/utils/RouteLoader.tsx
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
