import Layout from "@/components/Layout";
import HeroCarousel from "@/components/HeroCarousel";
import { Link } from "react-router-dom";
import { Flame, BookOpen, Users, Heart, ChevronRight, Calendar, MapPin } from "lucide-react";
import prophet1 from "@/assets/prophet-1.jpg";
import prophet4 from "@/assets/prophet-4.jpg";
import worship1 from "@/assets/worship-1.jpg";
import worship2 from "@/assets/worship-2.jpg";
import worship3 from "@/assets/worship-3.jpg";
import ministry1 from "@/assets/ministry-1.jpg";
import prayer1 from "@/assets/prayer-1.jpg";

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />

      {/* Marquee scripture */}
      <div className="bg-gradient-flame text-primary-foreground py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {[
                "“Not by might, nor by power, but by My Spirit” — Zechariah 4:6",
                "“The Spirit of the Lord is upon me” — Luke 4:18",
                "“You shall receive power when the Holy Spirit comes upon you” — Acts 1:8",
                "“Where the Spirit of the Lord is, there is liberty” — 2 Corinthians 3:17",
                "“Be filled with the Spirit” — Ephesians 5:18",
                "Spirit • Truth • Power",
                "Premier Prophet Epas",
                "Holy Ghost & Fire",
                "One Family in Christ",
                "Healing • Deliverance • Breakthrough",
              ].map((t) => (
                <span key={t} className="flex items-center gap-12 text-sm font-semibold tracking-widest uppercase">
                  <Flame className="w-4 h-4" /> {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Welcome */}
      <section className="py-24 container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={prophet4} alt="Premier Prophet Epas ministering" className="w-full rounded-2xl shadow-elegant object-cover aspect-[4/5]" />
            <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-gradient-flame text-primary-foreground p-6 rounded-xl shadow-flame max-w-[220px]">
              <Flame className="w-8 h-8 mb-2 animate-flame-flicker" />
              <div className="font-display font-bold text-lg leading-tight">Premier Prophet Epas</div>
              <div className="text-xs uppercase tracking-widest opacity-90 mt-1">Founder and President</div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-primary" />
              <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Welcome Home</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
              A House on <span className="text-gradient-flame">Fire</span> for God
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Spirit Filled Ministry is a Holy Ghost movement raising a generation that knows their God and walks in supernatural power. Under the prophetic leadership of <strong className="text-foreground">Premier Prophet Epas</strong>, we are committed to seeing souls saved, lives transformed, and the Kingdom of God advanced.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Whether you are seeking healing, hungry for the Word, or ready to discover your purpose — there is a place for you here.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm group">
              Discover Our Story <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <PillarsMotion />
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="container relative">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.4em] uppercase text-accent font-bold">Our Pillars</span>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mt-3">Built on the <span className="text-gradient-gold">Word & Spirit</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Flame, title: "Holy Ghost Fire", text: "Encountering the manifest presence of God in every gathering." },
              { icon: BookOpen, title: "The Word", text: "Sound doctrine that builds faith and renews the mind." },
              { icon: Users, title: "Family", text: "A loving community where no one walks alone." },
              { icon: Heart, title: "Compassion", text: "Reaching the lost, the broken, and the forgotten." },
            ].map((p, i) => (
              <div key={p.title} className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-primary/60 hover:-translate-y-2 transition-all duration-500 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="w-14 h-14 rounded-xl bg-gradient-flame flex items-center justify-center mb-5 shadow-flame group-hover:animate-flame-flicker">
                  <p.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{p.title}</h3>
                <p className="text-secondary-foreground/70 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries quick grid */}
      <section className="py-24 container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Get Involved</span>
            <h2 className="font-display font-black text-4xl sm:text-5xl mt-3">Our Ministries</h2>
          </div>
          <Link to="/ministries" className="text-primary font-bold uppercase text-sm tracking-wider inline-flex items-center gap-2 group">
            View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { img: ministry1, title: "Mentorship Program", text: "Be discipled, sharpened and sent.", to: "/ministries#mentorship" },
            { img: prayer1, title: "Bible Study", text: "Dig deep into the Word, weekly.", to: "/ministries#bible-study" },
            { img: worship3, title: "Win a Soul", text: "Join the harvest team. Souls are waiting.", to: "/ministries#soul-winning" },
          ].map((m) => (
            <Link key={m.title} to={m.to} className="group relative overflow-hidden rounded-2xl aspect-[4/5] block shadow-elegant">
              <img src={m.img} alt={m.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <h3 className="font-display font-black text-3xl mb-2">{m.title}</h3>
                <p className="text-white/80 mb-4">{m.text}</p>
                <span className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-wider text-sm">
                  Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Conference */}
      <section className="py-24 bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Upcoming Conference</span>
              <h2 className="font-display font-black text-4xl sm:text-5xl mt-3 mb-4">An Encounter is <span className="text-gradient-flame">Coming</span></h2>
              <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-full px-5 py-2 mb-6">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold tracking-widest uppercase text-primary">Upcoming — Dates Soon</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Days of fire, prophecy, healing and impartation under Premier Prophet Epas. Stay connected — registration opens soon. Be the first to know.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/connect#membership" className="bg-gradient-flame text-primary-foreground px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-105 transition-transform">
                  Notify Me
                </Link>
                <Link to="/gallery" className="border-2 border-secondary text-secondary px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors">
                  Past Gatherings
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-4">
                <img src={worship1} alt="Worship gathering" className="rounded-2xl aspect-[3/4] object-cover shadow-elegant" />
                <img src={prophet1} alt="Prophet ministering" className="rounded-2xl aspect-[3/4] object-cover shadow-elegant mt-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 bg-gradient-flame text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${worship2})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="container relative text-center">
          <Flame className="w-12 h-12 mx-auto mb-4 animate-flame-flicker" />
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-6 max-w-3xl mx-auto leading-tight">
            Your story of breakthrough begins today.
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
            Step into a family that prays for you, contends for you, and celebrates with you.
          </p>
          <Link to="/connect" className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-elegant hover:scale-105 transition-transform">
            Take the Next Step <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
