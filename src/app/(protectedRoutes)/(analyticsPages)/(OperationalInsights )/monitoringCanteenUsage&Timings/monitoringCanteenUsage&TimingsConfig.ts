import { SvgIconComponent } from "@mui/icons-material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EngineeringIcon from "@mui/icons-material/Engineering";

interface CanteenUsageKpiConfigItem {
  icon: SvgIconComponent;
  tooltipMessage: string;
}

export const canteenUsageKpiConfig: Record<string, CanteenUsageKpiConfigItem> = {
  "Breakfast Usage": {
    icon: FreeBreakfastIcon,
    tooltipMessage: "Total number of breakfasts served.",
  },
  "Lunch Usage": {
    icon: LunchDiningIcon,
    tooltipMessage: "Total number of lunches served.",
  },
  "Dinner Usage": {
    icon: DinnerDiningIcon,
    tooltipMessage: "Total number of dinners served.",
  },
  "Total Canteen Usage": {
    icon: RestaurantIcon,
    tooltipMessage: "Total meals served in the canteen.",
  },
  "Last Canteen Usage": {
    icon: AccessTimeIcon,
    tooltipMessage: "Most recent canteen usage record.",
  },
};

// Fallback used when a KPI title from the backend doesn't match the map above
export const canteenUsageFallbackIcon: SvgIconComponent = EngineeringIcon;

// Icon map used for zone sub-violation labels (breakfast/lunch/dinner)
export const canteenUsageSubIconMap: Record<string, SvgIconComponent> = {
  breakfast: FreeBreakfastIcon,
  lunch: LunchDiningIcon,
  dinner: DinnerDiningIcon,
};