import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Clock } from "lucide-react";
import TabletLayout from "./TabletLayout";

export default function TabletEvents() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("tablet_events").select("*").order("event_date", { ascending: true });
      setEvents(data || []);
    })();
  }, []);

  return (
    <TabletLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-display font-black mb-6">SFM Events</h1>
        {events.length === 0 ? (
          <div className="bg-background rounded-xl border border-border p-12 text-center text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No upcoming events</p>
            <p className="text-sm mt-1">Check back soon for new events!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {events.map(ev => (
              <div key={ev.id} className="bg-background rounded-xl border border-border overflow-hidden flex flex-col sm:flex-row">
                {ev.image_url && <img src={ev.image_url} alt={ev.title} className="w-full sm:w-48 h-40 object-cover" />}
                <div className="p-5 flex-1">
                  <h3 className="font-bold text-lg">{ev.title}</h3>
                  {ev.description && <p className="text-sm text-muted-foreground mt-1">{ev.description}</p>}
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(ev.event_date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(ev.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {ev.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {ev.location}</span>}
                  </div>
                  {ev.category && <span className="inline-block mt-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{ev.category}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </TabletLayout>
  );
}