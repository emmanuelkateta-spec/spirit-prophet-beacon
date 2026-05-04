import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";

export default function TabChatGroups({ tabName }: { tabName: string }) {
  const [groups, setGroups] = useState<any[]>([]);
  const [activeGroup, setActiveGroup] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
      const { data } = await supabase.from("tab_chat_groups").select("*").eq("tab_name", tabName);
      setGroups(data || []);
    };
    load();
  }, [tabName]);

  const openGroup = async (group: any) => {
    setActiveGroup(group);
    if (!group.conversation_id) return;
    const { data } = await supabase.from("messages").select("*").eq("conversation_id", group.conversation_id).order("created_at", { ascending: true }).limit(100);
    setMessages(data || []);
    // Load profile names
    const senderIds = [...new Set((data || []).map((m: any) => m.sender_id))];
    if (senderIds.length > 0) {
      const { data: profs } = await supabase.from("profiles").select("user_id, display_name").in("user_id", senderIds);
      const map: Record<string, string> = {};
      (profs || []).forEach((p: any) => { map[p.user_id] = p.display_name; });
      setProfiles(prev => ({ ...prev, ...map }));
    }
  };

  const sendMessage = async () => {
    if (!newMsg.trim() || !activeGroup?.conversation_id || !userId) return;
    const { error } = await supabase.from("messages").insert({ conversation_id: activeGroup.conversation_id, sender_id: userId, content: newMsg.trim() });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    setMessages(prev => [...prev, { id: crypto.randomUUID(), sender_id: userId, content: newMsg.trim(), created_at: new Date().toISOString() }]);
    setNewMsg("");
  };

  if (groups.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
        <MessageCircle className="w-4 h-4" /> Chat Groups
      </h3>
      {!activeGroup ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {groups.map(g => (
            <button key={g.id} onClick={() => openGroup(g)} className="bg-background rounded-xl border p-4 text-left hover:shadow-md transition-all">
              <div className="font-bold text-sm">{g.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{g.max_members > 0 ? `${g.max_members} max members` : "Open group"}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-background rounded-xl border">
          <div className="p-3 border-b flex items-center justify-between">
            <div className="font-bold text-sm">{activeGroup.name}</div>
            <Button variant="ghost" size="sm" onClick={() => setActiveGroup(null)}>← Back</Button>
          </div>
          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map(m => (
              <div key={m.id} className={`flex flex-col ${m.sender_id === userId ? "items-end" : "items-start"}`}>
                <span className="text-[10px] text-muted-foreground">{profiles[m.sender_id] || "Member"}</span>
                <div className={`px-3 py-2 rounded-xl text-sm max-w-[80%] ${m.sender_id === userId ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {messages.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No messages yet</p>}
          </div>
          <div className="p-3 border-t flex gap-2">
            <Input placeholder="Type a message..." value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} />
            <Button size="sm" onClick={sendMessage}><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}