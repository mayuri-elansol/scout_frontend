// app/config/dashboardTheme.ts
// Color tokens copied verbatim from the approved dashboard mockup's :root
// CSS variables — shared by the Dashboard v3 components (StatCard,
// AIUseCaseOverview, DetectionTrendChart, EventCard, UseCase*, UpgradeBanner)
// so every card uses the exact same palette.

import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

export type MuiIcon = OverridableComponent<SvgIconTypeMap<object, "svg">>;

export const DASHBOARD_COLORS = {
  primary: "#1E3A8A",
  primaryDark: "#152C6B",
  primaryTint: "#EEF2FB",
  secondary: "#2563EB",
  secondaryDark: "#1D4ED8",
  accent: "#0EA5E9",
  accentTint: "#E6F6FD",
  success: "#16A34A",
  successTint: "#EAF9EF",
  warning: "#F59E0B",
  warningTint: "#FEF6E7",
  warningText: "#B45309",
  error: "#DC2626",
  errorTint: "#FDECEC",
  workforce: "#8B5CF6",
  workforceTint: "#F3EFFE",
  bg: "#F5F7FA",
  card: "#FFFFFF",
  border: "#E5E7EB",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  hover: "#F3F4F6",
  gray: "#F1F2F4",
  grayText: "#6B7280",
} as const;

/** AI Use Case categories used across the top donut, trend chart, and status grid. */
export type UseCaseCategory =
  | "safety"
  | "surveillance"
  | "operational"
  | "workforce";

export const CATEGORY_LABEL: Record<UseCaseCategory, string> = {
  safety: "Safety & Compliance",
  surveillance: "Surveillance Monitoring",
  operational: "Operational Insights",
  workforce: "Workforce Monitoring",
};

export const CATEGORY_COLOR: Record<UseCaseCategory, string> = {
  safety: DASHBOARD_COLORS.primary,
  surveillance: DASHBOARD_COLORS.success,
  operational: DASHBOARD_COLORS.warning,
  workforce: DASHBOARD_COLORS.workforce,
};

export const CATEGORY_TINT: Record<UseCaseCategory, string> = {
  safety: DASHBOARD_COLORS.primaryTint,
  surveillance: DASHBOARD_COLORS.successTint,
  operational: DASHBOARD_COLORS.warningTint,
  workforce: DASHBOARD_COLORS.workforceTint,
};
