# Image Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all stock Unsplash photos with one custom CSS abstract visual (About hero) and remove images from content sections everywhere else.

**Architecture:** A single `GridVisual.astro` component renders a pure-CSS tech grid with a radial glow and 4 connected nodes. It is injected into the About hero via the widget's `slot="image"`. The four remaining stock photos in About (×2), Services, and Pricing are removed by deleting their `image={{...}}` props — the AstroWind Content and Steps widgets automatically expand to full-width text when no image is provided.

**Tech Stack:** Astro, Tailwind CSS, inline SVG, CSS radial-gradient / linear-gradient

---

## File Structure

| Action | File | Change |
|--------|------|--------|
| Create | `src/components/GridVisual.astro` | New component — pure CSS tech grid |
| Modify | `src/pages/about.astro` | Replace Hero image prop with GridVisual slot; remove 2 Content image props |
| Modify | `src/pages/services.astro` | Remove Steps image prop |
| Modify | `src/pages/pricing.astro` | Remove Content image prop |

---

## Task 1: Create GridVisual.astro

**Files:**
- Create: `src/components/GridVisual.astro`

- [ ] **Step 1: Create the component**

Create `src/components/GridVisual.astro` with this exact content:

```astro
---
---
<div class="relative w-full overflow-hidden min-h-64 md:min-h-96" style="background: #030620;">
  <!-- dot grid -->
  <div
    class="absolute inset-0"
    style="background-image: linear-gradient(rgba(99,102,241,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.11) 1px, transparent 1px); background-size: 28px 28px;"
  ></div>

  <!-- central glow -->
  <div
    class="absolute rounded-full"
    style="width:200px;height:200px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(99,102,241,0.4) 0%,transparent 70%);filter:blur(24px);"
  ></div>

  <!-- node 1 -->
  <div class="absolute rounded-full" style="width:10px;height:10px;background:#6366f1;top:20%;left:13%;transform:translate(-50%,-50%);box-shadow:0 0 16px #6366f1;"></div>
  <!-- node 2 -->
  <div class="absolute rounded-full" style="width:7px;height:7px;background:#818cf8;top:63%;left:42%;transform:translate(-50%,-50%);box-shadow:0 0 11px #818cf8;"></div>
  <!-- node 3 -->
  <div class="absolute rounded-full" style="width:6px;height:6px;background:#a5b4fc;top:33%;left:58%;transform:translate(-50%,-50%);box-shadow:0 0 9px #a5b4fc;"></div>
  <!-- node 4 -->
  <div class="absolute rounded-full" style="width:8px;height:8px;background:#6366f1;top:80%;left:20%;transform:translate(-50%,-50%);box-shadow:0 0 13px #6366f1;"></div>

  <!-- connecting lines — viewBox 0 0 100 100 matches percentage node positions -->
  <svg
    class="absolute inset-0 w-full h-full"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <line x1="13" y1="20" x2="42" y2="63" stroke="rgba(99,102,241,0.4)"   stroke-width="0.3"/>
    <line x1="42" y1="63" x2="58" y2="33" stroke="rgba(129,140,248,0.35)" stroke-width="0.3"/>
    <line x1="13" y1="20" x2="20" y2="80" stroke="rgba(99,102,241,0.25)"  stroke-width="0.2"/>
    <line x1="20" y1="80" x2="42" y2="63" stroke="rgba(99,102,241,0.3)"   stroke-width="0.2"/>
  </svg>
</div>
```

- [ ] **Step 2: Verify the build passes**

```bash
npm run build
```

Expected: ends with `[build] X page(s) built` and no errors. (Page count stays the same — this task adds no pages.)

- [ ] **Step 3: Commit**

```bash
git add src/components/GridVisual.astro
git commit -m "feat: add GridVisual abstract tech-grid component"
```

---

## Task 2: Wire GridVisual into About hero, remove About content images

**Files:**
- Modify: `src/pages/about.astro`

The current `about.astro` Hero has an `image={{ src: 'https://...unsplash...', alt: '...' }}` prop (lines 18–21). Replace it with a named `image` slot containing `<GridVisual />`.

The two Content widgets have `image={{ src: '...', alt: '...' }}` props (lines 55–58 and 134–137). Remove both entirely.

- [ ] **Step 1: Add the GridVisual import**

In `src/pages/about.astro`, change the frontmatter imports from:

```astro
---
import Features2 from '~/components/widgets/Features2.astro';
import Hero from '~/components/widgets/Hero.astro';
import Content from '~/components/widgets/Content.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';
import Layout from '~/layouts/PageLayout.astro';
```

to:

```astro
---
import Features2 from '~/components/widgets/Features2.astro';
import Hero from '~/components/widgets/Hero.astro';
import Content from '~/components/widgets/Content.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';
import Layout from '~/layouts/PageLayout.astro';
import GridVisual from '~/components/GridVisual.astro';
```

- [ ] **Step 2: Replace the Hero image prop with the GridVisual slot**

Change:

```astro
  <Hero
    tagline="About LeapAI Solutions"
    image={{
      src: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
      alt: 'AI and Data Science Team Collaboration',
    }}
  >
```

to:

```astro
  <Hero
    tagline="About LeapAI Solutions"
  >
    <Fragment slot="image">
      <GridVisual />
    </Fragment>
```

- [ ] **Step 3: Remove image prop from the "Our Story" Content widget**

Change:

```astro
  <Content
    tagline="Our Story"
    title="Founded to Fix AI Delivery"
    items={[
      ...
    ]}
    image={{
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'LeapAI Solutions team',
    }}
  >
```

to (remove only the `image={{...}}` prop, keep everything else):

```astro
  <Content
    tagline="Our Story"
    title="Founded to Fix AI Delivery"
    items={[
      ...
    ]}
  >
```

- [ ] **Step 4: Remove image prop from the "What You Can Expect" Content widget**

Change:

```astro
  <Content
    isReversed
    tagline="Our Commitment"
    title="What You Can Expect"
    items={[
      ...
    ]}
    image={{
      src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'AI delivery commitment',
    }}
  >
    <Fragment slot="bg">
```

to:

```astro
  <Content
    isReversed
    tagline="Our Commitment"
    title="What You Can Expect"
    items={[
      ...
    ]}
  >
    <Fragment slot="bg">
```

- [ ] **Step 5: Verify the build passes**

```bash
npm run build
```

Expected: ends with `[build] X page(s) built` and no errors.

- [ ] **Step 6: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: replace About hero photo with GridVisual, remove content section images"
```

---

## Task 3: Remove stock photos from Services and Pricing

**Files:**
- Modify: `src/pages/services.astro`
- Modify: `src/pages/pricing.astro`

- [ ] **Step 1: Remove image prop from the Services Steps widget**

In `src/pages/services.astro`, the Steps widget ends with:

```astro
    ]}
    image={{
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'AI adoption journey',
    }}
  />
```

Remove the `image={{...}}` prop so it becomes:

```astro
    ]}
  />
```

- [ ] **Step 2: Remove image prop from the Pricing Content widget**

In `src/pages/pricing.astro`, the Content widget has:

```astro
    image={{
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'AI adoption journey',
    }}
  >
    <Fragment slot="bg">
```

Remove the `image={{...}}` prop so it becomes:

```astro
  >
    <Fragment slot="bg">
```

- [ ] **Step 3: Verify the build passes**

```bash
npm run build
```

Expected: ends with `[build] X page(s) built` and no errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/services.astro src/pages/pricing.astro
git commit -m "fix: remove stock photos from Services and Pricing content sections"
```
