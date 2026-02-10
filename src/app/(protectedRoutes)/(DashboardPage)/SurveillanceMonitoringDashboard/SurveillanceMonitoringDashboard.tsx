
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { People, Security, VideocamOff } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";
import DashboardTabs, {
  TabConfig,
} from "@/app/components/organisms/DashboardTabs/DashboardTabs";

import EngineeringIcon from "@mui/icons-material/Engineering";
import DynamicViolationScatterChart, {
  ViolationData,
} from "@/app/components/organisms/ScatterChart/ScatterChart";
import DynamicPieChart from "@/app/components/organisms/PieChart/PieChart";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useLazyGetSurveillanceMonitoringDashboardKpiDataQuery } from "./SurveillanceMonitoringDashboardApi";
import { surveillanceDashboardConfig } from "./SurveillanceMonitoringDashboardConfig";

import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import {
  IntrusionTrendResponse,
  SurveillanceDashboardResponse,
} from "./SurveillanceMonitoringDashboard.types";

const SurveillanceMonitoring: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";

  /* ---------- STATE ---------- */
  const [isLiveMode, setIsLiveMode] = useState(true);

  const [displaySurveillanceKpi, setDisplaySurveillanceKpi] = useState<
    SurveillanceDashboardResponse[]
  >([]);

  /* ---------- API HOOKS ---------- */
  const [fetchSurveillanceKpi, { isLoading: SurveillancekpiLoading }] =
    useLazyGetSurveillanceMonitoringDashboardKpiDataQuery();
  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    const load = async () => {
      const [kpi] = await Promise.all([
        fetchSurveillanceKpi({ tenantId }).unwrap(),
      ]);

      setDisplaySurveillanceKpi(kpi ?? []);
    };

    load().catch(console.error);
  }, [tenantId, fetchSurveillanceKpi]);

  console.log("displaySurveillanceKpi", displaySurveillanceKpi);


  /* ---------- TIME FILTER ---------- */
  const handleTimeRangeChange = useCallback(
    async (range: { start?: string; end?: string }) => {
      if (!range.start && !range.end) {
        setIsLiveMode(true);
        fetchSurveillanceKpi({ tenantId });
        return;
      }

      setIsLiveMode(false);
      const payload = {
        tenantId: tenantId,
        startDate: range.start,
        endDate: range.end,
      };
      const [kpi] = await Promise.all([fetchSurveillanceKpi(payload).unwrap()]);

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

  console.log("surveillanceKpiData", surveillanceKpiData);

  // const buildScatterData = (graph?: IntrusionTrendResponse) => {
  //   if (!graph) return [];

  //   return graph.series.flatMap((series) =>
  //     series.data.map((point) => ({
  //       time: `${point.label}:00`, 
  //       zone: series.zone,
  //       count: point.count,
  //     })),
  //   );
  // };
const buildScatterData = (graph?: IntrusionTrendResponse) => {
  if (!graph) return [];

  return graph.series.flatMap((series) =>
    series.data
      .filter((point) => point.count > 0) // ✅ Filter zeros HERE
      .map((point) => ({
        time: `${point.label}:00`,
        zone: series.zone,
        count: point.count,
      })),
  );
};
  const intrusionDashboard = displaySurveillanceKpi.find(
    (d) => d.title === "Intrusion Detection",
  );

  const intrusionScatterData = useMemo(
    () => buildScatterData(intrusionDashboard?.graphs.data),
    [intrusionDashboard],
  );

  console.log("intrusionScatterData", intrusionScatterData);
  // const kpiData: SurveillanceKpiData[] = [
  //   {
  //     title: "Intrusion Detection",
  //     violationsCount: 3,
  //     lastDetection: "Zone B - Gate 2",
  //     lastDetectionTime: "02:15 AM",
  //     icon: Security,
  //     route: "/IntrusionDetectionPage",
  //     tooltipMessage:
  //       "Shows detected intrusion incidents in monitored zones during restricted hours.",
  //     colour: "red",
  //   },
  //   {
  //     title: "Unauthorized Access In Restrcited Areas",
  //     violationsCount: 4,
  //     lastDetection: "Zone C",
  //     lastDetectionTime: "3:10 AM",
  //     icon: People,
  //     route: "/UnauthorizedAccessInRestrictedAreas",
  //     tooltipMessage: "Displays unauthorized acess in restricted ares.",
  //     colour: "gray",
  //   },
  //   {
  //     title: "Camera Tempering Detection",
  //     violationsCount: 2,
  //     lastDetection: "Zone C",
  //     lastDetectionTime: "2:42 PM",
  //     icon: VideocamOff,
  //     route: "/CameraTampering",
  //     tooltipMessage:
  //       "Displays people detected inside premises during shutdown hours.",
  //     colour: "red",
  //   },
  //   {
  //     title: "Movement During Shutdown",
  //     violationsCount: 2,
  //     lastDetection: "Warehouse Zone 4",
  //     lastDetectionTime: "01:45 AM",
  //     icon: People,
  //     route: "/PeoplePresence",
  //     tooltipMessage:
  //       "Displays people detected inside premises during shutdown hours.",
  //     colour: "red",
  //   },
  // ];

  const violationData: ViolationData[] = [];
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
            {/* <DynamicViolationScatterChart data={intrusionScatterData} />, */}
             <DynamicViolationScatterChart 
            key="intrusion-chart"  // ✅ Add unique key
            data={intrusionScatterData} 
            title="Intrusion Detection Trends"
          />
          </Grid>
        </Grid>
      ),
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
            <DynamicViolationScatterChart data={violationData} />,
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Camera Tempering Detection",
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
              data: [
                // { label: "Zone A", value: 12, color: "#A8E6CF" },
                // { label: "Zone B", value: 5, color: "#ffcdd2" },
                // { label: "Zone C", value: 2, color: "#FFEAA7" },
              ],
            },
            {
              title: "Offline Cameras by Zone",
              data: [
                // { label: "Zone A", value: 20, color: "#A8E6CF" },
                // { label: "Zone B", value: 3, color: "#ffcdd2" },
                // { label: "Zone C", value: 1, color: "#FFEAA7" },
              ],
            },
            {
              title: "Tampered Cameras by Zone",
              data: [
                // { label: "Zone A", value: 20, color: "#A8E6CF" },
                // { label: "Zone B", value: 3, color: "#ffcdd2" },
                // { label: "Zone C", value: 1, color: "#FFEAA7" },
              ],
            },
          ].map((chart, index) => (
            <Grid
              key={index + 1}
              size={{ xs: 12, md: 4 }} // ✅ full width on mobile, 3 columns on desktop
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
                count={2.5}
                carttitle={chart.title}
              />
            </Grid>
          ))}
        </Grid>
      ),
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
            <DynamicViolationScatterChart data={violationData} />,
          </Grid>
        </Grid>
      ),
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
        <TimeFilter onRangeChange={handleTimeRangeChange} />
      </Box>

      {/* KPI Cards Grid */}
      {/* <Grid container spacing={1.5} sx={{ mb: 1 }} alignItems="stretch">
        {surveillanceKpiData.map((kpi, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
            key={uuidv4() + index}
          >
            <DashboardKpiCard {...kpi} />
          </Grid>
        ))}
      </Grid> */}

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {SurveillancekpiLoading
          ? Array.from({ length: 4 }).map(() => (
              <Grid
                key={uuidv4()}
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
        <DashboardTabs tabs={tabs} />
      </Box>
    </Paper>
  );
};

export default SurveillanceMonitoring;

