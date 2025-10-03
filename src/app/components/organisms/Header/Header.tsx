
"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  useTheme,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Drawer,
  useMediaQuery,
  Popper,

} from "@mui/material";
import {
  Circle,
  ExitToApp,
  Shield,
  InfoOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useAuth } from "../../../../customhooks/useAuth";
import Sidebar from "../Sidebar/Sidebar";
import {
  alertMenu,
  analyticsMenu,
  dashboardMenu,
} from "@/app/config/menuConfig";
import { PageType } from "@/app/types";
import { usePathname } from "next/navigation";

interface SystemHealthData {
  message: string[];
  lastChecked: string;
}

// Simple tooltip component without complex scroll handling
const SystemHealthTooltipContent: React.FC<{
  systemHealth: SystemHealthData;
}> = ({ systemHealth }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Paper
      elevation={8}
      sx={{
        minWidth: 260,
        maxWidth: 300,
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
     
      }}
    >
      <Box
        ref={scrollRef}
        sx={{
          px: 2.5,
          py: 2,
          maxHeight: 180,
          overflowY: "scroll",
          // Simple scrollbar styling
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f5f5f5",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#c0c0c0",
            borderRadius: "2px",
          },
        }}
      >
        {systemHealth.message.slice(0, 8).map((msg, idx) => (
          <Typography
            key={idx}
            variant="body2"
            sx={{
              color: "#374151",
              fontSize: "13px",
              lineHeight: 1.5,
              mb: 1,
              "&:last-child": { mb: 0 },
            }}
          >
            • {msg}
          </Typography>
        ))}
      </Box>
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          backgroundColor: "#f8f9fa",
          borderTop: "1px solid #e9ecef",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "#6b7280",
            fontSize: "11px",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <InfoOutlined sx={{ fontSize: 12 }} />
          Last updated: {systemHealth.lastChecked}
        </Typography>
      </Box>
    </Paper>
  );
};

const Header: React.FC = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  // Simple state management for health tooltip
  const [anchorElHealth, setAnchorElHealth] = useState<null | HTMLElement>(null);
  const [openHealth, setOpenHealth] = useState(false);
  const healthTimerRef = useRef<NodeJS.Timeout | null>(null);



  const handleHealthMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (healthTimerRef.current) clearTimeout(healthTimerRef.current);

    setAnchorElHealth(event.currentTarget);
    setOpenHealth(true);
  };

  const handleHealthMouseLeave = () => {
    healthTimerRef.current = setTimeout(() => {
      setOpenHealth(false);
    }, 200);
  };

  const handleTooltipMouseEnter = () => {
    if (healthTimerRef.current) {
      clearTimeout(healthTimerRef.current);
    }
  };

  const handleTooltipMouseLeave = () => {
    setOpenHealth(false);
  };

  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  const [systemHealth, setSystemHealth] = useState<SystemHealthData>({
    message: [
      "All systems operational",
      "Database running smoothly",
      "API response time normal",
      "No critical alerts",
      "Camera feeds: 24/24 online",
      "Motion detection active",
      "Storage capacity: 65%",
      "Network connectivity stable",
    ],
    lastChecked: new Date().toLocaleTimeString(),
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

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
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleClose();
  };

  // update clock every second
  useEffect(() => {
    const updateTime = () => {
      setCurrentDateTime(
        new Date().toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
      setSystemHealth((prev: SystemHealthData) => ({
        ...prev,
        lastChecked: new Date().toLocaleTimeString(),
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (healthTimerRef.current) {
        clearTimeout(healthTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: isMobile ? theme.zIndex.drawer - 1 : theme.zIndex.drawer + 1,
          height: 64,
          backgroundColor: "white",
          color: "#1c2025",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ minHeight: "64px !important", px: 3 }}>
          {/* Left side: logo + menu toggle for mobile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              sx={{ display: { xs: "inline-flex", lg: "none" } }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "#1976d2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                borderRadius: "4px",
              }}
            >
              <Shield sx={{ fontSize: 18 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#1c2025",
                  fontSize: "18px",
                  lineHeight: 1,
                }}
              >
                SCOUT
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#5c6b7d",
                  fontSize: "14px",
                  lineHeight: 1,
                  mt: 0.25,
                }}
              >
                CCTV Analytics Portal
              </Typography>
            </Box>
          </Box>

          {/* Right side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {currentDateTime && (
              <Typography
                variant="body2"
                sx={{ color: "#5c6b7d", fontSize: "14px" }}
              >
                {currentDateTime}
              </Typography>
            )}

            {/* System Health Section with hover */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "default",
                px: 1.5,
                py: 1,
                borderRadius: "6px",
              }}
              onMouseEnter={handleHealthMouseEnter}
              onMouseLeave={handleHealthMouseLeave}
            >
              <Circle
                sx={{
                  fontSize: 10,
                  color: "#4caf50",
                  filter: "drop-shadow(0 0 2px rgba(76, 175, 80, 0.3))",
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#5c6b7d", fontSize: "14px", fontWeight: 500 }}
              >
                System Health
              </Typography>
            </Box>

            {user && (
              <>
                {/* Profile Avatar (no hover events here anymore) */}
                <IconButton onClick={handleClick} size="small">
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: theme.palette.primary.main,
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {user?.username?.charAt(0).toUpperCase() ?? "?"}
                  </Avatar>
                </IconButton>

                {/* System Health Tooltip still positioned below profile */}
                <Popper
                  open={openHealth}
                  anchorEl={anchorElHealth}
                  placement="bottom-end"
                  disablePortal={false}
                  sx={{
                    zIndex: 2000, mt: 1
                  }}
                  modifiers={[
                    { name: "offset", options: { offset: [0, 8] } },
                  ]}
                >
                  <Box
                    onMouseEnter={handleTooltipMouseEnter}
                    onMouseLeave={handleTooltipMouseLeave}
                  >
                    <SystemHealthTooltipContent systemHealth={systemHealth} />
                  </Box>
                </Popper>

                {/* Profile Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  sx={{ mt: "15px" }}
                >
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>

        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Sidebar */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box" },
        }}
      >
        <Box
          sx={{
            pt: 1,
            pb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 1,
          }}
        >
          <Box
            component="img"
            src="/elansol_technologies_logo.jpg"
            alt="Elansol Logo"
            sx={{ height: 60, width: "220px" }}
            loading="lazy"
          />
        </Box>
        <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      </Drawer>
    </>
  );
};

export default Header;