# AGENTS.md

> **AI Coding Agent Documentation**  
> This guide defines how an AI coding agent should work with this Next.js collaborative document editor project.

---

## 1. Core Responsibilities

As an AI coding agent working on this project, your primary role is to:

- **Maintain consistent code style** across all TypeScript/TSX files, following the ESLint configuration
- **Fix bugs** and resolve TypeScript errors in the codebase
- **Add new features** while respecting the existing architecture patterns
- **Write function documentation** using JSDoc comments for complex utilities and components
- **Ensure type safety** by avoiding `any` types and properly typing all function parameters and return values
- **Preserve real-time collaboration** features powered by Liveblocks
- **Keep authentication flows** working correctly with Clerk
- **Maintain responsive design** and accessibility standards

---

## 2. Technology Stack Focus

This project uses specific versions of modern web technologies:

### Core Framework

- **Next.js**: `16.1.1` (App Router)
- **React**: `19.2.3`
- **TypeScript**: `^5`

### Styling

- **Tailwind CSS**: `^4` (with @tailwindcss/postcss)
- **Tailwind Merge**: `^3.4.0` for className merging
- **Class Variance Authority**: `^0.7.1` for component variants
- **next-themes**: `^0.4.6` for theme management

### Backend & Real-time

- **Convex**: `^1.31.2` (backend database and API)
- **Liveblocks**: `^3.12.1` (real-time collaboration)
  - `@liveblocks/client`
  - `@liveblocks/node`
  - `@liveblocks/react`
  - `@liveblocks/react-tiptap`
  - `@liveblocks/react-ui`

### Authentication

- **Clerk**: `^6.36.5` (@clerk/nextjs)

### Rich Text Editor

- **Tiptap**: `^3.14.0`
  - `@tiptap/react`
  - `@tiptap/starter-kit`
  - `@tiptap/extension-heading`
  - `@tiptap/extension-highlight`
  - `@tiptap/extension-image`
  - `@tiptap/extension-list`
  - `@tiptap/extension-table`
  - `@tiptap/extension-text-align`
  - `@tiptap/extension-text-style`
  - `tiptap-extension-resize-image`

### UI Components

- **shadcn/ui**: Component library (see `components/ui/`)
- **Radix UI**: `^1.4.3` (via shadcn)
- **Lucide React**: `^0.562.0` (icons)
- **React Icons**: `^5.5.0`

### State Management

- **Zustand**: `^5.0.9` (global state)
- **nuqs**: `^2.8.6` (URL state management)

### Utilities

- **clsx**: `^2.1.1`
- **date-fns**: `^4.1.0`
- **react-resizable-panels**: `^4.1.0`
- **sonner**: `^2.0.7` (toast notifications)

---

## 3. Project Structure

The project follows Next.js 16 App Router conventions with clear separation of concerns:

### Root Directory

```
/Users/blagare/Desktop/Next JS Learning/docs/
├── app/                    # Next.js App Router pages and layouts
├── components/             # Reusable React components
├── constants/              # Application constants
├── convex/                 # Convex backend schema and functions
├── extensions/             # Tiptap custom extensions
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
├── public/                 # Static assets
├── store/                  # Zustand state management
├── types/                  # TypeScript type definitions
└── [config files]          # Configuration files
```

### App Directory (`app/`)

- **`(home)/`** - Home page with document listing
  - `documents-table.tsx` - Document table component
  - `navbar.tsx` - Navigation bar
  - `page.tsx` - Home page
  - `search-input.tsx` - Search functionality
  - `templates-gallery.tsx` - Template selection
- **`api/`** - API routes
  - `liveblocks-auth/route.ts` - Liveblocks authentication
- **`documents/[documentId]/`** - Dynamic document editor pages
  - `actions.ts` - Server actions for document operations
  - `page.tsx` - Document page
  - `document.tsx` - Document component
  - `editor.tsx` - Tiptap editor integration
  - `navbar.tsx` - Document navbar
  - `room.tsx` - Liveblocks room provider
  - `ruler.tsx` - Document ruler component
  - `threads.tsx` - Commenting threads
- **`pricing/`** - Pricing page
- **`templates/`** - Template-related pages
- **`layout.tsx`** - Root layout with providers
- **`globals.css`** - Global styles
- **`error.tsx`** - Error boundary

### Components Directory (`components/`)

- **`toolbar/`** - Editor toolbar components
  - `align-button.tsx` - Text alignment dropdown
  - `font-family-button.tsx`
  - `font-size-button.tsx`
  - `heading-level-button.tsx`
  - `highlight-color-button.tsx`
  - `image-button.tsx`
  - `line-height-button.tsx`
  - `link-button.tsx`
  - `list-button.tsx`
  - `text-color-button.tsx`
  - `toolbar.tsx` - Main toolbar component
- **`ui/`** - shadcn/ui components
  - `button.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, etc.
- **`ConvexClientProvider.tsx`** - Convex provider wrapper
- **`fullscreen-loader.tsx`** - Loading component
- **`remove-dialog.tsx`** - Deletion confirmation
- **`rename-dialog.tsx`** - Rename dialog

### Extensions Directory (`extensions/`)

- `font-family.ts` - Custom Tiptap font family extension
- `font-size.ts` - Custom Tiptap font size extension

### Hooks Directory (`hooks/`)

- `use-debounce.ts` - Debounce hook
- `use-mobile.ts` - Mobile detection hook

### Store Directory (`store/`)

- `use-editor-store.ts` - Zustand store for editor state

### Convex Directory (`convex/`)

- Backend schema and functions for document management
- Handles CRUD operations and queries

---

## 4. Commands

Use these commands for development and maintenance:

### Development

```bash
npm run dev              # Start development server (http://localhost:3000)
npm run build            # Create production build
npm start                # Start production server
```

### Code Quality

```bash
npm run lint:fix         # Run ESLint with auto-fix on all files
npx eslint . --ext .js,.jsx,.ts,.tsx --config eslint.config.mjs  # Lint without fixing
```

### Package Management

```bash
npm install              # Install all dependencies
npm install <package>    # Add new package
npm uninstall <package>  # Remove package
```

### TypeScript

```bash
npx tsc --noEmit         # Type check without emitting files
```

---

## 5. Code Style and Best Practices

### ✅ DO's

1. **Use functional components with hooks**
   - Example: `components/toolbar/align-button.tsx`

   ```tsx
   export const AlignButton = () => {
     const { editor } = useEditorStore();
     // Component logic
   };
   ```

2. **Follow the import sorting rules** defined in `eslint.config.mjs`
   - Order: React/Next → Third-party → Internal aliases → Relative imports → Side effects
   - Example from `app/layout.tsx`:

   ```tsx
   import type { Metadata } from "next";
   import { Geist, Geist_Mono, Public_Sans } from "next/font/google";

   import { NuqsAdapter } from "nuqs/adapters/next/app";

   import { ConvexClientProvider } from "@/components/ConvexClientProvider";
   import { Toaster } from "@/components/ui/sonner";

   import "@liveblocks/react-ui/styles.css";
   import "@liveblocks/react-tiptap/styles.css";
   import "./globals.css";
   ```

3. **Sort JSX props alphabetically** (enforced by ESLint rule `react/jsx-sort-props`)
   - Callbacks go last, reserved props (key, ref) go first

4. **Use TypeScript strict mode**
   - Always define proper types for props, state, and function returns
   - Avoid `any` types; use `unknown` if type is truly unknown

5. **Use the `@/` path alias** for absolute imports
   - Example: `import { cn } from "@/lib/utils";`

6. **Use `cn()` utility** from `@/lib/utils` for conditional classNames
   - Example: `className={cn("base-class", condition && "conditional-class")}`

7. **Preserve Liveblocks integration** when editing editor components
   - Follow patterns in `app/documents/[documentId]/room.tsx` and `editor.tsx`

8. **Use Convex for backend operations**
   - Define queries and mutations in `convex/` directory
   - Use `useQuery` and `useMutation` hooks from Convex

9. **Maintain accessibility**
   - Include `aria-label` attributes on interactive elements
   - Example from `align-button.tsx`: `aria-label={`Align ${currentAlignment.label.toLowerCase()}`}`

10. **Use Server Components by default**
    - Only add `"use client"` when necessary (hooks, event handlers, browser APIs)

### ❌ DON'Ts

1. **DON'T use class-based components**
   - This project uses functional components exclusively

2. **DON'T manually sort imports or JSX props**
   - Let ESLint auto-fix handle this (`npm run lint:fix`)

3. **DON'T modify `next.config.ts` without good reason**
   - Current config includes necessary image domain allowlist for Clerk

4. **DON'T edit `.env.local` directly through code**
   - Environment variables should be documented but not committed

5. **DON'T bypass TypeScript errors with `@ts-ignore`**
   - Fix the underlying type issue instead

6. **DON'T create inline styles**
   - Use Tailwind CSS utility classes

7. **DON'T break Liveblocks real-time features**
   - Test collaboration features when editing editor-related code

8. **DON'T use `useRef` without proper initialization**
   - Example fix: `useRef<NodeJS.Timeout | null>(null)` instead of `useRef<NodeJS.Timeout>()`

9. **DON'T use async functions in `useMemo`**
   - Use `useEffect` with async operations instead

10. **DON'T apply node attributes to text nodes in Tiptap**
    - Text nodes can't have attributes like line-height; apply to block nodes only

---

## 6. Git Workflow

### Commit Guidelines

1. **Commit small, logical changes often**
   - Each commit should represent a single, complete change

2. **Write descriptive commit messages**
   - Format: `<type>: <short description>`
   - Types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`
   - Examples:
     - `feat: add line height extension to Tiptap editor`
     - `fix: resolve type error in ruler component`
     - `refactor: unify user color generation logic`

3. **Test before committing**
   - Run `npm run lint:fix` to fix linting issues
   - Run `npx tsc --noEmit` to check for type errors
   - Test the feature manually if applicable

### Pull Request Guidelines

1. **Create feature branches** from main
   - Format: `feature/description` or `fix/description`

2. **Keep PRs focused**
   - One feature or fix per PR

3. **Include description of changes**
   - What was changed and why
   - How to test the changes

4. **Request reviews** when appropriate
   - Especially for architectural changes or complex features

---

## 7. Boundaries

### Files You Should NOT Modify

1. **Configuration Files** (unless specifically instructed)
   - `next.config.ts` - Contains critical image domain configuration
   - `tsconfig.json` - TypeScript configuration is already optimized
   - `postcss.config.mjs` - PostCSS configuration for Tailwind
   - `components.json` - shadcn/ui configuration

2. **Environment Files**
   - `.env.local` - Contains sensitive keys (never commit)
   - Document required env vars instead of modifying

3. **Build Artifacts**
   - `.next/` directory
   - `node_modules/` directory
   - `tsconfig.tsbuildinfo`

4. **Git Configuration**
   - `.gitignore` - Already properly configured

### Areas Requiring Extra Caution

1. **Liveblocks Integration**
   - `app/api/liveblocks-auth/route.ts` - Authentication logic
   - `liveblocks.config.ts` - Type definitions
   - Changes here affect real-time collaboration

2. **Convex Backend**
   - `convex/` directory - Schema changes affect database
   - Test thoroughly before deploying

3. **Authentication**
   - Clerk integration in `app/layout.tsx` and middleware
   - Breaking auth affects all users

---

## 8. Handling Uncertainty

When you encounter uncertainty, follow this protocol:

### 1. **If you're unsure about the correct approach:**

- **STOP and propose a short plan** before writing code
- Example: "I see three possible approaches to fix this type error: (1) add a type guard, (2) use optional chaining, or (3) refactor the component to ensure editor is always defined. Which approach would you prefer?"

### 2. **If you're unsure about the impact of a change:**

- **Ask a clarifying question**
- Example: "This change will affect the real-time collaboration behavior. Should I proceed, or would you like to review the approach first?"

### 3. **If you encounter unfamiliar technology:**

- **Research first** using official documentation
- Example: For Tiptap issues, check https://tiptap.dev/docs
- For Liveblocks, check https://liveblocks.io/docs
- For Convex, check https://docs.convex.dev

### 4. **If multiple files might need updating:**

- **List all affected files** before making changes
- Example: "To implement this feature, I'll need to modify: (1) `editor.tsx`, (2) `toolbar.tsx`, and (3) create a new extension in `extensions/`. Should I proceed?"

### 5. **If you find a bug but the fix is complex:**

- **Propose the simplest fix first**
- Example: "I found the issue. The quick fix is to add a null check, but the better long-term solution would be to refactor the component structure. Which would you prefer?"

### 6. **If you need to make breaking changes:**

- **ALWAYS notify before proceeding**
- Explain the breaking change and migration path

### 7. **If existing code doesn't follow best practices:**

- **Ask before refactoring**
- There might be historical reasons for the current implementation

---

## 9. Quick Reference Checklist

Before submitting any code changes, verify:

- [ ] Code follows ESLint rules (`npm run lint:fix` passes)
- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)
- [ ] Imports are properly sorted (auto-fixed by ESLint)
- [ ] JSX props are alphabetically sorted (auto-fixed by ESLint)
- [ ] Used `@/` path alias for internal imports
- [ ] Used `cn()` utility for conditional classNames
- [ ] Added proper TypeScript types (no `any`)
- [ ] Component uses functional syntax with hooks
- [ ] Preserved Liveblocks features if editing editor code
- [ ] Maintained accessibility with aria-labels
- [ ] Tested the change manually (if UI-related)
- [ ] Commit message follows the format: `<type>: <description>`

---

## 10. Common Patterns & Examples

### Creating a New Toolbar Button Component

```tsx
// components/toolbar/my-button.tsx
import { useEditorStore } from "@/store/use-editor-store";

import { Button } from "@/components/ui/button";

export const MyButton = () => {
  const { editor } = useEditorStore();

  return (
    <Button
      aria-label="My feature"
      className="h-7 min-w-7"
      disabled={!editor}
      size="sm"
      variant="ghost"
      onClick={() => editor?.chain().focus().myCommand().run()}
    >
      Icon
    </Button>
  );
};
```

### Using Convex Queries

```tsx
"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

export const MyComponent = () => {
  const documents = useQuery(api.documents.get);

  if (documents === undefined) {
    return <div>Loading...</div>;
  }

  return <div>{/* Render documents */}</div>;
};
```

### Custom Hook Pattern

```tsx
// hooks/use-my-hook.ts
import { useEffect, useState } from "react";

export const useMyHook = (value: string) => {
  const [state, setState] = useState<string>("");

  useEffect(() => {
    // Effect logic
  }, [value]);

  return state;
};
```

---

## Appendix: Key File Locations

### Configuration

- ESLint: `eslint.config.mjs`
- TypeScript: `tsconfig.json`
- Next.js: `next.config.ts`
- Tailwind: `postcss.config.mjs` + `tailwind.config.ts` (if exists)
- Liveblocks: `liveblocks.config.ts`

### Entry Points

- Root Layout: `app/layout.tsx`
- Home Page: `app/(home)/page.tsx`
- Document Editor: `app/documents/[documentId]/page.tsx`

### State Management

- Editor Store: `store/use-editor-store.ts`
- Convex Provider: `components/ConvexClientProvider.tsx`

### Utilities

- ClassName Utility: `lib/utils.ts` (assumed, contains `cn()`)
- Constants: `constants/toolbar.ts` (alignments, etc.)

---

**Last Updated**: 2026-01-07  
**Project Version**: 0.1.0  
**Next.js Version**: 16.1.1

> This is a living document. Update it as the project evolves, new patterns emerge, or architectural decisions change.
