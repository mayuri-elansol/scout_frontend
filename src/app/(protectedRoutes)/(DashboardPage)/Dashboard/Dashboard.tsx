// "use client";

// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { Box, Grid, Paper, Typography } from "@mui/material";
// import { DirectionsCar, Shield, Visibility, People } from "@mui/icons-material";

// import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
// import DashboardKpiCardMain from "@/app/components/molecules/DashboardKpiCardMain/DashboardKpiCardMain";

// import { useLazyGetMainDashboardKpiDataQuery } from "./DashboardApi";
// import { MainDashboardConfig } from "./DashboardConfig";
// import { MainDashboardResponse } from "./Dashboard.types";
// import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/store/store";
// import { v4 as uuidv4 } from "uuid";
// const Dashboard: React.FC = () => {
//   const { t } = useTranslation();
//   const { user } = useSelector((state: RootState) => state.auth);
//   const tenantId: string = user?.org_id ?? "";
//   console.log("tenant id from the dashboard", tenantId);
//   /* ---------- STATE ---------- */
//   const [isDashboardLiveMode, setIsDashboardLiveMode] = useState(true);

//   const [dashboardData, setDashboardData] =
//     useState<MainDashboardResponse | null>(null);
//   /* ---------- API HOOKS ---------- */
//   const [fetchMainDashboardKpi, { isLoading: MainDashboardkpiLoading }] =
//     useLazyGetMainDashboardKpiDataQuery();
//   /* ---------- INITIAL LOAD ---------- */
//   useEffect(() => {
//     const load = async () => {
//       const response = await fetchMainDashboardKpi({ tenantId }).unwrap();
//       setDashboardData(response);
//     };
//     load().catch(console.error);
//   }, [tenantId, fetchMainDashboardKpi]);

//   /* ---------- SOCKET (LIVE ONLY) ---------- */
//   // useSocketEvent<PpeSocketPayload>({
//   //   tenantId,
//   //   enabled: isLiveMode,
//   //   event: SOCKET_EVENTS.PPE_UPDATE,
//   //   handler: (payload) => {
//   //     console.log("payload form the socket", payload);
//   //     setDisplayKpi(payload.kpi ?? []);
//   //     setDisplayZoneViolations(payload.zoneViolations ?? []);
//   //     setRecentViolationsLive(payload.recentViolations ?? []);
//   //   },
//   // });

//   /* ---------- TIME FILTER ---------- */
//   const handleTimeRangeChange = useCallback(
//     async (range: { start?: string; end?: string }) => {
//       if (!range.start && !range.end) {
//         setIsDashboardLiveMode(true);
//         fetchMainDashboardKpi({ tenantId });
//         return;
//       }

//       setIsDashboardLiveMode(false);
//       const payload = {
//         tenantId: tenantId,
//         startDate: range.start,
//         endDate: range.end,
//       };
//       const [kpi] = await Promise.all([
//         fetchMainDashboardKpi(payload).unwrap(),
//       ]);

//       setDashboardData(kpi ?? []);
//     },
//     [tenantId, fetchMainDashboardKpi],
//   );

//   const safetyDashboardKpis = useMemo(() => {
//     if (!dashboardData?.safety) return [];

//     return dashboardData.safety.map((item) => {
//       const config =
//         item.title in MainDashboardConfig
//           ? MainDashboardConfig[item.title]
//           : undefined;

//       return {
//         ...item,
//         title: t(item.title),
//         route: config?.route || "/",
//       };
//     });
//   }, [dashboardData, t]);

//   const surveillanceDashboardKpis = useMemo(() => {
//     if (!dashboardData?.surveillance) return [];

//     return dashboardData.surveillance.map((item) => {
//       const config =
//         item.title in MainDashboardConfig
//           ? MainDashboardConfig[item.title]
//           : undefined;

//       return {
//         ...item,
//         title: t(item.title),
//         route: config?.route || "/",
//       };
//     });
//   }, [dashboardData, t]);
//   const operationalDashboardKpis = useMemo(() => {
//     if (!dashboardData?.operational) return [];

//     return dashboardData.operational.map((item) => {
//       const config =
//         item.title in MainDashboardConfig
//           ? MainDashboardConfig[item.title]
//           : undefined;

//       return {
//         ...item,
//         title: t(item.title),
//         route: config?.route || "/",
//       };
//     });
//   }, [dashboardData, t]);

//   const workforceDashboardKpis = useMemo(() => {
//     if (!dashboardData?.workforce) return [];

//     return dashboardData.workforce.map((item) => {
//       const config =
//         item.title in MainDashboardConfig
//           ? MainDashboardConfig[item.title]
//           : undefined;

//       return {
//         ...item,
//         title: t(item.title),
//         route: config?.route || "/",
//       };
//     });
//   }, [dashboardData, t]);
//   return (
//     <Paper
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         px: 2,
//         backgroundColor: "#ffffff",
//         gap: 1.5,
//         height: "auto",
//       }}
//     >
//       {/* Top Right Time Filter */}
//       <Box sx={{ display: "flex", justifyContent: "end", mt: 0.5 }}>
//         <TimeFilter onRangeChange={handleTimeRangeChange} />
//       </Box>

//       <Grid container spacing={1.5}>
//         {/* {CamerakpiData.map((kpi, index) => (
//           <Grid key={uuidv4() + index} size={{ xs: 12, sm: 3, md: 3, lg: 2.4 }}>
//             <DashboardKpiCardMain {...kpi} />
//           </Grid>
//         ))} */}
//       </Grid>

//       {/* Dashboard Sections Grid */}
//       <Grid container spacing={2} sx={{ mb: 1.3 }}>
//         {/* Row 1 - Safety & Compliance */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Paper
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               p: 1,
//               backgroundColor: "#ffffff",
//               borderRadius: 2,
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: "bold",
//                 fontSize: 18,
//                 mb: 1,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//               }}
//             >
//               <Shield sx={{ color: "#1976d2", fontSize: 23 }} /> Safety And
//               Compliance
//             </Typography>

//             <Grid container spacing={2.5} sx={{ mb: 4 }}>
//               {MainDashboardkpiLoading
//                 ? Array.from({ length: 4 }).map(() => (
//                     <Grid key={uuidv4()} size={{ xs: 12, md: 4, sm: 6 }}>
//                       <KpiCardSkeleton />
//                     </Grid>
//                   ))
//                 : safetyDashboardKpis.map((kpi) => (
//                     <Grid key={kpi.title} size={{ xs: 12, md: 4, sm: 6 }}>
//                       <DashboardKpiCardMain {...kpi} />
//                     </Grid>
//                   ))}
//             </Grid>
//           </Paper>
//         </Grid>

//         {/* Row 1 - Surveillance Monitoring */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Paper
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               p: 1,
//               backgroundColor: "#ffffff",
//               borderRadius: 2,
//               minHeight: 280,
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: "bold",
//                 fontSize: 18,
//                 mb: 1,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//               }}
//             >
//               <Visibility sx={{ color: "#1976d2", fontSize: 23 }} />{" "}
//               Surveillance Monitoring
//             </Typography>
//             <Grid container spacing={2.5} sx={{ mb: 4 }}>
//               {MainDashboardkpiLoading
//                 ? Array.from({ length: 4 }).map(() => (
//                     <Grid key={uuidv4()} size={{ xs: 12, md: 4, sm: 6 }}>
//                       <KpiCardSkeleton />
//                     </Grid>
//                   ))
//                 : surveillanceDashboardKpis.map((kpi) => (
//                     <Grid key={kpi.title} size={{ xs: 12, md: 4, sm: 6 }}>
//                       <DashboardKpiCardMain {...kpi} />
//                     </Grid>
//                   ))}
//             </Grid>
//           </Paper>
//         </Grid>

//         {/* Row 2 - Operational Insights */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Paper
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               p: 1,
//               backgroundColor: "#ffffff",
//               borderRadius: 2,
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: "bold",
//                 fontSize: 18,
//                 mb: 1,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//               }}
//             >
//               <DirectionsCar sx={{ color: "#1976d2", fontSize: 23 }} />{" "}
//               Operational Insights
//             </Typography>
//             <Grid container spacing={2.5} sx={{ mb: 4 }}>
//               {MainDashboardkpiLoading
//                 ? Array.from({ length: 4 }).map(() => (
//                     <Grid key={uuidv4()} size={{ xs: 12, md: 4, sm: 6 }}>
//                       <KpiCardSkeleton />
//                     </Grid>
//                   ))
//                 : operationalDashboardKpis.map((kpi) => (
//                     <Grid key={kpi.title} size={{ xs: 12, md: 4, sm: 6 }}>
//                       <DashboardKpiCardMain {...kpi} />
//                     </Grid>
//                   ))}
//             </Grid>
//           </Paper>
//         </Grid>

//         {/* Row 2 - Workforce Monitoring */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Paper
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               p: 1,
//               backgroundColor: "#ffffff",
//               borderRadius: 2,
//               minHeight: 280,
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: "bold",
//                 fontSize: 18,
//                 mb: 1,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//               }}
//             >
//               <People sx={{ color: "#1976d2", fontSize: 23 }} /> Workforce
//               Monitoring
//             </Typography>
//             <Grid container spacing={2.5} sx={{ mb: 4 }}>
//               {MainDashboardkpiLoading
//                 ? Array.from({ length: 4 }).map(() => (
//                     <Grid key={uuidv4()} size={{ xs: 12, md: 4, sm: 6 }}>
//                       <KpiCardSkeleton />
//                     </Grid>
//                   ))
//                 : workforceDashboardKpis.map((kpi) => (
//                     <Grid key={kpi.title} size={{ xs: 12, md: 4, sm: 6 }}>
//                       <DashboardKpiCardMain {...kpi} />
//                     </Grid>
//                   ))}
//             </Grid>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// export default Dashboard;

"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { DirectionsCar, Shield, Visibility, People } from "@mui/icons-material";

import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCardMain from "@/app/components/molecules/DashboardKpiCardMain/DashboardKpiCardMain";

import { useLazyGetMainDashboardKpiDataQuery } from "./DashboardApi";
import { MainDashboardConfig } from "./DashboardConfig";
import { DashboardItem, MainDashboardResponse } from "./Dashboard.types";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { v4 as uuidv4 } from "uuid";
const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";
  console.log("tenant id from the dashboard", tenantId);
  /* ---------- STATE ---------- */
  const [isDashboardLiveMode, setIsDashboardLiveMode] = useState(true);

  const [dashboardData, setDashboardData] =
    useState<MainDashboardResponse | null>(null);
  /* ---------- API HOOKS ---------- */
  const [fetchMainDashboardKpi, { isLoading: MainDashboardkpiLoading }] =
    useLazyGetMainDashboardKpiDataQuery();
  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    const load = async () => {
      const response = await fetchMainDashboardKpi({ tenantId }).unwrap();
      setDashboardData(response);
    };
    load().catch(console.error);
  }, [tenantId, fetchMainDashboardKpi]);

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
  const handleTimeRangeChange = useCallback(
    async (range: { start?: string; end?: string }) => {
      if (!range.start && !range.end) {
        setIsDashboardLiveMode(true);
        fetchMainDashboardKpi({ tenantId });
        return;
      }

      setIsDashboardLiveMode(false);
      const payload = {
        tenantId: tenantId,
        startDate: range.start,
        endDate: range.end,
      };
      const [kpi] = await Promise.all([
        fetchMainDashboardKpi(payload).unwrap(),
      ]);

      setDashboardData(kpi ?? []);
    },
    [tenantId, fetchMainDashboardKpi],
  );

  const mapDashboardItemToKpiCard = (item: DashboardItem, route?: string) => ({
    title: item.kpi.title,
    colour: item.kpi.colour,
    violationsCount: item.kpi.violationsCount,
    lastDetection: item.kpi.lastDetection,
    lastDetectionTime: item.kpi.lastDetectionTime,
    route,
  });
  const safetyDashboardKpis = useMemo(() => {
    if (!dashboardData?.safety) return [];

    return dashboardData.safety.map((item) => {
      const config =
        MainDashboardConfig[item.title as keyof typeof MainDashboardConfig];

      return mapDashboardItemToKpiCard(item, config?.route || "/");
    });
  }, [dashboardData, t]);

  const surveillanceDashboardKpis = useMemo(() => {
    if (!dashboardData?.surveillance) return [];

    return dashboardData.surveillance.map((item) => {
      const config =
        MainDashboardConfig[item.title as keyof typeof MainDashboardConfig];

      return mapDashboardItemToKpiCard(item, config?.route || "/");
    });
  }, [dashboardData, t]);

  const operationalDashboardKpis = useMemo(() => {
    if (!dashboardData?.operational) return [];

    return dashboardData.operational.map((item) => {
      const config =
        MainDashboardConfig[item.title as keyof typeof MainDashboardConfig];

      return mapDashboardItemToKpiCard(item, config?.route || "/");
    });
  }, [dashboardData, t]);

  const workforceDashboardKpis = useMemo(() => {
    if (!dashboardData?.workforce) return [];

    return dashboardData.workforce.map((item) => {
      const config =
        MainDashboardConfig[item.title as keyof typeof MainDashboardConfig];

      return mapDashboardItemToKpiCard(item, config?.route || "/");
    });
  }, [dashboardData, t]);
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        px: 2,
        backgroundColor: "#ffffff",
        gap: 1.5,
        height: "auto",
      }}
    >
      {/* Top Right Time Filter */}
      <Box sx={{ display: "flex", justifyContent: "end", mt: 0.5 }}>
        <TimeFilter onRangeChange={handleTimeRangeChange} />
      </Box>

      <Grid container spacing={1.5}>
        {/* {CamerakpiData.map((kpi, index) => (
          <Grid key={uuidv4() + index} size={{ xs: 12, sm: 3, md: 3, lg: 2.4 }}>
            <DashboardKpiCardMain {...kpi} />
          </Grid>
        ))} */}
      </Grid>

      {/* Dashboard Sections Grid */}
      <Grid container spacing={2} sx={{ mb: 1.3 }}>
        {/* Row 1 - Safety & Compliance */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 1,
              backgroundColor: "#ffffff",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: 18,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Shield sx={{ color: "#1976d2", fontSize: 23 }} /> Safety And
              Compliance
            </Typography>

            <Grid container spacing={2.5} sx={{ mb: 4 }}>
              {MainDashboardkpiLoading
                ? Array.from({ length: 4 }).map(() => (
                    <Grid key={uuidv4()} size={{ xs: 12, md: 4, sm: 6 }}>
                      <KpiCardSkeleton />
                    </Grid>
                  ))
                : safetyDashboardKpis.map((kpi) => (
                    <Grid key={kpi.title} size={{ xs: 12, md: 4, sm: 6 }}>
                      <DashboardKpiCardMain {...kpi} />
                    </Grid>
                  ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Row 1 - Surveillance Monitoring */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 1,
              backgroundColor: "#ffffff",
              borderRadius: 2,
              minHeight: 280,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: 18,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Visibility sx={{ color: "#1976d2", fontSize: 23 }} />{" "}
              Surveillance Monitoring
            </Typography>
            <Grid container spacing={2.5} sx={{ mb: 4 }}>
              {MainDashboardkpiLoading
                ? Array.from({ length: 4 }).map(() => (
                    <Grid key={uuidv4()} size={{ xs: 12, md: 4, sm: 6 }}>
                      <KpiCardSkeleton />
                    </Grid>
                  ))
                : surveillanceDashboardKpis.map((kpi) => (
                    <Grid key={kpi.title} size={{ xs: 12, md: 4, sm: 6 }}>
                      <DashboardKpiCardMain {...kpi} />
                    </Grid>
                  ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Row 2 - Operational Insights */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 1,
              backgroundColor: "#ffffff",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: 18,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <DirectionsCar sx={{ color: "#1976d2", fontSize: 23 }} />{" "}
              Operational Insights
            </Typography>
            <Grid container spacing={2.5} sx={{ mb: 4 }}>
              {MainDashboardkpiLoading
                ? Array.from({ length: 4 }).map(() => (
                    <Grid key={uuidv4()} size={{ xs: 12, md: 4, sm: 6 }}>
                      <KpiCardSkeleton />
                    </Grid>
                  ))
                : operationalDashboardKpis.map((kpi) => (
                    <Grid key={kpi.title} size={{ xs: 12, md: 4, sm: 6 }}>
                      <DashboardKpiCardMain {...kpi} />
                    </Grid>
                  ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Row 2 - Workforce Monitoring */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 1,
              backgroundColor: "#ffffff",
              borderRadius: 2,
              minHeight: 280,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: 18,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <People sx={{ color: "#1976d2", fontSize: 23 }} /> Workforce
              Monitoring
            </Typography>
            <Grid container spacing={2.5} sx={{ mb: 4 }}>
              {MainDashboardkpiLoading
                ? Array.from({ length: 4 }).map(() => (
                    <Grid key={uuidv4()} size={{ xs: 12, md: 4, sm: 6 }}>
                      <KpiCardSkeleton />
                    </Grid>
                  ))
                : workforceDashboardKpis.map((kpi) => (
                    <Grid key={kpi.title} size={{ xs: 12, md: 4, sm: 6 }}>
                      <DashboardKpiCardMain {...kpi} />
                    </Grid>
                  ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashboard;
