import Layout from "@/components/Layout";
import { Flame, Eye, Target, Heart } from "lucide-react";
import prophet1 from "@/assets/prophet-1.jpg";
import prophet2 from "@/assets/prophet-2.jpg";
import prophet4 from "@/assets/prophet-4.jpg";
import ministry1 from "@/assets/ministry-1.jpg";

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 bg-secondary text-secondary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center animate-ken-burns" style={{ backgroundImage: `url(${prophet4})` }} />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container relative text-center">
          <span className="text-xs tracking-[0.4em] uppercase text-accent font-bold">About Us</span>
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl mt-4 mb-6">A People Set <span className="text-gradient-gold">Ablaze</span></h1>
          <p className="text-lg max-w-2xl mx-auto text-white/80">The story, the vision and the heartbeat of Spirit Filled Ministry.</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <img src={prophet2} alt="Premier Prophet Epas" className="rounded-2xl shadow-elegant w-full aspect-[3/4] object-cover" />
          <div>
            <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Our Story</span>
            <h2 className="font-display font-black text-4xl sm:text-5xl mt-3 mb-6">From a Spark to a <span className="text-gradient-flame">Wildfire</span></h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>Spirit Filled Ministry was birthed out of a divine burden — to see the Body of Christ return to the simplicity, purity and power of the early Church. What began as small gatherings of hungry believers has grown into a thriving community where the Word of God is preached uncompromisingly and the Holy Spirit moves freely.</p>
              <p>At the helm is <strong className="text-foreground">Premier Prophet Epas</strong>, a vessel called and commissioned by God to release prophetic insight, healing, and apostolic order. His ministry has been a source of restoration to many, raising up a generation that walks in supernatural identity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Mission Values */}
      <section className="py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Why We Exist</span>
            <h2 className="font-display font-black text-4xl sm:text-5xl mt-3">Vision • Mission • Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Eye, title: "Vision", text: "To raise a Spirit-filled generation that influences nations through the gospel of the Kingdom." },
              { icon: Target, title: "Mission", text: "To preach Christ, demonstrate the power of the Holy Ghost, disciple believers, and reach the lost." },
              { icon: Heart, title: "Values", text: "Holiness, prayer, love, integrity, faith and unwavering devotion to the Word of God." },
            ].map((v) => (
              <div key={v.title} className="bg-background p-10 rounded-2xl shadow-elegant border-t-4 border-primary">
                <div className="w-14 h-14 rounded-xl bg-gradient-flame flex items-center justify-center mb-6 shadow-flame">
                  <v.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-2xl mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leader */}
      <section className="py-24 container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Lead Servant</span>
            <h2 className="font-display font-black text-4xl sm:text-5xl mt-3 mb-6">Premier Prophet <span className="text-gradient-flame">Epas</span></h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>A prophet, teacher and father in the faith, Premier Prophet Epas carries a unique mantle of prophetic accuracy, healing and impartation. His passion is to see believers rooted in the Word and walking in the demonstration of the Spirit.</p>
              <p>He has ministered across churches, conferences and crusades — releasing the heart of the Father to a hungry generation.</p>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <Flame className="w-6 h-6 text-primary animate-flame-flicker" />
              <span className="font-display font-bold text-lg">“The Spirit of God is not silent — He still speaks today.”</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={prophet1} alt="Prophet Epas" className="rounded-2xl aspect-[3/4] object-cover shadow-elegant" />
            <img src={ministry1} alt="Prophet Epas with members" className="rounded-2xl aspect-[3/4] object-cover shadow-elegant mt-8" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
