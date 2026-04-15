import { useMemo } from "react";

/**
 * UPDATED MOCK USE-AUTH HOOK
 * Now provides the functions the UI is actually calling.
 */
export function useAuth() {
  return useMemo(() => ({
    isAuthenticated: true, // Force this to true to see the dashboard immediately
    isLoading: false,
    user: {
      name: "Enjebel Admin",
      email: "admin@localhost",
      picture: "https://github.com/identicons/enjebel.png",
    },
    // Change 'logout' to 'removeUser' or 'signOut' to match your signin.tsx
    removeUser: async () => {
      console.log("Local development: Logout triggered via removeUser");
      window.location.href = "/";
    },
    signOut: async () => {
      console.log("Local development: Logout triggered via signOut");
      window.location.href = "/";
    },
    signinRedirect: async () => {
      console.log("Local development: Signin triggered");
    },
    error: null,
  }), []);
}