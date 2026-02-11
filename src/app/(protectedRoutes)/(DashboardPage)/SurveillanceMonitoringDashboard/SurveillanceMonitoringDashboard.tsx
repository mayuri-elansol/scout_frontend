
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
import DynamicViolationScatterChart from "@/app/components/organisms/ScatterChart/ScatterChart";
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



  const buildScatterData = (graph?: IntrusionTrendResponse) => {
    if (!graph || !graph.series) return [];

    return graph.series.flatMap((series) =>
      series.data.map((point) => ({
        time: point.label.includes(":") ? point.label : `${point.label}:00`,
        zone: series.zone,
        count: point.count,
      }))
    );
  };
  const intrusionDashboard = displaySurveillanceKpi.find(
    (d) => d.title === "Intrusion Detection",
  );
  const unauthorizedDashboard = displaySurveillanceKpi.find(
    (d) => d.title === "Unauthorized Access",
  );

  const movementDashboard = displaySurveillanceKpi.find(
    (d) => d.title === "Movement During Shutdown",
  );

  const tamperingDashboard = displaySurveillanceKpi.find(
    (d) => d.title === "Camera Tempering Detection",
  );

  const intrusionScatterData = useMemo(
    () => buildScatterData(intrusionDashboard?.graphs.data),
    [intrusionDashboard],
  );


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

            {intrusionDashboard && (
              <DynamicViolationScatterChart
                item={intrusionDashboard}
              />
            )}
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
            {unauthorizedDashboard && (
              <DynamicViolationScatterChart item={unauthorizedDashboard} />
            )}          </Grid>
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
             // height: { xs: "50vh", md: "100%" },
                 height: { xs: "50vh", md: "360px" }, // ensure enough height

              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
            padding={{ xs: "10px" }}
          >
            {movementDashboard && (
              <DynamicViolationScatterChart item={movementDashboard} />
            )}          </Grid>
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

