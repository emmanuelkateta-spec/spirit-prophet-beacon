import { ReactNode, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Flame, Phone, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo.jpg";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/ministries", label: "Ministries" },
  { to: "/gallery", label: "Gallery & Archives" },
  { to: "/connect", label: "Give & Connect" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground text-xs">
        <div className="container flex items-center justify-between py-2">
          <span className="hidden sm:inline tracking-widest uppercase">Spirit • Truth • Power</span>
          <a href="tel:+260976747922" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Phone className="w-3 h-3" /> Inquiries: +260 976 747 922
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Spirit Filled Ministry logo" className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/40 group-hover:ring-primary transition-all" />
            <div className="leading-tight">
              <div className="font-display font-black text-base sm:text-lg tracking-wide">SPIRIT FILLED</div>
              <div className="text-[10px] sm:text-xs tracking-[0.3em] text-primary font-bold">MINISTRY</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors rounded-md ${
                    isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                  }`
                }
                end={n.to === "/"}
              >
                {n.label}
              </NavLink>
            ))}
            <Link
              to="/connect#give"
              className="ml-3 bg-gradient-flame text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-flame hover:scale-105 transition-transform"
            >
              Give Now
            </Link>
          </nav>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground" aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-background animate-fade-in">
            <div className="container py-4 flex flex-col gap-1">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-md text-sm font-semibold uppercase tracking-wider ${
                      isActive ? "bg-primary/10 text-primary" : "text-foreground/80"
                    }`
                  }
                  end={n.to === "/"}
                >
                  {n.label}
                </NavLink>
              ))}
              <Link
                to="/connect#give"
                onClick={() => setOpen(false)}
                className="mt-2 bg-gradient-flame text-primary-foreground text-center px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider"
              >
                Give Now
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1" key={loc.pathname}>{children}</main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground mt-20">
        <div className="container py-16 grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-display font-black">SPIRIT FILLED</div>
                <div className="text-xs tracking-[0.3em] text-primary">MINISTRY</div>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/70 leading-relaxed">
              A Holy Ghost movement raising sons & daughters of fire under Premier Prophet Epas.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-accent">Explore</h4>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-primary transition-colors">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-accent">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/connect#membership" className="hover:text-primary">Become a Member</Link></li>
              <li><Link to="/connect#partner" className="hover:text-primary">Ministry Partner</Link></li>
              <li><Link to="/ministries#bible-study" className="hover:text-primary">Bible Study</Link></li>
              <li><Link to="/ministries#soul-winning" className="hover:text-primary">Win a Soul</Link></li>
              <li><Link to="/connect#give" className="hover:text-primary">Tithes & Offerings</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-accent">Contact</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>Inquiries: <a href="tel:+260976747922" className="hover:text-primary">+260 976 747 922</a></li>
              <li>Givings (Airtel Money): <span className="text-primary font-bold">0973 516 896</span></li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/share/v/1RdgjVwKms/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/10">
          <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-secondary-foreground/60">
            <span className="flex items-center gap-2"><Flame className="w-3 h-3 text-primary animate-flame-flicker" /> © {new Date().getFullYear()} Spirit Filled Ministry. All rights reserved.</span>
            <span>Headed by Premier Prophet Epas</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
