import { Heart } from "lucide-react";
import TabletLayout from "./TabletLayout";

export default function TabletFamily() {
  return (
    <TabletLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-display font-black mb-6">SFM Family</h1>
        <div className="bg-background rounded-xl border border-border p-12 text-center text-muted-foreground">
          <Heart className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">Church Family</p>
          <p className="text-sm mt-1">Stay connected with your church family. Share prayer requests, celebrations, and support one another.</p>
        </div>
      </div>
    </TabletLayout>
  );
}