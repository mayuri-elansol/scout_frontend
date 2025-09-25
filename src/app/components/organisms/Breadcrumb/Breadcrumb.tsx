
// "use client";

// import React, { useState } from "react";
// import { PageType } from "@/app/types";
// import {
//   dashboardMenu,
//   alertMenu,
//   analyticsMenu,
// } from "@/app/config/menuConfig";
// import {
//   Box,
//   Typography,
//   Button,
//   Menu,
//   MenuItem,
//   useTheme,
// } from "@mui/material";
// import { ChevronRight, Schedule, ExpandMore } from "@mui/icons-material";

// interface BreadcrumbProps {
//   currentPage: PageType;
//   onPageChange: (page: PageType) => void;
// }

// interface BreadcrumbItem {
//   label: string;
//   onClick?: () => void;
//   clickable?: boolean;
// }

// const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPage }) => {
//   const theme = useTheme();
//   const [timePickerOpen, setTimePickerOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedTimeRange, setSelectedTimeRange] = useState("Last 1 hour");

//   const timeRanges = [
//     "Last 1 hour",
//     "Last 3 hours",
//     "Last 6 hours",
//     "Last 12 hours",
//     "Last 24 hours",
//     "Last 2 days",
//   ];

//   const handleTimePickerClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//     setTimePickerOpen(true);
//   };
//   const handleTimePickerClose = () => {
//     setAnchorEl(null);
//     setTimePickerOpen(false);
//   };
//   const handleTimeRangeSelect = (range: string) => {
//     setSelectedTimeRange(range);
//     handleTimePickerClose();
//   };

//   // Generate breadcrumbs dynamically
//   const getBreadcrumbItems = (): BreadcrumbItem[] => {
//     const items: BreadcrumbItem[] = [];

//     // Check Dashboard
//     if (dashboardMenu.some((item) => item.page === currentPage)) {
//       items.push({ label: "Dashboard", clickable: false });
//       return items;
//     }

//     // Check Alerts / Settings / Live Streaming
//     const alertItem = alertMenu.find((item) => item.page === currentPage);
//     if (alertItem) {
//       items.push({ label: alertItem.name, clickable: false });
//       return items;
//     }

//     // Check Analytics nested structure
//     for (const category of analyticsMenu) {
//       const pageItem = category.items.find((item) => item.page === currentPage);
//       if (pageItem) {
//         // Add main Analytics title
//         items.push({ label: " Analytics", clickable: false });
//         // Add category title
//         items.push({ label: category.title, clickable: false });
//         // Add specific page
//         items.push({ label: pageItem.name, clickable: false });
//         return items;
//       }
//     }

//     // Fallback
//     items.push({ label: "Dashboard", clickable: false });
//     return items;
//   };

//   const breadcrumbItems = getBreadcrumbItems();

//   return (
//     <Box
//       sx={{
//         mb: 2,
//         borderBottom: "1px solid #f0f0f0",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         flexWrap: "wrap",
//         gap: 1,
//         height: "auto",
//       }}
//     >
//       {/* Breadcrumb */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: 1,
//           color: "#5c6b7d",
//           flexWrap: "wrap",
//           "@media (max-width:798px)": { display: "none" },
//         }}
//       >
//         {breadcrumbItems.map((item, index) => (
//           <React.Fragment key={index + 1}>
//             {index > 0 && <ChevronRight sx={{ fontSize: 14 }} />}
//             <Typography
//               sx={{
//                 fontWeight:
//                   index === breadcrumbItems.length - 1 ? 500 : "normal",
//                 color:
//                   index === breadcrumbItems.length - 1 ? "#1c2025" : "#5c6b7d",
//                 fontSize: "14px",
//                 cursor: item.clickable ? "pointer" : "default",
//                 // color: item.clickable ? theme.palette.primary.main : undefined,
//                 "&:hover": item.clickable
//                   ? { textDecoration: "underline" }
//                   : undefined,
//               }}
//               onClick={item.clickable ? item.onClick : undefined}
//             >
//               {item.label}
//             </Typography>
//           </React.Fragment>
//         ))}
//       </Box>

//       {/* Time Picker */}
//       <Box
//         sx={{
//           pr: { xs: 0, sm: 2 },
//           mt: { xs: 1, sm: 0 },
//           width: "100%",
//           display: "flex",
//           justifyContent: { xs: "flex-end", sm: "flex-end" },
//           "@media (min-width:798px)": { width: "auto" },
//         }}
//       >
//         <Button
//           variant="outlined"
//           startIcon={<Schedule />}
//           endIcon={<ExpandMore />}
//           onClick={handleTimePickerClick}
//           sx={{
//             color: "#374151",
//             borderColor: "#d1d5db",
//             backgroundColor: "white",
//             fontSize: { xs: "12px", sm: "14px" },
//             px: { xs: 1, sm: 2 },
//             "&:hover": { borderColor: "#9ca3af", backgroundColor: "#f9fafb" },
//           }}
//         >
//           {selectedTimeRange}
//         </Button>

//         <Menu
//           anchorEl={anchorEl}
//           open={timePickerOpen}
//           onClose={handleTimePickerClose}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//           transformOrigin={{ vertical: "top", horizontal: "right" }}
//           slotProps={{ paper: { sx: { width: 150, maxHeight: 200, mt: 0.5 } } }}
//         >
//           {timeRanges.map((range) => (
//             <MenuItem
//               key={range}
//               selected={selectedTimeRange === range}
//               onClick={() => handleTimeRangeSelect(range)}
//               sx={{
//                 fontSize: "14px",
//                 "&.Mui-selected": {
//                   backgroundColor: "#f3f4f6",
//                   color: theme.palette.primary.main,
//                 },
//               }}
//             >
//               {range}
//             </MenuItem>
//           ))}
//         </Menu>
//       </Box>
//     </Box>
//   );
// };

// export default Breadcrumb;

"use client";

import React from "react";
import { PageType } from "@/app/types";
import {
  dashboardMenu,
  alertMenu,
  analyticsMenu,
} from "@/app/config/menuConfig";
import { Box, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

interface BreadcrumbProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  clickable?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPage }) => {
  // Generate breadcrumbs dynamically
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [];

    if (dashboardMenu.some((item) => item.page === currentPage)) {
      items.push({ label: "Dashboard", clickable: false });
      return items;
    }

    const alertItem = alertMenu.find((item) => item.page === currentPage);
    if (alertItem) {
      items.push({ label: alertItem.name, clickable: false });
      return items;
    }

    for (const category of analyticsMenu) {
      const pageItem = category.items.find((item) => item.page === currentPage);
      if (pageItem) {
        items.push({ label: "Analytics", clickable: false });
        items.push({ label: category.title, clickable: false });
        items.push({ label: pageItem.name, clickable: false });
        return items;
      }
    }

    items.push({ label: "Dashboard", clickable: false });
    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <Box
      sx={{
        mb: 3,
        borderBottom: "1px solid #f0f0f0",
        pb:1,
        display: "flex",
        alignItems: "center",
        gap: 1,
        color: "#5c6b7d",
        flexWrap: "wrap",
        "@media (max-width:798px)": { display: "none" },
      }}
    >
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index + 1}>
          {index > 0 && <ChevronRight sx={{ fontSize: 14 }} />}
          <Typography
            sx={{
              fontWeight:
                index === breadcrumbItems.length - 1 ? 500 : "normal",
              color:
                index === breadcrumbItems.length - 1 ? "#1c2025" : "#5c6b7d",
              fontSize: "14px",
              cursor: item.clickable ? "pointer" : "default",
              "&:hover": item.clickable
                ? { textDecoration: "underline" }
                : undefined,
            }}
            onClick={item.clickable ? item.onClick : undefined}
          >
            {item.label}
          </Typography>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Breadcrumb;
