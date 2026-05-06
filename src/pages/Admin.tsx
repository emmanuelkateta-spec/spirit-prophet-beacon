import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2, LogOut, Download, Users, HandHeart, Flame, BookOpen,
  Shield, UserPlus, MessageCircle, Bell, Trash2, Eye, Plus, ChevronLeft
} from "lucide-react";
import logo from "@/assets/sfm-logo.png";

type Row = Record<string, any>;

const TAB_NAMES = [
  "SFM Chats", "SFM Events", "SFM Partners", "SFM Live Programs",
  "SFM Management", "SFM Protocols", "SFM Ushers", "SFM Media",
  "SFM Family", "12 for 12", "Leaderboard", "Enquiries",
];

const REG_TABS = [
  { key: "memberships", label: "Memberships", icon: Users },
  { key: "partners", label: "Partners", icon: HandHeart },
  { key: "soul_winners", label: "Soul Winners", icon: Flame },
  { key: "bible_study_registrations", label: "Bible Study", icon: BookOpen },
] as const;

function toCSV(rows: Row[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: any) => {
    if (v === null || v === undefined) return "";
    const s = String(v).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  return [headers.join(","), ...rows.map((r) => headers.map((h) => escape(r[h])).join(","))].join("\n");
}

const sidebarSections = [
  { id: "overview", label: "Overview", icon: Shield },
  { id: "admins", label: "Manage Admins", icon: UserPlus },
  { id: "members", label: "Members & Access", icon: Users },
  { id: "groups", label: "Chat Groups", icon: MessageCircle },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "registrations", label: "Registrations", icon: Download },
];

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data
  const [profiles, setProfiles] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [chatGroups, setChatGroups] = useState<any[]>([]);
  const [groupMembers, setGroupMembers] = useState<Record<string, any[]>>({});
  const [notifications, setNotifications] = useState<any[]>([]);
  const [regData, setRegData] = useState<Record<string, Row[]>>({});
  const [regLoading, setRegLoading] = useState(false);

  // Forms
  const [addAdminSearch, setAddAdminSearch] = useState("");
  const [assignModuleUser, setAssignModuleUser] = useState("");
  const [assignModuleName, setAssignModuleName] = useState("");
  const [newGroupTab, setNewGroupTab] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupMax, setNewGroupMax] = useState("0");
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [addMemberGroupId, setAddMemberGroupId] = useState("");
  const [addMemberUserId, setAddMemberUserId] = useState("");
  const [notifTab, setNotifTab] = useState("");
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth");
    });
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }
      setUserEmail(session.user.email ?? null);
      const { data: roleRow } = await supabase
        .from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!roleRow);
      setChecking(false);
    })();
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    loadAll();
  }, [isAdmin]);

  const loadAll = async () => {
    const [p, r, m, g, n] = await Promise.all([
      supabase.from("profiles").select("*"),
      supabase.from("user_roles").select("*"),
      supabase.from("tablet_modules").select("*"),
      supabase.from("tab_chat_groups").select("*").order("created_at", { ascending: false }),
      supabase.from("tab_notifications").select("*").order("created_at", { ascending: false }).limit(30),
    ]);
    setProfiles(p.data || []);
    setRoles(r.data || []);
    setModules(m.data || []);
    setChatGroups(g.data || []);
    setNotifications(n.data || []);

    setRegLoading(true);
    const results: Record<string, Row[]> = {};
    for (const t of REG_TABS) {
      const { data: rows } = await supabase.from(t.key as any).select("*").order("created_at", { ascending: false });
      results[t.key] = (rows as Row[]) || [];
    }
    setRegData(results);
    setRegLoading(false);
  };

  const getProfileName = (userId: string) => {
    const p = profiles.find(pr => pr.user_id === userId);
    return p?.display_name || p?.phone || userId.slice(0, 8);
  };

  // Admin actions
  const addAdmin = async () => {
    const profile = profiles.find(p => p.display_name?.toLowerCase().includes(addAdminSearch.toLowerCase()) || p.phone === addAdminSearch);
    if (!profile) { toast({ title: "User not found", description: "Search by name or phone", variant: "destructive" }); return; }
    const { error } = await supabase.from("user_roles").insert({ user_id: profile.user_id, role: "admin" as any });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Admin added!" }); setAddAdminSearch(""); loadAll(); }
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
    const { data: conv } = await supabase.from("conversations").insert({ name: newGroupName, type: "group", created_by: user.id }).select().single();
    const maxM = newGroupTab === "12 for 12" ? 12 : parseInt(newGroupMax) || 0;
    const { error } = await supabase.from("tab_chat_groups").insert({
      tab_name: newGroupTab, name: newGroupName, max_members: maxM, created_by: user.id, conversation_id: conv?.id
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Chat group created!" }); setNewGroupName(""); setNewGroupTab(""); setNewGroupMax("0"); loadAll(); }
  };

  const addMemberToGroup = async () => {
    if (!addMemberGroupId || !addMemberUserId) return;
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("tab_chat_group_members").insert({ group_id: addMemberGroupId, user_id: addMemberUserId, added_by: user?.id });
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

  const postNotification = async () => {
    if (!notifTab || !notifTitle || !notifMessage) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("tab_notifications").insert({ tab_name: notifTab, title: notifTitle, message: notifMessage, posted_by: user.id });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Notification posted!" }); setNotifTab(""); setNotifTitle(""); setNotifMessage(""); loadAll(); }
  };

  const deleteNotification = async (id: string) => {
    await supabase.from("tab_notifications").delete().eq("id", id);
    toast({ title: "Notification deleted" }); loadAll();
  };

  function downloadCSV(key: string, label: string) {
    const csv = toCSV(regData[key] || []);
    if (!csv) return sonnerToast.info("No rows to export");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${label.replace(/\s+/g, "_").toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/auth");
  }

  if (checking) return <main className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-8 h-8 animate-spin text-primary" /></main>;

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md text-center bg-card border border-border rounded-2xl p-8 shadow-xl">
          <h1 className="font-display font-bold text-2xl mb-3 text-foreground">Access Denied</h1>
          <p className="text-muted-foreground mb-6 text-sm">
            Signed in as <strong>{userEmail}</strong>. This account does not have admin privileges.
          </p>
          <button onClick={signOut} className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider">Sign Out</button>
        </div>
      </main>
    );
  }

  const adminCount = roles.filter(r => r.role === "admin").length;
  const memberCount = profiles.length;
  const groupCount = chatGroups.length;

  return (
    <main className="min-h-screen bg-muted text-foreground flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-secondary text-secondary-foreground transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 p-4 border-b border-secondary-foreground/10">
          <img src={logo} alt="SFM" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="font-bold text-sm">SFM Admin</div>
            <div className="text-[10px] tracking-widest text-primary">CONTROL PANEL</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {sidebarSections.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => { setActiveSection(s.id); setSidebarOpen(false); }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeSection === s.id ? "bg-primary text-primary-foreground" : "text-secondary-foreground/70 hover:bg-secondary-foreground/5"}`}
              >
                <Icon className="w-4 h-4 shrink-0" /> {s.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-secondary-foreground/10 space-y-1">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-secondary-foreground/70 hover:bg-secondary-foreground/5 w-full">
            <ChevronLeft className="w-4 h-4" /> Back to Website
          </button>
          <button onClick={signOut} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-secondary-foreground/70 hover:bg-destructive/20 hover:text-destructive w-full">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2"><Shield className="w-5 h-5" /></button>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{userEmail}</div>
          <div className="text-xs text-primary font-bold">Admin</div>
        </header>

        <div className="flex-1 p-4 sm:p-6 max-w-6xl mx-auto w-full">

          {/* OVERVIEW */}
          {activeSection === "overview" && (
            <div>
              <h1 className="text-2xl font-display font-black mb-6">Dashboard Overview</h1>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-background rounded-xl border p-5 text-center">
                  <div className="text-3xl font-black text-primary">{adminCount}</div>
                  <div className="text-xs text-muted-foreground mt-1">Admins</div>
                </div>
                <div className="bg-background rounded-xl border p-5 text-center">
                  <div className="text-3xl font-black text-primary">{memberCount}</div>
                  <div className="text-xs text-muted-foreground mt-1">Members</div>
                </div>
                <div className="bg-background rounded-xl border p-5 text-center">
                  <div className="text-3xl font-black text-primary">{groupCount}</div>
                  <div className="text-xs text-muted-foreground mt-1">Chat Groups</div>
                </div>
                <div className="bg-background rounded-xl border p-5 text-center">
                  <div className="text-3xl font-black text-primary">{notifications.length}</div>
                  <div className="text-xs text-muted-foreground mt-1">Notifications</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sidebarSections.filter(s => s.id !== "overview").map(s => {
                  const Icon = s.icon;
                  return (
                    <button key={s.id} onClick={() => setActiveSection(s.id)} className="bg-background rounded-xl border p-5 text-left hover:shadow-md transition-all group">
                      <Icon className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                      <div className="font-bold">{s.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">Manage {s.label.toLowerCase()}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ADMINS */}
          {activeSection === "admins" && (
            <div>
              <h1 className="text-2xl font-display font-black mb-6">Manage Admins</h1>
              <div className="bg-background rounded-xl border p-5 mb-6">
                <h3 className="font-bold mb-3 flex items-center gap-2"><UserPlus className="w-4 h-4" /> Add Admin</h3>
                <div className="flex gap-2">
                  <Input placeholder="Search by name or phone" value={addAdminSearch} onChange={e => setAddAdminSearch(e.target.value)} />
                  <Button onClick={addAdmin}>Add</Button>
                </div>
              </div>
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">Current Admins</h3>
              <div className="space-y-2">
                {roles.filter(r => r.role === "admin").map(r => (
                  <div key={r.id} className="bg-background rounded-xl border p-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm">{getProfileName(r.user_id)}</div>
                      <div className="text-xs text-muted-foreground">Admin</div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeAdmin(r.user_id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                ))}
                {adminCount === 0 && <p className="text-center text-muted-foreground py-4">No admins yet</p>}
              </div>
            </div>
          )}

          {/* MEMBERS & ACCESS */}
          {activeSection === "members" && (
            <div>
              <h1 className="text-2xl font-display font-black mb-6">Members & Module Access</h1>
              <div className="bg-background rounded-xl border p-5 mb-6">
                <h3 className="font-bold mb-3">Assign Module Access</h3>
                <div className="grid sm:grid-cols-3 gap-2">
                  <Select value={assignModuleUser} onValueChange={setAssignModuleUser}>
                    <SelectTrigger><SelectValue placeholder="Select member" /></SelectTrigger>
                    <SelectContent>{profiles.map(p => <SelectItem key={p.user_id} value={p.user_id}>{p.display_name || p.phone || "Unknown"}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={assignModuleName} onValueChange={setAssignModuleName}>
                    <SelectTrigger><SelectValue placeholder="Select module" /></SelectTrigger>
                    <SelectContent>{TAB_NAMES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                  <Button onClick={assignModule}>Assign</Button>
                </div>
              </div>
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">Assigned Modules</h3>
              <div className="space-y-2 mb-8">
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
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">All Members ({profiles.length})</h3>
              <div className="space-y-2">
                {profiles.map(p => {
                  const userModules = modules.filter(m => m.user_id === p.user_id);
                  const userRoles = roles.filter(r => r.user_id === p.user_id);
                  return (
                    <div key={p.id} className="bg-background rounded-xl border p-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <div className="font-bold text-sm">{p.display_name || "Unknown"}</div>
                          <div className="text-xs text-muted-foreground">{p.phone || "No phone"}</div>
                        </div>
                        <div className="flex gap-1 flex-wrap justify-end">
                          {userRoles.map(r => <span key={r.id} className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">{r.role}</span>)}
                          {userModules.map(m => <span key={m.id} className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">{m.module_name}</span>)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CHAT GROUPS */}
          {activeSection === "groups" && (
            <div>
              <h1 className="text-2xl font-display font-black mb-6">Chat Groups</h1>
              <div className="bg-background rounded-xl border p-5 mb-6">
                <h3 className="font-bold mb-3 flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Create Chat Group</h3>
                <div className="grid sm:grid-cols-2 gap-2 mb-2">
                  <Select value={newGroupTab} onValueChange={setNewGroupTab}>
                    <SelectTrigger><SelectValue placeholder="Select tab" /></SelectTrigger>
                    <SelectContent>{TAB_NAMES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input placeholder="Group name" value={newGroupName} onChange={e => setNewGroupName(e.target.value)} />
                </div>
                {newGroupTab !== "12 for 12" && (
                  <Input placeholder="Max members (0 = unlimited)" type="number" value={newGroupMax} onChange={e => setNewGroupMax(e.target.value)} className="mb-2" />
                )}
                {newGroupTab === "12 for 12" && <p className="text-xs text-muted-foreground mb-2">12 for 12 groups are automatically limited to 12 members.</p>}
                <Button onClick={createChatGroup}><Plus className="w-4 h-4 mr-1" /> Create Group</Button>
              </div>
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">All Chat Groups</h3>
              <div className="space-y-3">
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
                            <SelectContent>{profiles.map(p => <SelectItem key={p.user_id} value={p.user_id}>{p.display_name || "Unknown"}</SelectItem>)}</SelectContent>
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
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeSection === "notifications" && (
            <div>
              <h1 className="text-2xl font-display font-black mb-6">Notifications</h1>
              <div className="bg-background rounded-xl border p-5 mb-6">
                <h3 className="font-bold mb-3 flex items-center gap-2"><Bell className="w-4 h-4" /> Post Notification</h3>
                <div className="space-y-2">
                  <Select value={notifTab} onValueChange={setNotifTab}>
                    <SelectTrigger><SelectValue placeholder="Select tab" /></SelectTrigger>
                    <SelectContent>{TAB_NAMES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input placeholder="Notification title" value={notifTitle} onChange={e => setNotifTitle(e.target.value)} />
                  <Textarea placeholder="Notification message" value={notifMessage} onChange={e => setNotifMessage(e.target.value)} rows={3} />
                  <Button onClick={postNotification}><Bell className="w-4 h-4 mr-1" /> Post</Button>
                </div>
              </div>
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">Recent Notifications</h3>
              <div className="space-y-2">
                {notifications.map(n => (
                  <div key={n.id} className="bg-background rounded-xl border p-4 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary">{n.tab_name}</span>
                        <span className="text-xs text-muted-foreground">{new Date(n.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="font-bold text-sm">{n.title}</div>
                      <div className="text-xs text-muted-foreground">{n.message}</div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteNotification(n.id)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                  </div>
                ))}
                {notifications.length === 0 && <p className="text-center text-muted-foreground py-4">No notifications</p>}
              </div>
            </div>
          )}

          {/* REGISTRATIONS */}
          {activeSection === "registrations" && (
            <div>
              <h1 className="text-2xl font-display font-black mb-6">Registrations</h1>
              <Tabs defaultValue="memberships">
                <TabsList className="flex flex-wrap h-auto mb-4">
                  {REG_TABS.map(t => {
                    const Icon = t.icon;
                    const count = regData[t.key]?.length ?? 0;
                    return (
                      <TabsTrigger key={t.key} value={t.key} className="flex items-center gap-2">
                        <Icon className="w-4 h-4" /> {t.label}
                        <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-bold">{count}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                {REG_TABS.map(t => (
                  <TabsContent key={t.key} value={t.key}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display font-bold text-xl">{t.label} ({regData[t.key]?.length ?? 0})</h2>
                      <Button onClick={() => downloadCSV(t.key, t.label)} size="sm"><Download className="w-4 h-4 mr-1" /> Export CSV</Button>
                    </div>
                    {regLoading ? (
                      <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                    ) : (regData[t.key]?.length ?? 0) === 0 ? (
                      <div className="py-20 text-center text-muted-foreground border border-dashed border-border rounded-xl">No submissions yet.</div>
                    ) : (
                      <div className="overflow-x-auto border border-border rounded-xl bg-card">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/50">
                            <tr>
                              {Object.keys(regData[t.key][0]).map(h => (
                                <th key={h} className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-muted-foreground whitespace-nowrap">{h.replace(/_/g, " ")}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {regData[t.key].map((row, i) => (
                              <tr key={row.id || i} className="border-t border-border hover:bg-muted/30">
                                {Object.keys(regData[t.key][0]).map(h => (
                                  <td key={h} className="px-4 py-3 align-top max-w-xs">
                                    <div className="truncate" title={String(row[h] ?? "")}>
                                      {h === "created_at" && row[h] ? new Date(row[h]).toLocaleString() : String(row[h] ?? "—")}
                                    </div>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}