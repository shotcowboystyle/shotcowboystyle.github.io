# CLAUDE.md

This file provides guidance for Claude Code when working with this personal portfolio project.

## Project Overview

Personal portfolio website for Curtis Blanton built with Astro 5.15+, featuring interactive 3D animations, smooth scrolling, and high-performance optimizations. The site prioritizes accessibility, SEO, and visual polish.

**Key Characteristics:**

- Static site generation with Astro
- Component islands architecture
- Advanced animations (GSAP, Three.js, Lottie)
- Comprehensive E2E testing with Playwright
- Strict quality enforcement (ESLint, Prettier, TypeScript)
- Automated releases with Semantic Release

## Quick Navigation

### Key Directories

- `src/` - Source code (components, pages, layouts, styles)
- `public/` - Static assets (images, fonts, icons)
- `e2e/` - Playwright tests (accessibility, performance, visual, pages)
- `.github/` - CI/CD workflows and GitHub configuration
- `.vscode/` - Editor settings and extensions

### Important Files

- `astro.config.mjs` - Astro framework configuration
- `tailwind.config.cjs` - Tailwind CSS v4 configuration
- `tsconfig.json` - TypeScript compiler settings
- `playwright.config.ts` - E2E test configuration
- `lefthook.yml` - Git hooks for quality checks
- `package.json` - Dependencies and npm scripts

## Tech Stack Reference

### Core Framework

- **Astro 5.15+**: Static site generator with component islands
- **TypeScript 5.9+**: Strict mode enabled for type safety

### Styling

- **Tailwind CSS 4.1+**: Utility-first CSS framework
- **DaisyUI**: Component library built on Tailwind
- **PostCSS**: CSS processing with nesting, imports, preset-env

### Animation Libraries

- **GSAP 3.13**: Professional-grade animation library
- **Three.js 0.181**: 3D graphics and WebGL
- **Cannon.js**: Physics engine for 3D interactions
- **Lottie Web**: JSON-based animations
- **SplitType**: Text animation utilities
- **Lenis**: Smooth scroll implementation

### Quality Tools

- **ESLint 9**: Code linting with Astro, TypeScript, JSX a11y plugins
- **Prettier 3.6**: Code formatting with Astro and Tailwind plugins
- **Stylelint 16**: CSS linting for Astro and standard CSS
- **TypeScript**: Strict type checking with Astro integration
- **Knip**: Unused dependencies and exports detection

### Testing

- **Playwright 1.56**: E2E testing framework
- **@axe-core/playwright**: Accessibility testing
- **playwright-lighthouse**: Performance testing
- **Lighthouse 13**: Core Web Vitals and performance auditing

### Build & Deploy

- **pnpm**: Fast, disk space efficient package manager
- **Astro Compress**: Asset optimization
- **Astro Critters**: Critical CSS inlining
- **Astro PurgeCSS**: Unused CSS removal
- **Sharp**: Image optimization

## Development Workflows

### Starting Development

```bash
pnpm dev                 # Start dev server on http://localhost:4321
pnpm build              # Production build
pnpm preview            # Preview production build locally
```

### Code Quality

```bash
pnpm format:check       # Check formatting (Prettier)
pnpm format:fix         # Auto-fix formatting issues
pnpm lint:check         # Run all linters (code, styles, packages, knip)
pnpm lint:fix           # Auto-fix linting issues
pnpm types:check        # Type checking (Astro sync + tsc + astro check)
```

### Testing

```bash
pnpm test                      # Run all E2E tests
pnpm test:e2e                  # Run all E2E test suites
pnpm test:e2e:accessibility    # Accessibility tests
pnpm test:e2e:pages            # Page functionality tests
pnpm test:e2e:performance      # Performance audits
pnpm test:e2e:visual           # Visual regression tests
pnpm test:playwright:ui        # Open Playwright UI mode
pnpm test:playwright:debug     # Debug tests with inspector
```

### Validation

```bash
pnpm validate           # Run format:check + lint:check + types:check + test
```

### Git Workflow

- **Lefthook**: Pre-commit hooks enforce quality checks
- **Commitizen**: Interactive commit message builder (`pnpm cz`)
- **Conventional Commits**: Required format for semantic versioning
- **Semantic Release**: Automated versioning and changelog generation

## Code Quality Standards

### TypeScript

- **Strict mode enabled**: All type checks enforced
- **No implicit any**: Explicit types required
- **Import paths**: Use `@/` alias for absolute imports from `src/`
- **Type definitions**: Astro components support `.astro.d.ts` definitions

### ESLint Rules

- **Astro plugin**: Lint `.astro` files with `astro-eslint-parser`
- **TypeScript plugin**: Strict type-aware linting rules
- **Import plugin**: Enforce consistent import ordering
- **JSX a11y plugin**: Accessibility linting for interactive elements
- **No unused vars**: Clean up unused imports and variables

### Prettier Configuration

- **Astro plugin**: Format `.astro` files correctly
- **Import sorting**: Auto-sort imports with `@ianvs/prettier-plugin-sort-imports`
- **Tailwind plugin**: Sort Tailwind classes consistently
- **Line width**: 100 characters (see editor rulers)

### Stylelint

- **Config standard**: Standard CSS linting rules
- **Tailwind config**: Validate Tailwind-specific syntax
- **HTML config**: Lint styles in `.astro` files
- **PostCSS support**: Lint modern CSS features

## Testing Requirements

### Accessibility Testing

- **Axe-core integration**: Automated WCAG 2.1 compliance checks
- **Keyboard navigation**: Test all interactive elements
- **ARIA attributes**: Verify proper semantic HTML and ARIA
- **Color contrast**: Ensure AA/AAA compliance
- **Screen reader support**: Test with assistive technology

### Performance Testing

- **Lighthouse audits**: Minimum scores required:
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 90+
  - SEO: 95+
- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Bundle size**: Watch for bloat with rollup analyzer

### Visual Regression

- **Playwright screenshots**: Compare visual changes
- **Responsive testing**: Test all breakpoints (mobile, tablet, desktop)
- **Cross-browser**: Chromium, Firefox, WebKit

### E2E Page Tests

- **Navigation**: Test all routes and links
- **Interactive elements**: Forms, buttons, modals
- **Animation states**: GSAP, Three.js, Lottie interactions
- **Error states**: 404 pages, error boundaries

## Animation Guidelines

### GSAP Best Practices

- **Performance**: Use `will-change` CSS for animated properties
- **Cleanup**: Kill timelines on component unmount
- **ScrollTrigger**: Use for scroll-based animations
- **Easing**: Prefer `power2.out` for natural motion
- **Batch animations**: Use `gsap.utils.toArray()` for multiple elements

### Three.js Patterns

- **Dispose resources**: Clean up geometries, materials, textures
- **RequestAnimationFrame**: Use for render loop
- **Responsive canvas**: Handle window resize events
- **Performance**: Use `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`
- **Debugging**: Enable `stats.js` in development only

### Lottie Guidelines

- **File size**: Keep JSON files under 100KB
- **Preload**: Use `<link rel="preload">` for critical animations
- **Auto-play**: Consider user preferences (prefers-reduced-motion)
- **Fallbacks**: Provide static images for unsupported browsers

### Smooth Scroll (Lenis)

- **Integration**: Initialize after DOM ready
- **Cleanup**: Destroy instance on route change
- **Accessibility**: Respect `prefers-reduced-motion`
- **Performance**: Use `requestAnimationFrame` for updates

## File Structure

### Component Organization

```
src/
├── components/          # Reusable UI components
├── layouts/            # Page layouts (base, default, etc.)
├── pages/              # Astro pages (auto-routing)
├── styles/             # Global CSS and Tailwind imports
└── assets/             # Images, fonts, icons (processed by Astro)
```

### Astro Components

- **Single responsibility**: One component, one purpose
- **Props typing**: Use TypeScript interfaces for props
- **Slot usage**: Support content projection where appropriate
- **CSS scoping**: Use `<style>` tags for component-specific styles
- **Islands**: Use `client:*` directives sparingly (prefer static)

## Environment Variables

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

**Note**: No secrets in this static site project. All config is build-time.

## Build & Deployment

### Production Build

```bash
pnpm build              # Builds to ./dist
```

**Build optimizations applied:**

- Astro Compress: Minifies HTML, CSS, JS
- Astro Critters: Inlines critical CSS
- Astro PurgeCSS: Removes unused CSS
- Sharp: Optimizes images (WebP, AVIF)
- Code splitting: Automatic chunk optimization

### GitHub Pages Deployment

- **Automated**: Triggered on push to `main` branch
- **Static hosting**: Deploys `./dist` to GitHub Pages
- **Custom domain**: Configure in repository settings
- **HTTPS**: Enforced by GitHub Pages

### Performance Checklist

- [ ] Images optimized (WebP/AVIF formats)
- [ ] Fonts preloaded (`<link rel="preload">`)
- [ ] Critical CSS inlined (Critters)
- [ ] Unused CSS purged (PurgeCSS)
- [ ] Bundle analyzed (no bloat)
- [ ] Lighthouse scores meet targets (90+)

## Common Tasks

### Adding a New Page

1. Create `.astro` file in `src/pages/`
2. Import layout from `src/layouts/`
3. Add TypeScript interface for props if needed
4. Add E2E test in `e2e/tests/pages/`
5. Update navigation if needed

### Adding a Component

1. Create component in `src/components/`
2. Use TypeScript for props interface
3. Add scoped styles with `<style>` tag
4. Export from component file
5. Import where needed

### Updating Dependencies

```bash
pnpm update             # Update all dependencies
pnpm dedupe            # Deduplicate dependencies
pnpm lint:packages:check  # Verify no duplicate versions
```

### Troubleshooting

- **TypeScript errors**: Run `pnpm astro sync` to regenerate `.astro` types
- **Cache issues**: Delete `.astro/`, `dist/`, `node_modules/` and reinstall
- **Lint errors**: Run `pnpm lint:fix` and `pnpm format:fix`
- **Test failures**: Run `pnpm test:playwright:ui` to debug interactively

## Resources

- **Astro Docs**: <https://docs.astro.build>
- **Tailwind CSS**: <https://tailwindcss.com>
- **GSAP Docs**: <https://greensock.com/docs>
- **Three.js Docs**: <https://threejs.org/docs>
- **Playwright Docs**: <https://playwright.dev>

## Notes for Claude Code

- **Read before editing**: Always check existing patterns in the codebase
- **Match conventions**: Follow established naming and structure patterns
- **Quality first**: Run validation (`pnpm validate`) before considering work complete
- **Test coverage**: Add tests for new features (E2E, accessibility, performance)
- **Performance aware**: Consider bundle size and runtime performance
- **Accessibility**: WCAG 2.1 AA compliance is required, not optional
- **Animation performance**: Use `will-change`, clean up resources, respect `prefers-reduced-motion`
