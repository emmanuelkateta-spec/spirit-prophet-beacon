import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const schema = z.object({
  full_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().max(255).optional().or(z.literal("")),
  age_group: z.string().max(30).optional().or(z.literal("")),
  how_heard: z.string().max(255).optional().or(z.literal("")),
});

export function Input({ label, className = "", ...props }: any) {
  return <label className={`block ${className}`}>
    <span className="text-xs font-bold uppercase tracking-widest text-foreground/70 mb-1.5 block">{label}</span>
    <input {...props} className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
  </label>;
}
export function Select({ label, options, className = "", ...props }: any) {
  return <label className={`block ${className}`}>
    <span className="text-xs font-bold uppercase tracking-widest text-foreground/70 mb-1.5 block">{label}</span>
    <select {...props} className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all">
      <option value="">Select...</option>
      {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
    </select>
  </label>;
}
export function Textarea({ label, className = "", ...props }: any) {
  return <label className={`block ${className}`}>
    <span className="text-xs font-bold uppercase tracking-widest text-foreground/70 mb-1.5 block">{label}</span>
    <textarea rows={4} {...props} className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" />
  </label>;
}

export default function MembershipForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.from("memberships").insert(parsed.data);
    setLoading(false);
    if (error) { toast.error("Could not register. Please try again."); return; }
    setDone(true);
    toast.success("Welcome home! Your registration was received.");
    (e.target as HTMLFormElement).reset();
  }

  if (done) {
    return <div className="p-8 rounded-2xl bg-primary/10 border border-primary/30 text-center">
      <h3 className="font-display font-bold text-2xl mb-2 text-primary">Welcome to the Family!</h3>
      <p className="text-muted-foreground">A leader will reach out shortly. Stay blessed.</p>
      <button onClick={() => setDone(false)} className="mt-4 text-primary font-bold underline">Register another</button>
    </div>;
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      <Input name="full_name" label="Full Name *" required />
      <Input name="email" type="email" label="Email *" required />
      <Input name="phone" label="Phone *" required />
      <Select name="age_group" label="Age Group" options={["Under 18", "18-25", "26-35", "36-50", "50+"]} />
      <Input name="address" label="Address" className="sm:col-span-2" />
      <Input name="how_heard" label="How did you hear about us?" className="sm:col-span-2" />
      <button disabled={loading} className="sm:col-span-2 mt-2 bg-gradient-flame text-primary-foreground py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-[1.02] transition-transform disabled:opacity-60 inline-flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Become a Member
      </button>
    </form>
  );
}
