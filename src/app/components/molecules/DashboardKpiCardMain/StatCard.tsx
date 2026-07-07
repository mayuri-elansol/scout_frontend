// "use client";
// import React from "react";
// import { Box, Typography } from "@mui/material";
// import { ChevronRight } from "@mui/icons-material";
// import { DASHBOARD_COLORS, MuiIcon } from "@/app/config/dashboardTheme";

// export type StatCardTone = "green" | "red" | "amber" | "blue" | "gray";

// const TONE_STYLES: Record<StatCardTone, { bg: string; color: string }> = {
//   green: { bg: DASHBOARD_COLORS.successTint, color: DASHBOARD_COLORS.success },
//   red: { bg: DASHBOARD_COLORS.errorTint, color: DASHBOARD_COLORS.error },
//   amber: { bg: DASHBOARD_COLORS.warningTint, color: DASHBOARD_COLORS.warningText },
//   blue: { bg: DASHBOARD_COLORS.primaryTint, color: DASHBOARD_COLORS.primary },
//   gray: { bg: DASHBOARD_COLORS.gray, color: DASHBOARD_COLORS.grayText },
// };

// export interface StatCardProps {
//   icon: MuiIcon;
//   tone: StatCardTone;
//   value: string | number;
//   /** Rendered smaller, right after the value (e.g. "/120" or "%"). */
//   total?: string;
//   label: string;
//   onClick?: () => void;
// }

// /** Mirrors the mockup's `.kpi-card2` — top KPI strip on the dashboard. */
// const StatCard: React.FC<StatCardProps> = ({
//   icon: Icon,
//   tone,
//   value,
//   total,
//   label,
//   onClick,
// }) => {
//   const { bg, color } = TONE_STYLES[tone];
//   const clickable = !!onClick;

//   const iconBadge = (
//     <Box
//       sx={{
//         width: 38,
//         height: 38,
//         borderRadius: "10px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         flexShrink: 0,
//         backgroundColor: bg,
//         color,
//       }}
//     >
//       <Icon sx={{ fontSize: 20 }} />
//     </Box>
//   );

//   return (
//     <Box
//       onClick={onClick}
//       sx={{
//         backgroundColor: DASHBOARD_COLORS.card,
//         border: `1px solid ${DASHBOARD_COLORS.border}`,
//         borderRadius: "12px",
//         boxShadow: "0 1px 2px rgba(0,0,0,.08), 0 1px 3px 1px rgba(0,0,0,.06)",
//         padding: "12px 14px",
//         display: "flex",
//         alignItems: "center",
//         gap: "12px",
//         cursor: clickable ? "pointer" : "default",
//         transition: "box-shadow .12s ease, transform .12s ease",
//         ...(clickable && {
//           "&:hover": {
//             boxShadow: "0 4px 10px rgba(0,0,0,.10)",
//             transform: "translateY(-1px)",
//             "& .stat-card-chevron": { color: DASHBOARD_COLORS.secondary },
//           },
//         }),
//       }}
//     >
//       {iconBadge}

//       <Box sx={{ flex: 1, minWidth: 0 }}>
//         <Typography
//           sx={{
//             fontSize: "22px",
//             fontWeight: 800,
//             letterSpacing: "-.02em",
//             lineHeight: 1,
//             color: DASHBOARD_COLORS.textPrimary,
//           }}
//         >
//           {value}
//           {total && (
//             <Typography
//               component="span"
//               sx={{
//                 fontSize: "13px",
//                 fontWeight: 600,
//                 color: DASHBOARD_COLORS.textSecondary,
//               }}
//             >
//               {total}
//             </Typography>
//           )}
//         </Typography>
//         <Typography
//           sx={{
//             fontSize: "12px",
//             color: DASHBOARD_COLORS.textSecondary,
//             fontWeight: 600,
//             mt: "3px",
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           {label}
//         </Typography>
//       </Box>

//       {clickable && (
//         <ChevronRight
//           className="stat-card-chevron"
//           sx={{
//             fontSize: 18,
//             color: "#9CA3AF",
//             flexShrink: 0,
//             transition: "color .12s ease",
//           }}
//         />
//       )}
//     </Box>
//   );
// };

// export default StatCard;
"use client";
import React from "react";
import { Box, Typography, useTheme } from "@mui/material"; // added useTheme
import { ChevronRight } from "@mui/icons-material";
import { DASHBOARD_COLORS, MuiIcon } from "@/app/config/dashboardTheme";

export type StatCardTone = "green" | "red" | "amber" | "blue" | "gray";

const TONE_STYLES: Record<StatCardTone, { bg: string; color: string }> = {
  green: { bg: DASHBOARD_COLORS.successTint, color: DASHBOARD_COLORS.success },
  red: { bg: DASHBOARD_COLORS.errorTint, color: DASHBOARD_COLORS.error },
  amber: { bg: DASHBOARD_COLORS.warningTint, color: DASHBOARD_COLORS.warningText },
  blue: { bg: DASHBOARD_COLORS.primaryTint, color: DASHBOARD_COLORS.primary },
  gray: { bg: DASHBOARD_COLORS.gray, color: DASHBOARD_COLORS.grayText },
};

export interface StatCardProps {
  icon: MuiIcon;
  tone: StatCardTone;
  value: string | number;
  total?: string;
  label: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  tone,
  value,
  total,
  label,
  onClick,
}) => {
  const theme = useTheme(); // to access breakpoints
  const { bg, color } = TONE_STYLES[tone];
  const clickable = !!onClick;

  const iconBadge = (
    <Box
      sx={{
        width: 38,
        height: 38,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        backgroundColor: bg,
        color,
        // Increase icon badge size on full‑screen (xl)
        [theme.breakpoints.up("xl")]: {
          width: 52,
          height: 52,
          borderRadius: "14px",
        },
      }}
    >
      <Icon
        sx={{
          fontSize: 20,
          [theme.breakpoints.up("xl")]: {
            fontSize: 28,
          },
        }}
      />
    </Box>
  );

  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: DASHBOARD_COLORS.card,
        border: `1px solid ${DASHBOARD_COLORS.border}`,
        borderRadius: "12px",
        boxShadow: "0 1px 2px rgba(0,0,0,.08), 0 1px 3px 1px rgba(0,0,0,.06)",
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: clickable ? "pointer" : "default",
        transition: "box-shadow .12s ease, transform .12s ease",
        ...(clickable && {
          "&:hover": {
            boxShadow: "0 4px 10px rgba(0,0,0,.10)",
            transform: "translateY(-1px)",
            "& .stat-card-chevron": { color: DASHBOARD_COLORS.secondary },
          },
        }),
        // Full‑screen overrides (xl and above)
        [theme.breakpoints.up("xl")]: {
          padding: "20px 24px",
          gap: "20px",
          borderRadius: "16px",
        },
      }}
    >
      {iconBadge}

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: 800,
            letterSpacing: "-.02em",
            lineHeight: 1,
            color: DASHBOARD_COLORS.textPrimary,
            // Larger value on full‑screen
            [theme.breakpoints.up("xl")]: {
              fontSize: "32px",
            },
          }}
        >
          {value}
          {total && (
            <Typography
              component="span"
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: DASHBOARD_COLORS.textSecondary,
                [theme.breakpoints.up("xl")]: {
                  fontSize: "18px",
                  ml: 0.5, // add a little spacing
                },
              }}
            >
              {total}
            </Typography>
          )}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: DASHBOARD_COLORS.textSecondary,
            fontWeight: 600,
            mt: "3px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            [theme.breakpoints.up("xl")]: {
              fontSize: "16px",
              mt: "6px",
            },
          }}
        >
          {label}
        </Typography>
      </Box>

      {clickable && (
        <ChevronRight
          className="stat-card-chevron"
          sx={{
            fontSize: 18,
            color: "#9CA3AF",
            flexShrink: 0,
            transition: "color .12s ease",
            [theme.breakpoints.up("xl")]: {
              fontSize: 24,
            },
          }}
        />
      )}
    </Box>
  );
};

export default StatCard;