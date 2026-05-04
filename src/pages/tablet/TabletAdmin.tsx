import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield, UserPlus, Users, MessageCircle, Plus, Trash2, Eye } from "lucide-react";
import TabletLayout from "./TabletLayout";

const TAB_NAMES = [
  "SFM Chats", "SFM Events", "SFM Partners", "SFM Live Programs",
  "SFM Management", "SFM Protocols", "SFM Ushers", "SFM Media",
  "SFM Family", "12 for 12", "Leaderboard", "Enquiries",
];

export default function TabletAdmin() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [chatGroups, setChatGroups] = useState<any[]>([]);
  const [groupMembers, setGroupMembers] = useState<Record<string, any[]>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Forms
  const [addAdminEmail, setAddAdminEmail] = useState("");
  const [assignModuleUser, setAssignModuleUser] = useState("");
  const [assignModuleName, setAssignModuleName] = useState("");
  const [newGroupTab, setNewGroupTab] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupMax, setNewGroupMax] = useState("0");
  const [addMemberGroupId, setAddMemberGroupId] = useState("");
  const [addMemberUserId, setAddMemberUserId] = useState("");
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    if (!role) { setIsAdmin(false); setLoading(false); return; }
    setIsAdmin(true);

    const [p, r, m, g] = await Promise.all([
      supabase.from("profiles").select("*"),
      supabase.from("user_roles").select("*"),
      supabase.from("tablet_modules").select("*"),
      supabase.from("tab_chat_groups").select("*").order("created_at", { ascending: false }),
    ]);
    setProfiles(p.data || []);
    setRoles(r.data || []);
    setModules(m.data || []);
    setChatGroups(g.data || []);
    setLoading(false);
  };

  const addAdmin = async () => {
    const profile = profiles.find(p => p.display_name?.toLowerCase().includes(addAdminEmail.toLowerCase()) || p.phone === addAdminEmail);
    if (!profile) { toast({ title: "User not found", description: "Search by name or phone", variant: "destructive" }); return; }
    const { error } = await supabase.from("user_roles").insert({ user_id: profile.user_id, role: "admin" as any });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Admin added!" }); setAddAdminEmail(""); loadAll(); }
  };

  const removeAdmin = async (userId: string) => {
    await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin" as any);
    toast({ title: "Admin removed" }); loadAll();
  };

  const assignModule = async () => {
    if (!assignModuleUser || !assignModuleName) return;
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("tablet_modules").insert({ user_id: assignModuleUser, module_name: assignModuleName, granted_by: user?.id });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Module assigned!" }); setAssignModuleUser(""); setAssignModuleName(""); loadAll(); }
  };

  const removeModule = async (id: string) => {
    await supabase.from("tablet_modules").delete().eq("id", id);
    toast({ title: "Module removed" }); loadAll();
  };

  const createChatGroup = async () => {
    if (!newGroupTab || !newGroupName) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    // Create a conversation for the group
    const { data: conv } = await supabase.from("conversations").insert({ name: newGroupName, type: "group", created_by: user.id }).select().single();
    const maxM = newGroupTab === "12 for 12" ? 12 : parseInt(newGroupMax) || 0;
    const { error } = await supabase.from("tab_chat_groups").insert({
      tab_name: newGroupTab, name: newGroupName, max_members: maxM,
      created_by: user.id, conversation_id: conv?.id
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Chat group created!" }); setNewGroupName(""); setNewGroupTab(""); setNewGroupMax("0"); loadAll(); }
  };

  const addMemberToGroup = async () => {
    if (!addMemberGroupId || !addMemberUserId) return;
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("tab_chat_group_members").insert({
      group_id: addMemberGroupId, user_id: addMemberUserId, added_by: user?.id
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Member added!" }); setAddMemberUserId(""); loadGroupMembers(addMemberGroupId); loadAll(); }
  };

  const removeMemberFromGroup = async (memberId: string, groupId: string) => {
    await supabase.from("tab_chat_group_members").delete().eq("id", memberId);
    toast({ title: "Member removed" }); loadGroupMembers(groupId);
  };

  const loadGroupMembers = async (groupId: string) => {
    const { data } = await supabase.from("tab_chat_group_members").select("*").eq("group_id", groupId);
    setGroupMembers(prev => ({ ...prev, [groupId]: data || [] }));
  };

  const toggleGroup = (groupId: string) => {
    if (expandedGroup === groupId) { setExpandedGroup(null); return; }
    setExpandedGroup(groupId);
    loadGroupMembers(groupId);
  };

  const getProfileName = (userId: string) => {
    const p = profiles.find(pr => pr.user_id === userId);
    return p?.display_name || p?.phone || userId.slice(0, 8);
  };

  if (loading) return <TabletLayout><div className="flex items-center justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div></TabletLayout>;
  if (!isAdmin) return <TabletLayout><div className="text-center py-20 text-muted-foreground"><Shield className="w-16 h-16 mx-auto mb-4 opacity-20" /><p className="font-bold text-lg">Admin Access Required</p><p className="text-sm">You don't have permission to access this panel.</p></div></TabletLayout>;

  return (
    <TabletLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-black">Admin Panel</h1>
            <p className="text-xs text-muted-foreground">Manage members, roles, groups & notifications</p>
          </div>
        </div>

        <Tabs defaultValue="admins">
          <TabsList className="mb-4 flex-wrap h-auto gap-1">
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="modules">Module Access</TabsTrigger>
            <TabsTrigger value="groups">Chat Groups</TabsTrigger>
            <TabsTrigger value="members">All Members</TabsTrigger>
          </TabsList>

          {/* ADMINS TAB */}
          <TabsContent value="admins">
            <div className="bg-background rounded-xl border p-5 mb-4">
              <h3 className="font-bold mb-3 flex items-center gap-2"><UserPlus className="w-4 h-4" /> Add Admin</h3>
              <div className="flex gap-2">
                <Input placeholder="Search by name or phone" value={addAdminEmail} onChange={e => setAddAdminEmail(e.target.value)} />
                <Button onClick={addAdmin}>Add</Button>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Current Admins</h3>
              {roles.filter(r => r.role === "admin").map(r => (
                <div key={r.id} className="bg-background rounded-xl border p-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm">{getProfileName(r.user_id)}</div>
                    <div className="text-xs text-muted-foreground">Admin</div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeAdmin(r.user_id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              ))}
              {roles.filter(r => r.role === "admin").length === 0 && <p className="text-center text-muted-foreground py-4">No admins yet</p>}
            </div>
          </TabsContent>

          {/* MODULES TAB */}
          <TabsContent value="modules">
            <div className="bg-background rounded-xl border p-5 mb-4">
              <h3 className="font-bold mb-3">Assign Module Access</h3>
              <div className="grid sm:grid-cols-3 gap-2">
                <Select value={assignModuleUser} onValueChange={setAssignModuleUser}>
                  <SelectTrigger><SelectValue placeholder="Select member" /></SelectTrigger>
                  <SelectContent>
                    {profiles.map(p => (
                      <SelectItem key={p.user_id} value={p.user_id}>{p.display_name || p.phone || "Unknown"}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={assignModuleName} onValueChange={setAssignModuleName}>
                  <SelectTrigger><SelectValue placeholder="Select module" /></SelectTrigger>
                  <SelectContent>
                    {TAB_NAMES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button onClick={assignModule}>Assign</Button>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Assigned Modules</h3>
              {modules.map(m => (
                <div key={m.id} className="bg-background rounded-xl border p-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm">{getProfileName(m.user_id)}</div>
                    <div className="text-xs text-primary">{m.module_name}</div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeModule(m.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              ))}
              {modules.length === 0 && <p className="text-center text-muted-foreground py-4">No modules assigned</p>}
            </div>
          </TabsContent>

          {/* CHAT GROUPS TAB */}
          <TabsContent value="groups">
            <div className="bg-background rounded-xl border p-5 mb-4">
              <h3 className="font-bold mb-3 flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Create Chat Group</h3>
              <div className="grid sm:grid-cols-2 gap-2 mb-2">
                <Select value={newGroupTab} onValueChange={setNewGroupTab}>
                  <SelectTrigger><SelectValue placeholder="Select tab" /></SelectTrigger>
                  <SelectContent>
                    {TAB_NAMES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input placeholder="Group name" value={newGroupName} onChange={e => setNewGroupName(e.target.value)} />
              </div>
              {newGroupTab !== "12 for 12" && (
                <Input placeholder="Max members (0 = unlimited)" type="number" value={newGroupMax} onChange={e => setNewGroupMax(e.target.value)} className="mb-2" />
              )}
              {newGroupTab === "12 for 12" && <p className="text-xs text-muted-foreground mb-2">12 for 12 groups are automatically limited to 12 members.</p>}
              <Button onClick={createChatGroup}><Plus className="w-4 h-4 mr-1" /> Create Group</Button>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">All Chat Groups</h3>
              {chatGroups.map(g => (
                <div key={g.id} className="bg-background rounded-xl border">
                  <button onClick={() => toggleGroup(g.id)} className="w-full p-4 flex items-center justify-between text-left">
                    <div>
                      <div className="font-bold text-sm">{g.name}</div>
                      <div className="text-xs text-primary">{g.tab_name} {g.max_members > 0 ? `• Max ${g.max_members}` : ""}</div>
                    </div>
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                  {expandedGroup === g.id && (
                    <div className="border-t p-4 space-y-3">
                      <div className="flex gap-2">
                        <Select value={addMemberUserId} onValueChange={(v) => { setAddMemberUserId(v); setAddMemberGroupId(g.id); }}>
                          <SelectTrigger><SelectValue placeholder="Add member" /></SelectTrigger>
                          <SelectContent>
                            {profiles.map(p => (
                              <SelectItem key={p.user_id} value={p.user_id}>{p.display_name || "Unknown"}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button size="sm" onClick={() => { setAddMemberGroupId(g.id); addMemberToGroup(); }}>Add</Button>
                      </div>
                      <div className="space-y-1">
                        {(groupMembers[g.id] || []).map(m => (
                          <div key={m.id} className="flex items-center justify-between px-3 py-2 bg-muted rounded-lg text-sm">
                            <span>{getProfileName(m.user_id)}</span>
                            <Button variant="ghost" size="sm" onClick={() => removeMemberFromGroup(m.id, g.id)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                          </div>
                        ))}
                        {(groupMembers[g.id] || []).length === 0 && <p className="text-xs text-muted-foreground text-center py-2">No members yet</p>}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {chatGroups.length === 0 && <p className="text-center text-muted-foreground py-4">No chat groups created</p>}
            </div>
          </TabsContent>

          {/* ALL MEMBERS TAB */}
          <TabsContent value="members">
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Registered Members ({profiles.length})</h3>
              {profiles.map(p => {
                const userModules = modules.filter(m => m.user_id === p.user_id);
                const userRoles = roles.filter(r => r.user_id === p.user_id);
                return (
                  <div key={p.id} className="bg-background rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm">{p.display_name || "Unknown"}</div>
                        <div className="text-xs text-muted-foreground">{p.phone || "No phone"}</div>
                      </div>
                      <div className="flex gap-1 flex-wrap justify-end">
                        {userRoles.map(r => (
                          <span key={r.id} className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">{r.role}</span>
                        ))}
                        {userModules.map(m => (
                          <span key={m.id} className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">{m.module_name}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TabletLayout>
  );
}