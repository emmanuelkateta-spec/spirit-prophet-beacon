import Layout from "@/components/Layout";
import HeroBanner from "@/components/HeroBanner";
import { Newspaper, Calendar, ExternalLink, Camera } from "lucide-react";
import prophet4 from "@/assets/prophet-4.jpg";
import prophet2 from "@/assets/prophet-2.jpg";
import worship3 from "@/assets/worship-3.jpg";
import worship2 from "@/assets/worship-2.jpg";
import ministry1 from "@/assets/ministry-1.jpg";

const NEWS = [
  { title: "SFM Hosts Largest Holy Ghost Crusade Yet", date: "Apr 15, 2026", outlet: "SFM Press", img: prophet4, summary: "Thousands gathered as Premier Prophet Epas ministered nightly with signs and wonders following." },
  { title: "Prophet Epas Featured on National Broadcast", date: "Mar 30, 2026", outlet: "Zambia Media Network", img: prophet2, summary: "An exclusive interview on the move of God in our generation and the future of prophetic ministry." },
  { title: "SFM Launches Community Outreach Initiative", date: "Mar 12, 2026", outlet: "City Herald", img: worship3, summary: "Feeding programs, free clinics and youth empowerment rolled out across multiple districts." },
  { title: "Spirit Filled Convention Draws Global Attendance", date: "Feb 22, 2026", outlet: "SFM Press", img: worship2, summary: "Believers from over 12 nations converged for days of impartation, prophecy and worship." },
  { title: "New Mentorship Cohort Commissioned", date: "Feb 8, 2026", outlet: "SFM Press", img: ministry1, summary: "A fresh class of leaders sent out into ministry following months of intensive equipping." },
];

export default function Press() {
  return (
    <Layout>
      <HeroBanner
        variant="about"
        eyebrow="Press & Media"
        title={<>Church <span className="text-gradient-gold">News</span></>}
        caption="Stories, announcements and coverage from across the SFM family."
      />
      <section className="py-20 container">
        <div className="space-y-8">
          {NEWS.map((n, i) => (
            <article key={n.title} className="group grid md:grid-cols-[2fr_3fr] gap-0 rounded-2xl overflow-hidden bg-card border border-border shadow-elegant hover:shadow-flame transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-primary font-bold mb-2">
                  <Newspaper className="w-4 h-4" /> {n.outlet}
                  <span className="text-muted-foreground">•</span>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Calendar className="w-3.5 h-3.5" /> {n.date}</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl group-hover:text-primary transition-colors">{n.title}</h3>
                <p className="text-muted-foreground mt-3">{n.summary}</p>
                <a href="mailto:press@spiritfilled.org" className="inline-flex items-center gap-2 mt-5 text-primary font-bold text-sm uppercase tracking-wider w-fit">
                  Read Full Story <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-secondary text-secondary-foreground p-10 text-center">
          <Camera className="w-10 h-10 mx-auto text-accent mb-4" />
          <h3 className="font-display font-black text-2xl sm:text-3xl">Media Inquiries</h3>
          <p className="text-secondary-foreground/80 mt-2 max-w-xl mx-auto">For interviews, press passes, and official statements from Spirit Filled Ministry.</p>
          <a href="mailto:press@spiritfilled.org" className="inline-block mt-6 bg-gradient-flame text-primary-foreground px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-105 transition-transform">Contact Press Team</a>
        </div>
      </section>
    </Layout>
  );
}