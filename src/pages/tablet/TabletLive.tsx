import { Video } from "lucide-react";
import TabletLayout from "./TabletLayout";

export default function TabletLive() {
  return (
    <TabletLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-display font-black mb-6">SFM Live Programs</h1>
        <div className="bg-background rounded-xl border border-border p-12 text-center text-muted-foreground">
          <Video className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">Live Events & Programs</p>
          <p className="text-sm mt-1">Join live ministry events, watch broadcasts, and participate in real-time programs.</p>
          <p className="text-sm mt-4">Live events will appear here when scheduled by administrators.</p>
        </div>
      </div>
    </TabletLayout>
  );
}