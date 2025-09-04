import React, { useState, useRef } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Home,
  Shield,
  Visibility,
  People,
  Settings,
  VideoCall,
  Description,
  Warning,
  BarChart,
  PeopleAlt,
} from "@mui/icons-material";

// interface SidebarProps {
//   currentPage: string;
//   onPageChange: (page: string) => void;
// }
import { PageType } from "@/app/types";

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}
// interface MenuItem {
//   name: string;
//   page: string;
// }

// interface MenuCategory {
//   title: string;
//   icon: React.ComponentType;
//   page?: string;
//   items?: MenuItem[];
// }
interface MenuItem {
  name: string;
  page: PageType;
}

interface MenuCategory {
  title: string;
  icon: React.ComponentType;
  page?: PageType;
  items?: MenuItem[];
}
const Phonesidebar: React.FC<SidebarProps> = ({
  currentPage,
  onPageChange,
}) => {
  const theme = useTheme();
  const drawerWidth = 70;

  // Hover menu state
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [hoverMenu, setHoverMenu] = useState<MenuCategory | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const analyticsMenuItems: MenuCategory[] = [
    { title: "Dashboard", icon: Home, page: "dashboard" },
    {
      title: "Safety and Compliance",
      icon: Shield,
      items: [
        {
          name: "Personal Protective Equipment (PPE) Detection",
          page: "ppe-detection",
        },
        { name: "Object Detection in Walking Bays", page: "object-detection" },
        {
          name: "Fire, Smoke, Oil and Gas Leak Detection",
          page: "fire-detection",
        },
        {
          name: "Vehicle Speed Monitoring inside premises",
          page: "vehicle-speed",
        },
      ],
    },
    {
      title: "Security Monitoring",
      icon: Visibility,
      items: [
        {
          name: "Intrusion Detection at Premises Perimeter",
          page: "intrusion-detection",
        },
      ],
    },
    {
      title: "Workforce Monitoring",
      icon: People,
      items: [
        {
          name: "Employee presence detection in critical areas",
          page: "employee-presence",
        },
      ],
    },
    {
      title: "Operational Insight",
      icon: BarChart,
      items: [
        { name: "People count in factory Premises", page: "people-count" },
      ],
    },
    { title: "Reports", icon: Description, page: "reports" },
    { title: "Alerts", icon: Warning, page: "alerts" },
    { title: "Settings", icon: Settings, page: "settings" },
    { title: "Live Streaming", icon: VideoCall, page: "live-streaming" },
    // { title: "Welcome", icon: PeopleAlt, page: "welcome" },
  ];

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLElement>,
    item: MenuCategory
  ) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    setHoveredItem(item.title);

    if (item.items && item.items.length > 0) {
      setAnchorEl(event.currentTarget);
      setHoverMenu(item);
      setPopoverOpen(true);
    } else {
      // Close popover if hovering over item without children
      setPopoverOpen(false);
      setHoverMenu(null);
      setAnchorEl(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    // Don't close popover immediately - let it stay open
  };

  const handlePopoverMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handlePopoverMouseLeave = () => {
    setPopoverOpen(false);
    setAnchorEl(null);
    setHoverMenu(null);
  };

  const handleMenuItemClick = (item: MenuCategory) => {
    if (item.page) {
      onPageChange(item.page);
      setPopoverOpen(false);
      setAnchorEl(null);
      setHoverMenu(null);
    }
  };

  const handleSubMenuClick = (page: PageType) => {
    onPageChange(page);
    setPopoverOpen(false);
    setAnchorEl(null);
    setHoverMenu(null);
  };

  // Check if current page is in any submenu
  const isParentSelected = (item: MenuCategory) => {
    if (item.page === currentPage) return true;
    if (item.items) {
      return item.items.some((subItem) => subItem.page === currentPage);
    }
    return false;
  };

  const getButtonStyles = (item: MenuCategory) => {
    const isSelected = isParentSelected(item);
    const isHovered = hoveredItem === item.title;

    return {
      borderRadius: 1,
      minHeight: 48,
      justifyContent: "center",
      mx: 1,
      backgroundColor: isSelected
        ? theme.palette.primary.main
        : isHovered
        ? theme.palette.action.hover
        : "transparent",
      color: isSelected ? "white" : "inherit",
      "&:hover": {
        backgroundColor: isSelected
          ? theme.palette.primary.dark
          : theme.palette.action.hover,
      },
      transition: "background-color 0.2s ease-in-out",
    };
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
          {/* Menu Items */}
          <List sx={{ flex: 1, pt: 2 }}>
            {analyticsMenuItems.map((item) => (
              <ListItem
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
                      color: isParentSelected(item)
                        ? "white"
                        : theme.palette.action.active,
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
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
          >
            {hoverMenu?.title}
          </Typography>
          <List sx={{ py: 0 }}>
            {hoverMenu?.items?.map((subItem) => (
              <ListItem key={subItem.name} disablePadding>
                <ListItemButton
                  selected={currentPage === subItem.page}
                  onClick={() => handleSubMenuClick(subItem.page)}
                  sx={{
                    px: 2,
                    py: 1.5,
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.main,
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
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      lineHeight: 1.4,
                      fontWeight: currentPage === subItem.page ? 500 : 400,
                    }}
                  />
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
