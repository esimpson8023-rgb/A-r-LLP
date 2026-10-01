'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import type { ServiceKey } from '@/lib/content';

type PrefillRequest = { key: ServiceKey; n: number };

type SiteContextValue = {
  /** Service currently shown in the detail dialog, or null when it is closed */
  openKey: ServiceKey | null;
  openService: (key: ServiceKey) => void;
  closeService: () => void;
  /** Latest request to pre-select a service in the contact form */
  prefill: PrefillRequest | null;
  requestPrefill: (key: ServiceKey) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [openKey, setOpenKey] = useState<ServiceKey | null>(null);
  const [prefill, setPrefill] = useState<PrefillRequest | null>(null);

  const openService = useCallback((key: ServiceKey) => setOpenKey(key), []);
  const closeService = useCallback(() => setOpenKey(null), []);
  const requestPrefill = useCallback((key: ServiceKey) => setPrefill(p => ({ key, n: (p?.n ?? 0) + 1 })), []);

  return (
    <SiteContext.Provider value={{ openKey, openService, closeService, prefill, requestPrefill }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>');
  return ctx;
}
