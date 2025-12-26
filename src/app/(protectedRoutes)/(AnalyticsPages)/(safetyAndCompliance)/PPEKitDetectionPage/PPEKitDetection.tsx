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
  useGetPpeKitDetectionDetailedCsvReportMutation,
  useGetPpeKitDetectionDetailedPdfReportMutation,
  useGetPpeKitDetectionSingleReportPdfMutation,
  useLazyGetPpeKitDetectionDetailedReportQuery,
  useLazyGetPPEKitDetectionKpiDataQuery,
  useLazyGetPpeKitDetectionRecentViolationsQuery,
  useLazyGetPPEKitDetectionZoneViolationsQuery,
} from "./PPEKitDetectionApi";
import { ppeKpiConfig } from "./PPEKitDetectionConfig";
import { useSocketListeners } from "@/hooks/useSocketListeners";
import dayjs, { Dayjs } from "dayjs";
import { Violation } from "@/app/components/molecules/ViolationCard/ViolationCard";
import { SvgIconComponent } from "@mui/icons-material";
const PPEDetection: React.FC = () => {
  // ✅ Add deduplication ref at the top
  const processedEvents = useRef(new Set<string>());

  interface PPEViolation extends Violation {
    cameraId: string;
    alarmTriggered: boolean;
  }

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
  const [downloadSinglePdf] = useGetPpeKitDetectionSingleReportPdfMutation();
  const [downloadCsvReport] = useGetPpeKitDetectionDetailedCsvReportMutation();

  const [downloadPdfReport] = useGetPpeKitDetectionDetailedPdfReportMutation();

  // ✅ Single source of truth for KPI data
  const [displayKpi, setDisplayKpi] = useState<KpiItem[] | null>(null);
  const [recentViolationsLive, setRecentViolationsLive] = useState<
    PPEViolation[]
  >([]);

  const [displayZoneViolations, setDisplayZoneViolations] = useState<
    ZoneViolationInteface[]
  >([]);
  //function to convert the date-time  into indian standards
  const formatLocalDateTime = useCallback(
    (dt: string | Dayjs | undefined): string => {
      if (!dt) return "";
      const parsed = typeof dt === "string" ? dayjs(dt) : dt;
      return parsed.format("YYYY-MM-DD HH:mm:ss.SSS");
    },
    [] // dayjs import is stable
  );
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

    fetchKpi({ tenantId: "c2bf4995e1bf3ce1" })
      .unwrap()
      .then((freshData) => {
        setDisplayKpi(freshData);
        optimisticVersionRef.current = 0;
        lastSyncTimestampRef.current = Date.now();
        console.log("kpi data", freshData);
      })
      .catch((err) => {
        console.error("❌ Refetch failed:", err);
      });
    // fetch Zone Violations
    fetchZoneViolations({ tenantId: "c2bf4995e1bf3ce1" })
      .unwrap()
      .then((zones) => {
        setDisplayZoneViolations(zones || []);
      })
      .catch((err) => console.error("❌ Zone refetch failed", err));
    //fetch zone violations
    fetchRecent({ tenantId: "c2bf4995e1bf3ce1" })
      .unwrap()
      .then((res) => {
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
      console.log(
        "📡 Socket Event received:",
        socketData.data?.ppe_kit_detection_id,
        "timestamp:",
        Date.now()
      );
      // Create unique event ID to prevent duplicates
      const eventId = `${socketData.data?.id || "unknown"}-${
        socketData.serverTimestamp || Date.now()
      }`;

      // Skip if already processed
      if (processedEvents.current.has(eventId)) {
        console.log("🚫 Skipping duplicate event:", eventId, socketData);
        return;
      }

      processedEvents.current.add(eventId);

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
        console.timeEnd("DisplayKpiUpdate"); // <--- ADD THIS
      });

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
    [scheduleRefetch, isLiveMode]
  );

  //api call on the timefilter selection
  const fetchAllWithTime = useCallback(
    (range: { start: string; end: string }) => {
      const payload = {
        tenantId: "c2bf4995e1bf3ce1",
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

  const socketHandlers = useMemo(
    () => ({
      "ppekit-detection-data": handleNewPPEDetection,
    }),
    [handleNewPPEDetection]
  );

  useSocketListeners(socketHandlers);

  // ✅ Initial fetch on mount
  useEffect(() => {
    fetchKpi({ tenantId: "c2bf4995e1bf3ce1" });
    fetchZoneViolations({ tenantId: "c2bf4995e1bf3ce1" });
    fetchDetailedReport({
      tenantId: "c2bf4995e1bf3ce1",
    });
    fetchRecent({ tenantId: "c2bf4995e1bf3ce1" });
  }, [fetchKpi, fetchZoneViolations, fetchDetailedReport, fetchRecent]);

  // ✅ Cleanup on unmount
  useEffect(() => {
    const timeoutId = refetchTimeoutRef.current;

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
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
    const iconMap: Record<string, SvgIconComponent> = {
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

  const handleSubmitFilter = useCallback(
    async (filters: FilterParams) => {
      console.log("filter params", filters);

      const body = {
        tenantId: "c2bf4995e1bf3ce1",

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
    },
    [fetchDetailedReport, formatLocalDateTime] // ✅ add only what is used
  );

  const handleReset = useCallback(() => {
    console.log("reset button clicked");

    fetchDetailedReport({
      tenantId: "c2bf4995e1bf3ce1",
    });
  }, [fetchDetailedReport]);

  const handleExport = useCallback(
    async (format: "csv" | "pdf", filters: FilterParams) => {
      try {
        const payload = {
          tenantId: "c2bf4995e1bf3ce1",

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
          tenantId: "c2bf4995e1bf3ce1",
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

        options: detailedReport?.zones || [],
      },
      {
        id: "cameraId",
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
    (format: "csv" | "pdf", filters: FilterParams) =>
      handleExport(format, filters),
    [handleExport]
  );

  const memoizedHandleDownloadSingle = useCallback(
    (row: PPEViolation) => handleDownloadSingle(row),
    [handleDownloadSingle]
  );

  const memoizedHandleViewSingle = useCallback(
    (row: PPEViolation) => handleViewSingle(row),
    [handleViewSingle]
  );

  const handleDownloadViolation = async (url: string, violation: Violation) => {
    if (!violation) return;
    const ppeViolation = violation as PPEViolation;
    try {
      const payload = {
        tenantId: "c2bf4995e1bf3ce1",
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

                fetchKpi({ tenantId: "c2bf4995e1bf3ce1" });
                fetchZoneViolations({ tenantId: "c2bf4995e1bf3ce1" });
                fetchRecent({ tenantId: "c2bf4995e1bf3ce1" });

                return;
              }

              console.log("Custom Time Selected:", range);
              setIsLiveMode(false);

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
              onDownload={handleDownloadViolation}
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
        onDownload={(row) => memoizedHandleDownloadSingle(row as PPEViolation)}
        onView={(row) => memoizedHandleViewSingle(row as PPEViolation)}
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
