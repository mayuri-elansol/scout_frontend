// "use client";
// import { ReactNode, useState } from "react";
// import { ThemeProvider } from "@mui/material/styles";
// import { CssBaseline, Box } from "@mui/material";
// import { theme } from "../theme/theme";
// import Sidebar from "../components/organisms/Sidebar/Sidebar";
// import { PageType } from "@/app/types";
// import { Breadcrumb, Header } from "../components";

// interface ClientLayoutProps {
//   children: ReactNode;
// }

// export default function ClientLayout({ children }: ClientLayoutProps) {
//   const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

//   const handlePageChange = (page: PageType) => {
//     setCurrentPage(page);
//     console.log('Navigating to:', page);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ display: "flex", minHeight: "100vh" }}>
//         {/* Sidebar */}
//         <Header/>
//         <Sidebar
//           currentPage={currentPage}
//           onPageChange={handlePageChange}
//         />

//         {/* Main content */}
//         <Box sx={{ flex: 1, p:4 ,pt:8 }}>
//         <Breadcrumb currentPage={currentPage} onPageChange={handlePageChange} />

//           {children}
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }
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
      setCurrentPage("dashboard"); // default page
    }
  }, [pathname]);

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    console.log("Navigating to:", page);
  };
  const theme = useTheme();
  const isTabletOrPhone = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
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
        <Box sx={{ flex: 1, p: 4, pt: 8 }}>
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
