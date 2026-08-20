'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';

export function AuthHydration({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    useAuthStore.persist.rehydrate();
    setReady(true);
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
