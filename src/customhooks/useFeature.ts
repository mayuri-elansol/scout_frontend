// src/customhooks/useFeature.ts
import { useAuth } from "./useAuth";

/**
 * Hook to check if the user has access to a specific feature
 * @param featureId - ID of the feature to check
 * @returns boolean
 */
export const useFeature = (featureId: string): boolean => {
  const { features } = useAuth();
  return features.includes(featureId);
};
