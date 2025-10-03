'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store/store';
import { useInitFeatureFlags } from '../customhooks/useInitFeatureFlags';

// Mark children as readonly
function InitFeatureFlagsWrapper({ children }: { readonly children: React.ReactNode }) {
  useInitFeatureFlags(); 
  return <>{children}</>;
}

export default function GlobalFeatureflagProvider({ children }: { readonly children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InitFeatureFlagsWrapper>{children}</InitFeatureFlagsWrapper>
    </Provider>
  );
}
