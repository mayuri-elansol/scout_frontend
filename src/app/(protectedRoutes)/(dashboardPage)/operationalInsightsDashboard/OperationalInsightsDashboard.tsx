


"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCardOld";
import DashboardTabs, { TabConfig } from "@/app/components/organisms/DashboardTabs/DashboardTabs";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import TimeLineAreaChart from "@/app/components/organisms/TimeScaleLineChart/TimeScaleLineChart"; // same chart WorkforceMonitoring uses
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { FEATURE } from "@/app/config/featureRegistry";
import { SOCKET_EVENTS } from "@/sockets/socket.events";
import { useSocketEvent } from "@/customhooks/useSocketEvent";
import { OperationalInsightsConfig } from "./OperationalInsightsDashboardConfig";
import {
  OperationalInsightsDashboardResponse,
  OperationalInsightsSocketPayload,
  PeopleInsideGraphData,
  CanteenGraphData,
} from "./OperationalInsightsDashboard.types";
import {
  useGetOrgShiftTimeDataQuery,
  useLazyGetOperationalDashboardDataQuery,
} from "./OperationalInsightsDashboardApi";
import Loader from "@/app/components/atoms/Loader/Loader";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Mirrors buildCriticalAreaProps from WorkforceMonitoring — People Inside has
// the same { granularity, series[{ zone, color, data[{ date, time, entryCount, exitCount }] }] } shape
function buildPeopleInsideProps(dashboardData: OperationalInsightsDashboardResponse[]) {
  const usecase = dashboardData.find((d) => d.title === "People Inside");
  const graphData = usecase?.graphs?.data ;

  const rawData = graphData?.series[0]?.data ?? [];

  const series = [
    {
      label: "Entry Count",
        color: "#93C4F5", // pastel blue

      showMark: false,
      data: rawData.map((p) => p.entryCount),
    },
    {
      label: "Exit Count",
    color: "#F5A693", // pastel orange

      showMark: false,
      data: rawData.map((p) => p.exitCount),
    },
  ];

  const xAxisDates = rawData.map((p) => p.date);
  const xAxisTimes = rawData.map((p) => p.time);
  const granularity: PeopleInsideGraphData["granularity"] = graphData?.granularity ?? "hour";

  return { series, xAxisDates, xAxisTimes, granularity };
}
// Canteen Usage Monitoring returns the same envelope shape as People Inside —
// { granularity, series[{ data[{ date, time, breakfastCount, lunchCount, dinnerCount }] }] } —
// just with meal-type counts instead of entry/exit counts, so it reuses TimeLineAreaChart directly.
function buildCanteenInsideProps(dashboardData: OperationalInsightsDashboardResponse[]) {
  const usecase = dashboardData.find((d) => d.title === "Canteen Usage Monitoring");
  const graphData = usecase?.graphs?.data as CanteenGraphData | undefined;
 
  const rawData = graphData?.series?.[0]?.data ?? [];
 
  const series = [
    {
      label: "Breakfast",
      color: "#F5C893", // pastel yellow/orange
      showMark: false,
      data: rawData.map((p) => p.breakfastCount),
    },
    {
      label: "Lunch",
      color: "#93C4F5", // pastel blue
      showMark: false,
      data: rawData.map((p) => p.lunchCount),
    },
    {
      label: "Dinner",
      color: "#C893F5", // pastel purple
      showMark: false,
      data: rawData.map((p) => p.dinnerCount),
    },
  ];
 
  const xAxisDates = rawData.map((p) => p.date);
  const xAxisTimes = rawData.map((p) => p.time);
  const granularity: CanteenGraphData["granularity"] = graphData?.granularity ?? "hour";
 
  return { series, xAxisDates, xAxisTimes, granularity };
}
 

// ─── Component ────────────────────────────────────────────────────────────────
const OperationalInsightsDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user, features } = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";

  const [isLiveMode, setIsLiveMode] = useState(true);
  const [dashboardData, setDashboardData] = useState<OperationalInsightsDashboardResponse[]>([]);

  // ── API ──────────────────────────────────────────────────────────────────
  const { data: orgShifts } = useGetOrgShiftTimeDataQuery(
    { tenantId },
    { skip: !tenantId }
  );

  const [fetchOperationalKpi, { isFetching: operationalKpiLoading }] =
    useLazyGetOperationalDashboardDataQuery();

  // ── Initial load ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!tenantId) return;
    fetchOperationalKpi({ tenantId })
      .unwrap()
      .then((data) => setDashboardData(data ?? []))
      .catch(console.error);
  }, [tenantId, fetchOperationalKpi]);

  // ── Socket (live mode) ────────────────────────────────────────────────────
  useSocketEvent<OperationalInsightsSocketPayload>({
    tenantId,
    enabled: isLiveMode,
    event: SOCKET_EVENTS.OPERATIONAL_INSIGHTS_UPDATE,
    handler: (payload) => {
      if (!payload?.data) return;
      setDashboardData(payload.data);
    },
  });

  // ── Time filter ───────────────────────────────────────────────────────────
  const handleTimeRangeChange = useCallback(
    async (range: { start?: string; end?: string }) => {
      if (!range.start && !range.end) {
        setIsLiveMode(true);
        const res = await fetchOperationalKpi({ tenantId }).unwrap();
        setDashboardData(res ?? []);
        return;
      }
      setIsLiveMode(false);
      const data = await fetchOperationalKpi({
        tenantId,
        startDate: range.start,
        endDate: range.end,
      }).unwrap();
      setDashboardData(data ?? []);
    },
    [tenantId, fetchOperationalKpi]
  );

  // ── Derived data ──────────────────────────────────────────────────────────
  const operationalKpiData = useMemo(
    () =>
      dashboardData.map((item) => {
        const config = OperationalInsightsConfig[item.title];
        return {
          title: t(item.kpi.title),
          colour: item.kpi.colour,
          violationsCount: item.kpi.violationsCount || 0,
          lastDetection: item.kpi.lastDetection || "-",
          lastDetectionTime: item.kpi.lastDetectionTime || "-",
          icon: config?.icon,
          route: config?.route || "/",
          tooltipMessage: config?.tooltipMessage || "",
        };
      }),
    [dashboardData, t]
  );

  const peopleInsideProps = useMemo(() => buildPeopleInsideProps(dashboardData), [dashboardData]);
const canteenInsideProps = useMemo(() => buildCanteenInsideProps(dashboardData), [dashboardData]);
  // ── Tabs ──────────────────────────────────────────────────────────────────
  const tabs: TabConfig[] = [
    {
      label: "People Count",
      featureId: FEATURE.PEOPLE_COUNT,
      content: (
        <Grid container sx={{ alignItems: "stretch", height: "100%" }}>
          <Grid size={{ xs: 12 }} sx={{ display: "flex", height: { xs: "50vh", md: "100%" }, width: "100%" }} padding={{ xs: "10px" }}>
            {operationalKpiLoading ? (
              <Loader />
            ) : (
              <TimeLineAreaChart {...peopleInsideProps} />
            )}
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Vehicle Count & ANPR",
      featureId: FEATURE.VEHICLE_COUNT,
      content: (
        <Grid container sx={{ alignItems: "stretch", height: "100%" }}>
          <Grid size={{ xs: 12 }} sx={{ display: "flex", height: { xs: "50vh", md: "100%" }, width: "100%" }}>
            {operationalKpiLoading ? (
              <CircularProgress />
            ) : (
              // <JointBarGraphChart
              //   times={vehicleCountData.times}
              //   seriesData={vehicleCountData.series}
              // />
              <Typography >No data available</Typography>
            )}
            
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Canteen Usage",
      featureId: FEATURE.CANTEEN_USAGE,
      content: (
        <Grid container sx={{ alignItems: "stretch", height: "100%" }}>
          <Grid size={{ xs: 12 }} sx={{ display: "flex", height: { xs: "50vh", md: "100%" }, width: "100%" }}>
             {operationalKpiLoading ? (
              <Loader />
            ) : (
              <TimeLineAreaChart {...canteenInsideProps} />
            )}
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Vehicle Monitoring",
      featureId: FEATURE.VEHICLE_UNLOADING_LOADING,
      content: (
        <Grid container sx={{ alignItems: "stretch", height: "100%" }}>
          <Grid size={{ xs: 12 }} sx={{ display: "flex", height: { xs: "50vh", md: "100%" }, width: "100%" }}>
        
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Unauthorized Parking",
      featureId: FEATURE.UNAUTHORIZED_PARKING,
      content: (
        <Grid container sx={{ alignItems: "stretch", height: "100%" }}>
          <Grid size={{ xs: 12 }} sx={{ display: "flex", height: { xs: "50vh", md: "100%" }, width: "100%" }}>
            {/* Wire up DynamicViolationScatterChart once the parking data shape is confirmed */}
            {/* <DynamicViolationScatterChart data={parkingData} /> */}
          </Grid>
        </Grid>
      ),
    },
  ];

  // ── Render ────────────────────────────────────────────────────────────────
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
        <TimeFilter
          onRangeChange={handleTimeRangeChange}
          shifts={orgShifts || []}
        />
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {operationalKpiLoading || !dashboardData.length
          ? Array.from({ length: 5 }).map((_, i) => (
              <Grid key={`skeleton-${i + 1}`} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                <KpiCardSkeleton />
              </Grid>
            ))
          : operationalKpiData.map((kpi) => (
              <Grid key={kpi.title} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                <DashboardKpiCard {...kpi} />
              </Grid>
            ))}
      </Grid>

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <DashboardTabs tabs={tabs} features={features} />
      </Box>
    </Paper>
  );
};

export default OperationalInsightsDashboard;
