import { UserCheck } from "lucide-react";
import TabletLayout from "./TabletLayout";

export default function TabletUshers() {
  return (
    <TabletLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-display font-black mb-6">SFM Ushers</h1>
        <div className="bg-background rounded-xl border border-border p-12 text-center text-muted-foreground">
          <UserCheck className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">Usher Coordination</p>
          <p className="text-sm mt-1">Manage usher schedules, assignments, and coordination for services and events.</p>
        </div>
      </div>
    </TabletLayout>
  );
}