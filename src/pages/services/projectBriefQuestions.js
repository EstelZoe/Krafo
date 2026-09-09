/**
 * Project_Brief — the Discovery questionnaire.
 *
 * SHARED_PROCESS describes Discovery as "a short form or call". This is the
 * form. It is deliberately ONE questionnaire for all four software offerings
 * (websites, web apps, SaaS, mobile) rather than four, because a visitor does
 * not arrive knowing which one they need — telling us that is our job, not
 * theirs.
 *
 * How it manages that with 18 questions: five identify the person and the
 * organisation, one asks for the brief in their own words, and the rest are
 * mostly single-tap choices. The routing weight sits almost entirely on
 * `capabilities` (Q10) and `delivery` (Q11) — asked as plain outcomes ("people
 * create accounts and log in") rather than product names, so nobody has to know
 * what a "SaaS platform" is to end up in one.
 *
 * Kept as data, not markup, so the same set can be rendered by the in-house
 * page and handed to an external form tool without the two drifting apart.
 * See ROUTING below for how the answers resolve to a product category.
 */

export const BRIEF_SECTIONS = Object.freeze([
    {
        id: "about-you",
        title: "About you",
        blurb: "So we know who we're speaking to and how to reach you.",
        questions: [
            { id: "name", n: 1, label: "Your name", type: "text", required: true },
            {
                id: "organisation",
                n: 2,
                label: "Organisation or project name",
                type: "text",
                required: true,
                help: "If it doesn't have a name yet, tell us what you'd call it.",
            },
            { id: "email", n: 3, label: "Email address", type: "email", required: true },
            {
                id: "phone",
                n: 4,
                label: "Phone or WhatsApp number",
                type: "tel",
                required: false,
                help: "Optional — often the fastest way to ask a follow-up question.",
            },
        ],
    },
    {
        id: "what-you-need",
        title: "What you're building",
        blurb: "The shape of the thing, in your own words.",
        questions: [
            {
                id: "orgType",
                n: 5,
                label: "What kind of organisation is this for?",
                type: "single",
                required: true,
                // Mirrors INDUSTRY_PROFILES so a brief lands in the same four
                // audiences the rest of the site is built around.
                options: [
                    "Government or public sector",
                    "Business or SME",
                    "School or institution",
                    "NGO or non-profit",
                    "Startup or individual",
                ],
            },
            {
                id: "goal",
                n: 6,
                label: "In a sentence or two, what do you want to build — and why now?",
                type: "longtext",
                required: true,
                help: "The single most useful answer on this form. Plain language is fine.",
            },
            {
                id: "newOrExisting",
                n: 7,
                label: "Is this new, or does something already exist?",
                type: "single",
                required: true,
                // Replacement work carries migration, and extension work carries
                // an unknown codebase. Both change the estimate materially.
                options: [
                    "Brand new — nothing exists yet",
                    "Replacing something we already have",
                    "Adding to a system we already use",
                ],
            },
            {
                id: "audience",
                n: 8,
                label: "Who will use it?",
                type: "multi",
                required: true,
                options: [
                    "The general public",
                    "Our own staff or team",
                    "Our customers or clients",
                    "Members or students",
                    "Administrators only",
                ],
            },
            {
                id: "scale",
                n: 9,
                label: "Roughly how many people will use it in the first year?",
                type: "single",
                required: false,
                options: [
                    "Under 100",
                    "100 to 1,000",
                    "1,000 to 10,000",
                    "More than 10,000",
                    "No idea yet",
                ],
            },
        ],
    },
    {
        id: "what-it-does",
        title: "What it needs to do",
        blurb: "Tick anything that sounds right. Skipping one costs nothing — we'll confirm it all on the call.",
        questions: [
            {
                id: "capabilities",
                n: 10,
                label: "Which of these does it need?",
                type: "multi",
                required: false,
                // The routing engine. Every option is an outcome a non-technical
                // person can judge; none of them names a product tier.
                options: [
                    "Pages we can update ourselves (news, blog, team)",
                    "People create accounts and log in",
                    "Different people see different things (roles and permissions)",
                    "Take payments or sell online",
                    "Bookings, appointments or scheduling",
                    "Dashboards, reports or data views",
                    "Forms that collect and store information",
                    "Upload and manage files or documents",
                    "Send emails or notifications automatically",
                    "Customers subscribe and pay regularly",
                    "Connect to another system we already use",
                    "Work offline or on a poor connection",
                    "None of these — it's mainly informational",
                ],
            },
            {
                id: "delivery",
                n: 11,
                label: "Does it need to be an app people install on their phone?",
                type: "single",
                required: true,
                options: [
                    "Yes — an installed app (iOS and/or Android)",
                    "No — a mobile-friendly website is fine",
                    "Not sure, advise us",
                ],
            },
            {
                id: "sensitiveData",
                n: 12,
                label: "Will it hold personal or sensitive information?",
                type: "single",
                required: true,
                help: "For example student records, health data, financial details, or beneficiary information.",
                // Krafo is CSA-licensed and DPC-registered; this decides whether
                // a brief needs the compliance conversation, and it is scope.
                options: ["Yes", "No", "Not sure"],
            },
            {
                id: "size",
                n: 13,
                label: "Roughly how many pages or screens do you imagine?",
                type: "single",
                required: false,
                options: ["Under 5", "5 to 15", "15 to 40", "More than 40", "No idea"],
            },
            {
                id: "assets",
                n: 14,
                label: "Do you have branding and content ready?",
                type: "single",
                required: true,
                // Missing copy and identity is real design work and one of the
                // commonest reasons a build runs long.
                options: [
                    "Yes — brand and content are ready",
                    "Logo only, no written content",
                    "Nothing yet — we'd need help with both",
                ],
            },
        ],
    },
    {
        id: "practicalities",
        title: "Practicalities",
        blurb: "Last four. These shape the proposal more than anything else here.",
        questions: [
            {
                id: "timeline",
                n: 15,
                label: "When would you like it live?",
                type: "single",
                required: true,
                options: [
                    "As soon as possible",
                    "Within 3 months",
                    "3 to 6 months",
                    "No fixed date",
                ],
            },
            {
                id: "budget",
                n: 16,
                label: "Do you have a budget range in mind?",
                type: "single",
                required: false,
                // Bands sit on the real tier boundaries in PRICING_DATA, so an
                // answer here maps straight onto a starting tier.
                help: "An honest range helps us propose something real rather than a guess.",
                options: [
                    "Under GHS 10,000",
                    "GHS 10,000 to 25,000",
                    "GHS 25,000 to 70,000",
                    "Over GHS 70,000",
                    "Not sure — we'd like guidance",
                ],
            },
            {
                id: "maintenance",
                n: 17,
                label: "After launch, who will look after it?",
                type: "single",
                required: false,
                options: [
                    "We'd like Krafo to maintain it",
                    "We have our own team",
                    "Not decided yet",
                ],
            },
            {
                id: "notes",
                n: 18,
                label: "Anything else we should know?",
                type: "longtext",
                required: false,
                help: "Optional. Links to something you like, constraints, deadlines, anything.",
            },
        ],
    },
]);

export const BRIEF_QUESTIONS = Object.freeze(
    BRIEF_SECTIONS.flatMap((s) => s.questions)
);

/**
 * How the answers resolve to one of the four offerings. This is guidance for
 * whoever reads a brief — deliberately not shown to the visitor, who is told a
 * human will follow up rather than being given a tier on the spot.
 */
export const ROUTING = Object.freeze([
    {
        product: "Mobile Apps",
        signal: 'Q11 answered "installed app", or Q10 includes offline use.',
    },
    {
        product: "SaaS Platforms",
        signal:
            'Q10 includes "customers subscribe and pay regularly", usually with accounts and roles. Q9 above 1,000 reinforces it.',
    },
    {
        product: "Web Apps",
        signal:
            "Q10 includes accounts, roles, dashboards, bookings or an integration — but no recurring subscriptions.",
    },
    {
        product: "Websites",
        signal:
            'Q10 is only self-editable pages, forms, or "mainly informational". Q13 then sets the tier.',
    },
    {
        product: "Security scope on top",
        signal:
            'Q12 answered "Yes" — a compliance conversation belongs in the proposal regardless of which product it is.',
    },
]);
