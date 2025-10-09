"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import CrowdGatheringChart from "../CrowdGatheringChart/CrowdGatheringChart";
import ExitStatusChart from "../ExitStatusChart/ExitStatusChart";
import FallIncidentChart from "../FallIncidentChart/FallIncidentChart";
import HazardDetectionChart from "../HazardDetectionChart/HazardDetectionChart";
import PPEComplianceChart from "../PPEComplianceChart/PPEComplianceChart";
import styles from "./DashboardTabs.module.css";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DashboardTabs() {
  const [value, setValue] = useState(0);

  const tabs = [
    "PPE Compliance",
    "Hazard Detection",
    "Fall Incidents",
    "Exit Status",
    "Crowd Gathering",
    "Camera Status",
  ];

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Chrome-style tabs container */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          {tabs.map((label, index) => (
            <React.Fragment key={index}>
              <button
                className={`${styles.tab} ${value === index ? styles.tabActive : ""}`}
                onClick={() => handleChange(index)}
                role="tab"
                aria-selected={value === index}
              >
                <span className={styles.tabLabel}>{label}</span>
                <div className={styles.tabBackground}></div>
              </button>
              {/* Show divider after each tab except last, and not before/after active tab */}
              {index < tabs.length - 1 && 
               value !== index && 
               value !== index + 1 && (
                <div className={styles.tabDivider}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className={styles.tabsUnderline}></div>
      </div>

      {/* Tab Panels */}
      <TabPanel value={value} index={0}>
        <PPEComplianceChart />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HazardDetectionChart />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FallIncidentChart />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ExitStatusChart />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CrowdGatheringChart />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <CameraStatus
          cameraZones={[
            { zone: "Production Floor", active: 8, total: 10, offline: 2, tempred: 4 },
            { zone: "Warehouse", active: 3, total: 5, offline: 2, tempred: 3 },
          ]}
          loading={false}
          maxheight={400}
        />
      </TabPanel>
    </Box>
  );
}