# Website Improvements Design
_Date: 2026-05-27_

## Context

LeapAI Solutions is an AI consulting business targeting mid-sized companies (50–500 staff) buying their first AI project. The business differentiator is delivery-focused, practical AI adoption — no lengthy strategy consulting, just production-ready AI in 4–12 weeks.

**Primary goal for the website:** Help visitors understand what's offered and what makes LeapAI different.

**Two identified gaps:**
1. No clear packages/pricing page — the three-tier model (Foundation / Acceleration / Continuous) from the business model is not visible on the site.
2. No "How It Works" section — visitors can't see what engagement with LeapAI actually looks like step by step.

---

## Approach: Homepage Restructure + New Pricing Page

Reorder the homepage narrative so it flows logically (problem → process → packages), and add a standalone `/pricing` page. All existing pages (About, Contact, Services sub-pages, Blog) remain untouched.

---

## 1. New `/pricing` Page

**Layout:** SaaS-style 3-column tier cards. "Most Popular" badge on Acceleration tier.

### Tiers

| | Foundation | Acceleration | Continuous |
|---|---|---|---|
| **Price** | From $18,000 | From $35,000 | From $6,000/mo |
| **Timeline** | 4–6 weeks | 6–12 weeks | Ongoing |
| **Goal** | Get AI-ready | First AI wins | AI as a capability |

**Foundation deliverables:**
- Modern data platform setup (Databricks, Snowflake, or BigQuery)
- Data ingestion pipelines from key systems (CRM, ERP, files, APIs)
- Basic data quality & governance controls
- Centralised data warehouse/lakehouse
- Initial dashboard with core operational metrics

**Acceleration deliverables (includes Foundation):**
- One or two AI/ML solutions tailored to business needs (e.g. demand forecasting, churn prediction, document summarisation)
- MLOps pipeline for automated training, testing, and deployment
- AI integration with existing business systems (e.g. Salesforce, SAP, Power BI)
- Staff training on using AI outputs

**Continuous deliverables (requires Foundation or Acceleration):**
- Ongoing AI model monitoring & retraining
- New AI features or automations each quarter
- Proactive platform optimisation & cost management
- Monthly insight reports with AI-powered recommendations

**Page structure:**
1. HeroText — "AI Adoption Accelerator Packages"
2. 3-column pricing cards (Foundation · Acceleration · Continuous)
3. Content block — "Not sure where to start?" with copy: _"Most clients begin with Foundation to get their data infrastructure right, then move to Acceleration once they're ready for their first AI use case. Continuous is optional — it's for teams who want ongoing improvement without hiring in-house."_
4. CallToAction — "Book a Free Scoping Call" → `/contact`

### Implementation notes
- **Pricing widget limitation:** `Pricing.astro` hardcodes a `$` prefix at 5xl size, designed for SaaS monthly prices (e.g. `$29/mo`). It does not render well for "From $18,000" project-based pricing. Two options:
  - **Option A (preferred):** Use `Features2.astro` with 3 columns to build custom pricing cards that show "From $18,000" cleanly, with a feature list via the `items` prop.
  - **Option B:** Adapt `Pricing.astro` to accept a `pricePrefix` prop (e.g. "From ") and render it before the `$` sign. Only do this if you want the ribbon/badge animation that Pricing.astro provides.
- Add `/pricing` to nav in `src/navigation.ts` (header links + footer links).

---

## 2. Homepage Restructure

### New section order

| Position | Section | Status |
|---|---|---|
| 1 | Hero | Existing — unchanged |
| 2 | **How It Works** | **New** |
| 3 | Services (4 cards) | Existing — unchanged |
| 4 | **Packages teaser** | **New** |
| 5 | Why Choose Us | Existing — unchanged |
| 6 | Blog latest posts | Existing — unchanged |
| 7 | Call to Action | Existing — unchanged |

### 2a. "How It Works" section (new)

**Layout:** 3 timed step cards in a row, using the `Steps` or `Features` widget.

**Content:**

**Step 1 — Assess & Scope** _(Week 1–2 · Free · No commitment)_
> We map your data landscape and identify your highest-value AI opportunity. Free consultation, no commitment required.

**Step 2 — Build & Deploy** _(Weeks 3–14 · Foundation or Acceleration tier)_
> Rapid implementation sprint. Data platform and/or AI solutions deployed to production in 4–12 weeks.

**Step 3 — Scale & Optimise** _(Ongoing · Continuous tier · Optional)_
> Monthly monitoring, quarterly AI rollouts. Your AI capabilities grow as your business grows.

**Widget choice:** Use `Steps.astro` — it natively supports numbered steps with descriptions. If it doesn't support timeline/week labels, use `Features.astro` with custom subtitle per item.

**Placement:** Between the `Note` widget and the existing `Features` (services) widget in `src/pages/index.astro`.

### 2b. Packages teaser section (new)

**Layout:** Brief 3-column cards (same visual language as `/pricing` page but compact). Include a "View full details →" link to `/pricing`.

**Content:** Same three tiers (Foundation / Acceleration / Continuous) with price, timeline, and a one-line outcome statement. No full feature lists — those live on `/pricing`.

**Widget choice:** Use `Features2.astro` with `columns={3}`. Each item gets: title (tier name), description (one-line outcome + price + timeline), and a `callToAction` linking to `/pricing`. Keep descriptions short — the full feature lists live on `/pricing`.

**Placement:** After the existing `Features` (services) widget and before the existing `Content` (Why Choose Us) widget.

---

## 3. Navigation Updates

- Add `Pricing` link to header nav in `src/navigation.ts`
- Add `Pricing` link to footer links (under Services column)
- Update footer copyright year from 2024 → 2025

---

## Out of Scope (this iteration)

- About page team/founder info — requires real content from business owner
- Real testimonials — requires real client quotes
- Social media links — requires live profiles
- Contact form backend — separate concern
- Individual service page updates

---

## Success Criteria

1. `/pricing` page exists and shows all three tiers with prices, timelines, and deliverables.
2. Homepage has a "How It Works" section between the Note widget and the Services section.
3. Homepage has a Packages teaser section linking to `/pricing`.
4. "Pricing" appears in the nav header and footer.
5. Site builds without errors (`npm run build`).
