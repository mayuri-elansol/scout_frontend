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
} from "@mui/material";
import { Circle, ExitToApp, Shield } from "@mui/icons-material";
import { useAuth } from "../../../../customhooks/useAuth";

const Header: React.FC = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [currentDateTime, setCurrentDateTime] = useState<string>("");

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

    updateTime(); // set immediately
    const interval = setInterval(updateTime, 1000); // update every second
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
              borderRadius: 1,
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Circle
              sx={{
                fontSize: 12,
                color: theme.palette.success.main,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#5c6b7d",
                fontSize: "14px",
              }}
            >
              System Health
            </Typography>
          </Box>

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
