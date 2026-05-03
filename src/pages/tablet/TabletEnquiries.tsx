import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MessageCircle, Send } from "lucide-react";
import TabletLayout from "./TabletLayout";

export default function TabletEnquiries() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("tablet_enquiries").insert(form);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: "Enquiry sent!" }); setForm({ name: "", email: "", phone: "", message: "" }); }
    setLoading(false);
  };

  return (
    <TabletLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-display font-black mb-6">Enquiries</h1>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <a href="tel:+260976747922" className="bg-background rounded-xl border p-4 text-center hover:shadow-elegant transition-all">
            <Phone className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="font-bold text-sm">Call Us</div>
            <div className="text-xs text-muted-foreground mt-1">+260 976 747 922</div>
          </a>
          <a href="https://wa.me/260976747922" target="_blank" rel="noreferrer" className="bg-background rounded-xl border p-4 text-center hover:shadow-elegant transition-all">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-[#25D366]" />
            <div className="font-bold text-sm">WhatsApp</div>
            <div className="text-xs text-muted-foreground mt-1">+260 976 747 922</div>
          </a>
          <a href="mailto:info@spiritfilledministry.org" className="bg-background rounded-xl border p-4 text-center hover:shadow-elegant transition-all">
            <Mail className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="font-bold text-sm">Email</div>
            <div className="text-xs text-muted-foreground mt-1 break-all">info@spiritfilledministry.org</div>
          </a>
        </div>

        <div className="text-center text-sm text-muted-foreground mb-6">
          Or email: <a href="mailto:Spiritfilledministrychurch@gmail.com" className="text-primary hover:underline">Spiritfilledministrychurch@gmail.com</a>
        </div>

        <div className="bg-background rounded-xl border p-6">
          <h2 className="font-bold text-lg mb-4">Send an Enquiry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
            <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
            <div><Label>Message</Label><Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={4} /></div>
            <Button type="submit" disabled={loading} className="w-full bg-gradient-flame text-primary-foreground"><Send className="w-4 h-4 mr-2" /> {loading ? "Sending..." : "Send Enquiry"}</Button>
          </form>
        </div>
      </div>
    </TabletLayout>
  );
}