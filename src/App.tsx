import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Admin from "./pages/Admin"; 
import OverviewPanel from "./pages/admin/OverviewPanel";
import SectorsPanel from "./pages/admin/SectorsPanel"; 
import MessagesPanel from "./pages/admin/MessagesPanel"; // FIXED: Added this import
import UsersPanel from "./pages/admin/UsersPanel";
import SettingsPanel from "./pages/admin/SettingsPanel";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* Admin Route Group */}
        <Route 
          path="/admin" 
          element={
            <>
              <SignedIn>
                <Admin />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        >
          {/* These are nested routes. They render inside the 
              <Outlet /> component located in your AdminLayout.
          */}
          <Route index element={<OverviewPanel />} />
          <Route path="sectors" element={<SectorsPanel />} />
          <Route path="messages" element={<MessagesPanel />} />
          <Route path="users" element={<UsersPanel />} />
          <Route path="settings" element={<SettingsPanel />} />
        </Route>

        {/* Global 404 Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}