// utils/feature.ts

import {useFeatureFlagStore}  from "../store/fetureFlag";

export function useFeatureFlag(flagKey?: string): boolean {
  const flags = useFeatureFlagStore.getState().flags; 
  if (!flagKey) return true; 
  return !!flags[flagKey];
}
