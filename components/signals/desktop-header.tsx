"use client";

import { Input, Avatar, AvatarFallback, AvatarImage, Button, MaterialSymbol } from "@jllt/alize-ui";
import { currentUser } from "@/lib/data/mock-data";

interface DesktopHeaderProps {
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export function DesktopHeader({ searchPlaceholder = "Search companies", onSearch }: DesktopHeaderProps) {
  const initials = currentUser.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <header className="h-16 bg-muted flex items-center justify-between px-6 gap-6">
      {/* Left spacer for balance */}
      <div className="w-40" />

      {/* Center - Search Bar */}
      <div className="flex-1 max-w-lg">
        <Input
          placeholder={searchPlaceholder}
          className="w-full h-10"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>

      {/* Right - Actions */}
      <div className="w-40 flex items-center justify-end gap-3">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MaterialSymbol name="notifications" size={20} />
        </Button>
        <Avatar className="h-8 w-8">
          {currentUser.avatar && <AvatarImage src={currentUser.avatar} alt={currentUser.name} />}
          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

