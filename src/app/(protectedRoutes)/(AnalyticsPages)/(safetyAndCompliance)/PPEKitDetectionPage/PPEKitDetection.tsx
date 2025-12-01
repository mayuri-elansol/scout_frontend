// "use client";
// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
//   useMemo,
//   startTransition,
// } from "react";
// import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
// import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
// import { Box, Grid, Paper, Typography } from "@mui/material";
// import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
// import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
// import { v4 as uuidv4 } from "uuid";
// import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
// import {
//   FilterParams,
//   KpiItem,
//   PPEKpi,
//   ZoneViolationInteface,
// } from "./PPEKitDetection.types";
// import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
// import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
// import EngineeringIcon from "@mui/icons-material/Engineering";
// import CheckroomIcon from "@mui/icons-material/Checkroom";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import {
//   useLazyGetPpeKitDetectionDetailedReportQuery,
//   useLazyGetPPEKitDetectionKpiDataQuery,
//   useLazyGetPpeKitDetectionRecentViolationsQuery,
//   useLazyGetPPEKitDetectionZoneViolationsQuery,
// } from "./PPEKitDetectionApi";
// import { ppeKpiConfig } from "./PPEKitDetectionConfig";
// import { useSocketListeners } from "@/hooks/useSocketListeners";
// import dayjs, { Dayjs } from "dayjs";
// const PPEDetection: React.FC = () => {
//   // ✅ Add deduplication ref at the top
//   const processedEvents = useRef(new Set<string>());

//   interface PPEViolation {
//     voilation: string;
//     zone: string;
//     time: string;
//     imageUrl: string;
//     cameraId: string;
//     alarmTriggered: boolean;
//     [key: string]: string | number | boolean;
//   }
//   const [dateFilter, setDateFilter] = useState<{
//     start: string;
//     end: string;
//   } | null>(null);
//   const [isLiveMode, setIsLiveMode] = useState(true);

//   const [viewPopupOpen, setViewPopupOpen] = useState(false);
//   const [viewPopupData, setViewPopupData] = useState<PPEViolation | null>(null);
//   const [fetchRecent, { data: recentApiData, isLoading: recentLoading }] =
//     useLazyGetPpeKitDetectionRecentViolationsQuery();

//   const [fetchZoneViolations, { data: zoneData, isLoading: zoneLoading }] =
//     useLazyGetPPEKitDetectionZoneViolationsQuery();
//   const [fetchKpi, { data: kpiData, isLoading }] =
//     useLazyGetPPEKitDetectionKpiDataQuery();
//   const [
//     fetchDetailedReport,
//     { data: detailedReport, isLoading: detailedReportLoading },
//   ] = useLazyGetPpeKitDetectionDetailedReportQuery();

//   // ✅ Single source of truth for KPI data
//   const [displayKpi, setDisplayKpi] = useState<KpiItem[] | null>(null);
//   const [recentViolationsLive, setRecentViolationsLive] = useState<
//     PPEViolation[]
//   >([]);

//   const [displayZoneViolations, setDisplayZoneViolations] = useState<
//     ZoneViolationInteface[]
//   >([]);
//   // ✅ Track optimistic updates with version control
//   const optimisticVersionRef = useRef<number>(0);
//   const lastSyncTimestampRef = useRef<number>(0);
//   const refetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // ✅ Sync displayKpi with fetched data only if not stale
//   useEffect(() => {
//     if (kpiData) {
//       const now = Date.now();
//       // Only update if this is a fresh fetch (not stale data)
//       if (now - lastSyncTimestampRef.current > 100) {
//         setDisplayKpi(kpiData);
//         optimisticVersionRef.current = 0; // Reset optimistic counter
//         lastSyncTimestampRef.current = now;
//         console.log("🔄 KPI data synced from backend");
//       }
//     }
//   }, [kpiData]);
//   // sync Zone data when backend value arrives
//   useEffect(() => {
//     if (zoneData) {
//       setDisplayZoneViolations(zoneData);
//       console.log("🔄 Zone violations synced from backend");
//     }
//     if (recentApiData) {
//       setRecentViolationsLive(recentApiData);
//     }
//   }, [zoneData, recentApiData]);
//   // ✅ Debounced refetch with version control
//   const scheduleRefetch = useCallback(() => {
//     if (!isLiveMode) return;
//     // Clear existing timeout
//     if (refetchTimeoutRef.current) {
//       clearTimeout(refetchTimeoutRef.current);
//     }

//     fetchKpi({ tenantId: "34769771e3da8efb" })
//       .unwrap()
//       .then((freshData) => {
//         console.log("✅ Backend sync complete:", freshData);
//         setDisplayKpi(freshData);
//         optimisticVersionRef.current = 0;
//         lastSyncTimestampRef.current = Date.now();
//       })
//       .catch((err) => {
//         console.error("❌ Refetch failed:", err);
//       });

//     // fetch Zone Violations
//     fetchZoneViolations({ tenantId: "34769771e3da8efb" })
//       .unwrap()
//       .then((zones) => {
//         setDisplayZoneViolations(zones || []);
//         console.log("✅ Backend Zone sync complete");
//       })
//       .catch((err) => console.error("❌ Zone refetch failed", err));
//     //fetch zone violations
//     fetchRecent({ tenantId: "34769771e3da8efb" })
//       .unwrap()
//       .then((res) => {
//         console.log("🔄 Recent violations synced");
//         setRecentViolationsLive(res);
//       });
//   }, [fetchKpi, fetchZoneViolations, fetchRecent, isLiveMode]);

//   //  Optimistic update handler with deduplication and batching
//   const handleNewPPEDetection = useCallback(
//     (socketData: any) => {
//       if (!isLiveMode) {
//         console.log("⛔ Skipping socket update — filtered mode active");
//         return;
//       }
//       // Create unique event ID to prevent duplicates
//       const eventId = `${socketData.data?.id || "unknown"}-${
//         socketData.serverTimestamp || Date.now()
//       }`;

//       // Skip if already processed
//       if (processedEvents.current.has(eventId)) {
//         console.log("🚫 Skipping duplicate event:", eventId);
//         return;
//       }

//       processedEvents.current.add(eventId);
//       const timestamp = socketData.serverTimestamp || Date.now();
//       console.log("📡 PPE detection received at:", timestamp, socketData);

//       // Increment version
//       optimisticVersionRef.current += 1;
//       const currentVersion = optimisticVersionRef.current;

//       // ✅ INSTANT optimistic update using functional setState with batching
//       startTransition(() => {
//         setDisplayKpi((prevKpi) => {
//           if (!prevKpi) return prevKpi;

//           console.log(
//             "⚡ Applying optimistic update (version:",
//             currentVersion,
//             ")"
//           );

//           const updated = prevKpi.map((item: KpiItem) => {
//             const violation = socketData.data;

//             // Update specific violation types
//             if (
//               item.title === "Helmet Violations" &&
//               violation.helmet === false
//             ) {
//               return { ...item, value: Number(item.value) + 1 };
//             }
//             if (item.title === "Vest Violations" && violation.vest === false) {
//               return { ...item, value: Number(item.value) + 1 };
//             }
//             if (
//               item.title === "Glasses Violations" &&
//               violation.glasses === false
//             ) {
//               return { ...item, value: Number(item.value) + 1 };
//             }
//             // Update Total Violations
//             if (item.title === "Total Violations") {
//               return { ...item, value: Number(item.value) + 1 };
//             }
//             return item;
//           });

//           return updated;
//         });
//       });

//       //=============
//       // setDisplayZoneViolations((prev) => {
//       //   const detection = socketData.data;
//       //   // If backend data not yet loaded, create a new array that contains this detection aggregated
//       //   const updated = prev ? [...prev] : [];
//       //   const zoneName = detection.zone || "Unknown Zone";
//       //   const zoneIdx = updated.findIndex((z) => z.zone === zoneName);
//       //   const helmetInc = detection.helmet === false ? 1 : 0;
//       //   const vestInc = detection.vest === false ? 1 : 0;
//       //   const glassesInc = detection.glasses === false ? 1 : 0;
//       //   const totalInc = helmetInc + vestInc + glassesInc;

//       //   if (zoneIdx === -1) {
//       //     // push new zone entry
//       //     updated.push({
//       //       zone: zoneName,
//       //       violations: totalInc,
//       //       subViolations: [
//       //         { label: "Helmet", value: helmetInc },
//       //         { label: "Vest", value: vestInc },
//       //         { label: "Glasses", value: glassesInc },
//       //       ],
//       //     });
//       //   } else {
//       //     const z = updated[zoneIdx];
//       //     z.violations += totalInc;
//       //     z.subViolations.find((s) => s.label === "Helmet")!.value += helmetInc;
//       //     z.subViolations.find((s) => s.label === "Vest")!.value += vestInc;
//       //     z.subViolations.find((s) => s.label === "Glasses")!.value +=
//       //       glassesInc;
//       //   }

//       //   // keep sorted by violations desc
//       //   updated.sort((a, b) => b.violations - a.violations);
//       //   return updated;
//       // });
//       setDisplayZoneViolations((prev) => {
//         const detection = socketData.data;
//         const updated = prev ? [...prev] : [];

//         const zoneName = detection.zone || "Unknown Zone";
//         const zoneIdx = updated.findIndex((z) => z.zone === zoneName);

//         const helmetInc = detection.helmet === false ? 1 : 0;
//         const vestInc = detection.vest === false ? 1 : 0;
//         const glassesInc = detection.glasses === false ? 1 : 0;
//         const totalInc = helmetInc + vestInc + glassesInc;

//         if (zoneIdx === -1) {
//           updated.push({
//             zone: zoneName,
//             violations: totalInc,
//             subViolations: [
//               { label: "Helmet", value: helmetInc },
//               { label: "Vest", value: vestInc },
//               { label: "Glasses", value: glassesInc },
//             ],
//           });
//         } else {
//           updated[zoneIdx] = {
//             ...updated[zoneIdx],
//             violations: updated[zoneIdx].violations + totalInc,
//             subViolations: updated[zoneIdx].subViolations.map((s) => {
//               if (s.label === "Helmet")
//                 return { ...s, value: s.value + helmetInc };
//               if (s.label === "Vest") return { ...s, value: s.value + vestInc };
//               if (s.label === "Glasses")
//                 return { ...s, value: s.value + glassesInc };
//               return s;
//             }),
//           };
//         }

//         updated.sort((a, b) => b.violations - a.violations);
//         return updated;
//       });

//       //===========
//       setRecentViolationsLive((prev) => {
//         const updated = [
//           {
//             voilation: socketData.data?.violationType,
//             zone: socketData.data?.zone,
//             time: socketData.serverTimestamp || new Date(),
//             imageUrl: socketData.data?.snapshot,
//             cameraId: socketData.data?.cameraid,
//             alarmTriggered: socketData.data?.alarmTriggered,
//           },
//           ...prev,
//         ];

//         return updated.slice(0, 20); // keep only last 20
//       });

//       //==========
//       // Cleanup old entries (keep last 100)
//       if (processedEvents.current.size > 100) {
//         const entries = Array.from(processedEvents.current);
//         processedEvents.current = new Set(entries.slice(-100));
//       }

//       // ✅ Schedule background sync
//       scheduleRefetch();
//     },
//     [scheduleRefetch]
//   );

//   //api call on the timefilter selection
//   const fetchAllWithTime = useCallback(
//     (range: { start: string; end: string }) => {
//       const payload = {
//         tenantId: "34769771e3da8efb",
//         startDate: range.start,
//         endDate: range.end,
//       };

//       fetchKpi(payload);
//       fetchZoneViolations(payload);
//       fetchRecent(payload);
//     },
//     [fetchKpi, fetchZoneViolations, fetchRecent]
//   );

//   // ✅ Setup socket listeners
//   useSocketListeners({
//     "ppe_kit_detection-INSERT": handleNewPPEDetection,
//   });

//   // ✅ Initial fetch on mount
//   useEffect(() => {
//     fetchKpi({ tenantId: "34769771e3da8efb" });
//     fetchZoneViolations({ tenantId: "34769771e3da8efb" });
//     fetchDetailedReport({
//       tenantId: "34769771e3da8efb",
//     });
//     fetchRecent({ tenantId: "34769771e3da8efb" });
//   }, [fetchKpi, fetchZoneViolations, fetchDetailedReport, fetchRecent]);

//   // ✅ Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (refetchTimeoutRef.current) {
//         clearTimeout(refetchTimeoutRef.current);
//       }
//       processedEvents.current.clear();
//     };
//   }, []);

//   const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());

//   // ✅ Memoize KPI data to prevent unnecessary re-renders
//   const ppeKpiData = useMemo(() => {
//     return (
//       displayKpi?.map((item: KpiItem) => {
//         const config =
//           ppeKpiConfig[item.title as keyof typeof ppeKpiConfig] || {};
//         return {
//           ...item,
//           icon: config.icon,
//           tooltipMessage: config.tooltipMessage,
//         };
//       }) || []
//     );
//   }, [displayKpi]);
//   const zoneViolationsForUi = useMemo(() => {
//     const iconMap: Record<string, any> = {
//       Helmet: EngineeringIcon,
//       Vest: CheckroomIcon,
//       Glasses: VisibilityOffIcon,
//     };
//     return displayZoneViolations.map((z) => ({
//       ...z,
//       subViolations: z.subViolations.map((s) => ({
//         ...s,
//         icon: iconMap[s.label] ?? undefined,
//       })),
//     }));
//   }, [displayZoneViolations]);

//   const handleSubmitFilter = async (filters: FilterParams) => {
//     console.log("filter params", filters);
//     const formatLocalDateTime = (dt: string | Dayjs | undefined): string => {
//       if (!dt) return "";
//       const parsed = typeof dt === "string" ? dayjs(dt) : dt;
//       return parsed.format("YYYY-MM-DD HH:mm:ss.SSS");
//     };

//     const body = {
//       tenantId: "34769771e3da8efb",

//       violation: filters.violation || undefined,
//       zone: filters.zone || undefined,
//       cameraId: filters.cameraId || undefined,

//       alarmTriggered:
//         filters.alarmTriggered !== undefined
//           ? filters.alarmTriggered === "True"
//           : undefined,

//       startDate: formatLocalDateTime(filters.startDate),
//       endDate: formatLocalDateTime(filters.endDate),
//     };

//     console.log("🚀 Sending payload:", body);

//     fetchDetailedReport(body);
//   };

//   const handleReset = () => {
//     console.log("reset button clicked");
//     fetchDetailedReport({
//       tenantId: "34769771e3da8efb",
//     });
//   };

//   const handleExport = (format: "csv" | "pdf") => {
//     console.log("Export requested:", format);
//   };

//   const handleDownloadSingle = () => {
//     console.log("download single row");
//   };

//   const handleViewSingle = (row: PPEViolation) => {
//     console.log("view single row", row);
//     setViewPopupData(row);
//     setViewPopupOpen(true);
//   };

//   const KpiCardLoading = isLoading;
//   const tableColumns = useMemo(
//     () => [
//       { id: "violation", label: "Violation" },
//       { id: "time", label: "Time" },
//       { id: "zone", label: "Zone" },
//       { id: "cameraId", label: "Cameras" },
//       { id: "alarmTriggered", label: "Alarm Triggered" },
//     ],
//     []
//   );

//   const tableFilters = useMemo(
//     () => [
//       {
//         id: "violation",
//         label: "Violation",
//         type: "select" as const,
//         options: [
//           "Hard hat missing",
//           "Safety vest not worn",
//           "Safety glasses missing",
//         ],
//       },
//       {
//         id: "zone",
//         label: "Zone",
//         type: "select" as const,
//         // options: Array.from(
//         //   new Set(
//         //     (detailedReport || []).map((v: { zone?: string }) => v.zone)
//         //   )
//         // ),
//         options: detailedReport?.zones || [],
//       },
//       {
//         id: "cameraId",
//         label: "Cameras",
//         type: "select" as const,

//         // options: Array.from(
//         //   new Set(
//         //     (detailedReport || []).map(
//         //       (v: { cameraId?: string }) => v.cameraId
//         //     )
//         //   )
//         // ),
//         options: detailedReport?.cameras || [],
//       },
//       {
//         id: "alarmTriggered",
//         label: "Alarm Triggered",
//         type: "select" as const,
//         options: ["True", "False"],
//       },
//       { id: "startDate", label: "Start Date", type: "date" as const },
//       { id: "endDate", label: "End Date", type: "date" as const },
//     ],
//     [detailedReport?.zones, detailedReport?.cameras]
//   );

//   return (
//     <Box>
//       {/* KPI Cards */}
//       <Paper sx={{ p: 3, mb: 0, backgroundColor: "#ffffff", borderRadius: 2 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 2,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 18 }}>
//               <Box component="span" sx={{ mr: 2 }}>
//                 📊 Overview
//               </Box>
//             </Typography>
//           </Box>

//           <TimeFilter
//             onRangeChange={(range) => {
//               if (!range.start && !range.end) {
//                 console.log("Switching back to LIVE mode");
//                 setIsLiveMode(true);

//                 fetchKpi({ tenantId: "34769771e3da8efb" });
//                 fetchZoneViolations({ tenantId: "34769771e3da8efb" });
//                 fetchRecent({ tenantId: "34769771e3da8efb" });

//                 return;
//               }

//               console.log("Custom Time Selected:", range);
//               setIsLiveMode(false);
//               setDateFilter(range);
//               fetchAllWithTime(range);
//             }}
//           />
//         </Box>
//         <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
//           {KpiCardLoading
//             ? skeletonKeys.map((index) => (
//                 <Grid
//                   size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
//                   key={uuidv4() + index}
//                 >
//                   <KpiCardSkeleton />
//                 </Grid>
//               ))
//             : ppeKpiData.map((kpi: PPEKpi, index: number) => (
//                 <Grid
//                   size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
//                   key={`${kpi.title}-${index}`}
//                 >
//                   <KpiCard {...kpi} />
//                 </Grid>
//               ))}
//         </Grid>

//         {/* Content Grid */}
//         <Grid container spacing={3}>
//           <Grid size={{ xs: 12, lg: 8 }}>
//             <RecentViolations
//               tooltipMessage="Latest 20 detected PPE violations with details."
//               label="Recent Violations"
//               violations={recentViolationsLive}
//               loading={recentLoading}
//             />
//           </Grid>

//           <Grid size={{ xs: 12, lg: 4 }}>
//             <ZoneViolations
//               violationsZone={zoneViolationsForUi}
//               loading={zoneLoading}
//               tooltipMessage="Shows PPE violations per zone"
//             />
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* PPE Violations Report */}

//       <ReportTable
//         title="Detailed Report"
//         tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
//         columns={[
//           { id: "violation", label: "Violation" },
//           { id: "time", label: "Time" },
//           { id: "zone", label: "Zone" },
//           { id: "cameraId", label: "Cameras" },
//           { id: "alarmTriggered", label: "Alarm Triggered" },
//         ]}
//         // data={detailedReport || []}
//         data={detailedReport?.data || []}
//         filters={[
//           {
//             id: "violation",
//             label: "Violation",
//             type: "select",
//             options: [
//               "Hard hat missing",
//               "Safety vest not worn",
//               "Safety glasses missing",
//             ],
//           },
//           {
//             id: "zone",
//             label: "Zone",
//             type: "select",
//             // options: Array.from(
//             //   new Set(
//             //     (detailedReport || []).map((v: { zone?: string }) => v.zone)
//             //   )
//             // ),
//             options: detailedReport?.zones || [],
//           },
//           {
//             id: "cameraId",
//             label: "Cameras",
//             type: "select",

//             // options: Array.from(
//             //   new Set(
//             //     (detailedReport || []).map(
//             //       (v: { cameraId?: string }) => v.cameraId
//             //     )
//             //   )
//             // ),
//             options: detailedReport?.cameras || [],
//           },
//           {
//             id: "alarmTriggered",
//             label: "Alarm Triggered",
//             type: "select",
//             options: ["True", "False"],
//           },
//           { id: "startDate", label: "Start Date", type: "date" },
//           { id: "endDate", label: "End Date", type: "date" },
//         ]}
//         // columns={tableColumns}
//         // filters={tableFilters}
//         onSubmit={handleSubmitFilter}
//         onReset={handleReset}
//         onExport={handleExport}
//         onDownload={handleDownloadSingle}
//         onView={handleViewSingle}
//         downloadFileName="ppe-violations-report"
//         loading={detailedReportLoading}
//       />

//       <ViewAlertPopup
//         open={viewPopupOpen}
//         handleClose={() => setViewPopupOpen(false)}
//         details={viewPopupData}
//         imageKey="imageUrl"
//         onDownload={(url) => console.log("Download:", url)}
//       />
//     </Box>
//   );
// };

// export default PPEDetection;

"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  startTransition,
} from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import {
  FilterParams,
  KpiItem,
  PPEKpi,
  ZoneViolationInteface,
} from "./PPEKitDetection.types";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  useLazyGetPpeKitDetectionDetailedReportQuery,
  useLazyGetPPEKitDetectionKpiDataQuery,
  useLazyGetPpeKitDetectionRecentViolationsQuery,
  useLazyGetPPEKitDetectionZoneViolationsQuery,
} from "./PPEKitDetectionApi";
import { ppeKpiConfig } from "./PPEKitDetectionConfig";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import dayjs, { Dayjs } from "dayjs";
const PPEDetection: React.FC = () => {
  // ✅ Add deduplication ref at the top
  const processedEvents = useRef(new Set<string>());

  interface PPEViolation {
    voilation: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;
    alarmTriggered: boolean;
    [key: string]: string | number | boolean;
  }
  const [dateFilter, setDateFilter] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [isLiveMode, setIsLiveMode] = useState(true);

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<PPEViolation | null>(null);
  const [fetchRecent, { data: recentApiData, isLoading: recentLoading }] =
    useLazyGetPpeKitDetectionRecentViolationsQuery();

  const [fetchZoneViolations, { data: zoneData, isLoading: zoneLoading }] =
    useLazyGetPPEKitDetectionZoneViolationsQuery();
  const [fetchKpi, { data: kpiData, isLoading }] =
    useLazyGetPPEKitDetectionKpiDataQuery();
  const [
    fetchDetailedReport,
    { data: detailedReport, isLoading: detailedReportLoading },
  ] = useLazyGetPpeKitDetectionDetailedReportQuery();

  // ✅ Single source of truth for KPI data
  const [displayKpi, setDisplayKpi] = useState<KpiItem[] | null>(null);
  const [recentViolationsLive, setRecentViolationsLive] = useState<
    PPEViolation[]
  >([]);

  const [displayZoneViolations, setDisplayZoneViolations] = useState<
    ZoneViolationInteface[]
  >([]);
  // ✅ Track optimistic updates with version control
  const optimisticVersionRef = useRef<number>(0);
  const lastSyncTimestampRef = useRef<number>(0);
  const refetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Sync displayKpi with fetched data only if not stale
  useEffect(() => {
    if (kpiData) {
      const now = Date.now();
      // Only update if this is a fresh fetch (not stale data)
      if (now - lastSyncTimestampRef.current > 100) {
        setDisplayKpi(kpiData);
        optimisticVersionRef.current = 0; // Reset optimistic counter
        lastSyncTimestampRef.current = now;
        console.log("🔄 KPI data synced from backend");
      }
    }
  }, [kpiData]);
  // sync Zone data when backend value arrives
  useEffect(() => {
    if (zoneData) {
      setDisplayZoneViolations(zoneData);
      console.log("🔄 Zone violations synced from backend");
    }
    if (recentApiData) {
      setRecentViolationsLive(recentApiData);
    }
  }, [zoneData, recentApiData]);
  // ✅ Debounced refetch with version control
  const scheduleRefetch = useCallback(() => {
    if (!isLiveMode) return;
    // Clear existing timeout
    if (refetchTimeoutRef.current) {
      clearTimeout(refetchTimeoutRef.current);
    }

    fetchKpi({ tenantId: "34769771e3da8efb" })
      .unwrap()
      .then((freshData) => {
        console.log("✅ Backend sync complete:", freshData);
        setDisplayKpi(freshData);
        optimisticVersionRef.current = 0;
        lastSyncTimestampRef.current = Date.now();
      })
      .catch((err) => {
        console.error("❌ Refetch failed:", err);
      });

    // fetch Zone Violations
    fetchZoneViolations({ tenantId: "34769771e3da8efb" })
      .unwrap()
      .then((zones) => {
        setDisplayZoneViolations(zones || []);
        console.log("✅ Backend Zone sync complete");
      })
      .catch((err) => console.error("❌ Zone refetch failed", err));
    //fetch zone violations
    fetchRecent({ tenantId: "34769771e3da8efb" })
      .unwrap()
      .then((res) => {
        console.log("🔄 Recent violations synced");
        setRecentViolationsLive(res);
      });
  }, [fetchKpi, fetchZoneViolations, fetchRecent, isLiveMode]);

  //  Optimistic update handler with deduplication and batching
  const handleNewPPEDetection = useCallback(
    (socketData: any) => {
      if (!isLiveMode) {
        console.log("⛔ Skipping socket update — filtered mode active");
        return;
      }
      // Create unique event ID to prevent duplicates
      const eventId = `${socketData.data?.id || "unknown"}-${
        socketData.serverTimestamp || Date.now()
      }`;

      // Skip if already processed
      if (processedEvents.current.has(eventId)) {
        console.log("🚫 Skipping duplicate event:", eventId);
        return;
      }

      processedEvents.current.add(eventId);
      const timestamp = socketData.serverTimestamp || Date.now();
      console.log("📡 PPE detection received at:", timestamp, socketData);

      // Increment version
      optimisticVersionRef.current += 1;
      const currentVersion = optimisticVersionRef.current;

      // ✅ INSTANT optimistic update using functional setState with batching
      startTransition(() => {
        setDisplayKpi((prevKpi) => {
          if (!prevKpi) return prevKpi;

          console.log(
            "⚡ Applying optimistic update (version:",
            currentVersion,
            ")"
          );

          const updated = prevKpi.map((item: KpiItem) => {
            const violation = socketData.data;

            // Update specific violation types
            if (
              item.title === "Helmet Violations" &&
              violation.helmet === false
            ) {
              return { ...item, value: Number(item.value) + 1 };
            }
            if (item.title === "Vest Violations" && violation.vest === false) {
              return { ...item, value: Number(item.value) + 1 };
            }
            if (
              item.title === "Glasses Violations" &&
              violation.glasses === false
            ) {
              return { ...item, value: Number(item.value) + 1 };
            }
            // Update Total Violations
            if (item.title === "Total Violations") {
              return { ...item, value: Number(item.value) + 1 };
            }
            return item;
          });

          return updated;
        });
      });

      //=============
      // setDisplayZoneViolations((prev) => {
      //   const detection = socketData.data;
      //   // If backend data not yet loaded, create a new array that contains this detection aggregated
      //   const updated = prev ? [...prev] : [];
      //   const zoneName = detection.zone || "Unknown Zone";
      //   const zoneIdx = updated.findIndex((z) => z.zone === zoneName);
      //   const helmetInc = detection.helmet === false ? 1 : 0;
      //   const vestInc = detection.vest === false ? 1 : 0;
      //   const glassesInc = detection.glasses === false ? 1 : 0;
      //   const totalInc = helmetInc + vestInc + glassesInc;

      //   if (zoneIdx === -1) {
      //     // push new zone entry
      //     updated.push({
      //       zone: zoneName,
      //       violations: totalInc,
      //       subViolations: [
      //         { label: "Helmet", value: helmetInc },
      //         { label: "Vest", value: vestInc },
      //         { label: "Glasses", value: glassesInc },
      //       ],
      //     });
      //   } else {
      //     const z = updated[zoneIdx];
      //     z.violations += totalInc;
      //     z.subViolations.find((s) => s.label === "Helmet")!.value += helmetInc;
      //     z.subViolations.find((s) => s.label === "Vest")!.value += vestInc;
      //     z.subViolations.find((s) => s.label === "Glasses")!.value +=
      //       glassesInc;
      //   }

      //   // keep sorted by violations desc
      //   updated.sort((a, b) => b.violations - a.violations);
      //   return updated;
      // });
      setDisplayZoneViolations((prev) => {
        const detection = socketData.data;
        const updated = prev ? [...prev] : [];

        const zoneName = detection.zone || "Unknown Zone";
        const zoneIdx = updated.findIndex((z) => z.zone === zoneName);

        const helmetInc = detection.helmet === false ? 1 : 0;
        const vestInc = detection.vest === false ? 1 : 0;
        const glassesInc = detection.glasses === false ? 1 : 0;
        const totalInc = helmetInc + vestInc + glassesInc;

        if (zoneIdx === -1) {
          updated.push({
            zone: zoneName,
            violations: totalInc,
            subViolations: [
              { label: "Helmet", value: helmetInc },
              { label: "Vest", value: vestInc },
              { label: "Glasses", value: glassesInc },
            ],
          });
        } else {
          updated[zoneIdx] = {
            ...updated[zoneIdx],
            violations: updated[zoneIdx].violations + totalInc,
            subViolations: updated[zoneIdx].subViolations.map((s) => {
              if (s.label === "Helmet")
                return { ...s, value: s.value + helmetInc };
              if (s.label === "Vest") return { ...s, value: s.value + vestInc };
              if (s.label === "Glasses")
                return { ...s, value: s.value + glassesInc };
              return s;
            }),
          };
        }

        updated.sort((a, b) => b.violations - a.violations);
        return updated;
      });

      //===========
      setRecentViolationsLive((prev) => {
        const updated = [
          {
            voilation: socketData.data?.violationType,
            zone: socketData.data?.zone,
            time: socketData.serverTimestamp || new Date(),
            imageUrl: socketData.data?.snapshot,
            cameraId: socketData.data?.cameraid,
            alarmTriggered: socketData.data?.alarmTriggered,
          },
          ...prev,
        ];

        return updated.slice(0, 20);
      });

      //==========
      // Cleanup old entries (keep last 100)
      if (processedEvents.current.size > 100) {
        const entries = Array.from(processedEvents.current);
        processedEvents.current = new Set(entries.slice(-100));
      }
      scheduleRefetch();
    },
    [scheduleRefetch]
  );

  //api call on the timefilter selection
  const fetchAllWithTime = useCallback(
    (range: { start: string; end: string }) => {
      const payload = {
        tenantId: "34769771e3da8efb",
        startDate: range.start,
        endDate: range.end,
      };

      fetchKpi(payload);
      fetchZoneViolations(payload);
      fetchRecent(payload);
    },
    [fetchKpi, fetchZoneViolations, fetchRecent]
  );

  // ✅ Setup socket listeners
  useSocketListeners({
    "ppe_kit_detection-INSERT": handleNewPPEDetection,
  });

  // ✅ Initial fetch on mount
  useEffect(() => {
    fetchKpi({ tenantId: "34769771e3da8efb" });
    fetchZoneViolations({ tenantId: "34769771e3da8efb" });
    fetchDetailedReport({
      tenantId: "34769771e3da8efb",
    });
    fetchRecent({ tenantId: "34769771e3da8efb" });
  }, [fetchKpi, fetchZoneViolations, fetchDetailedReport, fetchRecent]);

  // ✅ Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refetchTimeoutRef.current) {
        clearTimeout(refetchTimeoutRef.current);
      }
      processedEvents.current.clear();
    };
  }, []);

  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());

  //  Memoize KPI data to prevent unnecessary re-renders
  const ppeKpiData = useMemo(() => {
    return (
      displayKpi?.map((item: KpiItem) => {
        const config =
          ppeKpiConfig[item.title as keyof typeof ppeKpiConfig] || {};
        return {
          ...item,
          icon: config.icon,
          tooltipMessage: config.tooltipMessage,
        };
      }) || []
    );
  }, [displayKpi]);
  const zoneViolationsForUi = useMemo(() => {
    const iconMap: Record<string, any> = {
      Helmet: EngineeringIcon,
      Vest: CheckroomIcon,
      Glasses: VisibilityOffIcon,
    };
    return displayZoneViolations.map((z) => ({
      ...z,
      subViolations: z.subViolations.map((s) => ({
        ...s,
        icon: iconMap[s.label] ?? undefined,
      })),
    }));
  }, [displayZoneViolations]);

  const handleSubmitFilter = async (filters: FilterParams) => {
    console.log("filter params", filters);
    const formatLocalDateTime = (dt: string | Dayjs | undefined): string => {
      if (!dt) return "";
      const parsed = typeof dt === "string" ? dayjs(dt) : dt;
      return parsed.format("YYYY-MM-DD HH:mm:ss.SSS");
    };

    const body = {
      tenantId: "34769771e3da8efb",

      violation: filters.violation || undefined,
      zone: filters.zone || undefined,
      cameraId: filters.cameraId || undefined,

      alarmTriggered:
        filters.alarmTriggered !== undefined
          ? filters.alarmTriggered === "True"
          : undefined,

      startDate: formatLocalDateTime(filters.startDate),
      endDate: formatLocalDateTime(filters.endDate),
    };

    console.log("🚀 Sending payload:", body);

    fetchDetailedReport(body);
  };

  const handleReset = () => {
    console.log("reset button clicked");
    fetchDetailedReport({
      tenantId: "34769771e3da8efb",
    });
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log("Export requested:", format);
  };

  const handleDownloadSingle = () => {
    console.log("download single row");
  };

  const handleViewSingle = (row: PPEViolation) => {
    console.log("view single row", row);
    setViewPopupData(row);
    setViewPopupOpen(true);
  };

  const KpiCardLoading = isLoading;
  const tableColumns = useMemo(
    () => [
      { id: "violation", label: "Violation" },
      { id: "time", label: "Time" },
      { id: "zone", label: "Zone" },
      { id: "cameraId", label: "Cameras" },
      { id: "alarmTriggered", label: "Alarm Triggered" },
    ],
    []
  );

  const tableFilters = useMemo(
    () => [
      {
        id: "violation",
        label: "Violation",
        type: "select" as const,
        options: [
          "Hard hat missing",
          "Safety vest not worn",
          "Safety glasses missing",
        ],
      },
      {
        id: "zone",
        label: "Zone",
        type: "select" as const,
        // options: Array.from(
        //   new Set(
        //     (detailedReport || []).map((v: { zone?: string }) => v.zone)
        //   )
        // ),
        options: detailedReport?.zones || [],
      },
      {
        id: "cameraId",
        label: "Cameras",
        type: "select" as const,

        // options: Array.from(
        //   new Set(
        //     (detailedReport || []).map(
        //       (v: { cameraId?: string }) => v.cameraId
        //     )
        //   )
        // ),
        options: detailedReport?.cameras || [],
      },
      {
        id: "alarmTriggered",
        label: "Alarm Triggered",
        type: "select" as const,
        options: ["True", "False"],
      },
      { id: "startDate", label: "Start Date", type: "date" as const },
      { id: "endDate", label: "End Date", type: "date" as const },
    ],
    [detailedReport?.zones, detailedReport?.cameras]
  );

  const tableData = useMemo(() => detailedReport?.data || [], [detailedReport]);

  const memoizedHandleSubmitFilter = useCallback(
    (filters: FilterParams) => handleSubmitFilter(filters),
    [handleSubmitFilter]
  );

  const memoizedHandleReset = useCallback(() => handleReset(), [handleReset]);

  const memoizedHandleExport = useCallback(
    (format: "csv" | "pdf") => handleExport(format),
    [handleExport]
  );

  const memoizedHandleDownloadSingle = useCallback(
    () => handleDownloadSingle(),
    [handleDownloadSingle]
  );

  const memoizedHandleViewSingle = useCallback(
    (row: PPEViolation) => handleViewSingle(row),
    [handleViewSingle]
  );

  return (
    <Box>
      {/* KPI Cards */}
      <Paper sx={{ p: 3, mb: 0, backgroundColor: "#ffffff", borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 18 }}>
              <Box component="span" sx={{ mr: 2 }}>
                📊 Overview
              </Box>
            </Typography>
          </Box>

          <TimeFilter
            onRangeChange={(range) => {
              if (!range.start && !range.end) {
                console.log("Switching back to LIVE mode");
                setIsLiveMode(true);

                fetchKpi({ tenantId: "34769771e3da8efb" });
                fetchZoneViolations({ tenantId: "34769771e3da8efb" });
                fetchRecent({ tenantId: "34769771e3da8efb" });

                return;
              }

              console.log("Custom Time Selected:", range);
              setIsLiveMode(false);
              setDateFilter(range);
              fetchAllWithTime(range);
            }}
          />
        </Box>
        <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
          {KpiCardLoading
            ? skeletonKeys.map((index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                  key={uuidv4() + index}
                >
                  <KpiCardSkeleton />
                </Grid>
              ))
            : ppeKpiData.map((kpi: PPEKpi, index: number) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                  key={`${kpi.title}-${index}`}
                >
                  <KpiCard {...kpi} />
                </Grid>
              ))}
        </Grid>

        {/* Content Grid */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <RecentViolations
              tooltipMessage="Latest 20 detected PPE violations with details."
              label="Recent Violations"
              violations={recentViolationsLive}
              loading={recentLoading}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              violationsZone={zoneViolationsForUi}
              loading={zoneLoading}
              tooltipMessage="Shows PPE violations per zone"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* PPE Violations Report */}

      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
        data={tableData}
        columns={tableColumns}
        filters={tableFilters}
        onSubmit={memoizedHandleSubmitFilter}
        onReset={memoizedHandleReset}
        onExport={memoizedHandleExport}
        onDownload={memoizedHandleDownloadSingle}
        onView={(row) => memoizedHandleViewSingle(row as PPEViolation)}
        downloadFileName="ppe-violations-report"
        loading={detailedReportLoading}
      />

      <ViewAlertPopup
        open={viewPopupOpen}
        handleClose={() => setViewPopupOpen(false)}
        details={viewPopupData}
        imageKey="imageUrl"
        onDownload={(url) =>
          console.log("Download single popup ppe page:", url, viewPopupData)
        }
      />
    </Box>
  );
};

export default PPEDetection;
