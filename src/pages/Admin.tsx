import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, Download, Users, HandHeart, Flame, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type Row = Record<string, any>;

const TABS = [
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

export default function Admin() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, Row[]>>({});
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<string>("memberships");

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth");
    });
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }
      setUserEmail(session.user.email ?? null);
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!roleRow);
      setChecking(false);
    })();
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      setLoading(true);
      const results: Record<string, Row[]> = {};
      for (const t of TABS) {
        const { data: rows, error } = await supabase
          .from(t.key as any)
          .select("*")
          .order("created_at", { ascending: false });
        if (error) toast.error(`${t.label}: ${error.message}`);
        results[t.key] = (rows as Row[]) || [];
      }
      setData(results);
      setLoading(false);
    })();
  }, [isAdmin]);

  function downloadCSV(key: string, label: string) {
    const csv = toCSV(data[key] || []);
    if (!csv) return toast.info("No rows to export");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${label.replace(/\s+/g, "_").toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/auth");
  }

  if (checking) {
    return <main className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-8 h-8 animate-spin text-primary" /></main>;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md text-center bg-card border border-border rounded-2xl p-8 shadow-xl">
          <h1 className="font-display font-bold text-2xl mb-3 text-foreground">Access Denied</h1>
          <p className="text-muted-foreground mb-6 text-sm">
            Signed in as <strong>{userEmail}</strong>. This account does not have admin privileges.
            Ask the site owner to assign you the <code className="px-1 bg-muted rounded">admin</code> role.
          </p>
          <button onClick={signOut} className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider">
            Sign Out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display font-bold text-2xl">Registrations Dashboard</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Signed in as {userEmail}</p>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-muted text-sm font-semibold">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={active} onValueChange={setActive}>
          <TabsList className="flex flex-wrap h-auto">
            {TABS.map((t) => {
              const Icon = t.icon;
              const count = data[t.key]?.length ?? 0;
              return (
                <TabsTrigger key={t.key} value={t.key} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {t.label}
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-bold">{count}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {TABS.map((t) => (
            <TabsContent key={t.key} value={t.key} className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl">{t.label} ({data[t.key]?.length ?? 0})</h2>
                <button onClick={() => downloadCSV(t.key, t.label)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>
              {loading ? (
                <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
              ) : (data[t.key]?.length ?? 0) === 0 ? (
                <div className="py-20 text-center text-muted-foreground border border-dashed border-border rounded-xl">No submissions yet.</div>
              ) : (
                <div className="overflow-x-auto border border-border rounded-xl bg-card">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        {Object.keys(data[t.key][0]).map((h) => (
                          <th key={h} className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-muted-foreground whitespace-nowrap">{h.replace(/_/g, " ")}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data[t.key].map((row, i) => (
                        <tr key={row.id || i} className="border-t border-border hover:bg-muted/30">
                          {Object.keys(data[t.key][0]).map((h) => (
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
      </section>
    </main>
  );
}