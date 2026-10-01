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
- `lib/contact.ts`: contact form validation, shared by the form and the server route
- `app/api/contact/route.ts`: receives the contact form and emails it to the firm through Resend
- `components/`: one component per section. Interactive parts run on the client: the header, service cards and dialog, industry tabs, testimonial carousel, contact form and copy button. The rest render on the server.

## Contact form email (Resend)

The contact form posts to `/api/contact`, which emails each request to the firm through [Resend](https://resend.com). The email's Reply-To is the visitor's address, so you can reply directly. Until it is set up, the form shows a message asking visitors to email or call instead.

One-time setup:

1. Create a free Resend account at https://resend.com.
2. Under **Domains**, add `arllp.ca` and add the DNS records Resend lists at your domain registrar. Wait until the domain shows as verified.
3. Under **API Keys**, create a key with "Sending access".
4. In Vercel, open the project, go to **Settings > Environment Variables**, and add:
   - `RESEND_API_KEY`: the key from step 3
   - `CONTACT_TO_EMAIL`: `info@arllp.ca` (or another inbox)
   - `CONTACT_FROM_EMAIL`: `A&R LLP Website <website@arllp.ca>` (any address on the verified domain)
5. Redeploy so the new variables take effect, then send a test message from the live site.

For local development, copy `.env.example` to `.env.local` and fill in the same values.

Spam protection: the form includes a hidden "honeypot" field, and the server silently drops submissions that fill it in. Every field is also validated again on the server.

## Before going live

- Complete the Resend setup above.
- Replace the `#` links for LinkedIn, Facebook, the Privacy Policy, Terms of Use and Accessibility pages in `components/Footer.tsx`.
- Confirm the figures, services and testimonial wording in `lib/content.ts` with the firm. The testimonials are paraphrased from arllp.ca.
- Confirm that the photos in `public/images/` are licensed for use.
