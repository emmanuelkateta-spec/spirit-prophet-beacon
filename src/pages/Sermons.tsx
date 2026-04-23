import { useMemo } from "react";
import Layout from "@/components/Layout";
import HeroBanner from "@/components/HeroBanner";
import { Play, Calendar, Clock, MapPin, Youtube } from "lucide-react";
import logo from "@/assets/logo.jpg";
import prophet1 from "@/assets/prophet-1.jpg";
import prophet2 from "@/assets/prophet-2.jpg";
import prophet3 from "@/assets/prophet-3.jpg";
import prophet4 from "@/assets/prophet-4.jpg";
import worship1 from "@/assets/worship-1.jpg";
import worship2 from "@/assets/worship-2.jpg";
import worship3 from "@/assets/worship-3.jpg";
import ministry1 from "@/assets/ministry-1.jpg";
import prayer1 from "@/assets/prayer-1.jpg";

type Sermon = {
  title: string;
  preacher: string;
  date: string;
  duration: string;
  thumbnail: string;
  // Replace these with the real YouTube URLs when ready
  youtubeUrl: string;
};

const SERMONS: Sermon[] = [
  {
    title: "Holy Ghost & Fire — A Fresh Encounter",
    preacher: "Premier Prophet Epas",
    date: "Sun, Apr 13, 2026",
    duration: "1:24:08",
    thumbnail: prophet1,
    youtubeUrl: "https://www.youtube.com/results?search_query=spirit+filled+ministry+prophet+epas",
  },
  {
    title: "The Power of the Prophetic Word",
    preacher: "Premier Prophet Epas",
    date: "Sun, Apr 6, 2026",
    duration: "58:42",
    thumbnail: prophet4,
    youtubeUrl: "https://www.youtube.com/results?search_query=spirit+filled+ministry+prophet+epas",
  },
  {
    title: "Walking in Supernatural Breakthrough",
    preacher: "Premier Prophet Epas",
    date: "Sun, Mar 30, 2026",
    duration: "1:12:55",
    thumbnail: worship1,
    youtubeUrl: "https://www.youtube.com/results?search_query=spirit+filled+ministry+prophet+epas",
  },
  {
    title: "Healing & Deliverance Service",
    preacher: "Premier Prophet Epas",
    date: "Sun, Mar 23, 2026",
    duration: "1:46:30",
    thumbnail: prayer1,
    youtubeUrl: "https://www.youtube.com/results?search_query=spirit+filled+ministry+prophet+epas",
  },
  {
    title: "Built on the Word — Sound Doctrine",
    preacher: "Premier Prophet Epas",
    date: "Sun, Mar 16, 2026",
    duration: "52:11",
    thumbnail: prophet3,
    youtubeUrl: "https://www.youtube.com/results?search_query=spirit+filled+ministry+prophet+epas",
  },
  {
    title: "A House on Fire for God",
    preacher: "Premier Prophet Epas",
    date: "Sun, Mar 9, 2026",
    duration: "1:05:20",
    thumbnail: worship2,
    youtubeUrl: "https://www.youtube.com/results?search_query=spirit+filled+ministry+prophet+epas",
  },
  {
    title: "Mentorship — Be Discipled, Be Sent",
    preacher: "Premier Prophet Epas",
    date: "Sun, Mar 2, 2026",
    duration: "47:09",
    thumbnail: ministry1,
    youtubeUrl: "https://www.youtube.com/results?search_query=spirit+filled+ministry+prophet+epas",
  },
  {
    title: "Win a Soul — The Harvest is Ripe",
    preacher: "Premier Prophet Epas",
    date: "Sun, Feb 23, 2026",
    duration: "1:18:44",
    thumbnail: worship3,
    youtubeUrl: "https://www.youtube.com/results?search_query=spirit+filled+ministry+prophet+epas",
  },
  {
    title: "Prophetic Impartation Night",
    preacher: "Premier Prophet Epas",
    date: "Sun, Feb 16, 2026",
    duration: "1:33:02",
    thumbnail: prophet2,
    youtubeUrl: "https://www.youtube.com/results?search_query=spirit+filled+ministry+prophet+epas",
  },
];

function getNextSunday(): Date {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const daysUntil = day === 0 ? 7 : 7 - day;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntil);
  next.setHours(9, 0, 0, 0);
  return next;
}

export default function Sermons() {
  const nextSunday = useMemo(getNextSunday, []);
  const longDate = nextSunday.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Layout>
      <HeroBanner
        variant="ministries"
        eyebrow="Sermons Archive"
        title={
          <>
            Watch Our Previous <span className="text-gradient-gold">Sermons</span>
          </>
        }
        caption="Press play. Receive the Word. Get blessed."
      />

      {/* Next service callout with blinking logo */}
      <section className="py-16 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto rounded-3xl border border-primary/30 bg-white/5 backdrop-blur-md p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl animate-logo-blink" />
              <img
                src={logo}
                alt="Spirit Filled Ministry"
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-primary/60 animate-logo-blink"
              />
            </div>
            <div className="text-center sm:text-left flex-1">
              <span className="text-xs tracking-[0.4em] uppercase text-accent font-bold">Next Sunday Service</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl mt-2 mb-3 leading-tight">
                <span className="text-gradient-flame">{longDate}</span>
              </h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-sm text-secondary-foreground/80">
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> 9:00 AM
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> Spirit Filled Ministry
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" /> Weekly Live Service
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sermons grid */}
      <section className="py-20 container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Sermon Library</span>
            <h2 className="font-display font-black text-3xl sm:text-5xl mt-3">
              Recent <span className="text-gradient-flame">Messages</span>
            </h2>
          </div>
          <a
            href="https://www.youtube.com/results?search_query=spirit+filled+ministry+prophet+epas"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm group"
          >
            <Youtube className="w-5 h-5" /> Subscribe on YouTube
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERMONS.map((s, i) => (
            <a
              key={s.title}
              href={s.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl overflow-hidden bg-card border border-border shadow-elegant hover:shadow-flame hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* YouTube-style thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <img
                  src={s.thumbnail}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Duration pill */}
                <span className="absolute bottom-3 right-3 bg-black/85 text-white text-xs font-semibold px-2 py-1 rounded">
                  {s.duration}
                </span>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/95 text-primary-foreground flex items-center justify-center shadow-flame group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 ml-1 fill-current" />
                  </div>
                </div>
              </div>

              <div className="p-5 flex gap-3">
                <img
                  src={logo}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/40 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.preacher}</p>
                  <p className="text-xs text-muted-foreground/80 mt-0.5">{s.date}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </Layout>
  );
}