# A&R LLP website (Next.js)

The A&R LLP site rebuilt as a Next.js app. It has the same design, content and interactions as `../a-r-llp-v3.html`.

## Run it

```bash
cd web
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # TypeScript check
```

Requires Node.js 20 or newer.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 3, configured in `tailwind.config.ts` with the same colours as the single-file site
- Fonts are self-hosted through `next/font`: Geist (from the `geist` package) for body text, and Newsreader (`app/fonts/`) for headings
- Icons from `lucide-react`
- Images are served from `public/images/` through `next/image`

## Where things live

- `app/layout.tsx`: page metadata, fonts, and the root HTML
- `app/page.tsx`: the order of the page sections
- `app/globals.css`: the site's custom CSS (buttons, header, animations and form states)
- `app/icon.png`: the favicon
- `lib/content.ts`: services, industries, testimonials and navigation (edit the text here)
- `components/`: one component per section. Interactive parts run on the client: the header, service cards and dialog, industry tabs, testimonial carousel, contact form and copy button. The rest render on the server.

## Before going live

- The contact form submission is simulated (see `onSubmit` in `components/ContactForm.tsx`). Connect it to a form service or a Next.js route handler.
- Replace the `#` links for LinkedIn, Facebook, the Privacy Policy, Terms of Use and Accessibility pages in `components/Footer.tsx`.
- Confirm the figures, services and testimonial wording in `lib/content.ts` with the firm. The testimonials are paraphrased from arllp.ca.
- Confirm that the photos in `public/images/` are licensed for use.
