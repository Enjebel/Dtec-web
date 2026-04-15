import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

// 1. Validate Environment Variables
const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CONVEX_URL) {
  console.error("DTEC System: Missing VITE_CONVEX_URL. Check Vercel/Local Env.");
}

if (!PUBLISHABLE_KEY) {
  throw new Error("DTEC System: Missing Clerk Publishable Key");
}

// 2. Initialize Convex Client
const convex = new ConvexReactClient(CONVEX_URL as string);

// 3. Register Service Worker for PWA Capability
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("DTEC System: PWA Link Established", reg.scope))
      .catch((err) => console.error("DTEC System: PWA Uplink Failed", err));
  });
}

// 4. Render Root with Authentication & Database Context
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <App />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </React.StrictMode>
);