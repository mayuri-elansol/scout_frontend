import {
  dashboardMenu,
  alertMenu,
  analyticsMenu,
  MenuItemConfig,
  CategoryConfig,
} from "../../src/app/config/menuConfig";

// Type guard to detect CategoryConfig
const isCategoryConfig = (item: MenuItemConfig | CategoryConfig): item is CategoryConfig => {
  return "title" in item && "items" in item;
};

// Recursively collect names
const collectNames = (menuItems: (MenuItemConfig | CategoryConfig)[]): string[] => {
  let names: string[] = [];

  menuItems.forEach((item) => {
    if (isCategoryConfig(item)) {
      // CategoryConfig
      names.push(item.title);
      names = [...names, ...collectNames(item.items)];
    } else if (item.type === "group") {
      // GroupMenuItem
      names = [...names, ...collectNames(item.items)];
    } else {
      // LinkMenuItem
      names.push(item.name);
    }
  });

  return names;
};

export const getAllUseCases = (): string[] => {
  return [
    ...collectNames(dashboardMenu),
    ...collectNames(alertMenu),
    // ...collectNames(settingsMenu), // uncomment if needed
    ...collectNames(analyticsMenu),
  ];
};