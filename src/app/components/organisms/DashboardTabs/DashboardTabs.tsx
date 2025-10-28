"use client";

import React, { useState, ReactNode } from "react";
import { Box } from "@mui/material";
import styles from "./DashboardTabs.module.css";

// Tab configuration
export interface TabConfig {
  label: string | ReactNode;
  content: ReactNode;
}

interface DynamicTabsProps {
  readonly tabs: TabConfig[];
  readonly defaultTab?: number;
  readonly onTabChange?: (index: number) => void;
}

// Type-safe props for TabPanel
interface TabPanelProps {
  readonly children: ReactNode;
  readonly value: number;
  readonly index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

export default function DynamicTabs({
  tabs = [],
  defaultTab = 0,
  onTabChange,
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
    <Box sx={{ width: "100%" }}>
      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          {tabs.map((tab, index) => (
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
          ))}
        </div>
        <div className={styles.tabsUnderline}></div>
      </div>

      {tabs.map((tab, index) => (
        <TabPanel key={index + 1} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
}
