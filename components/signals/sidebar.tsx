"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo, MaterialSymbol } from "@jllt/alize-ui";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "home", href: "/" },
  { id: "followed", label: "Followed companies", icon: "bookmark", href: "/followed" },
  { id: "working", label: "Working deals", icon: "work", href: "/working" },
  { id: "performance", label: "Performance", icon: "analytics", href: "/performance" },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-60 h-screen bg-muted flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-4">
        <Logo productName="Signals" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm leading-5 transition-colors ${
                    active
                      ? "bg-level1 text-foreground font-medium"
                      : "text-muted-foreground hover:bg-level1/50 hover:text-foreground"
                  }`}
                >
                  <MaterialSymbol
                    name={item.icon}
                    size={20}
                    className={active ? "text-foreground" : "text-muted-foreground"}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

