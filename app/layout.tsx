import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import "@jllt/alize-ui/dist/alize.css";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Alize App",
  description: "Built with Alize UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={sourceSans3.variable}>
      <body className="antialiased font-sans bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
