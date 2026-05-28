# Site Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the LeapAI Solutions website with an indigo color palette, dark executive hero, collapsed services structure, and updated copy throughout.

**Architecture:** Pure content and style changes across 5 existing files plus deletion of 6 sub-pages. No new components. AstroWind uses CSS custom properties for theming (`--aw-color-primary` etc.) so the color change is a single-file update that propagates everywhere. All verification is via `npm run build` (static site — no unit tests).

**Tech Stack:** Astro, Tailwind CSS, AstroWind template widgets (`Hero`, `Stats`, `Features`, `Features2`, `Steps`, `Content`, `HeroText`, `CallToAction`)

---

### Task 1: Update global color palette

**Files:**
- Modify: `src/components/CustomStyles.astro`

- [ ] **Step 1: Update the color variables**

Open `src/components/CustomStyles.astro`. The current `:root` block has teal/amber colors. Replace both the `:root` and `.dark` color variables with indigo values.

The full new `CustomStyles.astro` content is:

```astro
---
import '@fontsource-variable/inter';
---

<style is:inline>
  :root {
    --aw-font-sans: 'Inter Variable';
    --aw-font-serif: 'Inter Variable';
    --aw-font-heading: 'Inter Variable';

    --aw-color-primary: rgb(99 102 241);
    --aw-color-secondary: rgb(129 140 248);
    --aw-color-accent: rgb(67 56 202);

    --aw-color-text-heading: rgb(0 0 0);
    --aw-color-text-default: rgb(16 16 16);
    --aw-color-text-muted: rgb(16 16 16 / 66%);
    --aw-color-bg-page: rgb(255 255 255);

    --aw-color-bg-page-dark: rgb(3 6 32);

    ::selection {
      background-color: lavender;
    }
  }

  .dark {
    --aw-font-sans: 'Inter Variable';
    --aw-font-serif: 'Inter Variable';
    --aw-font-heading: 'Inter Variable';

    --aw-color-primary: rgb(99 102 241);
    --aw-color-secondary: rgb(129 140 248);
    --aw-color-accent: rgb(67 56 202);

    --aw-color-text-heading: rgb(247, 248, 248);
    --aw-color-text-default: rgb(229 236 246);
    --aw-color-text-muted: rgb(229 236 246 / 66%);
    --aw-color-bg-page: rgb(3 6 32);

    ::selection {
      background-color: black;
      color: snow;
    }
  }
</style>
```

- [ ] **Step 2: Verify the build passes**

```bash
npm run build
```

Expected: Build completes with no errors. If TypeScript errors appear, they are pre-existing and unrelated to this change.

- [ ] **Step 3: Commit**

```bash
git add src/components/CustomStyles.astro
git commit -m "feat: update brand color palette from teal to indigo"
```

---

### Task 2: Homepage overhaul

**Files:**
- Modify: `src/pages/index.astro`

This task rewrites the homepage in one pass: dark hero, stats bar, remove Note widget, update Services section, replace Why Choose Us block, update CTA.

- [ ] **Step 1: Replace the entire `src/pages/index.astro` with the new content**

```astro
---
import Layout from '~/layouts/PageLayout.astro';

import Hero from '~/components/widgets/Hero.astro';
import Stats from '~/components/widgets/Stats.astro';
import Features from '~/components/widgets/Features.astro';
import Features2 from '~/components/widgets/Features2.astro';
import Pricing from '~/components/widgets/Pricing.astro';
import BlogLatestPosts from '~/components/widgets/BlogLatestPosts.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: 'LeapAI Solutions — AI Adoption Accelerated',
  ignoreTitleTemplate: true,
};
---

<Layout metadata={metadata}>
  <!-- Hero Widget ******************* -->

  <Hero
    actions={[
      {
        variant: 'primary',
        text: 'Book a Free Scoping Call',
        href: '/contact',
        icon: 'tabler:calendar',
      },
      { text: 'See how it works', href: '#how-it-works' },
    ]}
  >
    <Fragment slot="title">
      <span class="text-white">AI in Production.</span><br />
      <span class="text-white">Not in <span class="text-indigo-400">Slides.</span></span>
    </Fragment>

    <Fragment slot="subtitle">
      <span class="text-slate-300">
        We build and deploy production AI — data platform, models, and integrations — in 4–12 weeks.
      </span>
    </Fragment>

    <Fragment slot="bg">
      <div class="absolute inset-0 bg-slate-900"></div>
    </Fragment>
  </Hero>

  <!-- Stats Widget ****************** -->

  <Stats
    isDark={true}
    stats={[
      { amount: '4–12 wks', title: 'First AI in production' },
      { amount: '$18k', title: 'Starting investment' },
      { amount: '4 stages', title: 'Proven journey' },
      { amount: '100%', title: 'Production-focused' },
    ]}
  >
    <Fragment slot="bg">
      <div class="absolute inset-0 bg-slate-900 border-t border-slate-700"></div>
    </Fragment>
  </Stats>

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

  <!-- Features Widget *************** -->

  <Features
    id="services"
    tagline="Our Services"
    title="The AI Adoption Journey"
    subtitle="From scattered data to AI in production — a proven four-stage journey built for businesses that want results, not roadmaps."
    items={[
      {
        title: 'Data Platform Services',
        description:
          'Design & implement modern cloud data platforms ready for AI and analytics. Includes lakehouse architecture, governance, security, and cost optimization.',
        icon: 'tabler:server-2',
        href: '/services',
      },
      {
        title: 'Data Integration Services',
        description:
          'Design & implement ETL/ELT pipelines that turn raw, siloed data into usable business assets. Includes real-time ingestion, automation, and quality controls.',
        icon: 'tabler:git-branch',
        href: '/services',
      },
      {
        title: 'AI Integration Services',
        description:
          'Embed AI models into business processes and systems for practical, production-ready automation. Transform existing workflows with efficiency and intelligent decision-making.',
        icon: 'tabler:plug-connected',
        href: '/services',
      },
      {
        title: 'Generative AI & Agents Services',
        description:
          'Build intelligent copilots and autonomous AI assistants that reason, recommend, and act. Next-generation AI that transforms how staff interact with information.',
        icon: 'tabler:robot',
        href: '/services',
      },
    ]}
  />

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

  <!-- Differentiators Widget ******** -->

  <Features2
    tagline="Why LeapAI"
    title="Built for Buyers Who've Seen Too Many Demos"
    columns={3}
    items={[
      {
        title: 'Fixed scope. No open-ended fees.',
        description:
          "Every engagement has a defined deliverable, timeline, and price. You know what you're getting before we start.",
        icon: 'tabler:receipt',
      },
      {
        title: 'Production-first, not POCs.',
        description:
          'We build for production from day one. No proof-of-concepts that get shelved — working AI in your systems.',
        icon: 'tabler:rocket',
      },
      {
        title: 'Built for your scale.',
        description:
          "Not enterprise consulting dressed down. Packages sized and priced for businesses that are buying their first AI.",
        icon: 'tabler:building',
      },
    ]}
  />

  <!-- HighlightedPosts Widget ******* -->

  <BlogLatestPosts
    title="AI Implementation Insights"
    information={`Real-world case studies, implementation guides, and practical insights from successful AI deployments.
                        Learn how businesses like yours are getting AI running in production fast.
                `}
  />

  <!-- CallToAction Widget *********** -->

  <CallToAction
    isDark={true}
    actions={[
      {
        variant: 'primary',
        text: 'Book a Free Scoping Call',
        href: '/contact',
        icon: 'tabler:calendar',
      },
    ]}
  >
    <Fragment slot="title">Ready to Get AI Running in Production?</Fragment>

    <Fragment slot="subtitle">
      Book a free 30-minute scoping call. We'll map your data landscape and show you what's possible — no commitment required.
    </Fragment>
  </CallToAction>
</Layout>
```

- [ ] **Step 2: Verify the build passes**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: overhaul homepage — dark hero, stats bar, indigo theme, updated copy"
```

---

### Task 3: Rewrite services page and delete sub-pages

**Files:**
- Modify: `src/pages/services.astro`
- Delete: `src/pages/services/data.astro`
- Delete: `src/pages/services/data/data-platform.astro`
- Delete: `src/pages/services/data/data-integration.astro`
- Delete: `src/pages/services/ai.astro`
- Delete: `src/pages/services/ai/ai-integration.astro`
- Delete: `src/pages/services/ai/generative-ai-agents.astro`

- [ ] **Step 1: Replace `src/pages/services.astro` with the new 4-stage content**

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import HeroText from '~/components/widgets/HeroText.astro';
import Steps from '~/components/widgets/Steps.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: 'The AI Adoption Journey | LeapAI Solutions',
};
---

<Layout metadata={metadata}>
  <HeroText
    tagline="Our Services"
    title="The AI Adoption Journey"
    subtitle="A proven four-stage path from scattered data to AI running in production — and growing."
  />

  <Steps
    title="How We Work"
    items={[
      {
        title: 'Stage 1 · AI Readiness',
        description:
          'Free · 1–2 weeks · No commitment. We map your data landscape, identify your highest-value AI opportunity, and deliver a clear roadmap before any paid work begins. This is how every engagement starts.',
        icon: 'tabler:search',
      },
      {
        title: 'Stage 2 · Data & AI Foundation',
        description:
          'From $18k · 4–8 weeks. Your data infrastructure, built for AI. Cloud data platform (Databricks, Snowflake, or BigQuery), ingestion pipelines from CRM/ERP/APIs, data quality and governance controls, and a core metrics dashboard. The foundation every AI project needs.',
        icon: 'tabler:database',
      },
      {
        title: 'Stage 3 · AI Solutions',
        description:
          'From $35k · 6–12 weeks. Custom AI in production. One or two AI/ML solutions tailored to your business — demand forecasting, churn prediction, document processing, or GenAI agents. Includes MLOps pipeline, system integration (Salesforce, SAP, Power BI), and staff training.',
        icon: 'tabler:robot',
      },
      {
        title: 'Stage 4 · Operate & Evolve',
        description:
          'From $6k/month · Ongoing. Keep your AI sharp. Model monitoring and retraining to prevent drift, new AI features or automations each quarter, proactive platform optimisation, and monthly insight reports. For teams who want AI as a growing capability, not a one-off project.',
        icon: 'tabler:trending-up',
      },
    ]}
    image={{
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'AI adoption journey',
    }}
  />

  <CallToAction
    isDark={true}
    actions={[
      {
        variant: 'primary',
        text: 'Book a Free Scoping Call',
        href: '/contact',
        icon: 'tabler:calendar',
      },
    ]}
    title="Start with Stage 1 — It's Free"
    subtitle="Every engagement begins with a free 1–2 week assessment. We map your data, identify the highest-value opportunity, and hand you a roadmap — no commitment to continue."
  />
</Layout>
```

- [ ] **Step 2: Delete the six sub-pages and stage all changes**

Use `git rm` to delete files and stage their removal in one step:

```bash
git rm src/pages/services/data/data-platform.astro \
       src/pages/services/data/data-integration.astro \
       src/pages/services/data.astro \
       src/pages/services/ai/ai-integration.astro \
       src/pages/services/ai/generative-ai-agents.astro \
       src/pages/services/ai.astro
```

- [ ] **Step 3: Verify the build passes**

```bash
npm run build
```

Expected: Build completes with no errors. The six deleted routes should no longer appear in build output. `/services` route still builds successfully.

- [ ] **Step 4: Commit**

```bash
git add src/pages/services.astro
git commit -m "feat: collapse services to single 4-stage journey page, remove sub-pages"
```

---

### Task 4: Simplify navigation

**Files:**
- Modify: `src/navigation.ts`

- [ ] **Step 1: Replace `src/navigation.ts` with the simplified version**

```ts
import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Services',
      href: getPermalink('/services'),
    },
    {
      text: 'Pricing',
      href: getPermalink('/pricing'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [{ text: 'Get Started', href: getPermalink('/contact') }],
};

export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'The AI Adoption Journey', href: getPermalink('/services') },
        { text: 'Pricing & Packages', href: getPermalink('/pricing') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Blog', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'AI Transformation Guide', href: getPermalink('/blog/ai-transformation-guide') },
        { text: 'Data-Driven Decisions', href: getPermalink('/blog/data-driven-decision-making') },
        { text: 'ML ROI Strategies', href: getPermalink('/blog/machine-learning-roi') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'Twitter', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © 2025 LeapAI Solutions. All rights reserved.
  `,
};
```

- [ ] **Step 2: Verify the build passes**

```bash
npm run build
```

Expected: Build completes with no errors. No TypeScript errors about unknown megaMenu properties.

- [ ] **Step 3: Commit**

```bash
git add src/navigation.ts
git commit -m "feat: remove services mega-menu, simplify nav to flat links"
```

---

### Task 5: Rewrite About page copy

**Files:**
- Modify: `src/pages/about.astro`

- [ ] **Step 1: Replace `src/pages/about.astro` with the new content**

```astro
---
import Features2 from '~/components/widgets/Features2.astro';
import Hero from '~/components/widgets/Hero.astro';
import Content from '~/components/widgets/Content.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';
import Layout from '~/layouts/PageLayout.astro';

const metadata = {
  title: 'About LeapAI Solutions — We Build AI That Ships',
};
---

<Layout metadata={metadata}>
  <!-- Hero Widget ******************* -->

  <Hero
    tagline="About LeapAI Solutions"
    image={{
      src: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
      alt: 'LeapAI Solutions',
    }}
  >
    <Fragment slot="title">
      We Build AI <br />
      <span class="text-accent dark:text-white">That Ships</span>
    </Fragment>

    <Fragment slot="subtitle">
      LeapAI Solutions exists because too many AI projects never make it to production. We fix that. Practical AI adoption — no strategy theatre, no endless consulting cycles — just working AI deployed fast.
    </Fragment>
  </Hero>

  <!-- Content Widget **************** -->

  <Content
    tagline="Our Story"
    title="Founded to Fix AI Delivery"
    items={[
      {
        title: 'Delivery over strategy',
        description:
          "Most AI consultancies produce roadmaps. We produce production systems. Every engagement is scoped to a deliverable, not an outcome statement.",
      },
      {
        title: 'Data foundation first',
        description:
          "Every AI failure we've seen traces back to the same root cause: messy, siloed data. We fix the foundation before building the models.",
      },
      {
        title: 'Sized for the mid-market',
        description:
          "Enterprise AI budgets and timelines don't fit growing businesses. Our packages are scoped and priced for companies buying their first AI — not their fifth.",
      },
    ]}
    image={{
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'LeapAI Solutions team',
    }}
  >
    <Fragment slot="content">
      <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">Why We Exist</h3>
      Most AI projects fail before they ship. We built LeapAI to change the ratio.
    </Fragment>
  </Content>

  <!-- Features2 Widget ************** -->

  <Features2
    title="How We Work"
    subtitle="The principles behind every engagement"
    items={[
      {
        title: 'Fixed scope, predictable cost',
        description:
          "Every engagement has a defined deliverable, timeline, and price. No surprises, no scope creep, no open-ended billing.",
        icon: 'tabler:receipt',
      },
      {
        title: 'Production from day one',
        description:
          'We build for production environments, not sandboxes. Everything we ship is monitored, versioned, and integrated with your systems.',
        icon: 'tabler:rocket',
      },
      {
        title: 'Your team learns, not just your systems',
        description:
          'Knowledge transfer is built into every engagement. Your people should understand and own what we build together.',
        icon: 'tabler:users',
      },
      {
        title: 'Responsible AI',
        description:
          'Transparent models, explainable decisions, and ethical guardrails — especially for AI that touches customers or compliance.',
        icon: 'tabler:shield-check',
      },
      {
        title: 'Right-sized infrastructure',
        description:
          "Cloud-native, cost-optimised, and built to scale. We don't over-engineer — we build what you need now, with room to grow.",
        icon: 'tabler:building',
      },
      {
        title: 'Outcomes, not outputs',
        description:
          'We measure success by business impact — cost saved, revenue generated, hours automated — not by lines of code or models trained.',
        icon: 'tabler:trending-up',
      },
    ]}
  />

  <!-- Content Widget **************** -->

  <Content
    isReversed
    tagline="Our Commitment"
    title="What You Can Expect"
    items={[
      {
        title: 'Clear deliverables',
        description:
          "Every stage has defined outputs. You know what's being built, when it's due, and how to verify it's done.",
      },
      {
        title: 'Working systems, not documentation',
        description:
          "We prioritise deployed, working software over design documents. If it's not in production, it's not done.",
      },
      {
        title: 'Ongoing if you want it',
        description:
          "Stage 4 (Operate & Evolve) is optional. Some clients just need Foundation or one AI project. We're not here to lock you in.",
      },
    ]}
    image={{
      src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'AI delivery commitment',
    }}
  >
    <Fragment slot="content">
      <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">Your Success is Our Success</h3>
      We measure our success by the tangible outcomes we help clients achieve — not by hours billed.
    </Fragment>

    <Fragment slot="bg">
      <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div>
    </Fragment>
  </Content>

  <!-- CallToAction Widget *********** -->

  <CallToAction
    isDark={true}
    actions={[
      {
        variant: 'primary',
        text: 'Book a Free Call',
        href: '/contact',
        icon: 'tabler:calendar',
      },
    ]}
    title="Let's See What's Possible"
    subtitle="Book a free 30-minute call. We'll look at your data, identify a high-value AI opportunity, and give you an honest assessment — no pitch deck required."
  />
</Layout>
```

- [ ] **Step 2: Verify the build passes**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: rewrite About page with production-first voice"
```

---

### Task 6: Final build and verification

**Files:** None changed — this is a verification task only.

- [ ] **Step 1: Run a clean production build**

```bash
npm run build
```

Expected: Exit code 0. All pages listed in build output: `/`, `/about`, `/services`, `/pricing`, `/contact`, `/blog`, and blog sub-routes. The six deleted service sub-routes (`/services/data`, `/services/data/data-platform`, etc.) must NOT appear.

- [ ] **Step 2: Check for any remaining links to deleted pages**

```bash
grep -r "services/data\|services/ai" src/ --include="*.astro" --include="*.ts" --include="*.md"
```

Expected: No matches. If any appear, update those files to point to `/services` instead.

- [ ] **Step 3: Commit the plan file**

```bash
git add docs/superpowers/plans/2026-05-28-site-refresh.md
git commit -m "docs: add site refresh implementation plan"
```
