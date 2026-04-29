import Layout from "@/components/Layout";
import { Calendar, Archive, BookOpen, Moon, Flame } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import FlipAlbum from "@/components/FlipAlbum";
import p1 from "@/assets/prophet-1.jpg";
import p2 from "@/assets/prophet-2.jpg";
import p3 from "@/assets/prophet-3.jpg";
import p4 from "@/assets/prophet-4.jpg";
import w1 from "@/assets/worship-1.jpg";
import w2 from "@/assets/worship-2.jpg";
import w3 from "@/assets/worship-3.jpg";
import m1 from "@/assets/ministry-1.jpg";
import pr1 from "@/assets/prayer-1.jpg";
import mac1 from "@/assets/mac-1.jpg";
import mac2 from "@/assets/mac-2.jpg";
import mac3 from "@/assets/mac-3.jpg";
import mac4 from "@/assets/mac-4.jpg";
import on1 from "@/assets/overnight-1.jpg";
import on2 from "@/assets/overnight-2.jpg";
import on3 from "@/assets/overnight-3.jpg";
import on4 from "@/assets/overnight-4.jpg";
import on5 from "@/assets/overnight-5.jpg";
import on6 from "@/assets/overnight-6.jpg";
import on7 from "@/assets/overnight-7.jpg";
import on8 from "@/assets/overnight-8.jpg";

const gallery = [
  { src: mac1, caption: "Ministers Awakening — Round Table" },
  { src: mac2, caption: "Ministers Awakening — Premier Prophet" },
  { src: mac4, caption: "Ministers Awakening — Strategy Session" },
  { src: mac3, caption: "Ministers Awakening — Sent Forth" },
  { src: on1, caption: "SFM Overnight — Hands Lifted High" },
  { src: on2, caption: "SFM Overnight — Testimony Time" },
  { src: on3, caption: "SFM Overnight — Prophet Walks In" },
  { src: on4, caption: "SFM Overnight — Holy Hush" },
  { src: on5, caption: "SFM Overnight — Prophetic Word" },
  { src: on6, caption: "SFM Overnight — Travailing in Prayer" },
  { src: on7, caption: "SFM Overnight — At the Altar" },
  { src: on8, caption: "SFM Overnight — Anointing the Bowed" },
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

      {/* Ministers Awakening Conference - Flipping Album */}
      <section className="py-24 bg-muted">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Featured Event</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl mb-3">
            Ministers Awakening <span className="text-gradient-flame">Conference</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-10">
            A gathering of called and consecrated ministers — turning pages on what God did among us. Watch the album flip through the moments.
          </p>
          <FlipAlbum
            images={[
              { src: mac1, caption: "The Round Table of Counsel" },
              { src: mac2, caption: "The Premier Prophet" },
              { src: mac4, caption: "Sessions of Impartation" },
              { src: mac3, caption: "Sent Forth in Power" },
            ]}
          />
        </div>
      </section>

      {/* SFM Overnight Conference - Flipping Album */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-20 pointer-events-none" />
        <div className="container relative">
          <div className="flex items-center gap-3 mb-3">
            <Moon className="w-5 h-5 text-accent" />
            <span className="text-xs tracking-[0.4em] uppercase text-accent font-bold">All Night Encounter</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl mb-3">
            SFM Overnight <span className="text-gradient-gold">Conference</span>
          </h2>
          <p className="text-secondary-foreground/70 max-w-2xl mb-10">
            Where the church watches and prays till daybreak — travail, prophecy, deliverance and the dew of Heaven. Flip through the album of our recent overnights.
          </p>
          <FlipAlbum
            eyebrow="SFM Overnight"
            images={[
              { src: on1, caption: "Hands Lifted Through the Night" },
              { src: on2, caption: "Testimonies Before Daybreak" },
              { src: on3, caption: "The Prophet Walks In" },
              { src: on8, caption: "Anointing the Bowed" },
              { src: on5, caption: "A Prophetic Word at Midnight" },
              { src: on6, caption: "Travailing in Prayer" },
              { src: on7, caption: "At the Altar of Fire" },
              { src: on4, caption: "A Holy Hush Fell" },
            ]}
          />
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="mailto:info@spiritfilledministry.org?subject=SFM%20Overnight%20Registration&body=Name%3A%0APhone%3A%0ACity%2FCountry%3A%0AAttending%20with%20how%20many%20guests%3A%0APrayer%20Request%3A"
              className="inline-flex items-center gap-2 bg-gradient-flame text-primary-foreground px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-105 transition-transform"
            >
              <Flame className="w-4 h-4" /> Register for the Upcoming All-Night
            </a>
            <p className="text-xs uppercase tracking-[0.3em] text-accent/80 font-bold">
              Doors 21:00 · Dismissal at Daybreak
            </p>
          </div>
        </div>
      </section>

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
