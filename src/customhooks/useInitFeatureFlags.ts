// // src/hooks/useInitFeatureFlags.ts
// 'use client';

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setFeatureFlags } from "../app/store/fetureFlag";
// import localFlags from "../app/config/featureFlags.json"; 

// export const useInitFeatureFlags = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchFlags = async () => {
//       try {
//         //  For now: load from frontend JSON
//         dispatch(setFeatureFlags(localFlags));

//         //  Later: replace with backend API
//         // const res = await fetch("/api/feature-flags");
//         // const data = await res.json();
//         // dispatch(setFeatureFlags(data));
//       } catch (err) {
//         console.error("Failed to load feature flags", err);
//       }
//     };

//     fetchFlags();
//   }, [dispatch]);
// };
// src/app/store/featureFlag.ts
// src/customhooks/useInitFeatureFlags.ts
// src/customhooks/useInitFeatureFlags.ts
'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFeatureFlags } from '../app/store/fetureFlag';
import localFlags from "../app/config/featureFlags.json"; 

export const useInitFeatureFlags = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFeatureFlags(localFlags)); 
  }, [dispatch]);
};
// useEffect(() => {
//   const fetchFlags = async () => {
//     const res = await fetch('/featureFlags.json'); 
//     const data = await res.json();
//     dispatch(setFeatureFlags(data));
//   };
//   fetchFlags();
// }, [dispatch]);
// }