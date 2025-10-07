// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Box,
//   Typography,
//   Skeleton,
//   IconButton,
//   Dialog,
//   DialogContent,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ReportTable from "../../../components/organisms/ReportTable/ReportTable";
// import { v4 as uuidv4 } from "uuid";
// export interface CameraZone {
//   zone: string;
//   active?: number;
//   offline?: number;
//   tempred?: number;
//   total?: number;
//   timeStamp?: string;
// }
// const cameraZonesData = [
//   {
//     zone: "Zone A",
//     active: 5,
//     offline: 1,
//     tempred: 0,
//     total: 6,
//     timeStamp: "2025-10-03 10:00:00",
//     camera: "Camera 1",
//   },
//   {
//     zone: "Zone B",
//     active: 3,
//     offline: 2,
//     tempred: 1,
//     total: 6,
//     timeStamp: "2025-10-03 10:05:00",
//     camera: "Camera 2",
//   },
//   {
//     zone: "Zone C",
//     active: 4,
//     offline: 0,
//     tempred: 2,
//     total: 6,
//     timeStamp: "2025-10-03 10:10:00",
//     camera: "Camera 3",
//   },
// ];

// interface CameraStatusProps {
//   cameraZones: CameraZone[];
//   loading?: boolean;
//   maxheight?: number;
// }

// const CameraStatus: React.FC<CameraStatusProps> = ({
//   cameraZones,
//   loading = true,
//   maxheight,
// }) => {
//   const [open, setOpen] = useState(false);

//   // Rows to render
//   const rows = loading ? Array.from(new Array(4)) : cameraZones;
//   const lastIndex = rows.length - 1;

//   return (
//     <>
//       <Card
//         sx={{
//           height: "100%",
//           maxHeight: maxheight ?? 420,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <CardContent sx={{ p: 3, flex: 1, overflowY: "auto" }}>
//           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//             <Typography
//               variant="h6"
//               sx={{ fontWeight: 600, color: "#1c2025", flex: 1 }}
//             >
//               {loading ? <Skeleton width={180} /> : "Camera Status by Zone"}
//             </Typography>
//             {!loading && (
//               <IconButton
//                 onClick={() => setOpen(true)}
//                 size="small"
//                 sx={{ color: "#5c6b7d" }}
//               >
//                 <VisibilityIcon />
//               </IconButton>
//             )}
//           </Box>

//           <Box>
//             {rows.map((zone, index) => {
//               const hasBorder = index < lastIndex;
//               return (
//                 <Box
//                   key={uuidv4() + index}
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     py: 1.5,
//                     borderBottom: hasBorder ? "1px solid #f0f0f0" : "none",
//                   }}
//                 >
//                   <Box sx={{ width: "100%" }}>
//                     {loading ? (
//                       <>
//                         <Skeleton width="40%" height={18} sx={{ mb: 0.5 }} />
//                         <Skeleton width="60%" height={14} />
//                       </>
//                     ) : (
//                       <>
//                         <Typography
//                           sx={{ fontWeight: 500, fontSize: "14px", mb: 0.5 }}
//                         >
//                           {zone.zone}
//                         </Typography>
//                         <Typography sx={{ fontSize: "14px", color: "#5c6b7d" }}>
//                           <Box
//                             component="span"
//                             sx={{ color: "#4caf50", fontWeight: 600 }}
//                           >
//                             {zone.active}/{zone.total}
//                           </Box>{" "}
//                           active •{" "}
//                           <Box
//                             component="span"
//                             sx={{ color: "#f44336", fontWeight: 600 }}
//                           >
//                             {zone.offline}/{zone.total}
//                           </Box>{" "}
//                           offline •{" "}
//                           <Box
//                             component="span"
//                             sx={{ color: "#ff9800", fontWeight: 600 }}
//                           >
//                             {zone.tempred}/{zone.total}
//                           </Box>{" "}
//                           tampered
//                         </Typography>
//                       </>
//                     )}
//                   </Box>
//                 </Box>
//               );
//             })}
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Modal / Popup */}
//       <Dialog
//         open={open}
//         onClose={() => setOpen(false)}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogContent>
//           <ReportTable
//             title="Camera Zones Details"
//             columns={[
//               //   { id: "status", label: "Status" },
//               { id: "timeStamp", label: "TimeStamp" },
//               { id: "zone", label: "Zone" },
//               { id: "camera", label: "Camera" },
//               { id: "total", label: "Total" },
//             ]}
//             data={cameraZonesData}
//             filters={[
//               { id: "timeStamp", label: "TimeStamp", type: "text" },
//               { id: "zone", label: "Zone", type: "text" },
//               { id: "camera", label: "Camera", type: "text" },
//             ]}
//             downloadFileName="camera_zones_report"
//             tooltipMessage="report table"
//           />
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default CameraStatus;
// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Box,
//   Typography,
//   Skeleton,
//   IconButton,
//   Dialog,
//   DialogContent,
//   Chip,
//   Tooltip,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import { v4 as uuidv4 } from "uuid";
// import ReportTable from "../../../components/organisms/ReportTable/ReportTable";

// export interface CameraZone {
//   zone: string;
//   active?: number;
//   offline?: number;
//   tempred?: number;
//   total?: number;
//   timeStamp?: string;
//   camera?: string;
// }

// const cameraZonesData = [
//   {
//     zone: "Zone A",
//     active: 5,
//     offline: 1,
//     tempred: 0,
//     total: 6,
//     timeStamp: "2025-10-03 10:00:00",
//     camera: "Camera 1",
//   },
//   {
//     zone: "Zone B",
//     active: 3,
//     offline: 2,
//     tempred: 1,
//     total: 6,
//     timeStamp: "2025-10-03 10:05:00",
//     camera: "Camera 2",
//   },
//   {
//     zone: "Zone C",
//     active: 4,
//     offline: 0,
//     tempred: 2,
//     total: 6,
//     timeStamp: "2025-10-03 10:10:00",
//     camera: "Camera 3",
//   },
// ];

// interface CameraStatusProps {
//   cameraZones: CameraZone[];
//   loading?: boolean;
//   maxheight?: number;
// }

// const CameraStatus: React.FC<CameraStatusProps> = ({
//   cameraZones,
//   loading = false,
//   maxheight,
// }) => {
//   const [open, setOpen] = useState(false);
//   const rows = loading ? Array.from(new Array(3)) : cameraZones;

//   return (
//     <>
//       <Card
//         sx={{
//           height: "100%",
//           maxHeight: maxheight ?? 420,
//           display: "flex",
//           flexDirection: "column",
//           borderRadius: 3,
//           boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
//         }}
//       >
//         <CardContent sx={{ p: 3, flex: 1, overflowY: "auto" }}>
//           {/* Header */}
//           <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            // <Typography
            //   variant="h6"
            //   sx={{ fontWeight: 600, color: "#1c2025", flex: 1 }}
            // >
            //   {loading ? <Skeleton width={180} /> : "Camera Status by Zone"}
            // </Typography>
//             {!loading && (
//               <Tooltip title="View Full Report">
//                 <IconButton
//                   onClick={() => setOpen(true)}
//                   size="small"
//                   sx={{ color: "#5c6b7d" }}
//                 >
//                   <VisibilityIcon />
//                 </IconButton>
//               </Tooltip>
//             )}
//           </Box>

//           {/* Zone Rows */}
//           {rows.map((zone, index) => (
//             <Box
//               key={uuidv4()}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 p: 2,
//                 mb: 1.5,
//                 borderRadius: 2,
//                 border: "1px solid #f0f0f0",
//                 backgroundColor: "#fafafa",
//                 transition: "all 0.2s",
//                 "&:hover": { backgroundColor: "#f5f5f5" },
//               }}
//             >
//               {loading ? (
//                 <Box sx={{ width: "100%" }}>
//                   <Skeleton width="40%" height={18} sx={{ mb: 1 }} />
//                   <Skeleton width="80%" height={14} />
//                 </Box>
//               ) : (
//                 <>
//                   {/* Zone Info */}
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <CameraAltIcon sx={{ color: "#1976d2" }} />
//                     <Box>
//                       <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
//                         {zone.zone}
//                       </Typography>
//                       <Typography sx={{ fontSize: "13px", color: "#6b7280" }}>
//                         {zone.camera}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* Status Boxes */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1,
//                       flexWrap: "wrap",
//                     }}
//                   >
//                     <Chip
//                       label={`Total: ${zone.total}`}
//                       size="small"
//                       sx={{
//                         backgroundColor: "#e3f2fd",
//                         color: "#1565c0",
//                         fontWeight: 600,
//                       }}
//                     />
//                     <Chip
//                       label={`Online: ${zone.active}`}
//                       size="small"
//                       sx={{
//                         backgroundColor: "#e8f5e9",
//                         color: "#2e7d32",
//                         fontWeight: 600,
//                       }}
//                     />
//                     <Chip
//                       label={`Offline: ${zone.offline}`}
//                       size="small"
//                       sx={{
//                         backgroundColor: "#ffebee",
//                         color: "#c62828",
//                         fontWeight: 600,
//                       }}
//                     />
//                     <Chip
//                       label={`Tampered: ${zone.tempred}`}
//                       size="small"
//                       sx={{
//                         backgroundColor: "#fff8e1",
//                         color: "#ef6c00",
//                         fontWeight: 600,
//                       }}
//                     />
//                   </Box>
//                 </>
//               )}
//             </Box>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Full Report Dialog */}
//       <Dialog
//         open={open}
//         onClose={() => setOpen(false)}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogContent>
//           <ReportTable
//             title="Camera Zones Details"
//             columns={[
//               { id: "timeStamp", label: "TimeStamp" },
//               { id: "zone", label: "Zone" },
//               { id: "camera", label: "Camera" },
//               { id: "total", label: "Total" },
//             ]}
//             data={cameraZonesData}
//             filters={[
//               { id: "timeStamp", label: "TimeStamp", type: "text" },
//               { id: "zone", label: "Zone", type: "text" },
//               { id: "camera", label: "Camera", type: "text" },
//             ]}
//             downloadFileName="camera_zones_report"
//             tooltipMessage="report table"
//           />
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default CameraStatus;
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Skeleton,
  IconButton,
  Dialog,
  DialogContent,
  Chip,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';import { v4 as uuidv4 } from "uuid";
import ReportTable from "../../../components/organisms/ReportTable/ReportTable";

export interface CameraZone {
  zone: string;
  active?: number;
  offline?: number;
  tempred?: number;
  total?: number;
  timeStamp?: string;
  camera?: string;
}

const cameraZonesData = [
  {
    zone: "Zone A",
    active: 5,
    offline: 1,
    tempred: 0,
    total: 6,
    timeStamp: "2025-10-03 10:00:00",
    camera: "Camera 1",
  },
  {
    zone: "Zone B",
    active: 3,
    offline: 2,
    tempred: 1,
    total: 6,
    timeStamp: "2025-10-03 10:05:00",
    camera: "Camera 2",
  },
  {
    zone: "Zone C",
    active: 4,
    offline: 0,
    tempred: 2,
    total: 6,
    timeStamp: "2025-10-03 10:10:00",
    camera: "Camera 3",
  },
];

interface CameraStatusProps {
  cameraZones: CameraZone[];
  loading?: boolean;
  maxheight?: number;
}

const CameraStatus: React.FC<CameraStatusProps> = ({
  cameraZones,
  loading = false,
  maxheight,
}) => {
  const [open, setOpen] = useState(false);
  const rows = loading ? Array.from(new Array(3)) : cameraZones;

  return (
    <>
      <Card
        sx={{
          height: "100%",
          maxHeight: maxheight ?? 420,
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent sx={{ p: 3, flex: 1, overflowY: "auto" }}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#1c2025", flex: 1 }}
            >
              {loading ? <Skeleton width={180} /> : "Camera Status by Zone"}
            </Typography>
            {!loading && (
              <Tooltip title="View Full Report">
                <IconButton
                  onClick={() => setOpen(true)}
                  size="small"
                  sx={{ color: "#5c6b7d" }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {/* Zone List */}
          {rows.map((zone, index) => (
            <Box
              key={uuidv4()}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.8,
                mb: 1.3,
                borderRadius: 2,
                border: "1px solid #f0f0f0",
                backgroundColor: "#fafafa",
                transition: "background-color 0.2s ease",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              {loading ? (
                <Box sx={{ width: "100%" }}>
                  <Skeleton width="40%" height={18} sx={{ mb: 1 }} />
                  <Skeleton width="80%" height={14} />
                </Box>
              ) : (
                <>
                  {/* Left Section: Zone Info */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <CameraEnhanceIcon sx={{ color: "#1565c0", fontSize: 22 }} />

                    <Box>
                      <Typography sx={{ fontSize: "14px", color: "#1c2025" }}>
                        {zone.zone}
                      </Typography>
                      <Typography sx={{ fontSize: "12px", color: "#6b7280" }}>
                        {zone.camera}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Right Section: Status Chips */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.8,
                      flexWrap: "wrap",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Chip
                      label={`Total: ${zone.total}`}
                      size="small"
                      sx={{
                        backgroundColor: "#e3f2fd",
                        color: "#1565c0",
                        fontWeight: 500,
                        height: 24,
                      }}
                    />
                    <Chip
                      label={`Online: ${zone.active}`}
                      size="small"
                      sx={{
                        backgroundColor: "#e8f5e9",
                        color: "#2e7d32",
                        fontWeight: 500,
                        height: 24,
                      }}
                    />
                    <Chip
                      label={`Offline: ${zone.offline}`}
                      size="small"
                      sx={{
                        backgroundColor: "#ffebee",
                        color: "#c62828",
                        fontWeight: 500,
                        height: 24,
                      }}
                    />
                    <Chip
                      label={`Tampered: ${zone.tempred}`}
                      size="small"
                      sx={{
                        backgroundColor: "#fff8e1",
                        color: "#ef6c00",
                        fontWeight: 500,
                        height: 24,
                      }}
                    />
                  </Box>
                </>
              )}
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Full Report Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <ReportTable
            title="Camera Zones Details"
            columns={[
              { id: "timeStamp", label: "TimeStamp" },
              { id: "zone", label: "Zone" },
              { id: "camera", label: "Camera" },
              { id: "total", label: "Total" },
            ]}
            data={cameraZonesData}
            filters={[
              { id: "timeStamp", label: "TimeStamp", type: "text" },
              { id: "zone", label: "Zone", type: "text" },
              { id: "camera", label: "Camera", type: "text" },
            ]}
            downloadFileName="camera_zones_report"
            tooltipMessage="report table"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CameraStatus;
