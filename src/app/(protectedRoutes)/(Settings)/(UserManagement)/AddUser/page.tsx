
import LocalFeatureGuard from "@/Providers/LocalFeatureGuard";
import  AddUser  from "./AddUser";
import { FEATURE } from "@/app/config/featureRegistry";


export default function page() {
  return <LocalFeatureGuard featureId={FEATURE.ADD_USER}>

  <AddUser />;
  </LocalFeatureGuard>
}
