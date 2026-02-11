"use client";

import React, { useState, ReactNode } from "react";
import { Box, Paper } from "@mui/material";
import styles from "./DashboardTabs.module.css";

// Tab configuration
export interface TabConfig {
  label: string | ReactNode;
  content: ReactNode;
}

interface DynamicTabsProps {
  readonly tabs: TabConfig[];
  readonly defaultTab?: number;
  readonly onTabChange?: (index: number) => void;
}

// Type-safe props for TabPanel
interface TabPanelProps {
  readonly children: ReactNode;
  readonly value: number;
  readonly index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`tab-${index}`}
      sx={{
        display: value === index ? "flex" : "none",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
}

export default function DynamicTabs({
  tabs = [],
  defaultTab = 0,
  onTabChange,
}: DynamicTabsProps) {
  const [value, setValue] = useState(defaultTab);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    onTabChange?.(newValue);
  };

  if (!tabs || tabs.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
        No tabs available
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          {tabs.map((tab, index) => (
            <React.Fragment key={index + 1}>
              <button
                className={`${styles.tab} ${
                  value === index ? styles.tabActive : ""
                }`}
                onClick={() => handleChange(index)}
                role="tab"
                aria-selected={value === index}
                id={`tab-${index}`}
              >
                <span className={styles.tabLabel}>{tab.label}</span>
                <div className={styles.tabBackground}></div>
              </button>
              {index < tabs.length - 1 &&
                value !== index &&
                value !== index + 1 && (
                  <div className={styles.tabDivider}></div>
                )}
            </React.Fragment>
          ))}
        </div>
        <div className={styles.tabsUnderline}></div>
      </div>

       <Box
        sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
      >
        {tabs.map((tab, index) => (
          <TabPanel key={index + 1} value={value} index={index}>
            
            {/* {tab.content} */}
             <Paper sx={{  m: 2,height:"100%"}}>
                {tab.content}
              </Paper>
          </TabPanel>
        ))}
        
      </Box> 


    </Box>
  );
}


// "use client";

// import React, { useState, ReactNode } from "react";
// import { Box, Paper } from "@mui/material";
// import styles from "./DashboardTabs.module.css";

// // Tab configuration
// export interface TabConfig {
//   label: string | ReactNode;
//   content: ReactNode;
// }

// interface DynamicTabsProps {
//   readonly tabs: TabConfig[];
//   readonly defaultTab?: number;
//   readonly onTabChange?: (index: number) => void;
// }

// // Type-safe props for TabPanel
// interface TabPanelProps {
//   readonly children: ReactNode;
//   readonly value: number;
//   readonly index: number;
// }

// function TabPanel({ children, value, index }: TabPanelProps) {
//   return (
//     <Box
//       role="tabpanel"
//       hidden={value !== index}
//       aria-labelledby={`tab-${index}`}
//       sx={{
//         display: value === index ? "flex" : "none",
//         flex: 1,
//         minHeight: 0,
//       }}
//     >
//       {children}
//     </Box>
//   );
// }

// export default function DynamicTabs({
//   tabs = [],
//   defaultTab = 0,
//   onTabChange,
// }: DynamicTabsProps) {
//   const [value, setValue] = useState(defaultTab);

//   const handleChange = (newValue: number) => {
//     setValue(newValue);
//     onTabChange?.(newValue);
//   };

//   if (!tabs || tabs.length === 0) {
//     return (
//       <Box sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
//         No tabs available
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         flex: 1,
//         minHeight: 0,
//       }}
//     >
//       {/* Tabs header */}
//       <div className={styles.tabsContainer}>
//         <div className={styles.tabsList}>
//           {tabs.map((tab, index) => (
//             <React.Fragment key={index}>
//               <button
//                 className={`${styles.tab} ${
//                   value === index ? styles.tabActive : ""
//                 }`}
//                 onClick={() => handleChange(index)}
//                 role="tab"
//                 aria-selected={value === index}
//                 id={`tab-${index}`}
//               >
//                 <span className={styles.tabLabel}>{tab.label}</span>
//                 <div className={styles.tabBackground}></div>
//               </button>
//               {index < tabs.length - 1 &&
//                 value !== index &&
//                 value !== index + 1 && (
//                   <div className={styles.tabDivider}></div>
//                 )}
//             </React.Fragment>
//           ))}
//         </div>
//         <div className={styles.tabsUnderline}></div>
//       </div>

//       {/* Tab content */}
//       <Box sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
//         {tabs.map((tab, index) => (
//           <TabPanel key={index} value={value} index={index}>
//             {/* <Box
//               sx={{
//                 flex: 1,
//                 p: 2,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "flex-start", // change to "center" if you want vertical centering
//               }}
//             > */}
//               <Paper sx={{ width: "100%", m: 2, minHeight: 100 }}>
//                 {tab.content}
//               </Paper>
//           </TabPanel> 
//           //  </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }