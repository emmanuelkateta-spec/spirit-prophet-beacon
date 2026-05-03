import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Plus, Search, MessageCircle } from "lucide-react";
import TabletLayout from "./TabletLayout";

export default function TabletChats() {
  const [user, setUser] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [profiles, setProfiles] = useState<Record<string, any>>({});
  const [allProfiles, setAllProfiles] = useState<any[]>([]);
  const [showNewChat, setShowNewChat] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data: { user: u } } = await supabase.auth.getUser();
      setUser(u);
      if (!u) return;
      // Load conversations
      const { data: members } = await supabase.from("conversation_members").select("conversation_id").eq("user_id", u.id);
      if (members?.length) {
        const convIds = members.map(m => m.conversation_id);
        const { data: convs } = await supabase.from("conversations").select("*").in("id", convIds).order("created_at", { ascending: false });
        setConversations(convs || []);
      }
      // Load all profiles for lookups
      const { data: profs } = await supabase.from("profiles").select("*");
      if (profs) {
        const map: Record<string, any> = {};
        profs.forEach(p => { map[p.user_id] = p; });
        setProfiles(map);
        setAllProfiles(profs);
      }
    })();
  }, []);

  useEffect(() => {
    if (!activeConv) return;
    const loadMessages = async () => {
      const { data } = await supabase.from("messages").select("*").eq("conversation_id", activeConv).order("created_at");
      setMessages(data || []);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    };
    loadMessages();
    const channel = supabase.channel(`msgs-${activeConv}`).on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${activeConv}` }, (payload) => {
      setMessages(prev => [...prev, payload.new as any]);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [activeConv]);

  const sendMessage = async () => {
    if (!newMsg.trim() || !activeConv || !user) return;
    await supabase.from("messages").insert({ conversation_id: activeConv, sender_id: user.id, content: newMsg.trim() });
    setNewMsg("");
  };

  const startDM = async (targetUserId: string) => {
    if (!user) return;
    const { data: conv, error } = await supabase.from("conversations").insert({ type: "direct", name: null, created_by: user.id }).select().single();
    if (error || !conv) { toast({ title: "Error creating chat", variant: "destructive" }); return; }
    await supabase.from("conversation_members").insert([
      { conversation_id: conv.id, user_id: user.id },
      { conversation_id: conv.id, user_id: targetUserId },
    ]);
    setConversations(prev => [conv, ...prev]);
    setActiveConv(conv.id);
    setShowNewChat(false);
  };

  const filteredProfiles = allProfiles.filter(p => p.user_id !== user?.id && p.display_name?.toLowerCase().includes(searchUser.toLowerCase()));

  return (
    <TabletLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-display font-black mb-4">SFM Chats</h1>
        <div className="bg-background rounded-xl border border-border overflow-hidden flex" style={{ height: "calc(100vh - 200px)" }}>
          {/* Conversation list */}
          <div className="w-72 border-r border-border flex flex-col shrink-0">
            <div className="p-3 border-b border-border flex items-center justify-between">
              <span className="font-semibold text-sm">Messages</span>
              <Button size="sm" variant="ghost" onClick={() => setShowNewChat(true)}><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map(c => (
                <button key={c.id} onClick={() => setActiveConv(c.id)} className={`w-full text-left px-4 py-3 border-b border-border/50 hover:bg-muted transition-colors ${activeConv === c.id ? "bg-primary/10" : ""}`}>
                  <div className="font-medium text-sm">{c.name || "Direct Message"}</div>
                  <div className="text-xs text-muted-foreground">{c.type}</div>
                </button>
              ))}
              {conversations.length === 0 && <div className="p-4 text-center text-sm text-muted-foreground">No conversations yet</div>}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            {activeConv ? (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map(m => (
                    <div key={m.id} className={`flex ${m.sender_id === user?.id ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${m.sender_id === user?.id ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <div className="text-[10px] font-bold mb-0.5 opacity-70">{profiles[m.sender_id]?.display_name || "Unknown"}</div>
                        <div className="text-sm">{m.content}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={endRef} />
                </div>
                <div className="p-3 border-t border-border flex gap-2">
                  <Input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Type a message..." onKeyDown={e => e.key === "Enter" && sendMessage()} className="flex-1" />
                  <Button onClick={sendMessage} size="icon" className="bg-primary"><Send className="w-4 h-4" /></Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>Select a conversation or start a new one</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* New chat modal */}
        {showNewChat && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNewChat(false)}>
            <div className="bg-background rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <h3 className="font-bold text-lg mb-4">Start a New Chat</h3>
              <Input value={searchUser} onChange={e => setSearchUser(e.target.value)} placeholder="Search members..." className="mb-4" />
              <div className="max-h-60 overflow-y-auto space-y-1">
                {filteredProfiles.map(p => (
                  <button key={p.id} onClick={() => startDM(p.user_id)} className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">{p.display_name?.[0]?.toUpperCase() || "?"}</div>
                    <span className="text-sm font-medium">{p.display_name}</span>
                  </button>
                ))}
                {filteredProfiles.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No members found</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </TabletLayout>
  );
}