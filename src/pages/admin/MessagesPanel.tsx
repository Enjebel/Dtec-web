import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { toast } from "sonner";
import { Trash2, CheckCheck, Mail, User, Clock } from "lucide-react";
import { ConvexError } from "convex/values";
import type { Doc } from "@/convex/_generated/dataModel.d.ts";

type Message = Doc<"messages">;

export default function MessagesPanel() {
  const messages = useQuery(api.messages.list);
  const markAsRead = useMutation(api.messages.markAsRead);
  const removeMsg = useMutation(api.messages.remove);

  const handleMarkRead = async (id: Message["_id"]) => {
    try {
      await markRead({ id });
    } catch (err) {
      if (err instanceof ConvexError) {
        const d = err.data as { message: string };
        toast.error(d.message);
      }
    }
  };

  const handleDelete = async (id: Message["_id"]) => {
    if (!confirm("Delete this message?")) return;
    try {
      await removeMsg({ id });
      toast.success("Message deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  if (messages === undefined) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black uppercase italic text-foreground">Messages</h2>
        <p className="text-muted-foreground font-semibold text-sm">
          {messages.length} total &middot; {messages.filter((m) => !m.isRead).length} unread
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 border border-border text-center">
          <Mail size={40} className="mx-auto text-muted-foreground mb-4" />
          <p className="font-black uppercase italic text-foreground text-lg">No messages yet</p>
          <p className="text-muted-foreground font-semibold text-sm mt-2">Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`bg-white rounded-3xl p-6 border shadow-sm transition-all ${
                m.isRead ? "border-border opacity-70" : "border-primary/30 shadow-primary/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-1.5 text-foreground font-black text-[12px] uppercase tracking-tight">
                      <User size={14} className="text-primary" /> {m.name}
                    </div>
                    {m.email && (
                      <div className="flex items-center gap-1.5 text-muted-foreground font-semibold text-[11px]">
                        <Mail size={12} /> {m.email}
                      </div>
                    )}
                    {!m.isRead && (
                      <span className="bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-foreground font-semibold text-sm leading-relaxed">{m.message}</p>
                  <div className="flex items-center gap-1 mt-3 text-muted-foreground text-[10px] font-bold">
                    <Clock size={11} />
                    {new Date(m._creationTime).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!m.isRead && (
                    <button
                      onClick={() => handleMarkRead(m._id)}
                      className="p-2.5 bg-muted rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all cursor-pointer"
                      title="Mark as read"
                    >
                      <CheckCheck size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(m._id)}
                    className="p-2.5 bg-muted rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
