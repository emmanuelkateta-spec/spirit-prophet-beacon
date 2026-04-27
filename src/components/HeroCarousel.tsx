import { useEffect, useState } from "react";
import { ChevronRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import p1 from "@/assets/prophet-1.jpg";
import p2 from "@/assets/prophet-3.jpg";
import p3 from "@/assets/prophet-4.jpg";
import w1 from "@/assets/worship-1.jpg";
import w2 from "@/assets/worship-2.jpg";

const slides = [
  { img: p3, eyebrow: "Holy Ghost Encounter", title: "A Movement of Fire & Faith", caption: "Where the Spirit of God moves with power." },
  { img: p1, eyebrow: "Premier Prophet Epas", title: "Hear the Voice of Heaven", caption: "Prophetic ministry that transforms lives." },
  { img: w1, eyebrow: "Living Worship", title: "Encounter His Presence", caption: "Healing, deliverance and breakthrough await you." },
  { img: p2, eyebrow: "Walk in Authority", title: "Sons & Daughters of Power", caption: "Be raised, equipped and sent into the harvest." },
  { img: w2, eyebrow: "One Family", title: "You Belong Here", caption: "A community ablaze for Christ." },
];

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden bg-secondary">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ${idx === i ? "opacity-100" : "opacity-0"}`}
          aria-hidden={idx !== i}
        >
          <div
            className="absolute inset-0 bg-cover bg-center animate-ken-burns"
            style={{ backgroundImage: `url(${s.img})` }}
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
      ))}

      {/* Flame accent */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl animate-flame-flicker pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 h-full container flex items-center">
        <div className="max-w-3xl text-white" key={i}>
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <div className="w-12 h-px bg-accent" />
            <Flame className="w-5 h-5 text-accent animate-flame-flicker" />
            <span className="text-xs sm:text-sm tracking-[0.4em] uppercase text-accent font-semibold">{slides[i].eyebrow}</span>
          </div>
          <h1 className="font-display font-black text-4xl xs:text-5xl sm:text-6xl lg:text-8xl leading-[0.95] mb-5 sm:mb-6 animate-fade-in-up">
            {slides[i].title}
          </h1>
          <p className="text-base sm:text-xl text-white/85 max-w-xl mb-8 sm:mb-10 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            {slides[i].caption}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/connect#membership"
              className="group bg-gradient-flame text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm shadow-flame hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              Join the Family <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="border-2 border-white/40 backdrop-blur-sm bg-white/5 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-white hover:text-secondary transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1 rounded-full transition-all ${idx === i ? "bg-primary w-12" : "bg-white/40 w-6 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
}
