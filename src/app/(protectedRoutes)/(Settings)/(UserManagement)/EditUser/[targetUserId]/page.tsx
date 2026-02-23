
import LocalFeatureGuard from "@/Providers/LocalFeatureGuard";
import EditUser from "./EditUser";
import { FEATURE } from "@/app/config/featureRegistry";


export default function page() {
  return <LocalFeatureGuard featureId={FEATURE.EDIT_USER}>

    <EditUser />;
  </LocalFeatureGuard>
}
