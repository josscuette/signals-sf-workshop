import { Avatar, AvatarFallback, AvatarImage, Logo } from "@jllt/alize-ui";
import { currentUser } from "@/lib/data/mock-data";

export function MobileHeader() {
  const initials = currentUser.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <header className="flex items-center justify-between px-6 pt-3 pb-0 bg-background gap-0">
      <Logo productName="Signals" />
      <Avatar className="h-8 w-8">
        {currentUser.avatar && <AvatarImage src={currentUser.avatar} alt={currentUser.name} />}
        <AvatarFallback className="bg-muted text-muted-foreground text-xs">
          {initials}
        </AvatarFallback>
      </Avatar>
    </header>
  );
}

