// components/RouteLoader.tsx
"use client";

import { CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function RouteLoader() {
  const loading = useSelector(
    (state: RootState) => state.routeLoader.loading
  );

  if (!loading) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.6)",
        zIndex: 1300,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
