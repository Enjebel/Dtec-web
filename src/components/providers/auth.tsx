import React from "react";
import { ConvexAuthProvider } from "convex/react-clerk"; // Or your preferred provider
// If you are bypassing Clerk entirely, use the basic Convex Auth logic

/**
 * AUTH PROVIDER (STABILIZED)
 * This version ensures the React tree doesn't collapse 
 * by providing a stable wrapper.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // If you want to bypass actual login screens for now, 
  // we must ensure we aren't returning 'null' or triggering redirects.
  return (
    <div id="auth-provider-wrapper" style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}