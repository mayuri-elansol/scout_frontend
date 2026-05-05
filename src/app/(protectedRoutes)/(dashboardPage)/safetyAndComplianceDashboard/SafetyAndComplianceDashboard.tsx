"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";

import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardTabs, {
  TabConfig,
} from "@/app/components/organisms/DashboardTabs/DashboardTabs";

import EngineeringIcon from "@mui/icons-material/Engineering";
import DynamicBarChart from "@/app/components/organisms/BarChart/BarChart";
import DynamicPieChart from "@/app/components/organisms/PieChart/PieChart";
import DynamicBarChartWithThreshold from "@/app/components/organisms/BarChartWithThreshold/BarChartWithThreshold";
import { hourlyData } from "@/app/config/chartDataConfig";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { FEATURE } from "@/app/config/featureRegistry";
import { useTranslation } from "react-i18next";
import {
  FireSmokeBucket,
  FireSmokeGraphData,
  PPEGraphData,
  SafetySocketPayload,
  SurveillanceDashboardResponse,
} from "./SafetyAndComplianceDashboard.types";
import {
  useGetOrgShiftTimeSafetyDataQuery,
  useLazyGetSafetyAndComplianceDashboardKpiDataQuery,
} from "./SafetyAndComplianceDashboardApi";
import { SafetyMonitoringConfig } from "./SafetyAndComplianceDashboardConfig";

import { useSocketEvent } from "@/customhooks/useSocketEvent";
import { SOCKET_EVENTS } from "@/sockets/socket.events";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";
import TimeScaleLineChart from "@/app/components/organisms/TimeScaleLineChart/TimeScaleLineChart";
const SafetyAndComplianceDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user, features } = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";

  /* ---------- STATE ---------- */
  const [isSafetyDashboardLiveMode, setIsSafetyDashboardLiveMode] =
    useState(true);

  const [displaySafetyKpi, setDisplaySafetyKpi] = useState<
    SurveillanceDashboardResponse[]
  >([]);
  /* ---------- API HOOKS ---------- */

  const { data: SafetyOrgShifts } = useGetOrgShiftTimeSafetyDataQuery(
    { tenantId },
    { skip: !tenantId },
  );
  const [fetchSafetyKpi, { isFetching: safetykpiLoading }] =
    useLazyGetSafetyAndComplianceDashboardKpiDataQuery();

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    if (!tenantId) return;
    const load = async () => {
      const kpi = await fetchSafetyKpi({ tenantId }).unwrap();
      setDisplaySafetyKpi(kpi ?? []);
    };

    load();
  }, [tenantId]);

  /* ---------- SOCKET (LIVE ONLY) ---------- */


  // ✅ Fix — stable handler reference
const handleSafetySocketUpdate = useCallback(
  (payload: SafetySocketPayload) => {
    if (!payload?.data) return;
    setDisplaySafetyKpi(payload.data);
  },
  [], // no deps needed — setDisplaySafetyKpi is stable
);

useSocketEvent<SafetySocketPayload>({
  tenantId,
  enabled: isSafetyDashboardLiveMode,
  event: SOCKET_EVENTS.SAFETY_DASHBOARD_UPDATE,
  handler: handleSafetySocketUpdate,
});
  /* ---------- TIME FILTER ---------- */
  const handleTimeRangeChange = useCallback(
    async (range: { start?: string; end?: string }) => {
      if (!range.start && !range.end) {
        setIsSafetyDashboardLiveMode(true);
        const res = await fetchSafetyKpi({ tenantId }).unwrap();
        setDisplaySafetyKpi(res ?? []);
        return;
      }

      setIsSafetyDashboardLiveMode(false);
      const payload = {
        tenantId: tenantId,
        startDate: range.start,
        endDate: range.end,
      };
      const kpi = await fetchSafetyKpi(payload).unwrap();
      setDisplaySafetyKpi(kpi ?? []);
    },
    [tenantId, fetchSafetyKpi],
  );

  const safetyKpiData = useMemo(() => {
    return displaySafetyKpi.map((item) => {
      const config = SafetyMonitoringConfig[item.title];

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
  }, [displaySafetyKpi, t]);


  const fireSmokeDashboard = displaySafetyKpi.find(
    (d) => d.title === "Fire & Smoke Alerts",
  );


  const fallLaydownDashboard = displaySafetyKpi.find(
    (d) => d.title === "Fall / Laydown Alerts",
  );


  const ppeDashboard = displaySafetyKpi.find(
  (d) => d.title === "PPE Violations"
);

const graphDataForPPE =
  ppeDashboard?.graphs?.data &&
  typeof ppeDashboard.graphs.data === "object" &&
  !Array.isArray(ppeDashboard.graphs.data) &&
  "violationTypePieData" in ppeDashboard.graphs.data
    ? (ppeDashboard.graphs.data as PPEGraphData)
    : undefined;

// ✅ Now safe
const ppeViolationTypePieData =
  graphDataForPPE?.violationTypePieData ?? [];
const ppeZoneWisePieData =
  graphDataForPPE?.zoneWisePieData ?? [];



// ✅ ppe graph
const ppeSeries = graphDataForPPE?.series ?? [];
const ppeXAxisDates  = ppeSeries.map((item) => item.date ?? "");   // "28/04", "29/04"
const ppeXAxisTimes  = ppeSeries.map((item) => item.time ?? item.day ?? ""); // "15:00" or "Mon"
const ppeGranularity = graphDataForPPE?.granularity ?? "hour";



  //graph data for fire smoke detection
const graphDataForFireSmoke =
  fireSmokeDashboard?.graphs?.data &&
  typeof fireSmokeDashboard.graphs.data === "object" &&
  !Array.isArray(fireSmokeDashboard.graphs.data) &&
  "hazardTypePieData" in fireSmokeDashboard.graphs.data
    ? (fireSmokeDashboard.graphs.data as FireSmokeGraphData)
    : undefined;

const fireSmokeGranularity = graphDataForFireSmoke?.granularity ?? "hour";
const fireSmokeSeries      = graphDataForFireSmoke?.series ?? [];

const fireSmokeXAxisDates = fireSmokeSeries.map((item: FireSmokeBucket) => item.date ?? "");
const fireSmokeXAxisTimes = fireSmokeSeries.map((item: FireSmokeBucket) => item.time ?? item.day ?? "");



  const hazardTypePieData = graphDataForFireSmoke?.hazardTypePieData ?? [];
  const zoneWisePieData = graphDataForFireSmoke?.zoneWisePieData ?? [];

  const totalHazardType = hazardTypePieData.reduce(
    (sum, item) => sum + item.value,
    0
  );



  //graph data for fall detection
  const graphDataForFallDetection =
    fallLaydownDashboard?.graphs?.data &&
      !Array.isArray(fallLaydownDashboard.graphs.data)
      ? fallLaydownDashboard.graphs.data
      : undefined;

  const zoneWisePieDataForFall = graphDataForFallDetection?.zoneWisePieData ?? [];
  /* ================= FALL DETECTION ================= */

const fallSeries = fallLaydownDashboard?.graphs?.data?.series ?? [];

const xAxisTimes = fallSeries.map((item: any) => item.time);
const xAxisDates = fallSeries.map((item: any) => item.date);

const lineSeries = [
  {
    label: "Fall Incidents",
    data: fallSeries.map((item: any) => item.count),
    color: "#FFCBB3",
    showMark: true,
  },
];

  const tabs: TabConfig[] = [
    {
      label: "PPE Compliance",
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
            size={{ xs: 12, md: 8 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
          >
            {/* <DynamicBarChart
              data={ppeHourlyData}
              xAxisKey="time"
              series={[
                { dataKey: "helmet", label: "Helmet", color: "#ffcdd2" },
                { dataKey: "vest", label: "Vest", color: "#FFEAA7" },
                { dataKey: "glass", label: "Glass", color: "#A8E6CF" },
              ]}
              yAxisLabel="Violation Count"
              stackId="ppe"
            /> */}
            <TimeScaleLineChart
  granularity={ppeGranularity}
  xAxisDates={ppeXAxisDates}
  xAxisTimes={ppeXAxisTimes}
  series={[
    {
      label:    "Helmet",
      data:     ppeSeries.map((item) => item.helmet),
      color:    "#ffcdd2",
      showMark: true,
    },
    {
      label:    "Vest",
      data:     ppeSeries.map((item) => item.vest),
      color:    "#FFEAA7",
      showMark: true,
    },
    {
      label:    "Glasses",
      data:     ppeSeries.map((item) => item.glasses),
      color:    "#A8E6CF",
      showMark: true,
    },
  ]}
/>
          </Grid>

          {/* Right side*/}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",

              flexDirection: { xs: "row", md: "column" },
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: { xs: "wrap", md: "nowrap" },
              gap: 2,
              p: { xs: 1, md: 0 },
              height: { xs: "40vh", md: "100%" },
              width: "100%",
            }}
          >
            {/* First Pie Chart */}
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "50%", md: "100%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: { xs: 140, md: "50%" },
              }}
            >
              {/* <DynamicPieChart
                data={
                  [
                    // { label: "Helmet", value: 29, color: "#ffcdd2" },
                    // { label: "Vest", value: 28, color: "#FFEAA7" },
                    // { label: "Glass", value: 28, color: "#A8E6CF" },
                  ]
                }
                count={2.5}
                carttitle="PPE Violation Distribution"
              /> */}

              {ppeViolationTypePieData.length > 0 && (
  <DynamicPieChart
    data={ppeViolationTypePieData}
   //count={totalPpeViolationType}
    carttitle="PPE Violation Distribution"
  />
)}
            </Box>

            {/* Second Pie Chart */}
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "50%", md: "100%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: { xs: 140, md: "50%" },
              }}
            >
              {/* <DynamicPieChart
                data={
                  [
                    // { label: "Production Gate", value: 31, color: "#ffcdd2" },
                    // { label: "Warehouse Gate", value: 43, color: "#FFD3A5" },
                    // { label: "Parking Gate", value: 26, color: "#FFEAA7" },
                    // { label: "Main Entrance", value: 20, color: "#C7EDCC" },
                    // { label: "Side Exit", value: 71, color: "#A8E6CF" },
                  ]
                }
                count={2.5}
                carttitle="PPE Violations by Zone"
              /> */}
              {ppeZoneWisePieData.length > 0 && (
  <DynamicPieChart
    data={ppeZoneWisePieData}
    //count={totalPpeZone}
    carttitle="PPE Violations by Zone"
  />
)}
            </Box>
          </Grid>
        </Grid>
      ),
      featureId: FEATURE.PPE_DETECTION,
    },

    {
      label: "Hazardous Zone Activity",
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
            size={{ xs: 12, md: 8 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
          >
        
            <TimeScaleLineChart
    granularity={fireSmokeGranularity}
    xAxisDates={fireSmokeXAxisDates}
    xAxisTimes={fireSmokeXAxisTimes}
    series={[
      {
        label:    "Fire",
        data:     fireSmokeSeries.map((item) => item.fireCount),
        color:    "#ffcdd2",
        showMark: true,
      },
      {
        label:    "Smoke",
        data:     fireSmokeSeries.map((item) => item.smokeCount),
        color:    "#FFCBB3",
        showMark: true,
      },
    ]}
  />
          </Grid>

          {/* Right side */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: { xs: "wrap", md: "nowrap" },
              gap: 2,
              p: { xs: 1, md: 0 },
              height: { xs: "40vh", md: "100%" },
              width: "100%",
            }}
          >
            {/* Hazard Type Pie */}
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "50%", md: "100%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: { xs: 140, md: "50%" },
              }}
            >
              {hazardTypePieData.length > 0 && totalHazardType > 0 && (
                <DynamicPieChart
                  data={hazardTypePieData}
                  carttitle="Hazard Type Distribution"
                />
              )}
            </Box>

            {/* Zone-wise Pie */}
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "50%", md: "100%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: { xs: 140, md: "50%" },
              }}
            >

              {zoneWisePieData.length > 0 && (
                <DynamicPieChart
                  data={zoneWisePieData}
                  carttitle="Zone-wise Hazard Detection"
                />
              )}
            </Box>
          </Grid>
        </Grid>
      ),
      featureId: FEATURE.FIRE_SMOKE,
    },
    {
      label: "Vehicle In Walkways",
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
            size={{ xs: 12, md: 8 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
          >
            <DynamicBarChart
              data={
                [
                  // { gate: "Production Gate", blocked: 5, clear: 19 },
                  // { gate: "Warehouse Gate", blocked: 3, clear: 21 },
                  // { gate: "Parking Gate", blocked: 2, clear: 22 },
                  // { gate: "Main Entrance", blocked: 4, clear: 20 },
                  // { gate: "Side Exit", blocked: 1, clear: 23 },
                ]
              }
              xAxisKey="gate"
              series={[
                {
                  dataKey: "blocked",
                  label: "Blocked Hours",
                  color: "#ffcdd2",
                },
                {
                  dataKey: "clear",
                  label: "Clear Hours",
                  color: "#A8E6CF",
                },
              ]}
              yAxisLabel="Hours "
              stackId="exitStatus"
            />
          </Grid>

          {/* Right side*/}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",

              flexDirection: { xs: "row", md: "column" },
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: { xs: "wrap", md: "nowrap" },
              gap: 2,
              p: { xs: 1, md: 0 },
              height: { xs: "40vh", md: "100%" },
              width: "100%",
            }}
          >
            {/* First Pie Chart */}
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "50%", md: "100%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: { xs: 140, md: "50%" },
              }}
            >
              <DynamicPieChart
                data={
                  [
                    // { label: "Production Gate", value: 5, color: "#ffcdd2" },
                    // { label: "Warehouse Gate", value: 3, color: "#FFCBB3" },
                    // { label: "Parking Gate", value: 2, color: "#FFEAA7" },
                    // { label: "Main Entrance", value: 4, color: "#C7EDCC" },
                    // { label: "Side Exit", value: 1, color: "#A8E6CF" },
                  ]
                }
                carttitle="Vehicle in Walkways by Zone"
              />
            </Box>
          </Grid>
        </Grid>
      ),
      featureId: FEATURE.OBJECT_DETECTION,
    },
    {
      label: "Fall Incidents",
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
            size={{ xs: 12, md: 8 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
          >
  <TimeScaleLineChart
  series={lineSeries}
  xAxisDates={xAxisDates}
  xAxisTimes={xAxisTimes}
  granularity="hour"
/>
          </Grid>

          {/* Right side*/}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",

              flexDirection: { xs: "row", md: "column" },
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: { xs: "wrap", md: "nowrap" },
              gap: 2,
              p: { xs: 1, md: 0 },
              height: { xs: "40vh", md: "100%" },
              width: "100%",
            }}
          >
            {/* First Pie Chart */}
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "50%", md: "100%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: { xs: 140, md: "50%" },
                
              }}
            >

              {zoneWisePieDataForFall.length > 0 && (
                <DynamicPieChart
                  data={zoneWisePieDataForFall}
                  carttitle="Zone-wise Fall/Laydown Incidents"
                />
              )}
            </Box>
          </Grid>
        </Grid>
      ),
      featureId: FEATURE.FALL_DETECTION,
    },
    {
      label: "Emergency Exit Status",
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
            size={{ xs: 12, md: 8 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
          >
            <DynamicBarChart
              data={
                [
                  // { gate: "Production Gate", blocked: 5, clear: 19 },
                  // { gate: "Warehouse Gate", blocked: 3, clear: 21 },
                  // { gate: "Parking Gate", blocked: 2, clear: 22 },
                  // { gate: "Main Entrance", blocked: 4, clear: 20 },
                  // { gate: "Side Exit", blocked: 1, clear: 23 },
                ]
              }
              xAxisKey="gate"
              series={[
                {
                  dataKey: "blocked",
                  label: "Blocked Hours",
                  color: "#ffcdd2",
                },
                {
                  dataKey: "clear",
                  label: "Clear Hours",
                  color: "#B0E0E6",
                },
              ]}
              yAxisLabel="Hours"
              stackId="exitStatus"
            />
          </Grid>

          {/* Right side*/}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",

              flexDirection: { xs: "row", md: "column" },
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: { xs: "wrap", md: "nowrap" },
              gap: 2,
              p: { xs: 1, md: 0 },
              height: { xs: "40vh", md: "100%" },
              width: "100%",
            }}
          >
            {/* First Pie Chart */}
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "50%", md: "100%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: { xs: 140, md: "50%" },
              }}
            >
              <DynamicPieChart
                data={
                  [
                    // { label: "Production Gate", value: 5, color: "#ffcdd2" },
                    // { label: "Warehouse Gate", value: 3, color: "#FFCBB3" },
                    // { label: "Parking Gate", value: 2, color: "#FFEAA7" },
                    // { label: "Main Entrance", value: 4, color: "#D4E6D4" },
                    // { label: "Side Exit", value: 1, color: "#B0E0E6" },
                  ]
                }
                carttitle="Zone-wise Blocked Emergency Exits"
              />
            </Box>
          </Grid>
        </Grid>
      ),
      featureId: FEATURE.EMERGENCY_EXIT_BLOCKAGE,
    },
    {
      label: "Crowd Gathering",
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
            size={{ xs: 12, md: 8 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
          >
            <DynamicBarChartWithThreshold
              data={
                [
                  // { month: "Jan", users: 20 },
                  // { month: "Feb", users: 50 },
                  // { month: "Mar", users: 80 },
                  // { month: "Jan", users: 20 },
                  // { month: "April", users: 50 },
                  // { month: "May", users: 80 },
                  // { month: "June", users: 20 },
                  // { month: "July", users: 50 },
                  // { month: "August", users: 80 },
                ]
              }
              xAxisKey="month"
              series={[
                {
                  dataKey: "users",
                  label: "Users",
                  color: "#B0E0E6",
                },
              ]}
              thresholdValue={60}
              thresholdLabel="Target"
              thresholdColor="#FFB84D"
            />
          </Grid>

          {/* Right side*/}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",

              flexDirection: { xs: "row", md: "column" },
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: { xs: "wrap", md: "nowrap" },
              gap: 2,
              p: { xs: 1, md: 0 },
              height: { xs: "40vh", md: "100%" },
              width: "100%",
            }}
          >
            {/* First Pie Chart */}
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "50%", md: "100%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: { xs: 140, md: "50%" },
              }}
            >
              <DynamicPieChart
                data={
                  [
                    // { label: "Production Gate", value: 5, color: "#ffcdd2" },
                    // { label: "Warehouse Gate", value: 3, color: "#FFCBB3" },
                    // { label: "Parking Gate", value: 2, color: "#FFEAA7" },
                    // { label: "Main Entrance", value: 4, color: "#C8E6C9" },
                    // { label: "Side Exit", value: 1, color: "#B0E0E6" },
                  ]
                }
                carttitle="Zone-wise Crowd Gathering Incidents"
              />
            </Box>
          </Grid>
        </Grid>
      ),
      featureId: FEATURE.CROWD_DETECTION,
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
          shifts={SafetyOrgShifts || []}
        />
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {safetykpiLoading || !displaySafetyKpi.length
          ? Array.from({ length: 4 }).map((_, index) => (
            <Grid
              key={index + 1}
              size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
            >
              <KpiCardSkeleton />
            </Grid>
          ))
          : safetyKpiData.map((kpi) => (
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

export default SafetyAndComplianceDashboard;
