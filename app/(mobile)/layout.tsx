import { FabMenu } from "@/components/signals/fab-menu";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}

      {/* FAB Menu */}
      <FabMenu
        items={[
          {
            id: "activity",
            label: "Activity",
            description: "Log a meeting, call or email",
            icon: "event_note",
          },
          {
            id: "opportunities",
            label: "Opportunities",
            description: "Create a new opportunity",
            icon: "trending_up",
          },
          {
            id: "new-company",
            label: "New company",
            description: "Add a company to track",
            icon: "business",
          },
        ]}
      />
    </div>
  );
}
