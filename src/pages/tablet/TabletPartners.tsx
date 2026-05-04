import { Users } from "lucide-react";
import TabletLayout from "./TabletLayout";
import TabNotificationBar from "@/components/tablet/TabNotificationBar";
import TabChatGroups from "@/components/tablet/TabChatGroups";

export default function TabletPartners() {
  return (
    <TabletLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-display font-black mb-6">SFM Partners</h1>
        <TabNotificationBar tabName="SFM Partners" />
        <div className="bg-background rounded-xl border border-border p-12 text-center text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">Partner Network</p>
          <p className="text-sm mt-1">Connect with ministry partners, view partnership details, and collaborate on initiatives.</p>
          <p className="text-sm mt-4">For partnership inquiries contact: <a href="mailto:info@spiritfilledministry.org" className="text-primary hover:underline">info@spiritfilledministry.org</a></p>
        </div>
        <TabChatGroups tabName="SFM Partners" />
      </div>
    </TabletLayout>
  );
}