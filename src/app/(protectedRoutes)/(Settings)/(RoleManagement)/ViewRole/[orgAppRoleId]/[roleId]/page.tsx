import LocalFeatureGuard from "@/Providers/LocalFeatureGuard";
import ViewRolePage from "./ViewRole";
import { FEATURE } from "@/app/config/featureRegistry";


export default function page() {
  return <LocalFeatureGuard featureId={FEATURE.VIEW_ROLE}>

  <ViewRolePage />;
  </LocalFeatureGuard>
}
