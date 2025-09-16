// Toaster.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import Toaster from "./Toaster";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { showToast } from "./toasterSlice";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toaster",
  component: Toaster,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const SuccessToast: Story = {
  render: () => {
    store.dispatch(
      showToast({
        id: Date.now().toString(), // 👈 required id
        message: "Operation completed successfully!",
        severity: "success",
      })
    );
    return <Toaster />;
  },
};

export const ErrorToast: Story = {
  render: () => {
    store.dispatch(
      showToast({
        id: Date.now().toString(),
        message: "Something went wrong!",
        severity: "error",
      })
    );
    return <Toaster />;
  },
};

export const InfoToast: Story = {
  render: () => {
    store.dispatch(
      showToast({
        id: Date.now().toString(),
        message: "Just so you know...",
        severity: "info",
      })
    );
    return <Toaster />;
  },
};

export const WarningToast: Story = {
  render: () => {
    store.dispatch(
      showToast({
        id: Date.now().toString(),
        message: "Be careful!",
        severity: "warning",
      })
    );
    return <Toaster />;
  },
};
