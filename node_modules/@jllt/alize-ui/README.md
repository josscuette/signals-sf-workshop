# Alize - Component Library

A comprehensive React component library based on [shadcn/ui](https://ui.shadcn.com) with custom design tokens and Material Symbols icons.

## Features

- 🎨 **Custom Design Tokens** - Semantic color system with light/dark mode support
- 🎯 **Material Symbols** - Consistent icon system using Material Symbols font
- 📚 **Comprehensive Documentation** - Interactive component showcase with usage examples
- 🎭 **Fully Customizable** - Built on Radix UI primitives for maximum flexibility
- ⚡ **TypeScript** - Full type safety out of the box
- 🎨 **Tailwind CSS v4** - Modern styling with CSS variables
- 🔒 **Security & Validation** - Zod validation schemas and sanitization utilities
- 🛡️ **Error Handling** - Comprehensive error handling patterns and utilities
- ♿ **Accessibility** - Full WCAG 2.1 compliance with keyboard navigation support
- ⚡ **Performance** - Optimized with React.memo and code splitting patterns

## Getting Started

### Installation

The installation procedure is currently being finalized and will be released in the coming days. Please check back soon for complete setup instructions.

### Development (Local)

To run the component showcase locally:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the component showcase.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
alize/
├── src/                    # Source code
│   ├── components/         # React components
│   │   └── ui/            # UI components (shadcn/ui based)
│   ├── foundation/        # Foundation Layer (design tokens)
│   ├── lib/               # Utilities (validation, sanitization, etc.)
│   ├── hooks/             # React hooks
│   ├── contexts/          # React contexts
│   ├── styles/            # CSS source (alize.css)
│   ├── tailwind/          # Tailwind preset and plugin
│   └── index.ts           # Main entry point
├── dist/                  # Build output (for npm package)
│   ├── alize.css          # Compiled CSS with all tokens
│   ├── index.js/mjs       # Component bundles
│   ├── tailwind.preset.js # Tailwind preset
│   └── plugin.js          # Tailwind plugin
├── app/                   # Next.js showcase app (development)
└── examples/              # Example integrations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run check` - Run all checks (lint + format + types)
- `npm test` - Run tests with Vitest
- `npm run test:ui` - Run tests with UI interface
- `npm run test:coverage` - Run tests with coverage report
- `npm run security:audit` - Run security audit (npm audit)

## Documentation

### Guides & Best Practices
- [Security Guide](./docs/SECURITY.md) - Security best practices and sanitization
- [Validation Guide](./docs/VALIDATION.md) - Form validation with Zod schemas
- [Error Handling Guide](./docs/ERROR_HANDLING.md) - Error handling patterns and utilities
- [Keyboard Navigation](./docs/KEYBOARD_NAVIGATION.md) - Accessibility and keyboard navigation

### Reference
- [Component Documentation](./src/components/DOCUMENTATION.md) - Documentation principles and guidelines

## Components

All components are located in `src/components/ui/` and follow the shadcn/ui pattern. Each component includes:

- Full TypeScript support
- Custom design tokens integration
- Material Symbols icon support
- Comprehensive documentation in the showcase

## Additional Utilities

Alize provides additional utilities for common development needs:

- **Validation**: Zod schemas for email, password, URLs, files, and common form patterns
- **Sanitization**: HTML, URL, text, and file name sanitization utilities
- **Error Handling**: ErrorLogger, async error handling patterns, and custom error classes

All utilities are exported from the main package:

```tsx
import { 
  emailSchema, 
  sanitizeHtml, 
  ErrorLogger 
} from "alize-ui";
```

See the [documentation guides](#documentation) for detailed usage examples.

## License

Private project - All rights reserved
