import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/admin");
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Account created. Check your email to confirm.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl">
        <h1 className="font-display font-bold text-3xl mb-2 text-foreground">Admin Access</h1>
        <p className="text-sm text-muted-foreground mb-6">Sign in to view registration submissions.</p>
        <label className="block mb-4">
          <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1.5 block">Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-background text-foreground border border-border focus:ring-2 focus:ring-primary outline-none" />
        </label>
        <label className="block mb-6">
          <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1.5 block">Password</span>
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-background text-foreground border border-border focus:ring-2 focus:ring-primary outline-none" />
        </label>
        <button disabled={loading} className="w-full bg-gradient-flame text-primary-foreground py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-[1.02] transition-transform disabled:opacity-60 inline-flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {mode === "signin" ? "Sign In" : "Create Account"}
        </button>
        <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full mt-4 text-sm text-primary font-semibold underline">
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
        <p className="text-xs text-muted-foreground mt-6 text-center">
          After creating your account, an admin role must be assigned to access the dashboard.
        </p>
      </form>
    </main>
  );
}