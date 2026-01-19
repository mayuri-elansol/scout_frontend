"use client";
import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
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
  Popper,
} from "@mui/material";
import {
  Circle,
  ExitToApp,
  InfoOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useAuth } from "../../../../customhooks/useAuth";
import Sidebar from "../Sidebar/Sidebar";
import {
  alertMenu,
  analyticsMenu,
  dashboardMenu,
  LinkMenuItem,
} from "@/app/config/menuConfig";
import { PageType } from "@/app/types";
import { usePathname } from "next/navigation";

interface SystemHealthData {
  message: string[];
  lastChecked: string;
}

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
            key={uuidv4() + idx}
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
  const { user, isLoading, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [currentPage, setCurrentPage] = useState<PageType>(
    "safety-compliance-dashboard"
  );
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorElHealth, setAnchorElHealth] = useState<null | HTMLElement>(
    null
  );
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

  const getPageTitle = () => {
    const allMenuItems = [
      ...dashboardMenu.flatMap((category) => category.items),
      ...alertMenu,
      ...analyticsMenu.flatMap((category) => category.items),
    ];

    const currentItem = allMenuItems.find(
      (item): item is LinkMenuItem =>
        item.type === "link" &&
        item.path.toLowerCase() === pathname.toLowerCase()
    );

    return currentItem?.name ?? "Live Streaming";
  };

  useEffect(() => {
    const allMenuItems = [
      ...dashboardMenu.flatMap((category) => category.items),
      ...alertMenu,
      ...analyticsMenu.flatMap((category) => category.items),
    ];

    const currentItem = allMenuItems.find(
      (item): item is LinkMenuItem =>
        item.type === "link" &&
        item.path.toLowerCase() === pathname.toLowerCase()
    );

    setCurrentPage(
      currentItem ? currentItem.page! : "safety-compliance-dashboard"
    );
  }, [pathname]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleClose();
  };

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
          zIndex: theme.zIndex.drawer + 1,
          height: 63,
          // height: "6.6vh",

          backgroundColor: "white",
          color: "#1c2025",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          // boxShadow: "0 1px 3px rgba(0,0,0,0.1), -2px 0 3px rgba(0,0,0,0.1)",

          ml: { xs: 0, lg: "315px" },
          width: { xs: "100%", lg: "calc(100% - 316px)" },
        }}
      >
        <Toolbar sx={{ minHeight: "64px !important", px: 3 }}>
          {/* Left side: menu toggle for mobile + page title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              sx={{ display: { xs: "inline-flex", lg: "none" } }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h5"
              sx={{
                color: "#1c2025",
                // fontSize: "20px",
                pl: 1.2,
              }}
            >
              {getPageTitle()}
            </Typography>
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
                {!isLoading && user && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={handleClick} size="small">
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: "#3072b0",
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                      >
                        {user.userName?.charAt(0).toUpperCase() ?? "?"}
                      </Avatar>
                    </IconButton>
                  </Box>
                )}

                <Popper
                  open={openHealth}
                  anchorEl={anchorElHealth}
                  placement="bottom-end"
                  disablePortal={false}
                  sx={{
                    zIndex: 2000,
                    mt: 1,
                  }}
                  modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
                >
                  <Box
                    onMouseEnter={handleTooltipMouseEnter}
                    onMouseLeave={handleTooltipMouseLeave}
                  >
                    <SystemHealthTooltipContent systemHealth={systemHealth} />
                  </Box>
                </Popper>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  disableScrollLock
                  sx={{ mt: "15px" }}
                >
                  {/* User Info at top */}
                  <Box
                    sx={{ px: 2, py: 1.5, borderBottom: "1px solid #e0e0e0" }}
                  >
                    {user.userName && (
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, color: "#1c2025" }}
                      >
                        {user.userName}
                      </Typography>
                    )}
                    {user.roles?.length > 0 && (
                      <Typography
                        variant="body2"
                        sx={{ color: "#6b7280", fontWeight: 400 }}
                      >
                        Role : {user.roles.map((r) => r.roleName).join(", ")}
                      </Typography>
                    )}
                  </Box>

                  {/* Logout Button */}
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
        <Sidebar
          currentPage={"safety-compliance-dashboard"}
          onPageChange={function (page: PageType): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Drawer>
    </>
  );
};

export default Header;
