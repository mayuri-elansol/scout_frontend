
import LocalFeatureGuard from "@/Providers/LocalFeatureGuard";
import AddFeatures from "./AddFeatures";
import { FEATURE } from "@/app/config/featureRegistry";


export default function page() {
  return <LocalFeatureGuard featureId={FEATURE.EDIT_ROLE}>
    <AddFeatures />;
  </LocalFeatureGuard>
}
