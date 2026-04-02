"use client";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  LocalFireDepartment,
  SmokeFree,
  LocationOn,
  AccessTime,
  SvgIconComponent,
} from "@mui/icons-material";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";

import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { useCallback, useEffect, useMemo, useState } from "react";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  FireSmokeDetectionDetailedReportResponse,
  FireSmokeDetectionFilterParams,
  FireSmokeDetectionKpiItem,
  FireSmokeDetectionSocketPayload,
  FireSmokeDetectionViolation,
  FireSmokeDetectionZoneViolation,
} from "./fireSmokeDetection.types";
import {
  useGetOrgShiftTimeFireSmokeDataQuery,
  useLazyGetFireSmokeDetectionDetailedReportQuery,
  useLazyGetFireSmokeDetectionKpiDataQuery,
  useLazyGetFireSmokeDetectionRecentViolationsQuery,
  useLazyGetFireSmokeDetectionZoneViolationsQuery,
} from "./fireSmokeDetectionApi";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { formatLocalDateTime } from "@/utils/formatLocalDateTime";
import { fireSmokeDetectionKpiConfig } from "./fireSmokeDetectionConfig";
import { useSocketEvent } from "@/customhooks/useSocketEvent";
import { SOCKET_EVENTS } from "@/sockets/socket.events";
const FireSmokeDetection: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";
  /* ---------- STATE ---------- */
  const [fireSmokeFilters, setFireSmokeFilters] =
    useState<FireSmokeDetectionFilterParams>({});

  const [fireSmokePage, setFireSmokePage] = useState(0);
  const [fireSmokeLimit, setFireSmokeLimit] = useState(10);

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] =
    useState<FireSmokeDetectionViolation | null>(null);

  const [isFireSmokeLiveMode, setIsFireSmokeLiveMode] = useState(true);

  const [displayFireSmokeKpi, setDisplayFireSmokeKpi] = useState<
    FireSmokeDetectionKpiItem[]
  >([]);

  const [displayFireSmokeZoneViolations, setDisplayFireSmokeZoneViolations] =
    useState<FireSmokeDetectionZoneViolation[]>([]);
  const [fireSmokeRecentViolationsLive, setFireSmokeRecentViolationsLive] =
    useState<FireSmokeDetectionViolation[]>([]);

  const [fireSmokeDetailedReport, setFireSmokeDetailedReport] =
    useState<FireSmokeDetectionDetailedReportResponse | null>(null);

  /* ---------- API HOOKS ---------- */

  const { data: fireSmokeOrgShifts } = useGetOrgShiftTimeFireSmokeDataQuery(
    { tenantId },
    { skip: !tenantId },
  );
  const [fetchFireSmokeKpi, { isFetching: FireSmokeKpiLoading }] =
    useLazyGetFireSmokeDetectionKpiDataQuery();
  const [fetchFireSmokeZoneViolations, { isLoading: FireSmokeZoneLoading }] =
    useLazyGetFireSmokeDetectionZoneViolationsQuery();
  const [fetchFireSmokeRecent, { isLoading: FireSmokeRecentLoading }] =
    useLazyGetFireSmokeDetectionRecentViolationsQuery();
  const [
    fetchFireSmokeDetailedReportApi,
    { isFetching: FireSmokeDetailedReportLoading },
  ] = useLazyGetFireSmokeDetectionDetailedReportQuery();

  // const [downloadEmpIdelTimeSinglePdf] =
  //   useGetEmployeeIdleTimeDetectionSingleReportPdfMutation();
  // const [downloadEmpIdelTimeCsvReport] =
  //   useGetEmployeeIdleTimeDetectionDetailedCsvReportMutation();
  // const [downloadEmpIdelTimePdfReport] =
  //   useGetEmployeeIdleTimeDetectionDetailedPdfReportMutation();

  /* ---------- INITIAL LOAD ---------- */

  useEffect(() => {
    if (!tenantId) return;

    const loadInitial = async () => {
      const [kpi, zones, recent] = await Promise.all([
        fetchFireSmokeKpi({ tenantId }).unwrap(),
        fetchFireSmokeZoneViolations({ tenantId }).unwrap(),
        fetchFireSmokeRecent({ tenantId }).unwrap(),
      ]);

      setDisplayFireSmokeKpi(kpi ?? []);
      setDisplayFireSmokeZoneViolations(zones ?? []);
      setFireSmokeRecentViolationsLive(recent ?? []);
    };

    loadInitial().catch(console.error);
  }, [
    tenantId,
    fetchFireSmokeKpi,
    fetchFireSmokeZoneViolations,
    fetchFireSmokeRecent,
  ]);
  useEffect(() => {
    if (!tenantId) return;

    const loadDetailedReport = async () => {
      const alarmValue =
        fireSmokeFilters?.alarmTriggered === undefined
          ? undefined
          : fireSmokeFilters.alarmTriggered === "True";

      const body = {
        tenantId,
        page: fireSmokePage + 1,
        limit: fireSmokeLimit,
        violation: fireSmokeFilters?.violation || undefined,
        zone: fireSmokeFilters?.zone || undefined,
        cameraName: fireSmokeFilters?.cameraName || undefined,
        alarmTriggered: alarmValue,
        startDate: formatLocalDateTime(fireSmokeFilters?.startDate),
        endDate: formatLocalDateTime(fireSmokeFilters?.endDate),
      };

      const response = await fetchFireSmokeDetailedReportApi(body).unwrap();

      setFireSmokeDetailedReport(response);
    };

    loadDetailedReport().catch(console.error);
  }, [
    tenantId,
    fireSmokePage,
    fireSmokeLimit,
    fireSmokeFilters,
    fetchFireSmokeDetailedReportApi,
  ]);

  /* ---------- SOCKET (LIVE ONLY) ---------- */
  useSocketEvent<FireSmokeDetectionSocketPayload>({
    tenantId,
    enabled: isFireSmokeLiveMode,
    event: SOCKET_EVENTS.FIRE_SMOKE_UPDATE,
    handler: (payload) => {
      console.log("payload form the socket", payload);
      setDisplayFireSmokeKpi(payload.kpi ?? []);
      setDisplayFireSmokeZoneViolations(payload.zoneViolations ?? []);
      setFireSmokeRecentViolationsLive(payload.recentViolations ?? []);
    },
  });

  /* ---------- TIME FILTER ---------- */
  const handleFireSmokeRangeChange = useCallback(
    async (range: { start?: string; end?: string }) => {
      if (!range.start && !range.end) {
        setIsFireSmokeLiveMode(true);

        // ✅ CALL ALL APIs + SET STATE
        const [kpi, zones, recent] = await Promise.all([
          fetchFireSmokeKpi({ tenantId }).unwrap(),
          fetchFireSmokeZoneViolations({ tenantId }).unwrap(),
          fetchFireSmokeRecent({ tenantId }).unwrap(),
        ]);

        setDisplayFireSmokeKpi(kpi ?? []);
        setDisplayFireSmokeZoneViolations(zones ?? []);
        setFireSmokeRecentViolationsLive(recent ?? []);
        return;
      }

      setIsFireSmokeLiveMode(false);
      const payload = {
        tenantId: tenantId,
        startDate: range.start,
        endDate: range.end,
      };
      const [kpi, zones, recent] = await Promise.all([
        fetchFireSmokeKpi(payload).unwrap(),
        fetchFireSmokeZoneViolations(payload).unwrap(),
        fetchFireSmokeRecent(payload).unwrap(),
      ]);

      setDisplayFireSmokeKpi(kpi ?? []);
      setDisplayFireSmokeZoneViolations(zones ?? []);
      setFireSmokeRecentViolationsLive(recent ?? []);
    },
    [
      tenantId,
      fetchFireSmokeKpi,
      fetchFireSmokeZoneViolations,
      fetchFireSmokeRecent,
    ],
  );
  const fireSmokeKpiData = useMemo(
    () =>
      displayFireSmokeKpi.map((item) => {
        const config = fireSmokeDetectionKpiConfig[item.title];

        return {
          ...item,
          title: t(item.title),
          icon: config?.icon || EngineeringIcon,
          tooltipMessage: config?.tooltipMessage || "",
        };
      }),
    [displayFireSmokeKpi, t],
  );
  const zoneViolationsForUi = useMemo(() => {
    const iconMap: Record<string, SvgIconComponent> = {
      fire: LocalFireDepartment,
      smoke: SmokeFree,
    };

    return displayFireSmokeZoneViolations.map((z) => ({
      ...z,
      subViolations: z.subViolations?.map((s) => ({
        ...s,
        icon: iconMap[s.label],
      })),
    }));
  }, [displayFireSmokeZoneViolations]);

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
      id: "violation",
      label: t("Incident"),
      type: "select" as const,
      options: ["Fire detected", "Smoke detected"],
    },
    {
      id: "zone",
      label: t("Zone"),
      type: "select" as const,

      options: fireSmokeDetailedReport?.zones || [],
    },
    {
      id: "cameraName",
      label: t("Cameras"),
      type: "select" as const,

      options: fireSmokeDetailedReport?.cameras || [],
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

  const handleSubmitFilter = useCallback(
    (filters: FireSmokeDetectionFilterParams) => {
      console.log("filter params", filters);
      setFireSmokePage(0); // ← set page FIRST
      setFireSmokeFilters(filters); // ← then filters
      // React batches both → useEffect fires exactly ONCE
    },
    [], // no deps needed
  );
  const handleReset = useCallback(() => {
    setFireSmokeFilters({});
    setFireSmokePage(0);
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

  const handleViewSingle = useCallback((row: FireSmokeDetectionViolation) => {
    console.log("view single row", row);
    setViewPopupData(row);
    setViewPopupOpen(true);
  }, []);

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
    <Box>
      <Paper sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">📊 {t("Overview")}</Typography>
          <TimeFilter
            onRangeChange={handleFireSmokeRangeChange}
            shifts={fireSmokeOrgShifts || []}
          />
        </Box>

        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {FireSmokeKpiLoading || !fireSmokeKpiData.length
            ? Array.from({ length: 6 }).map((_, index) => (
                <Grid
                  key={index + 1}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                >
                  <KpiCardSkeleton />
                </Grid>
              ))
            : fireSmokeKpiData.map((kpi) => (
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
              violations={fireSmokeRecentViolationsLive}
              loading={FireSmokeRecentLoading}
              tooltipMessage="Latest 20 detected fire or smoke incidents with details."
              //  onDownload={handleDownloadViolation}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              label={t("Zone Incidents")}
              violationsZone={zoneViolationsForUi}
              loading={FireSmokeZoneLoading}
              tooltipMessage="Shows fire or smoke incidents per zone"
            />
          </Grid>
        </Grid>
      </Paper>

      <ReportTable
        title={t("Detailed Report")}
        tooltipMessage="Detailed fire or smoke incidents report with filter, reset, and CSV/PDF download options."
        data={fireSmokeDetailedReport?.data || []}
        columns={tableColumns}
        filters={tableFilters}
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        // onExport={handleExport}
        // onDownload={(row) =>
        //   handleDownloadSingle(row as EmployeeIdleTimeViolation)
        // }
        onView={(row) => handleViewSingle(row as FireSmokeDetectionViolation)}
        downloadFileName="fire-smoke-detection-report"
        loading={FireSmokeDetailedReportLoading}
        totalCount={fireSmokeDetailedReport?.total || 0}
        page={fireSmokePage}
        rowsPerPage={fireSmokeLimit}
        onPageChange={(newPage) => setFireSmokePage(newPage)}
        onRowsPerPageChange={(rows) => {
          setFireSmokeLimit(rows);
          setFireSmokePage(0);
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

export default FireSmokeDetection;
