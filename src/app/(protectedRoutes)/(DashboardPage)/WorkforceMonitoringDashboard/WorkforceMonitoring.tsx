"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { Visibility, Smartphone, Security, People } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";
import DashboardTabs, {
  TabConfig,
} from "@/app/components/organisms/DashboardTabs/DashboardTabs";

import EngineeringIcon from "@mui/icons-material/Engineering";
import DynamicBarChart from "@/app/components/organisms/BarChart/BarChart";
import DynamicViolationScatterChart, {
  ViolationData,
} from "@/app/components/organisms/ScatterChart/ScatterChart";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { WorkforceMonitoringKpiData } from "./WorkforceMonitoringDashboard.types";
import { useLazyGetWorkforceMonitoringDashboardKpiDataQuery } from "./WorkforceMonitoringDashboardApi";
import { WorkforceMonitoringConfig } from "./WorkforceMonitoringDashboardConfig";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";

const WorkforceMonitoring: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";

  /* ---------- STATE ---------- */
  const [isLiveMode, setIsLiveMode] = useState(true);

  const [displayWorkforceMonitoringKpi, setDisplayWorkforceMonitoringKpi] =
    useState<WorkforceMonitoringKpiData[]>([]);

  /* ---------- API HOOKS ---------- */
  const [fetchWorkforceKpi, { isLoading: WorkforcekpiLoading }] =
    useLazyGetWorkforceMonitoringDashboardKpiDataQuery();
  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    const load = async () => {
      const [kpi] = await Promise.all([
        fetchWorkforceKpi({ tenantId }).unwrap(),
      ]);

      setDisplayWorkforceMonitoringKpi(kpi ?? []);
    };

    load().catch(console.error);
  }, [tenantId, fetchWorkforceKpi]);

  /* ---------- SOCKET (LIVE ONLY) ---------- */
  // useSocketEvent<PpeSocketPayload>({
  //   tenantId,
  //   enabled: isLiveMode,
  //   event: SOCKET_EVENTS.PPE_UPDATE,
  //   handler: (payload) => {
  //     console.log("payload form the socket", payload);
  //     setDisplayKpi(payload.kpi ?? []);
  //     setDisplayZoneViolations(payload.zoneViolations ?? []);
  //     setRecentViolationsLive(payload.recentViolations ?? []);
  //   },
  // });

  /* ---------- TIME FILTER ---------- */
  const handleworkforceTimeRangeChange = useCallback(
    async (range: { start?: string; end?: string }) => {
      if (!range.start && !range.end) {
        setIsLiveMode(true);
        fetchWorkforceKpi({ tenantId });
        return;
      }

      setIsLiveMode(false);
      const payload = {
        tenantId: tenantId,
        startDate: range.start,
        endDate: range.end,
      };
      const [kpi] = await Promise.all([fetchWorkforceKpi(payload).unwrap()]);

      setDisplayWorkforceMonitoringKpi(kpi ?? []);
    },
    [tenantId, fetchWorkforceKpi],
  );

  const workforceKpiData = useMemo(
    () =>
      displayWorkforceMonitoringKpi.map((item) => {
        const config = WorkforceMonitoringConfig[item.title];

        return {
          ...item,
          title: t(item.title),
          icon: config?.icon || EngineeringIcon,
          route: config?.route || "/",
          tooltipMessage: config?.tooltipMessage || "",
        };
      }),
    [displayWorkforceMonitoringKpi, t],
  );

  const violationData: ViolationData[] = [
    { time: "08:00", zone: "Zone A", count: 5 },
    { time: "09:00", zone: "Zone A", count: 8 },
    { time: "10:00", zone: "Zone A", count: 3 },
    { time: "11:00", zone: "Zone A", count: 12 },
    { time: "08:00", zone: "Zone B", count: 7 },
    { time: "09:00", zone: "Zone B", count: 4 },
    { time: "10:00", zone: "Zone B", count: 9 },
    { time: "11:00", zone: "Zone B", count: 6 },
    { time: "12:00", zone: "Zone C", count: 2 },
    { time: "01:00", zone: "Zone C", count: 11 },
    { time: "03:00", zone: "Zone C", count: 5 },
    { time: "04:00", zone: "Zone C", count: 8 },
    { time: "05:00", zone: "Zone D", count: 2 },
    { time: "06:00", zone: "Zone E", count: 11 },
    { time: "07:00", zone: "Zone F", count: 5 },
    { time: "08:00", zone: "Zone G", count: 8 },
  ];
  const tabs: TabConfig[] = [
    {
      label: "Employee Presence (Critical Areas)",
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
    {
      label: "Employee Monitoring",
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
            <DynamicBarChart
              data={[
                {
                  gate: "Production Gate",
                  Idle: 5,
                  Working: 19,
                  NotPresent: 20,
                },
                {
                  gate: "Warehouse Gate",
                  Idle: 3,
                  Working: 21,
                  NotPresent: 18,
                },
                { gate: "Parking Gate", Idle: 2, Working: 22, NotPresent: 25 },
                { gate: "Main Entrance", Idle: 4, Working: 20, NotPresent: 65 },
                { gate: "Side Exit", Idle: 1, Working: 23, NotPresent: 23 },
              ]}
              xAxisKey="gate"
              series={[
                {
                  dataKey: "Idle",
                  label: "Idle Count",
                  color: "#FFD1DC",
                },
                {
                  dataKey: "Working",
                  label: "Working Count",
                  color: "#AEEEEE",
                },
                {
                  dataKey: "NotPresent",
                  label: "Not Present Count",
                  color: "#FFF5BA",
                },
              ]}
              yAxisLabel="Count"
              stackId="exitStatus"
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Mobile Phone Usage",
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
    {
      label: "Security Personnel Status",
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
            <DynamicBarChart
              data={[
                { gate: "Production Gate", Absent: 5, Present: 19 },
                { gate: "Warehouse Gate", Absent: 3, Present: 21 },
                { gate: "Parking Gate", Absent: 2, Present: 22 },
                { gate: "Main Entrance", Absent: 4, Present: 20 },
                { gate: "Side Exit", Absent: 1, Present: 23 },
              ]}
              xAxisKey="gate"
              series={[
                {
                  dataKey: "Absent",
                  label: "Absent Count",
                  color: "#FFC0CB",
                },
                {
                  dataKey: "Present",
                  label: "Present Count",
                  color: "#B0E0E6",
                },
              ]}
              yAxisLabel="Count"
              stackId="exitStatus"
            />
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
        <TimeFilter onRangeChange={handleworkforceTimeRangeChange} />
      </Box>

      {/* KPI Cards Grid */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {WorkforcekpiLoading
          ? Array.from({ length: 4 }).map(() => (
              <Grid
                key={uuidv4()}
                size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
              >
                <KpiCardSkeleton />
              </Grid>
            ))
          : workforceKpiData.map((kpi) => (
              <Grid
                key={kpi.title}
                size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
              >
                <DashboardKpiCard {...kpi} />
              </Grid>
            ))}
      </Grid>

      {/* Activity Feed and Camera Status */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: { xs: "500px", sm: "600px", md: 0 },
        }}
      >
        <DashboardTabs tabs={tabs} />
      </Box>
    </Paper>
  );
};

export default WorkforceMonitoring;
