import { FabMenu } from "@/components/signals/fab-menu";
import { DesktopShell } from "@/components/signals/desktop-shell";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Mobile Layout - hidden on md and up */}
      <div className="md:hidden min-h-screen bg-background">
        {children}

        {/* FAB Menu - mobile only */}
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

      {/* Desktop Layout - visible on md and up */}
      <DesktopShell>
        {children}
      </DesktopShell>
    </>
  );
}
