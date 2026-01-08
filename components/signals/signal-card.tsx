import { Avatar, AvatarFallback, AvatarImage } from "@jllt/alize-ui";
import type { Signal } from "@/lib/types";

interface SignalCardProps {
  signal: Signal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const initials = signal.company.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-start gap-2 p-3 bg-background border border-stroke-subdued rounded-lg">
      {/* Left content - logo + text */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Company Logo - 48x48 with border */}
        <div className="shrink-0 size-12 rounded-md border border-stroke-subdued overflow-hidden bg-background flex items-center justify-center p-1">
          {signal.company.logo ? (
            <img 
              src={signal.company.logo} 
              alt={signal.company.name}
              className="size-full object-contain"
            />
          ) : (
            <Avatar className="size-full rounded-none">
              <AvatarFallback className="bg-muted text-muted-foreground text-sm rounded-none">
                {initials}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <p className="text-sm text-foreground leading-5">{signal.title}</p>
          <p className="text-sm text-secondary-foreground leading-5">{signal.description}</p>
        </div>
      </div>

      {/* Timestamp */}
      <span className="text-xs text-secondary-foreground leading-4 shrink-0">
        {signal.timestamp}
      </span>
    </div>
  );
}

