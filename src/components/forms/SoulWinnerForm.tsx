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
  location: z.string().trim().max(120).optional().or(z.literal("")),
  availability: z.string().max(60).optional().or(z.literal("")),
  why_join: z.string().max(1000).optional().or(z.literal("")),
});

export default function SoulWinnerForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.from("soul_winners").insert([parsed.data]);
    setLoading(false);
    if (error) { toast.error("Could not submit. Try again."); return; }
    setDone(true);
    toast.success("Welcome to the harvest team!");
    (e.target as HTMLFormElement).reset();
  }

  if (done) return <div className="p-8 rounded-2xl bg-primary/10 border border-primary/30 text-center">
    <h3 className="font-display font-bold text-2xl mb-2 text-primary">Welcome, Harvester!</h3>
    <p className="text-muted-foreground">A team leader will contact you. The fields are white unto harvest.</p>
    <button onClick={() => setDone(false)} className="mt-4 text-primary font-bold underline">Submit another</button>
  </div>;

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      <Input name="full_name" label="Full Name *" required />
      <Input name="email" type="email" label="Email *" required />
      <Input name="phone" label="Phone *" required />
      <Input name="location" label="Your Location / City" />
      <Select name="availability" label="Availability" options={["Weekdays", "Weekends", "Both", "Flexible"]} className="sm:col-span-2" />
      <Textarea name="why_join" label="Why do you want to win souls?" className="sm:col-span-2" />
      <button disabled={loading} className="sm:col-span-2 mt-2 bg-gradient-flame text-primary-foreground py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-[1.02] transition-transform disabled:opacity-60 inline-flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Join the Harvest Team
      </button>
    </form>
  );
}
