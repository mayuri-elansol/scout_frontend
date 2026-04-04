"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  FallDetectionDetailedReportResponse,
  FallDetectionFilterParams,
  FallDetectionKpiItem,
  FallDetectionSocketPayload,
  FallDetectionViolation,
  FallDetectionZoneViolation,
} from "./fallDetection.types";
import {
  useGetOrgShiftTimeFallLaydownDataQuery,
  useLazyGetFallLaydownDetectionDetailedReportQuery,
  useLazyGetFallLaydownDetectionKpiDataQuery,
  useLazyGetFallLaydownDetectionRecentViolationsQuery,
  useLazyGetFallLaydownDetectionZoneViolationsQuery,
} from "./fallDetectionApi";
import { formatLocalDateTime } from "@/utils/formatLocalDateTime";
import { fallDetectionKpiConfig } from "./fallDetectionConfig";
import { useSocketEvent } from "@/customhooks/useSocketEvent";
import { SOCKET_EVENTS } from "@/sockets/socket.events";

const FallDetection: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";

  /* ---------- STATE ---------- */
  const [fallLaydownFilters, setFallLaydownFilters] =
    useState<FallDetectionFilterParams>({});

  const [fallLaydownPage, setFallLaydownPage] = useState(0);
  const [fallLaydownLimit, setFallLaydownLimit] = useState(10);

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] =
    useState<FallDetectionViolation | null>(null);

  const [isFallLaydownLiveMode, setIsFallLaydownLiveMode] = useState(true);

  const [displayFallLaydownKpi, setDisplayFallLaydownKpi] = useState<
    FallDetectionKpiItem[]
  >([]);

  const [
    displayFallLaydownZoneViolations,
    setDisplayFallLaydownZoneViolations,
  ] = useState<FallDetectionZoneViolation[]>([]);

  const [fallLaydownRecentViolationsLive, setFallLaydownRecentViolationsLive] =
    useState<FallDetectionViolation[]>([]);

  const [fallLaydownDetailedReport, setFallLaydownDetailedReport] =
    useState<FallDetectionDetailedReportResponse | null>(null);

  /* ---------- API HOOKS ---------- */

  const { data: fallLaydownOrgShifts } = useGetOrgShiftTimeFallLaydownDataQuery(
    { tenantId },
    { skip: !tenantId },
  );
  const [fetchFallLaydownKpi, { isFetching: FallLaydownKpiLoading }] =
    useLazyGetFallLaydownDetectionKpiDataQuery();
  const [
    fetchFallLaydownZoneViolations,
    { isLoading: FallLaydownZoneLoading },
  ] = useLazyGetFallLaydownDetectionZoneViolationsQuery();
  const [fetchFallLaydownRecent, { isLoading: FallLaydownRecentLoading }] =
    useLazyGetFallLaydownDetectionRecentViolationsQuery();
  const [
    fetchFallLaydownDetailedReportApi,
    { isFetching: FallLaydownDetailedReportLoading },
  ] = useLazyGetFallLaydownDetectionDetailedReportQuery();

  /* ---------- INITIAL LOAD ---------- */

  useEffect(() => {
    if (!tenantId) return;

    const loadInitial = async () => {
      const [kpi, zones, recent] = await Promise.all([
        fetchFallLaydownKpi({ tenantId }).unwrap(),
        fetchFallLaydownZoneViolations({ tenantId }).unwrap(),
        fetchFallLaydownRecent({ tenantId }).unwrap(),
      ]);

      setDisplayFallLaydownKpi(kpi ?? []);
      setDisplayFallLaydownZoneViolations(zones ?? []);
      setFallLaydownRecentViolationsLive(recent ?? []);
    };

    loadInitial().catch(console.error);
  }, [
    tenantId,
    fetchFallLaydownKpi,
    fetchFallLaydownZoneViolations,
    fetchFallLaydownRecent,
  ]);
  useEffect(() => {
    if (!tenantId) return;

    const loadDetailedReport = async () => {
      const alarmValue =
        fallLaydownFilters?.alarmTriggered === undefined
          ? undefined
          : fallLaydownFilters.alarmTriggered === "True";

      const body = {
        tenantId,
        page: fallLaydownPage + 1,
        limit: fallLaydownLimit,
        // violation: fallLaydownFilters?.violation || undefined,
        zone: fallLaydownFilters?.zone || undefined,
        cameraName: fallLaydownFilters?.cameraName || undefined,
        alarmTriggered: alarmValue,
        startDate: formatLocalDateTime(fallLaydownFilters?.startDate),
        endDate: formatLocalDateTime(fallLaydownFilters?.endDate),
      };

      const response = await fetchFallLaydownDetailedReportApi(body).unwrap();

      setFallLaydownDetailedReport(response);
    };

    loadDetailedReport().catch(console.error);
  }, [
    tenantId,
    fallLaydownPage,
    fallLaydownLimit,
    fallLaydownFilters,
    fetchFallLaydownDetailedReportApi,
  ]);

  /* ---------- SOCKET (LIVE ONLY) ---------- */
  useSocketEvent<FallDetectionSocketPayload>({
    tenantId,
    enabled: isFallLaydownLiveMode,
    event: SOCKET_EVENTS.FALL_DETECTION_UPDATE,
    handler: (payload) => {
      console.log("payload form the socket", payload);
      setDisplayFallLaydownKpi(payload.kpi ?? []);
      setDisplayFallLaydownZoneViolations(payload.zoneViolations ?? []);
      setFallLaydownRecentViolationsLive(payload.recentViolations ?? []);
    },
  });

  /* ---------- TIME FILTER ---------- */
  const handleFallLaydownRangeChange = useCallback(
    async (range: { start?: string; end?: string }) => {
      if (!range.start && !range.end) {
        setIsFallLaydownLiveMode(true);

        // ✅ CALL ALL APIs + SET STATE
        const [kpi, zones, recent] = await Promise.all([
          fetchFallLaydownKpi({ tenantId }).unwrap(),
          fetchFallLaydownZoneViolations({ tenantId }).unwrap(),
          fetchFallLaydownRecent({ tenantId }).unwrap(),
        ]);

        setDisplayFallLaydownKpi(kpi ?? []);
        setDisplayFallLaydownZoneViolations(zones ?? []);
        setFallLaydownRecentViolationsLive(recent ?? []);
        return;
      }

      setIsFallLaydownLiveMode(false);
      const payload = {
        tenantId: tenantId,
        startDate: range.start,
        endDate: range.end,
      };
      const [kpi, zones, recent] = await Promise.all([
        fetchFallLaydownKpi(payload).unwrap(),
        fetchFallLaydownZoneViolations(payload).unwrap(),
        fetchFallLaydownRecent(payload).unwrap(),
      ]);

      setDisplayFallLaydownKpi(kpi ?? []);
      setDisplayFallLaydownZoneViolations(zones ?? []);
      setFallLaydownRecentViolationsLive(recent ?? []);
    },
    [
      tenantId,
      fetchFallLaydownKpi,
      fetchFallLaydownZoneViolations,
      fetchFallLaydownRecent,
    ],
  );
  const fallLaydownKpiData = useMemo(
    () =>
      displayFallLaydownKpi.map((item) => {
        const config = fallDetectionKpiConfig[item.title];

        return {
          ...item,
          title: t(item.title),
          icon: config?.icon || EngineeringIcon,
          tooltipMessage: config?.tooltipMessage || "",
        };
      }),
    [displayFallLaydownKpi, t],
  );

  const fallLaydownZoneViolationsForUi = useMemo(() => {
    return displayFallLaydownZoneViolations.map((z) => ({
      zone: z.zone,
      incident: z.incidents,
    }));
  }, [displayFallLaydownZoneViolations]);

  /* ---------- REPORT HANDLERS ---------- */

  const tableColumns = [
    { id: "violation", label: t("Incident") },
    { id: "time", label: t("Time") },
    { id: "zone", label: t("Zone") },
    { id: "cameraName", label: t("Cameras") },
    { id: "alarmTriggered", label: t("Alarm Triggered") },
  ];

  const tableFilters = [
    {
      id: "zone",
      label: t("Zone"),
      type: "select" as const,

      options: fallLaydownDetailedReport?.zones || [],
    },
    {
      id: "cameraName",
      label: t("Cameras"),
      type: "select" as const,

      options: fallLaydownDetailedReport?.cameras || [],
    },
    {
      id: "alarmTriggered",
      label: t("Alarm Triggered"),
      type: "select" as const,
      options: ["True", "False"],
    },
    { id: "startDate", label: t("Start Date"), type: "date" as const },
    { id: "endDate", label: t("End Date"), type: "date" as const },
  ];

  const handleFallLaydownSubmitFilter = useCallback(
    (filters: FallDetectionFilterParams) => {
      console.log("filter params", filters);
      setFallLaydownPage(0); // ← set page FIRST
      setFallLaydownFilters(filters); // ← then filters
      // React batches both → useEffect fires exactly ONCE
    },
    [], // no deps needed
  );
  const handleFallLaydownReset = useCallback(() => {
    setFallLaydownFilters({});
    setFallLaydownPage(0);
  }, []);

  // const handleExport = useCallback(
  //   async (format: "csv" | "pdf", filters: EmployeeIdelTimeFilterParams) => {
  //     try {
  //       const payload = {
  //         tenantId,
  //         violation: filters.violation || undefined,
  //         zone: filters.zone || undefined,
  //         cameraId: filters.cameraId || undefined,
  //         startDate: formatLocalDateTime(filters.startDate),
  //         endDate: formatLocalDateTime(filters.endDate),
  //       };

  //       // ================= CSV =================
  //       if (format === "csv") {
  //         await downloadEmpIdelTimeCsvReport(payload);
  //       }

  //       // ================= PDF =================
  //       if (format === "pdf") {
  //         await downloadEmpIdelTimePdfReport(payload).unwrap();
  //       }
  //     } catch (error) {
  //       console.error("❌ Export failed:", error);
  //     }
  //   },
  //   [
  //     tenantId,
  //     downloadEmpIdelTimeCsvReport,
  //     downloadEmpIdelTimePdfReport,
  //     formatLocalDateTime,
  //   ],
  // );

  // const handleDownloadSingle = useCallback(
  //   async (row: EmployeeIdleTimeViolation) => {
  //     try {
  //       console.log("row for the employee idel time", row);
  //       const payload = {
  //         tenantId,
  //         violation: String(row.violation),
  //         zone: row.zone,
  //         time: row.time,
  //         cameraId: row.cameraId,
  //         imageUrl: row.imageUrl,
  //       };

  //       await downloadEmpIdelTimeSinglePdf(payload);
  //     } catch (error) {
  //       console.error("❌ Single PDF download failed", error);
  //     }
  //   },
  //   [tenantId, downloadEmpIdelTimeSinglePdf],
  // );

  const handleFallLaydownViewSingle = useCallback(
    (row: FallDetectionViolation) => {
      console.log("view single row", row);
      setViewPopupData(row);
      setViewPopupOpen(true);
    },
    [],
  );

  // const handleDownloadViolation = async (url: string, violation: Violation) => {
  //   if (!violation) return;
  //   const empViolation = violation as EmployeeIdleTimeViolation;
  //   console.log("employee idel time single data=============", empViolation);
  //   try {
  //     const payload = {
  //       tenantId: tenantId,
  //       violation: String(empViolation.violation),
  //       zone: empViolation.zone,
  //       time: empViolation.time,
  //       cameraId: empViolation.cameraId,
  //       imageUrl: url,
  //     };

  //     await downloadEmpIdelTimeSinglePdf(payload);
  //   } catch (err) {
  //     console.error("PDF download failed", err);
  //   }
  // };

  return (
    // <Box>
    //   <Paper
    //     sx={{
    //       p: 3,
    //       mb: 4,
    //       backgroundColor: "#ffffff",
    //       borderRadius: 2,
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //         mb: 2,
    //       }}
    //     >
    //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    //         <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 18 }}>
    //           <Box component="span" sx={{ mr: 2 }}>
    //             📊 Overview
    //           </Box>
    //         </Typography>
    //       </Box>

    //       <TimeFilter onRangeChange={() => console.log("on range chnged")} />
    //     </Box>
    //     {/* KPI Cards */}

    //     <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
    //       {KpiCardLoading
    //         ? // Show skeletons while loading
    //           skeletonKeys.map((index) => (
    //             <Grid
    //               size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
    //               key={uuidv4() + index}
    //             >
    //               <KpiCardSkeleton />
    //             </Grid>
    //           ))
    //         : // Show actual KPI cards
    //           fallKpiData.map((kpi, index) => (
    //             <Grid
    //               size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
    //               key={uuidv4() + index}
    //             >
    //               <KpiCard {...kpi} />
    //             </Grid>
    //           ))}
    //     </Grid>

    //     {/* Content Grid */}
    //     <Grid container spacing={3}>
    //       {/* Recent  Violations */}
    //       <Grid size={{ xs: 12, lg: 8 }}>
    //         <RecentViolations
    //           label="Recent Violations"
    //           violations={recentLaydownViolations}
    //           loading={false}
    //           tooltipMessage="Latest 20 detected laydown/sleeping/falldown violations with details."
    //         />
    //       </Grid>
    //       {/* Compliance by Zone */}

    //       <Grid size={{ xs: 12, lg: 4 }}>
    //         <ZoneViolations
    //           violationsZone={zoneViolationsData}
    //           loading={false}
    //           tooltipMessage="Shows laydown/sleeping/falldown violations per zone"
    //         />
    //       </Grid>
    //     </Grid>
    //   </Paper>

    //   {/* Report */}
    //   <ReportTable
    //     totalCount={4}
    //     page={0}
    //     rowsPerPage={10}
    //     title="Detailed Report"
    //     tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
    //     columns={[
    //       { id: "voilation", label: "Violation", minWidth: 200 },
    //       { id: "time", label: "Time", minWidth: 120 },
    //       { id: "zone", label: "Zone", minWidth: 120 },
    //       { id: "cameraId", label: "Cameras", minWidth: 120 },
    //       { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 120 },
    //     ]}
    //     data={recentLaydownViolations}
    //     filters={[
    //       {
    //         id: "zone",
    //         label: "Zone",
    //         type: "select",
    //         options: Array.from(
    //           new Set(recentLaydownViolations.map((item) => item.zone)),
    //         ),
    //       },
    //       {
    //         id: "cameraId",
    //         label: "Cameras",
    //         type: "select",
    //         options: Array.from(
    //           new Set(recentLaydownViolations.map((item) => item.cameraId)),
    //         ),
    //       },
    //       {
    //         id: "alarmTriggered",
    //         label: "Alarm Triggered",
    //         type: "select",
    //         options: ["true", "false"],
    //       },
    //       { id: "time", label: "Start Date", type: "date" },
    //       { id: "time", label: "End Date", type: "date" },
    //     ]}
    //     onView={handleViewSingle}
    //     onSubmit={handleSubmitFilter}
    //     onReset={handleReset}
    //     onExport={handleExport}
    //     downloadFileName="ppe-violations-report"
    //     loading={false}
    //   />
    //   {/* View Alert Popup */}
    //   {viewPopupData && (
    //     <ViewAlertPopup
    //       open={viewPopupOpen}
    //       handleClose={() => setViewPopupOpen(false)}
    //       details={viewPopupData}
    //       imageKey="imageUrl"
    //       onDownload={(url) => console.log("Download:", url)}
    //     />
    //   )}
    // </Box>

    <Box>
      <Paper sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">📊 {t("Overview")}</Typography>
          <TimeFilter
            onRangeChange={handleFallLaydownRangeChange}
            shifts={fallLaydownOrgShifts || []}
          />
        </Box>

        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {FallLaydownKpiLoading || !fallLaydownKpiData.length
            ? Array.from({ length: 6 }).map((_, index) => (
                <Grid
                  key={index + 1}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                >
                  <KpiCardSkeleton />
                </Grid>
              ))
            : fallLaydownKpiData.map((kpi) => (
                <Grid
                  key={kpi.title}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                >
                  <KpiCard {...kpi} />
                </Grid>
              ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <RecentViolations
              label={t("Recent Incidents")}
              violations={fallLaydownRecentViolationsLive}
              loading={FallLaydownRecentLoading}
              tooltipMessage="Latest 20 detected fall incidents with details."
              //  onDownload={handleDownloadViolation}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              label={t("Zone Incidents")}
              violationsZone={fallLaydownZoneViolationsForUi}
              loading={FallLaydownZoneLoading}
              tooltipMessage="Shows fall incidents per zone"
            />
          </Grid>
        </Grid>
      </Paper>

      <ReportTable
        title={t("Detailed Report")}
        tooltipMessage="Detailed fall or laydown incidents report with filter, reset, and CSV/PDF download options."
        data={fallLaydownDetailedReport?.data || []}
        columns={tableColumns}
        filters={tableFilters}
        onSubmit={handleFallLaydownSubmitFilter}
        onReset={handleFallLaydownReset}
        // onExport={handleExport}
        // onDownload={(row) =>
        //   handleDownloadSingle(row as EmployeeIdleTimeViolation)
        // }
        onView={(row) =>
          handleFallLaydownViewSingle(row as FallDetectionViolation)
        }
        downloadFileName="fall-laydown-detection-report"
        loading={FallLaydownDetailedReportLoading}
        totalCount={fallLaydownDetailedReport?.total || 0}
        page={fallLaydownPage}
        rowsPerPage={fallLaydownLimit}
        onPageChange={(newPage) => setFallLaydownPage(newPage)}
        onRowsPerPageChange={(rows) => {
          setFallLaydownLimit(rows);
          setFallLaydownPage(0);
        }}
      />

      <ViewAlertPopup
        open={viewPopupOpen}
        handleClose={() => setViewPopupOpen(false)}
        details={viewPopupData}
        imageKey="imageUrl"
        // onDownload={(url) => {
        //   if (!viewPopupData) return;

        //   handleDownloadViolation(url, viewPopupData);
        // }}
      />
    </Box>
  );
};

export default FallDetection;
