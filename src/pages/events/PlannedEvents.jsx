import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Flame, Loader2, Sparkles, X } from "lucide-react";
import { apiClient } from "../../api/client";
import { PLANNED_EVENTS } from "./eventsContent";

/**
 * "Events We're Planning" — demand signals before we commit a venue and a date.
 *
 * Laid out as a momentum board: whichever event people actually want most
 * leads at double width with its demand meter, the rest sit alongside as
 * compact rows. The bar moving when you click is the point — it turns "leave
 * us your email" into "you just moved this closer to happening".
 *
 * Visitors register interest through a small modal; the submission goes to
 * POST /events/interest and shows up in Admin → Event Interest, where it can be
 * exported for Excel. Events registered from this browser are remembered in
 * localStorage purely so the button can say so — the server's compound unique
 * index is what actually prevents duplicate rows.
 */

const STORAGE_KEY = "krafo:eventInterest";

const readRegistered = () => {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        // Private browsing, disabled storage, or corrupted JSON — the feature
        // is cosmetic, so fall back to "nothing registered" and move on.
        return [];
    }
};

const rememberRegistered = (id) => {
    try {
        const next = [...new Set([...readRegistered(), id])];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
        /* nothing to do — see readRegistered */
    }
};

const EMPTY_FORM = { name: "", email: "", phone: "" };

function InterestModal({ event, onClose, onRegistered }) {
    const [form, setForm] = useState(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [done, setDone] = useState(false);
    const firstFieldRef = useRef(null);
    const restoreFocusRef = useRef(null);

    // Escape to dismiss, and keep the page behind from scrolling.
    useEffect(() => {
        restoreFocusRef.current = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e) => {
            if (e.key === "Escape" && !submitting) onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        firstFieldRef.current?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
            restoreFocusRef.current?.focus?.();
        };
        // onClose/submitting are read through the closure on each keydown;
        // re-binding on every keystroke isn't worth it.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            await apiClient.post("/events/interest", {
                plannedEventId: event.id,
                plannedEventTitle: event.title,
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
            });
            rememberRegistered(event.id);
            onRegistered(event.id);
            setDone(true);
        } catch (err) {
            const data = err.response?.data;
            setError(
                data?.messages?.join(" ") ||
                    data?.error ||
                    "We couldn't record that just now. Please try again in a moment."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => !submitting && onClose()}
            role="dialog"
            aria-modal="true"
            aria-label={`Register interest in ${event.title}`}
        >
            <motion.div
                className="relative grid w-full max-w-3xl overflow-hidden rounded-2xl border border-[#F2600B]/25 bg-[#0c0705] shadow-2xl shadow-black/70 md:grid-cols-2"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={() => !submitting && onClose()}
                    aria-label="Close"
                    className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-gray-300 backdrop-blur-md transition hover:border-[#F2600B] hover:text-white"
                >
                    <X size={17} />
                </button>

                {/* The advert, at a size worth looking at. Short on mobile so
                    the form is still reachable without scrolling past it. */}
                <div className="relative h-44 bg-black md:h-auto">
                    {event.media?.type === "video" ? (
                        <video
                            className="h-full w-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src={event.media.src} type="video/mp4" />
                        </video>
                    ) : (
                        <img
                            src={event.media?.src}
                            alt={`${event.title} flyer`}
                            className="h-full w-full object-cover"
                        />
                    )}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/40"
                    />
                    <span className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/20 bg-black/45 px-3 py-2 text-[11px] font-semibold text-white backdrop-blur-2xl">
                        {event.window} · {event.format}
                    </span>
                </div>

                {done ? (
                    <div className="flex flex-col justify-center p-8 text-center">
                        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#F2600B]/40 bg-[#F2600B]/10 text-[#F2600B]">
                            <CheckCircle2 size={28} />
                        </span>
                        <h3 className="hero-display mt-5 text-xl font-bold text-white">
                            You&apos;re on the list
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-400">
                            We&apos;ll email you as soon as{" "}
                            <span className="text-gray-200">{event.title}</span> is confirmed.
                            Enough interest is exactly what gets it scheduled.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#F2600B] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#d94f00]"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="max-h-[70vh] overflow-y-auto p-6 sm:p-8 md:max-h-[85vh]"
                    >
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#ff8534]">
                            Register interest
                        </span>
                        <h3 className="hero-display mt-2 pr-8 text-xl font-bold leading-snug text-white">
                            {event.title}
                        </h3>

                        {/* For the two smaller cards this is the only place the
                            description appears, so it runs in full here. */}
                        <p className="mt-3 text-sm leading-relaxed text-gray-200">
                            {event.pitch}
                        </p>

                        <ul className="mt-3 flex flex-wrap gap-1.5">
                            {event.signals.map((signal) => (
                                <li
                                    key={signal}
                                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-gray-400"
                                >
                                    {signal}
                                </li>
                            ))}
                        </ul>

                        <p className="mt-4 text-sm leading-relaxed text-gray-500">
                            Tell us where to reach you and we&apos;ll let you know the moment
                            this one has a date.
                        </p>

                        <div className="mt-6 space-y-4">
                            <div>
                                <label
                                    htmlFor="interest-name"
                                    className="mb-1.5 block text-sm font-medium text-gray-300"
                                >
                                    Full name
                                </label>
                                <input
                                    id="interest-name"
                                    ref={firstFieldRef}
                                    type="text"
                                    required
                                    minLength={2}
                                    autoComplete="name"
                                    value={form.name}
                                    onChange={update("name")}
                                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-gray-600 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#F2600B]"
                                    placeholder="Ama Mensah"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="interest-email"
                                    className="mb-1.5 block text-sm font-medium text-gray-300"
                                >
                                    Email address
                                </label>
                                <input
                                    id="interest-email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={update("email")}
                                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-gray-600 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#F2600B]"
                                    placeholder="you@company.com"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="interest-phone"
                                    className="mb-1.5 block text-sm font-medium text-gray-300"
                                >
                                    Phone{" "}
                                    <span className="font-normal text-gray-500">(optional)</span>
                                </label>
                                <input
                                    id="interest-phone"
                                    type="tel"
                                    autoComplete="tel"
                                    value={form.phone}
                                    onChange={update("phone")}
                                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-gray-600 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#F2600B]"
                                    placeholder="+233 24 000 0000"
                                />
                            </div>
                        </div>

                        {error && (
                            <p
                                role="alert"
                                className="mt-4 rounded-xl border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-300"
                            >
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F2600B] px-6 py-3.5 font-bold text-white shadow-lg shadow-[#F2600B]/25 transition hover:bg-[#d94f00] disabled:opacity-60"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 size={17} className="animate-spin" />
                                    Sending…
                                </>
                            ) : (
                                "Count me in"
                            )}
                        </button>

                        <p className="mt-3 text-center text-xs leading-relaxed text-gray-500">
                            We use these details only to tell you about this event. No list
                            sharing, and you can ask us to remove you at any time.
                        </p>
                    </form>
                )}
            </motion.div>
        </motion.div>
    );
}

/**
 * A demand meter. The bar filling is a promise, so `goal` should be a number
 * you would actually honour.
 */
function DemandMeter({ count, goal, size = "lead" }) {
    const known = typeof count === "number";
    const pct = known ? Math.min(100, Math.round((count / goal) * 100)) : 0;
    const remaining = known ? Math.max(0, goal - count) : null;
    const isLead = size === "lead";

    let caption = null;
    if (known) {
        if (remaining === 0) caption = "Enough interest — we're finding a venue.";
        else if (count === 0) caption = `Be the first. ${goal} asks and we book it.`;
        else caption = `${remaining} more and we book it.`;
    }

    return (
        <div>
            <div className={`flex items-baseline justify-between ${isLead ? "mb-2" : "mb-1.5"}`}>
                <span
                    className={`hero-display font-extrabold text-white ${
                        isLead ? "text-2xl" : "text-base"
                    }`}
                >
                    {known ? count : "—"}
                    <span className="ml-1 text-sm font-medium text-gray-500">/ {goal}</span>
                </span>
                {known && (
                    <span
                        className={`font-semibold text-[#ff8534] ${
                            isLead ? "text-xs" : "text-[10px]"
                        }`}
                    >
                        {pct}%
                    </span>
                )}
            </div>

            <div
                className={`w-full overflow-hidden rounded-full bg-white/10 ${
                    isLead ? "h-2" : "h-1.5"
                }`}
                role="progressbar"
                aria-valuenow={known ? count : 0}
                aria-valuemin={0}
                aria-valuemax={goal}
                aria-label={`Interest registered: ${known ? count : 0} of ${goal}`}
            >
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#F2600B] to-[#ff8534]"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>

            {caption && (
                <p className={`mt-2 text-gray-400 ${isLead ? "text-sm" : "text-[11px]"}`}>
                    {caption}
                </p>
            )}
        </div>
    );
}

export default function PlannedEvents() {
    const [activeEvent, setActiveEvent] = useState(null);
    const [registered, setRegistered] = useState([]);
    // null until the counts endpoint answers. Stays null if it can't be
    // reached, and every meter is simply omitted — the section still reads
    // correctly with no numbers in it at all.
    const [counts, setCounts] = useState(null);

    // localStorage is only available in the browser — read it after mount.
    useEffect(() => {
        setRegistered(readRegistered());
    }, []);

    useEffect(() => {
        let cancelled = false;

        apiClient
            .get("/events/interest/counts")
            .then((res) => {
                if (!cancelled) setCounts(res.data?.counts || {});
            })
            .catch(() => {
                // Endpoint not deployed yet, or offline. Not worth surfacing to
                // a visitor — the meters just don't appear.
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleRegistered = useCallback((id) => {
        setRegistered((prev) => [...new Set([...prev, id])]);
        // Move the bar straight away rather than waiting for a refetch — the
        // whole point is that visitors see their own click land.
        setCounts((prev) => (prev ? { ...prev, [id]: (prev[id] || 0) + 1 } : prev));
    }, []);

    const countFor = (id) => (counts ? counts[id] || 0 : undefined);

    // The lead is whichever event people actually want most. Before any counts
    // exist (or if they can't be fetched) the first entry leads, so the layout
    // never collapses.
    const ordered = useMemo(() => {
        if (!counts) return PLANNED_EVENTS;
        return [...PLANNED_EVENTS].sort((a, b) => (counts[b.id] || 0) - (counts[a.id] || 0));
    }, [counts]);

    const leadId = ordered[0]?.id;

    return (
        <div>
            {/*
                Desktop layout: the most-wanted card takes the left two-thirds
                at full height, while the other two stack down the right column.
                The explicit placement on the lead is what lets the other two
                auto-flow into column three, in order.

                Below lg it degrades to the lead full-width with the other two
                side by side, then a single column on phones.
            */}
            <div className="grid gap-5 md:grid-cols-2 lg:h-[820px] lg:grid-cols-3 lg:grid-rows-2">
                {ordered.map((event, index) => {
                    const CardIcon = event.Icon;
                    const alreadyIn = registered.includes(event.id);
                    const isLead = event.id === leadId;

                    return (
                        <motion.article
                            key={event.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className={`group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl border transition-all duration-500 lg:min-h-0 ${
                                isLead
                                    ? "border-[#F2600B]/50 shadow-[0_0_50px_-15px_rgba(242,96,11,0.5)] md:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1"
                                    : "border-[#F2600B]/20 hover:border-[#F2600B]/50 lg:col-start-3"
                            }`}
                        >
                            {/* The advert itself — left at full brightness. */}
                            {event.media?.type === "video" ? (
                                <video
                                    key={event.media.src}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                >
                                    <source src={event.media.src} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={event.media?.src}
                                    alt={`${event.title} flyer`}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}

                            {/* Just enough shading at the extremes to keep the
                                chips and panel edges legible — the artwork
                                itself is deliberately left undimmed. */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"
                            />

                            <span
                                className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md ${
                                    isLead
                                        ? "bg-[#F2600B] text-white shadow-lg shadow-[#F2600B]/30"
                                        : "border border-white/25 bg-white/15 text-white"
                                }`}
                            >
                                {isLead && <Flame size={13} />}
                                {isLead ? "Most wanted" : "In planning"}
                            </span>
                            <span className="absolute right-4 top-4 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                                {event.window}
                            </span>

                            {/* Glass panel — frosted rather than dimmed, so the
                                flyer stays visible through and around it. The
                                two stacked cards get half the height of the
                                lead, so their panel runs tighter. */}
                            <div
                                className={`relative m-3 rounded-2xl border border-white/20 bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl ${
                                    isLead ? "p-5 sm:p-6" : "p-4"
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <span
                                        className={`flex shrink-0 items-center justify-center rounded-xl border border-[#F2600B]/40 bg-[#F2600B]/15 text-[#F2600B] ${
                                            isLead ? "h-11 w-11" : "h-9 w-9"
                                        }`}
                                    >
                                        <CardIcon size={isLead ? 20 : 17} />
                                    </span>
                                    <h3
                                        className={`hero-display font-bold leading-snug text-white ${
                                            isLead ? "text-xl" : "text-base"
                                        }`}
                                    >
                                        {event.title}
                                    </h3>
                                </div>

                                {/* The pitch is deliberately absent from the two
                                    smaller cards — it's the biggest thing in the
                                    panel, and cutting it hands that height back
                                    to the flyer. It reappears in full inside the
                                    modal, so nothing is actually lost. */}
                                {isLead && (
                                    <p className="mt-3 text-sm leading-relaxed text-gray-200">
                                        {event.pitch}
                                    </p>
                                )}
                                <p className="mt-2 text-[11px] text-gray-400">
                                    {isLead ? `${event.format} · ${event.venue}` : event.format}
                                </p>

                                {counts && (
                                    <div
                                        className={`border-t border-white/15 ${
                                            isLead ? "mt-5 pt-4" : "mt-3 pt-3"
                                        }`}
                                    >
                                        <DemandMeter
                                            count={countFor(event.id)}
                                            goal={event.goal}
                                            size={isLead ? "lead" : "row"}
                                        />
                                    </div>
                                )}

                                <div className={isLead ? "mt-5" : "mt-3"}>
                                    {alreadyIn ? (
                                        <span
                                            className={`inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#F2600B]/50 bg-[#F2600B]/15 font-semibold text-[#ff8534] ${
                                                isLead ? "px-6 py-3 text-sm" : "px-4 py-2.5 text-xs"
                                            }`}
                                        >
                                            <CheckCircle2 size={isLead ? 16 : 14} />
                                            You&apos;re on the list
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setActiveEvent(event)}
                                            className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F2600B] font-bold text-white shadow-lg shadow-[#F2600B]/30 transition-all duration-300 hover:bg-[#d94f00] hover:shadow-[#F2600B]/50 ${
                                                isLead ? "px-6 py-3 text-sm" : "px-4 py-2.5 text-xs"
                                            }`}
                                        >
                                            <Sparkles size={isLead ? 16 : 14} />
                                            I&apos;m interested
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </div>

            <AnimatePresence>
                {activeEvent && (
                    <InterestModal
                        key={activeEvent.id}
                        event={activeEvent}
                        onClose={() => setActiveEvent(null)}
                        onRegistered={handleRegistered}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
