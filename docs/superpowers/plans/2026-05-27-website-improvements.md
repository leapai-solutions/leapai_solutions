# Website Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/pricing` page with three-tier packages and restructure the homepage to include a "How It Works" section and a packages teaser, so visitors immediately understand what LeapAI offers and what engagement looks like.

**Architecture:** Pure content changes to Astro pages using existing widget components. No new components needed. Three files change: `src/pages/index.astro` (two new sections inserted), `src/navigation.ts` (Pricing added to nav and footer), plus a new `src/pages/pricing.astro` page.

**Tech Stack:** Astro, Tailwind CSS, existing widget components — `Pricing.astro`, `Features2.astro`, `HeroText.astro`, `CallToAction.astro`, `Content.astro`

---

### Task 1: Create the `/pricing` page

**Files:**
- Create: `src/pages/pricing.astro`

- [ ] **Step 1: Create the pricing page**

Create `src/pages/pricing.astro` with the following content:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import HeroText from '~/components/widgets/HeroText.astro';
import Pricing from '~/components/widgets/Pricing.astro';
import Content from '~/components/widgets/Content.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: 'AI Adoption Accelerator Packages | LeapAI Solutions',
};
---

<Layout metadata={metadata}>
  <HeroText
    tagline="Packages & Pricing"
    title="AI Adoption Accelerator Packages"
    subtitle="Fixed-scope packages with clear deliverables and timelines. No open-ended consulting fees."
  />

  <Pricing
    title="Choose Your Starting Point"
    subtitle="Most clients begin with Foundation, then move to Acceleration once their data platform is in place."
    prices={[
      {
        title: 'Foundation',
        subtitle: 'Get AI-ready fast',
        price: '18k',
        period: 'starting · 4–6 weeks',
        items: [
          { description: 'Cloud data platform setup (Databricks, Snowflake, or BigQuery)' },
          { description: 'Data ingestion pipelines from CRM, ERP, files, and APIs' },
          { description: 'Data quality & governance controls' },
          { description: 'Centralised data warehouse or lakehouse' },
          { description: 'Core operational metrics dashboard' },
        ],
        callToAction: { text: 'Get Started', href: '/contact' },
      },
      {
        title: 'Acceleration',
        subtitle: 'First AI wins in production',
        price: '35k',
        period: 'starting · 6–12 weeks',
        hasRibbon: true,
        ribbonTitle: 'Popular',
        items: [
          { description: 'Everything in Foundation' },
          { description: '1–2 AI/ML solutions (e.g. demand forecasting, churn prediction, document summarisation)' },
          { description: 'MLOps pipeline for automated training and deployment' },
          { description: 'Integration with existing systems (Salesforce, SAP, Power BI)' },
          { description: 'Staff training on using AI outputs' },
        ],
        callToAction: { text: 'Get Started', href: '/contact' },
      },
      {
        title: 'Continuous',
        subtitle: 'AI as a business capability',
        price: '6k',
        period: '/ month · ongoing',
        items: [
          { description: 'AI model monitoring & retraining to prevent drift' },
          { description: 'New AI features or automations each quarter' },
          { description: 'Proactive platform optimisation & cost management' },
          { description: 'Monthly insight reports with AI-powered recommendations' },
        ],
        callToAction: { text: 'Get Started', href: '/contact' },
      },
    ]}
  />

  <Content
    tagline="Not sure where to start?"
    title="Most clients begin with Foundation"
    items={[
      {
        title: 'Start with Foundation if...',
        description:
          'Your data is siloed, inconsistent, or hard to access. Before AI can work, your data needs to be connected and clean. Foundation fixes that in 4–6 weeks.',
      },
      {
        title: 'Jump to Acceleration if...',
        description:
          'You already have a working data platform and want a specific AI solution — like demand forecasting or document processing — deployed to production fast.',
      },
      {
        title: 'Add Continuous when...',
        description:
          'Your first AI project is live and you want to keep improving it, prevent model drift, and roll out new AI capabilities each quarter without hiring in-house.',
      },
    ]}
    image={{
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'AI adoption journey',
    }}
  >
    <Fragment slot="bg">
      <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div>
    </Fragment>
  </Content>

  <CallToAction
    actions={[
      {
        variant: 'primary',
        text: 'Book a Free Scoping Call',
        href: '/contact',
        icon: 'tabler:calendar',
      },
    ]}
    title="Not sure which package fits?"
    subtitle="Book a free 30-minute scoping call. We'll map your data landscape and recommend the right starting point — no commitment required."
  />
</Layout>
```

- [ ] **Step 2: Verify the page renders correctly**

With the dev server running (`npm run dev`), navigate to `http://localhost:4321/pricing` (check the terminal for the exact port if different).

Expected:
- Page title: "AI Adoption Accelerator Packages"
- 3 pricing cards: Foundation ($18k), Acceleration ($35k with "Popular" ribbon), Continuous ($6k/month)
- Each card has a feature list and "Get Started" button
- Content section below with 3 guidance items
- CTA at the bottom

- [ ] **Step 3: Commit**

```bash
git add src/pages/pricing.astro
git commit -m "feat: add /pricing page with three-tier packages"
```

---

### Task 2: Add "How It Works" section to homepage

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add the Features2 import**

Open `src/pages/index.astro`. The current imports block (lines 1–9) looks like:

```astro
import Layout from '~/layouts/PageLayout.astro';

import Hero from '~/components/widgets/Hero.astro';
import Note from '~/components/widgets/Note.astro';
import Features from '~/components/widgets/Features.astro';
import Content from '~/components/widgets/Content.astro';
import BlogLatestPosts from '~/components/widgets/BlogLatestPosts.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';
```

Add `Features2` after `Features`:

```astro
import Layout from '~/layouts/PageLayout.astro';

import Hero from '~/components/widgets/Hero.astro';
import Note from '~/components/widgets/Note.astro';
import Features from '~/components/widgets/Features.astro';
import Features2 from '~/components/widgets/Features2.astro';
import Content from '~/components/widgets/Content.astro';
import BlogLatestPosts from '~/components/widgets/BlogLatestPosts.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';
```

- [ ] **Step 2: Insert the How It Works section**

In `src/pages/index.astro`, find the comment line `<!-- Features Widget *************** -->` (it precedes the `<Features id="services" ...>` block). Insert the How It Works section immediately before that comment:

```astro
  <!-- How It Works Widget ************ -->

  <Features2
    id="how-it-works"
    tagline="Our Process"
    title="How It Works"
    subtitle="From first conversation to AI in production — here's exactly what to expect."
    columns={3}
    items={[
      {
        title: 'Assess & Scope',
        description:
          'Week 1–2 · Free, no commitment. We map your data landscape and pinpoint the highest-value AI opportunity before any work begins.',
        icon: 'tabler:search',
      },
      {
        title: 'Build & Deploy',
        description:
          'Weeks 3–14 · Foundation or Acceleration tier. Rapid implementation sprint — data platform and AI solutions deployed to production in 4–12 weeks.',
        icon: 'tabler:rocket',
      },
      {
        title: 'Scale & Optimise',
        description:
          'Ongoing · Continuous tier (optional). Monthly monitoring plus quarterly AI rollouts keep your AI capabilities growing with your business.',
        icon: 'tabler:trending-up',
      },
    ]}
  />
```

- [ ] **Step 3: Verify the section appears**

Navigate to `http://localhost:4321`.

Expected: A "How It Works" section with 3 cards (Assess & Scope, Build & Deploy, Scale & Optimise) appears between the blue Note banner and the Services grid.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add How It Works section to homepage"
```

---

### Task 3: Add Packages teaser to homepage

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add the Pricing import**

In `src/pages/index.astro`, add `Pricing` to the imports block (after `Features2`):

```astro
import Features2 from '~/components/widgets/Features2.astro';
import Pricing from '~/components/widgets/Pricing.astro';
```

- [ ] **Step 2: Insert the Packages teaser section**

In `src/pages/index.astro`, find the comment line `<!-- Content Widget **************** -->` that precedes the `<Content isReversed tagline="Why Choose Our AI Adoption Accelerator" ...>` block. Insert the Packages teaser immediately before that comment:

```astro
  <!-- Pricing Widget ***************** -->

  <Pricing
    tagline="AI Adoption Accelerator"
    title="Choose Your Starting Point"
    subtitle="Fixed-scope packages. Clear deliverables. Predictable investment."
    prices={[
      {
        title: 'Foundation',
        subtitle: 'Get AI-ready fast',
        price: '18k',
        period: 'starting · 4–6 weeks',
        items: [
          { description: 'Data platform setup' },
          { description: 'Ingestion pipelines' },
          { description: 'Governance & quality controls' },
          { description: 'Core metrics dashboard' },
        ],
        callToAction: { text: 'View Full Details', href: '/pricing' },
      },
      {
        title: 'Acceleration',
        subtitle: 'First AI wins in production',
        price: '35k',
        period: 'starting · 6–12 weeks',
        hasRibbon: true,
        ribbonTitle: 'Popular',
        items: [
          { description: 'Everything in Foundation' },
          { description: '1–2 production AI solutions' },
          { description: 'MLOps pipeline' },
          { description: 'System integration & staff training' },
        ],
        callToAction: { text: 'View Full Details', href: '/pricing' },
      },
      {
        title: 'Continuous',
        subtitle: 'AI as a business capability',
        price: '6k',
        period: '/ month · ongoing',
        items: [
          { description: 'Model monitoring & retraining' },
          { description: 'Quarterly AI rollouts' },
          { description: 'Platform optimisation' },
          { description: 'Monthly insight reports' },
        ],
        callToAction: { text: 'View Full Details', href: '/pricing' },
      },
    ]}
  >
    <Fragment slot="bg">
      <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div>
    </Fragment>
  </Pricing>
```

- [ ] **Step 3: Verify the packages teaser appears**

Navigate to `http://localhost:4321`.

Expected:
- Packages teaser section with 3 tier cards appears below the Services grid and above the "Why Choose Us" content section
- Each card's "View Full Details" button links to `/pricing`
- The Acceleration card shows a green "Popular" ribbon

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add packages teaser section to homepage"
```

---

### Task 4: Update navigation

**Files:**
- Modify: `src/navigation.ts`

- [ ] **Step 1: Add Pricing to the header nav**

Open `src/navigation.ts`. In the `headerData.links` array, find the `Blog` entry and insert a `Pricing` link before it:

```ts
    {
      text: 'Pricing',
      href: getPermalink('/pricing'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
```

- [ ] **Step 2: Add Pricing to the footer and fix the copyright year**

In `src/navigation.ts`, find the `footerData.links` array. In the `Services` column (first entry), add a Pricing link after `Data Platform Services`:

```ts
    {
      title: 'Services',
      links: [
        { text: 'Data Platform Services', href: getPermalink('/services/data/data-platform') },
        { text: 'Pricing & Packages', href: getPermalink('/pricing') },
        { text: 'Generative AI & Agents', href: getPermalink('/services/ai/generative-ai-agents') },
      ],
    },
```

Then update the `footNote` copyright year:

```ts
  footNote: `
    © 2025 LeapAI Solutions. All rights reserved.
  `,
```

- [ ] **Step 3: Verify navigation changes**

Navigate to `http://localhost:4321`.

Expected:
- Header nav shows: About | Services ▾ | Pricing | Blog | Contact
- Footer Services column shows: Data Platform Services, Pricing & Packages, Generative AI & Agents
- Footer copyright reads "© 2025 LeapAI Solutions"
- Clicking "Pricing" in the header navigates to `/pricing`

- [ ] **Step 4: Run a production build to catch any errors**

```bash
npm run build
```

Expected: Build completes with no errors. If you see TypeScript errors about missing props, check that all widget prop names match exactly (e.g. `ribbonTitle` not `ribbon_title`).

- [ ] **Step 5: Commit**

```bash
git add src/navigation.ts
git commit -m "feat: add Pricing to nav and footer, update copyright year to 2025"
```
