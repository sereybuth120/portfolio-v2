# Portfolio v2 - Project Context

## Project Overview
This is a personal portfolio website built with SvelteKit, TypeScript, and Tailwind CSS. The project uses modern web technologies to create an interactive portfolio with 3D visualizations and animations.

### Key Technologies
- **Framework**: SvelteKit (v2+)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom theme configuration
- **Build Tool**: Vite
- **Deployment**: Vercel adapter
- **3D Graphics**: Three.js with COBE for globe visualization
- **UI Components**: Custom Svelte components with Lucide icons
- **Animations**: Custom CSS animations and tw-animate-css

### Project Structure
```
src/
├── lib/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable Svelte components
│   ├── styles/          # CSS theme files
│   └── index.ts         # Library exports
├── routes/              # Page routes
│   ├── about/           # About section
│   ├── contact/         # Contact section
│   ├── experience/      # Experience section
│   ├── model-test/      # 3D model testing
│   ├── skills/          # Skills section
│   ├── works/           # Portfolio works
│   ├── +layout.svelte   # Root layout
│   └── +page.svelte     # Homepage
├── app.css              # Global styles
├── app.d.ts             # TypeScript declarations
└── app.html             # HTML template
```

## Development Workflow

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Setup
```bash
npm install
```

### Development
```bash
# Start development server with hot reloading
npm run dev

# Start development server and open in browser
npm run dev -- --open
```

### Building
```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Code Quality
```bash
# Run type checking
npm run check

# Run linter
npm run lint

# Run linter with auto-fix
npm run lint:fix

# Format code with Prettier
npm run format
```

## Project Features

### Styling System
- Custom theme configuration in `src/lib/styles/theme.css`
- Tailwind CSS v4 with custom variants
- Dark mode support
- Custom fonts (Blanka, Exo2, Bokor, Moulpali)
- CSS animations and view transitions

### Component Architecture
- Reusable Svelte components in `src/lib/components/`
- Component-based routing in `src/routes/`
- Layout system with `+layout.svelte`
- Page transitions using CSS view transitions API

### Special Components
- **Hero.svelte**: Main landing page component
- **Globe.svelte**: Interactive 3D globe using COBE
- **MatrixRain.svelte**: Matrix-style animation effect
- **Menu.svelte**: Navigation menu with state persistence
- **ModelViewer.svelte**: 3D model viewer using Three.js

### Routing
- Root route (`/`) - Homepage with hero section
- `/about` - About section
- `/contact` - Contact section
- `/experience` - Experience timeline
- `/skills` - Skills visualization
- `/works` - Portfolio showcase
- `/model-test` - 3D model testing playground

## Configuration Files

### Core Configurations
- `svelte.config.js` - SvelteKit configuration with Vercel adapter
- `vite.config.ts` - Vite build configuration with Tailwind plugin
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

### Code Quality Tools
- `.eslintrc.cjs` - ESLint configuration
- `.prettierrc` - Prettier formatting rules
- `.prettierignore` - Files to ignore when formatting

### Deployment
- Vercel adapter for SvelteKit
- Optimized build process with Vite

## Development Practices

### Component Development
- Use TypeScript for type safety
- Follow Svelte's component structure with `<script>`, markup, and `<style>` sections
- Leverage Svelte's reactivity with `$:` syntax and stores
- Use Tailwind classes for styling with custom theme variables

### State Management
- Client-side state with Svelte stores
- Session storage for UI state persistence
- URL-based state for navigation

### Performance Considerations
- Code splitting by route
- Lazy loading for 3D libraries
- Optimized CSS with Tailwind
- View transitions for smooth navigation

## Deployment
The project is configured to deploy to Vercel using the `@sveltejs/adapter-vercel`. For other platforms, you may need to install a different adapter.