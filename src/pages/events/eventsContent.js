// ═══════════════════════════════════════════════════════════════════════
//   PLACEHOLDER CONTENT — REVIEW BEFORE LAUNCH
//
//  The photographs below are genuine Krafo assets already committed to the
//  repo, but every title, date, venue and attendance figure is ILLUSTRATIVE
//  scaffolding so the Events page reads as finished. Replace each entry with
//  verified records (and swap in the real gallery photos) before this page
//  goes public — nothing here is fetched from the API.
//
//  Upcoming events are NOT defined here: they come from GET /events and are
//  managed in Admin → Events.
// ═══════════════════════════════════════════════════════════════════════

import {
    Brain,
    Building2,
    GraduationCap,
    HeartHandshake,
    Sparkles,
    Stethoscope,
    Users,
} from "lucide-react";

// Signature-program artwork
import imgHthm from "../../assets/images/optimized/hackmind-lg.webp";
import imgCcbc from "../../assets/images/optimized/ccbc-lg.webp";
import imgCyberBytes from "../../assets/images/optimized/cyberbytes-lg.webp";
import imgCommunity from "../../assets/images/optimized/gdiw25-lg.webp";

// Past-event photography
import pastSchoolAssembly from "../../assets/images/optimized/IMG-56-lg.webp";
import pastTeamOutreach from "../../assets/images/optimized/IMG-3-lg.webp";
import pastStudents from "../../assets/images/optimized/IMG-15-lg.webp";
import pastMentoring from "../../assets/images/optimized/IMG-30-lg.webp";
import pastGdiwLaunch from "../../assets/images/optimized/flye-lg.webp";
import pastGdiwPanel from "../../assets/images/optimized/gdiw25-lg.webp";
import pastCcbcClass from "../../assets/images/optimized/ccbc-lg.webp";
import pastWorkshop from "../../assets/images/optimized/ccbc1-lg.webp";
import pastExtraA from "../../assets/images/optimized/IMG-7-lg.webp";
import pastExtraB from "../../assets/images/optimized/IMG-10-lg.webp";
import pastExtraC from "../../assets/images/optimized/IMG-17-lg.webp";
import pastExtraD from "../../assets/images/optimized/IMG-19-lg.webp";
import pastExtraE from "../../assets/images/optimized/IMG-34-lg.webp";
import pastExtraF from "../../assets/images/optimized/IMG-35-lg.webp";
import pastExtraG from "../../assets/images/optimized/ccbc3-lg.webp";
import pastExtraH from "../../assets/images/optimized/flye2-lg.webp";

// Planned-event card media. One video and two flyers — the flyers are
// PLACEHOLDERS borrowed from existing Krafo artwork until the real ones exist.
import vidCapacity from "../../assets/videos/hacking human mind.mp4";
import flyerClinic from "../../assets/images/optimized/ccbc-lg.webp";
import flyerRoundtable from "../../assets/images/optimized/flye-lg.webp";

// Tile-sized variants of the same frames. The homepage mosaic draws these at
// roughly 120px wide, so serving it the gallery-sized file meant shipping about
// forty times the pixels it could display. Keyed by the large source so a
// consumer can opt in without the event records changing shape.
import thumbHackmind from "../../assets/images/optimized/hackmind-sm.webp";
import thumbCcbc from "../../assets/images/optimized/ccbc-sm.webp";
import thumbCyberbytes from "../../assets/images/optimized/cyberbytes-sm.webp";
import thumbGdiw25 from "../../assets/images/optimized/gdiw25-sm.webp";
import thumbImg56 from "../../assets/images/optimized/IMG-56-sm.webp";
import thumbImg3 from "../../assets/images/optimized/IMG-3-sm.webp";
import thumbImg15 from "../../assets/images/optimized/IMG-15-sm.webp";
import thumbImg30 from "../../assets/images/optimized/IMG-30-sm.webp";
import thumbFlye from "../../assets/images/optimized/flye-sm.webp";
import thumbCcbc1 from "../../assets/images/optimized/ccbc1-sm.webp";
import thumbImg7 from "../../assets/images/optimized/IMG-7-sm.webp";
import thumbImg10 from "../../assets/images/optimized/IMG-10-sm.webp";
import thumbImg17 from "../../assets/images/optimized/IMG-17-sm.webp";
import thumbImg19 from "../../assets/images/optimized/IMG-19-sm.webp";
import thumbImg34 from "../../assets/images/optimized/IMG-34-sm.webp";
import thumbImg35 from "../../assets/images/optimized/IMG-35-sm.webp";
import thumbCcbc3 from "../../assets/images/optimized/ccbc3-sm.webp";
import thumbFlye2 from "../../assets/images/optimized/flye2-sm.webp";

export const EVENT_PHOTO_THUMBS = Object.freeze({
    [imgHthm]: thumbHackmind,
    [imgCcbc]: thumbCcbc,
    [imgCyberBytes]: thumbCyberbytes,
    [imgCommunity]: thumbGdiw25,
    [pastSchoolAssembly]: thumbImg56,
    [pastTeamOutreach]: thumbImg3,
    [pastStudents]: thumbImg15,
    [pastMentoring]: thumbImg30,
    [pastGdiwLaunch]: thumbFlye,
    [pastWorkshop]: thumbCcbc1,
    [pastExtraA]: thumbImg7,
    [pastExtraB]: thumbImg10,
    [pastExtraC]: thumbImg17,
    [pastExtraD]: thumbImg19,
    [pastExtraE]: thumbImg34,
    [pastExtraF]: thumbImg35,
    [pastExtraG]: thumbCcbc3,
    [pastExtraH]: thumbFlye2,
});

// ── Hero stat band ────────────────────────────────────────────────────
// PLACEHOLDER FIGURES — confirm against real records before launch.
export const EVENT_STATS = [
    { value: "20+", label: "Events hosted" },
    { value: "1,500+", label: "People reached" },
    { value: "12", label: "Schools & institutions" },
    { value: "2023", label: "Running since" },
];

// ── Signature programmes — the series Krafo runs year after year ──────
export const SIGNATURE_PROGRAMS = [
    {
        key: "hthm",
        label: "Hacking The Human Mind",
        short: "HTHM",
        Icon: Brain,
        image: imgHthm,
        format: "Half-day workshop · In-person & virtual",
        headline: "The mind is the real attack surface",
        text:
            "Our flagship free workshop. Attackers rarely break the encryption — they talk their way past a person. HTHM shows exactly how manipulation works, and how to see it coming before you click.",
        points: [
            "Live social-engineering demonstrations",
            "Real phishing and scam teardowns",
            "Practical habits your team keeps after the room empties",
        ],
        cta: { label: "Talk to us about hosting HTHM", to: "/contact" },
    },
    {
        key: "ccbc",
        label: "Capacity Building Course",
        short: "CCBC",
        Icon: GraduationCap,
        image: imgCcbc,
        format: "16-week hybrid cohort · Accra + online",
        headline: "From curious to career-ready",
        text:
            "The Cybersecurity Capacity Building Course takes beginners through foundational security skills across a 16-week hybrid programme, taught by practitioners who work the field every day.",
        points: [
            "Foundational security, networking and defence",
            "Hands-on labs, not slideware",
            "Cohort community and graduation showcase",
        ],
        cta: { label: "View the training", to: "/services#training" },
    },
    {
        key: "cyberbytes",
        label: "CyberBytes",
        short: "CyberBytes",
        Icon: Sparkles,
        image: imgCyberBytes,
        format: "Weekly sessions · Ages 9+ and their parents",
        headline: "Raising a generation that defends itself",
        text:
            "CyberBytes brings cyber-safety to young people and the adults around them — weekly, age-appropriate sessions on safe online habits, digital footprints and the scams built to catch children.",
        points: [
            "Designed for both scholars and parents",
            "School assemblies and homeschool collectives",
            "Safe-online habits that stick at home",
        ],
        cta: { label: "Ask about CyberBytes", to: "/contact" },
    },
    {
        key: "community",
        label: "Community & Partner",
        short: "Community",
        Icon: Users,
        image: imgCommunity,
        format: "Conferences, panels & industry weeks",
        headline: "On stage where the ecosystem gathers",
        text:
            "We show up across Ghana's tech ecosystem — panels, industry weeks and partner conferences — carrying one message: African organisations can defend themselves, with African expertise.",
        points: [
            "Keynotes, panels and fireside sessions",
            "Partner and ecosystem collaborations",
            "Open to the wider tech community",
        ],
        cta: { label: "Invite us to speak", to: "/contact" },
    },
];

// ── Events we're planning ─────────────────────────────────────────────
// PLACEHOLDER ENTRIES — these are the ideas we float to gauge demand before
// committing a venue and a date. Edit freely; `id` is what gets stored against
// every interest signup, so avoid changing an id once it has been published
// (the stored title snapshot keeps old rows readable, but the id is the key
// the admin screen groups by).
//
// `goal` is the number of interested people it would take to commit a venue
// and a date. It drives the progress bar, so set it to something you would
// actually honour — the bar filling is a promise.
//
// `media` is what the card advertises with: { type: "video" | "image", src }.
// PLACEHOLDER FLYERS — the two image entries currently borrow existing Krafo
// flyers. Swap them for the real artwork when it exists.
//
// Kept to three so each one gets a full card rather than a cramped row. A
// fourth would simply wrap onto the next line of the grid.
export const PLANNED_EVENTS = [
    {
        id: "hthm-kumasi",
        goal: 50,
        media: { type: "video", src: vidCapacity },
        Icon: Brain,
        title: "Hacking The Human Mind — Kumasi",
        window: "Targeting Q1 2027",
        venue: "Kumasi · venue to be confirmed",
        format: "Half-day workshop · In person",
        pitch:
            "Our flagship workshop has only ever run in Accra. Enough interest from the Ashanti Region and we'll bring the whole thing to Kumasi — same session, no travel.",
        signals: ["Free to attend", "Open to everyone", "Limited seats"],
    },
    {
        id: "sme-cyber-clinic",
        goal: 30,
        media: { type: "image", src: flyerClinic },
        Icon: Stethoscope,
        title: "Cyber Clinic for Small Businesses",
        window: "Targeting late 2026",
        venue: "Accra · drop-in format",
        format: "One-day clinic · Walk-in slots",
        pitch:
            "Bring your actual setup — your website, your email, your payment flow — and sit with a practitioner for thirty minutes. You leave with a written list of what to fix first.",
        signals: ["30-minute slots", "Bring your own systems", "Written action list"],
    },
    {
        id: "women-in-cyber",
        goal: 25,
        media: { type: "image", src: flyerRoundtable },
        Icon: HeartHandshake,
        title: "Women in Cyber — Roundtable",
        window: "Targeting Q2 2027",
        venue: "Accra · invitation + open seats",
        format: "Evening roundtable · In person",
        pitch:
            "A working conversation between women already in the field and women trying to get in — routes into the industry, what the work actually looks like, and who is hiring.",
        signals: ["Small group", "Mentor pairings", "Light refreshments"],
    },
    // Held back so the section stays at three full-width cards. Give it a
    // `media` entry and drop it back in whenever you want a fourth — the grid
    // wraps it onto the next row on its own.
    // {
    //     id: "board-briefing",
    //     goal: 20,
    //     media: { type: "image", src: /* flyer */ },
    //     Icon: Building2,
    //     title: "Cyber Risk Briefing for Boards",
    //     window: "Targeting 2027",
    //     venue: "Accra · closed session",
    //     format: "Breakfast briefing · Invitation only",
    //     pitch:
    //         "Ninety minutes for directors and executives on the questions a board should be asking its own technology team — and how to tell a real answer from a reassuring one.",
    //     signals: ["Executive level", "No technical jargon", "Closed room"],
    // },
];

// ── Past events gallery ───────────────────────────────────────────────
// PLACEHOLDER ENTRIES — real photos, illustrative details. Replace each
// record (and add `photos` for a fuller gallery) as archives are compiled.
export const PAST_EVENTS = [
    {
        id: "gdiw-panel-2025",
        year: "2025",
        date: "14 November 2025",
        title: "Ghana Digital & Innovation Week — HTHM Session",
        location: "Accra International Conference Centre",
        tag: "Conference",
        stat: "Panel session",
        image: pastGdiwPanel,
        photos: [pastGdiwPanel, pastExtraH, pastWorkshop],
        blurb:
            "Our co-founder took the Hacking The Human Mind session to GDIW's main programme, unpacking how social engineering quietly defeats good technology — and what teams can do about it on Monday morning.",
    },
    {
        id: "gdiw-launch-2025",
        year: "2025",
        date: "30 July 2025",
        title: "GDIW 2025 Official Launch",
        location: "Impact Hub, Accra",
        tag: "Ecosystem",
        stat: "Streamed live",
        image: pastGdiwLaunch,
        photos: [pastGdiwLaunch, pastExtraH],
        blurb:
            "Krafo joined the ecosystem at the official launch of Ghana Digital & Innovation Week 2025, alongside hubs, funders and partners shaping the country's digital agenda.",
    },
    {
        id: "cyberbytes-schools-2025",
        year: "2025",
        date: "Second term, 2025",
        title: "CyberBytes School Outreach",
        location: "Senior High Schools, Greater Accra",
        tag: "Youth",
        stat: "Full assemblies",
        image: pastSchoolAssembly,
        photos: [pastSchoolAssembly, pastExtraA, pastExtraB, pastExtraC],
        blurb:
            "A term of school assemblies taking cyber-safety directly to students — digital footprints, online scams, and the habits that keep a young person safe long after the session ends.",
    },
    {
        id: "cyberbytes-mentoring-2025",
        year: "2025",
        date: "Second term, 2025",
        title: "Student Mentoring Circles",
        location: "Greater Accra",
        tag: "Youth",
        stat: "Small-group sessions",
        image: pastMentoring,
        photos: [pastMentoring, pastExtraD, pastExtraE],
        blurb:
            "Beyond the assembly hall — small mentoring circles where students asked the questions they were too shy to raise in front of the whole school.",
    },
    {
        id: "cyberbytes-team-2025",
        year: "2025",
        date: "Second term, 2025",
        title: "Outreach Team on the Ground",
        location: "Greater Accra",
        tag: "Youth",
        stat: "Facilitator team",
        image: pastTeamOutreach,
        photos: [pastTeamOutreach, pastExtraF, pastExtraA],
        blurb:
            "The facilitators, volunteers and school partners who make the outreach programme possible — on campus, in the classroom, session after session.",
    },
    {
        id: "students-2025",
        year: "2025",
        date: "Second term, 2025",
        title: "Cyber Ambassadors Induction",
        location: "Greater Accra",
        tag: "Youth",
        stat: "Student cohort",
        image: pastStudents,
        photos: [pastStudents, pastExtraC, pastExtraD],
        blurb:
            "Students stepping up as peer cyber ambassadors, carrying safe-online practice back into their own classrooms and hostels.",
    },
    {
        id: "ccbc-cohort-2024",
        year: "2024",
        date: "Autumn 2024",
        title: "CCBC Cohort One — Launch & Graduation",
        location: "Accra, Ghana",
        tag: "Capacity Building",
        stat: "First graduates",
        image: pastCcbcClass,
        photos: [pastCcbcClass, pastExtraG, pastWorkshop],
        blurb:
            "The first Cybersecurity Capacity Building Course cohort ran the full 16-week hybrid programme and crossed the stage as our inaugural graduates.",
    },
    {
        id: "hthm-embassy-2024",
        year: "2024",
        date: "2024",
        title: "Hacking The Human Mind — In Person",
        location: "International Embassy of Suriname, Accra",
        tag: "Workshop",
        stat: "Invited audience",
        image: pastWorkshop,
        photos: [pastWorkshop, pastExtraG],
        blurb:
            "Our first in-person HTHM delivery, hosted at the International Embassy of Suriname — a room of leaders learning how their own instincts get used against them.",
    },
    {
        id: "hthm-launch-2023",
        year: "2023",
        date: "Autumn 2023",
        title: "Hacking The Human Mind — Launch",
        location: "Virtual",
        tag: "Workshop",
        stat: "Free & open",
        image: imgHthm,
        photos: [imgHthm],
        blurb:
            "The workshop that started it all: a free, open session built on a simple premise — protect the mind, and you protect everything it has the keys to.",
    },
];

// Distinct years, newest first — drives the gallery's filter chips.
export const PAST_EVENT_YEARS = [...new Set(PAST_EVENTS.map((e) => e.year))].sort(
    (a, b) => Number(b) - Number(a)
);
