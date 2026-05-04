import { BookOpen } from "lucide-react";
import TabletLayout from "./TabletLayout";
import TabNotificationBar from "@/components/tablet/TabNotificationBar";
import TabChatGroups from "@/components/tablet/TabChatGroups";

export default function TabletProtocols() {
  return (
    <TabletLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-display font-black mb-6">SFM Protocols</h1>
        <TabNotificationBar tabName="SFM Protocols" />
        <div className="bg-background rounded-xl border border-border p-12 text-center text-muted-foreground">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">Church Protocols</p>
          <p className="text-sm mt-1">Access ministry protocols, guidelines, and standard operating procedures for all departments.</p>
        </div>
        <TabChatGroups tabName="SFM Protocols" />
      </div>
    </TabletLayout>
  );
}