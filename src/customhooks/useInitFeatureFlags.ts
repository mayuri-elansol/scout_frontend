
'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFeatureFlags } from '../app/store/fetureFlagSlice';
import localFlags from "../app/config/featureFlags.json"; 

export const useInitFeatureFlags = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFeatureFlags(localFlags)); 
  }, [dispatch]);
};
