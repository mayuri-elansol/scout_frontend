"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Paper, Typography } from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import { useTranslation } from "react-i18next";
import { Violation } from "@/app/components/molecules/ViolationCard/ViolationCard";
import {
  useGetIntrusionDetectionDetailedCsvReportMutation,
  useGetIntrusionDetectionDetailedPdfReportMutation,
  useGetIntrusionDetectionSingleReportPdfMutation,
  useGetOrgShiftTimeIntrusionDataQuery,
  useLazyGetIntrusionDetailedReportQuery,
  useLazyGetIntrusionKpiQuery,
  useLazyGetIntrusionRecentViolationsQuery,
  useLazyGetIntrusionZoneViolationsQuery,
} from "./IntrusionDetectionApi";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  IntrusionDetailedReportResponse,
  IntrusionFilterParams,
  IntrusionKpiItem,
  IntrusionSocketPayload,
  IntrusionViolation,
  IntrusionZoneViolation,
} from "./IntrusionDetection.types";
import { intrusionKpiConfig } from "./IntrusionDetectionConfig";
import { formatLocalDateTime } from "@/utils/formatLocalDateTime";
import { useSocketEvent } from "@/customhooks/useSocketEvent";
import { SOCKET_EVENTS } from "@/sockets/socket.events";
const IntrusionDetection: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";

  /* ---------- STATE ---------- */
  const [isIntrusionLiveMode, setIsIntrusionLiveMode] = useState(true);

  const [displayIntrusionKpi, setDisplayIntrusionKpi] = useState<
    IntrusionKpiItem[]
  >([]);
  const [displayIntrusionZoneViolations, setDisplayIntrusionZoneViolations] =
    useState<IntrusionZoneViolation[]>([]);
  const [recentIntrusionViolationsLive, setRecentIntrusionViolationsLive] =
    useState<IntrusionViolation[]>([]);
  const [detailedIntrusionReport, setDetailedIntrusionReport] =
    useState<IntrusionDetailedReportResponse | null>(null);

  const [viewPopupOpen, setViewPopupOpen] = useState(false);

  const [viewPopupData, setViewPopupData] = useState<IntrusionViolation | null>(
    null,
  );

  /*-------intrusion api ----------*/

  const { data: orgShifts } = useGetOrgShiftTimeIntrusionDataQuery(
    { tenantId },
    { skip: !tenantId },
  );
  const [fetchIntrusionKpi, { isLoading: intrusionkpiLoading }] =
    useLazyGetIntrusionKpiQuery();

  const [fetchIntrusionRecent, { isLoading: intrusionrecentLoading }] =
    useLazyGetIntrusionRecentViolationsQuery();
  const [fetchIntrusionZoneViolations, { isLoading: intrusionzoneLoading }] =
    useLazyGetIntrusionZoneViolationsQuery();

  const [
    fetchDetailedIntrusionReportApi,
    { isLoading: intrusionreportLoading },
  ] = useLazyGetIntrusionDetailedReportQuery();
  const [downloadIntrusionSinglePdf] =
    useGetIntrusionDetectionSingleReportPdfMutation();

  const [downloadIntrusionCsvReport] =
    useGetIntrusionDetectionDetailedCsvReportMutation();
  const [downloadIntrusionPdfReport] =
    useGetIntrusionDetectionDetailedPdfReportMutation();

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    if (!tenantId) return;
    const load = async () => {
      const [kpi, zones, recent, detailed] = await Promise.all([
        fetchIntrusionKpi({ tenantId }).unwrap(),
        fetchIntrusionZoneViolations({ tenantId }).unwrap(),
        fetchIntrusionRecent({ tenantId }).unwrap(),
        fetchDetailedIntrusionReportApi({ tenantId }).unwrap(),
      ]);

      setDisplayIntrusionKpi(kpi ?? []);
      setDisplayIntrusionZoneViolations(zones ?? []);
      setRecentIntrusionViolationsLive(recent ?? []);
      setDetailedIntrusionReport(detailed);
    };

    load().catch(console.error);
  }, [
    tenantId,
    fetchIntrusionKpi,
    fetchIntrusionZoneViolations,
    fetchIntrusionRecent,
    fetchDetailedIntrusionReportApi,
  ]);

  /* ---------- SOCKET (LIVE ONLY) ---------- */
  useSocketEvent<IntrusionSocketPayload>({
    tenantId,
    enabled: isIntrusionLiveMode,
    event: SOCKET_EVENTS.INTRUSION_UPDATE,
    handler: (payload) => {
      console.log("payload form the socket", payload);
      setDisplayIntrusionKpi(payload.kpi ?? []);
      setDisplayIntrusionZoneViolations(payload.zoneViolations ?? []);
      setRecentIntrusionViolationsLive(payload.recentViolations ?? []);
    },
  });

  /* ---------- TIME FILTER ---------- */
  const handleTimeRangeChange = useCallback(
    async (range: { start?: string; end?: string }) => {
      if (!range.start && !range.end) {
        setIsIntrusionLiveMode(true);
        fetchIntrusionKpi({ tenantId });

        return;
      }

      setIsIntrusionLiveMode(false);
      const payload = {
        tenantId: tenantId,
        startDate: range.start,
        endDate: range.end,
      };
      const [kpi, zones, recent] = await Promise.all([
        fetchIntrusionKpi(payload).unwrap(),
        fetchIntrusionZoneViolations(payload).unwrap(),
        fetchIntrusionRecent(payload).unwrap(),
      ]);

      setDisplayIntrusionKpi(kpi ?? []);
      setDisplayIntrusionZoneViolations(zones ?? []);
      setRecentIntrusionViolationsLive(recent ?? []);
    },
    [tenantId, fetchIntrusionKpi],
  );

  const IntrusionKpiData = useMemo(
    () =>
      displayIntrusionKpi.map((item) => {
        const config = intrusionKpiConfig[item.title];

        return {
          ...item,
          title: t(item.title),
          icon: config?.icon || EngineeringIcon,
          tooltipMessage: config?.tooltipMessage || "",
        };
      }),
    [displayIntrusionKpi, t],
  );
  const intrusionZoneViolationsForUi = useMemo(() => {
    return displayIntrusionZoneViolations.map((z) => ({
      zone: z.zone,
      incident: z.incident,
    }));
  }, [displayIntrusionZoneViolations]);

  // recent violation
  const handleDownloadIntrusionViolation = async (
    url: string,
    violation: Violation,
  ) => {
    if (!violation) return;
    const IntrusionViolation = violation as IntrusionViolation;
    try {
      const payload = {
        tenantId: tenantId,
        violation: String(IntrusionViolation.violation),
        zone: IntrusionViolation.zone,
        time: IntrusionViolation.time,
        cameraId: IntrusionViolation.cameraId,
        alarmTriggered: IntrusionViolation.alarmTriggered,
        imageUrl: url,
      };

      await downloadIntrusionSinglePdf(payload);
    } catch (err) {
      console.error("PDF download failed", err);
    }
  };

  //detailed report handlers

  const tableColumns = [
    { id: "violation", label: t("Incident") },
    { id: "time", label: t("Time") },
    { id: "zone", label: t("Zone") },
    { id: "cameraId", label: t("Cameras") },
    { id: "alarmTriggered", label: t("Alarm Triggered") },
  ];

  const tableFilters = [
    {
      id: "zone",
      label: t("Zone"),
      type: "select" as const,

      options: detailedIntrusionReport?.zones || [],
    },
    {
      id: "cameraId",
      label: t("Cameras"),
      type: "select" as const,

      options: detailedIntrusionReport?.cameras || [],
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
    async (filters: IntrusionFilterParams) => {
      console.log("filter params", filters);
      const alarmValue =
        filters.alarmTriggered === undefined
          ? undefined
          : filters.alarmTriggered === "True";
      const body = {
        tenantId: tenantId,
        zone: filters.zone || undefined,
        cameraId: filters.cameraId || undefined,

        alarmTriggered: alarmValue,

        startDate: formatLocalDateTime(filters.startDate),
        endDate: formatLocalDateTime(filters.endDate),
      };

      console.log("🚀 Sending payload:", body);

      const response = await fetchDetailedIntrusionReportApi(body).unwrap();
      setDetailedIntrusionReport(response);
    },
    [tenantId, fetchDetailedIntrusionReportApi, formatLocalDateTime],
  );

  const handleReset = useCallback(async () => {
    const response = await fetchDetailedIntrusionReportApi({
      tenantId: tenantId,
    }).unwrap();
    setDetailedIntrusionReport(response);
  }, [tenantId, fetchDetailedIntrusionReportApi]);

  const handleExport = useCallback(
    async (format: "csv" | "pdf", filters: IntrusionFilterParams) => {
      try {
        const payload = {
          tenantId,
          zone: filters.zone || undefined,
          cameraId: filters.cameraId || undefined,

          alarmTriggered:
            filters.alarmTriggered === undefined
              ? undefined
              : filters.alarmTriggered === "True",

          startDate: formatLocalDateTime(filters.startDate),
          endDate: formatLocalDateTime(filters.endDate),
        };

        // ================= CSV =================
        if (format === "csv") {
          await downloadIntrusionCsvReport(payload);
        }

        // ================= PDF =================
        if (format === "pdf") {
          await downloadIntrusionPdfReport(payload).unwrap();
        }
      } catch (error) {
        console.error("❌ Export failed:", error);
      }
    },
    [
      tenantId,
      downloadIntrusionCsvReport,
      downloadIntrusionPdfReport,
      formatLocalDateTime,
    ],
  );

  const handleDownloadSingle = useCallback(
    async (row: IntrusionViolation) => {
      try {
        const payload = {
          tenantId,
          violation: String(row.violation),
          zone: row.zone,
          time: row.time,
          cameraId: row.cameraId,
          alarmTriggered: row.alarmTriggered,
          imageUrl: row.imageUrl,
        };

        await downloadIntrusionSinglePdf(payload);
      } catch (error) {
        console.error("❌ Single PDF download failed", error);
      }
    },
    [tenantId, downloadIntrusionSinglePdf],
  );

  const handleViewSingle = useCallback(
    (row: IntrusionViolation) => {
      console.log("view single row", row);
      setViewPopupData(row);
      setViewPopupOpen(true);
    },
    [], // setState functions are stable
  );

  return (
    <Box>
      <Paper sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">📊 {t("Overview")}</Typography>
          <TimeFilter
            onRangeChange={handleTimeRangeChange}
            shifts={orgShifts || []}
          />
        </Box>

        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {intrusionkpiLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Grid
                  key={index+1}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                >
                  <KpiCardSkeleton />
                </Grid>
              ))
            : IntrusionKpiData.map((kpi) => (
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
              label={t("Recent Incident")}
              violations={recentIntrusionViolationsLive}
              loading={intrusionrecentLoading}
              onDownload={handleDownloadIntrusionViolation}
              tooltipMessage="Latest 20 intrusion detected with details."
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              label={t("Zone Incident")}
              violationsZone={intrusionZoneViolationsForUi}
              loading={intrusionzoneLoading}
              tooltipMessage="Shows intrusion detected per zone"
            />
          </Grid>
        </Grid>
      </Paper>

      <ReportTable
        title={t("Detailed Report")}
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
        data={detailedIntrusionReport?.data || []}
        columns={tableColumns}
        filters={tableFilters}
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        onDownload={(row) => handleDownloadSingle(row as IntrusionViolation)}
        onView={(row) => handleViewSingle(row as IntrusionViolation)}
        downloadFileName="intrusion-violations-report"
        loading={intrusionreportLoading}
      />

      <ViewAlertPopup
        open={viewPopupOpen}
        handleClose={() => setViewPopupOpen(false)}
        details={viewPopupData}
        imageKey="imageUrl"
        onDownload={(url) => {
          if (!viewPopupData) return;
          handleDownloadIntrusionViolation(url, viewPopupData);
        }}
      />
    </Box>
  );
};

export default IntrusionDetection;
