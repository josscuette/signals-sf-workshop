import Link from "next/link";
import { Input } from "@jllt/alize-ui";
import { MobileHeader } from "@/components/signals/mobile-header";
import { SignalCard } from "@/components/signals/signal-card";
import { signals } from "@/lib/data/mock-data";

export default function HomePage() {
  return (
    <>
      {/* ===== MOBILE VERSION ===== */}
      <div className="flex flex-col min-h-screen bg-background md:hidden">
        <MobileHeader />

        {/* Main container */}
        <main className="flex-1 px-6">
          {/* Top part - gap 20px between sections */}
          <div className="flex flex-col gap-5">
            {/* Search Bar */}
            <div className="pt-5">
              <Link href="/search">
                <Input
                  placeholder="Search company"
                  className="w-full h-11 pointer-events-none shadow-sm"
                  readOnly
                />
              </Link>
            </div>

            {/* Signals Updates - gap 12px */}
            <section className="flex flex-col gap-3">
              <h2 className="text-base text-muted-foreground leading-6">
                Signals updates
              </h2>
              <div className="flex flex-col gap-3">
                {signals.map((signal) => (
                  <SignalCard key={signal.id} signal={signal} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* ===== DESKTOP VERSION ===== */}
      <div className="hidden md:block p-6">
        {/* Signals Updates - grid layout for desktop */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            Signals updates
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {signals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
