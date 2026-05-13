"use client";
import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

interface PageTransitionWrapperProps {
  children: ReactNode;
}

export default function PageTransitionWrapper({ children }: Readonly<PageTransitionWrapperProps>) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== currentPath) {
      // Route is changing
      setLoading(true);

      // Simulate a loader while route updates
      const timer = setTimeout(() => {
        setCurrentPath(pathname);
        setLoading(false);
      }, 300); // optional: small delay to show loader even for fast routes

      return () => clearTimeout(timer);
    }
  }, [pathname, currentPath]);

  if (loading) {
    return     <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      <CircularProgress />
    </Box>;
  }

  return <>{children}</>;
}