# Image Refresh Design

## Goal

Replace all stock photography on the site with an industry-aligned approach: one abstract CSS visual in the About hero, stock photos removed everywhere else.

## Background

The site currently uses 5 Unsplash stock photos across About, Services, and Pricing pages — some duplicated across pages. Research across 8 comparable sites (Aimpoint Digital, Datatonic, Caylent, Airbyte, dbt Labs, Prefect, Monte Carlo, Dagster) revealed:

- Dark-themed consultancy sites use zero stock photography
- Images are concentrated in the hero section only; content sections below the hero are text + icon driven
- Abstract geometric/gradient visuals are the standard for dark B2B sites
- Grid + node patterns (chosen aesthetic) are used by Airbyte and Dagster to suggest data infrastructure

## Design Decisions

**Style:** Tech Grid + Nodes — a subtle dot-grid background with a radial indigo glow and 4 connected node points rendered in pure CSS. No external images, no JavaScript.

**Scope:** One new visual added (About hero), four removed (About content ×2, Services steps, Pricing content).

**Blog posts:** Unsplash header images left as-is for now — less prominent and to be revisited when real content is ready.

## Changes

### 1. New component — `src/components/GridVisual.astro`

A self-contained Astro component that renders the abstract grid visual using only inline styles. Accepts no props (single variant). Fills its container via `width: 100%; height: 100%` on the root `<div>`.

Visual elements:
- Background: `linear-gradient` dot grid, `rgba(99,102,241,0.11)` lines, 28px spacing
- Central glow: `radial-gradient` circle, indigo (`rgba(99,102,241,0.4)`), blurred 24px
- 4 nodes: circles at fixed positions, indigo/violet tones (`#6366f1`, `#818cf8`, `#a5b4fc`), box-shadow glow
- Connecting lines: inline `<svg>` with 4 `<line>` elements, `rgba(99,102,241,0.25–0.4)` stroke

### 2. `src/pages/about.astro` — 3 changes

**Hero:** Inject `GridVisual` via the `image` slot:
```astro
<Fragment slot="image">
  <GridVisual />
</Fragment>
```

**Content "Our Story":** Remove the `image={{ src: '...', alt: '...' }}` prop entirely. The Content widget renders full-width text when no image is provided.

**Content "What You Can Expect":** Same — remove the `image` prop.

### 3. `src/pages/services.astro` — 1 change

**Steps widget:** Remove the `image={{ src: '...', alt: '...' }}` prop. The widget already has 4 icon-driven step items; the side photo is unnecessary.

### 4. `src/pages/pricing.astro` — 1 change

**Content "Which package?" widget:** Remove the `image={{ src: '...', alt: '...' }}` prop.

## Visual Spec — GridVisual.astro

```
Container: relative, overflow:hidden, w-full, h-full, bg: #030620
├── Grid layer: absolute inset-0
│   background-image: linear-gradient(rgba(99,102,241,0.11) 1px, transparent 1px),
│                     linear-gradient(90deg, rgba(99,102,241,0.11) 1px, transparent 1px)
│   background-size: 28px 28px
├── Glow layer: absolute, 200×200px circle, centered
│   background: radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)
│   filter: blur(24px)
├── Node 1: 10px, #6366f1, top:20% left:13%, box-shadow: 0 0 16px #6366f1
├── Node 2: 7px, #818cf8, top:63% left:42%, box-shadow: 0 0 11px #818cf8
├── Node 3: 6px, #a5b4fc, top:33% left:58%, box-shadow: 0 0 9px #a5b4fc
├── Node 4: 8px, #6366f1, top:80% left:20%, box-shadow: 0 0 13px #6366f1
└── SVG lines (viewBox="0 0 100 100", preserveAspectRatio="none"):
    Line 1→2: stroke rgba(99,102,241,0.4), stroke-width 0.3
    Line 2→3: stroke rgba(129,140,248,0.35), stroke-width 0.3
    Line 1→4: stroke rgba(99,102,241,0.25), stroke-width 0.2
    Line 4→2: stroke rgba(99,102,241,0.3), stroke-width 0.2
```

Node positions use percentage-based `top`/`left` so the visual scales correctly at any size. SVG uses `viewBox="0 0 100 100"` with `preserveAspectRatio="none"` to match.

## What Does Not Change

- Homepage: no images were used, no change
- Contact page: no images, no change
- Blog post frontmatter images: unchanged
- All widget components (Hero, Content, Steps): no changes — the `image` slot and prop approach already works as needed
