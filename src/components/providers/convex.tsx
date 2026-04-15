import { ConvexProvider as BaseConvexProvider, ConvexReactClient } from "convex/react";
import React, { useMemo } from "react";

export function ConvexProvider({ children }: { children: React.ReactNode }) {
  // useMemo prevents the client from being recreated on every render
  const convex = useMemo(() => {
    const url = import.meta.env.VITE_CONVEX_URL;
    if (!url) {
      // This will show in your console if the .env isn't loading
      console.error("CRITICAL: VITE_CONVEX_URL is missing from environment variables.");
      return new ConvexReactClient("http://localhost:3000"); 
    }
    return new ConvexReactClient(url);
  }, []);

  return (
    <BaseConvexProvider client={convex}>
      {children}
    </BaseConvexProvider>
  );
}