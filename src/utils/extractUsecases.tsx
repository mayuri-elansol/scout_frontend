// src/utils/extractUseCases.ts
import { dashboardMenu, alertMenu, MenuItemConfig, CategoryConfig, analyticsMenu } from "../../src/app/config/menuConfig";

// Recursively collect names
const collectNames = (menuItems: (MenuItemConfig | CategoryConfig)[]): string[] => {
  let names: string[] = [];

  menuItems.forEach((item) => {
    if ("items" in item) {
      // CategoryConfig
      names.push(item.title);
      names = [...names, ...collectNames(item.items)];
    } else {
      // MenuItemConfig
      names.push(item.name);
    }
  });

  return names;
};

export const getAllUseCases = (): string[] => {
  return [
    ...collectNames(dashboardMenu),
    ...collectNames(alertMenu),
    // ...collectNames(settingsMenu),
    ...collectNames(analyticsMenu),
  ];
};
