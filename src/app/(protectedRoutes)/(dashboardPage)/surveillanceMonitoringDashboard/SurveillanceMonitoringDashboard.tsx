"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCardOld";
import DashboardTabs, {
  TabConfig,
} from "@/app/components/organisms/DashboardTabs/DashboardTabs";

import EngineeringIcon from "@mui/icons-material/Engineering";
import DynamicPieChart from "@/app/components/organisms/PieChart/PieChart";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  useGetOrgShiftTimeSurveillanceDataQuery,
  useLazyGetSurveillanceMonitoringDashboardKpiDataQuery,
} from "./SurveillanceMonitoringDashboardApi";
import { surveillanceDashboardConfig } from "./SurveillanceMonitoringDashboardConfig";

import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import {
  
  SurveillanceDashboardResponse,
  SurveillanceSocketPayload,
  TrendResponse,
} from "./SurveillanceMonitoringDashboard.types";
import { useSocketEvent } from "@/customhooks/useSocketEvent";
import { SOCKET_EVENTS } from "@/sockets/socket.events";
import { FEATURE } from "@/app/config/featureRegistry";
import Loader from "@/app/components/atoms/Loader/Loader";
import TimeScaleLineChart from "@/app/components/organisms/TimeScaleLineChart/TimeScaleLineChart";




const SurveillanceMonitoring: React.FC = () => {
  const { t } = useTranslation();
  const { user, features } = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";

  /* ---------- STATE ---------- */
  const [isLiveMode, setIsLiveMode] = useState(true);

  const [displaySurveillanceKpi, setDisplaySurveillanceKpi] = useState<
    SurveillanceDashboardResponse[]
  >([]);

  /* ---------- API HOOKS ---------- */

  const { data: orgShifts } = useGetOrgShiftTimeSurveillanceDataQuery(
    { tenantId },
    { skip: !tenantId },
  );
  const [fetchSurveillanceKpi, { isFetching: SurveillancekpiLoading }] =
    useLazyGetSurveillanceMonitoringDashboardKpiDataQuery();
  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    if (!tenantId) return;
    const load = async () => {
      const kpi = await fetchSurveillanceKpi({ tenantId }).unwrap();
      setDisplaySurveillanceKpi(kpi ?? []);
    };

    load();
  }, [tenantId]);
  console.log("displaySurveillanceKpi", displaySurveillanceKpi);

  /* ---------- SOCKET (LIVE ONLY) ---------- */

  useSocketEvent<SurveillanceSocketPayload>({
    tenantId,
    enabled: isLiveMode,
    event: SOCKET_EVENTS.SURVEILLANCE_UPDATE,
    handler: (payload) => {
      console.log("📡 Surveillance socket payload:", payload);

      // Safety check
      if (!payload?.data) return;

      // Update full dashboard (KPI + graphs)
      setDisplaySurveillanceKpi(payload.data);
    },
  });

  /* ---------- TIME FILTER ---------- */
  const handleTimeRangeChange = useCallback(
    async (range: { start?: string; end?: string }) => {
      if (!range.start && !range.end) {
        setIsLiveMode(true);
        const res = await fetchSurveillanceKpi({ tenantId }).unwrap();
        setDisplaySurveillanceKpi(res ?? []);
        return;
      }

      setIsLiveMode(false);
      const payload = {
        tenantId: tenantId,
        startDate: range.start,
        endDate: range.end,
      };
      const kpi = await fetchSurveillanceKpi(payload).unwrap();
      setDisplaySurveillanceKpi(kpi ?? []);
    },
    [tenantId, fetchSurveillanceKpi],
  );

  const surveillanceKpiData = useMemo(() => {
    return displaySurveillanceKpi.map((item) => {
      const config = surveillanceDashboardConfig[item.title];

      return {
        title: t(item.kpi.title),
        colour: item.kpi.colour,
        violationsCount: item.kpi.violationsCount || 0,
        lastDetection: item.kpi.lastDetection || "-",
        lastDetectionTime: item.kpi.lastDetectionTime || "-",
        icon: config?.icon || EngineeringIcon,
        route: config?.route || "/",
        tooltipMessage: config?.tooltipMessage || "",
      };
    });
  }, [displaySurveillanceKpi, t]);

  const intrusionDashboard = displaySurveillanceKpi.find(
    (d) => d.title === "Intrusion Detection",
  );
  const cameraTamperingDashboard = displaySurveillanceKpi.find(
  (d) => d.title === "Camera Tampering Detection",
);
  const unauthorizedDashboard = displaySurveillanceKpi.find(
    (d) => d.title === "Unauthorized Access In Restricted Areas",
  );

  const movementDashboard = displaySurveillanceKpi.find(
    (d) => d.title === "Movement During Shutdown",
  );
// inside SurveillanceMonitoring component, near top

function toTimeScaleProps(data: TrendResponse) {
  const firstSeries = data.series[0]?.data ?? [];

  // X-axis labels come from the first zone's data array (all zones share same buckets)
  const xAxisDates = firstSeries.map((p) => p.date ?? "");
  const xAxisTimes = firstSeries.map((p) => p.time ?? p.day ?? "");

  // Each zone becomes one line series
  const series = data.series.map((z) => ({
    label:    z.zone,
    color:    z.color,
    data:     z.data.map((p) => p.count),
    showMark: false,
  }));

  return { xAxisDates, xAxisTimes, series };
}
// Intrusion
const intrusionGraphData =
  intrusionDashboard?.graphs?.data &&
  !Array.isArray(intrusionDashboard.graphs.data) &&
  "series" in intrusionDashboard.graphs.data
    ? (intrusionDashboard.graphs.data as TrendResponse)
    : undefined;

// Movement During Shutdown
const movementGraphData =
  movementDashboard?.graphs?.data &&
  !Array.isArray(movementDashboard.graphs.data) &&
  "series" in movementDashboard.graphs.data
    ? (movementDashboard.graphs.data as TrendResponse)
    : undefined;

//camera tampering pie chart 
const onlinePieData =
  cameraTamperingDashboard?.graphs?.pieCharts?.onlineCameras?.map(
    (item: any) => ({
      label: item.zone,
      value: item.count,
  color: item.color || "#999999",    }),
  ) || [];

const offlinePieData =
  cameraTamperingDashboard?.graphs?.pieCharts?.offlineCameras?.map(
    (item: any) => ({
      label: item.zone,
      value: item.count,
  color: item.color || "#999999",    }),
  ) || [];

const tamperedPieData =
  cameraTamperingDashboard?.graphs?.pieCharts?.tamperedCameras?.map(
    (item: any) => ({
      label: item.zone,
      value: item.count,
  color: item.color || "#999999",    }),
  ) || [];

  console.log("cameraTamperingDashboard", cameraTamperingDashboard);
console.log("onlinePieData", onlinePieData);
console.log("offlinePieData", offlinePieData);
console.log("tamperedPieData", tamperedPieData);
// Unauthorized Access
const unauthorizedGraphData =
  unauthorizedDashboard?.graphs?.data &&
  !Array.isArray(unauthorizedDashboard.graphs.data) &&
  "series" in unauthorizedDashboard.graphs.data
    ? (unauthorizedDashboard.graphs.data as TrendResponse)
    : undefined;
const renderChart = () => {
  if (SurveillancekpiLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!intrusionGraphData) {
    return null;
  }

  const chartProps = toTimeScaleProps(intrusionGraphData);

  return (
    <TimeScaleLineChart
      granularity={intrusionGraphData.granularity}
      {...chartProps}
      series={chartProps.series.map((s) => ({
        ...s,
        showMark: true,
      }))}
    />
  );
};
const renderMovementChart = () => {
  if (SurveillancekpiLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!movementGraphData) {
    return null;
  }

  const chartProps = toTimeScaleProps(movementGraphData);

  return (
    <TimeScaleLineChart
      granularity={movementGraphData.granularity}
      {...chartProps}
      series={chartProps.series.map((s) => ({
        ...s,
        showMark: true,
      }))}
    />
  );
};
const renderUnauthorizedChart = () => {
  if (SurveillancekpiLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </Box>
    );
  }

  if (!unauthorizedGraphData) {
    return null;
  }

  const chartProps = toTimeScaleProps(unauthorizedGraphData);

  return (
    <TimeScaleLineChart
      granularity={unauthorizedGraphData.granularity}
      {...chartProps}
      series={chartProps.series.map((s) => ({
        ...s,
        showMark: true,
      }))}
    />
  );
};
  const tabs: TabConfig[] = [
    {
      label: "Intrusion Detection",
      content: (
        <Grid
          container
          sx={{
            alignItems: "stretch",
            height: "100%",
          }}
        >
          {/* Left side */}
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
          >
        
      {renderChart()}
          </Grid>
        </Grid>
      ),
      featureId: FEATURE.INTRUSION_DETECTION,
    },
    {
      label: "Movement During shutdown",
      content: (
        <Grid
          container
          sx={{
            alignItems: "stretch",
            height: "100%",
          }}
        >
          {/* Left side */}
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
               height: { xs: "50vh", md: "100%" },

              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
            padding={{ xs: "10px" }}
          >
      
{renderMovementChart()}
          </Grid>
        </Grid>
      ),
      featureId: FEATURE.MOVEMENT_DURING_SHUTDOWN_HOUR,
    },
    {
      label: "Camera Tampering Detection",
      content: (
        <Grid
          container
          spacing={1}
          sx={{
            alignItems: "stretch",
            height: "100%",
            width: "100%",
          }}
        >
          {/* 3 Pie charts side by side on desktop, stacked on mobile */}
          {[
            {
              title: "Online Cameras by Zone",
              data: onlinePieData
            },
            {
              title: "Offline Cameras by Zone",
              data: offlinePieData
            },
            {
              title: "Tampered Cameras by Zone",
              data: tamperedPieData
            },
          ].map((chart, index) => (
            <Grid
              key={index + 1}
              size={{ xs: 12, md: 4 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // ✅ Responsive height control
                height: { xs: "auto", md: "100%" },
                minHeight: { xs: 250, md: "auto" },
                width: "100%",
              }}
            >
              <DynamicPieChart
                data={chart.data}
                carttitle={chart.title}
              />
   

            </Grid>
          ))}
        </Grid>
      ),
      featureId: FEATURE.CAMERA_TAMPERING,
    },

    {
      label: "Unauthorized Access ",
      content: (
        <Grid
          container
          sx={{
            alignItems: "stretch",
            height: "100%",
          }}
        >
          {/* Left side */}
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
          >
       {renderUnauthorizedChart()}
          </Grid>
        </Grid>
      ),
      
      featureId: FEATURE.UNAUTHORIZED_ACCESS,
    },
  ];

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: 2,
        px: 3,
        backgroundColor: "#ffffff",
        borderRadius: 2,
        flex: 1,
        // minHeight: 0,
        minHeight: { xs: "auto", sm: "auto", md: 0 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        {/* Right: Time Filter */}
        <TimeFilter
          onRangeChange={handleTimeRangeChange}
          shifts={orgShifts || []}
        />
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {SurveillancekpiLoading || !displaySurveillanceKpi.length
          ? Array.from({ length: 4 }).map((_, index) => (
              <Grid
                key={index + 1}
                size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
              >
                <KpiCardSkeleton />
              </Grid>
            ))
          : surveillanceKpiData.map((kpi) => (
              <Grid
                key={kpi.title}
                size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
              >
                <DashboardKpiCard {...kpi} />
              </Grid>
            ))}
      </Grid>

      {/* Tabs Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          //  minHeight: 0,
          minHeight: { xs: "500px", sm: "600px", md: 0 },
        }}
      >
        <DashboardTabs tabs={tabs} features={features} />
      </Box>
    </Paper>
  );
};

export default SurveillanceMonitoring;
