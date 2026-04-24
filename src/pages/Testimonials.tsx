import Layout from "@/components/Layout";
import HeroBanner from "@/components/HeroBanner";
import { Quote, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STORIES = [
  { name: "Sister Mwila", location: "Lusaka, Zambia", category: "Healing", text: "After years of chronic pain, I was prayed for during a Sunday service and felt fire move through my body. I have not had pain since. To God be the glory!" },
  { name: "Brother Daniel", location: "Kitwe, Zambia", category: "Breakthrough", text: "I had been jobless for two years. After a prophetic word from Premier Prophet Epas, within three weeks I received not one, but two job offers." },
  { name: "Mama Chanda", location: "Ndola, Zambia", category: "Family Restoration", text: "My marriage was on the brink of collapse. Through counseling and prayer at SFM, God restored what the enemy tried to destroy." },
  { name: "Sister Joy", location: "Johannesburg, SA", category: "Salvation", text: "I walked into a SFM crusade just curious. I left a born-again, fire-filled daughter of God. My whole family has since followed Christ." },
  { name: "Brother Kelvin", location: "London, UK", category: "Deliverance", text: "I struggled with addiction for over a decade. One night of prayer at the Holy Ghost service, and chains fell off. I am free." },
  { name: "Pastor Thandi", location: "Harare, Zimbabwe", category: "Calling", text: "The mentorship program at SFM unlocked the call of God on my life. I now pastor a flourishing church in my city." },
];

export default function Testimonials() {
  const [form, setForm] = useState({ name: "", location: "", category: "Healing", text: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) {
      toast.error("Please share your name and testimony.");
      return;
    }
    toast.success("Praise God! Your testimony has been received.");
    setForm({ name: "", location: "", category: "Healing", text: "" });
  };

  return (
    <Layout>
      <HeroBanner
        variant="connect"
        eyebrow="Testimonials"
        title={<>Tasting the <span className="text-gradient-gold">Goodness of God</span></>}
        caption="Real stories from real members. The same God who did it for them will do it for you."
      />

      <section className="py-20 container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORIES.map((s, i) => (
            <article key={s.name + i} className="group rounded-2xl bg-card border border-border p-7 shadow-elegant hover:shadow-flame hover:-translate-y-1 transition-all duration-300 animate-fade-in-up flex flex-col" style={{ animationDelay: `${i * 80}ms` }}>
              <Quote className="w-8 h-8 text-primary/60" />
              <p className="mt-4 text-foreground/90 leading-relaxed flex-1">"{s.text}"</p>
              <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                <div>
                  <div className="font-display font-bold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.location}</div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">{s.category}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <Sparkles className="w-10 h-10 text-primary mb-4" />
            <h2 className="font-display font-black text-3xl sm:text-4xl mb-4">Share Your <span className="text-gradient-flame">Testimony</span></h2>
            <p className="text-muted-foreground leading-relaxed">"They overcame him by the blood of the Lamb and by the word of their testimony." Your story might be the very breakthrough someone else is praying for. Share it — and let God be glorified.</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3"><Heart className="w-4 h-4 text-primary" /> Encourage someone today</li>
              <li className="flex items-center gap-3"><Heart className="w-4 h-4 text-primary" /> Glorify God publicly</li>
              <li className="flex items-center gap-3"><Heart className="w-4 h-4 text-primary" /> Stir faith for the next miracle</li>
            </ul>
          </div>

          <form onSubmit={submit} className="bg-secondary text-secondary-foreground p-8 rounded-2xl shadow-elegant space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-accent font-bold">Your Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-secondary-foreground placeholder-white/40 focus:outline-none focus:border-accent" placeholder="Full name" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-accent font-bold">Location</label>
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-2 w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-secondary-foreground placeholder-white/40 focus:outline-none focus:border-accent" placeholder="City, Country" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-accent font-bold">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-2 w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-secondary-foreground focus:outline-none focus:border-accent">
                {["Healing", "Breakthrough", "Salvation", "Deliverance", "Family Restoration", "Calling", "Other"].map((o) => (
                  <option key={o} value={o} className="text-foreground">{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-accent font-bold">Your Testimony</label>
              <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={6} className="mt-2 w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-secondary-foreground placeholder-white/40 focus:outline-none focus:border-accent" placeholder="Share what God has done..." />
            </div>
            <button type="submit" className="w-full bg-gradient-flame text-primary-foreground py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-[1.02] transition-transform">Submit Testimony</button>
          </form>
        </div>
      </section>
    </Layout>
  );
}