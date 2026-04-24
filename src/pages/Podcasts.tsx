import Layout from "@/components/Layout";
import HeroBanner from "@/components/HeroBanner";
import { Headphones, Play, Mic, Download } from "lucide-react";
import logo from "@/assets/logo.jpg";

const EPISODES = [
  { title: "The Voice of the Prophet — Ep. 12", host: "Premier Prophet Epas", duration: "42:18", date: "Apr 19, 2026", topic: "Prophetic" },
  { title: "Fire in the Bones — Ep. 11", host: "SFM Pulpit", duration: "55:02", date: "Apr 12, 2026", topic: "Sermon Audio" },
  { title: "Built to Last — Discipleship Talks", host: "Mentorship Desk", duration: "37:45", date: "Apr 5, 2026", topic: "Discipleship" },
  { title: "Worship Wednesdays — Live Set", host: "Worship Team", duration: "1:02:30", date: "Apr 2, 2026", topic: "Worship" },
  { title: "The House on Fire — Ep. 10", host: "Premier Prophet Epas", duration: "48:11", date: "Mar 29, 2026", topic: "Vision" },
  { title: "Soul Winners Roundtable", host: "Harvest Team", duration: "33:50", date: "Mar 22, 2026", topic: "Evangelism" },
  { title: "Healing Encounters — Audio Sermon", host: "Premier Prophet Epas", duration: "1:18:04", date: "Mar 15, 2026", topic: "Healing" },
  { title: "Q&A With the Prophet", host: "Premier Prophet Epas", duration: "29:27", date: "Mar 8, 2026", topic: "Q&A" },
];

export default function Podcasts() {
  return (
    <Layout>
      <HeroBanner
        variant="ministries"
        eyebrow="Audio & Podcasts"
        title={<>Listen <span className="text-gradient-gold">Anywhere</span></>}
        caption="Audio sermons, prophetic teachings and SFM podcasts for the road, the gym and the quiet hour."
      />

      <section className="py-20 container">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Mic, title: "The Voice of the Prophet", desc: "Weekly prophetic teaching show with Premier Prophet Epas." },
            { icon: Headphones, title: "Sermon Audio", desc: "Every Sunday message — pure preaching, ready for your earbuds." },
            { icon: Play, title: "Worship Sessions", desc: "Spirit-led worship moments captured live in our sanctuary." },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-elegant hover:shadow-flame transition-shadow">
              <s.icon className="w-8 h-8 text-primary" />
              <h3 className="font-display font-bold text-xl mt-4">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display font-black text-3xl sm:text-4xl mb-6">Latest <span className="text-gradient-flame">Episodes</span></h2>
        <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden shadow-elegant">
          {EPISODES.map((ep, i) => (
            <div key={ep.title} className="flex items-center gap-4 p-5 hover:bg-muted/40 transition-colors">
              <button className="w-12 h-12 rounded-full bg-gradient-flame text-primary-foreground flex items-center justify-center shadow-flame shrink-0 hover:scale-105 transition-transform" aria-label={`Play ${ep.title}`}>
                <Play className="w-5 h-5 ml-0.5 fill-current" />
              </button>
              <img src={logo} alt="" className="w-10 h-10 rounded-full object-cover hidden sm:block ring-2 ring-primary/30" />
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold truncate">{ep.title}</h4>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
                  <span>{ep.host}</span>
                  <span>•</span>
                  <span>{ep.date}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline text-primary font-bold uppercase tracking-wider">{ep.topic}</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground tabular-nums hidden sm:inline">{ep.duration}</span>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2" aria-label="Download episode"><Download className="w-4 h-4" /></a>
              <span className="text-[10px] text-muted-foreground/70 ml-1 hidden md:inline">Episode {EPISODES.length - i}</span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}