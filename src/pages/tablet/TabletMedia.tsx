import { Camera } from "lucide-react";
import TabletLayout from "./TabletLayout";

export default function TabletMedia() {
  return (
    <TabletLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-display font-black mb-6">SFM Media</h1>
        <div className="bg-background rounded-xl border border-border p-12 text-center text-muted-foreground">
          <Camera className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">Media Team</p>
          <p className="text-sm mt-1">Photography, videography, social media, and content creation coordination.</p>
        </div>
      </div>
    </TabletLayout>
  );
}