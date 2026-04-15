import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Layers, MessageSquare, Users, TrendingUp, ShieldCheck, Database } from "lucide-react";

export default function OverviewPanel() {
  const sectors = useQuery(api.sectors.list);
  const messages = useQuery(api.messages.list);
  const users = useQuery(api.users.listAllUsers);
  const unread = useQuery(api.messages.getUnreadCount);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Core Command Terminal</span>
          </div>
          <h2 className="text-4xl font-black uppercase italic text-gray-900">
            System <span className="text-orange-500">Overview</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Messages", value: messages?.length ?? "0", icon: <MessageSquare size={18}/>, color: "border-orange-500" },
          { label: "Unread", value: unread ?? "0", icon: <TrendingUp size={18}/>, color: "border-gray-900" },
          { label: "Users", value: users?.length ?? "0", icon: <Users size={18}/>, color: "border-gray-900" },
          { label: "Sectors", value: sectors?.length ?? "0", icon: <Layers size={18}/>, color: "border-gray-900" },
        ].map((stat) => (
          <div key={stat.label} className={`bg-white border-b-4 ${stat.color} p-6 shadow-sm`}>
            <div className="text-gray-400 mb-2">{stat.icon}</div>
            <p className="text-3xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden rounded-xl shadow-sm">
        <div className="bg-gray-900 p-4 flex items-center gap-2">
          <Database size={16} className="text-orange-500" />
          <h3 className="text-white text-xs font-black uppercase tracking-widest">Active Infrastructure</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {sectors?.map((s) => (
            <div key={s._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="font-bold text-xs text-gray-700 uppercase">{s.title}</span>
              <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase">
                Online
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}