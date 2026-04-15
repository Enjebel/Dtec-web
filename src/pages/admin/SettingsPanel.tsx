import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

const SETTINGS_KEYS = [
  { key: "phone", label: "Phone / WhatsApp", placeholder: "+237 677 567 624" },
  { key: "email", label: "Contact Email", placeholder: "daronsdenis7@gmail.com" },
  { key: "address", label: "Office Address", placeholder: "Douala, Cameroon" },
  { key: "hours", label: "Office Hours", placeholder: "Mon - Fri, 08:00 - 18:00" },
  { key: "heroTitle", label: "Hero Tagline", placeholder: "We build the future with Quality" },
  { key: "stat1", label: "Stat 1 (e.g. 98%)", placeholder: "98%" },
  { key: "stat2", label: "Stat 2 (e.g. 500+)", placeholder: "500+" },
];

export default function SettingsPanel() {
  const setSetting = useMutation(api.settings.set);
  const allSettings = useQuery(api.settings.getAll);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const getCurrentValue = (key: string) => {
    if (values[key] !== undefined) return values[key];
    return allSettings?.find((s) => s.key === key)?.value ?? "";
  };

  const handleSave = async (key: string) => {
    setSaving(key);
    try {
      await setSetting({ key, value: getCurrentValue(key) });
      toast.success("Setting saved!");
    } catch {
      toast.error("Failed to save.");
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black uppercase italic text-foreground">Settings</h2>
        <p className="text-muted-foreground font-semibold text-sm">
          Update site-wide content without touching the code.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-border shadow-sm space-y-6">
        <h3 className="font-black uppercase italic text-foreground text-sm border-b border-border pb-4">
          Site Content
        </h3>
        {SETTINGS_KEYS.map((setting) => (
          <div key={setting.key}>
            <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
              {setting.label}
            </label>
            <div className="flex gap-3">
              <input
                value={getCurrentValue(setting.key)}
                onChange={(e) => setValues((prev) => ({ ...prev, [setting.key]: e.target.value }))}
                placeholder={setting.placeholder}
                className="flex-1 p-4 bg-background border border-border rounded-2xl font-semibold text-sm outline-none focus:border-primary transition-colors"
              />
              <button
                onClick={() => handleSave(setting.key)}
                disabled={saving === setting.key}
                className="px-5 py-4 bg-primary text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-lg hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
              >
                {saving === setting.key ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Save
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
        <h3 className="font-black uppercase italic text-foreground text-sm border-b border-border pb-4 mb-6">
          Admin Notes
        </h3>
        <div className="space-y-3 text-[11px] font-semibold text-muted-foreground">
          <p className="flex gap-2">
            <span className="text-primary font-black">→</span>
            Changes to Sectors are instantly reflected on the live website.
          </p>
          <p className="flex gap-2">
            <span className="text-primary font-black">→</span>
            Messages from the contact form are stored securely in the database.
          </p>
          <p className="flex gap-2">
            <span className="text-primary font-black">→</span>
            To grant admin access to another user, they must sign in first, then you can update their role.
          </p>
        </div>
      </div>
    </div>
  );
}
