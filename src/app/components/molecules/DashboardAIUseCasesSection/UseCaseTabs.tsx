"use client";
import React from "react";
import { Box } from "@mui/material";
import { DASHBOARD_COLORS, UseCaseCategory } from "@/app/config/dashboardTheme";

export interface UseCaseTab {
  key: UseCaseCategory;
  label: string;
}

export interface UseCaseTabsProps {
  tabs: UseCaseTab[];
  active: UseCaseCategory;
  onChange: (key: UseCaseCategory) => void;
}

/** Mirrors the mockup's `.filter-pills` — category filter for the AI Use Cases Status grid. */
const UseCaseTabs: React.FC<UseCaseTabsProps> = ({ tabs, active, onChange }) => (
  <Box sx={{ display: "flex", gap: "8px", padding: "10px 20px 2px 20px", flexWrap: "wrap" }}>
    {tabs.map((tab) => {
      const isActive = tab.key === active;
      return (
        <Box
          key={tab.key}
          component="button"
          onClick={() => onChange(tab.key)}
          sx={{
            backgroundColor: isActive ? DASHBOARD_COLORS.secondary : DASHBOARD_COLORS.bg,
            color: isActive ? "#fff" : DASHBOARD_COLORS.textSecondary,
            border: "1px solid transparent",
            borderRadius: "20px",
            padding: "5px 12px",
            fontSize: "12px",
            fontWeight: 700,
            fontFamily: "inherit",
            cursor: "pointer",
            transition: "background-color .12s ease, color .12s ease",
            "&:hover": !isActive ? { color: DASHBOARD_COLORS.textPrimary } : undefined,
          }}
        >
          {tab.label}
        </Box>
      );
    })}
  </Box>
);

export default UseCaseTabs;
