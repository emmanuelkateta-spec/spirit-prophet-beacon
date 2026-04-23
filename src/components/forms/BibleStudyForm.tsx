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
  preferred_day: z.string().max(30).optional().or(z.literal("")),
  level: z.string().max(30).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export default function BibleStudyForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.from("bible_study_registrations").insert([parsed.data as any]);
    setLoading(false);
    if (error) { toast.error("Could not register. Try again."); return; }
    setDone(true);
    toast.success("You're enrolled in Bible Study!");
    (e.target as HTMLFormElement).reset();
  }

  if (done) return <div className="p-8 rounded-2xl bg-primary/10 border border-primary/30 text-center">
    <h3 className="font-display font-bold text-2xl mb-2 text-primary">You're Enrolled!</h3>
    <p className="text-muted-foreground">We'll send class details to your email.</p>
    <button onClick={() => setDone(false)} className="mt-4 text-primary font-bold underline">Register another</button>
  </div>;

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      <Input name="full_name" label="Full Name *" required />
      <Input name="email" type="email" label="Email *" required />
      <Input name="phone" label="Phone *" required />
      <Select name="preferred_day" label="Preferred Day" options={["Tuesday", "Wednesday", "Thursday", "Saturday", "Any"]} />
      <Select name="level" label="Level" options={["New Believer", "Growing", "Mature", "Leader"]} className="sm:col-span-2" />
      <Textarea name="message" label="Anything we should know?" className="sm:col-span-2" />
      <button disabled={loading} className="sm:col-span-2 mt-2 bg-gradient-flame text-primary-foreground py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-flame hover:scale-[1.02] transition-transform disabled:opacity-60 inline-flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Register for Bible Study
      </button>
    </form>
  );
}
