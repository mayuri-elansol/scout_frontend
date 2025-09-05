// "use client";
// import React from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   Box,
//   Typography,
//   Button,
// } from "@mui/material";
// import { Warning, Visibility, CameraAlt } from "@mui/icons-material";
// import { ViolationCard } from "../ViolationCard/ViolationCard";

// interface Violation {
//   title: string;
//   location: string;
//   time: string;
//   Id: string;
//   severity?: "HIGH" | "MEDIUM" | "LOW" | string;
//   status?: "ACTIVE" | "RESOLVED" | string;
//   imageUrl?: string;
// }

// interface RecentViolationsProps {
//   label: string;
//   violations: Violation[];
//   onViewAll?: () => void;
// }

// export default function RecentViolations({
//   label,
//   violations,
//   onViewAll,
// }: RecentViolationsProps) {
//   return (
//     <Card>
//       <CardContent sx={{ p: 3 }}>
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mb: 2.5,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Warning sx={{ fontSize: 20, color: "#f44336" }} />
//             <Typography variant="h6" sx={{ fontWeight: 600, color: "#1c2025" }}>
//               {label}
//             </Typography>
//           </Box>
//           <Button
//             variant="outlined"
//             startIcon={<Visibility />}
//             onClick={onViewAll}
//             sx={{
//               color: "#1976d2",
//               borderColor: "#1976d2",
//               fontSize: "14px",
//               textTransform: "none",
//             }}
//           >
//             View All
//           </Button>
//         </Box>

//         {/* Violations Grid */}
//         <Grid container spacing={2}>
//           {violations.map((violation, index) => (
//             <Grid size={{ xs: 12, md: 6 }} key={index} sx={{ display: "flex" }}>
//               <ViolationCard violation={violation} />
//             </Grid>
//           ))}
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// }
//==========================================with seleton
"use client";

import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import { Warning, Visibility } from "@mui/icons-material";
import { ViolationCard } from "../ViolationCard/ViolationCard";

interface Violation {
  title: string;
  location: string;
  time: string;
  Id: string;
  severity?: "HIGH" | "MEDIUM" | "LOW" | string;
  status?: "ACTIVE" | "RESOLVED" | string;
  imageUrl?: string;
}

interface RecentViolationsProps {
  label: string;
  violations: Violation[];
  onViewAll?: () => void;
  loading?: boolean; // 👈 new prop
}

export default function RecentViolations({
  label,
  violations,
  onViewAll,
  loading = false,
}: RecentViolationsProps) {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Warning sx={{ fontSize: 20, color: "#f44336" }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1c2025" }}>
              {label}
            </Typography>
          </Box>
          {!loading && (
            <Button
              variant="outlined"
              startIcon={<Visibility />}
              onClick={onViewAll}
              sx={{
                color: "#1976d2",
                borderColor: "#1976d2",
                fontSize: "14px",
                textTransform: "none",
              }}
            >
              View All
            </Button>
          )}
        </Box>

        {/* Content */}
        {loading ? (
          <Grid container spacing={2}>
            {Array.from(new Array(2)).map((_, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Card sx={{ p: 2 }}>
                  <Skeleton variant="rectangular" height={200} sx={{ mb: 1 }} />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {violations.map((violation, index) => (
              <Grid
                size={{ xs: 12, md: 6 }}
                key={index}
                sx={{ display: "flex" }}
              >
                <ViolationCard violation={violation} />
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}
