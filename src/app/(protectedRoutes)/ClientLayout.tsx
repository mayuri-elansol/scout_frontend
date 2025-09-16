"use client";
import { ReactNode, useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { CssBaseline, Box, useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import { theme } from "../theme/theme";
import Sidebar from "../components/organisms/Sidebar/Sidebar";
import Breadcrumb from "../components/organisms/Breadcrumb/Breadcrumb";
import Header from "../components/organisms/Header/Header";

import { PageType } from "@/app/types";
import { dashboardMenu, alertMenu, analyticsMenu } from "../config/menuConfig";
import Loader from "../components/atoms/Loader/Loader";
import RouteLoader from "../../utils/RouteLoader";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");

  const sidebartheme = useTheme();
  const isTabletOrPhone = useMediaQuery(
    sidebartheme.breakpoints.down("lg"),
    {}
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const allMenuItems = [
      ...dashboardMenu,
      ...alertMenu,
      ...analyticsMenu.flatMap((category) => category.items),
    ];

    const currentItem = allMenuItems.find(
      (item) => item.path.toLowerCase() === pathname.toLowerCase()
    );

    setCurrentPage(currentItem ? currentItem.page! : "dashboard");
  }, [pathname]);

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    console.log("Navigating to:", page);
  };

  if (!mounted) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Header />

        {/* Desktop Sidebar */}
        {!isTabletOrPhone && (
          <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
        )}

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            pt: 9,
            backgroundColor: "#f5f7fa",
            width: "100%",
          }}
        >
          <RouteLoader>
            <Breadcrumb
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            {children}
          </RouteLoader>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
