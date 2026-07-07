import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import Dashboard from "./Dashboard";
import { HEADER_HEIGHT } from "@/app/config/layoutConstants";
import { theme } from "@/app/theme/theme";
import { store } from "@/app/store/store";

const meta: Meta<typeof Dashboard> = {
  title: "Pages/Dashboard",
  component: Dashboard,
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      // Mirrors ClientLayout's content Box exactly (incl. CssBaseline's
      // border-box reset and the Redux Provider Dashboard now needs for
      // useAuth()'s feature-gating), so we can verify the dashboard fits
      // without an outer scrollbar on a real viewport.
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              pl: 2.5,
              pr: 2.5,
              pb: 2,
              pt: `${HEADER_HEIGHT + 16}px`,
              backgroundColor: "#f5f7fa",
              overflow: "auto",
            }}
          >
            <Story />
          </Box>
        </ThemeProvider>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
