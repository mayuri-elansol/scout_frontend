"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  EmployeeIdelTimeDetailedReportResponse,
  EmployeeIdelTimeFilterParams,
  EmployeeIdleKpiItem,
  EmployeeIdleTimeSocketPayload,
  EmployeeIdleTimeViolation,
  EmployeeIdleZoneViolation,
} from "./EmployeeIdelTime.types";
import {
  useGetEmployeeIdleTimeDetectionDetailedCsvReportMutation,
  useGetEmployeeIdleTimeDetectionDetailedPdfReportMutation,
  useGetEmployeeIdleTimeDetectionSingleReportPdfMutation,
  useLazyGetEmployeeIdleTimeDetectionDetailedReportQuery,
  useLazyGetEmployeeIdleTimeDetectionKpiDataQuery,
  useLazyGetEmployeeIdleTimeDetectionRecentViolationsQuery,
  useLazyGetEmployeeIdleTimeDetectionZoneViolationsQuery,
} from "./EmployeeIdelTimeApi";
import { useSocketEvent } from "@/customhooks/useSocketEvent";
import { SOCKET_EVENTS } from "@/sockets/socket.events";
import { EmployeeIdelTimeKpiConfig } from "./EmployeeIdelTimeConfig";
import { SvgIconComponent } from "@mui/icons-material";
import { formatLocalDateTime } from "@/utils/formatLocalDateTime";
import { Violation } from "@/app/components/molecules/ViolationCard/ViolationCard";

const EmployeeIdleTime: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";

  /* ---------- STATE ---------- */

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] =
    useState<EmployeeIdleTimeViolation | null>(null);
  const [isLiveMode, setIsLiveMode] = useState(true);

  const [displayEmployeeIdelTimeKpi, setDisplayEmployeeIdelTimeKpi] = useState<
    EmployeeIdleKpiItem[]
  >([]);
  const [
    displayEmployeeIdelTimeZoneViolations,
    setDisplayEmployeeIdelTimeZoneViolations,
  ] = useState<EmployeeIdleZoneViolation[]>([]);
  const [recentViolationsLive, setRecentViolationsLive] = useState<
    EmployeeIdleTimeViolation[]
  >([]);
  const [employeeIdelTimedetailedReport, setEmployeeIdelTimeDetailedReport] =
    useState<EmployeeIdelTimeDetailedReportResponse | null>(null);

  /* ---------- API HOOKS ---------- */
  const [fetchEmployeeIdelTimeKpi, { isLoading: EmployeeIdelTimeKpiLoading }] =
    useLazyGetEmployeeIdleTimeDetectionKpiDataQuery();
  const [
    fetchEmployeeIdelTimeZoneViolations,
    { isLoading: EmployeeIdelTimeZoneLoading },
  ] = useLazyGetEmployeeIdleTimeDetectionZoneViolationsQuery();
  const [
    fetchEmployeeIdelTimeRecent,
    { isLoading: EmployeeIdelTimeRecentLoading },
  ] = useLazyGetEmployeeIdleTimeDetectionRecentViolationsQuery();
  const [
    fetchEmployeeIdelTimeDetailedReportApi,
    { isLoading: EmployeeIdelTimeDetailedReportLoading },
  ] = useLazyGetEmployeeIdleTimeDetectionDetailedReportQuery();

  const [downloadEmpIdelTimeSinglePdf] =
    useGetEmployeeIdleTimeDetectionSingleReportPdfMutation();
  const [downloadEmpIdelTimeCsvReport] =
    useGetEmployeeIdleTimeDetectionDetailedCsvReportMutation();
  const [downloadEmpIdelTimePdfReport] =
    useGetEmployeeIdleTimeDetectionDetailedPdfReportMutation();
  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    const load = async () => {
      const [kpi, zones, recent, detailed] = await Promise.all([
        fetchEmployeeIdelTimeKpi({ tenantId }).unwrap(),
        fetchEmployeeIdelTimeZoneViolations({ tenantId }).unwrap(),
        fetchEmployeeIdelTimeRecent({ tenantId }).unwrap(),
        fetchEmployeeIdelTimeDetailedReportApi({ tenantId }).unwrap(),
      ]);

      setDisplayEmployeeIdelTimeKpi(kpi ?? []);
      setDisplayEmployeeIdelTimeZoneViolations(zones ?? []);
      setRecentViolationsLive(recent ?? []);
      setEmployeeIdelTimeDetailedReport(detailed);
    };

    load().catch(console.error);
  }, [
    tenantId,
    fetchEmployeeIdelTimeKpi,
    fetchEmployeeIdelTimeZoneViolations,
    fetchEmployeeIdelTimeRecent,
    fetchEmployeeIdelTimeDetailedReportApi,
  ]);
  /* ---------- SOCKET (LIVE ONLY) ---------- */
  useSocketEvent<EmployeeIdleTimeSocketPayload>({
    tenantId,
    enabled: isLiveMode,
    event: SOCKET_EVENTS.EMPLOYEE_IDLE_TIME_UPDATE,
    handler: (payload) => {
      console.log("payload form the socket", payload);
      setDisplayEmployeeIdelTimeKpi(payload.kpi ?? []);
      setDisplayEmployeeIdelTimeZoneViolations(payload.zoneViolations ?? []);
      setRecentViolationsLive(payload.recentViolations ?? []);
    },
  });
  /* ---------- TIME FILTER ---------- */
  const handleEmpIdelTimeRangeChange = useCallback(
    async (range: { start?: string; end?: string }) => {
      if (!range.start && !range.end) {
        setIsLiveMode(true);
        fetchEmployeeIdelTimeKpi({ tenantId });
        fetchEmployeeIdelTimeZoneViolations({ tenantId });
        fetchEmployeeIdelTimeRecent({ tenantId });
        return;
      }

      setIsLiveMode(false);
      const payload = {
        tenantId: tenantId,
        startDate: range.start,
        endDate: range.end,
      };
      const [kpi, zones, recent] = await Promise.all([
        fetchEmployeeIdelTimeKpi(payload).unwrap(),
        fetchEmployeeIdelTimeZoneViolations(payload).unwrap(),
        fetchEmployeeIdelTimeRecent(payload).unwrap(),
      ]);

      setDisplayEmployeeIdelTimeKpi(kpi ?? []);
      setDisplayEmployeeIdelTimeZoneViolations(zones ?? []);
      setRecentViolationsLive(recent ?? []);
    },
    [
      tenantId,
      fetchEmployeeIdelTimeKpi,
      fetchEmployeeIdelTimeZoneViolations,
      fetchEmployeeIdelTimeRecent,
    ],
  );
  const employeeIdleTimeKpiData = useMemo(
    () =>
      displayEmployeeIdelTimeKpi.map((item) => {
        const config = EmployeeIdelTimeKpiConfig[item.title];

        return {
          ...item,
          title: t(item.title),
          icon: config?.icon || EngineeringIcon,
          tooltipMessage: config?.tooltipMessage || "",
        };
      }),
    [displayEmployeeIdelTimeKpi, t],
  );
  const zoneViolationsForUi = useMemo(() => {
    const iconMap: Record<string, SvgIconComponent> = {
      Idle: AccessTimeIcon,
      Working: WorkOutlineIcon,
      "Not Present": PersonOffIcon,
    };

    return displayEmployeeIdelTimeZoneViolations.map((z) => ({
      ...z,
      subViolations: z.subViolations?.map((s) => ({
        ...s,
        icon: iconMap[s.label],
      })),
    }));
  }, [displayEmployeeIdelTimeZoneViolations]);

  /* ---------- REPORT HANDLERS ---------- */

  const tableColumns = [
    { id: "violation", label: t("Incident") },
    { id: "time", label: t("Time") },
    { id: "zone", label: t("Zone") },
    { id: "cameraId", label: t("Cameras") },
  ];

  const tableFilters = [
    {
      id: "violation",
      label: t("Incident"),
      type: "select" as const,
      options: ["Employee Idle", "Employee Working", "Employee Not Present"],
    },
    {
      id: "zone",
      label: t("Zone"),
      type: "select" as const,

      options: employeeIdelTimedetailedReport?.zones || [],
    },
    {
      id: "cameraId",
      label: t("Cameras"),
      type: "select" as const,

      options: employeeIdelTimedetailedReport?.cameras || [],
    },

    { id: "startDate", label: t("Start Date"), type: "date" as const },
    { id: "endDate", label: t("End Date"), type: "date" as const },
  ];

  const handleSubmitFilter = useCallback(
    async (filters: EmployeeIdelTimeFilterParams) => {
      console.log("filter params", filters);

      const body = {
        tenantId: tenantId,
        violation: filters.violation || undefined,
        zone: filters.zone || undefined,
        cameraId: filters.cameraId || undefined,
        startDate: formatLocalDateTime(filters.startDate),
        endDate: formatLocalDateTime(filters.endDate),
      };

      console.log("🚀 Sending payload:", body);

      const response =
        await fetchEmployeeIdelTimeDetailedReportApi(body).unwrap();
      setEmployeeIdelTimeDetailedReport(response);
    },
    [tenantId, fetchEmployeeIdelTimeDetailedReportApi, formatLocalDateTime],
  );

  const handleReset = useCallback(async () => {
    const response = await fetchEmployeeIdelTimeDetailedReportApi({
      tenantId: tenantId,
    }).unwrap();
    setEmployeeIdelTimeDetailedReport(response);
  }, [tenantId, fetchEmployeeIdelTimeDetailedReportApi]);

  const handleExport = useCallback(
    async (format: "csv" | "pdf", filters: EmployeeIdelTimeFilterParams) => {
      try {
        const payload = {
          tenantId,
          violation: filters.violation || undefined,
          zone: filters.zone || undefined,
          cameraId: filters.cameraId || undefined,
          startDate: formatLocalDateTime(filters.startDate),
          endDate: formatLocalDateTime(filters.endDate),
        };

        // ================= CSV =================
        if (format === "csv") {
          await downloadEmpIdelTimeCsvReport(payload);
        }

        // ================= PDF =================
        if (format === "pdf") {
          await downloadEmpIdelTimePdfReport(payload).unwrap();
        }
      } catch (error) {
        console.error("❌ Export failed:", error);
      }
    },
    [
      tenantId,
      downloadEmpIdelTimeCsvReport,
      downloadEmpIdelTimePdfReport,
      formatLocalDateTime,
    ],
  );

  const handleDownloadSingle = useCallback(
    async (row: EmployeeIdleTimeViolation) => {
      try {
        const payload = {
          tenantId,
          violation: String(row.violation),
          zone: row.zone,
          time: row.time,
          cameraId: row.cameraId,
          imageUrl: row.imageUrl,
        };

        await downloadEmpIdelTimeSinglePdf(payload);
      } catch (error) {
        console.error("❌ Single PDF download failed", error);
      }
    },
    [tenantId, downloadEmpIdelTimeSinglePdf],
  );

  const handleViewSingle = useCallback((row: EmployeeIdleTimeViolation) => {
    console.log("view single row", row);
    setViewPopupData(row);
    setViewPopupOpen(true);
  }, []);

  const handleDownloadViolation = async (url: string, violation: Violation) => {
    if (!violation) return;
    const empViolation = violation as EmployeeIdleTimeViolation;
    try {
      const payload = {
        tenantId: tenantId,
        violation: String(empViolation.violation),
        zone: empViolation.zone,
        time: empViolation.time,
        cameraId: empViolation.cameraId,
        imageUrl: url,
      };

      await downloadEmpIdelTimeSinglePdf(payload);
    } catch (err) {
      console.error("PDF download failed", err);
    }
  };
  return (
    <Box>
      <Paper sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">📊 {t("Overview")}</Typography>
          <TimeFilter onRangeChange={handleEmpIdelTimeRangeChange} />
        </Box>

        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {EmployeeIdelTimeKpiLoading
            ? Array.from({ length: 6 }).map(() => (
                <Grid
                  key={uuidv4()}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                >
                  <KpiCardSkeleton />
                </Grid>
              ))
            : employeeIdleTimeKpiData.map((kpi) => (
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
              label={t("Recent Violations")}
              violations={recentViolationsLive}
              loading={EmployeeIdelTimeRecentLoading}
              tooltipMessage="Latest 20 detected idel, working,not present employee with details."
              onDownload={handleDownloadViolation}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              label={t("Zone Violations")}
              violationsZone={zoneViolationsForUi}
              loading={EmployeeIdelTimeZoneLoading}
              tooltipMessage="Shows idel, working,not present employee per zone"
            />
          </Grid>
        </Grid>
      </Paper>

      <ReportTable
        title={t("Detailed Report")}
        tooltipMessage="Detailed idle time events report with filter, reset, and CSV/PDF download options."
        data={employeeIdelTimedetailedReport?.data || []}
        columns={tableColumns}
        filters={tableFilters}
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        onDownload={(row) =>
          handleDownloadSingle(row as EmployeeIdleTimeViolation)
        }
        onView={(row) => handleViewSingle(row as EmployeeIdleTimeViolation)}
        downloadFileName="employee-idle-time-report"
        loading={EmployeeIdelTimeDetailedReportLoading}
      />

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

export default EmployeeIdleTime;
