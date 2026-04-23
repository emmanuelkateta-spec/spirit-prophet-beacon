import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Input, Select, Textarea } from "./MembershipForm";

const schema = z.object({
  full_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  partnership_type: z.string().max(50).optional().or(z.literal("")),
  monthly_pledge: z.string().max(50).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export default function PartnerForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.from("partners").insert([parsed.data]);
    setLoading(false);
    if (error) { toast.error("Could not submit. Try again."); return; }
    setDone(true);
    toast.success("Thank you for partnering with the vision!");
    (e.target as HTMLFormElement).reset();
  }

  if (done) return <div className="p-8 rounded-2xl bg-accent/20 border border-accent/40 text-center">
    <h3 className="font-display font-bold text-2xl mb-2">You're a Partner!</h3>
    <p className="text-muted-foreground">Thank you. Our partnership team will be in touch.</p>
    <button onClick={() => setDone(false)} className="mt-4 text-primary font-bold underline">Submit another</button>
  </div>;

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      <Input name="full_name" label="Full Name *" required />
      <Input name="email" type="email" label="Email *" required />
      <Input name="phone" label="Phone *" required />
      <Input name="country" label="Country" />
      <Select name="partnership_type" label="Partnership Type" options={["Prayer Partner", "Monthly Giver", "Project Sponsor", "Crusade Sponsor", "Other"]} />
      <Input name="monthly_pledge" label="Monthly Pledge (optional)" placeholder="e.g. K200" />
      <Textarea name="message" label="Your message" className="sm:col-span-2" />
      <button disabled={loading} className="sm:col-span-2 mt-2 bg-gradient-flame text-primary-foreground py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-[1.02] transition-transform disabled:opacity-60 inline-flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Become a Ministry Partner
      </button>
    </form>
  );
}
