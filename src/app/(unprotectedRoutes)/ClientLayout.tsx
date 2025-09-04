
"use client";
import { ReactNode, useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { CssBaseline, Box, useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import { theme } from "../theme/theme";
import Sidebar from "../components/organisms/Sidebar/Sidebar";
import { Breadcrumb, Header } from "../components";
import { PageType } from "@/app/types";
import { dashboardMenu, alertMenu, analyticsMenu } from "../config/menuConfig";
import Phonesidebar from "../components/organisms/PhoneSidebar/Phonesidebar";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  const allMenuItems = [
    ...dashboardMenu,
    ...alertMenu,
    ...analyticsMenu.flatMap((category) => category.items),
  ];

  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");

  useEffect(() => {
    // Find the menu item that matches the current pathname
    const currentItem = allMenuItems.find(
      (item) => item.path.toLowerCase() === pathname.toLowerCase()
    );

    if (currentItem) {
      setCurrentPage(currentItem.page!);
    } else {
      setCurrentPage("dashboard"); 
    }
  }, [pathname]);

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    console.log("Navigating to:", page);
  };
  const sidebartheme = useTheme();
  const isTabletOrPhone = useMediaQuery(sidebartheme.breakpoints.down("lg"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", }}>
        <Header />
        {!isTabletOrPhone && (
          <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
        )}

        {/* PhoneSidebar (Tablet & Phone) */}
        {isTabletOrPhone && (
          <Phonesidebar
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <Box sx={{ flex: 1, p: 4, pt: 8 , backgroundColor: "#f5f7fa" }}>
          <Breadcrumb
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
