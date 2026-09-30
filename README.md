# A&R LLP — Chartered Accountants website

A static, dependency-free marketing site for A&R LLP. Open `index.html` in a browser, or host the folder on any static host (GitHub Pages, Netlify, etc.).

## Structure

- `index.html` — single-page site: hero, services, client types, process, about, FAQs, contact
- `css/styles.css` — styles (colour tokens at the top of the file)
- `js/main.js` — mobile nav, tabs, scroll effects, contact form
- `assets/favicon.svg` — A&R monogram

## Before going live, replace the placeholders

- **Contact details** in the `#contact` section of `index.html`: phone, email, office address, hours
- **`FIRM_EMAIL`** in `js/main.js` is set to info@arllp.ca (the form currently opens the visitor's email app; swap in a form service such as Formspree or your own endpoint if you prefer)
- **Footer legal line**: LLP registration number (`OC…`) and registered office address
- Add your professional body and regulatory wording (e.g. ICAEW/ACCA registration, audit registration) and a privacy policy / cookie notice
- Review services, FAQs and key dates so they match what the firm actually offers

## Single-file version (US CPA)

`a-r-llp.html` is a self-contained alternative built with Tailwind CSS (CDN) and vanilla JS, styled for a US CPA firm (navy / slate / gold). Open it directly in a browser. Its address, phone, email, testimonials and insight articles are placeholders, and the contact form only simulates a submission; wire it to a form service or backend before going live.

## Single-file version 2 (dark, interactive)

`a-r-llp-v2.html` is a dark-mode, motion-heavy take on the same US CPA brief (obsidian navy with emerald and amber accents). It uses Tailwind CSS and Lucide icons from CDNs plus vanilla JS, and needs no build step. It includes an animated hero with live counters, tabbed service cards with a detail panel, a scroll-linked process timeline, a pricing estimator by client type, a testimonial carousel, and a contact form with floating labels.

Before publishing, replace the placeholder contact details, the testimonials, the headline stats ($1B+, 500+, 99%, 15+), the dashboard figures in the hero, and the estimator's pricing formulas (the `EST` object in the script). The contact form only simulates a submission; connect it to a form service or backend.

## Single-file version 3 (light, premium)

`a-r-llp-v3.html` is a light, minimalist version (white background, navy text, deep teal accent, serif headlines). It uses Tailwind CSS and Lucide icons from CDNs plus vanilla JS. Sections: hero, stats bar, About with an "Our approach" timeline, six services that open a detail dialog, an eight-industry switcher, a testimonial carousel, and a consultation form.

Content is written for Canada and uses details published on arllp.ca (Waterdown office, phone, services, partner, "serving Halton and Hamilton since 2010"). Before publishing, confirm:
- The stats bar (15+ years serving Halton & Hamilton, 20+ years partner experience, QuickBooks & Sage ProAdvisors)
- Testimonials: these are paraphrased from arllp.ca/testimonials; replace them with the exact client wording
- Partner bio (Hassan Rasul, CPA, CMA, 20+ years), taken from his public profile
- Industries and service descriptions in the `SERVICES` and `INDUSTRIES` objects in the script
- The "Sample report" figures in the hero illustration (illustrative only)
- Office hours, which were not found on arllp.ca and are not shown (the primary email is info@arllp.ca)

The hero banner (`assets/hero-meeting.jpg`, 1050 x 700, embedded in the page as a data URI) runs across the top behind the headline at its natural 3:2 shape, with a light wash on the text side only. Confirm it is licensed before publishing. The contact form only simulates a submission; connect it to a form service or backend.

### Branding (v3)

`a-r-llp-v3.html` uses the firm logo (`assets/ar-llp-logo.png`, embedded in the page as a data URI) and a palette built around it: white backgrounds, warm charcoal text, logo gold (#B8924A) for fills and accents, and a deeper gold (#86672A) for small text so it stays readable on white. A navy family drawn from the hero photo adds contrast: deep navy (#1E3350) for the footer, dark photo sections and selected states, and pale blue (#EFF4F9) for the Services background. A higher-resolution or SVG version of the logo would render more sharply on high-density screens.

Two dark photo sections add contrast: a call-to-action band between Services and Industries (`assets/band-boardroom.jpg`) and the Testimonials background (`assets/testimonials-bg.jpg`). Both are embedded as data URIs; confirm they are licensed before publishing.
