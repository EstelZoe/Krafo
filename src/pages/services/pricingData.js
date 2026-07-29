// Pricing_Data — single source of truth for the Services page software-development
// pricing (Websites, Web Apps, SaaS, Mobile Apps, Add-ons). Migrated verbatim from
// the previous inline DEV_CATEGORIES / ADDONS data in src/pages/Services.jsx.
//
// Numeric prices are stored as integer numbers (GHS cedis) so the Quote_Configurator
// can compute an exact Estimated_Total. Display strings (e.g. "GHS 3,500") are derived
// at render time via formatGHS in quote.js. Mobile Apps tiers are custom-quote
// placeholders (price: null, custom: true). The "+" suffix from the old strings is
// represented once by startingPriceNote (R7.4).
//
// _Requirements: 7.1, 7.2, 7.3, 7.4_

export const PRICING_DATA = {
  currency: "GHS",
  categories: [
    {
      key: "websites",
      label: "Websites",
      tagline: "From landing pages to full corporate sites",
      tiers: [
        {
          id: "web-starter",
          name: "Starter",
          price: 3500,
          custom: false,
          bestFor: "Small businesses, personal brands",
          features: [
            "Up to 6 pages",
            "Mobile responsive",
            "Contact form",
            "Basic SEO setup",
            "CMS access",
          ],
        },
        {
          id: "web-professional",
          name: "Professional",
          price: 7000,
          custom: false,
          bestFor: "Corporate orgs, NGOs, schools",
          features: [
            "8–15 pages",
            "Blog / news section",
            "Testimonials",
            "Payment integration",
            "Performance optimized",
          ],
        },
        {
          id: "web-enterprise",
          name: "Enterprise",
          price: 18000,
          custom: false,
          best: true,
          bestFor: "Established brands competing widely",
          features: [
            "Conversion-focused UI/UX",
            "CRM integrations",
            "Multi-language support",
            "Advanced SEO architecture",
            "Security hardening",
          ],
        },
      ],
    },
    {
      key: "webapps",
      label: "Web Apps",
      tagline: "Dashboards, portals, internal tools",
      tiers: [
        {
          id: "app-business",
          name: "Business",
          price: 20000,
          custom: false,
          bestFor: "Bookings, dashboards, internal tools",
          features: [
            "Auth system",
            "Role-based access",
            "Admin dashboard",
            "Custom workflows",
            "API integrations",
          ],
        },
        {
          id: "app-enterprise",
          name: "Enterprise",
          price: 45000,
          custom: false,
          best: true,
          bestFor: "Advanced business systems",
          features: [
            "Complex multi-role systems",
            "Real-time features",
            "Advanced analytics",
            "Deep third-party integrations",
            "Scalable backend",
          ],
        },
      ],
    },
    {
      key: "saas",
      label: "SaaS Platforms",
      tagline: "Multi-tenant products built to scale",
      tiers: [
        {
          id: "saas-mvp",
          name: "MVP",
          price: 70000,
          custom: false,
          bestFor: "Startups launching products",
          features: [
            "Multi-user system",
            "Subscription & payment logic",
            "Role management",
            "Core MVP features",
            "Scalable architecture",
          ],
        },
        {
          id: "saas-scale",
          name: "Scale",
          price: 140000,
          custom: false,
          best: true,
          bestFor: "Serious product businesses",
          features: [
            "AI integrations",
            "Real-time systems",
            "Marketplace logic",
            "Advanced analytics",
            "Growth infrastructure",
          ],
        },
      ],
    },
    {
      key: "mobile",
      label: "Mobile Apps",
      tagline: "iOS & Android apps for your audience",
      tiers: [
        {
          id: "mobile-standard",
          name: "Standard",
          price: null,
          custom: true,
          bestFor: "MVP mobile apps",
          features: [
            "iOS & Android (cross-platform)",
            "User accounts & auth",
            "Push notifications",
            "Core feature set",
            "App-store deployment",
          ],
        },
        {
          id: "mobile-advanced",
          name: "Advanced",
          price: null,
          custom: true,
          best: true,
          bestFor: "Feature-rich products",
          features: [
            "Native performance",
            "Offline support",
            "Payments & subscriptions",
            "Real-time sync",
            "Analytics & crash reporting",
          ],
        },
      ],
    },
  ],
  addOns: [
    { id: "auth", label: "User Authentication", price: 2300 },
    { id: "admin", label: "Admin Dashboard", price: 6000 },
    { id: "payments", label: "Payment Integration", price: 3800 },
    { id: "apis", label: "Third-party APIs", price: 2000 },
    { id: "rbac", label: "Role-based Access", price: 4500 },
    { id: "realtime", label: "Real-time Features", price: 4000 },
    { id: "aiml", label: "AI / ML Integration", price: 8000 },
    { id: "security", label: "Advanced Security", price: 4000 },
  ],
  startingPriceNote: "Prices are starting figures and scale with scope.",
};
