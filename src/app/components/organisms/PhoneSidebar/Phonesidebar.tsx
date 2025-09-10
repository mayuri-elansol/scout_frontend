// src/app/components/organisms/PhoneSidebar/Phonesidebar.tsx
"use client";

import React, { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
  useTheme,
  Badge,
} from "@mui/material";
import { useFeatureFlags } from "../../../../customhooks/useFeatureFlag";
import {
  dashboardMenu,
  alertMenu,
  analyticsMenu,
  MenuItemConfig,
  AnalyticsCategoryConfig,
} from "../../../config/menuConfig";
import { PageType } from "@/app/types";

interface PhonesidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const Phonesidebar: React.FC<PhonesidebarProps> = ({ onPageChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const featureFlags = useFeatureFlags();
  const drawerWidth = 70;

  // Hover menu state
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [hoverMenu, setHoverMenu] = useState<AnalyticsCategoryConfig | null>(
    null
  );
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Filter menu items based on feature flags
  const filterMenuByFeatureFlags = (
    menuItems: MenuItemConfig[]
  ): MenuItemConfig[] => {
    return menuItems.filter((item) => {
      if (!item.page) return true;
      const isEnabled =
        featureFlags[item.page as keyof typeof featureFlags] === true;
      return isEnabled;
    });
  };

  const filterAnalyticsByFeatureFlags = (
    categories: AnalyticsCategoryConfig[]
  ): AnalyticsCategoryConfig[] => {
    return categories
      .map((category) => ({
        ...category,
        items: filterMenuByFeatureFlags(category.items),
      }))
      .filter((category) => category.items.length > 0);
  };

  // Get filtered menus
  const filteredDashboardMenu = filterMenuByFeatureFlags(dashboardMenu);
  const filteredAlertMenu = filterMenuByFeatureFlags(alertMenu);
  const filteredAnalyticsMenu = filterAnalyticsByFeatureFlags(analyticsMenu);

  const allMenuItems: (MenuItemConfig | AnalyticsCategoryConfig)[] = [
    ...filteredDashboardMenu,
    ...filteredAnalyticsMenu,
    ...filteredAlertMenu,
  ];

  // Event Handlers
  const handleMouseEnter = (
    event: React.MouseEvent<HTMLElement>,
    item: MenuItemConfig | AnalyticsCategoryConfig
  ) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    const itemTitle = "title" in item ? item.title : item.name;
    setHoveredItem(itemTitle);

    if ("items" in item && item.items.length > 0) {
      setAnchorEl(event.currentTarget);
      setHoverMenu(item);
      setPopoverOpen(true);
    } else {
      setPopoverOpen(false);
      setHoverMenu(null);
      setAnchorEl(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handlePopoverMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handlePopoverMouseLeave = () => {
    setPopoverOpen(false);
    setAnchorEl(null);
    setHoverMenu(null);
  };

  const handleMenuItemClick = (
    item: MenuItemConfig | AnalyticsCategoryConfig
  ) => {
    if ("path" in item && item.path && !("items" in item)) {
      router.push(item.path);
      if (item.page) {
        onPageChange(item.page); // ✅ update parent state
      }
      setPopoverOpen(false);
      setAnchorEl(null);
      setHoverMenu(null);
    }
  };

  const handleSubMenuClick = (subItem: MenuItemConfig) => {
    if (subItem.path) {
      router.push(subItem.path);
      if (subItem.page) {
        onPageChange(subItem.page);
      }
      setPopoverOpen(false);
      setAnchorEl(null);
      setHoverMenu(null);
    }
  };

  // Helpers
  const isItemSelected = (item: MenuItemConfig | AnalyticsCategoryConfig) => {
    if ("path" in item && item.path) {
      return pathname === item.path;
    }
    if ("items" in item && item.items) {
      return item.items.some((subItem) => pathname === subItem.path);
    }
    return false;
  };

  const getButtonStyles = (item: MenuItemConfig | AnalyticsCategoryConfig) => {
    const isSelected = isItemSelected(item);
    const itemTitle = "title" in item ? item.title : item.name;
    const isHovered = hoveredItem === itemTitle;
    let backgroundColor: string;

    if (isSelected) {
      backgroundColor = theme.palette.primary.main;
    } else if (isHovered) {
      backgroundColor = theme.palette.action.hover;
    } else {
      backgroundColor = "transparent";
    }

    return {
      borderRadius: 1,
      minHeight: 48,
      justifyContent: "center",
      mx: 1,
      backgroundColor: backgroundColor,
      color: isSelected ? "white" : "inherit",
      "&:hover": {
        backgroundColor: isSelected
          ? theme.palette.primary.dark
          : theme.palette.action.hover,
      },
      transition: "background-color 0.2s ease-in-out",
    };
  };

  const renderIcon = (item: MenuItemConfig | AnalyticsCategoryConfig) => {
    const IconComponent = item.icon;
    const iconElement = IconComponent ? <IconComponent /> : null;

    if ("badge" in item && item.badge) {
      return (
        <Badge
          badgeContent={item.badge}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.75rem",
              minWidth: "16px",
              height: "16px",
              right: -6,
              top: -2,
            },
          }}
        >
          {iconElement}
        </Badge>
      );
    }

    return iconElement;
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            mt: "64px",
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            borderRight: "1px solid #e0e0e0",
            backgroundColor: "#fff",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <List sx={{ flex: 1, pt: 2 }}>
            {allMenuItems.map((item, index) => {
              const itemKey =
                "title" in item
                  ? `${item.title}-${index}`
                  : `${item.name}-${index}`;

              return (
                <ListItem
                  key={itemKey}
                  disablePadding
                  sx={{ mb: 1 }}
                  onMouseEnter={(e) => handleMouseEnter(e, item)}
                  onMouseLeave={handleMouseLeave}
                >
                  <ListItemButton
                    onClick={() => handleMenuItemClick(item)}
                    sx={getButtonStyles(item)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: "center",
                        color: isItemSelected(item)
                          ? "white"
                          : theme.palette.action.active,
                      }}
                    >
                      {renderIcon(item)}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      {/* Popover for sub-items */}
      <Popover
        open={popoverOpen && Boolean(hoverMenu)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        sx={{
          pointerEvents: "none",
          "& .MuiPopover-paper": {
            pointerEvents: "auto",
            ml: 1,
          },
        }}
      >
        {" "}
        <Box
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
          sx={{
            py: 1,
            minWidth: 300,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              px: 2,
              py: 1,
              fontWeight: 600,
              color: theme.palette.primary.main,
              borderBottom: `1px solid ${theme.palette.divider}`,
              mb: 1,
              fontSize: "0.875rem",
            }}
          ></Typography>
          <List sx={{ py: 0 }}>
            {hoverMenu?.items?.map((subItem, subIndex) => (
              <ListItem key={`${subItem.name}-${subIndex}`} disablePadding>
                <ListItemButton
                  selected={pathname === subItem.path}
                  onClick={() => handleSubMenuClick(subItem)}
                  sx={{
                    px: 2,
                    py: 1.5,
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.action.hover,
                      color: "inherit",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                      },
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemText
                    primary={subItem.name}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: "0.875rem",
                          lineHeight: 1.4,
                          fontWeight: pathname === subItem.path ? 500 : 400,
                        },
                      },
                    }}
                  />
                  {subItem.badge && (
                    <Badge
                      badgeContent={subItem.badge}
                      color="error"
                      sx={{ ml: 1 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default Phonesidebar;
