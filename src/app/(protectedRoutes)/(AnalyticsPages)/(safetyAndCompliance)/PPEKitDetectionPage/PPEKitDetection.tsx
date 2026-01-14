"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";

import EngineeringIcon from "@mui/icons-material/Engineering";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { SvgIconComponent } from "@mui/icons-material";

import {
  useLazyGetPPEKitDetectionKpiDataQuery,
  useLazyGetPPEKitDetectionZoneViolationsQuery,
  useLazyGetPpeKitDetectionRecentViolationsQuery,
  useLazyGetPpeKitDetectionDetailedReportQuery,
  useGetPpeKitDetectionDetailedCsvReportMutation,
  useGetPpeKitDetectionDetailedPdfReportMutation,
  useGetPpeKitDetectionSingleReportPdfMutation,
} from "./PPEKitDetectionApi";

import { ppeKpiConfig } from "./PPEKitDetectionConfig";
import {
  KpiItem,
  ZoneViolationInteface,
  FilterParams,
} from "./PPEKitDetection.types";

import { SOCKET_EVENTS } from "@/sockets/socket.events";
import { useSocketEvent } from "@/customhooks/useSocketEvent";
import dayjs, { Dayjs } from "dayjs";
import { Violation } from "@/app/components/molecules/ViolationCard/ViolationCard";
const tenantId = "4f3e2f80e5574111";

/* ================= TYPES ================= */

interface PpeSocketPayload {
  serverTimestamp: string;
  kpi: KpiItem[];
  zoneViolations: ZoneViolationInteface[];
  recentViolations: any[];
}
interface PPEViolation extends Violation {
  cameraId: string;
  alarmTriggered: boolean;
}
/* ================= COMPONENT ================= */

const PPEDetection: React.FC = () => {
  const { t } = useTranslation();

  /* ---------- STATE ---------- */
  const [isLiveMode, setIsLiveMode] = useState(true);

  const [displayKpi, setDisplayKpi] = useState<KpiItem[]>([]);
  const [displayZoneViolations, setDisplayZoneViolations] = useState<
    ZoneViolationInteface[]
  >([]);
  const [recentViolationsLive, setRecentViolationsLive] = useState<any[]>([]);
  const [detailedReport, setDetailedReport] = useState<any>(null);

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<any>(null);

  /* ---------- API HOOKS ---------- */
  const [fetchKpi, { isLoading: kpiLoading }] =
    useLazyGetPPEKitDetectionKpiDataQuery();
  const [fetchZoneViolations, { isLoading: zoneLoading }] =
    useLazyGetPPEKitDetectionZoneViolationsQuery();
  const [fetchRecent, { isLoading: recentLoading }] =
    useLazyGetPpeKitDetectionRecentViolationsQuery();
  const [
    fetchDetailedReport,
    { data: detailedReportt, isLoading: detailedReportLoading },
  ] = useLazyGetPpeKitDetectionDetailedReportQuery();
  const [downloadSinglePdf] = useGetPpeKitDetectionSingleReportPdfMutation();
  const [downloadCsvReport] = useGetPpeKitDetectionDetailedCsvReportMutation();
  const [downloadPdfReport] = useGetPpeKitDetectionDetailedPdfReportMutation();

  //function to convert the date-time  into indian standards
  const formatLocalDateTime = useCallback(
    (dt: string | Dayjs | undefined): string => {
      if (!dt) return "";
      const parsed = typeof dt === "string" ? dayjs(dt) : dt;
      return parsed.format("YYYY-MM-DD HH:mm:ss.SSS");
    },
    []
  );
  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    const load = async () => {
      const [kpi, zones, recent, detailed] = await Promise.all([
        fetchKpi({ tenantId }).unwrap(),
        fetchZoneViolations({ tenantId }).unwrap(),
        fetchRecent({ tenantId }).unwrap(),
        fetchDetailedReport({ tenantId }).unwrap(),
      ]);

      setDisplayKpi(kpi ?? []);
      setDisplayZoneViolations(zones ?? []);
      setRecentViolationsLive(recent ?? []);
      setDetailedReport(detailed);
    };

    load().catch(console.error);
  }, []);

  /* ---------- SOCKET (LIVE ONLY) ---------- */
  useSocketEvent<PpeSocketPayload>({
    tenantId,
    enabled: isLiveMode,
    event: SOCKET_EVENTS.PPE_UPDATE,
    handler: (payload) => {
      console.log("payload form the socket", payload);
      setDisplayKpi(payload.kpi ?? []);
      setDisplayZoneViolations(payload.zoneViolations ?? []);
      setRecentViolationsLive(payload.recentViolations ?? []);
    },
  });

  /* ---------- TIME FILTER ---------- */
  const handleTimeRangeChange = useCallback(
    async (range: { start?: string; end?: string }) => {
      if (!range.start && !range.end) {
        setIsLiveMode(true);
        fetchKpi({ tenantId });
        fetchZoneViolations({ tenantId });
        fetchRecent({ tenantId });
        return;
      }

      setIsLiveMode(false);
      const payload = {
        tenantId: tenantId,
        startDate: range.start,
        endDate: range.end,
      };
      const [kpi, zones, recent] = await Promise.all([
        fetchKpi(payload).unwrap(),
        fetchZoneViolations(payload).unwrap(),
        fetchRecent(payload).unwrap(),
      ]);

      setDisplayKpi(kpi ?? []);
      setDisplayZoneViolations(zones ?? []);
      setRecentViolationsLive(recent ?? []);
    },
    []
  );

  /* ---------- UI MAPPERS ---------- */
  const ppeKpiData = useMemo(
    () =>
      displayKpi.map((item) => ({
        ...item,
        title: t(item.title),
        icon:
          ppeKpiConfig[item.title as keyof typeof ppeKpiConfig]?.icon ||
          EngineeringIcon,
        tooltipMessage:
          ppeKpiConfig[item.title as keyof typeof ppeKpiConfig]
            ?.tooltipMessage || "",
      })),
    [displayKpi, t]
  );

  const zoneViolationsForUi = useMemo(() => {
    const iconMap: Record<string, SvgIconComponent> = {
      Helmet: EngineeringIcon,
      Vest: CheckroomIcon,
      Glasses: VisibilityOffIcon,
    };

    return displayZoneViolations.map((z) => ({
      ...z,
      subViolations: z.subViolations?.map((s) => ({
        ...s,
        icon: iconMap[s.label],
      })),
    }));
  }, [displayZoneViolations]);

  /* ---------- REPORT HANDLERS ---------- */

  const tableColumns = useMemo(
    () => [
      { id: "violation", label: t("Violation") },
      { id: "time", label: t("Time") },
      { id: "zone", label: t("Zone") },
      { id: "cameraId", label: t("Cameras") },
      { id: "alarmTriggered", label: t("Alarm Triggered") },
    ],
    []
  );

  const tableFilters = useMemo(
    () => [
      {
        id: "violation",
        label: t("Violation"),
        type: "select" as const,
        options: [
          "Hard hat missing",
          "Safety vest not worn",
          "Safety glasses missing",
        ],
      },
      {
        id: "zone",
        label: t("Zone"),
        type: "select" as const,

        options: detailedReport?.zones || [],
      },
      {
        id: "cameraId",
        label: t("Cameras"),
        type: "select" as const,

        options: detailedReport?.cameras || [],
      },
      {
        id: "alarmTriggered",
        label: t("Alarm Triggered"),
        type: "select" as const,
        options: ["True", "False"],
      },
      { id: "startDate", label: t("Start Date"), type: "date" as const },
      { id: "endDate", label: t("End Date"), type: "date" as const },
    ],
    [detailedReport?.zones, detailedReport?.cameras]
  );

  const handleSubmitFilter = useCallback(
    async (filters: FilterParams) => {
      console.log("filter params", filters);

      const body = {
        tenantId: tenantId,

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

      const res = await fetchDetailedReport(body);
      setDetailedReport(res);
    },
    [fetchDetailedReport, formatLocalDateTime] // ✅ add only what is used
  );

  const handleReset = useCallback(() => {
    console.log("reset button clicked");

    fetchDetailedReport({
      tenantId: tenantId,
    });
  }, [fetchDetailedReport]);

  const handleExport = useCallback(
    async (format: "csv" | "pdf", filters: FilterParams) => {
      try {
        const payload = {
          tenantId: tenantId,

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

        // ================= CSV =================
        if (format === "csv") {
          const csvBlob = await downloadCsvReport(payload).unwrap();

          const url = window.URL.createObjectURL(csvBlob);
          const a = document.createElement("a");

          a.href = url;
          a.download = `ppe-violations-report-${Date.now()}.csv`;
          document.body.appendChild(a);
          a.click();

          a.remove();
          window.URL.revokeObjectURL(url);
        }

        // ================= PDF =================
        if (format === "pdf") {
          const pdfBlob = await downloadPdfReport(payload).unwrap();

          const url = window.URL.createObjectURL(
            new Blob([pdfBlob], { type: "application/pdf" })
          );

          const a = document.createElement("a");
          a.href = url;
          a.download = `ppe-violations-report-${Date.now()}.pdf`;

          document.body.appendChild(a);
          a.click();

          a.remove();
          window.URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error("❌ Export failed:", error);
      }
    },
    [downloadCsvReport, downloadPdfReport, formatLocalDateTime]
  );

  const handleDownloadSingle = useCallback(
    async (row: PPEViolation) => {
      console.log("download single row", row);
      try {
        const payload = {
          tenantId: tenantId,
          violation: String(row.violation),
          zone: row.zone,
          time: row.time,
          cameraId: row.cameraId,
          alarmTriggered: row.alarmTriggered,
          imageUrl: row.imageUrl,
        };

        const pdfBlob = await downloadSinglePdf(payload).unwrap();

        // ✅ Create browser download
        const blobUrl = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");

        a.href = blobUrl;
        a.download = `ppe-single-report-${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();

        // ✅ Cleanup
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
      } catch (err) {
        console.error("PDF download failed", err);
      }
    },
    [downloadSinglePdf]
  );

  const handleViewSingle = useCallback(
    (row: PPEViolation) => {
      console.log("view single row", row);
      setViewPopupData(row);
      setViewPopupOpen(true);
    },
    [] // setState functions are stable
  );
  const handleDownloadViolation = async (url: string, violation: Violation) => {
    if (!violation) return;
    const ppeViolation = violation as PPEViolation;
    try {
      const payload = {
        tenantId: tenantId,
        violation: String(ppeViolation.violation),
        zone: ppeViolation.zone,
        time: ppeViolation.time,
        cameraId: ppeViolation.cameraId,
        alarmTriggered: ppeViolation.alarmTriggered,
        imageUrl: url,
      };

      const pdfBlob = await downloadSinglePdf(payload).unwrap();

      // ✅ Create browser download
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");

      a.href = blobUrl;
      a.download = `ppe-single-report-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();

      // ✅ Cleanup
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("PDF download failed", err);
    }
  };

  /* ---------- RENDER ---------- */
  return (
    <Box>
      <Paper sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">📊 {t("Overview")}</Typography>
          <TimeFilter onRangeChange={handleTimeRangeChange} />
        </Box>

        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {kpiLoading
            ? Array.from({ length: 6 }).map(() => (
                <Grid
                  key={uuidv4()}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                >
                  <KpiCardSkeleton />
                </Grid>
              ))
            : ppeKpiData.map((kpi) => (
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
              loading={recentLoading}
              tooltipMessage="Latest 20 detected PPE violations"
              onDownload={handleDownloadViolation}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              label={t("Zone Violations")}
              violationsZone={zoneViolationsForUi}
              loading={zoneLoading}
              tooltipMessage="Shows PPE violations per zone"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* <ReportTable
        title={t("Detailed Report")}
        data={detailedReport?.data || []}
        loading={detailedReportLoading}
        columns={[
          { id: "violation", label: t("Violation") },
          { id: "time", label: t("Time") },
          { id: "zone", label: t("Zone") },
          { id: "cameraId", label: t("Cameras") },
          { id: "alarmTriggered", label: t("Alarm Triggered") },
        ]}
        filters={[
          {
            id: "violation",
            label: t("Violation"),
            type: "select" as const,
            options: [
              "Hard hat missing",
              "Safety vest not worn",
              "Safety glasses missing",
            ],
          },
          {
            id: "zone",
            label: t("Zone"),
            type: "select" as const,

            options: detailedReport?.zones || [],
          },
          {
            id: "cameraId",
            label: t("Cameras"),
            type: "select" as const,

            options: detailedReport?.cameras || [],
          },
          {
            id: "alarmTriggered",
            label: t("Alarm Triggered"),
            type: "select" as const,
            options: ["True", "False"],
          },
          { id: "startDate", label: t("Start Date"), type: "date" as const },
          { id: "endDate", label: t("End Date"), type: "date" as const },
        ]}
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        onDownload={(row) => handleDownloadSingle(row as PPEViolation)}
        onView={(row) => {
          setViewPopupData(row);
          setViewPopupOpen(true);
        }}
        downloadFileName="ppe-violations-report"
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
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
      /> */}

      <ReportTable
        title={t("Detailed Report")}
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
        data={detailedReportt?.data || []}
        columns={tableColumns}
        filters={tableFilters}
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        onDownload={(row) => handleDownloadSingle(row as PPEViolation)}
        onView={(row) => handleViewSingle(row as PPEViolation)}
        downloadFileName="ppe-violations-report"
        loading={detailedReportLoading}
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

export default PPEDetection;
