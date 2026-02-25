"use client";

import React, { useState, ReactNode } from "react";
import { Box, Paper, Tooltip } from "@mui/material";
import styles from "./DashboardTabs.module.css";
import { hasFeature } from "@/utils/hasFeature";
// Tab configuration
export interface TabConfig {
  label: string | ReactNode;
  content: ReactNode;
  featureId?: string;
}

interface DynamicTabsProps {
  readonly tabs: TabConfig[];
  readonly defaultTab?: number;
  readonly onTabChange?: (index: number) => void;
  readonly features: string[];
}

// Type-safe props for TabPanel
interface TabPanelProps {
  readonly children: ReactNode;
  readonly value: number;
  readonly index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`tab-${index}`}
      sx={{
        display: value === index ? "flex" : "none",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
}

export default function DynamicTabs({
  tabs = [],
  defaultTab = 0,
  onTabChange,
  features
}: DynamicTabsProps) {
  const [value, setValue] = useState(defaultTab);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    onTabChange?.(newValue);
  };

  if (!tabs || tabs.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
        No tabs available
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          {/* {tabs.map((tab, index) => (
            <React.Fragment key={index + 1}>
              <button
                className={`${styles.tab} ${
                  value === index ? styles.tabActive : ""
                }`}
                onClick={() => handleChange(index)}
                role="tab"
                aria-selected={value === index}
                id={`tab-${index}`}
              >
                <span className={styles.tabLabel}>{tab.label}</span>
                <div className={styles.tabBackground}></div>
              </button>
              {index < tabs.length - 1 &&
                value !== index &&
                value !== index + 1 && (
                  <div className={styles.tabDivider}></div>
                )}
            </React.Fragment>
          ))} */}
          {/* {tabs.map((tab, index) => {
  const enabled = tab.featureId
    ? hasFeature(features, tab.featureId)
    : true;

  return (
    <React.Fragment key={index}>
      <button
        className={`${styles.tab} ${
          value === index ? styles.tabActive : ""
        }`}
        onClick={() => {
          if (enabled) {
            handleChange(index);
          }
        }}
        role="tab"
        aria-selected={value === index}
        id={`tab-${index}`}
        disabled={!enabled}
        
        style={{
          opacity: enabled ? 1 : 0.4,
          cursor: enabled ? "pointer" : "default",
          pointerEvents: enabled ? "auto" : "none", 
        }}
      >
        <span className={styles.tabLabel}>{tab.label}</span>
        <div className={styles.tabBackground}></div>

        
      </button>

      {index < tabs.length - 1 &&
        value !== index &&
        value !== index + 1 && (
          <div className={styles.tabDivider}></div>
        )}
    </React.Fragment>
  );
})} */}

{tabs.map((tab, index) => {
  const enabled = tab.featureId
    ? hasFeature(features, tab.featureId)
    : true;

  const tabButton = (
    <button
      className={`${styles.tab} ${value === index ? styles.tabActive : ""}`}
      onClick={() => {
        if (enabled) handleChange(index);
      }}
      role="tab"
      aria-selected={value === index}
      id={`tab-${index}`}
      disabled={!enabled}
      style={{
        opacity: enabled ? 1 : 0.4,
        cursor: enabled ? "pointer" : "default",
        pointerEvents: enabled ? "auto" : "none",
        position: "relative",
      }}
    >
      <span className={styles.tabLabel}>{tab.label}</span>
      <div className={styles.tabBackground}></div>
    </button>
  );

  return (
     <React.Fragment key={index}>
      {!enabled ? (
        <Tooltip title="Upgrade your plan to access chart" arrow placement="top">
          {/* Wrap in a span to satisfy Tooltip requirement */}
          <span style={{ display: "inline-block" }}>{tabButton}</span>
        </Tooltip>
      ) : (
        tabButton
      )}

      {index < tabs.length - 1 &&
        value !== index &&
        value !== index + 1 && (
          <div className={styles.tabDivider}></div>
        )}
    </React.Fragment>
  );
})}
        </div>
        <div className={styles.tabsUnderline}></div>
      </div>

      <Box
        sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
      >
        {tabs.map((tab, index) => (
          <TabPanel key={index + 1} value={value} index={index}>
            <Paper sx={{ m: 2, height: "100%" }}>{tab.content}</Paper>
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}
