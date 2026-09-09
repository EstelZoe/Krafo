// ProjectBrief — the Discovery questionnaire as a page.
//
// DORMANT BY DESIGN. The team lead is running this through an external form
// tool, so nothing in the site links here; the route exists so the page can be
// switched on later without rebuilding it. The questions themselves live in
// projectBriefQuestions.js, which is also the source the external form was
// built from — so the two cannot drift.
//
// Submission is deliberately unwired. `submitBrief` below is the single
// integration point: give it a real implementation and the page is live. It is
// not stubbed out silently — the form tells the visitor plainly that it is not
// accepting submissions yet rather than pretending to send.

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import Navbar from "../../assets/components/Navbar";
import Footer from "../../assets/components/Footer";
import { BRIEF_SECTIONS } from "./projectBriefQuestions";

/**
 * The single switch. Flip to true only once `submitBrief` genuinely delivers.
 * While it is false the page tells visitors so BEFORE they type anything, and
 * asks search engines not to index it.
 */
const ACCEPTING_SUBMISSIONS = false;

/**
 * The one function to implement when this page is switched on.
 *
 * Intended shape once live: POST the answers to the API, which stores the brief
 * and notifies info@ — and, per the agreed flow, emails the sender a
 * confirmation link so a brief only reaches the team once the address is
 * verified. Until then it resolves to `notImplemented` so the UI can say so
 * honestly instead of showing a success state for a message nobody received.
 */
async function submitBrief() {
    return { ok: false, reason: "notImplemented" };
}

/**
 * The route is unlinked, but a route in a single-page app is never secret — the
 * path string ships inside the JS bundle, so anyone reading it finds this page.
 * Unlinked only means undiscovered by accident. What we can prevent is the page
 * being indexed and turning up in search results as a Krafo page that does not
 * work, so while it is dormant it carries an explicit noindex.
 *
 * Follows the same mount/cleanup pattern ProductDetail uses for document.title,
 * since the project has no head-management library.
 */
function useNoIndexWhileDormant() {
    useEffect(() => {
        if (ACCEPTING_SUBMISSIONS) return undefined;
        const tag = document.createElement("meta");
        tag.name = "robots";
        tag.content = "noindex, nofollow";
        document.head.appendChild(tag);
        return () => document.head.removeChild(tag);
    }, []);
}

const isAnswered = (q, value) => {
    if (!q.required) return true;
    if (q.type === "multi") return Array.isArray(value) && value.length > 0;
    return typeof value === "string" && value.trim().length > 0;
};

export default function ProjectBrief() {
    useNoIndexWhileDormant();

    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [result, setResult] = useState(null);

    const section = BRIEF_SECTIONS[step];
    const isLast = step === BRIEF_SECTIONS.length - 1;

    const missing = useMemo(
        () => section.questions.filter((q) => !isAnswered(q, answers[q.id])),
        [section, answers]
    );

    const set = (id, value) => setAnswers((a) => ({ ...a, [id]: value }));

    const toggle = (id, option) =>
        setAnswers((a) => {
            const current = Array.isArray(a[id]) ? a[id] : [];
            return {
                ...a,
                [id]: current.includes(option)
                    ? current.filter((o) => o !== option)
                    : [...current, option],
            };
        });

    const advance = async () => {
        if (missing.length) {
            setShowErrors(true);
            return;
        }
        setShowErrors(false);
        if (!isLast) {
            setStep((s) => s + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        setResult(await submitBrief(answers));
    };

    const field = (q) => {
        const value = answers[q.id];
        const invalid = showErrors && !isAnswered(q, value);
        const ring = invalid ? "border-red-500/60" : "border-white/15";

        return (
            <div key={q.id} className="flex flex-col gap-2.5">
                <label
                    htmlFor={`q-${q.id}`}
                    className="flex items-baseline gap-2.5 text-[15px] font-semibold text-white"
                >
                    <span className="font-mono text-[11px] text-[#ff8534]">
                        {String(q.n).padStart(2, "0")}
                    </span>
                    <span>
                        {q.label}
                        {!q.required && (
                            <span className="ml-2 text-xs font-normal text-gray-500">
                                optional
                            </span>
                        )}
                    </span>
                </label>

                {q.help && <p className="pl-7 text-[13px] text-gray-500">{q.help}</p>}

                <div className="pl-7">
                    {q.type === "longtext" ? (
                        <textarea
                            id={`q-${q.id}`}
                            rows={4}
                            value={value || ""}
                            onChange={(e) => set(q.id, e.target.value)}
                            className={`w-full rounded-xl border ${ring} bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder-gray-600 outline-none transition-colors focus:border-[#F2600B]`}
                            placeholder="Type here…"
                        />
                    ) : q.type === "single" || q.type === "multi" ? (
                        <div
                            id={`q-${q.id}`}
                            role={q.type === "single" ? "radiogroup" : "group"}
                            aria-labelledby={`q-${q.id}`}
                            className="flex flex-wrap gap-2"
                        >
                            {q.options.map((opt) => {
                                const on =
                                    q.type === "multi"
                                        ? Array.isArray(value) && value.includes(opt)
                                        : value === opt;
                                return (
                                    <button
                                        key={opt}
                                        type="button"
                                        role={q.type === "single" ? "radio" : "checkbox"}
                                        aria-checked={on}
                                        onClick={() =>
                                            q.type === "multi"
                                                ? toggle(q.id, opt)
                                                : set(q.id, opt)
                                        }
                                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] ${
                                            on
                                                ? "border-[#F2600B] bg-[#F2600B]/15 text-white"
                                                : "border-white/15 bg-white/[0.03] text-gray-300 hover:border-white/35 hover:text-white"
                                        }`}
                                    >
                                        {on && <Check size={13} className="text-[#F2600B]" />}
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <input
                            id={`q-${q.id}`}
                            type={q.type}
                            value={value || ""}
                            onChange={(e) => set(q.id, e.target.value)}
                            className={`w-full max-w-md rounded-xl border ${ring} bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder-gray-600 outline-none transition-colors focus:border-[#F2600B]`}
                            placeholder="Type here…"
                        />
                    )}
                </div>

                {invalid && (
                    <p className="pl-7 text-[13px] text-red-400">
                        This one we do need before moving on.
                    </p>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="mx-auto max-w-3xl px-6 pt-28 pb-24">
                <div className="mb-3 h-1 w-12 rounded-full bg-[#F2600B]" />
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#ff8534]">
                    Start a project
                </span>
                <h1 className="hero-display mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
                    Tell us what you want to build
                </h1>
                <p className="mt-3 max-w-xl text-balance leading-relaxed text-gray-400">
                    Eighteen questions, mostly taps — about five minutes. It covers
                    websites, web apps, platforms and mobile apps, so you don&apos;t need
                    to know which one you need before you start.
                </p>

                {!ACCEPTING_SUBMISSIONS && (
                    <div
                        role="status"
                        className="mt-8 rounded-2xl border border-[#F2600B]/40 bg-[#F2600B]/[0.07] p-5"
                    >
                        <p className="font-semibold text-white">
                            This form isn&apos;t live yet
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-300">
                            You&apos;re welcome to look through the questions, but nothing
                            you type here is sent or saved anywhere — so please don&apos;t
                            fill in your details expecting a reply. To reach us today,{" "}
                            <Link
                                to="/contact"
                                className="font-semibold text-[#ff8534] underline underline-offset-2"
                            >
                                use the contact page
                            </Link>{" "}
                            or{" "}
                            <Link
                                to="/consultation"
                                className="font-semibold text-[#ff8534] underline underline-offset-2"
                            >
                                book a consultation
                            </Link>
                            .
                        </p>
                    </div>
                )}

                {/* Progress. Named rather than a bare bar, so the visitor can see
                    how much is left and what it is about. */}
                <div className="mt-9 flex flex-wrap items-center gap-x-2 gap-y-2">
                    {BRIEF_SECTIONS.map((s, i) => (
                        <span
                            key={s.id}
                            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                                i === step
                                    ? "bg-[#F2600B] text-white"
                                    : i < step
                                      ? "bg-[#F2600B]/15 text-[#ff8534]"
                                      : "bg-white/5 text-gray-500"
                            }`}
                        >
                            {i < step && <Check size={11} className="mr-1 inline" />}
                            {s.title}
                        </span>
                    ))}
                </div>

                {result?.reason === "notImplemented" ? (
                    <div className="mt-10 rounded-2xl border border-[#F2600B]/40 bg-[#F2600B]/[0.07] p-7">
                        <h2 className="hero-display text-xl font-bold">
                            This form isn&apos;t collecting submissions yet
                        </h2>
                        <p className="mt-3 leading-relaxed text-gray-300">
                            Your answers haven&apos;t been sent anywhere — we&apos;d rather
                            say so than show you a tick for a message nobody received. In
                            the meantime the fastest route to us is a direct one.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 rounded-full bg-[#F2600B] px-6 py-3 font-bold text-white transition-colors hover:bg-[#d94f00]"
                            >
                                Contact us <ArrowRight size={16} />
                            </Link>
                            <Link
                                to="/consultation"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-gray-200 transition-colors hover:border-[#F2600B]/60 hover:text-white"
                            >
                                Book a consultation
                            </Link>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="mt-10"
                    >
                        <h2 className="hero-display text-2xl font-bold">{section.title}</h2>
                        <p className="mt-2 text-sm text-gray-400">{section.blurb}</p>

                        <div className="mt-8 flex flex-col gap-8">
                            {section.questions.map(field)}
                        </div>

                        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowErrors(false);
                                    setStep((s) => Math.max(0, s - 1));
                                }}
                                disabled={step === 0}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>

                            <button
                                type="button"
                                onClick={advance}
                                className="inline-flex items-center gap-2 rounded-full bg-[#F2600B] px-7 py-3 font-bold text-white shadow-lg shadow-[#F2600B]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#d94f00]"
                            >
                                {isLast ? (
                                    <>
                                        Send brief <Send size={16} />
                                    </>
                                ) : (
                                    <>
                                        Continue <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>

            <Footer />
        </div>
    );
}
