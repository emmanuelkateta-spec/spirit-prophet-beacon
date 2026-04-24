import Layout from "@/components/Layout";
import HeroBanner from "@/components/HeroBanner";
import { GraduationCap, Briefcase, Users, TrendingUp, Heart, Laptop, Crown, ArrowRight } from "lucide-react";

const COURSES = [
  { icon: Crown, title: "Christian Leadership", desc: "Servant leadership, vision casting, team building and biblical authority.", duration: "8 weeks" },
  { icon: Briefcase, title: "Business & Entrepreneurship", desc: "Build Kingdom businesses with integrity, strategy and sustainable growth.", duration: "10 weeks" },
  { icon: TrendingUp, title: "Personal Finance", desc: "Stewardship, budgeting, investing and breaking generational poverty.", duration: "6 weeks" },
  { icon: Users, title: "Marriage & Family", desc: "Building strong, Christ-centered homes that endure and influence." , duration: "8 weeks" },
  { icon: Laptop, title: "Digital Skills & Media", desc: "Content creation, social media, basic design and tech for ministry & work.", duration: "6 weeks" },
  { icon: Heart, title: "Counseling & Care", desc: "Pastoral care, listening skills and biblical counseling foundations.", duration: "8 weeks" },
];

export default function Academy() {
  return (
    <Layout>
      <HeroBanner
        variant="ministries"
        eyebrow="SFM Academy"
        title={<>Equipped to <span className="text-gradient-gold">Stand Before Kings</span></>}
        caption='"Seest thou a man diligent in his business? He shall stand before kings; he shall not stand before mean men." — Proverbs 22:29'
      />

      <section className="py-20 container">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-display font-black text-4xl sm:text-5xl mb-4">Skill. <span className="text-gradient-flame">Excellence</span>. Influence.</h2>
          <p className="text-lg text-muted-foreground">SFM Academy exists to equip the church with practical skills in leadership, management and every facet of life — so we may serve God with excellence and stand before kings.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((c, i) => (
            <div key={c.title} className="group rounded-2xl bg-card border border-border p-6 shadow-elegant hover:shadow-flame hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-flame text-primary-foreground flex items-center justify-center shadow-flame">
                <c.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mt-5">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">{c.duration}</span>
                <a href="mailto:academy@spiritfilled.org?subject=Enroll%20-%20Academy" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all">Enroll <ArrowRight className="w-4 h-4" /></a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-secondary text-secondary-foreground p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial opacity-30" />
          <div className="relative">
            <h3 className="font-display font-black text-3xl sm:text-4xl">Ready to <span className="text-gradient-gold">Sharpen Your Skill</span>?</h3>
            <p className="text-secondary-foreground/80 mt-3 max-w-xl mx-auto">Cohorts open quarterly. Reserve your seat and step into your next season of growth.</p>
            <a href="mailto:academy@spiritfilled.org?subject=Academy%20Enrollment" className="inline-block mt-6 bg-gradient-flame text-primary-foreground px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-105 transition-transform">Apply Now</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}