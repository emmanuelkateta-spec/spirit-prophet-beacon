import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Bell, MessageCircle, Plus } from "lucide-react";
import TabletLayout from "./TabletLayout";
import TabNotificationBar from "@/components/tablet/TabNotificationBar";
import TabChatGroups from "@/components/tablet/TabChatGroups";

export default function Tablet12for12() {
  const [groups, setGroups] = useState<any[]>([]);
  const [activeGroup, setActiveGroup] = useState<any>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const { toast } = useToast();

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    setIsAdmin(!!role);
    const { data } = await supabase.from("groups_12for12").select("*");
    setGroups(data || []);
  };

  const selectGroup = async (group: any) => {
    setActiveGroup(group);
    const { data } = await supabase.from("group_announcements").select("*").eq("group_id", group.id).order("created_at", { ascending: false });
    setAnnouncements(data || []);
  };

  const postAnnouncement = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !activeGroup) return;
    await supabase.from("group_announcements").insert({ group_id: activeGroup.id, title: form.title, content: form.content, posted_by: user.id });
    toast({ title: "Announcement posted!" });
    setShowForm(false);
    setForm({ title: "", content: "" });
    selectGroup(activeGroup);
  };

  return (
    <TabletLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-display font-black mb-6">12 for 12</h1>
        <p className="text-muted-foreground mb-4 text-sm">Small groups of up to 12 members for focused ministry growth.</p>
        <TabNotificationBar tabName="12 for 12" />

        {!activeGroup ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {groups.map(g => (
              <button key={g.id} onClick={() => selectGroup(g)} className="bg-background rounded-xl border border-border p-5 text-left hover:shadow-elegant transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center"><Users className="w-5 h-5 text-white" /></div>
                  <div className="font-bold">{g.name}</div>
                </div>
                {g.description && <p className="text-sm text-muted-foreground">{g.description}</p>}
              </button>
            ))}
            {groups.length === 0 && <div className="col-span-2 text-center py-12 text-muted-foreground">No 12-for-12 groups yet. Admins can create groups.</div>}
          </div>
        ) : (
          <div>
            <Button variant="ghost" onClick={() => setActiveGroup(null)} className="mb-4">← Back to Groups</Button>
            <div className="bg-background rounded-xl border p-5 mb-4">
              <h2 className="font-bold text-lg">{activeGroup.name}</h2>
              {activeGroup.description && <p className="text-sm text-muted-foreground mt-1">{activeGroup.description}</p>}
            </div>

            <Tabs defaultValue="announcements">
              <TabsList><TabsTrigger value="announcements"><Bell className="w-4 h-4 mr-1" /> Announcements</TabsTrigger><TabsTrigger value="chat"><MessageCircle className="w-4 h-4 mr-1" /> Group Chat</TabsTrigger></TabsList>
              <TabsContent value="announcements">
                {isAdmin && <Button size="sm" onClick={() => setShowForm(true)} className="mb-4"><Plus className="w-4 h-4 mr-1" /> New Announcement</Button>}
                {showForm && (
                  <div className="bg-muted rounded-xl p-4 mb-4 space-y-3">
                    <Input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                    <Textarea placeholder="Content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
                    <div className="flex gap-2"><Button onClick={postAnnouncement}>Post</Button><Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button></div>
                  </div>
                )}
                <div className="space-y-3">
                  {announcements.map(a => (
                    <div key={a.id} className="bg-background rounded-xl border p-5">
                      <h3 className="font-bold">{a.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{a.content}</p>
                      <div className="text-xs text-muted-foreground mt-2">{new Date(a.created_at).toLocaleDateString()}</div>
                    </div>
                  ))}
                  {announcements.length === 0 && <p className="text-center text-muted-foreground py-8">No announcements</p>}
                </div>
              </TabsContent>
              <TabsContent value="chat">
                <div className="bg-background rounded-xl border p-8 text-center text-muted-foreground">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Group chat is available through SFM Chats. This group has a linked conversation there.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
        <TabChatGroups tabName="12 for 12" />
      </div>
    </TabletLayout>
  );
}