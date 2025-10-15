"use client";
import { ReactNode, useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { CssBaseline, Box, useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import { theme } from "../theme/theme";
import Sidebar from "../components/organisms/Sidebar/Sidebar";
import Header from "../components/organisms/Header/Header";

import { PageType } from "@/app/types";
import { dashboardMenu, alertMenu, analyticsMenu } from "../config/menuConfig";
import Loader from "../components/atoms/Loader/Loader";
import RouteLoader from "../../utils/RouteLoader";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({
  children,
}: Readonly<ClientLayoutProps>) {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>(
    "safety-compliance-dashboard"
  );

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
      // flatten Dashboard menu (each category’s items)
      ...dashboardMenu.flatMap((category) => category.items),
      ...alertMenu,
      ...analyticsMenu.flatMap((category) => category.items),
    ];

    const currentItem = allMenuItems.find(
      (item) => item.path.toLowerCase() === pathname.toLowerCase()
    );

    setCurrentPage(
      currentItem ? currentItem.page! : "safety-compliance-dashboard"
    );
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Header />

          {/* Desktop Sidebar */}

          {!isTabletOrPhone && (
            <Sidebar
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              pl: 2.5,
              pr: 2.5,
              pb: 4,
              pt: 10,
              backgroundColor: "#f5f7fa",
              width: "78vw",
            }}
          >
            <RouteLoader>
              {/* <Breadcrumb
                currentPage={currentPage}
                onPageChange={handlePageChange}
              /> */}
              {children}
            </RouteLoader>
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
