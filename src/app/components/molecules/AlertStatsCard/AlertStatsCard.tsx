// import React from "react";
// import { Paper, Typography } from "@mui/material";

// interface AlertStatsCardProps {
//   value: string;
//   label: string;
// }

// const AlertStatsCard: React.FC<AlertStatsCardProps> = ({ value, label }) => {
//   const getSizeStyles = () => {
//     const numbericvalue = Number(value);

//     if (numbericvalue === 0) {
//       return {
//         trendColor: "#4caf50",
//         color: "#4caf50",
//         bgColor: "#e8f5e9",
//         borderColor: "#4caf50",
//         padding: 1.5,
//         fontSize: "32px",
//         minHeight: "120px",
//         labelSize: "14px",
//       };
//     } else if (numbericvalue > 0) {
//       return {
//         trendColor: "#f44336",
//         color: "#f44336",
//         bgColor: "#ffebee",
//         borderColor: "#f44336",
//         padding: 1.5,
//         fontSize: "32px",
//         minHeight: "120px",
//         labelSize: "14px",
//       };
//     }

//     return {
//       trendColor: "#2196f3",
//       color: "#2196f3",
//       bgColor: "#e3f2fd",
//       borderColor: "#2196f3",
//       padding: 2,
//       fontSize: "24px",
//       minHeight: "80px",
//       labelSize: "12px",
//     };
//   };

//   const sizeStyles = getSizeStyles();

//   return (
//     <Paper
//       sx={{
//         p: sizeStyles.padding,
//         textAlign: "center",
//         border: `1px solid ${sizeStyles.borderColor}40`,
//         borderRadius: 2,
//         backgroundColor: sizeStyles.bgColor,
//         display: "flex",
//         flex: 1,
//         minHeight: sizeStyles.minHeight,
//         flexDirection: "column",
//         justifyContent: "center",
//         transition: "all 0.3s ease",
//         "&:hover": {
//           boxShadow: "0 4px 16px rgba(0,0,0,0.15)",

//           borderColor: sizeStyles.borderColor,
//           transform: "translateY(-1px)",
//         },
//       }}
//     >
//       <Typography
//         sx={{
//           bgcolor: sizeStyles.bgColor,
//           fontSize: sizeStyles.fontSize,
//           fontWeight: "bold",
//           color: sizeStyles.color,
//           mb: 0.5,
//           lineHeight: 1,
//         }}
//       >
//         {value}
//       </Typography>
//       <Typography
//         sx={{
//           fontSize: sizeStyles.labelSize,
//           color: "#666",
//           fontWeight: 500,
//         }}
//       >
//         {label}
//       </Typography>
//     </Paper>
//   );
// };

// export default AlertStatsCard;
// export type { AlertStatsCardProps };

import React from "react";
import { Paper, Typography } from "@mui/material";
import styles from "./AlertStatsCard.module.css";

interface AlertStatsCardProps {
  value: string;
  label: string;
}

const AlertStatsCard: React.FC<AlertStatsCardProps> = ({ value, label }) => {
  const getSizeStyles = () => {
    const numbericvalue = Number(value);

    if (numbericvalue === 0) {
      return {
        trendColor: "#4caf50",
        color: "#4caf50",
        bgColor: "#e8f5e9",
        borderColor: "#4caf50",
        padding: "12px",
        fontSize: "32px",
        minHeight: "120px",
        labelSize: "14px",
      };
    } else if (numbericvalue > 0) {
      return {
        trendColor: "#f44336",
        color: "#f44336",
        bgColor: "#ffebee",
        borderColor: "#f44336",
        padding: "12px",
        fontSize: "32px",
        minHeight: "120px",
        labelSize: "14px",
      };
    }

    return {
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      padding: "16px",
      fontSize: "24px",
      minHeight: "80px",
      labelSize: "12px",
    };
  };

  const sizeStyles = getSizeStyles();

  return (
    <Paper
      className={styles.card}
      style={{
        padding: sizeStyles.padding,
        border: `1px solid ${sizeStyles.borderColor}40`,
        backgroundColor: sizeStyles.bgColor,
        minHeight: sizeStyles.minHeight,
      }}
    >
      <Typography
        className={styles.value}
        style={{
          backgroundColor: sizeStyles.bgColor,
          fontSize: sizeStyles.fontSize,
          color: sizeStyles.color,
        }}
      >
        {value}
      </Typography>
      <Typography
        className={styles.label}
        style={{
          fontSize: sizeStyles.labelSize,
        }}
      >
        {label}
      </Typography>
    </Paper>
  );
};

export default AlertStatsCard;
export type { AlertStatsCardProps };
