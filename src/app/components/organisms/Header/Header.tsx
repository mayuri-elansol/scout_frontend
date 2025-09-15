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
} from "@mui/material";
import { Circle, ExitToApp, Shield, InfoOutlined } from "@mui/icons-material";
import { useAuth } from "../../../../customhooks/useAuth";

// Define the type for system health data
interface SystemHealthData {
  message: string[];
  lastChecked: string;
}

const Header: React.FC = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [systemHealth, setSystemHealth] = useState<SystemHealthData>({
    message: [
      "All systems operational",
      "Database running smoothly",
      "API response time normal",
      "No critical alerts",
      "All systems operational",
      "Database running smoothly",
      "API response time normal",
      "No critical alerts",
    ],
    lastChecked: new Date().toLocaleTimeString(),
  });

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
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  // Tooltip content with simple list
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
      {/* Status Messages */}
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

      {/* Footer with last checked time */}
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
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        height: 64,
        backgroundColor: "white",
        color: "#1c2025",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ minHeight: "64px !important", px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          {/* Logo */}
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

        {/* Right side - Date/Time, Status and User Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {currentDateTime && (
            <Typography
              variant="body2"
              sx={{ color: "#5c6b7d", fontSize: "14px" }}
            >
              {currentDateTime}
            </Typography>
          )}

          {/* System Health with Tooltip */}
          <Tooltip
            title={<SystemHealthTooltipContent />}
            placement="bottom-end"
            arrow={false}
            enterDelay={100}
            leaveDelay={100}
            slotProps={{
              tooltip: {
                sx: {
                  backgroundColor: "transparent",
                  padding: 0,
                  maxWidth: "none",
                },
              },
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 8],
                    },
                  },
                ],
              },
            }}
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
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.04)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
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
                  letterSpacing: "0.025em",
                }}
              >
                System Health
              </Typography>
            </Box>
          </Tooltip>

          {/* User Avatar and Menu */}
          {user && (
            <>
              <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: theme.palette.primary.main,
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {user?.username ? user.username.charAt(0).toUpperCase() : "?"}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 4,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                      mt: 1.5,
                      minWidth: 150,
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
  );
};

export default Header;
