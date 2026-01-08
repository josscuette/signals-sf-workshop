import { Sidebar } from "./sidebar";
import { DesktopHeader } from "./desktop-header";

interface DesktopShellProps {
  children: React.ReactNode;
}

export function DesktopShell({ children }: DesktopShellProps) {
  return (
    <div className="hidden md:flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DesktopHeader />
        <main className="flex-1 overflow-auto bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
}

