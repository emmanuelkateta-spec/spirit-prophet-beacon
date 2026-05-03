import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, Calendar, Users, Video, Shield, BookOpen, UserCheck, Camera, Heart, Trophy, HelpCircle, Bell } from "lucide-react";
import TabletLayout from "./TabletLayout";

const moduleCards = [
  { to: "/tablet/chats", label: "SFM Chats", icon: MessageCircle, color: "bg-blue-500", desc: "Chat with members" },
  { to: "/tablet/events", label: "SFM Events", icon: Calendar, color: "bg-primary", desc: "Upcoming events" },
  { to: "/tablet/partners", label: "SFM Partners", icon: Users, color: "bg-emerald-500", desc: "Partner network" },
  { to: "/tablet/live", label: "SFM Live", icon: Video, color: "bg-purple-500", desc: "Live programs" },
  { to: "/tablet/management", label: "SFM Management", icon: Shield, color: "bg-amber-600", desc: "Board & meetings" },
  { to: "/tablet/protocols", label: "SFM Protocols", icon: BookOpen, color: "bg-cyan-600", desc: "Church protocols" },
  { to: "/tablet/ushers", label: "SFM Ushers", icon: UserCheck, color: "bg-teal-500", desc: "Usher coordination" },
  { to: "/tablet/media", label: "SFM Media", icon: Camera, color: "bg-pink-500", desc: "Media team" },
  { to: "/tablet/family", label: "SFM Family", icon: Heart, color: "bg-rose-500", desc: "Church family" },
  { to: "/tablet/12for12", label: "12 for 12", icon: Users, color: "bg-indigo-500", desc: "Small groups" },
  { to: "/tablet/leaderboard", label: "Leaderboard", icon: Trophy, color: "bg-yellow-500", desc: "Top participants" },
  { to: "/tablet/enquiries", label: "Enquiries", icon: HelpCircle, color: "bg-gray-500", desc: "Ask a question" },
];

export default function TabletDashboard() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
        setProfile(data);
      }
    })();
  }, []);

  return (
    <TabletLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-display font-black">
            Welcome{profile?.display_name ? `, ${profile.display_name}` : ""}! 🔥
          </h1>
          <p className="text-muted-foreground mt-1">Access your ministry modules below</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {moduleCards.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.to}
                to={m.to}
                className="group bg-background rounded-xl border border-border p-4 sm:p-5 hover:shadow-elegant transition-all hover:-translate-y-1"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${m.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="font-bold text-sm">{m.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{m.desc}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </TabletLayout>
  );
}