"use client";

import { ReactNode } from "react";
import { useFeature } from "@/customhooks/useFeature";
import UnauthorizedAccess from "@/app/components/organisms/UnauthorizedAccess/UnauthorizedAccess";

interface LocalFeatureGuardProps {
  featureId: string;
  children: ReactNode;
}

const LocalFeatureGuard: React.FC<LocalFeatureGuardProps> = ({ featureId, children }) => {
  const hasAccess = useFeature(featureId);

  if (!hasAccess) {
    return <UnauthorizedAccess />;
  }

  return <>{children}</>;
};

export default LocalFeatureGuard;
