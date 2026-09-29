# A&R LLP — Chartered Accountants website

A static, dependency-free marketing site for A&R LLP. Open `index.html` in a browser, or host the folder on any static host (GitHub Pages, Netlify, etc.).

## Structure

- `index.html` — single-page site: hero, services, client types, process, about, FAQs, contact
- `css/styles.css` — styles (colour tokens at the top of the file)
- `js/main.js` — mobile nav, tabs, scroll effects, contact form
- `assets/favicon.svg` — A&R monogram

## Before going live, replace the placeholders

- **Contact details** in the `#contact` section of `index.html`: phone, email, office address, hours
- **`FIRM_EMAIL`** in `js/main.js` (the form currently opens the visitor's email app; swap in a form service such as Formspree or your own endpoint if you prefer)
- **Footer legal line**: LLP registration number (`OC…`) and registered office address
- Add your professional body and regulatory wording (e.g. ICAEW/ACCA registration, audit registration) and a privacy policy / cookie notice
- Review services, FAQs and key dates so they match what the firm actually offers
