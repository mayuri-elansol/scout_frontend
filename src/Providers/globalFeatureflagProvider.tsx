// // src/components/FeatureGuardProvider.tsx
// "use client";

// import { useFeature } from "@/customhooks/useFeature";
// import {  usePathname } from "next/navigation";
// import { ReactNode } from "react";
// import { menuConfig } from "@/app/config/menuConfig";
// import UnauthorizedAccess from "@/app/components/organisms/UnauthorizedAccess/UnauthorizedAccess";

// interface FeatureGuardProviderProps {
//   children: ReactNode;
// }

// const getFeatureIdByPath = (path: string): string | undefined => {
//   const allMenus = [
//     ...menuConfig.liveStreamingMenu,
//     ...menuConfig.alertMenu,
//     ...menuConfig.dashboardMenu.flatMap((c: any) => c.items),
//     ...menuConfig.analyticsMenu.flatMap((c: any) => c.items),
//     ...menuConfig.settingsMenu.flatMap((c: any) => c.items),
//   ];

//   const matched = allMenus.find((item) => item.path === path);
//   return matched?.featureId;
// };

// export const FeatureGuardProvider = ({ children }: FeatureGuardProviderProps) => {
//   const pathname = usePathname();

//   const featureId = getFeatureIdByPath(pathname ?? "");
//   const featureEnabled = useFeature(featureId ?? "");
//   const hasAccess = featureId ? featureEnabled : true;

//   if (!hasAccess) {
//     return <UnauthorizedAccess />; 
//   }

//   return <>{children}</>;
// };

"use client";

import { useFeature } from "@/customhooks/useFeature";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { menuConfig, MenuItemConfig } from "@/app/config/menuConfig";
import UnauthorizedAccess from "@/app/components/organisms/UnauthorizedAccess/UnauthorizedAccess";

interface FeatureGuardProviderProps {
  children: ReactNode;
}

/** Recursive search for featureId by path */
const getFeatureIdByPath = (path: string, menus: MenuItemConfig[]): string | undefined => {
  for (const item of menus) {
    if (item.type === "link" && item.path?.toLowerCase() === path.toLowerCase()) {
      return item.featureId;
    } else if (item.type === "group" && item.items.length > 0) {
      const found = getFeatureIdByPath(path, item.items);
      if (found) return found;
    }
  }
  return undefined;
};

export const FeatureGuardProvider = ({ children }: FeatureGuardProviderProps) => {
  const pathname = usePathname();

  // Flatten all menus for lookup
  const allMenus: MenuItemConfig[] = [
    ...menuConfig.liveStreamingMenu,
    ...menuConfig.alertMenu,
    ...menuConfig.dashboardMenu.flatMap(c => c.items),
    ...menuConfig.analyticsMenu.flatMap(c => c.items),
    ...menuConfig.settingsMenu.flatMap(c => c.items),
  ];

  // Safely get featureId for the current path
  const featureId = pathname ? getFeatureIdByPath(pathname, allMenus) : undefined;

  // Check if feature is enabled for the user
  const featureEnabled = useFeature(featureId ?? "");
  const hasAccess = featureId ? featureEnabled : true;

  if (!hasAccess) {
    return <UnauthorizedAccess />;
  }

  return <>{children}</>;
};
