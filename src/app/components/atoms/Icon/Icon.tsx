import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as MuiIcons from "@mui/icons-material";

export type ScoutIconName = keyof typeof MuiIcons;

interface ScoutIconProps extends Omit<SvgIconProps, "color"> {
  name: keyof typeof MuiIcons;
  size?: "small" | "medium" | "large" | "xlarge";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "disabled"
    | "action"
    | "inherit";
}

const sizeMap: Record<NonNullable<ScoutIconProps["size"]>, string> = {
  small: "16px",
  medium: "20px",
  large: "24px",
  xlarge: "32px",
};

const colorMap: Record<NonNullable<ScoutIconProps["color"]>, string> = {
  primary: "#1976d2",
  secondary: "#5c6b7d",
  success: "#4caf50",
  error: "#f44336",
  warning: "#ff9800",
  info: "#2196f3",
  disabled: "#9e9e9e",
  action: "#6b7280",
  inherit: "inherit",
};

const StyledSvgIcon = styled(SvgIcon)<{
  iconsize?: string;
  iconcolor?: string;
}>(({ iconsize, iconcolor }) => ({
  fontSize: iconsize
    ? sizeMap[iconsize as keyof typeof sizeMap]
    : sizeMap.medium,
  color: iconcolor ? colorMap[iconcolor as keyof typeof colorMap] : "inherit",
  transition: "all 0.2s ease",
}));

const ScoutIcon: React.FC<ScoutIconProps> = ({
  name,
  size = "medium",
  color = "inherit",
  ...props
}) => {
  const IconComponent = MuiIcons[name] as React.ComponentType<SvgIconProps>;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Material-UI icons`);
    return (
      <StyledSvgIcon iconsize={size} iconcolor={color} {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </StyledSvgIcon>
    );
  }

  return (
    <IconComponent
      sx={{
        fontSize: sizeMap[size],
        color: colorMap[color],
        transition: "all 0.2s ease",
      }}
      {...props}
    />
  );
};

export default ScoutIcon;
