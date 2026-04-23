import { useEffect, useState } from "react";
import w1 from "@/assets/worship-1.jpg";
import w2 from "@/assets/worship-2.jpg";
import w3 from "@/assets/worship-3.jpg";
import p1 from "@/assets/prophet-1.jpg";
import p3 from "@/assets/prophet-3.jpg";
import pr1 from "@/assets/prayer-1.jpg";

const images = [w1, p3, w2, pr1, w3, p1];

export default function PillarsMotion() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % images.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1600ms] ease-in-out ${
              idx === i ? "opacity-25 animate-ken-burns" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${src})` }}
            aria-hidden={idx !== i}
          />
        ))}
      </div>
      <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-primary/30 blur-3xl animate-flame-flicker pointer-events-none" />
      <div
        className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/15 blur-3xl animate-flame-flicker pointer-events-none"
        style={{ animationDelay: "1.4s" }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 4px)",
        }}
      />
    </>
  );
}
