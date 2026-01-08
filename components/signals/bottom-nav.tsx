"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Button,
  MaterialSymbol,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@jllt/alize-ui";
import type { BottomNavItem } from "@/lib/types";

interface NavItem {
  id: BottomNavItem;
  label: string;
  icon: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "home", href: "/" },
  { id: "search", label: "Search", icon: "search", href: "/search" },
  { id: "add", label: "Add", icon: "add", href: "#" },
  { id: "following", label: "Following", icon: "bookmark", href: "/following" },
  { id: "profile", label: "Profile", icon: "person", href: "/profile" },
];

interface BottomNavProps {
  onActivityClick?: () => void;
}

export function BottomNav({ onActivityClick }: BottomNavProps) {
  const pathname = usePathname();
  const [fabOpen, setFabOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const active = isActive(item.href);

          if (item.id === "add") {
            return (
              <Popover key={item.id} open={fabOpen} onOpenChange={setFabOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="default"
                    size="icon"
                    className="rounded-full"
                    aria-label={item.label}
                  >
                    <MaterialSymbol name={item.icon} size={24} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-52 p-2"
                  align="center"
                  side="top"
                  sideOffset={8}
                >
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setFabOpen(false);
                        onActivityClick?.();
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-md transition-colors text-left w-full"
                    >
                      <MaterialSymbol
                        name="event"
                        size={20}
                        className="text-muted-foreground"
                      />
                      <div>
                        <p className="font-medium">Activity</p>
                        <p className="text-xs text-muted-foreground">
                          Lorem ipsum
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={() => setFabOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-md transition-colors text-left w-full"
                    >
                      <MaterialSymbol
                        name="trending_up"
                        size={20}
                        className="text-muted-foreground"
                      />
                      <div>
                        <p className="font-medium">Opportunities</p>
                        <p className="text-xs text-muted-foreground">
                          Lorem ipsum
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={() => setFabOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-md transition-colors text-left w-full"
                    >
                      <MaterialSymbol
                        name="domain_add"
                        size={20}
                        className="text-muted-foreground"
                      />
                      <div>
                        <p className="font-medium">New company</p>
                        <p className="text-xs text-muted-foreground">
                          Lorem ipsum
                        </p>
                      </div>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-1"
            >
              <MaterialSymbol
                name={item.icon}
                size={24}
                fill={active ? 1 : 0}
                className={active ? "text-foreground" : "text-muted-foreground"}
              />
              <span
                className={`text-xs ${
                  active ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
