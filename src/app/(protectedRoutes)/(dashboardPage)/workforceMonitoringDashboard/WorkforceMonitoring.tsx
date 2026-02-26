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
  WorkforceMonitoringDashboardResponse,
  WorkforceMonitoringDashboardResponseForScatterChart,
  WorkforceMonitoringSocketPayload,
} from "./WorkforceMonitoringDashboard.types";
import { SOCKET_EVENTS } from "@/sockets/socket.events";
import { useSocketEvent } from "@/customhooks/useSocketEvent";
import DynamicViolationScatterChartForWorkforce from "@/app/components/organisms/ScatterChart/DynamicViolationScatterChartForWorkforce";
import { FEATURE } from "@/app/config/featureRegistry";
const WorkforceMonitoring: React.FC = () => {
  const { t } = useTranslation();
  const { user ,features} = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";

  /* ---------- STATE ---------- */
  const [isLiveMode, setIsLiveMode] = useState(true);

  const [dashboardData, setDashboardData] = useState<
    WorkforceMonitoringDashboardResponse[]
  >([]);
  const [dashboardDataForScatterChart] = useState<
    WorkforceMonitoringDashboardResponseForScatterChart[]
  >([]);
  /* ---------- API HOOKS ---------- */

  const { data: orgShifts } = useGetOrgShiftTimeWorkforceDataQuery(
    { tenantId },
    { skip: !tenantId },
  );

  const [fetchWorkforceKpi, { isFetching: WorkforcekpiLoading }] =
    useLazyGetWorkforceMonitoringDashboardKpiDataQuery();
  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    if (!tenantId) return;
    const load = async () => {
      const kpi = await fetchWorkforceKpi({ tenantId }).unwrap();

      setDashboardData(kpi ?? []);
    };

    load().catch(console.error);
  }, [tenantId, fetchWorkforceKpi]);

  /* ---------- SOCKET (LIVE ONLY) ---------- */

  useSocketEvent<WorkforceMonitoringSocketPayload>({
    tenantId,
    enabled: isLiveMode,
    event: SOCKET_EVENTS.WORKFORCE_UPDATE,
    handler: (payload) => {
      console.log("📡 Workforce Monitoring dashboard socket payload:", payload);

      // Safety check
      if (!payload?.data) return;

      // Update full dashboard (KPI + graphs)
      setDashboardData(payload.data);
    },
  });

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
      const kpi = await fetchWorkforceKpi(payload).unwrap();

      setDashboardData(kpi ?? []);
    },
    [tenantId, fetchWorkforceKpi],
  );

  const workforceKpiData = useMemo(() => {
    return dashboardData.map((item) => {
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
    });
  }, [dashboardData, t]);

  const employeeIdleGraphData = useMemo(() => {
    const idleUsecase = dashboardData.find(
      (d) => d.title === "Employee Idle Time",
    );

    return (
      idleUsecase?.graphs?.data?.map((g) => ({
        gate: g.gate,
        Idle: g.idleCount,
        Working: g.workingCount,
        NotPresent: g.notPresentCount,
      })) ?? []
    );
  }, [dashboardData]);
  console.log("employeeIdleGraphData", employeeIdleGraphData);

  const employeeInCriticalAreaGraphData = useMemo(() => {
    const usecase = dashboardDataForScatterChart.find(
      (d) => d.title === "Employee in Critical Area",
    );

    return usecase?.graphs?.data?.data ?? [];
  }, [dashboardDataForScatterChart]);
  console.log(
    "employeenCriticalAreaGraphData",
    employeeInCriticalAreaGraphData,
  );

  const mobileUsageGraphData = useMemo(() => {
    const idleUsecase = dashboardData.find(
      (d) => d.title === "Mobile Phone Usage in Critical Area",
    );

    return (
      idleUsecase?.graphs?.data?.map((g) => ({
        gate: g.gate,
        Idle: g.idleCount,
        Working: g.workingCount,
        NotPresent: g.notPresentCount,
      })) ?? []
    );
  }, [dashboardData]);
  console.log("mobileUsageGraphData", mobileUsageGraphData);

  const mobilePhoneUsageInCriticalAreaGraphData = useMemo(() => {
    const usecase = dashboardDataForScatterChart.find(
      (d) => d.title === "Mobile Phone Usage in Critical Area",
    );

    return usecase?.graphs?.data?.data ?? [];
  }, [dashboardDataForScatterChart]);

  const sleepingAbsenceGraphData = useMemo(() => {
    const idleUsecase = dashboardData.find(
      (d) => d.title === "Sleeping / Absence of Security Personnel",
    );

    return (
      idleUsecase?.graphs?.data?.map((g) => ({
        gate: g.gate,
        Idle: g.idleCount,
        Working: g.workingCount,
        NotPresent: g.notPresentCount,
      })) ?? []
    );
  }, [dashboardData]);
  console.log("sleepingAbsenceGraphData", sleepingAbsenceGraphData);

  const tabs: TabConfig[] = [

      {
      label: "Employee Monitoring",
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
          )}
            </Box>
          </Grid>
        </Grid>
      ),
      featureId:FEATURE.EMPLOYEE_IDLE_TIME
    },
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
            <DynamicViolationScatterChartForWorkforce
              data={employeeInCriticalAreaGraphData}
            />
          </Grid>
        </Grid>
      ),
      featureId:FEATURE.EMPLOYEE_PRESENCE_CRITICAL_AREA
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
            <DynamicViolationScatterChartForWorkforce
              data={mobilePhoneUsageInCriticalAreaGraphData}
            />
            ,
          </Grid>
        </Grid>
      ),
      featureId:FEATURE.MOBILE_PHONE_USAGE
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
              data={[]}
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
      featureId:FEATURE.SAFETY_COMPLIANCE
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
          onRangeChange={handleworkforceTimeRangeChange}
          shifts={orgShifts || []}
        />
      </Box>

      {/* KPI Cards Grid */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {WorkforcekpiLoading || !dashboardData.length
          ? Array.from({ length: 4 }).map((_, index) => (
              <Grid
                key={index + 1}
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
        }}
      >
        <DashboardTabs tabs={tabs}  features={features} />
      </Box>
    </Paper>
  );
};

export default WorkforceMonitoring;
