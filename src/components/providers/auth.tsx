import React from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

// Initialize Convex Client
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

/**
 * AUTH PROVIDER (STABILIZED)
 * This handles the bridge between Clerk (Identity) and Convex (Database).
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (!PUBLISHABLE_KEY) {
    // This will show in the Vercel logs if you forget the Env Var
    console.error("DTEC System: Missing Clerk Publishable Key");
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <div id="auth-provider-wrapper" style={{ minHeight: "100vh" }}>
          {children}
        </div>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}