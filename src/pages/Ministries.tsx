import Layout from "@/components/Layout";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Flame, BookOpen, Users, Heart, Calendar, MapPin } from "lucide-react";
import BibleStudyForm from "@/components/forms/BibleStudyForm";
import SoulWinnerForm from "@/components/forms/SoulWinnerForm";
import ministry1 from "@/assets/ministry-1.jpg";
import worship3 from "@/assets/worship-3.jpg";
import worship1 from "@/assets/worship-1.jpg";
import worship2 from "@/assets/worship-2.jpg";
import prayer1 from "@/assets/prayer-1.jpg";
import prophet3 from "@/assets/prophet-3.jpg";
import prophet1 from "@/assets/prophet-1.jpg";

export default function Ministries() {
  const loc = useLocation();
  useEffect(() => {
    if (loc.hash) {
      const el = document.querySelector(loc.hash);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loc]);

  return (
    <Layout>
      <section className="relative py-32 bg-secondary text-secondary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center animate-ken-burns" style={{ backgroundImage: `url(${prophet3})` }} />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container relative text-center">
          <span className="text-xs tracking-[0.4em] uppercase text-accent font-bold">Ministries</span>
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl mt-4 mb-6">Find Your <span className="text-gradient-gold">Place</span></h1>
          <p className="text-lg max-w-2xl mx-auto text-white/80">There is room for every gift, every passion, every calling.</p>
        </div>
      </section>

      {/* Mentorship */}
      <section id="mentorship" className="py-24 container scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <img src={ministry1} alt="Mentorship" className="rounded-2xl shadow-elegant w-full aspect-[4/3] object-cover" />
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Mentorship Program</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl mb-6">Be Discipled. Be <span className="text-gradient-flame">Equipped</span>. Be Sent.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">Our Mentorship Program pairs you with seasoned ministers who walk with you in prayer, the Word, character formation and ministry training. Whether you're called to lead, serve, preach or pioneer — we'll help you grow.</p>
            <ul className="space-y-3">
              {["Personal one-on-one sessions", "Quarterly leadership intensives", "Apostolic & prophetic impartation", "Practical ministry exposure"].map((t) => (
                <li key={t} className="flex items-start gap-3"><Flame className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span>{t}</span></li>
              ))}
            </ul>
            <a href="tel:+260976747922" className="inline-block mt-8 bg-gradient-flame text-primary-foreground px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-105 transition-transform">Call to Enroll</a>
          </div>
        </div>
      </section>

      {/* Bible Study */}
      <section id="bible-study" className="py-24 bg-muted scroll-mt-24">
        <div className="container grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Bible Study</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl mb-6">Dig Deep into the <span className="text-gradient-flame">Word</span></h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">Weekly Bible Study sessions where Scripture comes alive. Whether you're new to the faith or a seasoned student of the Word, you'll grow in knowledge, faith and practical application.</p>
            <img src={prayer1} alt="Bible study" className="rounded-2xl shadow-elegant w-full aspect-[4/3] object-cover" />
          </div>
          <div className="bg-background p-8 rounded-2xl shadow-elegant">
            <h3 className="font-display font-bold text-2xl mb-6">Register for Bible Study</h3>
            <BibleStudyForm />
          </div>
        </div>
      </section>

      {/* Soul Winning */}
      <section id="soul-winning" className="py-24 container scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="lg:order-2">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Win a Soul</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl mb-6">The Fields are <span className="text-gradient-flame">White</span></h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">"He that winneth souls is wise." Join a passionate team that goes out into our streets, schools, markets and neighborhoods sharing the love of Jesus and seeing lives transformed.</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <img src={worship3} alt="" className="rounded-xl aspect-square object-cover" />
              <img src={worship1} alt="" className="rounded-xl aspect-square object-cover mt-6" />
            </div>
          </div>
          <div className="lg:order-1 bg-secondary text-secondary-foreground p-8 rounded-2xl shadow-elegant">
            <h3 className="font-display font-bold text-2xl mb-6 text-accent">Join the Harvest Team</h3>
            <SoulWinnerForm />
          </div>
        </div>
      </section>

      {/* Conferences */}
      <section id="conferences" className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-radial opacity-30" />
        <div className="container relative">
          <div className="text-center mb-14">
            <Calendar className="w-10 h-10 mx-auto text-accent mb-4" />
            <span className="text-xs tracking-[0.4em] uppercase text-accent font-bold">Upcoming Conferences</span>
            <h2 className="font-display font-black text-4xl sm:text-5xl mt-3">Mark Your <span className="text-gradient-gold">Calendar</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: prophet1, title: "Holy Ghost Encounter", subtitle: "A Night of Fire & Prophecy" },
              { img: worship2, title: "City Fellowship Crusade", subtitle: "Healing & Salvation Outreach" },
              { img: prophet3, title: "Spirit Filled Convention", subtitle: "Days of Impartation" },
            ].map((c) => (
              <div key={c.title} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-accent/50 transition-all">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-gradient-flame text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-flame">UPCOMING</div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl mb-1">{c.title}</h3>
                  <p className="text-sm text-secondary-foreground/70">{c.subtitle}</p>
                  <div className="flex items-center gap-2 mt-4 text-xs uppercase tracking-widest text-accent font-bold">
                    <MapPin className="w-3 h-3" /> Details Soon
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
