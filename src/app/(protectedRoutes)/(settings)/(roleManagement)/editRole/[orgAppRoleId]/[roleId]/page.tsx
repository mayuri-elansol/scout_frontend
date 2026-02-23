
import LocalFeatureGuard from "@/Providers/LocalFeatureGuard";
import EditRole from "./EditRole";
import { FEATURE } from "@/app/config/featureRegistry";


export default function page() {
  return <LocalFeatureGuard featureId={FEATURE.EDIT_ROLE}>

  <EditRole />;
  </LocalFeatureGuard>
}
