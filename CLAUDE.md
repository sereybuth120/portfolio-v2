# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start development server with hot reload
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # TypeScript + Svelte type checking
npm run check:watch  # Watch mode type checking
npm run format       # Format code with Prettier
npm run lint         # Check formatting and run ESLint
npm run lint:fix     # Auto-fix ESLint issues
```

## Architecture Overview

This is a **SvelteKit 2 portfolio website** with advanced 3D visualizations and custom animations, deployed to Vercel.

### Tech Stack
- **Framework**: SvelteKit 2 with Svelte 5 (uses `$props()` runes syntax)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with custom theme in `src/app.css`
- **3D Graphics**: Three.js + COBE (interactive globe)
- **Build**: Vite 6 with Vercel adapter

### Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   │   ├── Hero.svelte           # Landing hero with glitch effects
│   │   ├── Menu.svelte           # Grid navigation overlay
│   │   ├── OrbitalTech.svelte    # 3D orbital tech visualization
│   │   ├── Globe.svelte          # COBE interactive globe
│   │   ├── ModelViewer.svelte    # Three.js 3D model viewer
│   │   └── ...
│   └── assets/         # Icons and images
├── routes/             # File-based routing (SvelteKit)
│   ├── +layout.svelte  # Root layout with view transitions
│   ├── +page.svelte    # Homepage
│   ├── about/          # About section
│   ├── works/          # Portfolio works
│   ├── skills/         # Skills section
│   ├── contact/        # Contact section
│   └── experience/     # Experience timeline
└── app.css             # Global styles, fonts, CSS variables
```

### Key Patterns

1. **Svelte 5 Runes**: Components use `$props()` for props, not legacy `export let`
2. **View Transitions**: CSS View Transitions API for page navigation (with `goto()` fallback)
3. **Session Storage**: Menu state persisted via `sessionStorage`
4. **3D Assets**: GLB models stored in `static/` directory

### Styling Conventions
- Tailwind utility classes as primary styling method
- CSS custom properties defined in `app.css` (Oklch color space)
- Custom fonts: Blanka, Exo2, Bokor, Moulpali (loaded from `/static/fonts/`)
- Animations use CSS keyframes with GPU-accelerated transforms

### Code Style
- **Formatting**: Prettier with tabs, single quotes, 100 char width
- **Linting**: ESLint 9 flat config with TypeScript and Svelte plugins
- **Imports**: Prettier + Tailwind plugins handle sorting and class ordering
