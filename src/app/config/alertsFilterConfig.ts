// src/config/alertsFilterConfig.ts

export interface AlertCategory {
  value: string;
  label: string;
  subCategories: string[];
}

export interface AlertsFilterConfig {
  categories: AlertCategory[];
}

/**
 * Configuration for Alerts Filter Panel Categories and Sub-Categories
 * This configuration defines the hierarchical structure used in the AlertsFilterPanel component
 */
export const alertsFilterConfig: AlertsFilterConfig = {
  categories: [
    {
      value: "safety-compliance",
      label: "Safety & Compliance",
      subCategories: [
        "Personal Protective Equipment (PPE) Detection",
        "Fire, Smoke, Oil and Gas Leak Detection",
        "Vehicle Speed Monitoring inside premises",
        "Fall Detection (Laydown/Sleeping Detection in Work Areas)",
        "STP/ETP Overflow Detection",
        "Emergency Exit Blockage Detection",
        "Crowd Gathering in Hazardous Zones",
      ],
    },
    {
      value: "security-monitoring",
      label: "Security Monitoring",
      subCategories: [
        "Intrusion Detection at Premises Perimeter",
        "Camera Tampering or Offline Detection",
        "People Presence during Shutdown Hours",
      ],
    },
    {
      value: "workforce-monitoring",
      label: "Workforce Monitoring",
      subCategories: [
        "Employee Presence Detection in Critical Areas",
        "Employee Idle Time Monitoring (Without face Recognition)",
        "Mobile Phone Usage in Restricted Areas",
        "People Count in Factory Premises based on Entry Exit beacon Counting",
        "Sleeping or Absence of Security Personnel",
      ],
    },
    {
      value: "vehicle-operational-insights",
      label: "Vehicle Operational Insights",
      subCategories: [
        "Vehicle Count & ANPR at Entry/Exit Gates",
        "Tracking Vehicle Unloading/Loading Time",
        "Unauthorized Parking or Equipment Blocking Areas",
      ],
    },
    {
      value: "facial-recognition-analytics",
      label: "Facial Recognition Analytics",
      subCategories: [
        "Unauthorized Access in Restricted Areas",
        "Face Recognition for Entry/Exit Logging, (Attendance system Lite)",
        "Monitoring Canteen Usage & Timings",
        "Employee Idle Time Monitoring ",
      ],
    },
  ],
};

/**
 * Helper function to get all category options
 */
export const getCategoryOptions = (): AlertCategory[] => {
  return alertsFilterConfig.categories;
};

/**
 * Helper function to get sub-categories for a specific category
 * @param categoryValue - The value of the category
 * @returns Array of sub-category strings
 */
export const getSubCategoriesForCategory = (
  categoryValue: string
): string[] => {
  const category = alertsFilterConfig.categories.find(
    (cat) => cat.value === categoryValue
  );
  return category ? category.subCategories : [];
};

/**
 * Helper function to get category label by value
 * @param categoryValue - The value of the category
 * @returns Category label or empty string if not found
 */
export const getCategoryLabel = (categoryValue: string): string => {
  const category = alertsFilterConfig.categories.find(
    (cat) => cat.value === categoryValue
  );
  return category ? category.label : "";
};

/**
 * Helper function to get category value by label
 * @param categoryLabel - The label of the category
 * @returns Category value or empty string if not found
 */
export const getCategoryValue = (categoryLabel: string): string => {
  const category = alertsFilterConfig.categories.find(
    (cat) => cat.label === categoryLabel
  );
  return category ? category.value : "";
};

/**
 * Helper function to check if a sub-category exists in a category
 * @param categoryValue - The value of the category
 * @param subCategory - The sub-category to check
 * @returns Boolean indicating if sub-category exists
 */
export const isValidSubCategory = (
  categoryValue: string,
  subCategory: string
): boolean => {
  const subCategories = getSubCategoriesForCategory(categoryValue);
  return subCategories.includes(subCategory);
};

/**
 * Helper function to get all sub-categories across all categories
 * @returns Array of all sub-category strings
 */
export const getAllSubCategories = (): string[] => {
  return alertsFilterConfig.categories.flatMap(
    (category) => category.subCategories
  );
};

/**
 * Helper function to find which category a sub-category belongs to
 * @param subCategory - The sub-category to search for
 * @returns Category object or undefined if not found
 */
export const getCategoryBySubCategory = (
  subCategory: string
): AlertCategory | undefined => {
  return alertsFilterConfig.categories.find((category) =>
    category.subCategories.includes(subCategory)
  );
};

// Export default config for direct import
export default alertsFilterConfig;
