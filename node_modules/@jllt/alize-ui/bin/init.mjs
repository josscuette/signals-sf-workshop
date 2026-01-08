#!/usr/bin/env node

/**
 * Alize UI - Interactive Installation Script
 * All options ON by default (opt-out approach).
 */

import { execSync, spawn } from "child_process";
import fs from "fs";
import path from "path";
import { checkbox, confirm } from "@inquirer/prompts";

// Colors
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
};

// Dependency groups
const groups = [
  {
    name: "Core UI",
    value: "core",
    description: "Radix UI primitives (dialogs, menus, tooltips...)",
    packages: [
      "@radix-ui/react-accordion", "@radix-ui/react-alert-dialog", "@radix-ui/react-aspect-ratio",
      "@radix-ui/react-avatar", "@radix-ui/react-checkbox", "@radix-ui/react-collapsible",
      "@radix-ui/react-context-menu", "@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-hover-card", "@radix-ui/react-label", "@radix-ui/react-menubar",
      "@radix-ui/react-navigation-menu", "@radix-ui/react-popover", "@radix-ui/react-progress",
      "@radix-ui/react-radio-group", "@radix-ui/react-scroll-area", "@radix-ui/react-select",
      "@radix-ui/react-separator", "@radix-ui/react-slider", "@radix-ui/react-slot",
      "@radix-ui/react-switch", "@radix-ui/react-tabs", "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group", "@radix-ui/react-tooltip", "lucide-react",
    ],
  },
  { 
    name: "Forms", 
    value: "forms",
    description: "Form handling with validation",
    packages: ["react-hook-form", "@hookform/resolvers", "zod"] 
  },
  { 
    name: "Charts", 
    value: "charts",
    description: "Highcharts data visualization",
    packages: ["highcharts", "highcharts-react-official"] 
  },
  { 
    name: "Calendar", 
    value: "calendar",
    description: "Date picker components",
    packages: ["date-fns", "react-day-picker"] 
  },
  { 
    name: "Advanced UI", 
    value: "advanced",
    description: "Carousel, drawers, toasts, command palette",
    packages: ["embla-carousel-react", "react-resizable-panels", "vaul", "sonner", "cmdk", "input-otp"] 
  },
  { 
    name: "Theming", 
    value: "theming",
    description: "Dark/light mode support",
    packages: ["next-themes"] 
  },
];

const basePackages = [
  "github:Josselin-Cuette_JLLT/alize-ui", 
  "react", 
  "react-dom", 
  "next",
  "tailwindcss",
  "@tailwindcss/postcss",
  "typescript",
  "@types/react",
  "@types/react-dom",
  "@types/node",
];

function detectPM() {
  try { execSync("pnpm --version", { stdio: "ignore" }); return "pnpm"; } catch {}
  try { execSync("yarn --version", { stdio: "ignore" }); return "yarn"; } catch {}
  return "npm";
}

function ensurePackageJson() {
  const pkgPath = path.join(process.cwd(), "package.json");
  if (!fs.existsSync(pkgPath)) {
    console.log(`\n${c.yellow}Creating package.json...${c.reset}`);
    execSync("npm init -y", { stdio: "ignore" });
    console.log(`${c.green}✓${c.reset} Created package.json`);
  }
}

function addNextScripts() {
  const pkgPath = path.join(process.cwd(), "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    let modified = false;
    
    // Add type: module for ESM support
    if (pkg.type !== "module") {
      pkg.type = "module";
      modified = true;
    }
    
    // Add Next.js scripts
    if (pkg.scripts?.dev !== "next dev") {
      pkg.scripts = {
        ...pkg.scripts,
        dev: "next dev",
        "dev:devtools": "NEXT_PUBLIC_ALIZE_DEVTOOLS=true next dev",
        build: "next build",
        start: "next start",
        lint: "next lint",
      };
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
      console.log(`${c.green}✓${c.reset} Updated package.json (ESM + Next.js scripts)`);
    }
  }
}

function createProjectFiles() {
  const cwd = process.cwd();
  
  // Create app directory if it doesn't exist
  const appDir = path.join(cwd, "app");
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
  }
  
  // Create providers.tsx (Client Component for context providers)
  const providersPath = path.join(appDir, "providers.tsx");
  if (!fs.existsSync(providersPath)) {
    const providersContent = `"use client";

import { ThemeProvider } from "next-themes";
import { MaterialSymbolsProvider, AlizeDevToolsProvider } from "alize-ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MaterialSymbolsProvider />
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem 
        value={{ light: "theme-light", dark: "theme-dark" }}
      >
        {/* 
          Alizé DevTools - Component Inspector
          Activation: npm run dev:devtools OR add ?alize-devtools=true to URL
          Toggle: Ctrl+Shift+A (Cmd+Shift+A on Mac)
        */}
        <AlizeDevToolsProvider>
        {children}
        </AlizeDevToolsProvider>
      </ThemeProvider>
    </>
  );
}
`;
    fs.writeFileSync(providersPath, providersContent);
    console.log(`${c.green}✓${c.reset} Created app/providers.tsx`);
  }

  // Create layout.tsx (Server Component)
  const layoutPath = path.join(appDir, "layout.tsx");
  if (!fs.existsSync(layoutPath)) {
    const layoutContent = `import type { Metadata } from "next";
import { Providers } from "./providers";
import "alize-ui/dist/alize.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
`;
    fs.writeFileSync(layoutPath, layoutContent);
    console.log(`${c.green}✓${c.reset} Created app/layout.tsx`);
  }
  
  // Create page.tsx with demo components
  const pagePath = path.join(appDir, "page.tsx");
  if (!fs.existsSync(pagePath)) {
    const pageContent = `"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent,
  Badge,
  Input,
  Checkbox,
  Switch,
  MaterialSymbol,
} from "alize-ui";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering theme UI after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to Alize UI
          </h1>
          <p className="text-muted-foreground">
            Your project is ready! Start building beautiful interfaces.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MaterialSymbol name="widgets" size={20} weight={300} />
              Components
            </CardTitle>
            <CardDescription>
              Edit <code className="bg-muted px-1 rounded text-sm">app/page.tsx</code> to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">Buttons</p>
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Badges</p>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Form Controls</p>
              <div className="flex flex-col gap-4 max-w-sm">
                <Input placeholder="Type something..." />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox /> Remember me
                  </label>
                  {mounted && (
                    <label className="flex items-center gap-2 text-sm">
                      <Switch 
                        checked={theme === "dark"} 
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} 
                      /> 
                      Dark mode
                    </label>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Docs: <a href="https://github.com/Josselin-Cuette_JLLT/alize-ui" target="_blank" className="text-primary underline">github.com/Josselin-Cuette_JLLT/alize-ui</a>
        </p>
      </div>
    </main>
  );
}
`;
    fs.writeFileSync(pagePath, pageContent);
    console.log(`${c.green}✓${c.reset} Created app/page.tsx with demo components`);
  }
  
  // Create next.config.ts if it doesn't exist
  const nextConfigPath = path.join(cwd, "next.config.ts");
  if (!fs.existsSync(nextConfigPath)) {
    const nextConfigContent = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["alize-ui"],
};

export default nextConfig;
`;
    fs.writeFileSync(nextConfigPath, nextConfigContent);
    console.log(`${c.green}✓${c.reset} Created next.config.ts`);
  }
  
  // Create postcss.config.mjs for Tailwind v4
  const postcssPath = path.join(cwd, "postcss.config.mjs");
  if (!fs.existsSync(postcssPath)) {
    const postcssContent = `export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
`;
    fs.writeFileSync(postcssPath, postcssContent);
    console.log(`${c.green}✓${c.reset} Created postcss.config.mjs`);
  }
  
  // Create tsconfig.json if it doesn't exist
  const tsconfigPath = path.join(cwd, "tsconfig.json");
  if (!fs.existsSync(tsconfigPath)) {
    const tsconfigContent = {
      compilerOptions: {
        target: "ES2017",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: { "@/*": ["./*"] }
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"]
    };
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfigContent, null, 2));
    console.log(`${c.green}✓${c.reset} Created tsconfig.json`);
  }
}

async function install(packages) {
  const pm = detectPM();
  const cmd = pm === "npm" ? "install" : "add";
  console.log(`\n${c.cyan}Installing with ${pm}...${c.reset}\n`);
  
  return new Promise((resolve) => {
    const child = spawn(pm, [cmd, ...packages], { stdio: "inherit", shell: true });
    child.on("close", (code) => resolve(code === 0));
  });
}

async function main() {
  console.log(`\n${c.cyan}${c.bold}  ╭──────────────────────────────────────╮${c.reset}`);
  console.log(`${c.cyan}${c.bold}  │${c.reset}       ${c.magenta}${c.bold}Alize UI${c.reset} - Installation      ${c.cyan}${c.bold}│${c.reset}`);
  console.log(`${c.cyan}${c.bold}  ╰──────────────────────────────────────╯${c.reset}\n`);
  
  // Use inquirer checkbox with all checked by default
  const selected = await checkbox({
    message: "Select dependencies to install (all selected by default):",
    choices: groups.map(g => ({
      name: `${g.name} — ${g.description}`,
      value: g.value,
      checked: true,
    })),
    instructions: `\n${c.dim}  ↑↓ navigate  •  space toggle  •  enter confirm${c.reset}\n`,
  });
  
  // Build package list
  const packages = [...basePackages];
  selected.forEach(value => {
    const group = groups.find(g => g.value === value);
    if (group) packages.push(...group.packages);
  });
  
  // Summary
  console.log(`\n${c.bold}Installing:${c.reset}`);
  if (selected.length === groups.length) {
    console.log(`  ${c.green}✓${c.reset} Full installation (all dependencies)`);
  } else {
    groups.forEach(g => {
      if (selected.includes(g.value)) {
        console.log(`  ${c.green}✓${c.reset} ${g.name}`);
      } else {
        console.log(`  ${c.dim}○ ${g.name} (skipped)${c.reset}`);
      }
    });
  }
  
  // Ensure package.json and install
  ensurePackageJson();
  const success = await install(packages);
  
  if (success) {
    // Create project files and add scripts
    console.log(`\n${c.bold}Setting up project files...${c.reset}`);
    addNextScripts();
    createProjectFiles();
    
    console.log(`\n${c.green}${c.bold}✓ Done!${c.reset}\n`);
    
    console.log(`${c.cyan}${c.bold}  ╭──────────────────────────────────────╮${c.reset}`);
    console.log(`${c.cyan}${c.bold}  │${c.reset}            ${c.bold}Getting Started${c.reset}            ${c.cyan}${c.bold}│${c.reset}`);
    console.log(`${c.cyan}${c.bold}  ╰──────────────────────────────────────╯${c.reset}\n`);
    
    console.log(`${c.bold}Start your dev server:${c.reset}`);
    console.log(`  ${c.green}$${c.reset} ${c.cyan}npm run dev${c.reset}\n`);
    
    console.log(`${c.bold}Start with Alizé DevTools ${c.dim}(component inspector)${c.reset}${c.bold}:${c.reset}`);
    console.log(`  ${c.green}$${c.reset} ${c.cyan}npm run dev:devtools${c.reset}\n`);
    
    console.log(`${c.dim}┌─────────────────────────────────────────────────────────┐${c.reset}`);
    console.log(`${c.dim}│${c.reset} ${c.magenta}Alizé DevTools${c.reset} helps identify which components use    ${c.dim}│${c.reset}`);
    console.log(`${c.dim}│${c.reset} the Alizé design system vs custom implementations.     ${c.dim}│${c.reset}`);
    console.log(`${c.dim}│${c.reset}                                                         ${c.dim}│${c.reset}`);
    console.log(`${c.dim}│${c.reset} ${c.bold}Activation:${c.reset}                                           ${c.dim}│${c.reset}`);
    console.log(`${c.dim}│${c.reset}   • ${c.cyan}npm run dev:devtools${c.reset}                              ${c.dim}│${c.reset}`);
    console.log(`${c.dim}│${c.reset}   • Add ${c.yellow}?alize-devtools=true${c.reset} to any URL              ${c.dim}│${c.reset}`);
    console.log(`${c.dim}│${c.reset}                                                         ${c.dim}│${c.reset}`);
    console.log(`${c.dim}│${c.reset} ${c.bold}Toggle:${c.reset} ${c.yellow}⌘/Ctrl + Shift + A${c.reset}                           ${c.dim}│${c.reset}`);
    console.log(`${c.dim}└─────────────────────────────────────────────────────────┘${c.reset}\n`);
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
