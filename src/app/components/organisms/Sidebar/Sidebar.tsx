'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
} from '@mui/material';
import { BarChart, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  dashboardMenu,
  alertMenu,
  analyticsMenu,
  MenuItemConfig,
  AnalyticsCategoryConfig,
} from '../../../config/menuConfig';
import { PageType } from '@/app/types';
import { useFeatureFlags } from '@/customhooks/useFeatureFlag';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const drawerWidth = '15vw';

const Sidebar: React.FC<SidebarProps> = () => {
  const theme = useTheme();
  const pathname = usePathname();
 const featureFlag = useFeatureFlags()
  const [analyticsOpen, setAnalyticsOpen] = useState(true);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const handleCategoryToggle = (title: string) => {
    setOpenCategories((prev) => ({ ...prev, [title]: !prev[title] }));
  };

const dashboardFlags: MenuItemConfig[] = dashboardMenu.map(item => ({
  ...item,
  featureFlag: featureFlag[item.page!] ?? false,
}));


const alertFlags: MenuItemConfig[] = alertMenu.map(item => ({
  ...item,
  featureFlag: featureFlag[item.page!] ?? false,
}));

const analyticsFlags: AnalyticsCategoryConfig[] = analyticsMenu.map(category => ({
  ...category,
  items: category.items.map(item => ({
    ...item,
    featureFlag: featureFlag[item.page!] ?? false,
  })),
}));
  // Render menu helper
  const renderMenuItems = (items: MenuItemConfig[]) =>
    items
      .filter((item) => item.featureFlag)
      .map((item) => (
        <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            component={Link}
            href={item.path!}
            prefetch
            selected={pathname === item.path}
            sx={{
              borderRadius: 1,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                '&:hover': { backgroundColor: theme.palette.primary.dark },
              },
            }}
          >
            {item.icon && (
              <ListItemIcon
                sx={{ minWidth: 36, color: pathname === item.path ? 'white' : 'inherit' }}
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
                sx={{ height: 20, fontSize: '12px' }}
              />
            )}
          </ListItemButton>
        </ListItem>
      ));

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          mt: '64px',
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          borderRight: 'none',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flex: 1 }}>
          {/* Dashboard */}
          <List sx={{ p: 0 }}>{renderMenuItems(dashboardFlags)}</List>

          {/* Analytics */}
          {analyticsFlags.length > 0 && (
            <List sx={{ p: 0, mt: 1 }}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => setAnalyticsOpen(!analyticsOpen)}
                  sx={{ borderRadius: 1, color: theme.palette.primary.main }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <BarChart />
                  </ListItemIcon>
                  <ListItemText primary="Analytics" />
                  {analyticsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>

              <Collapse in={analyticsOpen} timeout="auto" unmountOnExit>
                <List sx={{ pl: 2 }}>
                  {analyticsFlags.map((category) => {
                    const filteredItems = category.items.filter((i) => i.featureFlag);
                    if (!filteredItems.length) return null;

                    return (
                      <Box key={category.title}>
                        <ListItem disablePadding>
                          <ListItemButton
                            onClick={() => handleCategoryToggle(category.title)}
                            sx={{ borderRadius: 1, py: 1 }}
                          >
                            {category.icon && (
                              <ListItemIcon sx={{ minWidth: 28 }}>
                                <category.icon sx={{ fontSize: 16 }} />
                              </ListItemIcon>
                            )}
                            <ListItemText
                              primary={category.title}
                              primaryTypographyProps={{ fontSize: '14px', color: '#5c6b7d' }}
                            />
                            {openCategories[category.title] ? (
                              <ExpandLess sx={{ fontSize: 12 }} />
                            ) : (
                              <ExpandMore sx={{ fontSize: 12 }} />
                            )}
                          </ListItemButton>
                        </ListItem>

                        <Collapse in={openCategories[category.title]} timeout="auto" unmountOnExit>
                          <List sx={{ pl: 3 }}>
                            {filteredItems.map((item) => (
                              <ListItem key={item.path} disablePadding>
                                <ListItemButton
                                  component={Link}
                                  href={item.path!}
                                  prefetch
                                  selected={pathname === item.path}
                                  sx={{
                                    borderRadius: 1,
                                    py: 0.75,
                                    '&.Mui-selected': {
                                      backgroundColor: theme.palette.primary.main,
                                      color: 'white',
                                      '&:hover': { backgroundColor: theme.palette.primary.dark },
                                    },
                                    '&:hover': {
                                      backgroundColor: 'rgba(25,118,210,0.08)',
                                    },
                                  }}
                                >
                                  <ListItemText
                                    primary={`• ${item.name}`}
                                    primaryTypographyProps={{
                                      fontSize: '12px',
                                      color: pathname === item.path ? 'white' : '#6b7280',
                                      fontWeight: pathname === item.path ? 500 : 'normal',
                                      lineHeight: 1.3,
                                    }}
                                  />
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      </Box>
                    );
                  })}
                </List>
              </Collapse>
            </List>
          )}

          {/* Alerts */}
          <List sx={{ p: 0, mt: 1 }}>{renderMenuItems(alertFlags)}</List>
        </Box>

        {/* Powered by Elansol */}
        <Box sx={{ borderTop: '1px solid #e0e0e0', pt: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '13px', color: '#666' }}>Powered by</Typography>
              <Box
                component="img"
                src="/elansol_technologies_logo.jpg"
                alt="Elansol Technologies Logo"
                sx={{ height: 50, width: 'auto' }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
