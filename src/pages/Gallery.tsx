import Layout from "@/components/Layout";
import { Calendar, Archive } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import p1 from "@/assets/prophet-1.jpg";
import p2 from "@/assets/prophet-2.jpg";
import p3 from "@/assets/prophet-3.jpg";
import p4 from "@/assets/prophet-4.jpg";
import w1 from "@/assets/worship-1.jpg";
import w2 from "@/assets/worship-2.jpg";
import w3 from "@/assets/worship-3.jpg";
import m1 from "@/assets/ministry-1.jpg";
import pr1 from "@/assets/prayer-1.jpg";

const gallery = [
  { src: p3, caption: "Suited for the Spirit" },
  { src: w1, caption: "On Bended Knee" },
  { src: p1, caption: "City Fellowship Outreach" },
  { src: w2, caption: "United in Worship" },
  { src: p2, caption: "Walking in Authority" },
  { src: w3, caption: "The Brethren" },
  { src: m1, caption: "Prophetic Encounter" },
  { src: pr1, caption: "In the Place of Prayer" },
  { src: p4, caption: "Declaring the Word" },
];

const archives = [
  { title: "Holy Ghost Service", date: "Recent", img: p4 },
  { title: "City Fellowship Crusade", date: "Recent", img: p1 },
  { title: "Night of Prayer", date: "Recent", img: pr1 },
  { title: "Sunday Worship", date: "Weekly", img: w2 },
];

export default function Gallery() {
  return (
    <Layout>
      <HeroBanner
        variant="gallery"
        eyebrow="Gallery & Archives"
        title={<>Captured <span className="text-gradient-gold">Moments</span></>}
        caption="Memories from our gatherings, services and encounters with the Holy Ghost."
      />

      {/* Gallery grid */}
      <section className="py-24 container">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-px bg-primary" />
          <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Church Gallery</span>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {gallery.map((g, i) => (
            <figure key={i} className="break-inside-avoid relative group overflow-hidden rounded-2xl shadow-elegant">
              <img src={g.src} alt={g.caption} loading="lazy" className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 to-transparent text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Archives */}
      <section className="py-24 bg-muted">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <Archive className="w-5 h-5 text-primary" />
            <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Church Archives</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl mb-12">A Record of His <span className="text-gradient-flame">Faithfulness</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {archives.map((a) => (
              <div key={a.title} className="group bg-background rounded-2xl overflow-hidden shadow-elegant hover:-translate-y-2 transition-transform duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-widest mb-2">
                    <Calendar className="w-3 h-3" /> {a.date}
                  </div>
                  <h3 className="font-display font-bold text-lg">{a.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
