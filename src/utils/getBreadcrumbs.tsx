// src/utils/getBreadcrumbs.ts
"use client";
import { alertMenu, analyticsMenu } from "./../app/config/menuConfig";

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function getBreadcrumbs(currentPage: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [];

  // Dashboard always first
  items.push({ label: "Dashboard", path: "/DashboardPage" });

  // Check Alerts & Other menu
  const alertItem = alertMenu.find((item) => item.page === currentPage);
  if (alertItem) {
    items.push({ label: alertItem.name, path: alertItem.path });
    return items;
  }

  // Check analytics categories
  for (const category of analyticsMenu) {
    const foundItem = category.items.find((item) => item.page === currentPage);
    if (foundItem) {
      items.push({ label: category.title });
      items.push({ label: foundItem.name, path: foundItem.path });
      return items;
    }
  }

  // Default fallback
  return items;
}
