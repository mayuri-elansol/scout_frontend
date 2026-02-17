// src/customhooks/useFeature.ts
import { useAuth } from "./useAuth";

/**
 * Hook to check if the user has access to a specific feature
 * @param featureId - ID of the feature to check
 * @returns boolean
 */
// export const useFeature = (featureId: string): boolean => {
//   const { features } = useAuth();
//   return features.includes(featureId);
// };
export const useFeature = (featureId: string) => {
  const { features, isLoading } = useAuth();

  // While auth is loading → don't decide yet
  if (isLoading) {
    return {
      hasAccess: false,
      isLoading: true,
    };
  }

  // If no feature required → allow
  if (!featureId) {
    return {
      hasAccess: true,
      isLoading: false,
    };
  }

  return {
    hasAccess: features.includes(featureId),
    isLoading: false,
  };
};