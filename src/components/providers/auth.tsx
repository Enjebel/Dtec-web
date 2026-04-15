import React from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

// Initialize Convex Client with a fallback to prevent build-time crashes
const convexUrl = import.meta.env.VITE_CONVEX_URL || "";
const convex = new ConvexReactClient(convexUrl);
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

/**
 * AUTH PROVIDER (STABILIZED)
 * This handles the bridge between Clerk (Identity) and Convex (Database).
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Critical check for Clerk key
  if (!PUBLISHABLE_KEY) {
    if (import.meta.env.DEV) {
      console.error("DTEC System: Missing Clerk Publishable Key in .env.local");
    }
    return <>{children}</>;
  }

  // Ensure Convex URL exists before wrapping with the provider
  if (!convexUrl) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <div id="auth-provider-wrapper" className="min-h-screen">
          {children}
        </div>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}