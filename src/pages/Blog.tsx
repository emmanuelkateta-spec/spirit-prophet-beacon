import Layout from "@/components/Layout";
import HeroBanner from "@/components/HeroBanner";
import { Calendar, User, ArrowRight, Rss } from "lucide-react";
import { Link } from "react-router-dom";
import prophet1 from "@/assets/prophet-1.jpg";
import prophet2 from "@/assets/prophet-2.jpg";
import prophet3 from "@/assets/prophet-3.jpg";
import worship1 from "@/assets/worship-1.jpg";
import worship2 from "@/assets/worship-2.jpg";
import ministry1 from "@/assets/ministry-1.jpg";

const POSTS = [
  { title: "Walking in the Fullness of the Spirit", excerpt: "Discover the daily disciplines that keep your fire burning and your heart tender to the voice of God.", img: prophet1, author: "Premier Prophet Epas", date: "Apr 18, 2026", category: "Devotional" },
  { title: "The Prophet's Mantle in the Modern Church", excerpt: "An exposition on biblical prophecy and how the prophetic office functions today with order and authority.", img: prophet2, author: "SFM Editorial", date: "Apr 11, 2026", category: "Teaching" },
  { title: "Why Worship Matters More Than You Think", excerpt: "Worship is warfare, intimacy and posture. Here's why every believer must contend for a culture of worship.", img: worship1, author: "Worship Team", date: "Apr 4, 2026", category: "Worship" },
  { title: "Raising Sons & Daughters of Fire", excerpt: "Discipleship is the heartbeat of SFM. Read how mentorship is reshaping a generation of believers.", img: ministry1, author: "Mentorship Desk", date: "Mar 28, 2026", category: "Discipleship" },
  { title: "Hearing God in a Noisy World", excerpt: "Practical principles to sharpen your spiritual ears and discern the still small voice in your daily walk.", img: prophet3, author: "Premier Prophet Epas", date: "Mar 21, 2026", category: "Prophetic" },
  { title: "The House on Fire — A Vision Update", excerpt: "Where SFM is headed, the souls we are reaching, and how God is positioning us across the nations.", img: worship2, author: "SFM Editorial", date: "Mar 14, 2026", category: "Vision" },
];

export default function Blog() {
  return (
    <Layout>
      <HeroBanner
        variant="ministries"
        eyebrow="SFM Channel"
        title={<>Articles & <span className="text-gradient-gold">Blog</span></>}
        caption="Fresh teaching, prophetic insights and stories from the SFM family."
      />
      <section className="py-20 container">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Latest Articles</span>
            <h2 className="font-display font-black text-3xl sm:text-5xl mt-3">Read & Be <span className="text-gradient-flame">Built Up</span></h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm"><Rss className="w-4 h-4" /> Subscribe</a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((p, i) => (
            <article key={p.title} className="group rounded-2xl overflow-hidden bg-card border border-border shadow-elegant hover:shadow-flame hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <span className="absolute top-4 left-4 bg-gradient-flame text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-flame">{p.category}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{p.excerpt}</p>
                <div className="flex items-center justify-between mt-5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {p.author}</span>
                  <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {p.date}</span>
                </div>
                <Link to="/connect" className="inline-flex items-center gap-2 mt-5 text-primary font-bold text-sm uppercase tracking-wider group/link">
                  Read More <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}