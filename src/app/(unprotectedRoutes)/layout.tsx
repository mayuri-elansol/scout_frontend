import { ReactNode } from "react";
import ClientLayout from "./ClientLayout";

interface LayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: Readonly<LayoutProps>) {
  return <ClientLayout>{children}</ClientLayout>;
}
