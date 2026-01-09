import { redirect } from "next/navigation";

export default function ConfiguratorPage() {
  // Redirect to Camera Management as the default nested route

  redirect("/CameraManagement");
}
