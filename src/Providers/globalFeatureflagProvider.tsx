// src/components/FeatureGuardProvider.tsx
"use client";

import { useFeature } from "@/customhooks/useFeature";
import {  usePathname } from "next/navigation";
import { ReactNode } from "react";
import { menuConfig } from "@/app/config/menuConfig";
import UnauthorizedAccess from "@/app/components/organisms/UnauthorizedAccess/UnauthorizedAccess";

interface FeatureGuardProviderProps {
  children: ReactNode;
}

const getFeatureIdByPath = (path: string): string | undefined => {
  const allMenus = [
    ...menuConfig.liveStreamingMenu,
    ...menuConfig.alertMenu,
    ...menuConfig.dashboardMenu.flatMap((c: any) => c.items),
    ...menuConfig.analyticsMenu.flatMap((c: any) => c.items),
    ...menuConfig.settingsMenu.flatMap((c: any) => c.items),
  ];

  const matched = allMenus.find((item) => item.path === path);
  return matched?.featureId;
};

export const FeatureGuardProvider = ({ children }: FeatureGuardProviderProps) => {
  const pathname = usePathname();

  const featureId = getFeatureIdByPath(pathname ?? "");
  const featureEnabled = useFeature(featureId ?? "");
  const hasAccess = featureId ? featureEnabled : true;

  if (!hasAccess) {
    return <UnauthorizedAccess />; 
  }

  return <>{children}</>;
};

