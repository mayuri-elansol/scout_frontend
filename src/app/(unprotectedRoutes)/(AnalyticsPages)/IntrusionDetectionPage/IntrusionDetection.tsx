// import React from "react";
// import { ReportTable } from "@/app/components/organisms";
// import {
//   Box,
//   Grid,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   useTheme,
// } from "@mui/material";
// import {
//   Visibility,
//   Warning,
//   Shield,
//   People,
//   Place,
//   Error,
//   CameraAlt,
//   Circle,
// } from "@mui/icons-material";

// import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";

// const IntrusionDetection: React.FC = () => {
//   const theme = useTheme();

//   const intrusionKpiData = [
//     {
//       title: "Intrusion Attempts",
//       value: "7",
//       subtitle: "Unauthorized access attempts today",
//       trend: "+2",
//       trendColor: "#f44336",
//       color: "#f44336",
//       bgColor: "#ffebee",
//       icon: Warning,
//     },
//     {
//       title: "Zones Breached",
//       value: "3",
//       subtitle: "High-security areas compromised",
//       trend: "+1",
//       trendColor: "#d32f2f",
//       color: "#d32f2f",
//       bgColor: "#ffcdd2",
//       icon: Shield,
//     },
//     {
//       title: "Active Intruders",
//       value: "2",
//       subtitle: "Currently inside premises",
//       trend: "Active",
//       trendColor: "#f44336",
//       color: "#f44336",
//       bgColor: "#ffebee",
//       icon: People,
//     },
//     {
//       title: "Security Threat Level",
//       value: "HIGH",
//       subtitle: "Current threat assessment",
//       trend: "Critical",
//       trendColor: "#d32f2f",
//       color: "#d32f2f",
//       bgColor: "#ffcdd2",
//       icon: Error,
//     },
//     {
//       title: "Recent Entries",
//       value: "5",
//       subtitle: "Last 24 hours",
//       trend: "+1",
//       trendColor: "#ff9800",
//       color: "#ff9800",
//       bgColor: "#fff8e1",
//       icon: People,
//     },
//     {
//       title: "Perimeter Breaches",
//       value: "3",
//       subtitle: "Last hour detections",
//       trend: "+3",
//       trendColor: "#f44336",
//       color: "#f44336",
//       bgColor: "#ffebee",
//       icon: Visibility,
//     },
//     {
//       title: "Secure Zones Status",
//       value: "2/5",
//       subtitle: "Compromised zones",
//       trend: "Alert",
//       trendColor: "#ff9800",
//       color: "#ff9800",
//       bgColor: "#fff8e1",
//       icon: Place,
//     },
//   ];

//   const activeIntrusions = [
//     {
//       title: "Unauthorized person at main gate",
//       location: "Main Entrance Perimeter - Camera 1",
//       time: "15:42",
//       intruderId: "UNKNOWN-001",
//       severity: "CRITICAL",
//       status: "ACTIVE",
//       bgColor: "#ffcdd2",
//     },
//     {
//       title: "Fence breach detected",
//       location: "East Boundary - Camera 8",
//       time: "15:28",
//       intruderId: "UNKNOWN-002",
//       severity: "HIGH",
//       status: "INVESTIGATING",
//       bgColor: "#fff8e1",
//     },
//     {
//       title: "Suspicious activity near warehouse",
//       location: "Warehouse Perimeter - Camera 12",
//       time: "15:15",
//       intruderId: "UNKNOWN-003",
//       severity: "HIGH",
//       status: "RESOLVED",
//       bgColor: "#e8f5e9",
//     },
//     {
//       title: "Multiple persons at restricted zone",
//       location: "North Security Zone - Camera 15",
//       time: "14:58",
//       intruderId: "UNKNOWN-004",
//       severity: "CRITICAL",
//       status: "ESCALATED",
//       bgColor: "#f3e5f5",
//     },
//   ];

//   const securityZones = [
//     {
//       zone: "Main Entrance",
//       status: "BREACHED",
//       cameras: "4/4",
//       lastIncident: "15:42",
//       riskLevel: "Critical",
//     },
//     {
//       zone: "East Boundary",
//       status: "BREACHED",
//       cameras: "6/8",
//       lastIncident: "15:28",
//       riskLevel: "High",
//     },
//     {
//       zone: "Warehouse Perimeter",
//       status: "SECURE",
//       cameras: "8/8",
//       lastIncident: "2h ago",
//       riskLevel: "Low",
//     },
//     {
//       zone: "North Security Zone",
//       status: "COMPROMISED",
//       cameras: "3/4",
//       lastIncident: "14:58",
//       riskLevel: "Critical",
//     },
//     {
//       zone: "South Boundary",
//       status: "SECURE",
//       cameras: "5/5",
//       lastIncident: "6h ago",
//       riskLevel: "Low",
//     },
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "SECURE":
//         return "#4caf50";
//       case "BREACHED":
//         return "#f44336";
//       case "COMPROMISED":
//         return "#ff9800";
//       default:
//         return "#9e9e9e";
//     }
//   };

//   const getRiskColor = (risk: string) => {
//     switch (risk) {
//       case "Critical":
//         return "#d32f2f";
//       case "High":
//         return "#f44336";
//       case "Low":
//         return "#4caf50";
//       default:
//         return "#9e9e9e";
//     }
//   };

//   const getProgressWidth = (status: string) => {
//     switch (status) {
//       case "SECURE":
//         return "100%";
//       case "BREACHED":
//         return "25%";
//       case "COMPROMISED":
//         return "60%";
//       default:
//         return "50%";
//     }
//   };

//   return (
//     <Box>
//       {/* Page Header */}
//       <Box sx={{ mb: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
//           <Visibility sx={{ fontSize: 28, color: "#d32f2f" }} />
//           <Typography
//             variant="h4"
//             sx={{ fontWeight: "bold", color: "#1c2025" }}
//           >
//             Intrusion Detection at Premises Perimeter
//           </Typography>
//         </Box>
//         <Typography
//           variant="body1"
//           sx={{ fontSize: "16px", color: "#5c6b7d", lineHeight: 1.5, mb: 1 }}
//         >
//           Flags unauthorized access attempts at boundaries, helping protect the
//           premises from theft or harm.
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{ fontSize: "14px", color: "#666", fontStyle: "italic" }}
//         >
//           Model/Technique used: Person detection model fine tuning
//         </Typography>
//       </Box>

//       {/* KPI Cards */}
//       <Box sx={{ mb: 4 }}>
//         {/* First Row - 4 Cards */}
//         <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
//           {intrusionKpiData.slice(0, 4).map((kpi, index) => (
//             <Grid key={index} size={{ xs: 12, sm: 12, md: 3 }}>
//               <KpiCard {...kpi} />
//             </Grid>
//           ))}
//         </Grid>

//         {/* Second Row - 3 Cards */}
//         <Grid container spacing={2.5}>
//           {intrusionKpiData.slice(4).map((kpi, index) => (
//             <Grid key={index + 4} size={{ xs: 12, sm: 6, md: 3 }}>
//               <KpiCard {...kpi} />
//             </Grid>
//           ))}
//           {/* Empty grid item to maintain alignment */}
//           <Grid size={{ xs: 12, sm: 6, md: 3 }} />
//         </Grid>
//       </Box>

//       {/* Content Grid */}
//       <Grid container spacing={3}>
//         {/* Active Intrusion Alerts */}
//         <Grid size={{ xs: 12, lg: 8 }}>
//           <Card>
//             <CardContent sx={{ p: 3 }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   mb: 2.5,
//                 }}
//               >
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Warning sx={{ fontSize: 20, color: "#f44336" }} />
//                   <Typography
//                     variant="h6"
//                     sx={{ fontWeight: 600, color: "#1c2025" }}
//                   >
//                     Active Intrusion Alerts
//                   </Typography>
//                 </Box>
//                 <Button
//                   variant="outlined"
//                   startIcon={<Visibility />}
//                   sx={{
//                     color: "#1976d2",
//                     borderColor: "#1976d2",
//                     fontSize: "14px",
//                     textTransform: "none",
//                   }}
//                 >
//                   View All
//                 </Button>
//               </Box>

//               <Grid
//                 container
//                 spacing={2}
//                 alignItems="stretch" 
//               >
//                 {activeIntrusions.map((intrusion, index) => (
//                   <Grid
//                     size={{ xs: 12, md: 6 }}
//                     key={index}
//                     sx={{ display: "flex" }} 
//                   >
//                     <Card
//                       sx={{
//                         backgroundColor: intrusion.bgColor,
//                         border: "1px solid #ddd",
//                         borderRadius: 1,
//                         flex: 1, 
//                         display: "flex", 
//                         flexDirection: "column", 
//                       }}
//                     >
//                       <CardContent
//                         sx={{
//                           p: 2,
//                           flex: 1, 
//                           display: "flex",
//                           flexDirection: "column", 
//                         }}
//                       >
//                         {/* Top Section */}
//                         <Box
//                           sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "flex-start",
//                             mb: 1.5,
//                           }}
//                         >
//                           <Box>
//                             <Typography
//                               sx={{
//                                 fontSize: "16px",
//                                 fontWeight: 600,
//                                 color: "#1c2025",
//                                 mb: 0.5,
//                               }}
//                             >
//                               {intrusion.title}
//                             </Typography>
//                             <Typography
//                               sx={{
//                                 fontSize: "14px",
//                                 color: "#5c6b7d",
//                                 mb: 0.25,
//                               }}
//                             >
//                               {intrusion.location} • {intrusion.time}
//                             </Typography>
//                             <Typography
//                               sx={{ fontSize: "14px", color: "#5c6b7d" }}
//                             >
//                               Intruder ID: {intrusion.intruderId}
//                             </Typography>
//                           </Box>

//                           {/* Severity + Status */}
//                           <Box
//                             sx={{
//                               display: "flex",
//                               flexDirection: "column",
//                               gap: 0.5,
//                               alignItems: "flex-end",
//                             }}
//                           >
//                             <Typography
//                               sx={{
//                                 backgroundColor:
//                                   intrusion.severity === "CRITICAL"
//                                     ? "#d32f2f"
//                                     : "#f44336",
//                                 color: "white",
//                                 px: 1,
//                                 py: 0.5,
//                                 borderRadius: 0.5,
//                                 fontSize: "11px",
//                                 fontWeight: 600,
//                               }}
//                             >
//                               {intrusion.severity}
//                             </Typography>
//                             <Typography
//                               sx={{
//                                 backgroundColor:
//                                   intrusion.status === "ACTIVE"
//                                     ? "#f44336"
//                                     : intrusion.status === "INVESTIGATING"
//                                     ? "#ff9800"
//                                     : intrusion.status === "RESOLVED"
//                                     ? "#4caf50"
//                                     : "#9c27b0",
//                                 color: "white",
//                                 px: 1,
//                                 py: 0.5,
//                                 borderRadius: 0.5,
//                                 fontSize: "11px",
//                                 fontWeight: 600,
//                               }}
//                             >
//                               {intrusion.status}
//                             </Typography>
//                           </Box>
//                         </Box>

//                         {/* Evidence Placeholder */}
//                         <Box
//                           sx={{
//                             width: "100%",
//                             height: 120,
//                             backgroundColor: "#e9ecef",
//                             borderRadius: 0.75,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             mb: 1.5,
//                             border: "1px solid #dee2e6",
//                           }}
//                         >
//                           <Box sx={{ textAlign: "center", color: "#6c757d" }}>
//                             <CameraAlt sx={{ fontSize: 24, mb: 0.5 }} />
//                             <Typography sx={{ fontSize: "12px" }}>
//                               Intrusion Evidence
//                             </Typography>
//                           </Box>
//                         </Box>

//                         {/* Action Buttons */}
//                         <Box
//                           sx={{
//                             display: "flex",
//                             gap: 1,
//                             mt: "auto", 
//                           }}
//                         >
//                           <Button
//                             variant="contained"
//                             sx={{
//                               flex: 1,
//                               backgroundColor: "#f44336",
//                               fontSize: "14px",
//                               textTransform: "none",
//                             }}
//                           >
//                             Alert Security
//                           </Button>
//                           <Button
//                             variant="outlined"
//                             sx={{
//                               flex: 1,
//                               color: "#1976d2",
//                               borderColor: "#1976d2",
//                               fontSize: "14px",
//                               textTransform: "none",
//                             }}
//                           >
//                             View Details
//                           </Button>
//                         </Box>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Security Zones Status */}
//         {/* item xs={12} lg={4} */}
//         <Grid size={{ xs: 12, lg: 4 }}>
//           <Card sx={{ height: "100%" }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: 600, color: "#1c2025", mb: 2.5 }}
//               >
//                 Security Zones Status
//               </Typography>

//               <Box>
//                 {securityZones.map((zone, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       py: 2,
//                       borderBottom:
//                         index < securityZones.length - 1
//                           ? "1px solid #f0f0f0"
//                           : "none",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         mb: 1,
//                       }}
//                     >
//                       <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
//                         {zone.zone}
//                       </Typography>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       >
//                         <Circle
//                           sx={{
//                             fontSize: 8,
//                             color: getStatusColor(zone.status),
//                           }}
//                         />
//                         <Typography
//                           sx={{
//                             fontSize: "12px",
//                             fontWeight: 500,
//                             color: getStatusColor(zone.status),
//                           }}
//                         >
//                           {zone.status}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         fontSize: "12px",
//                         color: "#5c6b7d",
//                         mb: 0.5,
//                       }}
//                     >
//                       <span>{zone.cameras} cameras active</span>
//                       <span>Last incident: {zone.lastIncident}</span>
//                     </Box>

//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         fontSize: "12px",
//                       }}
//                     >
//                       <span style={{ color: "#5c6b7d" }}>Risk Level:</span>
//                       <span
//                         style={{
//                           color: getRiskColor(zone.riskLevel),
//                           fontWeight: 500,
//                         }}
//                       >
//                         {zone.riskLevel}
//                       </span>
//                     </Box>

//                     {/* Progress Bar */}
//                     <Box
//                       sx={{
//                         width: "100%",
//                         height: 4,
//                         backgroundColor: "#f0f0f0",
//                         borderRadius: 0.25,
//                         mt: 1,
//                         overflow: "hidden",
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           width: getProgressWidth(zone.status),
//                           height: "100%",
//                           backgroundColor: getStatusColor(zone.status),
//                           borderRadius: 0.25,
//                           transition: "width 0.3s ease",
//                         }}
//                       />
//                     </Box>
//                   </Box>
//                 ))}
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Security Intrusion Report */}
//       <ReportTable
//         title="Security Intrusion Report"
//         columns={[
//           { id: "incidentId", label: "Incident ID", minWidth: 120 },
//           { id: "timestamp", label: "Timestamp", minWidth: 80 },
//           { id: "location", label: "Location", minWidth: 150 },
//           { id: "intruderId", label: "Intruder ID", minWidth: 120 },
//           { id: "breachType", label: "Breach Type", minWidth: 150 },
//           { id: "severity", label: "Severity", minWidth: 100 },
//           { id: "status", label: "Status", minWidth: 100 },
//           { id: "priority", label: "Priority", minWidth: 80 },
//           { id: "resolution", label: "Response Action", minWidth: 150 },
//         ]}
//         data={[
//           {
//             incidentId: "INT-7892",
//             timestamp: "15:42",
//             location: "Main Gate Perimeter",
//             intruderId: "UNKNOWN-001",
//             breachType: "Unauthorized Entry Attempt",
//             severity: "Critical",
//             status: "BREACH",
//             priority: "Critical",
//             resolution: "Security team dispatched",
//           },
//           {
//             incidentId: "INT-7891",
//             timestamp: "15:28",
//             location: "East Boundary Fence",
//             intruderId: "UNKNOWN-002",
//             breachType: "Fence Climbing",
//             severity: "High",
//             status: "INVESTIGATING",
//             priority: "High",
//             resolution: "Perimeter patrol increased",
//           },
//           {
//             incidentId: "INT-7890",
//             timestamp: "15:15",
//             location: "Warehouse Loading Dock",
//             intruderId: "UNKNOWN-003",
//             breachType: "Suspicious Vehicle",
//             severity: "Medium",
//             status: "RESOLVED",
//             priority: "High",
//             resolution: "Vehicle identified and cleared",
//           },
//           {
//             incidentId: "INT-7889",
//             timestamp: "14:58",
//             location: "North Security Zone",
//             intruderId: "UNKNOWN-004",
//             breachType: "Multiple Persons Detected",
//             severity: "Critical",
//             status: "BREACH",
//             priority: "Critical",
//             resolution: "Emergency protocol activated",
//           },
//           {
//             incidentId: "INT-7888",
//             timestamp: "14:32",
//             location: "Parking Area",
//             intruderId: "UNKNOWN-005",
//             breachType: "After Hours Activity",
//             severity: "Medium",
//             status: "PENDING",
//             priority: "Medium",
//             resolution: "Security review ongoing",
//           },
//           {
//             incidentId: "INT-7887",
//             timestamp: "14:15",
//             location: "West Gate Access",
//             intruderId: "UNKNOWN-006",
//             breachType: "Invalid Access Card",
//             severity: "High",
//             status: "RESOLVED",
//             priority: "High",
//             resolution: "Access denied, logged",
//           },
//         ]}
//         downloadFileName="security-intrusion-report.csv"
//       />
//     </Box>
//   );
// };

// export default IntrusionDetection;
import React from "react";
import { ReportTable } from "@/app/components/organisms";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
} from "@mui/material";
import {
  Visibility,
  Warning,
  Shield,
  People,
  Place,
  Error,
  CameraAlt,
  Circle,
} from "@mui/icons-material";

import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";

const IntrusionDetection: React.FC = () => {
  const theme = useTheme();

  const intrusionKpiData = [
    {
      title: "Intrusion Attempts",
      value: "7",
      subtitle: "Unauthorized access attempts today",
      trend: "+2",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: Warning,
    },
    {
      title: "Zones Breached",
      value: "3",
      subtitle: "High-security areas compromised",
      trend: "+1",
      trendColor: "#d32f2f",
      color: "#d32f2f",
      bgColor: "#ffcdd2",
      icon: Shield,
    },
    {
      title: "Active Intruders",
      value: "2",
      subtitle: "Currently inside premises",
      trend: "Active",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: People,
    },
    {
      title: "Security Threat Level",
      value: "HIGH",
      subtitle: "Current threat assessment",
      trend: "Critical",
      trendColor: "#d32f2f",
      color: "#d32f2f",
      bgColor: "#ffcdd2",
      icon: Error,
    },
    {
      title: "Recent Entries",
      value: "5",
      subtitle: "Last 24 hours",
      trend: "+1",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: People,
    },
    {
      title: "Perimeter Breaches",
      value: "3",
      subtitle: "Last hour detections",
      trend: "+3",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: Visibility,
    },
    {
      title: "Secure Zones Status",
      value: "2/5",
      subtitle: "Compromised zones",
      trend: "Alert",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: Place,
    },
  ];

  const activeIntrusions = [
    {
      title: "Unauthorized person at main gate",
      location: "Main Entrance Perimeter - Camera 1",
      time: "15:42",
      Id: "UNKNOWN-001",
      severity: "CRITICAL",
      status: "ACTIVE",
      bgColor: "#ffcdd2",
      imageUrl: "https://picsum.photos/800/400",
    },
    {
      title: "Fence breach detected",
      location: "East Boundary - Camera 8",
      time: "15:28",
      Id: "UNKNOWN-002",
      severity: "HIGH",
      status: "INVESTIGATING",
      bgColor: "#fff8e1",
      imageUrl: "https://picsum.photos/400/200?random=2",
    },
    {
      title: "Suspicious activity near warehouse",
      location: "Warehouse Perimeter - Camera 12",
      time: "15:15",
      Id: "UNKNOWN-003",
      severity: "HIGH",
      status: "RESOLVED",
      bgColor: "#e8f5e9",
      imageUrl: "https://picsum.photos/400/200?random=3",
    },
    {
      title: "Multiple persons at restricted zone",
      location: "North Security Zone - Camera 15",
      time: "14:58",
      Id: "UNKNOWN-004",
      severity: "CRITICAL",
      status: "ESCALATED",
      bgColor: "#f3e5f5",
      imageUrl: "https://picsum.photos/400/200?random=4",
    },
  ];

  const securityZones = [
    {
      zone: "Main Entrance",
      status: "BREACHED",
      cameras: "4/4",
      lastIncident: "15:42",
      riskLevel: "Critical",
    },
    {
      zone: "East Boundary",
      status: "BREACHED",
      cameras: "6/8",
      lastIncident: "15:28",
      riskLevel: "High",
    },
    {
      zone: "Warehouse Perimeter",
      status: "SECURE",
      cameras: "8/8",
      lastIncident: "2h ago",
      riskLevel: "Low",
    },
    {
      zone: "North Security Zone",
      status: "COMPROMISED",
      cameras: "3/4",
      lastIncident: "14:58",
      riskLevel: "Critical",
    },
    {
      zone: "South Boundary",
      status: "SECURE",
      cameras: "5/5",
      lastIncident: "6h ago",
      riskLevel: "Low",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SECURE":
        return "#4caf50";
      case "BREACHED":
        return "#f44336";
      case "COMPROMISED":
        return "#ff9800";
      default:
        return "#9e9e9e";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critical":
        return "#d32f2f";
      case "High":
        return "#f44336";
      case "Low":
        return "#4caf50";
      default:
        return "#9e9e9e";
    }
  };

  const getProgressWidth = (status: string) => {
    switch (status) {
      case "SECURE":
        return "100%";
      case "BREACHED":
        return "25%";
      case "COMPROMISED":
        return "60%";
      default:
        return "50%";
    }
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Visibility sx={{ fontSize: 28, color: "#d32f2f" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Intrusion Detection at Premises Perimeter
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{ fontSize: "16px", color: "#5c6b7d", lineHeight: 1.5, mb: 1 }}
        >
          Flags unauthorized access attempts at boundaries, helping protect the
          premises from theft or harm.
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: "14px", color: "#666", fontStyle: "italic" }}
        >
          Model/Technique used: Person detection model fine tuning
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2.5,
          mb: 4,
        }}
      >
        {intrusionKpiData.map((kpi, index) => (
          <Box
            key={index}
            sx={{
              flex: "1 1 220px", // Responsive flex for small screens
              minWidth: 220,
            }}
          >
            <KpiCard {...kpi} />
          </Box>
        ))}
      </Box>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Active Intrusion Alerts */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <RecentViolations
            label=" Intrusion Detection at Premises Perimeter"
            violations={activeIntrusions}
            onViewAll={() => console.log("View all clicked")}
          />
        </Grid>

        {/* Security Zones */}
        <Box
          sx={{
            flex: "1 1 300px",
            minWidth: 300,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1c2025", mb: 2.5 }}
              >
                Security Zones Status
              </Typography>

              <Box>
                {securityZones.map((zone, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 2,
                      borderBottom:
                        index < securityZones.length - 1
                          ? "1px solid #f0f0f0"
                          : "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
                        {zone.zone}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Circle
                          sx={{
                            fontSize: 8,
                            color: getStatusColor(zone.status),
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: 500,
                            color: getStatusColor(zone.status),
                          }}
                        >
                          {zone.status}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        color: "#5c6b7d",
                        mb: 0.5,
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <span>{zone.cameras} cameras active</span>
                      <span>Last incident: {zone.lastIncident}</span>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <span style={{ color: "#5c6b7d" }}>Risk Level:</span>
                      <span
                        style={{
                          color: getRiskColor(zone.riskLevel),
                          fontWeight: 500,
                        }}
                      >
                        {zone.riskLevel}
                      </span>
                    </Box>

                    {/* Progress Bar */}
                    <Box
                      sx={{
                        width: "100%",
                        height: 4,
                        backgroundColor: "#f0f0f0",
                        borderRadius: 0.25,
                        mt: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: getProgressWidth(zone.status),
                          height: "100%",
                          backgroundColor: getStatusColor(zone.status),
                          borderRadius: 0.25,
                          transition: "width 0.3s ease",
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Security Intrusion Report */}
      <ReportTable
        title="Security Intrusion Report"
        columns={[
          { id: "incidentId", label: "Incident ID", minWidth: 120 },
          { id: "timestamp", label: "Timestamp", minWidth: 80 },
          { id: "location", label: "Location", minWidth: 150 },
          { id: "intruderId", label: "Intruder ID", minWidth: 120 },
          { id: "breachType", label: "Breach Type", minWidth: 150 },
          { id: "severity", label: "Severity", minWidth: 100 },
          { id: "status", label: "Status", minWidth: 100 },
          { id: "priority", label: "Priority", minWidth: 80 },
          { id: "resolution", label: "Response Action", minWidth: 150 },
        ]}
        data={[
          {
            incidentId: "INT-7892",
            timestamp: "15:42",
            location: "Main Gate Perimeter",
            intruderId: "UNKNOWN-001",
            breachType: "Unauthorized Entry Attempt",
            severity: "Critical",
            status: "BREACH",
            priority: "Critical",
            resolution: "Security team dispatched",
          },
          {
            incidentId: "INT-7891",
            timestamp: "15:28",
            location: "East Boundary Fence",
            intruderId: "UNKNOWN-002",
            breachType: "Fence Climbing",
            severity: "High",
            status: "INVESTIGATING",
            priority: "High",
            resolution: "Perimeter patrol increased",
          },
          {
            incidentId: "INT-7890",
            timestamp: "15:15",
            location: "Warehouse Loading Dock",
            intruderId: "UNKNOWN-003",
            breachType: "Suspicious Vehicle",
            severity: "Medium",
            status: "RESOLVED",
            priority: "High",
            resolution: "Vehicle identified and cleared",
          },
          {
            incidentId: "INT-7889",
            timestamp: "14:58",
            location: "North Security Zone",
            intruderId: "UNKNOWN-004",
            breachType: "Multiple Persons Detected",
            severity: "Critical",
            status: "BREACH",
            priority: "Critical",
            resolution: "Emergency protocol activated",
          },
          {
            incidentId: "INT-7888",
            timestamp: "14:32",
            location: "Parking Area",
            intruderId: "UNKNOWN-005",
            breachType: "After Hours Activity",
            severity: "Medium",
            status: "PENDING",
            priority: "Medium",
            resolution: "Security review ongoing",
          },
          {
            incidentId: "INT-7887",
            timestamp: "14:15",
            location: "West Gate Access",
            intruderId: "UNKNOWN-006",
            breachType: "Invalid Access Card",
            severity: "High",
            status: "RESOLVED",
            priority: "High",
            resolution: "Access denied, logged",
          },
        ]}
        filters={[
          { id: "intruderId", label: "Intruder ID", type: "text" },
          {
            id: "breachType",
            label: "Breach Type",
            type: "select",
            options: [
              "Unauthorized Entry Attempt",
              "Fence Climbing",
              "Suspicious Vehicle",
              "Multiple Persons Detected",
              "After Hours Activity",
              "Invalid Access Card",
            ],
          },
          {
            id: "severity",
            label: "Severity",
            type: "select",
            options: ["Critical", "High", "Medium"],
          },
          {
            id: "status",
            label: "Status",
            type: "select",
            options: ["BREACH", "INVESTIGATING", "RESOLVED", "PENDING"],
          },
          {
            id: "priority",
            label: "Priority",
            type: "select",
            options: ["Critical", "High", "Medium"],
          },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
        ]}
        // onSubmit={handleSubmitFilter}
        // onReset={handleReset}
        // onExport={handleExport}
        // isSubmitDisabled={loading}
        downloadFileName="security-intrusion-report"
      />
    </Box>
  );
};

export default IntrusionDetection;
