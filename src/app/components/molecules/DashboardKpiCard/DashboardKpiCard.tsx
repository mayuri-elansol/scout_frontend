// "use client";

// import React from "react";
// import { Card, CardContent, Box, Typography, Tooltip } from "@mui/material";
// import { SvgIconComponent } from "@mui/icons-material";
// import { useRouter } from "next/navigation";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// interface DashboardKpiCardProps {
//   title: string;
//   violationsCount: number;
//   lastDetection: string;
//   lastDetectionTime: string;
//   route?: string;
//   icon: SvgIconComponent;
//   tooltipMessage?: string;

// }

// const DashboardKpiCard: React.FC<DashboardKpiCardProps> = ({
//   title,
//   violationsCount,
//   lastDetection,
//   lastDetectionTime,
//   icon: IconComponent,
//   route,
//   tooltipMessage,
// }) => {
//   const router = useRouter();

//   const getVariantStyles = () => {
//     const numericValue = Number(violationsCount);

//     if (!isNaN(numericValue)) {
//       if (numericValue === 0) {
//         return {
//           color: "#4caf50",
//           bgColor: "#e8f5e9",
//           borderColor: "#4caf50",
//           iconBg: "#c8e6c9",
//         };
//       } else if (numericValue > 0) {
//         return {
//           color: "#f44336",
//           bgColor: "#ffebee",
//           borderColor: "#f44336",
//           iconBg: "#ffcdd2",
//         };
//       }
//     }
//     return {
//       color: "#2196f3",
//       bgColor: "#e3f2fd",
//       borderColor: "#2196f3",
//       iconBg: "#bbdefb",
//     };
//   };

//   const variantStyles = getVariantStyles();

//   return (
//     <Card
//       onClick={() => {
//         if (route) {
//           router.push(route);
//         }
//       }}
//       sx={{
//         backgroundColor: variantStyles.bgColor,
//         border: `1px solid ${variantStyles.borderColor}40`,
//         borderRadius: 2,
//         boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
//         transition: "all 0.3s ease",
//         height: "94%",
//         cursor: route ? "pointer" : "default",
//         position: "relative",
//         //  overflow: "hidden",
//         display: "flex",
//         "&:hover": {
//           boxShadow: route
//             ? "0 4px 16px rgba(0,0,0,0.12)"
//             : "0 2px 8px rgba(0,0,0,0.08)",
//           transform: route ? "translateY(-2px)" : "none",
//           borderColor: variantStyles.borderColor,
//         },
//       }}
//     >
//       {/* Left Section - Icon and Count */}
//       <Box
//         sx={{
//           backgroundColor: variantStyles.iconBg,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "space-around",
//           px: 1,
//           py: 2,
//           minWidth: "90px",
//         }}
//       >
//         <IconComponent
//           sx={{
//             fontSize: 28,
//             color: variantStyles.color,
//             mb: 1.5,
//           }}
//         />
//         <Typography
//           sx={{
//             fontSize: "36px",
//             fontWeight: "bold",
//             color: variantStyles.color,
//             lineHeight: 1,
//           }}
//         >
//           {violationsCount}
//         </Typography>
//       </Box>

//       {/* Right Section - Content */}
//       <CardContent
//         sx={{
//           flex: 1,
//           p: "10px !important",
//           pr: "35px !important",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           minWidth: 0,
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: "16px",
//             fontWeight: 600,
//             color: variantStyles.color,
//             mb: 0.5,
//             // lineHeight: 1.3,
//           }}
//         >
//           {title}
//         </Typography>

//         <Typography
//           sx={{
//             fontSize: "14px",
//             color: "#6b7280",
//             lineHeight: 1.5,
//             // overflow: "hidden",
//             // textOverflow: "ellipsis",
//             // whiteSpace: "nowrap",
//           }}
//         >
//           last detection location: {lastDetection}
//         </Typography>

//         <Typography
//           sx={{
//             fontSize: "14px",
//             color: "#9ca3af",
//             lineHeight: 1.5,
//             //  mt: 0.3,
//           }}
//         >
//           last detection time: {lastDetectionTime}
//         </Typography>
//       </CardContent>

//       {/* Info Icon - Top Right */}
//       {tooltipMessage && (
//         <Tooltip title={tooltipMessage} arrow placement="top">
//           <Box
//             onClick={(e) => e.stopPropagation()}
//             sx={{
//               position: "absolute",
//               top: 12,
//               right: 12,
//               width: 24,
//               height: 24,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               color: "#9ca3af",
//               transition: "color 0.2s ease",
//               "&:hover": {
//                 color: "#6b7280",
//               },
//             }}
//           >
//             <InfoOutlinedIcon sx={{ fontSize: 18 }} />
//           </Box>
//         </Tooltip>
//       )}
//     </Card>
//   );
// };

// export default DashboardKpiCard;
// export type { DashboardKpiCardProps };
"use client";

import React from "react";
import { Card, CardContent, Box, Typography, Tooltip } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface DashboardKpiCardProps {
  title: string;
  violationsCount: number;
  lastDetection: string;
  lastDetectionTime: string;
  route?: string;
  icon: SvgIconComponent;
  tooltipMessage?: string;

  // Optional custom colors
  color?: string;
  bgColor?: string;
  borderColor?: string;
  iconBg?: string;
}

const DashboardKpiCard: React.FC<DashboardKpiCardProps> = ({
  title,
  violationsCount,
  lastDetection,
  lastDetectionTime,
  icon: IconComponent,
  route,
  tooltipMessage,

  // custom optional colors
  color,
  bgColor,
  borderColor,
  iconBg,
}) => {
  const router = useRouter();

  // existing auto-color logic
  const getAutoStyles = () => {
    const numericValue = Number(violationsCount);

    if (!isNaN(numericValue)) {
      if (numericValue === 0) {
        return {
          color: "#4caf50",
          bgColor: "#e8f5e9",
          borderColor: "#4caf50",
          iconBg: "#c8e6c9",
        };
      } else if (numericValue > 0) {
        return {
          color: "#f44336",
          bgColor: "#ffebee",
          borderColor: "#f44336",
          iconBg: "#ffcdd2",
        };
      }
    }

    return {
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "#bbdefb",
    };
  };

  const auto = getAutoStyles();

  // NEW: Merge custom props with auto colors
  const variantStyles = {
    color: color || auto.color,
    bgColor: bgColor || auto.bgColor,
    borderColor: borderColor || auto.borderColor,
    iconBg: iconBg || auto.iconBg,
  };

  return (
    <Card
      onClick={() => route && router.push(route)}
      sx={{
        backgroundColor: variantStyles.bgColor,
        border: `1px solid ${variantStyles.borderColor}40`,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        height: "94%",
        cursor: route ? "pointer" : "default",
        position: "relative",
        display: "flex",
        "&:hover": {
          boxShadow: route
            ? "0 4px 16px rgba(0,0,0,0.12)"
            : "0 2px 8px rgba(0,0,0,0.08)",
          transform: route ? "translateY(-2px)" : "none",
          borderColor: variantStyles.borderColor,
        },
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          backgroundColor: variantStyles.iconBg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          px: 1,
          py: 2,
          minWidth: "90px",
        }}
      >
        <IconComponent
          sx={{
            fontSize: 28,
            color: variantStyles.color,
            mb: 1.5,
          }}
        />
        <Typography
          sx={{
            fontSize: "36px",
            fontWeight: "bold",
            color: variantStyles.color,
            lineHeight: 1,
          }}
        >
          {violationsCount}
        </Typography>
      </Box>

      {/* Right Section */}
      <CardContent
        sx={{
          flex: 1,
          p: "10px !important",
          pr: "35px !important",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: variantStyles.color,
            mb: 0.5,
          }}
        >
          {title}
        </Typography>

        <Typography sx={{ fontSize: 14, color: "#6b7280" }}>
          last detection location: {lastDetection}
        </Typography>

        <Typography sx={{ fontSize: 14, color: "#9ca3af" }}>
          last detection time: {lastDetectionTime}
        </Typography>
      </CardContent>

      {/* Tooltip icon */}
      {tooltipMessage && (
        <Tooltip title={tooltipMessage} arrow placement="top">
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#9ca3af",
              "&:hover": { color: "#6b7280" },
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>
        </Tooltip>
      )}
    </Card>
  );
};

export default DashboardKpiCard;
export type { DashboardKpiCardProps };
