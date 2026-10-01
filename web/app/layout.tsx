import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

const newsreader = localFont({
  src: [
    { path: './fonts/newsreader-latin-standard-normal.woff2', style: 'normal' },
    { path: './fonts/newsreader-latin-standard-italic.woff2', style: 'italic' },
  ],
  weight: '200 800',
  variable: '--font-newsreader',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'A&R LLP | Chartered Professional Accountants in Halton & Hamilton',
  description:
    'A&R LLP is a firm of Chartered Professional Accountants in Waterdown, Ontario, providing personal and corporate tax, bookkeeping, CRA audit support, virtual CFO and estate services across Halton, Hamilton and the GTA since 2010.',
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The inline script adds a "js" class before first paint, which turns on the entrance animations.
    <html lang="en" className={`${GeistSans.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
