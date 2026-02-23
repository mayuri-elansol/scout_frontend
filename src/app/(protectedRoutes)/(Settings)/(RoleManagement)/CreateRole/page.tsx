
import LocalFeatureGuard from "@/Providers/LocalFeatureGuard";
import CreateRole from "./CreateRole";
import { FEATURE } from "@/app/config/featureRegistry";


export default function page() {
  return <LocalFeatureGuard featureId={FEATURE.CREATE_ROLE}>

    <CreateRole />;
  </LocalFeatureGuard>
}
