import { useMemo, useRef, useState } from "react";
import { Sparkles, X, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";

type Slice = {
  label: string;
  short: string;
  color: string; // hex / hsl
  description: string;
  cta?: { label: string; to: string };
};

const SLICES: Slice[] = [
  { label: "SFM Upcoming Overnight", short: "Overnight", color: "#E11D48", description: "Join the next All-Night Holy Ghost service. Register to be added to the prayer list and receive details.", cta: { label: "Register for Overnight", to: "/connect#membership" } },
  { label: "SFM Ministers Awakening Conference", short: "MAC", color: "#F59E0B", description: "The Ministers Awakening Conference — a fire encounter for ministers, leaders & sons of the prophets.", cta: { label: "View Conference", to: "/ministries#mac" } },
  { label: "Next Sunday Service", short: "Sunday", color: "#FBBF24", description: "Join us this coming Sunday for a powerful Holy Ghost encounter under Premier Prophet Epas.", cta: { label: "Plan a Visit", to: "/connect#membership" } },
  { label: "SFM Upcoming Conference", short: "Conference", color: "#10B981", description: "An upcoming Spirit-filled Conference is being prepared. Stay connected for the dates.", cta: { label: "Stay Connected", to: "/connect#membership" } },
  { label: "SFM Outreach", short: "Outreach", color: "#06B6D4", description: "Step out with us in evangelism — soul-winning crusades, prison ministry & street outreach.", cta: { label: "Join Outreach", to: "/ministries#soul-winning" } },
  { label: "SFM Travel", short: "Travel", color: "#3B82F6", description: "Itinerant ministry across nations. Invite Premier Prophet Epas or join an upcoming travel team.", cta: { label: "Book Appointment", to: "/appointment" } },
  { label: "SFM Youth Events", short: "Youth", color: "#6366F1", description: "Fire-filled gatherings for the next generation — worship, deliverance and mentorship.", cta: { label: "Connect with Youth", to: "/ministries" } },
  { label: "SFM Donations", short: "Donate", color: "#8B5CF6", description: "Sow into the work of God — tithes, offerings, seeds and special projects.", cta: { label: "Give Now", to: "/connect#give" } },
  { label: "SFM Build the Church", short: "Build", color: "#A855F7", description: "Partner with us to build the house of God — bricks, roofing, chairs and instruments.", cta: { label: "Donate to Build", to: "/connect#donate" } },
  { label: "SFM 1000 Buildings", short: "1000 Buildings", color: "#D946EF", description: "A prophetic mandate to raise 1,000 houses of worship across the nations. Be part of history.", cta: { label: "Sow a Brick", to: "/connect#donate" } },
  { label: "SFM Show Someone LOVE", short: "Show LOVE", color: "#EC4899", description: "Bless a widow, an orphan or the aged today through the Spirit Filled Charity Foundation.", cta: { label: "Give to Charity", to: "/connect#donate" } },
  { label: "SFM Premier Prophet Epas", short: "Prophet Epas", color: "#EF4444", description: "Book a personal appointment, send a prayer request, or partner with the prophetic office.", cta: { label: "Book Appointment", to: "/appointment" } },
];

export default function SFMSpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<Slice | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const sliceCount = SLICES.length;
  const sliceAngle = 360 / sliceCount;

  const conicGradient = useMemo(() => {
    const stops = SLICES.map((s, i) => {
      const start = i * sliceAngle;
      const end = (i + 1) * sliceAngle;
      return `${s.color} ${start}deg ${end}deg`;
    }).join(", ");
    return `conic-gradient(from -${sliceAngle / 2}deg, ${stops})`;
  }, [sliceAngle]);

  function spin() {
    if (spinning) return;
    setWinner(null);
    const winnerIdx = Math.floor(Math.random() * sliceCount);
    const turns = 6 + Math.floor(Math.random() * 3); // 6-8 full turns
    const targetAngle = 360 - winnerIdx * sliceAngle; // pointer at top (0deg)
    const finalRotation = rotation + turns * 360 + (targetAngle - (rotation % 360));
    setRotation(finalRotation);
    setSpinning(true);
    window.setTimeout(() => {
      setSpinning(false);
      setWinner(SLICES[winnerIdx]);
    }, 5100);
  }

  return (
    <div className="relative bg-secondary text-secondary-foreground rounded-3xl p-8 lg:p-12 shadow-elegant overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, #ef4444, #f59e0b, #fbbf24, #10b981, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #ef4444)",
          filter: "blur(60px)",
        }}
      />
      <div className="relative grid lg:grid-cols-2 gap-10 items-center">
        {/* Left text */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-xs tracking-[0.4em] uppercase text-accent font-bold">SFM Spin Wheel</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl mb-4">
            Spin the <span className="text-gradient-gold">Wheel of Fire</span>
          </h2>
          <p className="text-secondary-foreground/80 leading-relaxed mb-6">
            Discover what the Spirit is doing at SFM. One spin reveals an upcoming event,
            ministry opportunity or way to partner with the vision of Premier Prophet Epas.
          </p>
          <ul className="grid grid-cols-2 gap-2 text-xs text-secondary-foreground/70 mb-6">
            {SLICES.map((s) => (
              <li key={s.label} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                <span className="truncate">{s.short}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={spin}
            disabled={spinning}
            className="bg-gradient-flame text-primary-foreground px-7 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-flame hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            <RotateCw className={`w-4 h-4 ${spinning ? "animate-spin" : ""}`} />
            {spinning ? "Spinning..." : "Spin the Wheel"}
          </button>
        </div>

        {/* Wheel */}
        <div className="relative mx-auto w-[300px] sm:w-[380px] aspect-square">
          {/* Pointer */}
          <div className="absolute left-1/2 -top-2 -translate-x-1/2 z-20">
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-accent drop-shadow-[0_4px_8px_hsl(var(--accent)/0.6)]" />
          </div>
          {/* Outer ring with rainbow glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, #ef4444, #f59e0b, #fbbf24, #10b981, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #ef4444)",
              padding: 6,
              filter: spinning ? "drop-shadow(0 0 24px hsl(var(--accent) / 0.7))" : undefined,
            }}
          >
            <div className="w-full h-full rounded-full bg-secondary" />
          </div>
          {/* Wheel face */}
          <div
            ref={wheelRef}
            className="absolute inset-2 rounded-full transition-transform"
            style={{
              background: conicGradient,
              transform: `rotate(${rotation}deg)`,
              transitionDuration: spinning ? "5s" : "0s",
              transitionTimingFunction: "cubic-bezier(0.17, 0.67, 0.16, 1)",
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.45)",
            }}
          >
            {SLICES.map((s, i) => {
              const angle = i * sliceAngle;
              return (
                <div
                  key={s.label}
                  className="absolute left-1/2 top-1/2 origin-left text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white whitespace-nowrap"
                  style={{
                    transform: `rotate(${angle}deg) translate(8px, -6px)`,
                    textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                  }}
                >
                  {s.short}
                </div>
              );
            })}
          </div>
          {/* Center hub */}
          <button
            onClick={spin}
            disabled={spinning}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 rounded-full bg-gradient-flame text-primary-foreground font-display font-black text-lg shadow-flame border-4 border-secondary hover:scale-105 transition-transform disabled:opacity-70"
            aria-label="Spin"
          >
            SFM
          </button>
        </div>
      </div>

      {/* Result modal */}
      {winner && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setWinner(null)}>
          <div
            className="relative max-w-md w-full bg-background text-foreground rounded-3xl p-8 shadow-elegant border-4"
            style={{ borderColor: winner.color }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setWinner(null)} className="absolute top-3 right-3 p-2 rounded-full hover:bg-muted" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
            <div className="text-xs tracking-[0.3em] uppercase font-bold mb-2" style={{ color: winner.color }}>
              The Spirit revealed
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl mb-3">{winner.label}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{winner.description}</p>
            <div className="flex flex-wrap gap-3">
              {winner.cta && (
                <Link
                  to={winner.cta.to}
                  onClick={() => setWinner(null)}
                  className="bg-gradient-flame text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-flame hover:scale-105 transition-transform"
                >
                  {winner.cta.label}
                </Link>
              )}
              <button
                onClick={() => {
                  setWinner(null);
                  setTimeout(spin, 200);
                }}
                className="border-2 border-border px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
              >
                Spin Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
