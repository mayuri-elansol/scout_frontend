import React from "react";
import { Box, Typography } from "@mui/material";
import ScoutBadge from "../../atoms/Badge/Badge";

interface StatusItem {
  id: string;
  label: string;
  count: number;
  variant: "status" | "priority" | "category";
  value: string;
  color?: string;
}

interface StatusBadgeGroupProps {
  title?: string;
  items: StatusItem[];
  layout?: "horizontal" | "vertical" | "grid";
  spacing?: "compact" | "normal" | "comfortable";
  showCounts?: boolean;
  showTitle?: boolean;
  totalLabel?: string;
  onClick?: (item: StatusItem) => void;
}

const StatusBadgeGroup: React.FC<StatusBadgeGroupProps> = ({
  title = "Status Overview",
  items,
  layout = "horizontal",
  spacing = "normal",
  showCounts = true,
  showTitle = true,
  totalLabel,
  onClick,
}) => {
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const getSpacing = () => {
    switch (spacing) {
      case "compact":
        return { gap: 0.5, padding: 1 };
      case "comfortable":
        return { gap: 2, padding: 2 };
      default:
        return { gap: 1, padding: 1.5 };
    }
  };

  const getLayoutStyles = () => {
    const spacingConfig = getSpacing();

    switch (layout) {
      case "vertical":
        return {
          display: "flex",
          flexDirection: "column" as const,
          gap: spacingConfig.gap,
          alignItems: "flex-start",
        };
      case "grid":
        return {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: spacingConfig.gap,
        };
      default:
        return {
          display: "flex",
          flexWrap: "wrap" as const,
          gap: spacingConfig.gap,
          alignItems: "center",
        };
    }
  };

  const handleItemClick = (item: StatusItem) => {
    if (onClick) {
      onClick(item);
    }
  };

  const renderBadgeWithCount = (item: StatusItem) => {
    const badgeProps = {
      variant: item.variant,
      label: showCounts ? `${item.label} (${item.count})` : item.label,
      size: "small" as const,
      sx: {
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? {
              transform: "scale(1.05)",
              transition: "transform 0.2s ease",
            }
          : {},
      },
    };

    // Map variant and value to appropriate props
    if (item.variant === "status") {
      return (
        <ScoutBadge
          key={item.id}
          {...badgeProps}
          status={item.value as any}
          onClick={() => handleItemClick(item)}
        />
      );
    } else if (item.variant === "priority") {
      return (
        <ScoutBadge
          key={item.id}
          {...badgeProps}
          priority={item.value as any}
          onClick={() => handleItemClick(item)}
        />
      );
    } else if (item.variant === "category") {
      return (
        <ScoutBadge
          key={item.id}
          {...badgeProps}
          category={item.value as any}
          onClick={() => handleItemClick(item)}
        />
      );
    }

    return (
      <ScoutBadge
        key={item.id}
        {...badgeProps}
        onClick={() => handleItemClick(item)}
      />
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      {showTitle && (
        <Box
          sx={{
            mb: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontSize: "16px",
              color: "#1c2025",
            }}
          >
            {title}
          </Typography>
          {totalLabel && totalCount > 0 && (
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              {totalLabel}: {totalCount}
            </Typography>
          )}
        </Box>
      )}

      <Box sx={getLayoutStyles()}>
        {items.map((item) => renderBadgeWithCount(item))}
      </Box>
    </Box>
  );
};

export default StatusBadgeGroup;
