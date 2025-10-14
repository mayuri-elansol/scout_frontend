
"use client";

import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function ConfiguratorPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 80px)", // adjusts based on header height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* IFRAME CONTAINER */}
      <iframe
        src="https://your-system-configurator-url.com" 
        title="System Configurator"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "8px",
        }}
        loading="lazy"
      />

      {/* Optional loading fallback */}
      <CircularProgress
        sx={{
          position: "absolute",
          color: "#1976d2",
        }}
      />
    </Box>
  );
}


// "use client";
// import { Button, Box, Typography } from "@mui/material";
// import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

// export default function ConfiguratorPage() {
//   const handleOpenConfigurator = () => {
//     // Replace this with the actual Configurator system link
//     window.open("http://localhost:8085", "_blank");
//   };

//   return (
//     <Box
//       sx={{
//         height: "calc(100vh - 63px)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#f5f7fa",
//       }}
//     >
//       <SettingsSuggestIcon sx={{ fontSize: 80, color: "#1976d2", mb: 2 }} />
//       <Typography variant="h5" gutterBottom>
//         System Configurator
//       </Typography>
//       <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//         Click the button below to start the Configurator system.
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         size="large"
//         onClick={handleOpenConfigurator}
//         sx={{
//           borderRadius: "12px",
//           textTransform: "none",
//           px: 4,
//           py: 1.5,
//           fontSize: "1rem",
//           fontWeight: 500,
//         }}
//       >
//         Start Configurator
//       </Button>
//     </Box>
//   );
// }
