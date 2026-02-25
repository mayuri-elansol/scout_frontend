import { LinkMenuItem } from "@/app/config/menuConfig";
import { hasFeature } from "./hasFeature";

export const sortItemsByEnabled = (items: LinkMenuItem[], features: string[]) =>
  [...items].sort((a, b) => {
    const aEnabled = hasFeature(features, a.featureId);
    const bEnabled = hasFeature(features, b.featureId);
    // enabled items first
    return aEnabled === bEnabled ? 0 : aEnabled ? -1 : 1;
  });