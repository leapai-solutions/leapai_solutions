# Site Refresh Design
_Date: 2026-05-27_

## Context

LeapAI Solutions is an AI consulting business targeting companies buying their first AI project. Phase 1 added a `/pricing` page, "How It Works" section, and packages teaser to the homepage. Phase 2 is a broader visual and structural refresh.

**Three gaps this phase fixes:**
1. **Color identity** — current teal/amber palette looks generic; indigo is more premium/tech-executive
2. **Homepage hero** — current hero is soft; needs a sharper hook for buyers who have been burned by POCs that never shipped
3. **Services structure** — 7 service pages (3 levels) are confusing; a single 4-stage journey page is clearer and matches how the business actually sells

---

## Approach: Broader Visual Refresh

- Dark hero + dark CTA/footer bookends
- Indigo accent color throughout (Tailwind primary → indigo)
- Services collapsed to single page, 6 sub-pages deleted
- Navigation mega-menu removed
- Homepage cleanup: Note widget removed, Why Choose Us copy replaced
- About page copy rewrite (minimal — no team section, no photos)

---

## 1. Global Color Palette

**File:** `src/components/CustomStyles.astro`

AstroWind uses CSS custom properties referenced by Tailwind via `var(--aw-color-primary)`. Changing the CSS vars updates CTAs, links, badges, pricing ribbons, and icon accents throughout every page.

**Current values → New values:**

| Variable | Current | New |
|---|---|---|
| `--aw-color-primary` | `rgb(6 151 178)` (teal) | `rgb(99 102 241)` (indigo-500, #6366f1) |
| `--aw-color-secondary` | `rgb(243 169 60)` (amber) | `rgb(129 140 248)` (indigo-400, #818cf8 — used for hover states) |
| `--aw-color-accent` | `rgb(37 102 156)` (dark blue) | `rgb(67 56 202)` (indigo-700, #4338ca) |

Apply the same values to both `:root` and `.dark` blocks in `CustomStyles.astro`. The dark mode already inherits these — changing both ensures consistency.

---

## 2. Homepage

**File:** `src/pages/index.astro`

### 2a. Hero — complete replacement

Replace the existing `<Hero>` block (lines 22–49). New version:
- No image (remove `image` prop) — full-width text layout
- Dark background via `bg` slot
- White text forced in title and subtitle slots (dark mode classes don't fire on a light page)
- Stats widget immediately below hero (separate component, also dark)

**New Hero content:**
```astro
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
```

**Stats widget immediately after Hero:**
```astro
<Stats
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
```

Add `import Stats from '~/components/widgets/Stats.astro';` to the imports block. The Stats widget uses `dark:text-white` for `amount` and `dark:text-slate-400` for `title` — the bg slot dark override doesn't trigger these. Override by wrapping Stats in a `<div class="dark">` element, OR hardcode the stat values with explicit white text in the Stats widget by using the `isDark` prop: `<Stats isDark stats={[...]} />`. The `isDark` prop adds a `dark` class via WidgetWrapper.

**Use `isDark={true}` on the Stats widget** — this is the cleanest approach.

### 2b. Remove Note widget

Delete lines 51–55:
```astro
<!-- Note Widget ******************* -->
<Note
  title="Our Focus:"
  description="Accelerating practical AI adoption - no lengthy consulting, just production-ready AI solutions with measurable ROI"
/>
```

Remove the `Note` import from the imports block.

### 2c. Update Features widget service links

The existing `<Features id="services">` widget links to sub-pages that will be deleted. Update all `href` values to point to `/services`:

- `href: '/services/data/data-platform'` → `href: '/services'`
- `href: '/services/data/data-integration'` → `href: '/services'`
- `href: '/services/ai/ai-integration'` → `href: '/services'`
- `href: '/services/ai/generative-ai-agents'` → `href: '/services'`

Also update the Features widget `title` and `subtitle`:
- `title`: `"The AI Adoption Journey"`
- `subtitle`: `"From scattered data to AI in production — a proven four-stage journey built for businesses that want results, not roadmaps."`

### 2d. Replace Why Choose Us Content block

Replace the existing `<Content isReversed tagline="Why Choose Our AI Adoption Accelerator" ...>` block with a tighter Features2 differentiator block (no image — cleaner for this message):

```astro
<!-- Differentiators Widget ******** -->

<Features2
  tagline="Why LeapAI"
  title="Built for Buyers Who've Seen Too Many Demos"
  columns={3}
  items={[
    {
      title: 'Fixed scope. No open-ended fees.',
      description:
        'Every engagement has a defined deliverable, timeline, and price. You know what you\'re getting before we start.',
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
        'Not enterprise consulting dressed down. Packages sized and priced for businesses that are buying their first AI.',
      icon: 'tabler:building',
    },
  ]}
/>
```

### 2e. Update CallToAction — dark background

Add dark bg to the existing CTA to bookend the page symmetrically with the hero:

```astro
<CallToAction
  actions={[...existing actions...]}
  isDark={true}
>
  <Fragment slot="title">Ready to Get AI Running in Production?</Fragment>
  <Fragment slot="subtitle">
    Book a free 30-minute scoping call. We'll map your data landscape and show you what's possible — no commitment required.
  </Fragment>
</CallToAction>
```

Update the CTA text from "Start Your AI Journey" to `"Book a Free Scoping Call"` with `icon: 'tabler:calendar'` and `href: '/contact'`.

---

## 3. Services Page

**File:** `src/pages/services.astro` — complete rewrite

**Files to delete (after updating all links):**
- `src/pages/services/data.astro`
- `src/pages/services/data/data-platform.astro`
- `src/pages/services/data/data-integration.astro`
- `src/pages/services/ai.astro`
- `src/pages/services/ai/ai-integration.astro`
- `src/pages/services/ai/generative-ai-agents.astro`

**New page structure:**

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

---

## 4. Navigation

**File:** `src/navigation.ts`

### 4a. Header — remove mega-menu

Replace the Services entry (currently has `megaMenu` array) with a simple link:

```ts
{
  text: 'Services',
  href: getPermalink('/services'),
},
```

Delete the entire `megaMenu: [...]` property.

### 4b. Footer — update Services column

Replace the three footer service links with cleaner entries pointing to the new single pages:

```ts
{
  title: 'Services',
  links: [
    { text: 'The AI Adoption Journey', href: getPermalink('/services') },
    { text: 'Pricing & Packages', href: getPermalink('/pricing') },
  ],
},
```

---

## 5. About Page

**File:** `src/pages/about.astro`

Minimal copy rewrite. Keep the same widget structure (Hero, Content, Features2, Content, CallToAction) — just replace the text. No structural changes.

**Hero:**
- `tagline`: `"About LeapAI Solutions"`
- `title`: `"We Build AI That Ships"`
- `subtitle`: `"LeapAI Solutions exists because too many AI projects never make it to production. We fix that. Practical AI adoption — no strategy theatre, no endless consulting cycles — just working AI deployed fast."`

**Content ("Our Story"):**
- `tagline`: `"Our Story"`
- `title`: `"Founded to Fix AI Delivery"`
- Items:
  - `title: 'Delivery over strategy'` — `description: 'Most AI consultancies produce roadmaps. We produce production systems. Every engagement is scoped to a deliverable, not an outcome statement.'`
  - `title: 'Data foundation first'` — `description: 'Every AI failure we\'ve seen traces back to the same root cause: messy, siloed data. We fix the foundation before building the models.'`
  - `title: 'Sized for the mid-market'` — `description: 'Enterprise AI budgets and timelines don\'t fit growing businesses. Our packages are scoped and priced for companies buying their first AI — not their fifth.'`
- Content slot `h3`: `"Why We Exist"`
- Content slot body: `"Most AI projects fail before they ship. We built LeapAI to change the ratio."`

**Features2 ("Core Values"):**
Keep the same 6-item structure. Update titles and descriptions to match the brand voice:
- `title: 'Fixed scope, predictable cost'` — `description: 'Every engagement has a defined deliverable, timeline, and price. No surprises, no scope creep, no open-ended billing.'`
- `title: 'Production from day one'` — `description: 'We build for production environments, not sandboxes. Everything we ship is monitored, versioned, and integrated with your systems.'`
- `title: 'Your team learns, not just your systems'` — `description: 'Knowledge transfer is built into every engagement. Your people should understand and own what we build together.'`
- `title: 'Responsible AI'` — `description: 'Transparent models, explainable decisions, and ethical guardrails — especially for AI that touches customers or compliance.'`
- `title: 'Right-sized infrastructure'` — `description: 'Cloud-native, cost-optimised, and built to scale. We don\'t over-engineer — we build what you need now, with room to grow.'`
- `title: 'Outcomes, not outputs'` — `description: 'We measure success by business impact — cost saved, revenue generated, hours automated — not by lines of code or models trained.'`

**Second Content ("Our Commitment"):**
- `title: 'What You Can Expect'`
- Items:
  - `title: 'Clear deliverables'` — `description: 'Every stage has defined outputs. You know what\'s being built, when it\'s due, and how to verify it\'s done.'`
  - `title: 'Working systems, not documentation'` — `description: 'We prioritise deployed, working software over design documents. If it\'s not in production, it\'s not done.'`
  - `title: 'Ongoing if you want it'` — `description: 'Stage 4 (Operate & Evolve) is optional. Some clients just need Foundation or one AI project. We\'re not here to lock you in.'`

**CallToAction:**
- `title`: `"Let's See What's Possible"`
- `subtitle`: `"Book a free 30-minute call. We'll look at your data, identify a high-value AI opportunity, and give you an honest assessment — no pitch deck required."`
- Action text: `"Book a Free Call"`, href: `/contact`, icon: `tabler:calendar`

---

## Out of Scope

- Blog page or individual post changes
- Contact page changes
- Pricing page changes (completed in Phase 1)
- Social media links (no live profiles yet)
- Real photos or team headshots
- Testimonials — the existing fake testimonials on the services page are deleted with that page; no new testimonials section is added

---

## Success Criteria

1. Primary color throughout the site is indigo, not teal — CTAs, tags, pricing ribbons, icon accents all show indigo
2. Homepage hero is dark (#0f172a) with white headline "AI in Production. Not in Slides." and stats bar below
3. Note widget is removed from homepage
4. Homepage "Why Choose Us" Content block is replaced with the 3-item Features2 differentiator
5. `/services` page shows 4 stages in sequence; no sub-pages exist
6. Header nav shows flat `Services` link with no dropdown
7. About page no longer mentions "team of experts" or "data-driven innovation" — uses production-first voice
8. `npm run build` completes with no errors
