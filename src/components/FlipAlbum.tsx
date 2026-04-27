import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

interface FlipAlbumProps {
  images: { src: string; caption: string }[];
  autoPlayMs?: number;
  eyebrow?: string;
}

export default function FlipAlbum({ images, autoPlayMs = 4500, eyebrow = "Ministers Awakening" }: FlipAlbumProps) {
  const [index, setIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const total = images.length;

  const goNext = () => {
    if (flipping) return;
    setFlipping(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % total);
      setFlipping(false);
    }, 1200);
  };

  const goPrev = () => {
    if (flipping) return;
    setIndex((i) => (i - 1 + total) % total);
  };

  useEffect(() => {
    const t = setInterval(goNext, autoPlayMs);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayMs, flipping]);

  const current = images[index];
  const next = images[(index + 1) % total];

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Album book */}
      <div
        className="relative aspect-[4/3] rounded-2xl shadow-flame bg-secondary overflow-hidden"
        style={{ perspective: "1800px" }}
      >
        {/* Back page (next image) — revealed as the front flips */}
        <div className="absolute inset-0">
          <img src={next.src} alt={next.caption} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/10 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-5 text-secondary-foreground">
            <p className="text-xs uppercase tracking-[0.4em] text-accent font-bold">{eyebrow}</p>
            <h4 className="font-display font-black text-xl sm:text-2xl">{next.caption}</h4>
          </div>
        </div>

        {/* Front page (current image) — flips on interval */}
        <div
          key={index + (flipping ? "-f" : "")}
          className={`absolute inset-0 origin-left ${flipping ? "animate-page-flip" : ""}`}
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        >
          <img src={current.src} alt={current.caption} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/10 to-transparent" />
          {/* Page binding shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 p-5 text-secondary-foreground">
            <p className="text-xs uppercase tracking-[0.4em] text-accent font-bold flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> {eyebrow}
            </p>
            <h4 className="font-display font-black text-xl sm:text-2xl">{current.caption}</h4>
          </div>
        </div>

        {/* Center spine */}
        <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-0.5 bg-black/40 -translate-x-1/2 z-10" aria-hidden />
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={goPrev}
          className="inline-flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Page ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? "bg-primary w-8" : "bg-border w-4 hover:bg-muted-foreground"}`}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          className="inline-flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Next page"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}