import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, Calendar, Clock, Plus } from "lucide-react";
import TabletLayout from "./TabletLayout";

export default function TabletManagement() {
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [minutes, setMinutes] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    setIsAdmin(!!role);
    const [d, m, mt] = await Promise.all([
      supabase.from("management_discussions").select("*").order("created_at", { ascending: false }),
      supabase.from("management_minutes").select("*").order("meeting_date", { ascending: false }),
      supabase.from("management_meetings").select("*").order("meeting_date", { ascending: true }),
    ]);
    setDiscussions(d.data || []);
    setMinutes(m.data || []);
    setMeetings(mt.data || []);
  };

  const handleCreate = async (type: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
      if (type === "discussion") {
        await supabase.from("management_discussions").insert({ title: form.title, content: form.content, created_by: user.id });
      } else if (type === "meeting") {
        await supabase.from("management_meetings").insert({ title: form.title, description: form.description, meeting_date: form.meeting_date, location: form.location, agenda: form.agenda, created_by: user.id });
      }
      toast({ title: "Created successfully!" });
      setShowForm(null);
      setForm({});
      loadData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <TabletLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-black">SFM Management</h1>
        </div>
        <Tabs defaultValue="discussions">
          <TabsList className="mb-4">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="minutes">Minutes</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="schedule">Timetable</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions">
            {isAdmin && <Button size="sm" onClick={() => setShowForm("discussion")} className="mb-4"><Plus className="w-4 h-4 mr-1" /> New Discussion</Button>}
            {showForm === "discussion" && (
              <div className="bg-background rounded-xl border p-4 mb-4 space-y-3">
                <Input placeholder="Title" value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} />
                <Textarea placeholder="Content" value={form.content || ""} onChange={e => setForm({ ...form, content: e.target.value })} />
                <div className="flex gap-2"><Button onClick={() => handleCreate("discussion")}>Post</Button><Button variant="ghost" onClick={() => setShowForm(null)}>Cancel</Button></div>
              </div>
            )}
            <div className="space-y-3">
              {discussions.map(d => (
                <div key={d.id} className="bg-background rounded-xl border p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${d.status === 'open' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{d.status}</span>
                  </div>
                  <h3 className="font-bold">{d.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{d.content}</p>
                  <div className="text-xs text-muted-foreground mt-2">{new Date(d.created_at).toLocaleDateString()}</div>
                </div>
              ))}
              {discussions.length === 0 && <p className="text-center text-muted-foreground py-8">No discussions yet</p>}
            </div>
          </TabsContent>

          <TabsContent value="minutes">
            <div className="space-y-3">
              {minutes.map(m => (
                <div key={m.id} className="bg-background rounded-xl border p-5">
                  <div className="flex items-center gap-2 mb-1"><FileText className="w-4 h-4 text-primary" /><span className="text-xs text-muted-foreground">{new Date(m.meeting_date).toLocaleDateString()}</span></div>
                  <h3 className="font-bold">{m.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{m.content}</p>
                </div>
              ))}
              {minutes.length === 0 && <p className="text-center text-muted-foreground py-8">No minutes recorded</p>}
            </div>
          </TabsContent>

          <TabsContent value="meetings">
            {isAdmin && <Button size="sm" onClick={() => setShowForm("meeting")} className="mb-4"><Plus className="w-4 h-4 mr-1" /> Schedule Meeting</Button>}
            {showForm === "meeting" && (
              <div className="bg-background rounded-xl border p-4 mb-4 space-y-3">
                <Input placeholder="Title" value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} />
                <Textarea placeholder="Description" value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} />
                <Input type="datetime-local" value={form.meeting_date || ""} onChange={e => setForm({ ...form, meeting_date: e.target.value })} />
                <Input placeholder="Location" value={form.location || ""} onChange={e => setForm({ ...form, location: e.target.value })} />
                <Textarea placeholder="Agenda" value={form.agenda || ""} onChange={e => setForm({ ...form, agenda: e.target.value })} />
                <div className="flex gap-2"><Button onClick={() => handleCreate("meeting")}>Schedule</Button><Button variant="ghost" onClick={() => setShowForm(null)}>Cancel</Button></div>
              </div>
            )}
            <div className="space-y-3">
              {meetings.map(m => (
                <div key={m.id} className="bg-background rounded-xl border p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${m.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : m.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{m.status}</span>
                  </div>
                  <h3 className="font-bold">{m.title}</h3>
                  {m.description && <p className="text-sm text-muted-foreground mt-1">{m.description}</p>}
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(m.meeting_date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(m.meeting_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {m.location && <span>📍 {m.location}</span>}
                  </div>
                  {m.agenda && <div className="mt-3 p-3 bg-muted rounded-lg text-sm"><strong>Agenda:</strong><br />{m.agenda}</div>}
                </div>
              ))}
              {meetings.length === 0 && <p className="text-center text-muted-foreground py-8">No meetings scheduled</p>}
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="bg-background rounded-xl border p-8 text-center text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">Timetable</p>
              <p className="text-sm mt-1">Management timetable and schedule overview will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TabletLayout>
  );
}