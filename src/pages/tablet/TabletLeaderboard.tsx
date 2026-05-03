import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Medal, Award } from "lucide-react";
import TabletLayout from "./TabletLayout";

export default function TabletLeaderboard() {
  const [leaders, setLeaders] = useState<{ user_id: string; total: number; name: string }[]>([]);

  useEffect(() => {
    (async () => {
      const { data: points } = await supabase.from("engagement_points").select("user_id, points");
      const { data: profiles } = await supabase.from("profiles").select("user_id, display_name");
      if (!points || !profiles) return;
      const nameMap: Record<string, string> = {};
      profiles.forEach(p => { nameMap[p.user_id] = p.display_name || "Unknown"; });
      const totals: Record<string, number> = {};
      points.forEach(p => { totals[p.user_id] = (totals[p.user_id] || 0) + p.points; });
      const sorted = Object.entries(totals).map(([uid, total]) => ({ user_id: uid, total, name: nameMap[uid] || "Unknown" })).sort((a, b) => b.total - a.total);
      setLeaders(sorted);
    })();
  }, []);

  const getRankIcon = (i: number) => {
    if (i === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (i === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (i === 2) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">{i + 1}</span>;
  };

  return (
    <TabletLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-display font-black mb-6">🏆 Leaderboard</h1>
        <p className="text-muted-foreground mb-6 text-sm">Top engaging participants in the ministry</p>
        <div className="bg-background rounded-xl border border-border overflow-hidden">
          {leaders.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No engagement data yet. Start chatting and participating!</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {leaders.slice(0, 50).map((l, i) => (
                <div key={l.user_id} className={`flex items-center gap-4 px-5 py-3 ${i < 3 ? "bg-accent/5" : ""}`}>
                  {getRankIcon(i)}
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">{l.name[0]?.toUpperCase()}</div>
                  <div className="flex-1 font-medium text-sm">{l.name}</div>
                  <div className="font-bold text-primary">{l.total} pts</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </TabletLayout>
  );
}