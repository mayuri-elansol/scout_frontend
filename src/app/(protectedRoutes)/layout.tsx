import { ReactNode } from "react";
import ClientLayout from "./ClientLayout";

interface LayoutProps {
  readonly children: ReactNode;
}

export default function ProtectedLayout({ children }: LayoutProps) {
  return <ClientLayout>{children}</ClientLayout>
}
