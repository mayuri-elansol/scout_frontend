
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";
import DashboardTabs, {
  TabConfig,
} from "@/app/components/organisms/DashboardTabs/DashboardTabs";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DynamicBarChart from "@/app/components/organisms/BarChart/BarChart";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  useGetOrgShiftTimeWorkforceDataQuery,
  useLazyGetWorkforceMonitoringDashboardKpiDataQuery,
} from "./WorkforceMonitoringDashboardApi";
import { WorkforceMonitoringConfig } from "./WorkforceMonitoringDashboardConfig";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import {
  CriticalAreaGraphData,
  WorkforceMonitoringDashboardResponse,
  WorkforceMonitoringSocketPayload,
} from "./WorkforceMonitoringDashboard.types";
import { SOCKET_EVENTS } from "@/sockets/socket.events";
import { useSocketEvent } from "@/customhooks/useSocketEvent";
import DynamicViolationScatterChartForWorkforce from "@/app/components/organisms/ScatterChart/DynamicViolationScatterChartForWorkforce";
import { FEATURE } from "@/app/config/featureRegistry";
import TimeScaleLineChart from "@/app/components/organisms/TimeScaleLineChart/TimeScaleLineChart";

// ─── Helper: safely extract CriticalAreaGraphData from union ─────────────────
function isCriticalAreaGraphData(
  data: unknown
): data is CriticalAreaGraphData {
  return !!data && !Array.isArray(data) && typeof data === "object";
}

// ─── Helper: build chart props from a use-case title ─────────────────────────
function buildCriticalAreaProps(
  dashboardData: WorkforceMonitoringDashboardResponse[],
  title: string
) {
  const usecase = dashboardData.find((d) => d.title === title);
  const raw = usecase?.graphs?.data;
  const graphData = isCriticalAreaGraphData(raw) ? raw : null;

  const series =
    graphData?.series.map((zone) => ({
      label: zone.zone,
      data: zone.data.map((p) => p.count),
      color: zone.color,
      showMark: false,
    })) ?? [];

  const firstZone = graphData?.series[0]?.data ?? [];
  const xAxisDates = firstZone.map((p) => p.date);
  const xAxisTimes = firstZone.map((p) => p.time ?? p.day ?? "");
  const granularity: CriticalAreaGraphData["granularity"] =
    graphData?.granularity ?? "hour";

  return { series, xAxisDates, xAxisTimes, granularity };
}

// ─── Helper: build flat bar-chart data ───────────────────────────────────────
function buildFlatBarData(
  dashboardData: WorkforceMonitoringDashboardResponse[],
  title: string
) {
  const usecase = dashboardData.find((d) => d.title === title);
  const raw = usecase?.graphs?.data;
  if (!Array.isArray(raw)) return [];
  return raw.map((g) => ({
    gate: g.gate,
    Idle: g.idleCount,
    Working: g.workingCount,
    NotPresent: g.notPresentCount,
  }));
}

// ─── Component ────────────────────────────────────────────────────────────────
const WorkforceMonitoring: React.FC = () => {
  const { t } = useTranslation();
  const { user, features } = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";

  const [isLiveMode, setIsLiveMode] = useState(true);
  const [dashboardData, setDashboardData] = useState<
    WorkforceMonitoringDashboardResponse[]
  >([]);

  // ── API ──────────────────────────────────────────────────────────────────
  const { data: orgShifts } = useGetOrgShiftTimeWorkforceDataQuery(
    { tenantId },
    { skip: !tenantId }
  );

  const [fetchWorkforceKpi, { isFetching: WorkforcekpiLoading }] =
    useLazyGetWorkforceMonitoringDashboardKpiDataQuery();

  // ── Initial load ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!tenantId) return;
    fetchWorkforceKpi({ tenantId })
      .unwrap()
      .then((kpi) => setDashboardData(kpi ?? []))
      .catch(console.error);
  }, [tenantId, fetchWorkforceKpi]);

  // ── Socket (live mode) ────────────────────────────────────────────────────
  useSocketEvent<WorkforceMonitoringSocketPayload>({
    tenantId,
    enabled: isLiveMode,
    event: SOCKET_EVENTS.WORKFORCE_UPDATE,
    handler: (payload) => {
      if (!payload?.data) return;
      setDashboardData(payload.data);
    },
  });

  // ── Time filter ───────────────────────────────────────────────────────────
  const handleworkforceTimeRangeChange = useCallback(
    async (range: { start?: string; end?: string }) => {
      if (!range.start && !range.end) {
        setIsLiveMode(true);
        const res = await fetchWorkforceKpi({ tenantId }).unwrap();
        setDashboardData(res ?? []);
        return;
      }
      setIsLiveMode(false);
      const kpi = await fetchWorkforceKpi({
        tenantId,
        startDate: range.start,
        endDate: range.end,
      }).unwrap();
      setDashboardData(kpi ?? []);
    },
    [tenantId, fetchWorkforceKpi]
  );

  // ── Derived data ──────────────────────────────────────────────────────────
  const workforceKpiData = useMemo(
    () =>
      dashboardData.map((item) => {
        const config = WorkforceMonitoringConfig[item.title];
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
      }),
    [dashboardData, t]
  );

  // FIX: consolidated + type-safe helpers replace 6 separate useMemos each
  const criticalAreaProps = useMemo(
    () => buildCriticalAreaProps(dashboardData, "Employee in Critical Area"),
    [dashboardData]
  );

  const restrictedAreaProps = useMemo(
    () => buildCriticalAreaProps(dashboardData, "Employee in Restricted Area"),
    [dashboardData]
  );

  const employeeIdleGraphData = useMemo(
    () => buildFlatBarData(dashboardData, "Employee Idle Time"),
    [dashboardData]
  );

  const mobileUsageGraphData = useMemo(
    () => buildFlatBarData(dashboardData, "Mobile Phone Usage in Critical Area"),
    [dashboardData]
  );

  const sleepingAbsenceGraphData = useMemo(
    () =>
      buildFlatBarData(
        dashboardData,
        "Sleeping / Absence of Security Personnel"
      ),
    [dashboardData]
  );

  // ── Tabs ──────────────────────────────────────────────────────────────────
  const tabs: TabConfig[] = [
    {
      label: "Employee Monitoring",
      featureId: FEATURE.EMPLOYEE_IDLE_TIME,
      content: (
        <Grid container>
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                width: "100%",
                height: 420,
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {WorkforcekpiLoading ? (
                <CircularProgress />
              ) : (
                <DynamicBarChart
                  data={employeeIdleGraphData}
                  xAxisKey="gate"
                  series={[
                    { dataKey: "Idle", label: "Idle Count", color: "#FFD1DC" },
                    { dataKey: "Working", label: "Working Count", color: "#AEEEEE" },
                    { dataKey: "NotPresent", label: "Not Present Count", color: "#FFF5BA" },
                  ]}
                  yAxisLabel="Count"
                  stackId="exitStatus"
                />
              )}
            </Box>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Employee Presence (Critical Areas)",
      featureId: FEATURE.EMPLOYEE_PRESENCE_CRITICAL_AREA,
      content: (
        <Grid container sx={{ alignItems: "stretch", height: "100%" }}>
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
            }}
            padding={{ xs: "10px" }}
          >
            {/* FIX: was incorrectly using criticalArea props for both tabs */}
            <TimeScaleLineChart {...criticalAreaProps} />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Employee Presence (Restricted Areas)",
      featureId: FEATURE.EMPLOYEE_PRESENCE_CRITICAL_AREA,
      content: (
        <Grid container sx={{ alignItems: "stretch", height: "100%" }}>
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
            }}
            padding={{ xs: "10px" }}
          >
            {/* FIX: now correctly uses restrictedArea props */}
            <TimeScaleLineChart {...restrictedAreaProps} />
            {/* <TimeScaleLineChart2 {...restrictedAreaProps} /> */}

          </Grid>
        </Grid>
      ),
    },
    {
      label: "Mobile Phone Usage",
      featureId: FEATURE.MOBILE_PHONE_USAGE,
      content: (
        <Grid container sx={{ alignItems: "stretch", height: "100%" }}>
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
            }}
            padding={{ xs: "10px" }}
          >
            {/* FIX: removed stray comma after this component */}
            <DynamicViolationScatterChartForWorkforce
              data={mobileUsageGraphData}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Security Personnel Status",
      featureId: FEATURE.SAFETY_COMPLIANCE,
      content: (
        <Grid container sx={{ alignItems: "stretch", height: "100%" }}>
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
            }}
          >
            <DynamicBarChart
              data={sleepingAbsenceGraphData}
              xAxisKey="gate"
              series={[
                { dataKey: "Absent", label: "Absent Count", color: "#FFC0CB" },
                { dataKey: "Present", label: "Present Count", color: "#B0E0E6" },
              ]}
              yAxisLabel="Count"
              stackId="exitStatus"
            />
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
          onRangeChange={handleworkforceTimeRangeChange}
          shifts={orgShifts || []}
        />
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {WorkforcekpiLoading || !dashboardData.length
          ? Array.from({ length: 4 }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
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

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <DashboardTabs tabs={tabs} features={features} />
      </Box>
    </Paper>
  );
};

export default WorkforceMonitoring;