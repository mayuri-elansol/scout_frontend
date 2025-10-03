"use client";

import { store } from "../app/store/store";
import { Provider } from "react-redux";

export default function GlobalReduxProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
