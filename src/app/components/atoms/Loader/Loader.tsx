"use client";

import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
   sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "10%" 
        
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
