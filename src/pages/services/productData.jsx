// productData.jsx — editorial content for the individual product/service pages
// (Websites, Web Apps, SaaS Platforms, Mobile Apps).
//
// PRICING lives in ./pricingData.js (single source of truth) — this file holds
// only the narrative content (hero copy, overview, feature deep-dives, process,
// FAQs, "who it's for"). The two are joined by the shared category `key`, which
// is also the URL slug (/services/:slug).
//
// Icons are stored as lucide component references so the detail page can render
// them directly. Everything here is copy we can safely publish today; the
// "Selected Work" section on the page is a structured placeholder until real
// case studies exist.

import {
  Globe,
  LayoutDashboard,
  Zap,
  Smartphone,
  Search,
  Pencil,
  ShieldCheck,
  Gauge,
  CreditCard,
  Users,
  Boxes,
  Bell,
  Workflow,
  BarChart3,
  Repeat,
  Layers,
  Wifi,
  Building2,
  Rocket,
  Store,
} from "lucide-react";

// A shared 4-step delivery process used across products (mirrors the client
// offerings doc: Discovery → Proposal → Build & review → Launch).
export const SHARED_PROCESS = [
  {
    Icon: Search,
    title: "Discovery",
    text: "We learn your goals, audience, and scope — a short form or call — so the build is aimed at real outcomes.",
  },
  {
    Icon: Pencil,
    title: "Proposal",
    text: "We confirm the tier, timeline, and a clear fixed price. 60% to begin, 40% on completion.",
  },
  {
    Icon: Workflow,
    title: "Build & Review",
    text: "We design and build in the open — you review at milestones and we refine until it's right.",
  },
  {
    Icon: Rocket,
    title: "Launch & Hand-over",
    text: "We go live, hand over every account in your name, and you're ready to grow.",
  },
];

export const PRODUCTS = {
  // ── Websites ────────────────────────────────────────────────────────────
  websites: {
    key: "websites",
    Icon: Globe,
    eyebrow: "Websites",
    title: "Websites that win trust and bring business",
    subtitle:
      "From a clean business presence to a conversion-focused corporate site — fast, secure, mobile-first, and fully yours.",
    overview:
      "Your website is often the first impression a customer gets. We design and build professional, fast-loading sites that look great on every device, are easy for you to update, and are built to be found on Google. Whether you're a small business establishing credibility or an established brand competing widely, there's a tier that fits.",
    whoFor: [
      "Small businesses & personal brands building credibility",
      "NGOs, schools, and corporate organisations",
      "Established brands that need a bespoke, high-converting site",
    ],
    highlights: [
      {
        Icon: Pencil,
        title: "You control your content",
        text: "Every site ships with a simple Content Manager — write and publish pages, blog posts, and news yourself. No WordPress, no plugins to maintain, no developer needed for day-to-day edits.",
        points: [
          "Edit text and images in a friendly editor",
          "Publish blog / news posts instantly",
          "It matches your site exactly",
        ],
      },
      {
        Icon: Search,
        title: "Built to be found",
        text: "We set the technical foundations so Google can find and rank you — clean structure, fast load times, and per-page optimisation on higher tiers.",
        points: [
          "Basic SEO so you appear on Google",
          "On-page SEO across every page (Professional+)",
          "Speed and mobile performance tuned",
        ],
      },
      {
        Icon: ShieldCheck,
        title: "Secure and truly yours",
        text: "Security hardening, HTTPS, and backups keep your site safe — and every account is registered in your name from day one.",
        points: [
          "HTTPS and security hardening",
          "Regular backups on a care plan",
          "You own the domain and all accounts",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a website take?",
        a: "A Starter site is typically 1–2 weeks; a Professional site 2–4 weeks. Enterprise builds depend on scope and are confirmed after discovery.",
      },
      {
        q: "Can I update it myself afterwards?",
        a: "Yes. Your site includes a Content Manager so you can edit content and publish posts yourself — no technical skills required.",
      },
      {
        q: "Do I need to buy hosting and a domain separately?",
        a: "You own both, registered in your name. Hosting is included in an optional Website Care plan, or billed at cost if you prefer to manage it yourself.",
      },
      {
        q: "Will my site work on phones?",
        a: "Always. Every site is mobile- and tablet-responsive by default.",
      },
    ],
  },

  // ── Web Apps ────────────────────────────────────────────────────────────
  webapps: {
    key: "webapps",
    Icon: LayoutDashboard,
    eyebrow: "Web Apps",
    title: "Web apps that run your operations",
    subtitle:
      "Dashboards, portals, booking systems, and internal tools — secure, role-based, and tailored to how your organisation actually works.",
    overview:
      "When a website needs to do more than inform — take bookings, manage members, run internal workflows, or give staff a dashboard — you need a web application. We build secure, login-protected platforms with the exact features your operation needs, and an admin area that puts you in control.",
    whoFor: [
      "Organisations replacing spreadsheets and manual processes",
      "Businesses needing bookings, portals, or member areas",
      "Teams that need dashboards and role-based access",
    ],
    highlights: [
      {
        Icon: Users,
        title: "Accounts & role-based access",
        text: "Secure logins with the right access for each type of user — admins, staff, and customers each see exactly what they should, and nothing they shouldn't.",
        points: [
          "Secure authentication",
          "Role-based permissions",
          "Self-service user accounts",
        ],
      },
      {
        Icon: Workflow,
        title: "Workflows built around you",
        text: "We map your real process — approvals, bookings, submissions — and build it into custom workflows, so the tool fits your operation rather than forcing you to adapt.",
        points: [
          "Custom workflows & forms",
          "Automated notifications",
          "Integrations with tools you already use",
        ],
      },
      {
        Icon: LayoutDashboard,
        title: "An admin dashboard you control",
        text: "A clear back-office where you manage everything — records, users, content, and reports — without needing us for daily operations.",
        points: [
          "Central admin dashboard",
          "Manage records & users",
          "Export and reporting",
        ],
      },
    ],
    faqs: [
      {
        q: "How is a web app different from a website?",
        a: "A website mainly informs; a web app lets people do things — log in, book, manage records, run workflows. Web apps have accounts, an admin area, and custom logic.",
      },
      {
        q: "Can it integrate with services I already use?",
        a: "Yes — payments, email, and many third-party APIs can be integrated. We confirm any third-party running costs up front.",
      },
      {
        q: "Is it secure?",
        a: "Security is built in: authentication, role-based access, and hardening. Sensitive operations are protected by design.",
      },
      {
        q: "Will it scale as we grow?",
        a: "Yes — the Enterprise tier is built on a scalable backend with real-time features and deeper integrations for advanced systems.",
      },
    ],
  },

  // ── SaaS Platforms ──────────────────────────────────────────────────────
  saas: {
    key: "saas",
    Icon: Zap,
    eyebrow: "SaaS Platforms",
    title: "SaaS platforms built to scale",
    subtitle:
      "Multi-tenant products with subscriptions, role management, and the infrastructure to grow from MVP to a serious product business.",
    overview:
      "Launching a software product is different from building a site. You need multi-user architecture, subscription and payment logic, and a foundation that can scale as you acquire customers. We help founders launch a focused MVP and help growing products add the advanced features — AI, real-time, marketplace logic — that set them apart.",
    whoFor: [
      "Startups launching a software product",
      "Founders validating an MVP with real users",
      "Product businesses scaling beyond their first version",
    ],
    highlights: [
      {
        Icon: Boxes,
        title: "Multi-tenant from day one",
        text: "A single platform serving many customers, each with their own users and data — the foundation every SaaS needs, built correctly from the start.",
        points: [
          "Multi-user, multi-tenant architecture",
          "Role management",
          "Scalable, cloud-ready backend",
        ],
      },
      {
        Icon: CreditCard,
        title: "Subscriptions & billing",
        text: "Recurring payment logic, plans, and entitlements so you can charge customers and control access to features cleanly.",
        points: [
          "Subscription & payment logic",
          "Plan-based feature access",
          "Automated billing flows",
        ],
      },
      {
        Icon: BarChart3,
        title: "Grow with confidence",
        text: "At the Scale tier we add the infrastructure serious products rely on — advanced analytics, real-time systems, AI integrations, and marketplace logic.",
        points: [
          "Advanced analytics",
          "Real-time & AI integrations",
          "Growth infrastructure",
        ],
      },
    ],
    faqs: [
      {
        q: "What's the difference between the MVP and Scale tiers?",
        a: "MVP gets you launched with the core multi-user product, subscriptions, and a scalable base. Scale adds advanced capabilities — AI, real-time, marketplace logic, and deeper analytics — for products growing fast.",
      },
      {
        q: "Can we start small and grow?",
        a: "That's the recommended path: launch a focused MVP, learn from real users, then invest in the features that matter most.",
      },
      {
        q: "Who owns the product and its data?",
        a: "You do — the codebase, accounts, and data are yours. We build it; you own it.",
      },
      {
        q: "How is pricing determined?",
        a: "The listed figures are starting points. Final pricing is scoped to your feature set after a discovery conversation.",
      },
    ],
  },

  // ── Mobile Apps ─────────────────────────────────────────────────────────
  mobile: {
    key: "mobile",
    Icon: Smartphone,
    eyebrow: "Mobile Apps",
    title: "Mobile apps for iOS & Android",
    subtitle:
      "Cross-platform apps that put your product in your customers' pockets — from a focused MVP to a feature-rich, native-grade experience.",
    overview:
      "A mobile app keeps you close to your customers with push notifications, offline access, and an experience built for the phone. We build cross-platform apps that run on both iOS and Android from a single codebase, and deploy them to the app stores. Every mobile project is scoped individually, so we quote after a short conversation.",
    whoFor: [
      "Businesses that need an app on iOS & Android",
      "Products that rely on notifications or offline use",
      "Teams launching a mobile MVP",
    ],
    highlights: [
      {
        Icon: Smartphone,
        title: "One build, both stores",
        text: "Cross-platform development means a single codebase deployed to both the Apple App Store and Google Play — faster to build and easier to maintain than two separate apps.",
        points: [
          "iOS & Android from one codebase",
          "App-store deployment handled",
          "Consistent experience everywhere",
        ],
      },
      {
        Icon: Bell,
        title: "Stay close to customers",
        text: "Push notifications, user accounts, and a smooth mobile experience keep people coming back — the things a website alone can't do.",
        points: [
          "Push notifications",
          "User accounts & auth",
          "Smooth, app-native UX",
        ],
      },
      {
        Icon: Wifi,
        title: "Advanced, when you need it",
        text: "For feature-rich products we add native performance, offline support, in-app payments and subscriptions, real-time sync, and analytics.",
        points: [
          "Offline support & real-time sync",
          "Payments & subscriptions",
          "Analytics & crash reporting",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is mobile priced as a custom quote?",
        a: "Mobile scope varies widely — features, integrations, and platform requirements differ a lot between apps. We scope each project individually and quote after a quick chat.",
      },
      {
        q: "Do you build for both iOS and Android?",
        a: "Yes. We build cross-platform, so one codebase runs on both — and we handle deployment to both stores.",
      },
      {
        q: "Can the app work offline?",
        a: "The Advanced tier includes offline support and real-time sync for apps that need to work without a constant connection.",
      },
      {
        q: "Do you handle the app-store submission?",
        a: "Yes — app-store deployment is part of the delivery.",
      },
    ],
  },
};

// Small icon set used by the Services showcase cards, keyed by category.
export const PRODUCT_CARD_META = {
  websites: { Icon: Globe, blurb: "Business sites & landing pages" },
  webapps: { Icon: LayoutDashboard, blurb: "Dashboards, portals & tools" },
  saas: { Icon: Zap, blurb: "Multi-tenant products" },
  mobile: { Icon: Smartphone, blurb: "iOS & Android apps" },
};

// Re-exported for convenience where a generic icon is needed.
export const MISC_ICONS = { Gauge, Repeat, Layers, Building2, Store };
