"use client";

import React from "react";
import dynamic from 'next/dynamic';
import { Box, CircularProgress } from "@mui/material";

const LoadingComponent = () => (
  <Box
    sx={{
      width: "100%",
      minHeight: "calc(100vh - 80px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress />
  </Box>
);

const OrganizationCameraManagement = dynamic(
  () => import("@/app/components/organisms/configurator/camera-management/OrganizationCameraManagement"),
  { 
    ssr: false,
    loading: LoadingComponent
  }
);

const CameraManagement: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <OrganizationCameraManagement />
    </Box>
  );
};

export default CameraManagement;
