"use client";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  Divider,
} from "@mui/material";
import {
  BarChart,
  ExpandLess,
  ExpandMore,
  Settings,
} from "@mui/icons-material";
import {
  dashboardMenu,
  alertMenu,
  analyticsMenu,
  settingsMenu,
  MenuItemConfig,
  CategoryConfig,
  liveStreamingMenu,
  LinkMenuItem,
} from "../../../config/menuConfig";
import { PageType } from "@/app/types";
import { useAuth } from "@/customhooks/useAuth";
import { hasFeature } from "@/utils/hasFeature";
import theme from "../../../theme/theme";
interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}
const isLink = (
  item: MenuItemConfig
): item is Extract<MenuItemConfig, { type: "link" }> => item.type === "link";

const isGroup = (
  item: MenuItemConfig
): item is Extract<MenuItemConfig, { type: "group" }> => item.type === "group";
const getAllLinkItems = (items: MenuItemConfig[]): LinkMenuItem[] =>
  items.flatMap((item) => {
    if (isLink(item)) return [item];
    if (isGroup(item)) return item.items.filter(isLink);
    return [];
  });

// Memoized menu item component for better performance
const MenuItem = React.memo<{
  item: LinkMenuItem;
  pathname: string;
  theme: typeof theme;
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

const SubMenuItem = React.memo<{
  item: LinkMenuItem;
  pathname: string;
  theme: typeof theme;
  categoryTitle: string;
}>(({ item, pathname, theme, categoryTitle }) => (
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
      {/* Add this */}
      {item.icon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: pathname === item.path ? "white" : "#6b7280",
          }}
        >
          <item.icon fontSize="small" />
        </ListItemIcon>
      )}

      <ListItemText
        primary={
          categoryTitle === "Settings" ? `${item.name}` : `• ${item.name}`
        }
        slotProps={{
          primary: {
            sx: {
              fontSize:
                categoryTitle === "Dashboard" ||
                categoryTitle === "Analytics" ||
                categoryTitle === "Settings"
                  ? "14px"
                  : "12px",
              color: pathname === item.path ? "white" : "#6b7280",
              // fontWeight: pathname === item.path ? 600 : 400,
              lineHeight: 1.4,
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
  category: CategoryConfig & {
    items: MenuItemConfig[];
  };
  openCategories: Record<string, boolean>;
  onToggle: (title: string) => void;
  pathname: string;
  theme: typeof theme;
}>(({ category, openCategories, onToggle, pathname, theme }) => {
  const filteredItems = category.items;

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
          {filteredItems.map((item, index) => {
            if (isLink(item)) {
              return (
                <SubMenuItem
                  key={uuidv4() + index}
                  item={item}
                  pathname={pathname}
                  theme={theme}
                  categoryTitle={category.title}
                />
              );
            }

            if (isGroup(item)) {
              return (
                <Box key={uuidv4() + index}>
                  {/* GROUP HEADER */}
                  <ListItem disablePadding sx={{ pl: 1 }}>
                    <ListItemText
                      primary={item.name}
                      sx={{ color: "#5c6b7d", fontSize: "13px" }}
                    />
                  </ListItem>

                  {getAllLinkItems(item.items).map((subItem) => (
                    <SubMenuItem
                      key={subItem.path} // Use path as stable key
                      item={subItem} // ✅ Guaranteed to be a LinkMenuItem
                      pathname={pathname}
                      theme={theme}
                      categoryTitle={category.title}
                    />
                  ))}
                </Box>
              );
            }

            return null;
          })}
        </List>
      </Collapse>
    </Box>
  );
});

CategorySection.displayName = "CategorySection";

const Sidebar: React.FC<SidebarProps> = () => {
  const theme = useTheme();
  const drawerWidth: string = "315px";
  const router = useRouter();
  const pathname = usePathname();
  const { features } = useAuth();

  const [analyticsOpen, setAnalyticsOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  const handleCategoryToggle = useCallback((title: string) => {
    setOpenCategories((prev) => ({ ...prev, [title]: !prev[title] }));
  }, []);

  const handleAnalyticsToggle = useCallback(() => {
    setAnalyticsOpen((prev) => !prev);
  }, []);

  const handleSettingsToggle = useCallback(() => {
    setSettingsOpen((prev) => !prev);
  }, []);

  const filteredMenus = useMemo(() => {
    const liveStreamingFlags: MenuItemConfig[] = liveStreamingMenu.filter(
      (item) => hasFeature(features, item.featureId)
    );

    const dashboardFlags = dashboardMenu
      .map((category) => ({
        ...category,
        items: category.items
          .map((item) => {
            if (isLink(item)) {
              return hasFeature(features, item.featureId) ? item : null;
            }

            if (isGroup(item)) {
              const children = item.items.filter(
                (sub) => isLink(sub) && hasFeature(features, sub.featureId)
              );
              return children.length ? { ...item, items: children } : null;
            }

            return null;
          })
          .filter(Boolean) as MenuItemConfig[],
      }))
      .filter((category) => category.items.length > 0);

    const alertFlags: MenuItemConfig[] = alertMenu.filter((item) =>
      hasFeature(features, item.featureId)
    );

    const analyticsFlags = analyticsMenu
      .map((category) => ({
        ...category,
        items: category.items
          .map((item) => {
            if (isLink(item)) {
              return hasFeature(features, item.featureId) ? item : null;
            }

            if (isGroup(item)) {
              const children = item.items.filter(
                (sub) => isLink(sub) && hasFeature(features, sub.featureId)
              );
              return children.length ? { ...item, items: children } : null;
            }

            return null;
          })
          .filter(Boolean) as MenuItemConfig[],
      }))
      .filter((category) => category.items.length > 0);

    const settingsFlags = settingsMenu
      .map((category) => ({
        ...category,
        items: category.items
          .map((item) => {
            if (isLink(item)) {
              return hasFeature(features, item.featureId) ? item : null;
            }

            if (isGroup(item)) {
              const children = item.items.filter(
                (sub) => isLink(sub) && hasFeature(features, sub.featureId)
              );
              return children.length ? { ...item, items: children } : null;
            }

            return null;
          })
          .filter(Boolean) as MenuItemConfig[],
      }))
      .filter((category) => category.items.length > 0);

    return {
      liveStreamingFlags,
      dashboardFlags,
      alertFlags,
      analyticsFlags,
      settingsFlags,
    };
  }, [features]);

  const isAnalyticsActive = useMemo(() => {
    return filteredMenus.analyticsFlags.some((category) =>
      getAllLinkItems(category.items).some((link) => pathname === link.path)
    );
  }, [pathname, filteredMenus.analyticsFlags]);

  const isSettingsActive = useMemo(() => {
    return filteredMenus.settingsFlags.some((category) =>
      getAllLinkItems(category.items).some((link) => pathname === link.path)
    );
  }, [pathname, filteredMenus.settingsFlags]);

  const menuContent = useMemo(
    () => (
      <>
        {/* Live Streaming - At the very top */}
        {/* {filteredMenus.liveStreamingFlags.length > 0 && (
          <List sx={{ p: 0, mt: 1 }}>
            {filteredMenus.liveStreamingFlags.filter(isLink).map((item) => (
              <MenuItem
                key={item.path}
                item={item}
                pathname={pathname}
                theme={theme}
              />
            ))}
          </List>
        )} */}
        {/* Dashboard */}

        {filteredMenus.dashboardFlags.length > 0 && (
          <List sx={{ p: 0, mt: 1 }}>
            {filteredMenus.dashboardFlags.map((category, index) => {
              const isCategoryActive = category.items.some(
                (item) => item.featureFlag && pathname === item.path
              );

              const isOpen = openCategories[category.title] ?? false;

              const isDashboardRoot =
                !!category.path && pathname === category.path;

              const isDashboardChild = category.items.some(
                (item) =>
                  item.type === "link" &&
                  (pathname === item.path ||
                    pathname.startsWith(`${item.path}/`))
              );
              return (
                <Box key={uuidv4() + index} sx={{ mb: 1 }}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={isDashboardRoot}
                      sx={{
                        borderRadius: 1,
                        py: 1,

                        "&.Mui-selected": {
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                          },
                        },

                        "&:hover": {
                          backgroundColor: "rgba(25,118,210,0.08)",
                        },
                      }}
                      onClick={() => {
                        if (category.path) {
                          router.push(category.path);
                        }
                      }}
                    >
                      {category.icon && (
                        <ListItemIcon
                          sx={{
                            minWidth: 36,
                            color: isDashboardRoot
                              ? "white"
                              : isDashboardChild
                              ? theme.palette.primary.main
                              : "#5c6b7d",
                          }}
                        >
                          <category.icon />
                        </ListItemIcon>
                      )}
                      <ListItemText
                        primary={category.title}
                        sx={{
                          color: isDashboardRoot
                            ? "white"
                            : isDashboardChild
                            ? theme.palette.primary.main
                            : "#5c6b7d",
                        }}
                      />
                      <Box
                        onClick={(e) => {
                          e.stopPropagation(); // ⛔ prevent navigation
                          handleCategoryToggle(category.title);
                        }}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: isDashboardRoot
                            ? "white"
                            : isDashboardChild
                            ? theme.palette.primary.main
                            : "#5c6b7d",
                        }}
                      >
                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                      </Box>
                    </ListItemButton>
                  </ListItem>

                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List sx={{ pl: 2 }}>
                      {getAllLinkItems(category.items).map((item) => (
                        <SubMenuItem
                          key={item.path}
                          item={item}
                          pathname={pathname}
                          theme={theme}
                          categoryTitle={category.title}
                        />
                      ))}
                    </List>
                  </Collapse>
                </Box>
              );
            })}
          </List>
        )}

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
                {filteredMenus.analyticsFlags.map((category, index) => (
                  <CategorySection
                    key={uuidv4() + index}
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
          {filteredMenus.liveStreamingFlags.filter(isLink).map((item) => (
            <MenuItem
              key={item.path}
              item={item}
              pathname={pathname}
              theme={theme}
            />
          ))}
        </List>

        {/* Settings */}
        {filteredMenus.settingsFlags.length > 0 && (
          <List sx={{ p: 0, mt: 1 }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleSettingsToggle}
                sx={{
                  borderRadius: 1,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": { backgroundColor: theme.palette.primary.dark },
                  },
                  color: isSettingsActive
                    ? theme.palette.primary.main
                    : "inherit",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isSettingsActive
                      ? theme.palette.primary.main
                      : "inherit",
                  }}
                >
                  <Settings />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  sx={{ fontSize: "14px", color: "#5c6b7d" }}
                />
                {settingsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
              <List sx={{ pl: 2 }}>
                {filteredMenus.settingsFlags.map((category) =>
                  category.items.map((item) => {
                    // Role Management / User Management → links
                    if (isLink(item)) {
                      return (
                        <SubMenuItem
                          key={item.path}
                          item={item}
                          pathname={pathname}
                          theme={theme}
                          categoryTitle={category.title}
                        />
                      );
                    }

                    // Configurator → expandable group
                    if (isGroup(item)) {
                      const isConfiguratorOpen =
                        openCategories[item.name] ?? false;

                      return (
                        <Box key={item.name}>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() =>
                                setOpenCategories((prev) => ({
                                  ...prev,
                                  [item.name]: !prev[item.name],
                                }))
                              }
                              sx={{
                                pl: 1,
                                borderRadius: 1,
                                py: 0.75,
                                fontSize: "14px",
                                "&:hover": {
                                  backgroundColor: "rgba(25,118,210,0.08)",
                                },
                              }}
                            >
                              {item.icon && (
                                <ListItemIcon
                                  sx={{ minWidth: 28, color: "#6b7280" }}
                                >
                                  <item.icon fontSize="small" />
                                </ListItemIcon>
                              )}
                              <ListItemText
                                primary={item.name}
                                sx={{
                                  fontSize: "14px",
                                  color: "#6b7280",
                                }}
                              />
                              {isConfiguratorOpen ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </ListItemButton>
                          </ListItem>

                          <Collapse
                            in={isConfiguratorOpen}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List sx={{ pl: 3 }}>
                              {getAllLinkItems(item.items).map((subItem) => (
                                <SubMenuItem
                                  key={subItem.path}
                                  item={subItem}
                                  pathname={pathname}
                                  theme={theme}
                                  categoryTitle={category.title}
                                />
                              ))}
                            </List>
                          </Collapse>
                        </Box>
                      );
                    }

                    return null;
                  })
                )}
              </List>
            </Collapse>
          </List>
        )}
      </>
    ),
    [
      filteredMenus,
      pathname,
      theme,
      analyticsOpen,
      settingsOpen,
      openCategories,
      handleAnalyticsToggle,
      handleSettingsToggle,
      handleCategoryToggle,
      isAnalyticsActive,
      isSettingsActive,
    ]
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          height: "100vh",
          borderRight: "none",
          boxShadow: "1px 0 3px rgba(0,0,0,0.1)",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      {/* Customer Logo at top */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          // height: 50,
          // gap: 2,
        }}
      >
        <Box
          component="img"
          src="./CustomerLogo1.png"
          alt="Customer Logo"
          sx={{
            height: 46,
          }}
        />
      </Box>

      {/* Divider */}
      <Divider sx={{ mx: -2, mb: 1.5 }} />

      {/* Menu Content */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>{menuContent}</Box>

      {/* Footer */}
      <Box
        sx={{
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
          src="/scoutLogo.png"
          alt="Elansol Logo"
          sx={{ height: 46, width: "auto" }}
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
