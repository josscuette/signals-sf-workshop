import Link from "next/link";
import { Card, CardContent, Avatar, AvatarFallback, Badge } from "@jllt/alize-ui";
import type { Person } from "@/lib/types";

interface PersonCardProps {
  person: Person;
  showStats?: boolean;
  showLastContact?: string;
}

export function PersonCard({ person, showStats = true, showLastContact }: PersonCardProps) {
  const initials = person.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link href={`/person/${person.id}`}>
      <Card className="border-0 border-b border-border rounded-none shadow-none hover:bg-muted/50 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground truncate">
                  {person.name}
                </p>
                {person.tags.includes("Leadership") && (
                  <Badge variant="outline" className="text-xs shrink-0">
                    Leadership
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {person.title}
              </p>
              {showLastContact && (
                <p className="text-xs text-muted-foreground mt-1">
                  Last contact: {showLastContact}
                </p>
              )}
            </div>
            {showStats && (
              <div className="flex gap-4 shrink-0">
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    {person.stats.emails}
                  </p>
                  <p className="text-xs text-muted-foreground">Emails</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    {person.stats.meetings}
                  </p>
                  <p className="text-xs text-muted-foreground">Meetings</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}



