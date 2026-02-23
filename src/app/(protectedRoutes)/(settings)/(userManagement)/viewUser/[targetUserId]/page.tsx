
import LocalFeatureGuard from "@/Providers/LocalFeatureGuard";
import ViewUserPage from "./ViewUser";
import { FEATURE } from "@/app/config/featureRegistry";

export default function page() {
  return <LocalFeatureGuard featureId={FEATURE.VIEW_USER}>

    <ViewUserPage />;
  </LocalFeatureGuard>
}
