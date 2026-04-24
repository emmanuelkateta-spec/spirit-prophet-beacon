import Layout from "@/components/Layout";
import HeroBanner from "@/components/HeroBanner";
import { Globe2, MapPin, Users } from "lucide-react";
import { useMemo, useState } from "react";

type Country = { name: string; code: string; region: string; members: number; flag: string };

const COUNTRIES: Country[] = [
  { name: "Zambia", code: "ZM", region: "Africa", members: 2450, flag: "🇿🇲" },
  { name: "South Africa", code: "ZA", region: "Africa", members: 312, flag: "🇿🇦" },
  { name: "Zimbabwe", code: "ZW", region: "Africa", members: 187, flag: "🇿🇼" },
  { name: "Kenya", code: "KE", region: "Africa", members: 142, flag: "🇰🇪" },
  { name: "Nigeria", code: "NG", region: "Africa", members: 226, flag: "🇳🇬" },
  { name: "Tanzania", code: "TZ", region: "Africa", members: 98, flag: "🇹🇿" },
  { name: "Malawi", code: "MW", region: "Africa", members: 134, flag: "🇲🇼" },
  { name: "Botswana", code: "BW", region: "Africa", members: 76, flag: "🇧🇼" },
  { name: "Namibia", code: "NA", region: "Africa", members: 54, flag: "🇳🇦" },
  { name: "DR Congo", code: "CD", region: "Africa", members: 88, flag: "🇨🇩" },
  { name: "Ghana", code: "GH", region: "Africa", members: 64, flag: "🇬🇭" },
  { name: "Uganda", code: "UG", region: "Africa", members: 71, flag: "🇺🇬" },
  { name: "United Kingdom", code: "GB", region: "Europe", members: 168, flag: "🇬🇧" },
  { name: "Germany", code: "DE", region: "Europe", members: 47, flag: "🇩🇪" },
  { name: "Netherlands", code: "NL", region: "Europe", members: 32, flag: "🇳🇱" },
  { name: "Sweden", code: "SE", region: "Europe", members: 21, flag: "🇸🇪" },
  { name: "Ireland", code: "IE", region: "Europe", members: 18, flag: "🇮🇪" },
  { name: "United States", code: "US", region: "Americas", members: 245, flag: "🇺🇸" },
  { name: "Canada", code: "CA", region: "Americas", members: 92, flag: "🇨🇦" },
  { name: "Brazil", code: "BR", region: "Americas", members: 38, flag: "🇧🇷" },
  { name: "United Arab Emirates", code: "AE", region: "Asia & Middle East", members: 56, flag: "🇦🇪" },
  { name: "India", code: "IN", region: "Asia & Middle East", members: 41, flag: "🇮🇳" },
  { name: "China", code: "CN", region: "Asia & Middle East", members: 22, flag: "🇨🇳" },
  { name: "Australia", code: "AU", region: "Oceania", members: 63, flag: "🇦🇺" },
  { name: "New Zealand", code: "NZ", region: "Oceania", members: 27, flag: "🇳🇿" },
];

const REGIONS = ["All", "Africa", "Europe", "Americas", "Asia & Middle East", "Oceania"];

export default function GlobalMap() {
  const [region, setRegion] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return COUNTRIES.filter((c) =>
      (region === "All" || c.region === region) &&
      c.name.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => b.members - a.members);
  }, [region, search]);

  const totalMembers = COUNTRIES.reduce((s, c) => s + c.members, 0);

  return (
    <Layout>
      <HeroBanner
        variant="gallery"
        eyebrow="SFM Global Map"
        title={<>One Family, <span className="text-gradient-gold">Many Nations</span></>}
        caption="See where the SFM family is around the world. From Lusaka to the nations — the fire is spreading."
      />

      <section className="py-20 container">
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: Globe2, label: "Countries", value: COUNTRIES.length.toString() },
            { icon: Users, label: "Members Worldwide", value: totalMembers.toLocaleString() },
            { icon: MapPin, label: "Regions", value: (REGIONS.length - 1).toString() },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-card border border-border p-6 shadow-elegant flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-flame text-primary-foreground flex items-center justify-center shadow-flame"><s.icon className="w-5 h-5" /></div>
              <div>
                <div className="text-2xl font-display font-black">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="search"
            placeholder="Search a country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-card border border-border rounded-full px-5 py-3 text-sm focus:outline-none focus:border-primary"
          />
          <div className="flex gap-2 flex-wrap">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${region === r ? "bg-gradient-flame text-primary-foreground shadow-flame" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((c, i) => (
            <div key={c.code} className="rounded-2xl bg-card border border-border p-5 shadow-elegant hover:shadow-flame hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 30}ms` }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden>{c.flag}</span>
                <div className="min-w-0">
                  <h3 className="font-display font-bold truncate">{c.name}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">{c.region}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Members</span>
                <span className="font-display font-black text-primary">{c.members.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No countries match your search yet.</p>
        )}

        <div className="mt-16 rounded-3xl bg-secondary text-secondary-foreground p-10 text-center">
          <h3 className="font-display font-black text-2xl sm:text-3xl">Are you in a country not listed?</h3>
          <p className="text-secondary-foreground/80 mt-2 max-w-xl mx-auto">Let us know — we want to put your nation on the SFM map.</p>
          <a href="mailto:global@spiritfilled.org?subject=Add%20My%20Country%20to%20SFM%20Map" className="inline-block mt-6 bg-gradient-flame text-primary-foreground px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-105 transition-transform">Add My Country</a>
        </div>
      </section>
    </Layout>
  );
}