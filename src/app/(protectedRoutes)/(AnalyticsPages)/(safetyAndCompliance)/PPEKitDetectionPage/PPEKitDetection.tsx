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
import { FilterParams, KpiItem, PPEKpi } from "./PPEKitDetection.types";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLazyGetPPEKitDetectionKpiDataQuery } from "./PPEKitDetectionApi";
import { ppeKpiConfig } from "./PPEKitDetectionConfig";
import { useSocketListeners } from "@/hooks/useSocketListeners";

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

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<PPEViolation | null>(null);
  const [fetchKpi, { data: kpiData, isLoading }] =
    useLazyGetPPEKitDetectionKpiDataQuery();

  // ✅ Single source of truth for KPI data
  const [displayKpi, setDisplayKpi] = useState<KpiItem[] | null>(null);

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

  // ✅ Debounced refetch with version control
  const scheduleRefetch = useCallback(() => {
    // Clear existing timeout
    if (refetchTimeoutRef.current) {
      clearTimeout(refetchTimeoutRef.current);
    }

    // Schedule refetch after 500ms of inactivity
    // refetchTimeoutRef.current = setTimeout(() => {
    //   console.log("🔄 Triggering backend refetch...");

    // }, 500);
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
  }, [fetchKpi]);

  //  Optimistic update handler with deduplication and batching
  const handleNewPPEDetection = useCallback(
    (socketData: any) => {
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

      // Cleanup old entries (keep last 100)
      if (processedEvents.current.size > 100) {
        const entries = Array.from(processedEvents.current);
        processedEvents.current = new Set(entries.slice(-100));
      }

      // ✅ Schedule background sync
      scheduleRefetch();
    },
    [scheduleRefetch]
  );

  // ✅ Setup socket listeners
  useSocketListeners({
    "ppe_kit_detection-INSERT": handleNewPPEDetection,
  });

  // ✅ Initial fetch on mount
  useEffect(() => {
    fetchKpi({ tenantId: "34769771e3da8efb" });
  }, [fetchKpi]);

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

  // ✅ Memoize KPI data to prevent unnecessary re-renders
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

  const backendData = [
    {
      id: 101,
      helmet: true,
      vest: true,
      glasses: false,
      zone: "Production Floor A",
      snapshot: "https://picsum.photos/400/200?random=1",
      cameraid: "CAM-01",
      alarmTriggered: true,
      createdAt: "2025-09-23 15:42",
    },
    {
      id: 102,
      helmet: true,
      vest: true,
      glasses: false,
      zone: "Welding Station",
      snapshot: "https://picsum.photos/400/200?random=2",
      cameraid: "CAM-02",
      alarmTriggered: true,
      createdAt: "2025-09-23 15:28",
    },
    {
      id: 103,
      helmet: true,
      vest: true,
      glasses: false,
      zone: "Chemical Storage",
      snapshot: "https://picsum.photos/400/200?random=3",
      cameraid: "CAM-03",
      alarmTriggered: true,
      createdAt: "2025-09-23 15:15",
    },
    {
      id: 104,
      helmet: true,
      vest: true,
      glasses: false,
      zone: "Assembly Line B",
      snapshot: "https://picsum.photos/400/200?random=4",
      cameraid: "CAM-04",
      alarmTriggered: false,
      createdAt: "2025-09-23 14:58",
    },
    {
      id: 105,
      helmet: false,
      vest: false,
      glasses: true,
      zone: "Maintenance Area",
      snapshot: "https://picsum.photos/400/200?random=5",
      cameraid: "CAM-05",
      alarmTriggered: true,
      createdAt: "2025-09-23 14:32",
    },
  ];

  const recentViolations = backendData.map((item) => {
    const titleParts = [];

    if (item.helmet === false) titleParts.push("Hard hat missing");
    if (item.vest === false) titleParts.push("Safety vest not worn");
    if (item.glasses === false) titleParts.push("Safety glasses missing");

    return {
      voilation: titleParts.join(", ") || "No violation",
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.cameraid,
      alarmTriggered: item.alarmTriggered,
    };
  });

  const zoneViolationsData = [
    {
      zone: "Production Floor A",
      violations: 8,
      subViolations: [
        { label: "Helmet", value: 3, icon: EngineeringIcon },
        { label: "Vest", value: 2, icon: CheckroomIcon },
        { label: "Glasses", value: 3, icon: VisibilityOffIcon },
      ],
    },
    {
      zone: "Welding Station",
      violations: 6,
      subViolations: [
        { label: "Helmet", value: 4, icon: EngineeringIcon },
        { label: "Glasses", value: 2, icon: VisibilityOffIcon },
      ],
    },
    {
      zone: "Chemical Storage",
      violations: 5,
      subViolations: [
        { label: "Vest", value: 2, icon: CheckroomIcon },
        { label: "Glasses", value: 3, icon: VisibilityOffIcon },
      ],
    },
    {
      zone: "Assembly Line B",
      violations: 7,
      subViolations: [
        { label: "Helmet", value: 2, icon: EngineeringIcon },
        { label: "Vest", value: 3, icon: CheckroomIcon },
        { label: "Glasses", value: 2, icon: VisibilityOffIcon },
      ],
    },
    {
      zone: "Warehouse",
      violations: 4,
      subViolations: [
        { label: "Helmet", value: 1, icon: EngineeringIcon },
        { label: "Vest", value: 2, icon: CheckroomIcon },
        { label: "Glasses", value: 1, icon: VisibilityOffIcon },
      ],
    },
    {
      zone: "Maintenance Area",
      violations: 9,
      subViolations: [
        { label: "Helmet", value: 4, icon: EngineeringIcon },
        { label: "Vest", value: 3, icon: CheckroomIcon },
        { label: "Glasses", value: 2, icon: VisibilityOffIcon },
      ],
    },
  ];

  const handleSubmitFilter = async (filters: FilterParams) => {
    console.log("Selected Filters:", filters);
  };

  const handleReset = () => {
    console.log("reset button clicked");
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

          <TimeFilter />
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
              violations={recentViolations}
              loading={false}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              violationsZone={zoneViolationsData}
              loading={false}
              tooltipMessage="Shows PPE violations per zone"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* PPE Violations Report */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
        columns={[
          { id: "voilation", label: "Violation" },
          { id: "time", label: "Time" },
          { id: "zone", label: "Zone" },
          { id: "cameraId", label: "Cameras" },
          { id: "alarmTriggered", label: "Alarm Triggered" },
        ]}
        data={recentViolations}
        filters={[
          {
            id: "voilation",
            label: "Violation",
            type: "select",
            options: [
              "Hard hat missing",
              "Safety vest not worn",
              "Safety glasses missing",
            ],
          },
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(new Set(recentViolations.map((v) => v.zone))),
          },
          {
            id: "cameraId",
            label: "Cameras",
            type: "select",
            options: Array.from(
              new Set(recentViolations.map((v) => v.cameraId))
            ),
          },
          {
            id: "alarmTriggered",
            label: "Alarm Triggered",
            type: "select",
            options: ["True", "False"],
          },
          { id: "time", label: "Start Date", type: "date" },
          { id: "time", label: "End Date", type: "date" },
        ]}
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        onDownload={handleDownloadSingle}
        onView={handleViewSingle}
        downloadFileName="ppe-violations-report"
        loading={false}
      />

      <ViewAlertPopup
        open={viewPopupOpen}
        handleClose={() => setViewPopupOpen(false)}
        details={viewPopupData}
        imageKey="imageUrl"
        onDownload={(url) => console.log("Download:", url)}
      />
    </Box>
  );
};

export default PPEDetection;
