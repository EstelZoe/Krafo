import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import ccbc from "../assets/images/ccbc.png";
import ai from "../assets/images/AI&Cyber.png";
import ceo from "../assets/images/ceo.png";

// Consolidated course data with enrollment options - matching Home.jsx styling patterns
const COURSE_PAYMENT_LINKS = {
  ccbc_onetime: "https://paystack.com/buy/ccbc-iamrnz",
  ccbc_365_recorded: "https://paystack.com/buy/ccbc-365---recorded-sessions-access-only-qeilat",
};

const courses = [
  {
    id: "cybersecurity-course",
    slug: "cybersecurity-capacity-building-course-ccbc",
    title: "Cybersecurity Capacity Building Course (CCBC)",
    description: "A comprehensive program designed to build a strong foundation in cybersecurity principles, from network defense to incident response.",
    image: ccbc,
    price: "GHC 5,750",
    details: [
      "12 months online access to resources.",
      "Networking & a Certificate of Completion.",
      "18 topics with quizzes & hands-on exercises.",
    ],
    enrollmentOptions: [
      {
        id: "one-time",
        label: "One‑Time Payment",
        price: "5750",
        currency: "GHS",
        priceNote: "No registration fee • Full payment",
        bg: "bg-[#1A1A1A]/60",
        ring: "ring-[#F2600B33]",
        tierColor: "text-[#F2600B]",
        badge: "MOST POPULAR",
        features: [
          { icon: "graduation-cap", text: "Complete graduation package with school supplies" },
          { icon: "gift", text: "FREE Power Bank (while supplies last)", highlight: true },
          { icon: "shirt", text: "Krafo Systems branded bag & T‑Shirt" },
          { icon: "book", text: "Printed CCBC Binder + HTHM Notebook A5" },
          { icon: "award", text: "Official Certificate of Completion" },
          { icon: "clipboard", text: "Attendance commitment form" },
        ],
        payLinks: [
          { label: "Registration", url: "https://paystack.shop/pay/mindfirstacademy" },
          { label: "Full Payment", url: "https://paystack.com/buy/ccbc-iamrnz" }
        ],
      },
      {
        id: "three-phase",
        label: "3‑Part Payment Plan",
        price: "6000",
        currency: "GHS",
        priceNote: "1916×3 + Registration 250",
        bg: "bg-[#0E0E0E]",
        ring: "ring-[#F2600B55]",
        tierColor: "text-orange-400",
        badge: "FLEXIBLE",
        features: [
          { icon: "graduation-cap", text: "Complete graduation package included" },
          { icon: "package", text: "All school supplies provided" },
          { icon: "briefcase", text: "Branded materials & printed binder" },
          { icon: "award", text: "Certificate of completion" },
          { icon: "calendar", text: "Spread payments: Sep/Oct/Nov", highlight: true },
          { icon: "credit-card", text: "Easy monthly installments" },
        ],
        payLinks: [
          { label: "Register & Pay", url: "https://paystack.shop/pay/mindfirstacademy" }
        ],
      },
      {
        id: "digital-only",
        label: "Digital Certificate (3‑Part)",
        price: "4977.50",
        currency: "GHS",
        priceNote: "1659.17×3 • Online materials only",
        bg: "bg-[#131313]",
        ring: "ring-[#F2600B88]",
        tierColor: "text-orange-300",
        badge: "DIGITAL",
        features: [
          { icon: "video", text: "Access to LIVE sessions of CCBC", highlight: true },
          { icon: "play-circle", text: "Access to recorded sessions library" },
          { icon: "award", text: "Digital Certificate of Completion" },
          { icon: "shield", text: "Cyber Defender certification track" },
          { icon: "smartphone", text: "Mobile-friendly learning platform" },
          { icon: "download", text: "Downloadable course materials" },
        ],
        payLinks: [
          { label: "Registration", url: "https://paystack.shop/pay/mindfirstacademy" },
          { label: "3-Month Plan", url: "https://paystack.shop/pay/i2s0gozdx3" }
        ],
      },
      {
        id: "digital-onetime",
        label: "Digital Only (One‑Time)",
        price: "4727.50",
        currency: "GHS", 
        priceNote: "No registration • Digital certificate",
        bg: "bg-[#0A0A0A]",
        ring: "ring-[#22D3EE44]",
        tierColor: "text-cyan-400",
        badge: "BEST VALUE",
        features: [
          { icon: "video", text: "Full access to LIVE & recorded sessions", highlight: true },
          { icon: "shield", text: "Cyber Defender digital certificate" },
          { icon: "infinity", text: "Lifetime access to materials" },
          { icon: "download", text: "All downloadable resources included" },
          { icon: "monitor", text: "No physical materials needed" },
          { icon: "zap", text: "Instant access after payment", highlight: true },
        ],
        payLinks: [
          { label: "Pay Now", url: "https://paystack.shop/pay/ccbconlineonetime_pay" }
        ],
      },
      {
        id: "recorded-only",
        label: "CCBC365 Subscription",
        price: "165",
        currency: "GHS/mo",
        priceNote: "Monthly subscription • Recorded only • Starting November",
        bg: "bg-[#0E0E0E]",
        ring: "ring-[#65A30D44]",
        tierColor: "text-green-400",
        badge: "AFFORDABLE",
        features: [
          { icon: "play-circle", text: "Access to recorded sessions only" },
          { icon: "award", text: "Digital Certificate of Completion" },
          { icon: "book-open", text: "Monthly updated content library" },
          { icon: "x-circle", text: "Cancel anytime flexibility", highlight: true },
          { icon: "monitor", text: "Mobile & desktop access" },
          { icon: "refresh-cw", text: "Continuous learning updates" },
        ],
        payLinks: [
          { label: "Subscribe", url: "https://paystack.com/buy/ccbc-365---recorded-sessions-access-only-qeilat" }
        ],
      },
    ],
  },
  {
    id: "ai-cybersecurity-course",
    slug: "ai-and-cybersecurity",
    title: "AI & Cybersecurity",
    description: "Explore the dual role of AI in cybersecurity, learning to leverage it for defense and to protect against AI-driven threats.",
    image: ai,
    price: "Free",
    details: [
      "Understand how AI is used in cyber attacks.",
      "Build AI-powered security monitoring tools.",
      "Explore the ethics of AI in security.",
    ],
    enrollmentOptions: [
      {
        id: "notify",
        label: "Notify Me",
        price: "Coming Soon",
        priceNote: "Upcoming — join waitlist",
        bg: "bg-[#0E0E0E]",
        ring: "ring-[#F2600B55]",
        tierColor: "text-orange-400",
        features: ["Get notified when enrollment opens"],
        payLink: null,
      },
    ],
  },
  {
    id: "cyber-ceo",
    slug: "cyber-ceo",
    title: "Cyber CEO",
    description: "Equip yourself with the strategic knowledge to lead your organization through complex cyber challenges and manage digital risk effectively.",
    image: ceo,
    price: "Free",
    details: [
      "Develop a robust cybersecurity strategy.",
      "Learn about governance, risk, and compliance (GRC).",
      "Manage cybersecurity budgets and investments.",
    ],
    enrollmentOptions: [
      {
        id: "notify",
        label: "Notify Me",
        price: "Coming Soon",
        priceNote: "Upcoming — join waitlist",
        bg: "bg-[#131313]",
        ring: "ring-[#F2600B88]",
        tierColor: "text-orange-300",
        features: ["Get notified when enrollment opens"],
        payLink: null,
      },
    ],
  },
];

function getCourseBySlug(slug) {
  return courses.find((c) => c.slug === slug);
}

// Premium Icon Component - Industry-leading visual system
function FeatureIcon({ icon, className = "" }) {
  const iconMap = {
    "graduation-cap": "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
    "gift": "M12 3v18m-4-6V9a4 4 0 118 0v6M8 21l4-7 4 7M3 9h18v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
    "shirt": "M15 3a3 3 0 00-6 0M9 3v2a1 1 0 001 1h4a1 1 0 001-1V3M7 8l-2 9h14l-2-9",
    "book": "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    "award": "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    "clipboard": "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    "package": "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    "briefcase": "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
    "calendar": "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    "credit-card": "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H5a3 3 0 00-3 3v8a3 3 0 003 3z",
    "video": "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    "play-circle": "M10 9v6l5-3-5-3zM21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    "shield": "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    "smartphone": "M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z",
    "download": "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
    "infinity": "M9.172 16.172a4 4 0 015.656 0M9.172 7.828a4 4 0 015.656 0m-2.829 2.829l-2.828 2.828M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    "monitor": "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    "zap": "M13 10V3L4 14h7v7l9-11h-7z",
    "book-open": "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    "x-circle": "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    "refresh-cw": "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
  };

  return (
    <div className={`flex-shrink-0 w-5 h-5 ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={iconMap[icon] || iconMap["award"]} />
      </svg>
    </div>
  );
}

// Payment Link Button Component (inline)
function PaymentLinkButton({ href, children, disabled, className = "" }) {
  const cls = `mt-6 block rounded-lg text-center text-sm font-semibold transition-all duration-200 px-4 py-3 ${className} ${
    disabled
      ? "bg-gray-700 text-gray-300 cursor-not-allowed"
      : "bg-[#F2600B] text-white hover:bg-orange-600 hover:shadow-lg transform hover:-translate-y-0.5"
  }`;

  if (!href || disabled) {
    return (
      <button type="button" className={cls} disabled>
        {children}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  );
}

export default function CourseDetails() {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);

  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-semibold">Course not found</h1>
            <p className="text-gray-400 mt-2">We couldn't find that course.</p>
            <Link to="/courses" className="mt-6 inline-block px-6 py-3 bg-orange-600 rounded-lg text-black font-semibold">Back to Courses</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Hero */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[#0b0602] to-[#1a0a00]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              {course.title}
            </h1>
            <p className="text-gray-300 mt-4">{course.description}</p>
            <div className="mt-6 flex items-center gap-4">
              <span className="px-3 py-1 rounded-full text-black font-semibold" style={{background:'#F2600B'}}>
                {course.price}
              </span>
              <Link to="/courses" className="text-orange-400 hover:text-orange-300 underline">Back to Courses</Link>
            </div>
          </div>
          <div>
            {course.image && (
              <img src={course.image} alt={course.title} className="rounded-xl w-full h-auto object-cover border border-white/10" />
            )}
          </div>
        </div>
      </section>

      {/* Details + Enrollment */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-3 space-y-8">

          {/* Enrollment Options section - Optimized spacing and premium design */}
          <section className="relative isolate px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-[#000000] text-white font-body overflow-hidden">
            {/* Animated Cyber Background Grid */}
            <div className="absolute inset-0 -z-10 opacity-10 animate-pulse bg-[radial-gradient(#F2600B22_1px,transparent_1px)] [background-size:20px_20px]" />
            
            {/* Section Header - Reduced spacing */}
            <div className="mx-auto max-w-4xl text-center mb-12 pt-0">
              <h2 className="text-base font-semibold text-[#F2600B] tracking-wider uppercase animate-fade-up">Enrollment Options</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl animate-fade-up delay-100">
                Choose the right option for you
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-base font-medium text-gray-400 animate-fade-up delay-200">
                Select from our flexible payment plans and enrollment options designed to fit your needs and budget.
              </p>
            </div>

            {/* Options Grid - exact Home.jsx styling */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 items-start">
              {course.enrollmentOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`relative rounded-2xl ${option.bg} p-6 ring-1 ${option.ring} backdrop-blur-md hover:shadow-[0_0_30px_rgba(242,96,11,0.2)] hover:ring-[#F2600B] hover:scale-[1.02] transition-all duration-300 animate-fade-up delay-[${300 + index * 100}ms] min-h-[420px] flex flex-col`}
                >
                  {/* Badge */}
                  {option.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-[#F2600B] to-orange-500 text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                        {option.badge}
                      </span>
                    </div>
                  )}
                  
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className={`text-lg font-bold ${option.tierColor} mb-3`}>{option.label}</h3>
                    <div className="flex items-baseline gap-x-2 mb-2">
                      <span className="text-2xl font-bold tracking-tight text-white">{option.price}</span>
                      <span className="text-sm text-gray-400">{option.currency}</span>
                    </div>
                    <p className="text-xs text-gray-400">{option.priceNote}</p>
                  </div>
                  
                  {/* Features - Flex grow to push buttons to bottom */}
                  <div className="flex-grow">
                    <ul className="space-y-3 text-sm text-gray-300">
                      {option.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-x-3">
                          <FeatureIcon 
                            icon={feat.icon} 
                            className={`mt-0.5 ${feat.highlight ? 'text-[#F2600B]' : 'text-gray-400'}`} 
                          />
                          <span className={feat.highlight ? 'text-white font-medium' : ''}>{feat.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Payment Links - Always at bottom */}
                  <div className="mt-6 space-y-2">
                    {option.payLinks?.map((link, i) => (
                      <PaymentLinkButton 
                        key={i}
                        href={link.url}
                        className="w-full text-center"
                      >
                        {link.label}
                      </PaymentLinkButton>
                    )) || (
                      <PaymentLinkButton disabled className="w-full text-center">
                        Coming Soon
                      </PaymentLinkButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Keyframe Animations */}
            <style>
              {`
                @keyframes fade-up {
                  0% { opacity: 0; transform: translateY(20px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up {
                  animation: fade-up 0.8s ease forwards;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-[300ms] { animation-delay: 0.3s; }
                .delay-[400ms] { animation-delay: 0.4s; }
                .delay-[500ms] { animation-delay: 0.5s; }
              `}
            </style>
          </section>

          {/* CCBC Full Details - Intelligent Layout System */}
          {course.slug === 'cybersecurity-capacity-building-course-ccbc' && (
            <>
              {/* Course Overview - Hero Card with Stats */}
              <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A1A] via-[#0F0F0F] to-black border border-[#F2600B]/20 p-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2600B]/5 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <FeatureIcon icon="graduation-cap" className="text-[#F2600B] w-6 h-6" />
                    <h2 className="text-2xl font-bold text-white">Course Overview</h2>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    A 16-week comprehensive program offered both <span className="text-[#F2600B] font-semibold">IN-PERSON (in Accra)</span> and <span className="text-[#F2600B] font-semibold">ONLINE</span>, designed to equip learners with foundational cybersecurity knowledge, practical skills, and career development opportunities.
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-lg bg-black/30 border border-white/10">
                      <div className="text-2xl font-bold text-[#F2600B]">16</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">Weeks</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-black/30 border border-white/10">
                      <div className="text-2xl font-bold text-[#F2600B]">18</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">Topics</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-black/30 border border-white/10">
                      <div className="text-2xl font-bold text-[#F2600B]">2</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">Formats</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-black/30 border border-white/10">
                      <div className="text-2xl font-bold text-[#F2600B]">12</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">Months Access</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Curriculum Outline - Interactive Timeline */}
              <section className="relative rounded-2xl bg-gradient-to-br from-black via-[#0A0A0A] to-[#1A1A1A] border border-[#F2600B]/20 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <FeatureIcon icon="book-open" className="text-[#F2600B] w-6 h-6" />
                  <h2 className="text-2xl font-bold text-white">16-Week Curriculum Journey</h2>
                </div>
                
                {/* Timeline Container */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F2600B] via-orange-400 to-[#F2600B] opacity-30"></div>
                  
                  <div className="space-y-8">
                    {/* Week 1 */}
                    <div className="relative flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-[#F2600B] rounded-full flex items-center justify-center text-black font-bold text-sm">W1</div>
                      <div className="flex-1 bg-black/40 rounded-xl p-6 border border-white/10">
                        <h3 className="text-lg font-bold text-[#F2600B] mb-2">State of Cybersecurity in Africa</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-2"><FeatureIcon icon="graduation-cap" className="text-orange-400 w-4 h-4" />Akwaaba Orientation</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="shield" className="text-orange-400 w-4 h-4" />African cybersecurity landscape</div>
                        </div>
                      </div>
                    </div>

                    {/* Weeks 2-3 */}
                    <div className="relative flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">W2-3</div>
                      <div className="flex-1 bg-black/40 rounded-xl p-6 border border-white/10">
                        <h3 className="text-lg font-bold text-orange-400 mb-2">Chapter 1: Security Principles</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-2"><FeatureIcon icon="clipboard" className="text-orange-400 w-4 h-4" />Professional ethics</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="shield" className="text-orange-400 w-4 h-4" />Information assurance</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="award" className="text-orange-400 w-4 h-4" />Foundation concepts</div>
                        </div>
                      </div>
                    </div>

                    {/* Weeks 4-5 */}
                    <div className="relative flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">W4-5</div>
                      <div className="flex-1 bg-black/40 rounded-xl p-6 border border-white/10">
                        <h3 className="text-lg font-bold text-yellow-400 mb-2">Chapter 2: Access Controls</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-2"><FeatureIcon icon="shield" className="text-yellow-400 w-4 h-4" />Security controls implementation</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="clipboard" className="text-yellow-400 w-4 h-4" />Best practice policies</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="monitor" className="text-yellow-400 w-4 h-4" />Physical access systems</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="zap" className="text-yellow-400 w-4 h-4" />Logical access mechanisms</div>
                        </div>
                      </div>
                    </div>

                    {/* Weeks 5-6 */}
                    <div className="relative flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm">W5-6</div>
                      <div className="flex-1 bg-black/40 rounded-xl p-6 border border-white/10">
                        <h3 className="text-lg font-bold text-green-400 mb-2">Chapter 3: Network Security</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-2"><FeatureIcon icon="monitor" className="text-green-400 w-4 h-4" />Networking fundamentals</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="shield" className="text-green-400 w-4 h-4" />Security infrastructure</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="zap" className="text-green-400 w-4 h-4" />Threat landscape</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="award" className="text-green-400 w-4 h-4" />Mitigation strategies</div>
                        </div>
                      </div>
                    </div>

                    {/* Weeks 7-9 */}
                    <div className="relative flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-black font-bold text-sm">W7-9</div>
                      <div className="flex-1 bg-black/40 rounded-xl p-6 border border-white/10">
                        <h3 className="text-lg font-bold text-blue-400 mb-2">Chapter 4: Security Operations</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-2"><FeatureIcon icon="clipboard" className="text-blue-400 w-4 h-4" />Risk management</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="shield" className="text-blue-400 w-4 h-4" />Data protection</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="monitor" className="text-blue-400 w-4 h-4" />OS hardening</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="award" className="text-blue-400 w-4 h-4" />Governance</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="zap" className="text-blue-400 w-4 h-4" />Incident response</div>
                        </div>
                      </div>
                    </div>

                    {/* Weeks 9-12 */}
                    <div className="relative flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-black font-bold text-sm">W9-12</div>
                      <div className="flex-1 bg-black/40 rounded-xl p-6 border border-white/10">
                        <h3 className="text-lg font-bold text-purple-400 mb-2">Chapter 5: Business Continuity</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-2"><FeatureIcon icon="clipboard" className="text-purple-400 w-4 h-4" />Continuity planning</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="refresh-cw" className="text-purple-400 w-4 h-4" />Disaster recovery</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="graduation-cap" className="text-purple-400 w-4 h-4" />Group exercises</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="monitor" className="text-purple-400 w-4 h-4" />Scenario simulations</div>
                        </div>
                      </div>
                    </div>

                    {/* Weeks 13-14 */}
                    <div className="relative flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-black font-bold text-sm">W13-14</div>
                      <div className="flex-1 bg-black/40 rounded-xl p-6 border border-white/10">
                        <h3 className="text-lg font-bold text-pink-400 mb-2">Specialized Modules</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-2"><FeatureIcon icon="shield" className="text-pink-400 w-4 h-4" />Food Security</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="zap" className="text-pink-400 w-4 h-4" />Cyber & AI integration</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="book" className="text-pink-400 w-4 h-4" />Hacking The Human Mind</div>
                        </div>
                      </div>
                    </div>

                    {/* Week 15 */}
                    <div className="relative flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold text-sm">W15</div>
                      <div className="flex-1 bg-black/40 rounded-xl p-6 border border-white/10">
                        <h3 className="text-lg font-bold text-cyan-400 mb-2">From Learning To Leading</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-2"><FeatureIcon icon="graduation-cap" className="text-cyan-400 w-4 h-4" />Career development</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="clipboard" className="text-cyan-400 w-4 h-4" />Course Assessment</div>
                        </div>
                      </div>
                    </div>

                    {/* Week 16 */}
                    <div className="relative flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-[#F2600B] rounded-full flex items-center justify-center text-black font-bold text-sm">W16</div>
                      <div className="flex-1 bg-gradient-to-r from-[#F2600B]/10 to-orange-500/10 rounded-xl p-6 border border-[#F2600B]/30">
                        <h3 className="text-lg font-bold text-[#F2600B] mb-2">Final Assessment & Graduation</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-2"><FeatureIcon icon="clipboard" className="text-[#F2600B] w-4 h-4" />Comprehensive examination</div>
                          <div className="flex items-center gap-2"><FeatureIcon icon="award" className="text-[#F2600B] w-4 h-4" />Certification ceremony</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Assessment & Certification - Split Layout */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Assessment Methods */}
                <section className="relative rounded-2xl bg-gradient-to-br from-blue-900/20 via-black to-blue-800/10 border border-blue-400/20 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <FeatureIcon icon="clipboard" className="text-blue-400 w-6 h-6" />
                    <h2 className="text-2xl font-bold text-white">Assessment Methods</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-black/40 rounded-xl p-6 border border-blue-400/20">
                      <h3 className="text-lg font-bold text-blue-400 mb-4">Hands-On Learning</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <FeatureIcon icon="zap" className="text-blue-400 w-4 h-4" />
                          Weekly quizzes with immediate feedback
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <FeatureIcon icon="graduation-cap" className="text-blue-400 w-4 h-4" />
                          Group practical exercises
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <FeatureIcon icon="book" className="text-blue-400 w-4 h-4" />
                          Research assignments with role-based responsibilities
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <FeatureIcon icon="monitor" className="text-blue-400 w-4 h-4" />
                          Real-world case study analysis
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/40 rounded-xl p-6 border border-blue-400/20">
                      <h3 className="text-lg font-bold text-blue-400 mb-4">Learning Support</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <FeatureIcon icon="calendar" className="text-blue-400 w-4 h-4" />
                          Built-in preparation and study time
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <FeatureIcon icon="graduation-cap" className="text-blue-400 w-4 h-4" />
                          Peer discussion opportunities
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <FeatureIcon icon="clipboard" className="text-blue-400 w-4 h-4" />
                          Individual consultation availability
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Certification & Outcomes */}
                <section className="relative rounded-2xl bg-gradient-to-br from-[#F2600B]/20 via-black to-orange-800/10 border border-[#F2600B]/20 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <FeatureIcon icon="award" className="text-[#F2600B] w-6 h-6" />
                    <h2 className="text-2xl font-bold text-white">Certification & Outcomes</h2>
                  </div>
                  
                  <div className="bg-black/40 rounded-xl p-6 border border-[#F2600B]/20 mb-6">
                    <p className="text-gray-300 leading-relaxed">
                      Participants who complete all requirements receive the <span className="text-[#F2600B] font-semibold">CCBC (Cybersecurity Capacity Building Course)</span> professional certification and are recognized for demonstrating comprehensive cybersecurity knowledge and practical application skills.
                    </p>
                  </div>

                  <div className="bg-black/40 rounded-xl p-6 border border-[#F2600B]/20">
                    <h3 className="text-lg font-bold text-[#F2600B] mb-4">Graduates will be equipped with:</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm text-gray-300">
                        <FeatureIcon icon="award" className="text-[#F2600B] w-4 h-4 mt-0.5" />
                        Industry-recognized cybersecurity knowledge and skills
                      </div>
                      <div className="flex items-start gap-3 text-sm text-gray-300">
                        <FeatureIcon icon="shield" className="text-[#F2600B] w-4 h-4 mt-0.5" />
                        Practical experience in security implementation and management
                      </div>
                      <div className="flex items-start gap-3 text-sm text-gray-300">
                        <FeatureIcon icon="graduation-cap" className="text-[#F2600B] w-4 h-4 mt-0.5" />
                        Professional network within the African cybersecurity community
                      </div>
                      <div className="flex items-start gap-3 text-sm text-gray-300">
                        <FeatureIcon icon="clipboard" className="text-[#F2600B] w-4 h-4 mt-0.5" />
                        Understanding to create a Business Continuity Plan
                      </div>
                      <div className="flex items-start gap-3 text-sm text-gray-300">
                        <FeatureIcon icon="refresh-cw" className="text-[#F2600B] w-4 h-4 mt-0.5" />
                        Understanding to create a Disaster Recovery Plan
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* (Enrollment already shown above) */}
            </>
          )}

          {/* Course Highlights - Feature Cards */}
          <section className="relative rounded-2xl bg-gradient-to-br from-green-900/20 via-black to-green-800/10 border border-green-400/20 p-8">
            <div className="flex items-center gap-3 mb-8">
              <FeatureIcon icon="zap" className="text-green-400 w-6 h-6" />
              <h2 className="text-2xl font-bold text-white">Course Highlights</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {course.details?.map((detail, i) => {
                const icons = ["infinity", "graduation-cap", "book-open"];
                const colors = ["text-green-400", "text-emerald-400", "text-teal-400"];
                return (
                  <div key={i} className="bg-black/40 rounded-xl p-6 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 hover:transform hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <FeatureIcon icon={icons[i] || "award"} className={`${colors[i] || "text-green-400"} w-6 h-6 mt-1 flex-shrink-0`} />
                      <p className="text-gray-300 leading-relaxed">{detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
