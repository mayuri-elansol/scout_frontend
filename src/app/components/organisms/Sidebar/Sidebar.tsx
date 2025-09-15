"use client";
import React, { useState, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { BarChart, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  dashboardMenu,
  alertMenu,
  analyticsMenu,
  MenuItemConfig,
  AnalyticsCategoryConfig,
} from "../../../config/menuConfig";
import { PageType } from "@/app/types";
import { useFeatureFlags } from "@/customhooks/useFeatureFlag";

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

// Memoized menu item component for better performance
const MenuItem = React.memo<{
  item: MenuItemConfig;
  pathname: string;
  theme: any;
}>(({ item, pathname, theme }) => (
  <ListItem disablePadding sx={{ mb: 0.5 }}>
    <ListItemButton
      component={Link}
      href={item.path}
      prefetch={false}
      selected={pathname === item.path}
      sx={{
        borderRadius: 1,
        "&.Mui-selected": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
          "&:hover": { backgroundColor: theme.palette.primary.dark },
        },
      }}
    >
      {item.icon && (
        <ListItemIcon
          sx={{
            minWidth: 36,
            color: pathname === item.path ? "white" : "inherit",
          }}
        >
          <item.icon />
        </ListItemIcon>
      )}
      <ListItemText primary={item.name} />
      {item.badge && (
        <Chip
          label={item.badge}
          size="small"
          color="error"
          sx={{ height: 20, fontSize: "12px" }}
        />
      )}
    </ListItemButton>
  </ListItem>
));

MenuItem.displayName = "MenuItem";

// Memoized sub-menu item component
const SubMenuItem = React.memo<{
  item: MenuItemConfig;
  pathname: string;
  theme: any;
}>(({ item, pathname, theme }) => (
  <ListItem disablePadding>
    <ListItemButton
      component={Link}
      href={item.path}
      prefetch={false}
      selected={pathname === item.path}
      sx={{
        borderRadius: 1,
        py: 0.75,
        "&.Mui-selected": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
          "&:hover": { backgroundColor: theme.palette.primary.dark },
        },
        "&:hover": {
          backgroundColor: "rgba(25,118,210,0.08)",
        },
      }}
    >
      <ListItemText
        primary={`• ${item.name}`}
        slotProps={{
          primary: {
            sx: {
              fontSize: "12px",
              color: pathname === item.path ? "white" : "#6b7280",
              fontWeight: pathname === item.path ? 500 : "normal",
              lineHeight: 1.3,
            },
          },
        }}
      />
    </ListItemButton>
  </ListItem>
));

SubMenuItem.displayName = "SubMenuItem";

// Memoized category component
const CategorySection = React.memo<{
  category: AnalyticsCategoryConfig & {
    items: (MenuItemConfig & { featureFlag: boolean })[];
  };
  openCategories: Record<string, boolean>;
  onToggle: (title: string) => void;
  pathname: string;
  theme: any;
}>(({ category, openCategories, onToggle, pathname, theme }) => {
  const filteredItems = useMemo(
    () => category.items.filter((i) => i.featureFlag),
    [category.items]
  );

  const handleToggle = useCallback(() => {
    onToggle(category.title);
  }, [category.title, onToggle]);

  if (!filteredItems.length) return null;

  return (
    <Box>
      <ListItem disablePadding>
        <ListItemButton onClick={handleToggle} sx={{ borderRadius: 1, py: 1 }}>
          {category.icon && (
            <ListItemIcon sx={{ minWidth: 28 }}>
              <category.icon sx={{ fontSize: 16 }} />
            </ListItemIcon>
          )}
          <ListItemText
            primary={category.title}
            slotProps={{
              primary: {
                sx: {
                  fontSize: "14px",
                  color: "#5c6b7d",
                },
              },
            }}
          />
          {openCategories[category.title] ? (
            <ExpandLess sx={{ fontSize: 12 }} />
          ) : (
            <ExpandMore sx={{ fontSize: 12 }} />
          )}
        </ListItemButton>
      </ListItem>

      <Collapse
        in={openCategories[category.title]}
        timeout="auto"
        unmountOnExit
      >
        <List sx={{ pl: 3 }}>
          {filteredItems.map((item) => (
            <SubMenuItem
              key={item.path}
              item={item}
              pathname={pathname}
              theme={theme}
            />
          ))}
        </List>
      </Collapse>
    </Box>
  );
});

CategorySection.displayName = "CategorySection";

const Sidebar: React.FC<SidebarProps> = () => {
  const theme = useTheme();

  const is1200_1250 = useMediaQuery(
    "(min-width:1200px) and (max-width:1249px)"
  );
  const is1250_1400 = useMediaQuery(
    "(min-width:1250px) and (max-width:1399px)"
  );
  const is1400_1520 = useMediaQuery(
    "(min-width:1400px) and (max-width:1519px)"
  );
  const is1520_1700 = useMediaQuery(
    "(min-width:1520px) and (max-width:1699px)"
  );

  let drawerWidth: string = "16vw";
  if (is1200_1250) {
    drawerWidth = "24vw";
  } else if (is1250_1400) {
    drawerWidth = "22vw";
  } else if (is1400_1520) {
    drawerWidth = "20vw";
  } else if (is1520_1700) {
    drawerWidth = "18vw";
  }
  // else if (is1700plus) {
  //   drawerWidth = "16vw";
  // }

  const pathname = usePathname();
  const featureFlag = useFeatureFlags();

  const [analyticsOpen, setAnalyticsOpen] = useState(true);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  const handleCategoryToggle = useCallback((title: string) => {
    setOpenCategories((prev) => ({ ...prev, [title]: !prev[title] }));
  }, []);

  const handleAnalyticsToggle = useCallback(() => {
    setAnalyticsOpen((prev) => !prev);
  }, []);

  const filteredMenus = useMemo(() => {
    const dashboardFlags: MenuItemConfig[] = dashboardMenu
      .map((item) => ({
        ...item,
        featureFlag: featureFlag[item.page!] ?? false,
      }))
      .filter((item) => item.featureFlag);

    const alertFlags: MenuItemConfig[] = alertMenu
      .map((item) => ({
        ...item,
        featureFlag: featureFlag[item.page!] ?? false,
      }))
      .filter((item) => item.featureFlag);

    const analyticsFlags: (AnalyticsCategoryConfig & {
      items: (MenuItemConfig & { featureFlag: boolean })[];
    })[] = analyticsMenu.map((category) => ({
      ...category,
      items: category.items.map((item) => ({
        ...item,
        featureFlag: featureFlag[item.page!] ?? false,
      })),
    }));

    return { dashboardFlags, alertFlags, analyticsFlags };
  }, [featureFlag]);
  const isAnalyticsActive = useMemo(() => {
    return filteredMenus.analyticsFlags.some((category) =>
      category.items.some((item) => pathname === item.path)
    );
  }, [pathname, filteredMenus.analyticsFlags]);

  const menuContent = useMemo(
    () => (
      <>
        {/* Dashboard */}
        <List sx={{ p: 0 }}>
          {filteredMenus.dashboardFlags.map((item) => (
            <MenuItem
              key={item.name}
              item={item}
              pathname={pathname}
              theme={theme}
            />
          ))}
        </List>

        {/* Analytics */}
        {filteredMenus.analyticsFlags.length > 0 && (
          <List sx={{ p: 0, mt: 1 }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleAnalyticsToggle}
                selected={
                  isAnalyticsActive &&
                  !Object.values(openCategories).some(Boolean)
                }
                sx={{
                  borderRadius: 1,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": { backgroundColor: theme.palette.primary.dark },
                  },
                  color: isAnalyticsActive
                    ? theme.palette.primary.main
                    : "inherit",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isAnalyticsActive
                      ? theme.palette.primary.main
                      : "inherit",
                  }}
                >
                  <BarChart />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
                {analyticsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={analyticsOpen} timeout="auto" unmountOnExit>
              <List sx={{ pl: 2 }}>
                {filteredMenus.analyticsFlags.map((category) => (
                  <CategorySection
                    key={category.title}
                    category={category}
                    openCategories={openCategories}
                    onToggle={handleCategoryToggle}
                    pathname={pathname}
                    theme={theme}
                  />
                ))}
              </List>
            </Collapse>
          </List>
        )}

        {/* Alerts */}
        <List sx={{ p: 0, mt: 1 }}>
          {filteredMenus.alertFlags.map((item) => (
            <MenuItem
              key={item.name}
              item={item}
              pathname={pathname}
              theme={theme}
            />
          ))}
        </List>
      </>
    ),
    [
      filteredMenus,
      pathname,
      theme,
      analyticsOpen,
      openCategories,
      handleAnalyticsToggle,
      handleCategoryToggle,
    ]
  );

  return (
    // <Drawer
    //   variant="permanent"
    //   sx={{
    //     width: drawerWidth,
    //     flexShrink: 0,
    //     "& .MuiDrawer-paper": {
    //       width: drawerWidth,
    //       boxSizing: "border-box",
    //       mt: "64px",
    //       height: "calc(100vh - 64px)",
    //       overflowY: "auto",
    //       borderRight: "none",
    //       boxShadow: "1px 0 3px rgba(0,0,0,0.1)",
    //       p: 2,
    //     },
    //   }}
    // >
    //   {/* <Box
    //     sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}
    //   > */}
    //   <Box sx={{ flex: 1 }}>{menuContent}</Box>

    //   <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 1, mx: -2, px: 2 }}>
    //     <Box
    //       sx={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    //         <Typography sx={{ fontSize: "13px", color: "#666" }}>
    //           Powered by
    //         </Typography>
    //         <Box
    //           component="img"
    //           src="/elansol_technologies_logo.jpg"
    //           alt="Elansol Logo"
    //           sx={{ height: 50, width: "auto" }}
    //           loading="lazy"
    //         />
    //       </Box>
    //     </Box>
    //   </Box>
    //   {/* </Box> */}
    // </Drawer>
  <Drawer
  variant="permanent"
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      mt: "64px",
      height: "calc(100vh - 64px)",
      overflowY: "auto",
      borderRight: "none",
      boxShadow: "1px 0 3px rgba(0,0,0,0.1)",
      p: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between", 
    },
  }}
>
  {/* Menu Content */}
  <Box sx={{ flex: 1 }}>{menuContent}</Box>

  {/* Footer */}
  <Box
    sx={{
      // borderTop: "1px solid #e0e0e0",
      pt: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 1,
    }}
  >
    <Box
      component="img"
      src="/elansol_technologies_logo.jpg"
      alt="Elansol Logo"
      sx={{ height: 50, width: "auto" }}
      loading="lazy"
    />
    <Typography sx={{ fontSize: "13px", color: "#666" }}>
      &copy; 2025 Elansol Technologies. <br />
      All rights reserved.
    </Typography>
  </Box>
</Drawer>

  );
};

export default React.memo(Sidebar);
