"use client";

import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  //  if (typeof window === "undefined") return null;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
