// "use client";
// import { v4 as uuidv4 } from "uuid";
// import React, { useState, useMemo, useCallback } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import Link from "next/link";
// import { Tooltip } from "@mui/material";
// import {
//   Drawer,
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
//   Typography,
//   Chip,
//   useTheme,
//   Divider,
//   Skeleton,
// } from "@mui/material";
// import {
//   BarChart,
//   ExpandLess,
//   ExpandMore,
//   Settings,
// } from "@mui/icons-material";
// import {
//   dashboardMenu,
//   alertMenu,
//   analyticsMenu,
//   settingsMenu,
//   MenuItemConfig,
//   CategoryConfig,
//   liveStreamingMenu,
//   LinkMenuItem,
// } from "../../../config/menuConfig";
// import { PageType } from "@/app/types";
// import { useAuth } from "@/customhooks/useAuth";
// import { hasFeature } from "@/utils/hasFeature";
// import theme from "../../../theme/theme";
// import { useGetOrgAndUserLogoQuery } from "@/app/(protectedRoutes)/(settings)/(userManagement)/addUser/AddUserApi";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/store/store";

// interface SidebarProps {
//   currentPage: PageType;
//   onPageChange: (page: PageType) => void;
// }

// const isLink = (
//   item: MenuItemConfig,
// ): item is Extract<MenuItemConfig, { type: "link" }> => item.type === "link";

// const isGroup = (
//   item: MenuItemConfig,
// ): item is Extract<MenuItemConfig, { type: "group" }> => item.type === "group";

// const getAllLinkItems = (items: MenuItemConfig[]): LinkMenuItem[] =>
//   items.flatMap((item) => {
//     if (isLink(item)) return [item];
//     if (isGroup(item)) return item.items.filter(isLink);
//     return [];
//   });


// const MenuItem = React.memo<{
//   item: LinkMenuItem;
//   pathname: string;
//   theme: typeof theme;
//   features: string[];
// }>(({ item, pathname, theme, features }) => {
//   const enabled = hasFeature(features, item.featureId);

//   return (
//     <Tooltip
//       title={!enabled ? `Upgrade your plan to access ${item.name}` : ""}
//       arrow
//       placement="right"
//     >
//       <span>
//         <ListItem disablePadding sx={{ mb: 0.5 }}>
//           <ListItemButton
//             component={enabled ? Link : "div"}
//             href={enabled ? item.path : undefined}
//             disabled={!enabled}
//             selected={pathname === item.path}
//             sx={{
//               borderRadius: 1,
//               opacity: enabled ? 1 : 0.5,
//               cursor: enabled ? "pointer" : "not-allowed",
//               "&.Mui-selected": {
//                 backgroundColor: theme.palette.primary.main,
//                 color: "white",
//               },
//             }}
//           >
//             {item.icon && (
//               <ListItemIcon
//                 sx={{
//                   minWidth: 36,
//                   color: pathname === item.path ? "white" : "inherit",
//                 }}
//               >
//                 <item.icon />
//               </ListItemIcon>
//             )}
//             <ListItemText primary={item.name} />
//           </ListItemButton>
//         </ListItem>
//       </span>
//     </Tooltip>
//   );
// });
// MenuItem.displayName = "MenuItem";

// const SubMenuItem = React.memo<{
//   item: LinkMenuItem;
//   pathname: string;
//   theme: typeof theme;
//   categoryTitle: string;
//   features: string[];
// }>(({ item, pathname, theme, categoryTitle, features }) => {

//   const enabled = hasFeature(features, item.featureId);

//   return (
//     <Tooltip
//       title={!enabled ?  `Upgrade your plan to access ${item.name}` : ""}
//       arrow
//       placement="right"
//     >
//       <span>
//         <ListItem disablePadding>
//           <ListItemButton
//             component={enabled ? Link : "div"}
//             href={enabled ? item.path : undefined}
//             disabled={!enabled}
//             selected={pathname === item.path}
//             sx={{
//               borderRadius: 1,
//               py: 0.75,
//               opacity: enabled ? 1 : 0.5,
//               cursor: enabled ? "pointer" : "not-allowed",

//               "&.Mui-selected": {
//                 backgroundColor: theme.palette.primary.main,
//                 color: "white",
//                 "&:hover": {
//                  backgroundColor: theme.palette.primary.dark,
//                 },
//               },

//               "&:hover": {
//                 backgroundColor: enabled
//                   ? "rgba(25,118,210,0.08)"//subitem background color
//                   : "transparent",
//               },
//             }}
//           >
//             {item.icon && (
//               <ListItemIcon
//                 sx={{
//                   minWidth: 28,
//                   color: pathname === item.path ? "white" : "#6b7280",
//                 }}
//               >
//                 <item.icon fontSize="small" />
//               </ListItemIcon>
//             )}

//             <ListItemText
//               primary={
//                 categoryTitle === "Settings"
//                   ? item.name
//                   : `• ${item.name}`
//               }
//               slotProps={{
//                 primary: {
//                   sx: {
//                     fontSize:
//                       categoryTitle === "Dashboard" ||
//                       categoryTitle === "Analytics" ||
//                       categoryTitle === "Settings"
//                         ? "14px"
//                         : "12px",
//                     color: pathname === item.path ? "white" : "#6b7280",
//                     lineHeight: 1.4,
//                   },
//                 },
//               }}
//             />
//           </ListItemButton>
//         </ListItem>
//       </span>
//     </Tooltip>
//   );
// });

// SubMenuItem.displayName = "SubMenuItem";

// const CategorySection = React.memo<{
//   category: CategoryConfig & {
//     items: MenuItemConfig[];
//   };
//   openCategories: Record<string, boolean>;
//   onToggle: (title: string) => void;
//   pathname: string;
//   theme: typeof theme;
//    features: string[];
// }>(({ category, openCategories, onToggle, pathname, theme,features }) => {
  
//   const filteredItems = category.items;
//  // ✅ ADD HERE
//   const allLinks = getAllLinkItems(category.items);

//   const totalCount = allLinks.length;

//   const enabledCount = allLinks.filter((item) =>
//     hasFeature(features, item.featureId)
//   ).length;
//   const handleToggle = useCallback(() => {
//     onToggle(category.title);
//   }, [category.title, onToggle]);

//   if (!filteredItems.length) return null;

//   return (
//     <Box>
//       <ListItem disablePadding>
//         <ListItemButton onClick={handleToggle} sx={{ borderRadius: 1, py: 1 }}>
//           {category.icon && (
//             <ListItemIcon sx={{ minWidth: 28 }}>
//               <category.icon sx={{ fontSize: 16 }} />
//             </ListItemIcon>
//           )}
//           {/* <ListItemText
//             primary={category.title}
//             slotProps={{
//               primary: {
//                 sx: {
//                   fontSize: "14px",
//                   color: "#5c6b7d",
//                 },
//               },
//             }}
//           /> */}
//           <ListItemText
//   primary={
//     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//       <Typography sx={{ fontSize: "14px", color: "#5c6b7d" }}>
//         {category.title}
//       </Typography>

//       <Chip
//         label={`${enabledCount}/${totalCount}`}
//         size="small"
//         sx={{
//           height: 20,
//           fontSize: "11px",
//         }}
//       />
//     </Box>
//   }
// />
//           {openCategories[category.title] ? (
//             <ExpandLess sx={{ fontSize: 12 }} />
//           ) : (
//             <ExpandMore sx={{ fontSize: 12 }} />
//           )}
//         </ListItemButton>
//       </ListItem>

//       <Collapse
//         in={openCategories[category.title]}
//         timeout="auto"
//         unmountOnExit
//       >
//         <List sx={{ pl: 3 }}>
//           {filteredItems.map((item, index) => {
//             if (isLink(item)) {
//               return (
//                 <SubMenuItem
//                   key={uuidv4() + index}
//                   item={item}
//                   pathname={pathname}
//                   theme={theme}
//                   categoryTitle={category.title}
//                   features={features}
//                 />
//               );
//             }

//             if (isGroup(item)) {
//               return (
//                 <Box key={uuidv4() + index}>
//                   <ListItem disablePadding sx={{ pl: 1 }}>
//                     <ListItemText
//                       primary={item.name}
//                       sx={{ color: "#5c6b7d", fontSize: "13px" }}
//                     />
//                   </ListItem>

//                   {getAllLinkItems(item.items).map((subItem) => (
//                     <SubMenuItem
//                       key={subItem.path}
//                       item={subItem}
//                       pathname={pathname}
//                       theme={theme}
//                       categoryTitle={category.title}
//                       features={features}
//                     />
//                   ))}
//                 </Box>
//               );
//             }

//             return null;
//           })}
//         </List>
//       </Collapse>
//     </Box>
//   );
// });

// CategorySection.displayName = "CategorySection";

// // Extract configurator group component
// const ConfiguratorGroup = React.memo<{
//   item: Extract<MenuItemConfig, { type: "group" }>;
//   openCategories: Record<string, boolean>;
//   setOpenCategories: React.Dispatch<
//     React.SetStateAction<Record<string, boolean>>
//   >;
//   pathname: string;
//   theme: typeof theme;
//   categoryTitle: string;
//    features: string[];
// }>(
//   ({
//     item,
//     openCategories,
//     setOpenCategories,
//     pathname,
//     theme,
//     categoryTitle,
//     features
//   }) => {
//     const isConfiguratorOpen = openCategories[item.name] ?? false;

//     const handleToggle = useCallback(() => {
//       setOpenCategories((prev) => ({
//         ...prev,
//         [item.name]: !prev[item.name],
//       }));
//     }, [item.name, setOpenCategories]);

//     return (
//       <Box>
//         <ListItem disablePadding>
//           <ListItemButton
//             onClick={handleToggle}
//             sx={{
//               pl: 1,
//               borderRadius: 1,
//               py: 0.75,
//               fontSize: "14px",
//               "&:hover": {
//                 backgroundColor: "rgba(25,118,210,0.08)",
//               },
//             }}
//           >
//             {item.icon && (
//               <ListItemIcon sx={{ minWidth: 28, color: "#6b7280" }}>
//                 <item.icon fontSize="small" />
//               </ListItemIcon>
//             )}
//             <ListItemText
//               primary={item.name}
//               sx={{
//                 fontSize: "14px",
//                 color: "#6b7280",
//               }}
//             />
//             {isConfiguratorOpen ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>

//         <Collapse in={isConfiguratorOpen} timeout="auto" unmountOnExit>
//           <List sx={{ pl: 3 }}>
//             {getAllLinkItems(item.items).map((subItem) => (
//               <SubMenuItem
//                 key={subItem.path}
//                 item={subItem}
//                 pathname={pathname}
//                 theme={theme}
//                 categoryTitle={categoryTitle}
//                 features={features}
//               />
//             ))}
//           </List>
//         </Collapse>
//       </Box>
//     );
//   },
// );

// ConfiguratorGroup.displayName = "ConfiguratorGroup";

// const Sidebar: React.FC<SidebarProps> = () => {
//   const theme = useTheme();
//   const { user } = useSelector((state: RootState) => state.auth);
//   const tenantId: string = user?.org_id ?? "";
//   const LoggedInUser: string = user?.userId ?? "";

//   const drawerWidth: string = "315px";
//   const router = useRouter();
//   const pathname = usePathname();
//   const { features } = useAuth();

//   const [analyticsOpen, setAnalyticsOpen] = useState(true);
//   const [settingsOpen, setSettingsOpen] = useState(false);
//   const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
//     { Dashboard: true,},
//   );

//   const { data, isLoading } = useGetOrgAndUserLogoQuery(
//     {
//       LoggedInUserId: LoggedInUser,
//       tenantId: tenantId,
//     },
//     {
//       skip: !LoggedInUser || !tenantId,
//     },
//   );
//   // Fallback image if API fails or loading
//   const orgLogo = data?.logoPath?.orgLogo ?? "./CustomerLogo1.png";
//   const handleCategoryToggle = useCallback(
//     (title: string, isTopLevel: boolean = true) => {
//       setOpenCategories((prev) => {
//         const isCurrentlyOpen = !!prev[title];

//         if (isTopLevel) {
//           // Close all other top-level categories
//           const newState: Record<string, boolean> = {};
//           if (!isCurrentlyOpen) {
//             newState[title] = true;
//           }
//           return newState;
//         } else {
//           // Nested toggle: just toggle this item
//           return {
//             ...prev,
//             [title]: !isCurrentlyOpen,
//           };
//         }
//       });
//     },
//     [],
//   );

//   const handleAnalyticsToggle = useCallback(() => {
//     const willOpen = !analyticsOpen;

//     if (willOpen) {
//       setOpenCategories({});
//       setSettingsOpen(false);
//     }

//     setAnalyticsOpen((prev) => !prev);
//   }, [analyticsOpen]);

//   const handleSettingsToggle = useCallback(() => {
//     const willOpen = !settingsOpen;

//     if (willOpen) {
//       setOpenCategories({});
//       setAnalyticsOpen(false);
//     }

//     setSettingsOpen((prev) => !prev);
//   }, [settingsOpen]);

// const filteredMenus = useMemo(() => {
//   return {
//     liveStreamingFlags: liveStreamingMenu,
//     dashboardFlags: dashboardMenu,
//     alertFlags: alertMenu,
//     analyticsFlags: analyticsMenu,
//     settingsFlags: settingsMenu,
//   };
// }, []);
//   const isAnalyticsActive = useMemo(() => {
//     return filteredMenus.analyticsFlags.some((category) =>
//       getAllLinkItems(category.items).some((link) => pathname === link.path),
//     );
//   }, [pathname, filteredMenus.analyticsFlags]);

//   const isSettingsActive = useMemo(() => {
//     return filteredMenus.settingsFlags.some((category) =>
//       getAllLinkItems(category.items).some((link) => pathname === link.path),
//     );
//   }, [pathname, filteredMenus.settingsFlags]);

//   const menuContent = useMemo(
//     () => (
//       <>
//         {/* Dashboard */}
//         {filteredMenus.dashboardFlags.length > 0 && (
//           <List sx={{ p: 0, mt: 1 }}>
//             {filteredMenus.dashboardFlags.map((category, index) => {
//               const isOpen = openCategories[category.title] ?? false;

//               const isDashboardRoot =
//                 !!category.path && pathname === category.path;

//               const isDashboardChild = category.items.some(
//                 (item) =>
//                   item.type === "link" &&
//                   (pathname === item.path ||
//                     pathname.startsWith(`${item.path}/`)),
//               );
//               let iconColor = "#5c6b7d";

//               if (isDashboardRoot) {
//                 iconColor = "white";
//               } else if (isDashboardChild) {
//                 iconColor = theme.palette.primary.main;
//               }
//               return (
//                 // <Box key={uuidv4() + index} sx={{ mb: 1 }}>
//                 <Box key={category.title} sx={{ mb: 1 }}>
//                   <ListItem disablePadding>
//                     <ListItemButton
//                       selected={isDashboardRoot}
//                       sx={{
//                         borderRadius: 1,
//                         py: 1,

//                         "&.Mui-selected": {
//                           backgroundColor: theme.palette.primary.main,
//                           color: "white",
//                           "&:hover": {
//                             backgroundColor: theme.palette.primary.dark,
//                           },
//                         },

//                         "&:hover": {
//                           backgroundColor: "rgba(25,118,210,0.08)",
//                         },
//                       }}
//                       onClick={() => {
//                         if (category.path) {
//                           router.push(category.path);
//                         }
//                       }}
//                     >
//                       {category.icon && (
//                         <ListItemIcon sx={{ minWidth: 36, color: iconColor }}>
//                           <category.icon />
//                         </ListItemIcon>
//                       )}
//                       <ListItemText
//                         primary={category.title}
//                         sx={{ color: iconColor }}
//                       />
//                       <Box
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleCategoryToggle(category.title);
//                         }}
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           color: iconColor,
//                         }}
//                       >
//                         {isOpen ? <ExpandLess /> : <ExpandMore />}
//                       </Box>
//                     </ListItemButton>
//                   </ListItem>

//                   {/* <Collapse in={isOpen} timeout="auto"> */}
//                   <Collapse
//   in={
//     isOpen ||
//     category.items.some(
//       (item) =>
//         item.type === "link" &&
//         (pathname === item.path ||
//           pathname.startsWith(`${item.path}/`))
//     )
//   }
//   timeout="auto"
// >
//                     <List sx={{ pl: 2 }}>
                    
//                       {category.items.map((item) => {
//   if (isLink(item)) {
//     return (
//       <SubMenuItem
//         key={item.path}
//         item={item}
//         pathname={pathname}
//         theme={theme}
//         categoryTitle={category.title}
//         features={features}
//       />
//     );
//   }

//   if (isGroup(item)) {
//     return (
//       <ConfiguratorGroup
//         key={item.name}
//         item={item}
//         openCategories={openCategories}
//         setOpenCategories={setOpenCategories}
//         pathname={pathname}
//         theme={theme}
//         categoryTitle={category.title}
//         features={features}
//       />
//     );
//   }

//   return null;
// })}
//                     </List>
//                   </Collapse>
//                 </Box>
//               );
//             })}
//           </List>
//         )}

//         {/* Analytics */}
//         {filteredMenus.analyticsFlags.length > 0 && (
//           <List sx={{ p: 0, mt: 1 }}>
//             <ListItem disablePadding>
//               <ListItemButton
//                 onClick={handleAnalyticsToggle}
//                 selected={
//                   isAnalyticsActive &&
//                   !Object.values(openCategories).some(Boolean)
//                 }
//                 sx={{
//                   borderRadius: 1,
//                   "&.Mui-selected": {
//                     backgroundColor: theme.palette.primary.main,
//                     color: "white",
//                     "&:hover": { backgroundColor: theme.palette.primary.dark },
//                   },
//                   color: isAnalyticsActive
//                     ? theme.palette.primary.main
//                     : "inherit",
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 36,
//                     color: isAnalyticsActive
//                       ? theme.palette.primary.main
//                       : "inherit",
//                   }}
//                 >
//                   <BarChart />
//                 </ListItemIcon>
//                 <ListItemText primary="Analytics" />
//                 {analyticsOpen ? <ExpandLess /> : <ExpandMore />}
//               </ListItemButton>
//             </ListItem>

//             <Collapse in={analyticsOpen} timeout="auto" unmountOnExit>
//               <List sx={{ pl: 2 }}>
//                 {filteredMenus.analyticsFlags.map((category, index) => (
//                   <CategorySection
//                     key={uuidv4() + index}
//                     category={category}
//                     openCategories={openCategories}
//                     onToggle={handleCategoryToggle}
//                     pathname={pathname}
//                     theme={theme}
//                     features={features}
//                   />
//                 ))}
//               </List>
//             </Collapse>
//           </List>
//         )}

//         {/* Alerts */}
//         <List sx={{ p: 0, mt: 1 }}>
//           {filteredMenus.liveStreamingFlags.filter(isLink).map((item) => (
//             <MenuItem
//               key={item.path}
//               item={item}
//               pathname={pathname}
//               theme={theme}
//               features={features}
//             />
//           ))}
//         </List>

//         {/* Settings */}
//         {filteredMenus.settingsFlags.length > 0 && (
//           <List sx={{ p: 0, mt: 1 }}>
//             <ListItem disablePadding>
//               <ListItemButton
//                 onClick={handleSettingsToggle}
//                 sx={{
//                   borderRadius: 1,
//                   "&.Mui-selected": {
//                     backgroundColor: theme.palette.primary.main,
//                     color: "white",
//                     "&:hover": { backgroundColor: theme.palette.primary.dark },
//                   },
//                   color: isSettingsActive
//                     ? theme.palette.primary.main
//                     : "inherit",
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 36,
//                     color: isSettingsActive
//                       ? theme.palette.primary.main
//                       : "inherit",
//                   }}
//                 >
//                   <Settings />
//                 </ListItemIcon>
//                 <ListItemText
//                   primary="Settings"
//                   sx={{ fontSize: "14px", color: "#5c6b7d" }}
//                 />
//                 {settingsOpen ? <ExpandLess /> : <ExpandMore />}
//               </ListItemButton>
//             </ListItem>

//             <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
//               <List sx={{ pl: 2 }}>
//                 {filteredMenus.settingsFlags.map((category) =>
//                   category.items.map((item) => {
//                     if (isLink(item)) {
//                       return (
//                         <SubMenuItem
//                           key={item.path}
//                           item={item}
//                           pathname={pathname}
//                           theme={theme}
//                           categoryTitle={category.title}
//                           features={features}
//                         />
//                       );
//                     }

//                     if (isGroup(item)) {
//                       return (
//                         <ConfiguratorGroup
//                           key={item.name}
//                           item={item}
//                           openCategories={openCategories}
//                           setOpenCategories={setOpenCategories}
//                           pathname={pathname}
//                           theme={theme}
//                           categoryTitle={category.title}
//                             features={features}

//                         />
//                       );
//                     }

//                     return null;
//                   }),
//                 )}
//               </List>
//             </Collapse>
//           </List>
//         )}
//       </>
//     ),
//     [
//       filteredMenus,
//       pathname,
//       theme,
//       router,
//       analyticsOpen,
//       settingsOpen,
//       openCategories,
//       handleAnalyticsToggle,
//       handleSettingsToggle,
//       handleCategoryToggle,
//       isAnalyticsActive,
//       isSettingsActive,
//       features
//     ],
//   );

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           height: "100vh",
//           borderRight: "none",
//           boxShadow: "1px 0 3px rgba(0,0,0,0.1)",
//           p: 2,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//         },
//       }}
//     >
//       {/* Customer Logo at top */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "left",
//           alignItems: "center",
//         }}
//       >
//         {/* <Box
//           component="img"
//           src={orgLogo}
//           alt="Customer Logo"
//           sx={{
//             height: 46,
//           }}
//         /> */}
//         {isLoading ? (
//           <Skeleton
//             variant="rectangular"
//             width={260}
//             height={46}
//             sx={{ borderRadius: 1 }}
//           />
//         ) : (
//           <Box
//             component="img"
//             src={orgLogo}
//             alt="Customer Logo"
//             sx={{ height: 46, width: 180, ml: 2, pb: 1 }}
//           />
//         )}
//       </Box>

//       {/* Divider */}
//       <Divider sx={{ mx: -2, mb: 1.5 }} />

//       {/* Menu Content */}
//       <Box sx={{ flex: 1, overflowY: "auto" }}>{menuContent}</Box>

//       {/* Footer */}
//       <Box
//         sx={{
//           pt: 2,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           textAlign: "center",
//           gap: 1,
//         }}
//       >
//         <Box
//           component="img"
//           src="/scoutLogo.png"
//           alt="Elansol Logo"
//           sx={{ height: 46, width: "auto" }}
//           loading="lazy"
//         />
//         <Typography sx={{ fontSize: "13px", color: "#666" }}>
//           &copy; 2025 Elansol Technologies. <br />
//           All rights reserved.
//         </Typography>
//       </Box>
//     </Drawer>
//   );
// };

// export default React.memo(Sidebar);

"use client";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Tooltip } from "@mui/material";
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
  Skeleton,
} from "@mui/material";
import {
  BarChart,
  ExpandLess,
  ExpandMore,
  Settings,
  Lock,
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
import { useGetOrgAndUserLogoQuery } from "@/app/(protectedRoutes)/(settings)/(userManagement)/addUser/AddUserApi";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const isLink = (
  item: MenuItemConfig,
): item is Extract<MenuItemConfig, { type: "link" }> => item.type === "link";

const isGroup = (
  item: MenuItemConfig,
): item is Extract<MenuItemConfig, { type: "group" }> => item.type === "group";

const getAllLinkItems = (items: MenuItemConfig[]): LinkMenuItem[] =>
  items.flatMap((item) => {
    if (isLink(item)) return [item];
    if (isGroup(item)) return item.items.filter(isLink);
    return [];
  });

// ─── Lock Badge ────────────────────────────────────────────────────────────────
/**
 * Small amber "PRO" pill with a lock icon shown inline on disabled menu items.
 * Replaces the opacity-fade approach so the item label stays readable while
 * still clearly communicating that an upgrade is required.
 */
const LockBadge = () => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      ml: "auto",
      width: 20,
      height: 20,
      borderRadius: "50%",
      backgroundColor: "rgba(148, 163, 184, 0.2)",
      flexShrink: 0,
    }}
  >
    <Lock sx={{ fontSize: "12px", color: "#64748b" }} />
  </Box>
);

// ─── MenuItem ──────────────────────────────────────────────────────────────────
const MenuItem = React.memo<{
  item: LinkMenuItem;
  pathname: string;
  theme: typeof theme;
  features: string[];
}>(({ item, pathname, theme, features }) => {
  const enabled = hasFeature(features, item.featureId);

  return (
    <Tooltip
      title={!enabled ? `Upgrade your plan to access ${item.name}` : ""}
      arrow
      placement="right"
    >
      <span>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            component={enabled ? Link : "div"}
            href={enabled ? item.path : undefined}
            disabled={!enabled}
            selected={pathname === item.path}
            sx={{
              borderRadius: 1,
              cursor: enabled ? "pointer" : "not-allowed",
              ...(enabled
                ? {}
                : {
                    backgroundColor: "rgba(241, 245, 249, 0.7)",
                    "& .MuiListItemText-primary": { color: "#94a3b8" },
                    "& .MuiListItemIcon-root": { color: "#94a3b8" },
                    "&.Mui-disabled": { opacity: 1 },
                  }),
              "&.Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
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
            {!enabled && <LockBadge />}
          </ListItemButton>
        </ListItem>
      </span>
    </Tooltip>
  );
});
MenuItem.displayName = "MenuItem";

// ─── SubMenuItem ───────────────────────────────────────────────────────────────
const SubMenuItem = React.memo<{
  item: LinkMenuItem;
  pathname: string;
  theme: typeof theme;
  categoryTitle: string;
  features: string[];
}>(({ item, pathname, theme, categoryTitle, features }) => {
  const enabled = hasFeature(features, item.featureId);
  const isSelected = pathname === item.path;

  return (
    <Tooltip
      title={!enabled ? `Upgrade your plan to access ${item.name}` : ""}
      arrow
      placement="right"
    >
      <span>
        <ListItem disablePadding>
          <ListItemButton
            component={enabled ? Link : "div"}
            href={enabled ? item.path : undefined}
            disabled={!enabled}
            selected={isSelected}
            sx={{
              borderRadius: 1,
              py: 0.75,
              cursor: enabled ? "pointer" : "not-allowed",
              ...(enabled
                ? {}
                : {
                    backgroundColor: "rgba(241, 245, 249, 0.7)",
                    "&.Mui-disabled": { opacity: 1 },
                  }),
              "&.Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
                "&:hover": { backgroundColor: theme.palette.primary.dark },
              },
              "&:hover": {
                backgroundColor: enabled
                  ? "rgba(25,118,210,0.08)"
                  : "rgba(241, 245, 249, 0.9)",
              },
            }}
          >
            {item.icon && (
              <ListItemIcon
                sx={{
                  minWidth: 28,
                  color: isSelected ? "white" : enabled ? "#6b7280" : "#94a3b8",
                }}
              >
                <item.icon fontSize="small" />
              </ListItemIcon>
            )}

            <ListItemText
              primary={
                categoryTitle === "Settings" ? item.name : `• ${item.name}`
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
                    color: isSelected ? "white" : enabled ? "#6b7280" : "#94a3b8",
                    lineHeight: 1.4,
                  },
                },
              }}
            />

            {!enabled && <LockBadge />}
          </ListItemButton>
        </ListItem>
      </span>
    </Tooltip>
  );
});
SubMenuItem.displayName = "SubMenuItem";

// ─── CategorySection ───────────────────────────────────────────────────────────
const CategorySection = React.memo<{
  category: CategoryConfig & { items: MenuItemConfig[] };
  openCategories: Record<string, boolean>;
  onToggle: (title: string) => void;
  pathname: string;
  theme: typeof theme;
  features: string[];
}>(({ category, openCategories, onToggle, pathname, theme, features }) => {
  const filteredItems = category.items;
  const allLinks = getAllLinkItems(category.items);
  const totalCount = allLinks.length;
  const enabledCount = allLinks.filter((item) =>
    hasFeature(features, item.featureId),
  ).length;

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
            primary={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: "14px", color: "#5c6b7d" }}>
                  {category.title}
                </Typography>
                <Chip
                  label={`${enabledCount}/${totalCount}`}
                  size="small"
                  sx={{ height: 20, fontSize: "11px" }}
                />
              </Box>
            }
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
          {filteredItems.map((item, index) => {
            if (isLink(item)) {
              return (
                <SubMenuItem
                  key={uuidv4() + index}
                  item={item}
                  pathname={pathname}
                  theme={theme}
                  categoryTitle={category.title}
                  features={features}
                />
              );
            }
            if (isGroup(item)) {
              return (
                <Box key={uuidv4() + index}>
                  <ListItem disablePadding sx={{ pl: 1 }}>
                    <ListItemText
                      primary={item.name}
                      sx={{ color: "#5c6b7d", fontSize: "13px" }}
                    />
                  </ListItem>
                  {getAllLinkItems(item.items).map((subItem) => (
                    <SubMenuItem
                      key={subItem.path}
                      item={subItem}
                      pathname={pathname}
                      theme={theme}
                      categoryTitle={category.title}
                      features={features}
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

// ─── ConfiguratorGroup ─────────────────────────────────────────────────────────
const ConfiguratorGroup = React.memo<{
  item: Extract<MenuItemConfig, { type: "group" }>;
  openCategories: Record<string, boolean>;
  setOpenCategories: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  pathname: string;
  theme: typeof theme;
  categoryTitle: string;
  features: string[];
}>(({ item, openCategories, setOpenCategories, pathname, theme, categoryTitle, features }) => {
  const isConfiguratorOpen = openCategories[item.name] ?? false;

  const handleToggle = useCallback(() => {
    setOpenCategories((prev) => ({ ...prev, [item.name]: !prev[item.name] }));
  }, [item.name, setOpenCategories]);

  return (
    <Box>
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleToggle}
          sx={{
            pl: 1,
            borderRadius: 1,
            py: 0.75,
            fontSize: "14px",
            "&:hover": { backgroundColor: "rgba(25,118,210,0.08)" },
          }}
        >
          {item.icon && (
            <ListItemIcon sx={{ minWidth: 28, color: "#6b7280" }}>
              <item.icon fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText primary={item.name} sx={{ fontSize: "14px", color: "#6b7280" }} />
          {isConfiguratorOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>

      <Collapse in={isConfiguratorOpen} timeout="auto" unmountOnExit>
        <List sx={{ pl: 3 }}>
          {getAllLinkItems(item.items).map((subItem) => (
            <SubMenuItem
              key={subItem.path}
              item={subItem}
              pathname={pathname}
              theme={theme}
              categoryTitle={categoryTitle}
              features={features}
            />
          ))}
        </List>
      </Collapse>
    </Box>
  );
});
ConfiguratorGroup.displayName = "ConfiguratorGroup";

// ─── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar: React.FC<SidebarProps> = () => {
  const theme = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId: string = user?.org_id ?? "";
  const LoggedInUser: string = user?.userId ?? "";

  const drawerWidth: string = "315px";
  const router = useRouter();
  const pathname = usePathname();
  const { features } = useAuth();

  const [analyticsOpen, setAnalyticsOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    { Dashboard: true },
  );

  const { data, isLoading } = useGetOrgAndUserLogoQuery(
    { LoggedInUserId: LoggedInUser, tenantId },
    { skip: !LoggedInUser || !tenantId },
  );
  const orgLogo = data?.logoPath?.orgLogo ?? "./CustomerLogo1.png";

  const handleCategoryToggle = useCallback(
    (title: string, isTopLevel: boolean = true) => {
      setOpenCategories((prev) => {
        const isCurrentlyOpen = !!prev[title];
        if (isTopLevel) {
          const newState: Record<string, boolean> = {};
          if (!isCurrentlyOpen) newState[title] = true;
          return newState;
        }
        return { ...prev, [title]: !isCurrentlyOpen };
      });
    },
    [],
  );

  const handleAnalyticsToggle = useCallback(() => {
    const willOpen = !analyticsOpen;
    if (willOpen) { setOpenCategories({}); setSettingsOpen(false); }
    setAnalyticsOpen((prev) => !prev);
  }, [analyticsOpen]);

  const handleSettingsToggle = useCallback(() => {
    const willOpen = !settingsOpen;
    if (willOpen) { setOpenCategories({}); setAnalyticsOpen(false); }
    setSettingsOpen((prev) => !prev);
  }, [settingsOpen]);

  const filteredMenus = useMemo(
    () => ({
      liveStreamingFlags: liveStreamingMenu,
      dashboardFlags: dashboardMenu,
      alertFlags: alertMenu,
      analyticsFlags: analyticsMenu,
      settingsFlags: settingsMenu,
    }),
    [],
  );

  const isAnalyticsActive = useMemo(
    () =>
      filteredMenus.analyticsFlags.some((category) =>
        getAllLinkItems(category.items).some((link) => pathname === link.path),
      ),
    [pathname, filteredMenus.analyticsFlags],
  );

  const isSettingsActive = useMemo(
    () =>
      filteredMenus.settingsFlags.some((category) =>
        getAllLinkItems(category.items).some((link) => pathname === link.path),
      ),
    [pathname, filteredMenus.settingsFlags],
  );

  const menuContent = useMemo(
    () => (
      <>
        {/* Dashboard */}
        {filteredMenus.dashboardFlags.length > 0 && (
          <List sx={{ p: 0, mt: 1 }}>
            {filteredMenus.dashboardFlags.map((category) => {
              const isOpen = openCategories[category.title] ?? false;
              const isDashboardRoot = !!category.path && pathname === category.path;
              const isDashboardChild = category.items.some(
                (item) =>
                  item.type === "link" &&
                  (pathname === item.path || pathname.startsWith(`${item.path}/`)),
              );
              let iconColor = "#5c6b7d";
              if (isDashboardRoot) iconColor = "white";
              else if (isDashboardChild) iconColor = theme.palette.primary.main;

              return (
                <Box key={category.title} sx={{ mb: 1 }}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={isDashboardRoot}
                      sx={{
                        borderRadius: 1,
                        py: 1,
                        "&.Mui-selected": {
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                          "&:hover": { backgroundColor: theme.palette.primary.dark },
                        },
                        "&:hover": { backgroundColor: "rgba(25,118,210,0.08)" },
                      }}
                      onClick={() => { if (category.path) router.push(category.path); }}
                    >
                      {category.icon && (
                        <ListItemIcon sx={{ minWidth: 36, color: iconColor }}>
                          <category.icon />
                        </ListItemIcon>
                      )}
                      <ListItemText primary={category.title} sx={{ color: iconColor }} />
                      <Box
                        onClick={(e) => { e.stopPropagation(); handleCategoryToggle(category.title); }}
                        sx={{ display: "flex", alignItems: "center", color: iconColor }}
                      >
                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                      </Box>
                    </ListItemButton>
                  </ListItem>

                  <Collapse
                    in={
                      isOpen ||
                      category.items.some(
                        (item) =>
                          item.type === "link" &&
                          (pathname === item.path || pathname.startsWith(`${item.path}/`)),
                      )
                    }
                    timeout="auto"
                  >
                    <List sx={{ pl: 2 }}>
                      {category.items.map((item) => {
                        if (isLink(item)) {
                          return (
                            <SubMenuItem
                              key={item.path}
                              item={item}
                              pathname={pathname}
                              theme={theme}
                              categoryTitle={category.title}
                              features={features}
                            />
                          );
                        }
                        if (isGroup(item)) {
                          return (
                            <ConfiguratorGroup
                              key={item.name}
                              item={item}
                              openCategories={openCategories}
                              setOpenCategories={setOpenCategories}
                              pathname={pathname}
                              theme={theme}
                              categoryTitle={category.title}
                              features={features}
                            />
                          );
                        }
                        return null;
                      })}
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
                selected={isAnalyticsActive && !Object.values(openCategories).some(Boolean)}
                sx={{
                  borderRadius: 1,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": { backgroundColor: theme.palette.primary.dark },
                  },
                  color: isAnalyticsActive ? theme.palette.primary.main : "inherit",
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 36, color: isAnalyticsActive ? theme.palette.primary.main : "inherit" }}
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
                    features={features}
                  />
                ))}
              </List>
            </Collapse>
          </List>
        )}

        {/* Live Streaming / Alerts */}
        <List sx={{ p: 0, mt: 1 }}>
          {filteredMenus.liveStreamingFlags.filter(isLink).map((item) => (
            <MenuItem key={item.path} item={item} pathname={pathname} theme={theme} features={features} />
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
                  color: isSettingsActive ? theme.palette.primary.main : "inherit",
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 36, color: isSettingsActive ? theme.palette.primary.main : "inherit" }}
                >
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" sx={{ fontSize: "14px", color: "#5c6b7d" }} />
                {settingsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
              <List sx={{ pl: 2 }}>
                {filteredMenus.settingsFlags.map((category) =>
                  category.items.map((item) => {
                    if (isLink(item)) {
                      return (
                        <SubMenuItem
                          key={item.path}
                          item={item}
                          pathname={pathname}
                          theme={theme}
                          categoryTitle={category.title}
                          features={features}
                        />
                      );
                    }
                    if (isGroup(item)) {
                      return (
                        <ConfiguratorGroup
                          key={item.name}
                          item={item}
                          openCategories={openCategories}
                          setOpenCategories={setOpenCategories}
                          pathname={pathname}
                          theme={theme}
                          categoryTitle={category.title}
                          features={features}
                        />
                      );
                    }
                    return null;
                  }),
                )}
              </List>
            </Collapse>
          </List>
        )}
      </>
    ),
    [
      filteredMenus, pathname, theme, router,
      analyticsOpen, settingsOpen, openCategories,
      handleAnalyticsToggle, handleSettingsToggle, handleCategoryToggle,
      isAnalyticsActive, isSettingsActive, features,
    ],
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
      <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
        {isLoading ? (
          <Skeleton variant="rectangular" width={260} height={46} sx={{ borderRadius: 1 }} />
        ) : (
          <Box
            component="img"
            src={orgLogo}
            alt="Customer Logo"
            sx={{ height: 46, width: 180, ml: 2, pb: 1 }}
          />
        )}
      </Box>

      <Divider sx={{ mx: -2, mb: 1.5 }} />

      <Box sx={{ flex: 1, overflowY: "auto" }}>{menuContent}</Box>

      <Box sx={{ pt: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 1 }}>
        <Box component="img" src="/scoutLogo.png" alt="Elansol Logo" sx={{ height: 46, width: "auto" }} loading="lazy" />
        <Typography sx={{ fontSize: "13px", color: "#666" }}>
          &copy; 2025 Elansol Technologies. <br />
          All rights reserved.
        </Typography>
      </Box>
    </Drawer>
  );
};

export default React.memo(Sidebar);