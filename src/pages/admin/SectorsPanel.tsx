import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";
import { ConvexError } from "convex/values";
import type { Doc } from "@/convex/_generated/dataModel.d.ts";

type Sector = Doc<"sectors">;
type SectionData = { label: string; items: string[] };

// Helper to create a blank sector that satisfies the upsert requirements
const createBlankSector = () => ({
  key: "",
  title: "",
  emoji: "📦",
  imageUrl: "",
  tag: "",
  desc: "",
  keywords: "",
  order: 99,
  sections: [] as SectionData[],
});

export default function SectorsPanel() {
  const sectors = useQuery(api.sectors.list);
  const upsertSector = useMutation(api.sectors.upsert);
  const removeSector = useMutation(api.sectors.remove);
  
  // State for the modal
  const [editing, setEditing] = useState<ReturnType<typeof createBlankSector> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setIsNew(true);
    setEditing(createBlankSector());
  };

  const openEdit = (s: Sector) => {
    setIsNew(false);
    setEditing({
      key: s.key,
      title: s.title,
      emoji: s.emoji ?? "",
      imageUrl: s.imageUrl ?? "",
      tag: s.tag,
      desc: s.desc,
      keywords: s.keywords ?? "",
      order: s.order,
      sections: s.sections ?? [],
    });
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.key || !editing.title) {
      toast.error("Key and Title are required.");
      return;
    }
    setSaving(true);
    try {
      await upsertSector(editing);
      toast.success("Sector saved!");
      setEditing(null);
    } catch (err) {
      if (err instanceof ConvexError) {
        const d = err.data as { message: string };
        toast.error(d.message);
      } else {
        toast.error("Failed to save sector.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm("Delete this sector? This cannot be undone.")) return;
    try {
      await removeSector({ key });
      toast.success("Sector deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  const updateSection = (idx: number, field: keyof SectionData, value: string | string[]) => {
    if (!editing) return;
    const sections = [...editing.sections];
    sections[idx] = { ...sections[idx], [field]: value } as SectionData;
    setEditing({ ...editing, sections });
  };

  const addSection = () => {
    if (!editing) return;
    setEditing({ ...editing, sections: [...editing.sections, { label: "", items: [] }] });
  };

  const removeSection = (idx: number) => {
    if (!editing) return;
    const sections = editing.sections.filter((_, i) => i !== idx);
    setEditing({ ...editing, sections });
  };

  if (sectors === undefined) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={`skeleton-${i}`} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase italic text-foreground">Sectors</h2>
          <p className="text-muted-foreground font-semibold text-sm">Manage business sectors shown on the site.</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-3 bg-primary text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-lg hover:bg-primary/90 transition-all cursor-pointer"
        >
          <Plus size={16} /> Add Sector
        </button>
      </div>

      <div className="space-y-3">
        {sectors.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed rounded-3xl text-muted-foreground font-bold">
            No sectors found.
          </div>
        ) : (
          sectors.map((s) => (
            <div key={s._id} className="bg-white rounded-3xl p-6 border border-border shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {s.imageUrl ? (
                  <img src={s.imageUrl} className="h-10 w-10 rounded-xl object-cover" alt={s.title} />
                ) : (
                  <span className="text-2xl">{s.emoji ?? "📦"}</span>
                )}
                <div>
                  <p className="font-black text-sm uppercase italic text-foreground">{s.title}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-primary">{s.tag}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(s)} className="p-2.5 bg-muted rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all cursor-pointer">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(s.key)} className="p-2.5 bg-muted rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all cursor-pointer">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[300] flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-8 border-b border-border">
              <h3 className="text-xl font-black uppercase italic text-foreground">
                {isNew ? "New Sector" : "Edit Sector"}
              </h3>
              <button onClick={() => setEditing(null)} className="p-2 rounded-xl hover:bg-muted cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Key (academy)" value={editing.key} disabled={!isNew} onChange={(v) => setEditing({ ...editing, key: v })} />
                <Field label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Tag" value={editing.tag} onChange={(v) => setEditing({ ...editing, tag: v })} />
                <Field label="Emoji" value={editing.emoji} onChange={(v) => setEditing({ ...editing, emoji: v })} />
              </div>
              <Field label="Image URL" value={editing.imageUrl} onChange={(v) => setEditing({ ...editing, imageUrl: v })} />
              <TextArea label="Description" value={editing.desc} onChange={(v) => setEditing({ ...editing, desc: v })} />
              <Field label="Order" value={String(editing.order)} onChange={(v) => setEditing({ ...editing, order: parseInt(v) || 0 })} />

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Sections</label>
                  <button onClick={addSection} className="text-[10px] font-black uppercase text-primary flex items-center gap-1 cursor-pointer">
                    <Plus size={12} /> Add Section
                  </button>
                </div>
                <div className="space-y-4">
                  {editing.sections.map((section, idx) => (
                    <SectionEditor
                      key={`section-${idx}`}
                      section={section}
                      onUpdate={(field, value) => updateSection(idx, field, value)}
                      onRemove={() => removeSection(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-border flex gap-3">
              <button onClick={() => setEditing(null)} className="flex-1 py-4 bg-muted text-foreground font-black rounded-2xl uppercase tracking-widest text-[10px] cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-4 bg-primary text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-lg disabled:opacity-60">
                {saving ? "Saving..." : "Save Sector"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, disabled }: { label: string; value: string; onChange: (v: string) => void; disabled?: boolean }) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full p-3.5 bg-background border border-border rounded-2xl font-semibold text-sm outline-none focus:border-primary transition-colors disabled:opacity-50"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full p-3.5 bg-background border border-border rounded-2xl font-semibold text-sm outline-none focus:border-primary transition-colors resize-none"
      />
    </div>
  );
}

function SectionEditor({ section, onUpdate, onRemove }: {
  section: SectionData;
  onUpdate: (field: keyof SectionData, value: string | string[]) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(true);
  const itemsText = section.items.join("\n");

  return (
    <div className="bg-background rounded-2xl border border-border overflow-hidden">
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <span className="font-black text-[11px] uppercase tracking-tight text-foreground">{section.label || "Untitled Section"}</span>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-1.5 hover:bg-destructive/10 rounded-lg text-muted-foreground hover:text-destructive cursor-pointer">
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      {open && (
        <div className="p-4 pt-0 space-y-3">
          <Field label="Section Label" value={section.label} onChange={(v) => onUpdate("label", v)} />
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">Items (one per line)</label>
            <textarea
              value={itemsText}
              onChange={(e) => onUpdate("items", e.target.value.split("\n").filter((l) => l.trim()))}
              rows={4}
              className="w-full p-3.5 bg-white border border-border rounded-2xl font-semibold text-sm outline-none focus:border-primary transition-colors resize-none"
              placeholder="Item 1&#10;Item 2"
            />
          </div>
        </div>
      )}
    </div>
  );
}