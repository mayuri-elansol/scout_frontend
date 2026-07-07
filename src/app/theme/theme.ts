import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: {
      main: string;
      light: string;
      dark: string;
    };
  }

  interface PaletteOptions {
    tertiary?: {
      main: string;
      light: string;
      dark: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB",
      light: "#60A5FA",
      dark: "#1D4ED8",
    },
    secondary: {
      main: "#0EA5E9",
      light: "#38BDF8",
      dark: "#0284C7",
    },
    error: {
      main: "#DC2626",
      light: "#EF4444",
      dark: "#B91C1C",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
    },
    info: {
      main: "#0EA5E9",
      light: "#38BDF8",
      dark: "#0284C7",
    },
    success: {
      main: "#16A34A",
      light: "#4ADE80",
      dark: "#15803D",
    },
    background: {
      default: "#F5F7FA",
      paper: "#ffffff",
    },
    text: {
      primary: "#1C2025",
      secondary: "#5C6B7D",
    },
    grey: {
      50: "#f8f9fa",
      100: "#f1f3f4",
      200: "#e8eaed",
      300: "#dadce0",
      400: "#bdc1c6",
      500: "#9aa0a6",
      600: "#80868b",
      700: "#5f6368",
      800: "#3c4043",
      900: "#202124",
    },
    tertiary: {
      main: "#8B5CF6",
      light: "#A78BFA",
      dark: "#7C3AED",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.8125rem",
      lineHeight: 1.4,
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.3,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F5F7FA",
          fontFamily: "'Inter', sans-serif",
        },

        // Scrollbar styles...
        "*::-webkit-scrollbar": { width: "6px" },
        "*::-webkit-scrollbar-track": { background: "#f1f1f1" },
        "*::-webkit-scrollbar-thumb": {
          background: "#c1c1c1",
          borderRadius: "3px",
        },
        "*::-webkit-scrollbar-thumb:hover": { background: "#a8a8a8" },

        // Autofill fix for all states
        "input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill, input:-webkit-autofill:hover, textarea:-webkit-autofill:hover, select:-webkit-autofill:hover, input:-webkit-autofill:focus, textarea:-webkit-autofill:focus, select:-webkit-autofill:focus, input:-webkit-autofill:active, textarea:-webkit-autofill:active, select:-webkit-autofill:active":
          {
            // WebkitBoxShadow: '0 0 0 1000px #fff inset !important',
            WebkitTextFillColor: "#000 !important",
            caretColor: "#000",
            transition: "background-color 5000s ease-in-out 0s",
          },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
        },
        containedPrimary: {
          backgroundColor: "#2563EB",
          "&:hover": {
            backgroundColor: "#1D4ED8",
          },
        },
        outlinedPrimary: {
          borderColor: "#2563EB",
          color: "#2563EB",
          "&:hover": {
            borderColor: "#1D4ED8",
            backgroundColor: "rgba(37, 99, 235, 0.04)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          border: "1px solid #E5E7EB",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #e0e0e0",
          boxShadow: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#1C2025",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #E5E7EB",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 4,
          "&.Mui-selected": {
            backgroundColor: "#2563EB",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#1D4ED8",
            },
            "& .MuiListItemIcon-root": {
              color: "#ffffff",
            },
          },
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
        colorError: {
          backgroundColor: "#DC2626",
          color: "#ffffff",
        },
        colorWarning: {
          backgroundColor: "#F59E0B",
          color: "#ffffff",
        },
        colorSuccess: {
          backgroundColor: "#16A34A",
          color: "#ffffff",
        },
      },
    },
    MuiCircularProgress: {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.primary.main,
    }),
  },
},

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: 4,
          backgroundColor: "#e0e0e0",
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        asterisk: {
          color: "red",
        },
        outlined: {
          top: "-4px",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            height: 48,
          },
          "& .MuiOutlinedInput-input": {
            padding: "10px 14px",
            height: "100%",
            boxSizing: "border-box",
          },
          "& .MuiInputLabel-root": {
            lineHeight: 1.2,
            top: "-2px",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          height: 48,
        },
        select: {
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          // backgroundColor: "#f5f5f5",
          fontWeight: 800,
          color: "#1c2025",
        },
      },
    },
  },
});

export default theme;
