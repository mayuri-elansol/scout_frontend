"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import {
  LocalFireDepartment,
  HealthAndSafety,
  DirectionsCar,
  WarningAmber,
  DoorFront,
  Groups,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

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

  useSocketEvent<SafetySocketPayload>({
    tenantId,
    enabled: isSafetyDashboardLiveMode,
    event: SOCKET_EVENTS.SAFETY_DASHBOARD_UPDATE,
    handler: (payload) => {
      console.log("📡 Safety socket payload:", payload);

      // Safety check
      if (!payload?.data) return;

      // Update full dashboard (KPI + graphs)
      setDisplaySafetyKpi(payload.data);
    },
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

  const ppeDashboard = displaySafetyKpi.find(
    (d) => d.title === "PPE Violations",
  );
  const fireSmokeDashboard = displaySafetyKpi.find(
    (d) => d.title === "Fire & Smoke  Alerts",
  );

  const vehicleInWalkwaysDashboard = displaySafetyKpi.find(
    (d) => d.title === "Vehicle In Walkways",
  );
  const fallLaydownDashboard = displaySafetyKpi.find(
    (d) => d.title === "Fall / Laydown Alerts",
  );

  const emergencyExitBlockageDashboard = displaySafetyKpi.find(
    (d) => d.title === "Emergency Exit Blockage",
  );
  const crowdGatheringDashboard = displaySafetyKpi.find(
    (d) => d.title === "Crowd Gathering Alerts",
  );
  const fireSmokeBuckets = fireSmokeDashboard?.graphs?.data?.buckets ?? [];
  const fireSmokeZoneWise = fireSmokeDashboard?.graphs?.data?.zoneWiseCount;

  const fireSmokeHourlyData = fireSmokeBuckets.map((b: any) => ({
    time: b.label,
    fire: b.fireCount,
    smoke: b.smokeCount,
    gas: 0,
    oil: 0,
  }));

  const totalFire = Object.values(fireSmokeZoneWise?.fire ?? {}).reduce(
    (a: number, b) => a + (b as number),
    0,
  );
  const totalSmoke = Object.values(fireSmokeZoneWise?.smoke ?? {}).reduce(
    (a: number, b) => a + (b as number),
    0,
  );
  const totalHazard = totalFire + totalSmoke;

  const hazardTypePieData = [
    { label: "Fire", value: totalFire, color: "#ffcdd2" },
    { label: "Smoke", value: totalSmoke, color: "#FFCBB3" },
  ];

  const zoneColors = ["#ffcdd2", "#FFCBB3", "#FFEAA7", "#C7EDCC", "#A8E6CF"];
  const allZones = new Set([
    ...Object.keys(fireSmokeZoneWise?.fire ?? {}),
    ...Object.keys(fireSmokeZoneWise?.smoke ?? {}),
  ]);
  const zoneWisePieData = Array.from(allZones).map((zone, i) => ({
    label: zone,
    value:
      (fireSmokeZoneWise?.fire?.[zone] ?? 0) +
      (fireSmokeZoneWise?.smoke?.[zone] ?? 0),
    color: zoneColors[i % zoneColors.length],
  }));

  const totalFireCount = fireSmokeDashboard?.kpi?.totalFireCount ?? 0;
  const totalSmokeCount = fireSmokeDashboard?.kpi?.totalSmokeCount ?? 0;

  const totalHazardCount = totalFireCount + totalSmokeCount;

  const zoneWisePieDataDummy = [
    // Existing zones
    ...Array.from(allZones).map((zone, i) => ({
      label: zone,
      value:
        (fireSmokeZoneWise?.fire?.[zone] ?? 0) +
        (fireSmokeZoneWise?.smoke?.[zone] ?? 0),
      color: zoneColors[i % zoneColors.length],
    })),

    // ✅ Add TOTAL / ELANSOL slice
    {
      label: "Elansol", // or "All Zones" or "Total"
      value: totalHazardCount,
      color: "#8884d8", // choose any distinct color
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
            <DynamicBarChart
              data={hourlyData}
              xAxisKey="time"
              series={[
                { dataKey: "helmet", label: "Helmet", color: "#ffcdd2" },
                { dataKey: "vest", label: "Vest", color: "#FFEAA7" },
                { dataKey: "glass", label: "Glass", color: "#A8E6CF" },
              ]}
              yAxisLabel="Violation Count"
              stackId="ppe"
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
                    // { label: "Helmet", value: 29, color: "#ffcdd2" },
                    // { label: "Vest", value: 28, color: "#FFEAA7" },
                    // { label: "Glass", value: 28, color: "#A8E6CF" },
                  ]
                }
                count={2.5}
                carttitle="PPE Violation Distribution"
              />
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
              <DynamicPieChart
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
              />
            </Box>
          </Grid>
        </Grid>
      ),
      featureId: FEATURE.PPE_DETECTION,
    },
    // {
    //   label: "Hazardous Zone Activity",
    //   content: (
    //     <Grid
    //       container
    //       sx={{
    //         alignItems: "stretch",
    //         height: "100%",
    //       }}
    //     >
    //       {/* Left side */}
    //       <Grid
    //         size={{ xs: 12, md: 8 }}
    //         sx={{
    //           display: "flex",
    //           height: { xs: "50vh", md: "100%" },
    //           width: "100%",
    //           "& .MuiCardContent-root": {
    //             height: "100%",
    //           },
    //         }}
    //       >
    //         <DynamicBarChart
    //           data={hourlyData}
    //           xAxisKey="time"
    //           series={[
    //             {
    //               dataKey: "fire",
    //               label: "Fire Violations",
    //               color: "#ffcdd2",
    //             },
    //             {
    //               dataKey: "smoke",
    //               label: "Smoke Violations",
    //               color: "#FFCBB3",
    //             },
    //             {
    //               dataKey: "gas",
    //               label: "Gas Violations",
    //               color: "#FFEAA7",
    //             },
    //             {
    //               dataKey: "oil",
    //               label: "Oil Violations",
    //               color: "#A8E6CF",
    //             },
    //           ]}
    //           yAxisLabel="Violation Count"
    //           stackId="hazard"
    //         />
    //       </Grid>

    //       {/* Right side*/}
    //       <Grid
    //         size={{ xs: 12, md: 4 }}
    //         sx={{
    //           display: "flex",

    //           flexDirection: { xs: "row", md: "column" },
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           flexWrap: { xs: "wrap", md: "nowrap" },
    //           gap: 2,
    //           p: { xs: 1, md: 0 },
    //           height: { xs: "40vh", md: "100%" },
    //           width: "100%",
    //         }}
    //       >
    //         {/* First Pie Chart */}
    //         <Box
    //           sx={{
    //             flex: 1,
    //             minWidth: { xs: "50%", md: "100%" },
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //             justifyContent: "center",
    //             height: { xs: 140, md: "50%" },
    //           }}
    //         >
    //           <DynamicPieChart
    //             data={[
    //               { label: "Fire", value: 29, color: "#ffcdd2" },
    //               { label: "Smoke", value: 28, color: "#FFCBB3" },
    //               { label: "Gas", value: 28, color: "#FFEAA7" },
    //               { label: "Oil", value: 15, color: "#A8E6CF" },
    //             ]}
    //             count={2.5}
    //             carttitle="Hazard Type Distribution"
    //           />
    //         </Box>

    //         {/* Second Pie Chart */}
    //         <Box
    //           sx={{
    //             flex: 1,
    //             minWidth: { xs: "50%", md: "100%" },
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //             justifyContent: "center",
    //             height: { xs: 140, md: "50%" },
    //           }}
    //         >
    //           <DynamicPieChart
    //             data={[
    //               { label: "Production Gate", value: 31, color: "#ffcdd2" },
    //               { label: "Warehouse Gate", value: 43, color: "#FFCBB3" },
    //               { label: "Parking Gate", value: 26, color: "#FFEAA7" },
    //               { label: "Main Entrance", value: 20, color: "#C7EDCC" },
    //               { label: "Side Exit", value: 71, color: "#A8E6CF" },
    //             ]}
    //             count={2.5}
    //             carttitle="Zone-wise Hazard Detection"
    //           />
    //         </Box>
    //       </Grid>
    //     </Grid>
    //   ),
    //   featureId: FEATURE.FIRE_SMOKE,
    // },
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
            <DynamicBarChart
              data={fireSmokeHourlyData}
              xAxisKey="time"
              series={[
                { dataKey: "fire", label: "Fire Violations", color: "#ffcdd2" },
                {
                  dataKey: "smoke",
                  label: "Smoke Violations",
                  color: "#FFCBB3",
                },
              ]}
              yAxisLabel="Violation Count"
              stackId="hazard"
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
              <DynamicPieChart
                data={hazardTypePieData}
                count={totalHazard}
                carttitle="Hazard Type Distribution"
              />
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
              <DynamicPieChart
                // data={zoneWisePieData}
                data={[
                  { label: "Elansol", value: totalHazard, color: "#ffcdd2" },
                ]}
                count={totalHazard}
                carttitle="Zone-wise Hazard Detection"
              />
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
                count={2.5}
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
            <DynamicBarChart
              data={hourlyData}
              xAxisKey="time"
              series={[
                {
                  dataKey: "falls",
                  label: "Fall Incidents",
                  color: "#FFCBB3",
                },
              ]}
              yAxisLabel="Incident Count"
              stackId="fall"
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
                    // { label: "Production Gate", value: 5, color: "#FFCBB3" },
                    // { label: "Warehouse Gate", value: 3, color: "#FFE0B3" },
                    // { label: "Parking Gate", value: 2, color: "#FFEAA7" },
                    // { label: "Main Entrance", value: 4, color: "#A8E6CF" },
                    // { label: "Side Exit", value: 1, color: "#B3E5FC" },
                  ]
                }
                count={2.5}
                carttitle="Zone-wise Fall/Laydown Incidents"
              />
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
                count={2.5}
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
                count={2.5}
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
    // <Paper
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     pt: 2,
    //     px: 3,
    //     backgroundColor: "#ffffff",
    //     borderRadius: 2,
    //     flex: 1,
    //     // minHeight: 0,

    //     minHeight: { xs: "auto", sm: "auto", md: 0 },
    //   }}
    // >
    //   {/* Top Right Time Filter */}
    //   <Box
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "end",
    //       flexWrap: "wrap",
    //       mb: 2,
    //     }}
    //   >
    //     <TimeFilter onRangeChange={() => console.log("on range chnaged")} />
    //   </Box>

    //   {/* KPI Cards Grid */}
    //   <Grid container spacing={1.5} sx={{ mb: 2 }} alignItems="stretch">
    //     {kpiData.map((kpi, index) => (
    //       <Grid
    //         size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
    //         key={uuidv4() + index}
    //       >
    //         {/* <DashboardKpiCard {...kpi} /> */}
    //       </Grid>
    //     ))}
    //   </Grid>

    //   {/* Tabs Section */}
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       flex: 1,
    //       //  minHeight: 0,

    //       minHeight: { xs: "500px", sm: "600px", md: 0 },
    //     }}
    //   >
    //     <DashboardTabs tabs={tabs} features={features} />
    //   </Box>
    // </Paper>

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
