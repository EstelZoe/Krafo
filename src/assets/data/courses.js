import ccbc from "../images/ccbc.png";
import ai from "../images/AI&Cyber.png";
import ceo from "../images/ceo.png";

// Centralized course catalog used by Courses page and CourseDetails page
// Brand palette used: #F2600B (primary orange), black/white neutrals

export const COURSE_PAYMENT_LINKS = {
  ccbc_onetime: "https://paystack.com/buy/ccbc-iamrnz",
  ccbc_365_recorded: "https://paystack.com/buy/ccbc-365---recorded-sessions-access-only-qeilat",
};

export const courses = [
  {
    id: "cybersecurity-course",
    slug: "cybersecurity-capacity-building-course-ccbc",
    title: "Cybersecurity Capacity Building Course (CCBC)",
    description:
      "A comprehensive program designed to build a strong foundation in cybersecurity principles, from network defense to incident response.",
    image: ccbc,
    price: "GHC 5,750",
    link: "https://chat.whatsapp.com/G86UT6B9BrCF51nExXybV5",
    details: [
      "12 months online access to resources.",
      "Networking & a Certificate of Completion.",
      "18 topics with quizzes & hands-on exercises.",
    ],
    enrollmentOptions: [
      {
        id: "one-time",
        label: "Option 1 — One‑Time Payment",
        price: "GHS 5750",
        priceNote: "One-time payment (no registration fee)",
        features: [
          "Graduation Package + School Supplies + Free Power Bank (while supplies last)",
          "Krafo Systems branded bag and T‑Shirt",
          "Printed CCBC Binder + HTHM Notebook A5",
          "Attendance commitment form + Certificate of Completion",
        ],
        payLink: COURSE_PAYMENT_LINKS.ccbc_onetime,
      },
      {
        id: "three-phase",
        label: "Option 2 — 3-Part Payment (Sep/Oct/Nov)",
        price: "GHS 6000",
        priceNote: "Pay 1916×3 + Registration 250 (as per flyer)",
        features: [
          "Graduation Package / School Supplies",
          "Includes branded materials and printed binder",
          "Attendance commitment and certificate of completion",
        ],
        payLink: null,
      },
      {
        id: "digital-only",
        label: "Option 3 — Online Material/Digital Certificate (3-Part)",
        price: "GHS 1659.17 ×3",
        priceNote: "Phase payments across 3 months",
        features: [
          "Access to LIVE & recorded sessions of CCBC",
          "Digital Certificate of Completion",
        ],
        payLink: null,
      },
      {
        id: "recorded-only",
        label: "Option 5 — CCBC365 Recorded Only (Subscription)",
        price: "GHS 350/mo",
        priceNote: "Subscription — recorded sessions only",
        features: [
          "Access to recorded sessions of CCBC",
          "Certificate of Completion (digital)",
        ],
        payLink: COURSE_PAYMENT_LINKS.ccbc_365_recorded,
      },
    ],
  },
  {
    id: "ai-cybersecurity-course",
    slug: "ai-and-cybersecurity",
    title: "AI & Cybersecurity",
    description:
      "Explore the dual role of AI in cybersecurity, learning to leverage it for defense and to protect against AI-driven threats.",
    image: ai,
    price: "Free",
    link: "https://example.com/courses/ai-cybersecurity",
    details: [
      "Understand how AI is used in cyber attacks.",
      "Build AI-powered security monitoring tools.",
      "Explore the ethics of AI in security.",
    ],
    enrollmentOptions: [
      {
        id: "notify",
        label: "Notify Me",
        priceNote: "Upcoming — join waitlist",
        features: ["Get notified when enrollment opens"],
        payLink: null,
      },
    ],
  },
  {
    id: "cyber-ceo",
    slug: "cyber-ceo",
    title: "Cyber CEO",
    description:
      "Equip yourself with the strategic knowledge to lead your organization through complex cyber challenges and manage digital risk effectively.",
    image: ceo,
    price: "Free",
    link: "https://example.com/courses/cyber-ceo",
    details: [
      "Develop a robust cybersecurity strategy.",
      "Learn about governance, risk, and compliance (GRC).",
      "Manage cybersecurity budgets and investments.",
    ],
    enrollmentOptions: [
      {
        id: "notify",
        label: "Notify Me",
        priceNote: "Upcoming — join waitlist",
        features: ["Get notified when enrollment opens"],
        payLink: null,
      },
    ],
  },
];

export function getCourseById(id) {
  return courses.find((c) => c.id === id);
}

export function getCourseBySlug(slug) {
  return courses.find((c) => c.slug === slug);
}
