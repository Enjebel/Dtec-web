import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { toast } from "sonner";
import { ShieldCheck, User, Clock } from "lucide-react";
import { ConvexError } from "convex/values";
import type { Doc } from "@/convex/_generated/dataModel.d.ts";

type UserDoc = Doc<"users">;

export default function UsersPanel() {
  const users = useQuery(api.users.listAllUsers);
  const setAdmin = useMutation(api.users.setAdminRole);

  const handlePromote = async (u: UserDoc) => {
    if (!confirm(`Promote ${u.name ?? u.email ?? "this user"} to admin?`)) return;
    try {
      await setAdmin({ userId: u._id });
      toast.success("User promoted to admin.");
    } catch (err) {
      if (err instanceof ConvexError) {
        const d = err.data as { message: string };
        toast.error(d.message);
      } else {
        toast.error("Failed to promote user.");
      }
    }
  };

  if (users === undefined) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  const admins = users.filter((u) => u.role === "admin");
  const regular = users.filter((u) => u.role !== "admin");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black uppercase italic text-foreground">Users</h2>
        <p className="text-muted-foreground font-semibold text-sm">
          {users.length} registered &middot; {admins.length} admin{admins.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Admins */}
      {admins.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
          <h3 className="font-black uppercase italic text-foreground text-sm border-b border-border pb-4 mb-4 flex items-center gap-2">
            <ShieldCheck size={16} className="text-primary" /> Admins
          </h3>
          <div className="space-y-3">
            {admins.map((u) => (
              <UserRow key={u._id} user={u} isAdmin />
            ))}
          </div>
        </div>
      )}

      {/* Regular users */}
      <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
        <h3 className="font-black uppercase italic text-foreground text-sm border-b border-border pb-4 mb-4 flex items-center gap-2">
          <User size={16} className="text-muted-foreground" /> All Users
        </h3>
        {users.length === 0 ? (
          <p className="text-muted-foreground font-semibold text-sm">No users yet.</p>
        ) : (
          <div className="space-y-3">
            {regular.map((u) => (
              <UserRow key={u._id} user={u} isAdmin={false} onPromote={() => handlePromote(u)} />
            ))}
            {regular.length === 0 && (
              <p className="text-muted-foreground font-semibold text-sm">All registered users are admins.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function UserRow({
  user,
  isAdmin,
  onPromote,
}: {
  user: UserDoc;
  isAdmin: boolean;
  onPromote?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-2xl bg-muted flex items-center justify-center shrink-0">
          <User size={16} className="text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <p className="font-black text-[12px] uppercase tracking-tight text-foreground truncate">
            {user.name ?? "Anonymous"}
          </p>
          {user.email && (
            <p className="text-muted-foreground text-[10px] font-semibold truncate">{user.email}</p>
          )}
          <div className="flex items-center gap-1 text-muted-foreground text-[9px] font-bold mt-0.5">
            <Clock size={10} />
            Joined {new Date(user._creationTime).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {isAdmin ? (
          <span className="bg-primary/10 text-primary text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck size={10} /> Admin
          </span>
        ) : (
          <button
            onClick={onPromote}
            className="text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary border border-border hover:border-primary px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            Make Admin
          </button>
        )}
      </div>
    </div>
  );
}
