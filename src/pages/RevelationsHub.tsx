import Layout from "@/components/Layout";
import HeroBanner from "@/components/HeroBanner";
import { Lock, Key, Flame, ShieldCheck, BookOpen, Crown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import prophet1 from "@/assets/prophet-1.jpg";
import prophet2 from "@/assets/prophet-2.jpg";
import prophet3 from "@/assets/prophet-3.jpg";
import prophet4 from "@/assets/prophet-4.jpg";

export default function RevelationsHub() {
  const [code, setCode] = useState("");

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Access requests are reviewed personally. Our team will reach out shortly.");
    setCode("");
  };

  return (
    <Layout>
      <HeroBanner
        variant="about"
        eyebrow="SFM Revelations Hub"
        title={<>Exclusive <span className="text-gradient-gold">Training</span></>}
        caption="A consecrated space for an inner circle — deep revelation, prophetic schooling and spiritual mantles."
      />

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-background/85" />
          <div className="absolute inset-0 flex items-center justify-center [perspective:1400px]">
            <div className="relative w-[min(80vw,640px)] h-[min(80vw,640px)] [transform-style:preserve-3d] animate-prophet-orbit opacity-30">
              {[prophet1, prophet2, prophet3, prophet4].map((src, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 rounded-[3rem] bg-cover bg-center shadow-flame"
                  style={{
                    backgroundImage: `url(${src})`,
                    transform: `rotateY(${idx * 90}deg) translateZ(280px)`,
                    backfaceVisibility: "hidden",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/70" />
        </div>
        <div className="container grid lg:grid-cols-2 gap-12 items-start relative">
          <div className="bg-background/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-5 h-5 text-primary" />
              <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">By Invitation</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl mb-6">A <span className="text-gradient-flame">Hidden Place</span> for the Called</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The Revelations Hub is not for everyone — and that is by design. It is a guarded environment where chosen vessels receive deep prophetic schooling, sealed mysteries of the Word, and personal apostolic oversight from Premier Prophet Epas.
            </p>
            <ul className="space-y-4">
              {[
                { icon: Flame, title: "Deep Revelation Schools", desc: "Mysteries of the Kingdom unpacked in closed-door sessions." },
                { icon: BookOpen, title: "Prophetic Training Modules", desc: "Foundational and advanced prophetic activations." },
                { icon: ShieldCheck, title: "Covenant Confidentiality", desc: "What is shared in the Hub stays in the Hub." },
                { icon: Key, title: "One-on-One Mentorship", desc: "Direct, personal access and accountability." },
              ].map((f) => (
                <li key={f.title} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-11 h-11 rounded-full bg-gradient-flame text-primary-foreground flex items-center justify-center shrink-0 shadow-flame"><f.icon className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-display font-bold">{f.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary text-secondary-foreground rounded-3xl p-8 sm:p-10 shadow-elegant relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial opacity-30" />
            <div className="relative">
              <Lock className="w-10 h-10 text-accent mb-4" />
              <h3 className="font-display font-black text-3xl mb-2">Members-Only Portal</h3>
              <p className="text-secondary-foreground/80 mb-8">Enter your access code to unlock the Hub. Don't have one? Request consideration below.</p>

              <form onSubmit={handleAccess} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-accent font-bold">Access Code</label>
                  <input
                    type="password"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="• • • • • • • •"
                    className="mt-2 w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-secondary-foreground placeholder-white/40 focus:outline-none focus:border-accent"
                  />
                </div>
                <button type="submit" className="w-full bg-gradient-flame text-primary-foreground py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-[1.02] transition-transform">Enter the Hub</button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-secondary-foreground/70 mb-4">No access code? Send a personal request to be considered.</p>
                <a href="mailto:info@spiritfilledministry.org?subject=Revelations%20Hub%20Access%20Request" className="inline-block w-full text-center bg-white/10 hover:bg-white/20 text-secondary-foreground py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-colors">Request Consideration</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}