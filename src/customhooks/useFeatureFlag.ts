
'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';

export const useFeatureFlags = () => {
  return useSelector((state: RootState) => state.featureFlags);
};
