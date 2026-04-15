import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import AdminLayout from "./admin/AdminLayout"; 
import { ShieldAlert, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

const LOGO = "/icon/icon-192.png";

export default function Admin() {
  // FIXED: No more { email: "..." } object. Clerk handles this.
  const isAdmin = useQuery(api.users.isAdmin);
  const storeUser = useMutation(api.users.store);

  // Sync user on load
  useEffect(() => {
    storeUser().catch(console.error);
  }, [storeUser]);

  if (isAdmin === undefined) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
         <div className="text-center">
            <Loader2 className="mx-auto mb-4 animate-spin text-blue-600" size={40} />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Verifying Admin Access...</p>
         </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center px-6">
        <div className="bg-white rounded-[3rem] p-12 max-w-md w-full text-center shadow-2xl border-b-8 border-orange-500">
          <img src={LOGO} className="h-14 w-14 rounded-2xl mx-auto mb-6 object-contain" alt="DTEC" />
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={24} className="text-orange-500" />
          </div>
          <h1 className="text-3xl font-black uppercase italic mb-3 text-slate-800">Access Denied</h1>
          <p className="text-gray-500 font-semibold text-sm mb-8 leading-relaxed">
            Your account is not authorized to access the DTEC Portal.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="w-full py-4 bg-slate-800 text-white font-black rounded-2xl uppercase tracking-widest text-[11px]"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return <AdminLayout />;
}