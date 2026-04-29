import Layout from "@/components/Layout";
import HeroBanner from "@/components/HeroBanner";
import { CalendarCheck, Clock, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PURPOSES = [
  "Personal Prayer & Counsel",
  "Prophetic Consultation",
  "Marriage Counseling",
  "Ministry Mentorship",
  "Business / Vision Counsel",
  "Other",
];

export default function Appointment() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    purpose: PURPOSES[0],
    notes: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date) {
      toast.error("Please fill in your name, email and preferred date.");
      return;
    }
    const subject = encodeURIComponent(`Appointment Request — ${form.purpose}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nPreferred Date: ${form.date}\nPreferred Time: ${form.time}\nPurpose: ${form.purpose}\n\nNotes:\n${form.notes}`
    );
    window.location.href = `mailto:info@spiritfilledministry.org?subject=${subject}&body=${body}`;
    toast.success("Opening your email — your request will be sent to the Prophet's office.");
  };

  return (
    <Layout>
      <HeroBanner
        variant="connect"
        eyebrow="Book an Appointment"
        title={<>Meet the <span className="text-gradient-gold">Man of God</span></>}
        caption="Request a personal session with Premier Prophet Epas — for prayer, counsel or prophetic ministry."
      />

      <section className="py-20 container">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 items-start">
          <div className="space-y-6">
            <div className="rounded-2xl bg-card border border-border p-6 shadow-elegant">
              <CalendarCheck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-display font-bold text-xl">How It Works</h3>
              <ol className="mt-4 space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                <li>Submit your request with your preferred date and purpose.</li>
                <li>The Prophet's office will review and confirm availability.</li>
                <li>You'll receive a confirmation with location & meeting details.</li>
                <li>Come prepared in prayer and expectation.</li>
              </ol>
            </div>

            <div className="rounded-2xl bg-secondary text-secondary-foreground p-6 shadow-elegant">
              <h3 className="font-display font-bold text-xl text-accent mb-4">Office Hours</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-primary" /> Tue – Fri · 10:00 AM – 4:00 PM</li>
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> Spirit Filled Ministry HQ</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> +260 976 747 922</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> info@spiritfilledministry.org</li>
              </ul>
            </div>
          </div>

          <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-8 shadow-elegant space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-primary font-bold">Full Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary" placeholder="Your full name" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-primary font-bold">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-primary font-bold">Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary" placeholder="+260 ..." />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-primary font-bold">Purpose</label>
                <select value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} className="mt-2 w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary">
                  {PURPOSES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-primary font-bold">Preferred Date *</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-2 w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-primary font-bold">Preferred Time</label>
                <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="mt-2 w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-primary font-bold">Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={5} className="mt-2 w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary" placeholder="Share anything that will help us prepare for your session." />
            </div>
            <button type="submit" className="w-full bg-gradient-flame text-primary-foreground py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-[1.02] transition-transform">Request Appointment</button>
            <p className="text-xs text-muted-foreground text-center">Submissions go directly to the Prophet's office. You will be contacted to confirm.</p>
          </form>
        </div>
      </section>
    </Layout>
  );
}