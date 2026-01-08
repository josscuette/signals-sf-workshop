"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@jllt/alize-ui";
import { MobileHeader } from "@/components/signals/mobile-header";
import { CompanyCard } from "@/components/signals/company-card";
import { recentlyVisited, searchCompanies } from "@/lib/data/mock-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const searchResults = searchCompanies(query);
  const showResults = query.trim().length > 0;

  useEffect(() => {
    // Focus input on mount with a small delay for mobile keyboard
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MobileHeader />

      <main className="flex-1">
        {/* Search Bar */}
        <div className="px-6 pt-5">
          <Input
            ref={inputRef}
            placeholder="Search company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-11 shadow-sm"
            inputMode="search"
            enterKeyHint="search"
          />
        </div>

        {/* Recently Visited or Search Results */}
        {showResults ? (
          <section className="px-6 pt-5">
            {searchResults.length > 0 ? (
              <div className="flex flex-col gap-3">
                {searchResults.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No results found for &quot;{query}&quot;
                </p>
              </div>
            )}
          </section>
        ) : (
          <section className="px-6 pt-5">
            <h2 className="pb-3 text-base text-muted-foreground leading-6">
              Recently visited
            </h2>
            <div className="flex flex-col gap-3">
              {recentlyVisited.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

