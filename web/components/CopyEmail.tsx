'use client';

import { useRef, useState } from 'react';

const EMAIL = 'info@arllp.ca';

/** Email link plus a Copy button, since mailto links don't open a mail app for every visitor. */
export default function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const link = useRef<HTMLAnchorElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked: select the address so it can be copied by hand.
      if (!link.current) return;
      const r = document.createRange();
      r.selectNodeContents(link.current);
      const sel = getSelection();
      sel?.removeAllRanges();
      sel?.addRange(r);
    }
  };

  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <a ref={link} href={`mailto:${EMAIL}`} className="select-all text-[15px] hover:text-accent">
        {EMAIL}
      </a>
      <button
        type="button"
        data-copy={EMAIL}
        onClick={copy}
        className="rounded-full border border-stone-300 px-2.5 py-0.5 text-xs font-medium text-stone-600 transition hover:border-ink hover:text-ink"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </p>
  );
}
