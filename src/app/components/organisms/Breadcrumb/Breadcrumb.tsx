"use client";

import React from "react";
import { PageType } from "@/app/types";
import { analyticsMenu } from "@/app/config/menuConfig";
import { Box, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
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
  const getBreadcrumbItems = (): BreadcrumbItem[] | null => {
    // Only show breadcrumb for Analytics or Settings pages
    // Assuming you have a settingsMenu similar to analyticsMenu
    const isAnalyticsPage = analyticsMenu.some((category) =>
      category.items.some((item) => item.page === currentPage)
    );

    const isSettingsPage = false; // Replace with your settingsMenu logic if exists

    if (!isAnalyticsPage && !isSettingsPage) {
      return null; // Do not render breadcrumb
    }

    const items: BreadcrumbItem[] = [];

    // Analytics pages
    if (isAnalyticsPage) {
      for (const category of analyticsMenu) {
        const pageItem = category.items.find(
          (item) => item.page === currentPage
        );
        if (pageItem) {
          items.push({ label: "Analytics", clickable: false });
          items.push({ label: category.title, clickable: false });
          items.push({ label: pageItem.name, clickable: false });
          return items;
        }
      }
    }

    // Settings pages (if needed)
    if (isSettingsPage) {
      items.push({ label: "Settings", clickable: false });
      // Add sub-items if required
      return items;
    }

    return null;
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Do not render breadcrumb if null
  if (!breadcrumbItems) return null;

  return (
    <Box
      sx={{
        mb: 3,
        borderBottom: "1px solid #f0f0f0",
        pb: 1,
        display: "flex",
        alignItems: "center",
        gap: 1,
        color: "#5c6b7d",
        flexWrap: "wrap",
        "@media (max-width:798px)": { display: "none" },
      }}
    >
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={uuidv4() + index}>
          {index > 0 && <ChevronRight sx={{ fontSize: 14 }} />}
          <Typography
            sx={{
              fontWeight: index === breadcrumbItems.length - 1 ? 500 : "normal",
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
