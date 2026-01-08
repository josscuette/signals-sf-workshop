import Link from "next/link";
import { Avatar, AvatarFallback } from "@jllt/alize-ui";
import type { Company } from "@/lib/types";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const initials = company.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link href={`/company/${company.id}`}>
      <div className="flex items-center gap-3 p-3 bg-background border border-stroke-subdued rounded-lg">
        {/* Company Logo - 48x48 with border */}
        <div className="shrink-0 size-12 rounded-md border border-stroke-subdued overflow-hidden bg-background flex items-center justify-center p-1">
          {company.logo ? (
            <img 
              src={company.logo} 
              alt={company.name}
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

        {/* Company name */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground leading-5 truncate">
            {company.name}
          </p>
        </div>
      </div>
    </Link>
  );
}



