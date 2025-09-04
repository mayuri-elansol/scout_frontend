import React, { useState } from "react";
import { KpiData, PageType } from "@/app/types";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  Shield,
  Warning,
  Visibility,
  People,
  DirectionsCar,
  Schedule,
  Place,
} from "@mui/icons-material";

// Import using new atomic design structure
import {
  Header,
  Sidebar,
  Breadcrumb,
  ActivityFeed,
  CameraStatus,
} from "@/app/components/organisms";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";

// Import other page components
import PPEDetection from "../(AnalyticsPages)/PPEDetectionPage/page";
import IntrusionDetection from "../(AnalyticsPages)/IntrusionDetectionPage/page";
import EmployeePresence from "../(AnalyticsPages)/EmployeePresencePage/page";
import PeopleCount from "../(AnalyticsPages)/PeopleCountPage/page";
import LiveStreaming from "../LiveStreamingPage/page";
import SystemAlerts from "../AlertsPage/SystemAlerts";
import Phonesidebar from "@/app/components/organisms/PhoneSidebar/Phonesidebar";
// import WelcomeBanner from "@/components/templates/welcome/WelcomeBanner";
import { useTranslation } from "react-i18next";

export interface DashboardPageProps {}

const Dashboard: React.FC<DashboardPageProps> = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isTabletOrPhone = useMediaQuery(theme.breakpoints.down("lg"));
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");

  const kpiData: KpiData[] = [
    {
      title: t("PPE Compliance"),
      value: "87.5%",
      subtitle: "3 violations in last hour",
      trend: "-2.3%",
      trendColor: "#f44336",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: Shield,
    },
    {
      title: "Fire Incidents",
      value: "0",
      subtitle: "All systems operational",
      trend: "Clear",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: Warning,
    },
    {
      title: "Security Breach",
      value: "1",
      subtitle: "Gate 3 unauthorized access",
      trend: "Active",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: Visibility,
    },
    {
      title: "Employees Present",
      value: "234",
      subtitle: "98.3% attendance rate",
      trend: "+5.2%",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: People,
    },
    {
      title: "Total People",
      value: "267",
      subtitle: "Including 33 visitors",
      trend: "+12",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      icon: People,
    },
    {
      title: "Avg Speed (km/h)",
      value: "15",
      subtitle: "2 speed violations",
      trend: "2 alerts",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: DirectionsCar,
    },
    {
      title: "Vehicles Tracked",
      value: "45",
      subtitle: "License plates recognized",
      trend: "99.1%",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: DirectionsCar,
    },
    {
      title: "Avg Work Hours",
      value: "7.2",
      subtitle: "89% efficiency rate",
      trend: "+1.8%",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      icon: Schedule,
    },
    {
      title: "Zone Occupancy",
      value: "85%",
      subtitle: "Within safe limits",
      trend: "Normal",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: Place,
    },
    {
      title: "Crowd Alert",
      value: "1",
      subtitle: "Cafeteria overcrowding",
      trend: "1 alert",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: People,
    },
  ];

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f7fa" }}
    >
      {/* Sidebar */}
      {/* <Sidebar currentPage={currentPage} onPageChange={handlePageChange} /> */}
      {/* Sidebar (Desktop & Laptop) */}
      {/* {!isTabletOrPhone && (
        <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      )} */}

      {/* PhoneSidebar (Tablet & Phone) */}
      {/* {isTabletOrPhone && (
        <Phonesidebar
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )} */}
      {/* Main Content */}
      <Box>
        {/* Breadcrumb */}
        {/* <Breadcrumb currentPage={currentPage} onPageChange={handlePageChange} /> */}

        {/* Welcome Page */}

        {/* Dashboard Content */}
        {currentPage === "dashboard" && (
          <>
            {/* KPI Cards Grid */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                gap: 2.5,
                mb: 4,
                px: 2,
              }}
            >
              {kpiData.map((kpi, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "calc(20% - 16px)",
                    minWidth: "200px",
                  }}
                >
                  <KpiCard {...kpi} />
                </Box>
              ))}
            </Box>

            {/* Activity Feed and Camera Status */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
                px: 2,
              }}
            >
              <Box sx={{ flex: "1 1 60%", minWidth: "400px", mb: 2 }}>
                <ActivityFeed />
              </Box>
              <Box sx={{ flex: "1 1 35%", minWidth: "300px", mb: 2 }}>
                <CameraStatus />
              </Box>
            </Box>
          </>
        )}
        {/* Welcome Page */}
        {/* {currentPage === "welcome" && (
          <Box sx={{ px: 2, pt: 2 }}>
            <WelcomeBanner />
          </Box>
        )} */}
        {/* PPE Detection Page */}
        {currentPage === "ppe-detection" && (
          <Box sx={{ px: 2, pt: 2 }}>
            <PPEDetection />
          </Box>
        )}

        {/* Intrusion Detection Page */}
        {currentPage === "intrusion-detection" && (
          <Box sx={{ px: 2, pt: 2 }}>
            <IntrusionDetection />
          </Box>
        )}

        {/* Employee Presence Page */}
        {currentPage === "employee-presence" && (
          <Box sx={{ px: 2, pt: 2 }}>
            <EmployeePresence />
          </Box>
        )}

        {/* People Count Page */}
        {currentPage === "people-count" && (
          <Box sx={{ px: 2, pt: 2 }}>
            <PeopleCount />
          </Box>
        )}

        {/* Live Streaming Page */}
        {currentPage === "live-streaming" && (
          <Box sx={{ px: 2, pt: 2 }}>
            <LiveStreaming />
          </Box>
        )}

        {/* System Alerts Page */}
        {currentPage === "alerts" && (
          <Box sx={{ px: 2, pt: 2 }}>
            <SystemAlerts />
          </Box>
        )}

        {/* Other pages content would go here */}
        {currentPage !== "dashboard" &&
          currentPage !== "ppe-detection" &&
          currentPage !== "intrusion-detection" &&
          currentPage !== "employee-presence" &&
          currentPage !== "people-count" &&
          currentPage !== "live-streaming" &&
          currentPage !== "alerts" && (
            <Box sx={{ px: 2, pt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "60vh",
                  backgroundColor: "white",
                  borderRadius: 1.5,
                  border: "1px solid #e0e0e0",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" sx={{ color: "#5c6b7d", mb: 1 }}>
                    {currentPage.replace("-", " ").toUpperCase()} Page
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#9aa0a6" }}>
                    This page is under development
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default Dashboard;
