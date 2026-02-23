
import LocalFeatureGuard from "@/Providers/LocalFeatureGuard";
import AddRole from "./AddRole";
import { FEATURE } from "@/app/config/featureRegistry";


export default function page() {

  return <LocalFeatureGuard featureId={FEATURE.CREATE_ROLE}>

    <AddRole />;
  </LocalFeatureGuard>
}
