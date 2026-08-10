import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Sparkles, X } from "lucide-react";
import { apiClient } from "../../api/client";
import { PLANNED_EVENTS } from "./eventsContent";

/**
 * "Events We're Planning" — demand signals before we commit a venue and a date.
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
                className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#F2600B]/25 bg-[#0c0705] shadow-2xl shadow-black/70"
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
                    className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-gray-300 transition hover:border-[#F2600B] hover:text-white"
                >
                    <X size={17} />
                </button>

                {done ? (
                    <div className="p-8 text-center">
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
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#ff8534]">
                            Register interest
                        </span>
                        <h3 className="hero-display mt-2 pr-8 text-xl font-bold leading-snug text-white">
                            {event.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-400">
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

export default function PlannedEvents() {
    const [activeEvent, setActiveEvent] = useState(null);
    const [registered, setRegistered] = useState([]);

    // localStorage is only available in the browser — read it after mount.
    useEffect(() => {
        setRegistered(readRegistered());
    }, []);

    const handleRegistered = useCallback(
        (id) => setRegistered((prev) => [...new Set([...prev, id])]),
        []
    );

    return (
        <div>
            <div className="grid gap-5 md:grid-cols-2">
                {PLANNED_EVENTS.map((event, index) => {
                    const CardIcon = event.Icon;
                    const alreadyIn = registered.includes(event.id);

                    return (
                        <motion.article
                            key={event.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                            transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#F2600B]/15 bg-gradient-to-br from-[#1a0d05] to-[#0c0705] p-6 transition-colors duration-500 hover:border-[#F2600B]/45 sm:p-7"
                        >
                            {/* Structural grid wash */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(#F2600B 1px, transparent 1px), linear-gradient(90deg, #F2600B 1px, transparent 1px)",
                                    backgroundSize: "44px 44px",
                                }}
                            />

                            <div className="relative flex items-start justify-between gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#F2600B]/35 bg-[#F2600B]/10 text-[#F2600B] transition-colors duration-300 group-hover:border-[#F2600B]/70 group-hover:bg-[#F2600B]/20">
                                    <CardIcon size={22} />
                                </span>
                                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold text-gray-300">
                                    {event.window}
                                </span>
                            </div>

                            <h3 className="hero-display relative mt-5 text-xl font-bold leading-snug text-white">
                                {event.title}
                            </h3>
                            <p className="relative mt-3 flex-1 text-sm leading-relaxed text-gray-400">
                                {event.pitch}
                            </p>

                            <div className="relative mt-5 flex flex-wrap gap-2">
                                {event.signals.map((signal) => (
                                    <span
                                        key={signal}
                                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-gray-400"
                                    >
                                        {signal}
                                    </span>
                                ))}
                            </div>

                            <div className="relative mt-6 space-y-3 border-t border-white/10 pt-5">
                                <p className="text-xs text-gray-500">
                                    {event.format} · {event.venue}
                                </p>

                                {alreadyIn ? (
                                    <span className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#F2600B]/40 bg-[#F2600B]/10 px-6 py-3 text-sm font-semibold text-[#ff8534]">
                                        <CheckCircle2 size={16} />
                                        You&apos;re on the list
                                    </span>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setActiveEvent(event)}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F2600B] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#F2600B]/20 transition-all duration-300 hover:bg-[#d94f00] hover:shadow-[#F2600B]/40"
                                    >
                                        <Sparkles size={16} />
                                        I&apos;m interested
                                    </button>
                                )}
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
