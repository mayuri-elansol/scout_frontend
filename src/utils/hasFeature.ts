// utils/hasFeature.ts
export const hasFeature = (
  features: string[],
  featureId?: string
): boolean => {
  if (!featureId) return true;
  return features.includes(featureId);
};
