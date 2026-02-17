"use client";

import { ReactNode } from "react";
import { useFeature } from "@/customhooks/useFeature";
import UnauthorizedAccess from "@/app/components/organisms/UnauthorizedAccess/UnauthorizedAccess";
import Loader from "@/app/components/atoms/Loader/Loader";

interface LocalFeatureGuardProps {
  featureId: string;
  children: ReactNode;
}

const LocalFeatureGuard: React.FC<LocalFeatureGuardProps> = ({ featureId, children }) => {
  //const hasAccess = useFeature(featureId);

  const { hasAccess, isLoading } = useFeature(featureId ?? "");

  // ✅ Wait until auth loads
  if (isLoading) {
    return <Loader />;
  }
  if (!hasAccess) {
    return <UnauthorizedAccess />;
  }

  return <>{children}</>;
};

export default LocalFeatureGuard;
