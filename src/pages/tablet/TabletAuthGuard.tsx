import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function TabletAuthGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) { setAuthed(true); }
      else { navigate("/tablet/login"); }
      setChecking(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/tablet/login");
      else setAuthed(true);
      setChecking(false);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  if (checking) return <div className="min-h-screen flex items-center justify-center bg-muted"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  if (!authed) return null;
  return <>{children}</>;
}