import { useEffect, useState } from "react";
import p1 from "@/assets/prophet-1.jpg";
import p2 from "@/assets/prophet-2.jpg";
import p3 from "@/assets/prophet-3.jpg";
import p4 from "@/assets/prophet-4.jpg";
import w1 from "@/assets/worship-1.jpg";
import w2 from "@/assets/worship-2.jpg";
import w3 from "@/assets/worship-3.jpg";
import m1 from "@/assets/ministry-1.jpg";
import pr1 from "@/assets/prayer-1.jpg";

type Variant = "about" | "ministries" | "gallery" | "connect";

const sets: Record<Variant, string[]> = {
  about: [p4, p2, p1, m1, w1],
  ministries: [p3, m1, w3, pr1, p1],
  gallery: [w2, w1, w3, p3, p2, m1],
  connect: [w2, p4, w1, pr1, p3],
};

interface HeroBannerProps {
  variant: Variant;
  eyebrow: string;
  title: React.ReactNode;
  caption: string;
}

export default function HeroBanner({ variant, eyebrow, title, caption }: HeroBannerProps) {
  const images = sets[variant];
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % images.length), 5500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <section className="relative py-32 bg-secondary text-secondary-foreground overflow-hidden min-h-[420px]">
      {/* Layered crossfading Ken-Burns images */}
      <div className="absolute inset-0">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1800ms] ease-in-out ${
              idx === i ? "opacity-40 animate-ken-burns" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${src})` }}
            aria-hidden={idx !== i}
          />
        ))}
      </div>

      {/* Dimensional gradient layers */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-tr from-secondary/80 via-transparent to-primary/20" />

      {/* Floating accent orbs (3D-feel parallax) */}
      <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-primary/25 blur-3xl animate-flame-flicker pointer-events-none" />
      <div
        className="absolute -bottom-32 -right-20 w-[26rem] h-[26rem] rounded-full bg-accent/15 blur-3xl animate-flame-flicker pointer-events-none"
        style={{ animationDelay: "1.2s" }}
      />

      {/* Subtle minimalist scan line for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 4px)",
        }}
      />

      <div className="container relative text-center">
        <span className="text-xs tracking-[0.4em] uppercase text-accent font-bold animate-fade-in">{eyebrow}</span>
        <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl mt-4 mb-6 animate-fade-in-up">
          {title}
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-white/80 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {caption}
        </p>

        {/* Slide pips */}
        <div className="mt-10 flex justify-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1 rounded-full transition-all ${idx === i ? "bg-accent w-10" : "bg-white/30 w-5 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
