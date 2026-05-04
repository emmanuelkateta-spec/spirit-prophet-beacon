import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bell, X } from "lucide-react";

export default function TabNotificationBar({ tabName }: { tabName: string }) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("tab_notifications")
        .select("*")
        .eq("tab_name", tabName)
        .order("created_at", { ascending: false })
        .limit(5);
      setNotifications(data || []);
    };
    load();

    const channel = supabase
      .channel(`notif-${tabName}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "tab_notifications", filter: `tab_name=eq.${tabName}` }, (payload) => {
        setNotifications(prev => [payload.new as any, ...prev].slice(0, 5));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [tabName]);

  const visible = notifications.filter(n => !dismissed.has(n.id));
  if (visible.length === 0) return null;

  return (
    <div className="space-y-2 mb-4">
      {visible.map(n => (
        <div key={n.id} className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-3 flex items-start gap-3">
          <Bell className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm">{n.title}</div>
            <div className="text-xs text-muted-foreground">{n.message}</div>
          </div>
          <button onClick={() => setDismissed(prev => new Set(prev).add(n.id))} className="text-muted-foreground hover:text-foreground">
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}