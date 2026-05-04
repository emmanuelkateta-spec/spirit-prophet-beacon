import { ReactNode, useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, MessageCircle, Calendar, Users, Shield, Video, BookOpen, UserCheck, Camera, Heart, Trophy, HelpCircle, LogOut, Settings, ChevronDown, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/sfm-logo.png";

const publicModules = [
  { to: "/tablet", label: "Dashboard", icon: Home },
  { to: "/tablet/chats", label: "SFM Chats", icon: MessageCircle },
  { to: "/tablet/events", label: "SFM Events", icon: Calendar },
  { to: "/tablet/partners", label: "SFM Partners", icon: Users },
  { to: "/tablet/live", label: "SFM Live Programs", icon: Video },
  { to: "/tablet/management", label: "SFM Management", icon: Shield },
  { to: "/tablet/protocols", label: "SFM Protocols", icon: BookOpen },
  { to: "/tablet/ushers", label: "SFM Ushers", icon: UserCheck },
  { to: "/tablet/media", label: "SFM Media", icon: Camera },
  { to: "/tablet/family", label: "SFM Family", icon: Heart },
  { to: "/tablet/12for12", label: "12 for 12", icon: Users },
  { to: "/tablet/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/tablet/enquiries", label: "Enquiries", icon: HelpCircle },
];

const adminModule = { to: "/tablet/admin", label: "Admin Panel", icon: Lock };

export default function TabletLayout({ children, userModules }: { children: ReactNode; userModules?: string[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
    })();
  }, []);

  const modules = isAdmin ? [...publicModules, adminModule] : publicModules;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/tablet/login");
    toast({ title: "Logged out successfully" });
  };

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-secondary text-secondary-foreground transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 p-4 border-b border-secondary-foreground/10">
          <img src={logo} alt="SFM" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="font-bold text-sm">SFM TABLET</div>
            <div className="text-[10px] tracking-widest text-primary">MEMBER PORTAL</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-2 space-y-0.5 px-2">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <NavLink
                key={m.to}
                to={m.to}
                end={m.to === "/tablet"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-secondary-foreground/70 hover:bg-secondary-foreground/5 hover:text-secondary-foreground"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {m.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-3 border-t border-secondary-foreground/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-secondary-foreground/70 hover:bg-destructive/20 hover:text-destructive w-full transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2"><Menu className="w-5 h-5" /></button>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Spirit Filled Ministry</div>
          <Link to="/tablet/settings" className="p-2 hover:bg-muted rounded-lg"><Settings className="w-5 h-5 text-muted-foreground" /></Link>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}