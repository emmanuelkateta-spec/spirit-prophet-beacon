import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Phone, Smartphone, Copy, Check, Heart, Gift, Sprout, HandCoins, Users, Landmark, Globe, CreditCard, Mail, Church, Music2, Building2, Accessibility, Hammer, BookOpen, GraduationCap, Bus, Utensils, Baby, ShieldCheck, HeartHandshake } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import MembershipForm from "@/components/forms/MembershipForm";
import PartnerForm from "@/components/forms/PartnerForm";
import SFMSpinWheel from "@/components/SFMSpinWheel";
import { toast } from "sonner";

const givingTypes = [
  { icon: HandCoins, title: "Tithes", text: "Honour the Lord with the firstfruits of all your increase. Bring the whole tithe into the storehouse." },
  { icon: Gift, title: "Offerings", text: "A freewill expression of love and thanksgiving — given as the Lord lays on your heart." },
  { icon: Sprout, title: "Seeds", text: "Sow into the work of the Kingdom and expect a harvest of blessing in due season." },
  { icon: Heart, title: "Charity Foundation", text: "Support the Spirit Filled Charity Foundation reaching the poor, widows and orphans." },
];

const donationCauses = [
  { icon: HeartHandshake, title: "Give to Charity", text: "Bless widows, orphans and the vulnerable through SFM Charity Foundation.", subject: "Donation — Charity Foundation" },
  { icon: Music2, title: "Church Instruments", text: "Sow towards drums, keyboards, guitars, mics and worship gear.", subject: "Donation — Church Instruments" },
  { icon: Accessibility, title: "Care for the Aged", text: "Support food, medication and visits to the elderly in our community.", subject: "Donation — The Aged" },
  { icon: Hammer, title: "Build the Church", text: "Bricks, roofing, paint and finishing for our house of worship.", subject: "Donation — Build the Church" },
  { icon: Building2, title: "1000 Buildings Project", text: "Partner with the prophetic mandate to plant 1,000 houses of God.", subject: "Donation — 1000 Buildings Project" },
  { icon: Church, title: "Church Chairs & Furnishing", text: "Sponsor seating, pulpit, lighting and altar furnishings.", subject: "Donation — Church Furnishing" },
  { icon: BookOpen, title: "Bibles & Literature", text: "Place Bibles, tracts and study material into hungry hands.", subject: "Donation — Bibles & Literature" },
  { icon: GraduationCap, title: "SFM Academy & Scholarships", text: "Train sons & daughters of fire — sponsor a student through the academy.", subject: "Donation — SFM Academy" },
  { icon: Bus, title: "Outreach & Crusades", text: "Fuel buses, sound systems and crusade logistics for soul-winning.", subject: "Donation — Outreach & Crusades" },
  { icon: Utensils, title: "Feeding Programme", text: "Provide hot meals to the hungry at our weekly feeding outreach.", subject: "Donation — Feeding Programme" },
  { icon: Baby, title: "Children & Youth", text: "Resource the next generation — Sunday School, youth camps & mentorship.", subject: "Donation — Children & Youth" },
  { icon: ShieldCheck, title: "Missions & Travel", text: "Send the prophetic word to the nations through missionary travel.", subject: "Donation — Missions & Travel" },
];

export default function Connect() {
  const loc = useLocation();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (loc.hash) document.querySelector(loc.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [loc]);

  function copy(num: string) {
    navigator.clipboard.writeText(num);
    setCopied(true);
    toast.success("Number copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Layout>
      <HeroBanner
        variant="connect"
        eyebrow="Give & Connect"
        title={<>Take the <span className="text-gradient-gold">Next Step</span></>}
        caption="Become a member, partner with the vision, or sow into the work of God."
      />

      {/* Quick contact bar */}
      <section className="py-8 sm:py-10 bg-gradient-flame text-primary-foreground">
        <div className="container grid sm:grid-cols-2 gap-5 sm:gap-6">
          <a href="tel:+260976747922" className="flex items-center gap-3 sm:gap-4 group min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 flex-shrink-0 flex items-center justify-center group-hover:bg-white/25 transition-colors">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs uppercase tracking-widest opacity-80">Church Inquiries</div>
              <div className="font-display font-bold text-lg sm:text-2xl truncate">+260 976 747 922</div>
            </div>
          </a>
          <button onClick={() => copy("0973516896")} className="flex items-center gap-3 sm:gap-4 text-left group min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 flex-shrink-0 flex items-center justify-center group-hover:bg-white/25 transition-colors">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] sm:text-xs uppercase tracking-widest opacity-80">Airtel Money — Givings</div>
              <div className="font-display font-bold text-lg sm:text-2xl flex items-center gap-2 sm:gap-3">
                <span className="truncate">0973 516 896</span>
                {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5 opacity-60 flex-shrink-0" />}
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="py-16 sm:py-24 container scroll-mt-24">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Membership</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl mb-5 sm:mb-6">Become a <span className="text-gradient-flame">Member</span></h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">You weren't created to walk alone. Plant your roots in a Spirit-filled family that prays for you, contends for you, and watches you flourish.</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Pastoral covering</li>
              <li>• Discipleship & mentorship</li>
              <li>• Service opportunities</li>
              <li>• Weekly fellowship</li>
            </ul>
          </div>
          <div className="lg:col-span-3 bg-muted p-5 sm:p-8 rounded-2xl shadow-elegant">
            <h3 className="font-display font-bold text-xl sm:text-2xl mb-5 sm:mb-6">Membership Registration</h3>
            <MembershipForm />
          </div>
        </div>
      </section>

      {/* Partner */}
      <section id="partner" className="py-16 sm:py-24 bg-muted scroll-mt-24">
        <div className="container grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-3 bg-background p-5 sm:p-8 rounded-2xl shadow-elegant order-2 lg:order-1">
            <h3 className="font-display font-bold text-xl sm:text-2xl mb-5 sm:mb-6">Ministry Partner Registration</h3>
            <PartnerForm />
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Ministry Partnership</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl mb-5 sm:mb-6">Stand With <span className="text-gradient-flame">the Vision</span></h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">Become a Ministry Partner and stand alongside Premier Prophet Epas in advancing the gospel — through prayer, giving and intentional support of the work.</p>
            <p className="text-muted-foreground">Together we are reaching nations.</p>
          </div>
        </div>
      </section>

      {/* Giving */}
      <section id="give" className="py-16 sm:py-24 container scroll-mt-24">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Giving</span>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl mt-3 mb-4">Sow into <span className="text-gradient-flame">Eternity</span></h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">"Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Cor 9:7</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {givingTypes.map((g) => (
            <div key={g.title} className="group p-7 rounded-2xl border-2 border-border hover:border-primary bg-card shadow-elegant hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-flame flex items-center justify-center mb-4 shadow-flame group-hover:animate-flame-flicker">
                <g.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{g.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{g.text}</p>
            </div>
          ))}
        </div>

        {/* Donation Causes */}
        <div id="donate" className="mb-16 scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">Donate to a Cause</span>
            <h3 className="font-display font-black text-3xl sm:text-4xl mt-3">Choose Where to <span className="text-gradient-flame">Sow</span></h3>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Tap a cause to donate. We'll send you the giving details and a thank-you note from the ministry.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {donationCauses.map((c) => (
              <a
                key={c.title}
                href={`mailto:giving@spiritfilled.org?subject=${encodeURIComponent(c.subject)}&body=${encodeURIComponent("Hello, I would like to donate towards: " + c.title + ". Please send me the giving details. Thank you and God bless.")}`}
                className="group p-6 rounded-2xl border-2 border-border bg-card hover:border-primary hover:-translate-y-1 transition-all shadow-elegant flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-flame flex items-center justify-center shadow-flame group-hover:animate-flame-flicker">
                    <c.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h4 className="font-display font-bold text-lg leading-tight">{c.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{c.text}</p>
                <span className="bg-gradient-flame text-primary-foreground text-center px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-flame group-hover:scale-105 transition-transform inline-flex items-center justify-center gap-2">
                  <Heart className="w-3.5 h-3.5" /> Donate Now
                </span>
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            Prefer mobile money? Send to <span className="font-bold text-primary">Airtel Money 0973 516 896</span> with the cause as your reference.
          </p>
        </div>

        {/* SFM Spin Wheel */}
        <div className="mb-16">
          <SFMSpinWheel />
        </div>

        {/* How to Give */}
        <div className="bg-secondary text-secondary-foreground rounded-3xl p-6 sm:p-10 lg:p-14 shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none" />
          <div className="relative">
            <h3 className="font-display font-black text-2xl sm:text-4xl mb-6 sm:mb-8 text-center">How to Give via <span className="text-gradient-gold">Airtel Money</span></h3>
            <ol className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { n: "1", title: "Dial *115#", text: "Open Airtel Money on your phone." },
                { n: "2", title: "Send Money", text: "To 0973 516 896 — Spirit Filled Ministry." },
                { n: "3", title: "Use Reference", text: "Enter Tithe / Offering / Seed / Charity." },
              ].map((s) => (
                <li key={s.n} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-flame flex items-center justify-center font-display font-black mb-4 shadow-flame">{s.n}</div>
                  <h4 className="font-display font-bold text-lg mb-1">{s.title}</h4>
                  <p className="text-sm text-secondary-foreground/70">{s.text}</p>
                </li>
              ))}
            </ol>

            <div className="bg-gradient-flame rounded-2xl p-6 sm:p-8 text-center text-primary-foreground shadow-flame">
              <div className="text-xs uppercase tracking-[0.4em] opacity-90 mb-2">Airtel Money Number</div>
              <div className="font-display font-black text-3xl sm:text-5xl mb-4 break-words">0973 516 896</div>
              <button onClick={() => copy("0973516896")} className="bg-white text-primary px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-2 hover:scale-105 transition-transform">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copied" : "Copy Number"}
              </button>
            </div>

            <p className="text-center text-sm text-secondary-foreground/70 mt-6">For inquiries about your giving, call <a href="tel:+260976747922" className="text-accent font-bold">+260 976 747 922</a></p>
          </div>
        </div>

        {/* Other Ways to Give */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <span className="text-xs tracking-[0.4em] uppercase text-primary font-bold">More Options</span>
            <h3 className="font-display font-black text-3xl sm:text-4xl mt-3">Other Ways to <span className="text-gradient-flame">Give</span></h3>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Whether you give from across town or across the world, we've made it simple to sow into the Kingdom.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "PayPal",
                text: "Give securely from anywhere in the world in your local currency.",
                cta: "Request PayPal Details",
                subject: "Request for PayPal Giving Details",
              },
              {
                icon: Landmark,
                title: "Bank Transfer",
                text: "Direct deposit into our official church bank account.",
                cta: "Request Banking Details",
                subject: "Request for Banking Details",
              },
              {
                icon: CreditCard,
                title: "Other Payment Modes",
                text: "MTN Mobile Money, Zamtel Kwacha, Western Union, MoneyGram & more.",
                cta: "Request Payment Details",
                subject: "Request for Other Payment Details",
              },
            ].map((opt) => (
              <div key={opt.title} className="p-7 rounded-2xl border-2 border-border hover:border-primary bg-card shadow-elegant transition-all flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gradient-flame flex items-center justify-center mb-4 shadow-flame">
                  <opt.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-display font-bold text-xl mb-2">{opt.title}</h4>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{opt.text}</p>
                <a
                  href={`mailto:giving@spiritfilled.org?subject=${encodeURIComponent(opt.subject)}&body=${encodeURIComponent("Hello, please send me the " + opt.title.toLowerCase() + " information so I can give. Thank you and God bless.")}`}
                  className="bg-gradient-flame text-primary-foreground text-center px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-flame hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" /> {opt.cta}
                </a>
                <a href="tel:+260976747922" className="mt-3 text-center text-xs text-muted-foreground hover:text-primary transition-colors">
                  Or call +260 976 747 922
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">For your security, our PayPal, banking and other giving details are shared on request. Tap a button above and we'll send the latest details straight to your inbox.</p>
        </div>
      </section>
    </Layout>
  );
}
