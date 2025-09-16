
"use client";
import React, { useEffect, useState } from "react";
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
  Tooltip,
  Paper,
  Drawer,
  useMediaQuery,
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

const Header: React.FC = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [systemHealth, setSystemHealth] = useState<SystemHealthData>({
    message: [
      "All systems operational",
      "Database running smoothly",
      "API response time normal",
      "No critical alerts",
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
  const handleClose = () => {
    setAnchorEl(null);
  };
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
      setSystemHealth((prev) => ({
        ...prev,
        lastChecked: new Date().toLocaleTimeString(),
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Tooltip content
  const SystemHealthTooltipContent = () => (
    <Paper
      elevation={0}
      sx={{
        minWidth: 260,
        maxWidth: 300,
        p: 0,
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
      }}
    >
      <Box sx={{ px: 2.5, py: 2 }}>
        {systemHealth.message.map((msg, idx) => (
          <Typography
            key={idx}
            variant="body2"
            sx={{
              color: "#374151",
              fontSize: "13px",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            - {msg}
          </Typography>
        ))}
      </Box>
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          backgroundColor: "rgba(0, 0, 0, 0.015)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "#6b7280",
            fontSize: "11px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <InfoOutlined sx={{ fontSize: 11 }} />
          Last updated: {systemHealth.lastChecked}
        </Typography>
      </Box>
    </Paper>
  );

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

            <Tooltip
              title={<SystemHealthTooltipContent />}
              placement="bottom-end"
              arrow={false}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  px: 1.5,
                  py: 1,
                  transition: "all 0.2s ease",
                  border: "none",         
                  borderRadius: 0,        
                  boxShadow: "none",      
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.04)",
                  },
                }}
              >
                <Circle
                  sx={{
                    fontSize: 10,
                    color: theme.palette.success.main,
                    filter: "drop-shadow(0 0 2px rgba(76, 175, 80, 0.3))",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#5c6b7d",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  System Health
                </Typography>
              </Box>
            </Tooltip>

            {user && (
              <>
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
                    {user?.username
                      ? user.username.charAt(0).toUpperCase()
                      : "?"}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
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
