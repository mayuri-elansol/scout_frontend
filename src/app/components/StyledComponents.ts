import { styled } from "@mui/material/styles";
import { Box, Card, Typography, AppBar, Drawer } from "@mui/material";

// Header Components
export const HeaderContainer = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 3),
  zIndex: 1000,
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const LogoIcon = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
  fontWeight: "bold",
  fontSize: "18px",
}));

export const StatusIndicator = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
}));

// Sidebar Components
export const SidebarContainer = styled(Drawer)(({}) => ({
  width: 240,
  "& .MuiDrawer-paper": {
    width: 240,
    marginTop: 64,
    height: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
}));

export const SidebarContent = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
}));

export const ElansoleContainer = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  textAlign: "center",
}));

export const ElansoleLogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(1),
  gap: theme.spacing(1.5),
}));

export const ElansoleText = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const ElansoleArrow = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "24px",
  fontWeight: "bold",
}));

export const ElansoleDivider = styled(Box)(({ theme }) => ({
  width: 2,
  height: 30,
  backgroundColor: theme.palette.text.primary,
}));

// Main Content Components
export const MainContentContainer = styled(Box)(({ theme }) => ({
  marginLeft: 240,
  marginTop: 64,
  flex: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

export const BreadcrumbContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const BreadcrumbContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

// KPI Card Components
export const KpiCardContainer = styled(Card)<{ bgcolor: string }>(
  ({ theme, bgcolor }) => ({
    backgroundColor: bgcolor,
    borderRadius: theme.spacing(2),
    height: "100%",
    border: "none",
    boxShadow: "none",
  })
);

export const KpiCardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: theme.spacing(1),
}));

export const KpiTrendChip = styled(Box)<{ trendcolor: string }>(
  ({ theme, trendcolor }) => ({
    fontSize: "12px",
    fontWeight: 600,
    color: trendcolor,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(1),
  })
);

export const KpiValue = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: "bold",
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5),
}));

export const KpiTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5),
}));

export const KpiSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.secondary,
}));

// Activity Card Components
export const ActivityCardContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}));

export const ActivityCardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: theme.spacing(1),
}));

export const ActivityCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const ActivityCardDescription = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export const ActivityCardLocation = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.grey[500],
  marginBottom: theme.spacing(1),
}));

export const ActivityCardId = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.grey[500],
  marginBottom: theme.spacing(2),
}));

export const LiveFeedPreview = styled(Box)(({ theme }) => ({
  height: 80,
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

export const LiveFeedContent = styled(Box)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.grey[500],
}));

export const ActivityButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));

// Camera Status Components
export const CameraStatusContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const CameraStatusHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

export const CameraStatusTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const CameraStatusCount = styled(Typography)<{ statuscolor: string }>(
  ({ theme, statuscolor }) => ({
    fontSize: "14px",
    fontWeight: 600,
    color: statuscolor,
  })
);

export const CameraStatusPriority = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// Employee Check-in Components
export const EmployeeCheckContainer = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
}));

export const EmployeeCheckHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export const EmployeeCheckTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const EmployeeCheckDescription = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.secondary,
}));
