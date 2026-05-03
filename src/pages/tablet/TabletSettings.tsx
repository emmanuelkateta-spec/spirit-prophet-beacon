import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TabletLayout from "./TabletLayout";

export default function TabletSettings() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
        setProfile(data);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setLoading(true);
    const { error } = await supabase.from("profiles").update({
      display_name: profile.display_name,
      phone: profile.phone,
      bio: profile.bio,
    }).eq("id", profile.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Profile updated!" });
    setLoading(false);
  };

  if (!profile) return <TabletLayout><div className="p-8 text-center text-muted-foreground">Loading...</div></TabletLayout>;

  return (
    <TabletLayout>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-display font-black mb-6">Settings</h1>
        <div className="bg-background rounded-xl border p-6 space-y-4">
          <div><Label>Display Name</Label><Input value={profile.display_name || ""} onChange={e => setProfile({ ...profile, display_name: e.target.value })} /></div>
          <div><Label>Phone</Label><Input value={profile.phone || ""} onChange={e => setProfile({ ...profile, phone: e.target.value })} /></div>
          <div><Label>Bio</Label><Textarea value={profile.bio || ""} onChange={e => setProfile({ ...profile, bio: e.target.value })} rows={3} /></div>
          <Button onClick={handleSave} disabled={loading} className="w-full">{loading ? "Saving..." : "Save Profile"}</Button>
        </div>
      </div>
    </TabletLayout>
  );
}