// "use client";

// import React, { useState } from "react";
// import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
// import { Box, Grid, Paper, Typography } from "@mui/material";
// import { People, Login, Logout } from "@mui/icons-material";
// import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
// import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
// import { v4 as uuidv4 } from "uuid";
// import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
// import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
// import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
// import PeopleIcon from "@mui/icons-material/People";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";

// const PeopleCount: React.FC = () => {
//   interface PeopleCountViolation {
//     voilation: string;
//     enteredCount: number;
//     exitCount: number;
//     time: string;
//     zone: string;
//     cameraId: string;
//     alarmTriggered: boolean;
//     imageUrl: string;

//     [key: string]: string | number | boolean;
//   }
//   const [viewPopupOpen, setViewPopupOpen] = useState(false);
//   const [viewPopupData, setViewPopupData] =
//     useState<PeopleCountViolation | null>(null);
//   const backendData = [
//     {
//       id: 201,
//       enteredCount: 15,
//       exitCount: 10,
//       zone: "Production Floor A",
//       snapshot: "https://picsum.photos/400/200?random=11",
//       cameraid: "CAM-11",
//       alarmTriggered: true,
//       createdAt: "2025-09-30 09:42",
//       updatedAt: "2025-09-30 09:45",
//     },
//     {
//       id: 202,
//       enteredCount: 8,
//       exitCount: 5,
//       zone: "Welding Station",
//       snapshot: "https://picsum.photos/400/200?random=12",
//       cameraid: "CAM-12",
//       alarmTriggered: false,
//       createdAt: "2025-09-30 09:28",
//       updatedAt: "2025-09-30 09:30",
//     },
//     {
//       id: 203,
//       enteredCount: 12,
//       exitCount: 11,
//       zone: "Chemical Storage",
//       snapshot: "https://picsum.photos/400/200?random=13",
//       cameraid: "CAM-13",
//       alarmTriggered: false,
//       createdAt: "2025-09-30 09:15",
//       updatedAt: "2025-09-30 09:20",
//     },
//     {
//       id: 204,
//       enteredCount: 20,
//       exitCount: 18,
//       zone: "Assembly Line B",
//       snapshot: "https://picsum.photos/400/200?random=14",
//       cameraid: "CAM-14",
//       alarmTriggered: true,
//       createdAt: "2025-09-30 08:58",
//       updatedAt: "2025-09-30 09:05",
//     },
//     {
//       id: 205,
//       enteredCount: 5,
//       exitCount: 2,
//       zone: "Maintenance Area",
//       snapshot: "https://picsum.photos/400/200?random=15",
//       cameraid: "CAM-15",
//       alarmTriggered: true,
//       createdAt: "2025-09-30 08:32",
//       updatedAt: "2025-09-30 08:40",
//     },
//   ];

//   const zonePeopleCountData = [
//     {
//       zone: "Production Floor A",

//       subViolations: [
//         { label: "entered Count", value: 3, icon: PeopleIcon },
//         { label: "exit Count", value: 2, icon: ExitToAppIcon },
//       ],
//     },
//     {
//       zone: "Welding Station",
//       subViolations: [
//         { label: "entered Count", value: 3, icon: PeopleIcon },
//         { label: "exit Count", value: 2, icon: ExitToAppIcon },
//       ],
//     },
//     {
//       zone: "Chemical Storage",
//       subViolations: [
//         { label: "entered Count", value: 3, icon: PeopleIcon },
//         { label: "exit Count", value: 2, icon: ExitToAppIcon },
//       ],
//     },
//     {
//       zone: "Assembly Line B",
//       subViolations: [
//         { label: "entered Count", value: 3, icon: PeopleIcon },
//         { label: "exit Count", value: 2, icon: ExitToAppIcon },
//       ],
//     },
//     {
//       zone: "Maintenance Area",
//       subViolations: [
//         { label: "entered Count", value: 3, icon: PeopleIcon },
//         { label: "exit Count", value: 2, icon: ExitToAppIcon },
//       ],
//     },
//   ];

//   const recentViolations = backendData.map((item) => {
//     return {
//       voilation: `People Count (Entry/Exit)`,
//       enteredCount: item.enteredCount,
//       exitCount: item.exitCount,
//       time: item.createdAt,
//       zone: item.zone,
//       cameraId: item.cameraid,
//       alarmTriggered: item.alarmTriggered,
//       imageUrl: item.snapshot,
//     };
//   });

//   const peopleCountKpiData = [
//     {
//       title: "People Inside",
//       value: "267",
//       icon: People,

//       tooltipMessage: "Current number of people present inside the area.",
//       trendColor: "#2196f3",
//       color: "#2196f3",
//       bgColor: "#e3f2fd",
//       borderColor: "#2196f3",
//       iconBg: "rgba(33, 150, 243, 0.1)",
//     },
//     {
//       title: "Entry Count",
//       value: "512",
//       icon: Login,

//       tooltipMessage: "Total number of people who entered today.",
//       trendColor: "#2196f3",
//       color: "#2196f3",
//       bgColor: "#e3f2fd",
//       borderColor: "#2196f3",
//       iconBg: "rgba(33, 150, 243, 0.1)",
//     },
//     {
//       title: "Exit Count",
//       value: "245",
//       icon: Logout,
//       tooltipMessage: "Total number of people who exited today.",
//       trendColor: "#2196f3",
//       color: "#2196f3",
//       bgColor: "#e3f2fd",
//       borderColor: "#2196f3",
//       iconBg: "rgba(33, 150, 243, 0.1)",
//     },
//   ];
//   const KpiCardLoading = false;
//   const handleViewSingle = (row: Record<string, string | number | boolean>) => {
//     const violation = row as PeopleCountViolation;
//     setViewPopupData(violation);
//     setViewPopupOpen(true);
//   };
//   const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());
//   return (
//     <Box>
//       <Paper
//         sx={{
//           p: 3,
//           mb: 4,
//           backgroundColor: "#ffffff",
//           borderRadius: 2,
//         }}
//       >
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

//           <TimeFilter onRangeChange={() => console.log("on range chnaged")} />
//         </Box>
//         {/* KPI Cards */}
//         <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
//           {KpiCardLoading
//             ? // Show skeletons while loading
//               skeletonKeys.map((index) => (
//                 <Grid
//                   size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
//                   key={uuidv4() + index}
//                 >
//                   <KpiCardSkeleton />
//                 </Grid>
//               ))
//             : // Show actual KPI cards
//               peopleCountKpiData.map((kpi, index) => (
//                 <Grid
//                   size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
//                   key={uuidv4() + index}
//                 >
//                   <KpiCard {...kpi} />
//                 </Grid>
//               ))}
//         </Grid>

//         {/* Content Grid */}
//         <Grid container spacing={3}>
//           {/* Recent  Violations */}
//           <Grid size={{ xs: 12, lg: 8 }}>
//             <RecentViolations
//               label="Recent Violations"
//               violations={recentViolations}
//               loading={false}
//               tooltipMessage="Latest 20 People Count in Factory Premises based on Entry Exit person Count with details."
//             />
//           </Grid>
//           {/*  Compliance by Zone */}

//           <Grid size={{ xs: 12, lg: 4 }}>
//             <ZoneViolations
//               violationsZone={zonePeopleCountData}
//               loading={false}
//               tooltipMessage="Shows person entry and exit count per zone"
//             />
//           </Grid>
//         </Grid>
//       </Paper>
//       {/* People Count Report */}
//       <ReportTable
//         totalCount={4}
//         page={0}
//         rowsPerPage={10}
//         title="Detailed Report"
//         columns={[
//           { id: "voilation", label: "Violation", minWidth: 200 },
//           { id: "enteredCount", label: "Entered Count", minWidth: 140 },
//           { id: "exitCount", label: "Exit Count", minWidth: 120 },
//           { id: "time", label: "Time", minWidth: 120 },
//           { id: "zone", label: "Zone", minWidth: 120 },
//           { id: "cameraId", label: "Cameras", minWidth: 120 },
//           { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
//         ]}
//         data={recentViolations}
//         filters={[
//           {
//             id: "zone",
//             label: "Zone",
//             type: "select",
//             options: Array.from(new Set(recentViolations.map((v) => v.zone))),
//           },
//           {
//             id: "cameraId",
//             label: "Cameras",
//             type: "select",
//             options: Array.from(
//               new Set(recentViolations.map((v) => v.cameraId)),
//             ),
//           },
//           {
//             id: "alarmTriggered",
//             label: "Alarm Triggered",
//             type: "select",
//             options: ["True", "False"],
//           },
//           {
//             id: "time",
//             label: "Start Date",
//             type: "date",
//           },
//           {
//             id: "time",
//             label: "End Date",
//             type: "date",
//           },
//         ]}
//         downloadFileName="people-count-report"
//         loading={false}
//         onView={handleViewSingle}
//         tooltipMessage="Detailed person entry and exit  report with filter, reset, and CSV/PDF download options."
//       />
//       {/* View Alert Popup */}

//       {viewPopupData && (
//         <ViewAlertPopup
//           open={viewPopupOpen}
//           handleClose={() => setViewPopupOpen(false)}
//           details={viewPopupData}
//           imageKey="imageUrl"
//           onDownload={(imageUrl) => console.log("Download image:", imageUrl)}
//         />
//       )}
//     </Box>
//   );
// };

// export default PeopleCount;
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { People, Login, Logout, SvgIconComponent } from "@mui/icons-material";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import {
  useGetOrgShiftTimeDataQuery,
  useGetPeopleCountDetailedCsvReportMutation,
  useGetPeopleCountDetailedPdfReportMutation,
  useGetPeopleCountSingleReportPdfMutation,
  useLazyGetPeopleCountDataQuery,
  useLazyGetPeopleCountDetailedReportQuery,
} from "./PeopleCountApi";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { useSocketEvent } from "@/customhooks/useSocketEvent";
import { SOCKET_EVENTS } from "@/sockets/socket.events";
import { Violation } from "@/app/components/molecules/ViolationCard/ViolationCard";
import { PeopleCountKpiConfig } from "./PeopleCountConfig";
import {
  KpiTitle,
  PeopleCountDetailedReportResponse,
  PeopleCountFilterParams,
  PeopleCountViolation,
  PeopleCountKpiItem,
  PeopleCountZoneViolation,
  PeopleCountSocketPayload,
  KpiColour,
} from "./PeopleCount.types";
import { formatLocalDateTime } from "@/utils/formatLocalDateTime";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const PeopleCount: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";

  /* ---------- STATE ---------- */
  const [filters, setFilters] = useState<PeopleCountFilterParams>({});
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadingRows, setDownloadingRows] = useState<Set<number>>(new Set());
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<PeopleCountViolation | null>(null);

  // Live mode flag — false when time filter range is active
  const [isLiveMode, setIsLiveMode] = useState(true);

  // Overview display state — fed by initial fetch, time filter fetch, OR socket
  const [displayKpi, setDisplayKpi] = useState<PeopleCountKpiItem[]>([]);
  const [displayZoneViolations, setDisplayZoneViolations] = useState<PeopleCountZoneViolation[]>([]);
  const [recentViolationsLive, setRecentViolationsLive] = useState<PeopleCountViolation[]>([]);

  const [detailedReport, setDetailedReport] =
    useState<PeopleCountDetailedReportResponse | null>(null);

  /* ---------- API HOOKS ---------- */
  const { data: orgShifts } = useGetOrgShiftTimeDataQuery(
    { tenantId },
    { skip: !tenantId },
  );

  // One call → gets kpi + zoneViolations + recentViolations together
  const [fetchOverviewData, { isFetching: overviewLoading }] =
    useLazyGetPeopleCountDataQuery();

  const [fetchDetailedReportApi, { isFetching: detailedReportLoading }] =
    useLazyGetPeopleCountDetailedReportQuery();

  const [downloadSinglePdf] = useGetPeopleCountSingleReportPdfMutation();
  const [downloadCsvReport] = useGetPeopleCountDetailedCsvReportMutation();
  const [downloadPdfReport] = useGetPeopleCountDetailedPdfReportMutation();

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    if (!tenantId) return;
    const loadInitial = async () => {
      const data = await fetchOverviewData({ tenantId }).unwrap();
      setDisplayKpi(data?.kpi ?? []);
      setDisplayZoneViolations(data?.zoneViolations ?? []);
      setRecentViolationsLive(data?.recentViolations ?? []);
    };
    loadInitial().catch(console.error);
  }, [tenantId, fetchOverviewData]);

  /* ---------- DETAILED REPORT — re-fetches on page / filter change ---------- */
  useEffect(() => {
    if (!tenantId) return;
    const loadDetailedReport = async () => {
      const alarmValue =
        filters?.alarmTriggered === undefined
          ? undefined
          : filters.alarmTriggered === "True";

      const body = {
        tenantId,
        page: page + 1,
        limit,
        zone: filters?.zone || undefined,
        camera: filters?.camera || undefined,
        alarmTriggered: alarmValue,
        startDate: formatLocalDateTime(filters?.startDate),
        endDate: formatLocalDateTime(filters?.endDate),
      };
      const response = await fetchDetailedReportApi(body).unwrap();
      setDetailedReport(response);
    };
    loadDetailedReport().catch(console.error);
  }, [tenantId, page, limit, filters, fetchDetailedReportApi]);

  /* ---------- SOCKET — only active in live mode ---------- */
  useSocketEvent<PeopleCountSocketPayload>({
    tenantId,
    enabled: isLiveMode,
    event: SOCKET_EVENTS.PEOPLE_COUNT_UPDATE,
    handler: (payload) => {
      setDisplayKpi(payload.kpi ?? []);
      setDisplayZoneViolations(payload.zoneViolations ?? []);
      setRecentViolationsLive(payload.recentViolations ?? []);
    },
  });

  /* ---------- TIME FILTER — updates overview only, not the report table ---------- */
  const handleRangeChange = useCallback(
    async (range: { start?: string; end?: string }) => {
      if (!range.start && !range.end) {
        // Range cleared → resume live mode
        setIsLiveMode(true);
        const data = await fetchOverviewData({ tenantId }).unwrap();
        setDisplayKpi(data?.kpi ?? []);
        setDisplayZoneViolations(data?.zoneViolations ?? []);
        setRecentViolationsLive(data?.recentViolations ?? []);
        return;
      }

      // Range selected → freeze socket, fetch historical data
      setIsLiveMode(false);
      const data = await fetchOverviewData({
        tenantId,
        startDate: range.start,
        endDate: range.end,
      }).unwrap();
      setDisplayKpi(data?.kpi ?? []);
      setDisplayZoneViolations(data?.zoneViolations ?? []);
      setRecentViolationsLive(data?.recentViolations ?? []);
    },
    [tenantId, fetchOverviewData],
  );

  /* ---------- DERIVED DATA ---------- */
  const kpiData = useMemo(() => {
    return displayKpi.map((item) => {
      const config = PeopleCountKpiConfig[item.title as KpiTitle];
      return {
        title: item.title,
        value: item.value,
        icon: config?.icon || People,
        tooltipMessage: config?.tooltipMessage,
      colour: config?.colour as KpiColour,  
      };
    });
  }, [displayKpi]);
const zoneViolationsForUi = useMemo(() => {
  return displayZoneViolations.map((z) => ({
    zone: z.zone,
    subViolations: [
      { label: "Entered Count", value: z.entryCount, icon: PeopleIcon },
      { label: "Exit Count",  value: z.exitCount,  icon: ExitToAppIcon },
    ],
  }));
}, [displayZoneViolations]);

  /* ---------- TABLE CONFIG ---------- */
  const tableColumns = [
    { id: "violation", label: "Violation", minWidth: 200 },
    { id: "enteredCount", label: "Entered Count", minWidth: 140 },
    { id: "exitCount", label: "Exit Count", minWidth: 120 },
    { id: "time", label: "Time", minWidth: 120 },
    { id: "zone", label: "Zone", minWidth: 120 },
    { id: "camera", label: "Cameras", minWidth: 120 },
    { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
  ];

  const tableFilters = [
    {
      id: "zone",
      label: "Zone",
      type: "select" as const,
      options: detailedReport?.zones || [],
    },
    {
      id: "camera",
      label: "Cameras",
      type: "select" as const,
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
  ];

  /* ---------- HANDLERS ---------- */
  const handleSubmitFilter = useCallback(
    (newFilters: PeopleCountFilterParams) => {
      setPage(0);
      setFilters(newFilters);
    },
    [],
  );

  const handleReset = useCallback(() => {
    setFilters({});
    setPage(0);
  }, []);

  const handleExport = useCallback(
    async (format: "csv" | "pdf", exportFilters: PeopleCountFilterParams) => {
      try {
        setIsExporting(true);
        const payload = {
          tenantId,
          zone: exportFilters.zone || undefined,
          camera: exportFilters.camera || undefined,
          startDate: formatLocalDateTime(exportFilters.startDate),
          endDate: formatLocalDateTime(exportFilters.endDate),
        };

        if (format === "csv") await downloadCsvReport(payload);
        if (format === "pdf") await downloadPdfReport(payload).unwrap();
      } catch (error) {
        console.error("❌ Export failed:", error);
      } finally {
        setIsExporting(false);
      }
    },
    [tenantId, downloadCsvReport, downloadPdfReport],
  );

  const handleDownloadSingle = useCallback(
    async (row: PeopleCountViolation, index: number) => {
      try {
        setDownloadingRows((prev) => new Set(prev).add(index));
        await downloadSinglePdf({
          tenantId,
          violation: String(row.violation),
          enteredCount: row.enteredCount as number,
          exitCount: row.exitCount as number,
          zone: row.zone,
          time: row.time,
          camera: row.camera,
          imageUrl: row.imageUrl,
          alarmTriggered: row.alarmTriggered,
        });
      } catch (error) {
        console.error("❌ Single PDF download failed", error);
      } finally {
        setDownloadingRows((prev) => {
          const next = new Set(prev);
          next.delete(index);
          return next;
        });
      }
    },
    [tenantId, downloadSinglePdf],
  );

  const handleViewSingle = useCallback((row: PeopleCountViolation) => {
    setViewPopupData(row);
    setViewPopupOpen(true);
  }, []);

  const handleDownloadViolation = async (url: string, violation: Violation) => {
    if (!violation) return;
    const v = violation as PeopleCountViolation;
    try {
      await downloadSinglePdf({
        tenantId,
        violation: String(v.violation),
        enteredCount: v.enteredCount as number,
        exitCount: v.exitCount as number,

        zone: v.zone,
        time: v.time,
        camera: v.camera,
        imageUrl: url,
        alarmTriggered: v.alarmTriggered,
      });
    } catch (err) {
      console.error("PDF download failed", err);
    }
  };

  /* ---------- RENDER ---------- */
  return (
    <Box>
      <Paper
        sx={{ p: 3, mb: 4, backgroundColor: "#ffffff", borderRadius: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 18 }}>
            📊 Overview
          </Typography>
          <TimeFilter onRangeChange={handleRangeChange} shifts={orgShifts || []} />
        </Box>

        {/* KPI Cards */}
        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {overviewLoading || !kpiData.length
            ? Array.from({ length: 3 }).map((_, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                <KpiCardSkeleton />
              </Grid>
            ))
            : kpiData.map((kpi) => (
              <Grid key={kpi.title} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                <KpiCard {...kpi} />
              </Grid>
            ))}
        </Grid>

        {/* Recent Violations + Zone Violations */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <RecentViolations
              label="Recent Violations"
              tooltipMessage="Latest 20 People Count in Factory Premises based on Entry Exit person Count with details."
              violations={recentViolationsLive}
              loading={overviewLoading}
              onDownload={handleDownloadViolation}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              violationsZone={zoneViolationsForUi}
              loading={overviewLoading}
              tooltipMessage="Shows person entry and exit count per zone"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Detailed Report Table */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed person entry and exit report with filter, reset, and CSV/PDF download options."
        data={detailedReport?.data || []}
        columns={tableColumns}
        filters={tableFilters}
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        exportLoading={isExporting}
        onDownload={(row, index) =>
          handleDownloadSingle(row as PeopleCountViolation, index)
        }
        downloadingRows={downloadingRows}
        onView={(row) => handleViewSingle(row as PeopleCountViolation)}
        downloadFileName="people-count-report"
        loading={detailedReportLoading}
        totalCount={detailedReport?.total || 0}
        page={page}
        rowsPerPage={limit}
        onPageChange={(newPage) => setPage(newPage)}
        onRowsPerPageChange={(rows) => {
          setLimit(rows);
          setPage(0);
        }}
      />

      {/* View Alert Popup */}
      <ViewAlertPopup
        open={viewPopupOpen}
        handleClose={() => setViewPopupOpen(false)}
        details={viewPopupData}
        imageKey="imageUrl"
        onDownload={(url) => {
          if (!viewPopupData) return;
          handleDownloadViolation(url, viewPopupData);
        }}
      />
    </Box>
  );
};

export default PeopleCount;