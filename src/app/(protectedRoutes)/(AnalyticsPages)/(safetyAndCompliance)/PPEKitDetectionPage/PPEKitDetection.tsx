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

const tenantId = "4f3e2f80e5574111";

/* ================= TYPES ================= */

interface PpeSocketPayload {
  serverTimestamp: string;
  kpi: KpiItem[];
  zoneViolations: ZoneViolationInteface[];
  recentViolations: any[];
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
  const [fetchDetailedReportApi] =
    useLazyGetPpeKitDetectionDetailedReportQuery();

  const [downloadCsv] = useGetPpeKitDetectionDetailedCsvReportMutation();
  const [downloadPdf] = useGetPpeKitDetectionDetailedPdfReportMutation();
  const [downloadSinglePdf] = useGetPpeKitDetectionSingleReportPdfMutation();

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    const load = async () => {
      const [kpi, zones, recent, detailed] = await Promise.all([
        fetchKpi({ tenantId }).unwrap(),
        fetchZoneViolations({ tenantId }).unwrap(),
        fetchRecent({ tenantId }).unwrap(),
        fetchDetailedReportApi({ tenantId }).unwrap(),
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

      const [kpi, zones, recent] = await Promise.all([
        fetchKpi({ tenantId, ...range }).unwrap(),
        fetchZoneViolations({ tenantId, ...range }).unwrap(),
        fetchRecent({ tenantId, ...range }).unwrap(),
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
  const handleSubmitFilter = useCallback(
    (filters: FilterParams) => fetchDetailedReportApi({ tenantId, ...filters }),
    []
  );

  const handleReset = useCallback(
    () => fetchDetailedReportApi({ tenantId }),
    []
  );

  const handleExport = useCallback(
    async (format: "csv" | "pdf", filters: FilterParams) => {
      try {
        // ✅ Ensure startDate/endDate are strings
        const payload = {
          tenantId,
          violation: filters.violation ?? "",
          zone: filters.zone ?? "",
          cameraId: filters.cameraId ?? "",
          alarmTriggered:
            filters.alarmTriggered !== undefined
              ? filters.alarmTriggered === "True"
              : false,
          startDate: filters.startDate ?? "",
          endDate: filters.endDate ?? "",
        };

        const blob =
          format === "csv"
            ? await downloadCsv(payload).unwrap()
            : await downloadPdf(payload).unwrap();

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ppe-report-${Date.now()}.${format}`;
        a.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Export failed:", error);
      }
    },
    [downloadCsv, downloadPdf]
  );

  const handleDownloadSingle = useCallback(async (row: any) => {
    const blob = await downloadSinglePdf({
      tenantId,
      ...row,
    }).unwrap();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ppe-violation-${Date.now()}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

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
              onDownload={(url, row) =>
                handleDownloadSingle({ ...row, imageUrl: url })
              }
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

      <ReportTable
        title={t("Detailed Report")}
        data={detailedReport?.data || []}
        loading={!detailedReport}
        columns={[
          { id: "violation", label: t("Violation") },
          { id: "time", label: t("Time") },
          { id: "zone", label: t("Zone") },
          { id: "cameraId", label: t("Cameras") },
          { id: "alarmTriggered", label: t("Alarm Triggered") },
        ]}
        // filters={[
        //   { id: "violation", label: t("Violation"), type: "select" },
        //   { id: "zone", label: t("Zone"), type: "select" },
        //   { id: "cameraId", label: t("Cameras"), type: "select" },
        //   { id: "alarmTriggered", label: t("Alarm Triggered"), type: "select" },
        //   { id: "startDate", label: t("Start Date"), type: "date" },
        //   { id: "endDate", label: t("End Date"), type: "date" },
        // ]}
        filters={[
  {
    id: "violation",
    label: t("Violation"),
    type: "select",
    options: [""], // ✅ MUST contain at least one item
  },
  {
    id: "zone",
    label: t("Zone"),
    type: "select",
    options: [""],
  },
  {
    id: "cameraId",
    label: t("Cameras"),
    type: "select",
    options: [""],
  },
  {
    id: "alarmTriggered",
    label: t("Alarm Triggered"),
    type: "select",
    options: ["True", "False"], // already valid
  },
  { id: "startDate", label: t("Start Date"), type: "date" },
  { id: "endDate", label: t("End Date"), type: "date" },
]}

        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        onDownload={handleDownloadSingle}
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
        onDownload={(url) =>
          viewPopupData &&
          handleDownloadSingle({ ...viewPopupData, imageUrl: url })
        }
      />
    </Box>
  );
};

export default PPEDetection;
