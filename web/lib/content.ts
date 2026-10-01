import type { LucideIcon } from 'lucide-react';
import {
  Briefcase,
  Building2,
  Calculator,
  FileCheck2,
  HardHat,
  HeartHandshake,
  House,
  Landmark,
  Receipt,
  Rocket,
  ShieldCheck,
  Stethoscope,
  Store,
  UserRound,
} from 'lucide-react';

// Content taken from arllp.ca. Confirm the details with the firm before publishing.

export type ServiceKey = 'accounting' | 'tax' | 'cra' | 'cfo' | 'estate' | 'assurance';

export type Service = {
  key: ServiceKey;
  icon: LucideIcon;
  title: string;
  /** Short summary shown on the card */
  summary: string;
  /** Longer description shown in the detail dialog */
  body: string;
  includes: string[];
  who: string;
};

export const SERVICES: Record<ServiceKey, Service> = {
  accounting: {
    key: 'accounting',
    icon: Calculator,
    title: "Accounting & Bookkeeping",
    summary: "Accurate records, financial statements, payroll and accounting software support to keep your business organized.",
    body: "Clean, current books are the foundation of every good decision. We keep your records accurate, oversee your bookkeeping, and make sure your accounting system works the way your business does.",
    includes: [
      "Bookkeeping and bookkeeping oversight",
      "Year-end financial statements",
      "Payroll, T4 slips and source deductions",
      "QuickBooks, Xero and Sage setup and support",
      "Accounting system design and staff training",
    ],
    who: "Small and medium-sized businesses, new ventures and incorporated professionals.",
  },
  tax: {
    key: 'tax',
    icon: Receipt,
    title: "Personal & Corporate Tax",
    summary: "Personal (T1), corporate (T2) and GST/HST returns, with planning throughout the year to manage what you owe.",
    body: "We prepare and file your returns accurately and on time, and plan ahead throughout the year so you can make informed decisions about income, business structure and timing.",
    includes: [
      "Personal tax returns (T1), including rental and self-employment income",
      "Corporate tax returns (T2)",
      "GST/HST returns",
      "Owner pay: salary versus dividends",
      "Tax planning and business structure advice",
    ],
    who: "Individuals, families, business owners and corporations.",
  },
  cra: {
    key: 'cra',
    icon: ShieldCheck,
    title: "CRA Audit Support",
    summary: "Support and representation through CRA reviews, audits and correspondence, so you never face them alone.",
    body: "A CRA review or audit can be stressful. We help you understand what is being asked, prepare the right documentation, and communicate with the CRA on your behalf.",
    includes: [
      "Responses to CRA letters, reviews and audits",
      "Communication with the CRA as your representative",
      "Document preparation and reconciliations",
      "Review of notices of assessment and reassessment",
    ],
    who: "Individuals and businesses contacted by the Canada Revenue Agency.",
  },
  cfo: {
    key: 'cfo',
    icon: Briefcase,
    title: "Virtual CFO & Advisory",
    summary: "Senior financial guidance for growing businesses, from cash flow and forecasting to meetings with your bank.",
    body: "Most smaller companies don’t have a Chief Financial Officer. Our virtual CFO service fills that gap with financial analysis, planning and an experienced voice in conversations with your bankers.",
    includes: [
      "Financial analysis and management reporting",
      "Cash-flow forecasting and budgeting",
      "Support in meetings with bankers and lenders",
      "Review of business systems and controls",
      "Set-up guidance for new and growing businesses",
    ],
    who: "Owner-managed companies that want more financial insight.",
  },
  estate: {
    key: 'estate',
    icon: Landmark,
    title: "Estates & Trusts",
    summary: "Final returns, T3 trust returns and clearance certificates, handled with care for executors and families.",
    body: "We help executors and families with estate and deceased tax matters, from the final return to the clearance certificate, and with planning ahead for the next generation.",
    includes: [
      "Final personal tax returns for a deceased person",
      "T3 trust and estate returns",
      "Clearance certificate applications",
      "CRA correspondence for estates",
      "Estate tax planning",
    ],
    who: "Executors, trustees and families planning ahead.",
  },
  assurance: {
    key: 'assurance',
    icon: FileCheck2,
    title: "Audits & Financial Reviews",
    summary: "Audits, review engagements and compilations for businesses, lenders and non-profit organizations.",
    body: "Independent work on your financial statements gives boards, funders and lenders confidence in your numbers. We are thorough and practical, and we help you strengthen your financial processes along the way.",
    includes: [
      "Financial statement audits",
      "Review engagements",
      "Compilation engagements",
      "Annual financial reviews for non-profits",
      "Recommendations on financial policies and controls",
    ],
    who: "Non-profits, charities and businesses with lender or board reporting requirements.",
  },
};

export const SERVICE_KEYS = Object.keys(SERVICES) as ServiceKey[];

export type Industry = {
  key: string;
  icon: LucideIcon;
  name: string;
  title: string;
  text: string;
  needs: string[];
  services: ServiceKey[];
};

export const INDUSTRIES: Industry[] = [
  {
    key: 'smb',
    icon: Store,
    name: "Small & Medium Businesses",
    title: "Owner-managed and family businesses",
    text: "You wear many hats. We take the financial ones off your plate, keeping your books current, your T2 and GST/HST filings on time, and your decisions grounded in real numbers.",
    needs: [
      "Keeping books current without a full-time accountant",
      "Filing T2 and GST/HST returns accurately and on time",
      "Deciding between salary and dividends",
    ],
    services: ['accounting', 'tax', 'cfo'],
  },
  {
    key: 'professionals',
    icon: Stethoscope,
    name: "Incorporated Professionals",
    title: "Physicians, dentists and other professional corporations",
    text: "Running a practice through a professional corporation adds a layer of planning. We coordinate your corporate and personal tax so the structure works for you.",
    needs: [
      "Professional corporation T2 returns and year-end statements",
      "Coordinating corporate and personal (T1) tax",
      "Planning how and when to pay yourself",
    ],
    services: ['tax', 'accounting', 'cfo'],
  },
  {
    key: 'realestate',
    icon: House,
    name: "Real Estate Investors",
    title: "Rental property owners and investors",
    text: "Whether you own one rental unit or several, we help you report income properly, claim what you are entitled to, and plan ahead for an eventual sale.",
    needs: [
      "Reporting rental income and expenses",
      "Capital cost allowance and capital gains on a sale",
      "GST/HST questions on rental and new properties",
    ],
    services: ['tax', 'accounting'],
  },
  {
    key: 'construction',
    icon: HardHat,
    name: "Construction & Trades",
    title: "Contractors and trades",
    text: "Progress billings, subcontractors and uneven cash flow make construction accounting its own discipline. We bring clarity to each job and to the business as a whole.",
    needs: [
      "Job costing and cash-flow tracking",
      "T5018 contract payment reporting",
      "Payroll source deductions and GST/HST",
    ],
    services: ['accounting', 'tax', 'cra'],
  },
  {
    key: 'nonprofit',
    icon: HeartHandshake,
    name: "Non-profits & Charities",
    title: "Non-profit organizations and charities",
    text: "We help mission-driven organizations meet the expectations of their boards, members and funders, including developing sound financial practices and annual financial reviews.",
    needs: [
      "Annual audits or financial reviews",
      "Financial policies and procedures",
      "Charity (T3010) and non-profit (T1044) information returns",
    ],
    services: ['assurance', 'accounting'],
  },
  {
    key: 'new',
    icon: Rocket,
    name: "New Businesses",
    title: "Start-ups and new ventures",
    text: "Getting set up properly saves time and tax later. We help you choose a structure, register for the right accounts, and put an accounting system in place from day one.",
    needs: [
      "Choosing between a sole proprietorship and a corporation",
      "GST/HST registration and CRA business accounts",
      "Accounting software setup and staff training",
    ],
    services: ['accounting', 'tax', 'cfo'],
  },
  {
    key: 'individuals',
    icon: UserRound,
    name: "Individuals & Families",
    title: "Individuals, families and retirees",
    text: "Personal finances grow more complex over time. We help you file accurately, plan for major life events, and understand the tax effect of big decisions.",
    needs: [
      "Personal (T1) returns with investment or rental income",
      "Retirement and pension income planning",
      "Tax obligations when moving to or leaving Canada",
    ],
    services: ['tax', 'estate'],
  },
  {
    key: 'estates',
    icon: Landmark,
    name: "Executors & Estates",
    title: "Executors, trustees and beneficiaries",
    text: "Settling an estate brings tax responsibilities at a difficult time. We guide executors through each filing and deal with the CRA so the estate can be distributed with confidence.",
    needs: [
      "Final returns and T3 trust returns",
      "Clearance certificate before distributing the estate",
      "Responding to CRA correspondence",
    ],
    services: ['estate', 'cra', 'tax'],
  },
];

// Paraphrased from client testimonials on arllp.ca. Replace with the exact wording before publishing.
export const TESTIMONIALS: { quote: string; author: string; icon: LucideIcon }[] = [
  {
    quote: "One of the most thorough audits we have experienced in many years, with practical recommendations to bring our bookkeeping in line with accepted accounting practices.",
    author: "Audit client",
    icon: Building2,
  },
  {
    quote: "Eleven years of peace of mind filing our corporate taxes. We highly recommend Hassan Rasul for accounting, audit and taxation needs.",
    author: "Corporate client of 11 years",
    icon: Briefcase,
  },
  {
    quote: "A&R has been instrumental in helping our organization develop a manual for sound financial practices, and provides our annual financial reviews.",
    author: "Danielle's Place, non-profit agency",
    icon: HeartHandshake,
  },
  {
    quote: "Always very professional and accommodating. We are very happy with the level of service we receive.",
    author: "Client for 3 years",
    icon: UserRound,
  },
];

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'industries', label: 'Industries' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
] as const;
