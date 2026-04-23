import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, Users, CalendarDays, Flame, HeartHandshake } from "lucide-react";

type Popup = {
  id: string;
  icon: typeof Users;
  eyebrow: string;
  title: string;
  text: string;
  ctaLabel: string;
  to: string;
};

const popups: Popup[] = [
  {
    id: "member",
    icon: Users,
    eyebrow: "Belong",
    title: "Become a Member",
    text: "Plant your roots in a Spirit-filled family that prays for you and watches you flourish.",
    ctaLabel: "Join the Family",
    to: "/connect#membership",
  },
  {
    id: "event",
    icon: CalendarDays,
    eyebrow: "Mark Your Calendar",
    title: "Register for an Event",
    text: "Don't miss the next encounter — register today and secure your seat.",
    ctaLabel: "See Events",
    to: "/ministries#events",
  },
  {
    id: "join",
    icon: HeartHandshake,
    eyebrow: "Partner",
    title: "Join Us",
    text: "Stand with the vision as a Ministry Partner and help advance the gospel to the nations.",
    ctaLabel: "Partner Now",
    to: "/connect#partner",
  },
  {
    id: "soul",
    icon: Flame,
    eyebrow: "Harvest",
    title: "Win a Soul",
    text: "Step into the call. Join the Harvest Team and be part of reaching the lost.",
    ctaLabel: "Win a Soul",
    to: "/ministries#soul-winning",
  },
];

const FIRST_DELAY = 3 * 60 * 1000; // 3 minutes
const INTERVAL = 3 * 60 * 1000; // 3 minutes between popups

export default function SitePopups() {
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    let timeoutId: number;
    let cancelled = false;

    const showNext = (i: number) => {
      if (cancelled || i >= popups.length) return;
      setIndex(i);
    };

    timeoutId = window.setTimeout(() => showNext(0), FIRST_DELAY);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  function close() {
    const next = index + 1;
    setIndex(-1);
    if (next < popups.length) {
      window.setTimeout(() => setIndex(next), INTERVAL);
    }
  }

  if (index < 0 || index >= popups.length) return null;
  const p = popups[index];
  const Icon = p.icon;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-background rounded-3xl shadow-elegant border border-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="bg-gradient-flame px-8 py-6 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shadow-flame">
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-[0.4em] font-bold opacity-90">{p.eyebrow}</span>
          </div>
        </div>
        <div className="px-8 py-7">
          <h3 className="font-display font-black text-2xl sm:text-3xl mb-3">{p.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">{p.text}</p>
          <div className="flex gap-3">
            <Link
              to={p.to}
              onClick={close}
              className="flex-1 bg-gradient-flame text-primary-foreground text-center px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-flame hover:scale-105 transition-transform"
            >
              {p.ctaLabel}
            </Link>
            <button
              onClick={close}
              className="px-5 py-3 rounded-full text-sm font-semibold uppercase tracking-wider border border-border text-foreground/70 hover:bg-muted transition-colors"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
