import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, ClipboardList, CreditCard, UserCheck } from "lucide-react";
import { useInView } from "react-intersection-observer";

/**
 * A booking request walking through its approval workflow.
 *
 * "Custom workflows and automated notifications" is the hardest claim on this
 * page to picture — it's the part clients most often don't realise they can
 * have. Running one request through the steps, with the side panel naming what
 * the system does at each stage without anyone touching it, turns an abstract
 * feature into something recognisable from the reader's own process.
 *
 * Only starts once scrolled into view, so nobody arrives mid-sequence.
 */

const STEPS = [
    {
        Icon: ClipboardList,
        title: "Request comes in",
        actor: "Customer",
        happens: "The form validates as it's filled in, so bad data never reaches your records.",
    },
    {
        Icon: UserCheck,
        title: "Goes for review",
        actor: "Automatic",
        happens: "Routed to whoever is on duty, with an email and a dashboard alert.",
    },
    {
        Icon: CreditCard,
        title: "Approved & invoiced",
        actor: "Staff",
        happens: "One click approves it, generates the invoice and records the payment link.",
    },
    {
        Icon: Bell,
        title: "Everyone is told",
        actor: "Automatic",
        happens: "Customer gets a confirmation, the calendar updates, the report recalculates.",
    },
];

const STEP_MS = 2600;

export default function WorkflowDemo() {
    const [ref, inView] = useInView({ threshold: 0.35, triggerOnce: false });
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (!inView) return undefined;
        const timer = setInterval(() => setActive((i) => (i + 1) % STEPS.length), STEP_MS);
        return () => clearInterval(timer);
    }, [inView]);

    const step = STEPS[active];
    const StepIcon = step.Icon;
    // The rail fills to the centre of the active node.
    const progress = (active / (STEPS.length - 1)) * 100;

    return (
        <div ref={ref} className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12 lg:items-center">
            {/* ── The rail ────────────────────────────────────────────── */}
            <div>
                <div className="relative">
                    {/* Track */}
                    <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-white/10 sm:block" />
                    <motion.div
                        className="absolute left-0 top-7 hidden h-0.5 bg-gradient-to-r from-[#F2600B] to-[#ff8534] sm:block"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />

                    <ol className="relative grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-3">
                        {STEPS.map((s, i) => {
                            const NodeIcon = s.Icon;
                            const done = i < active;
                            const on = i === active;
                            return (
                                <li key={s.title} className="flex flex-col items-center text-center">
                                    <motion.span
                                        animate={{
                                            scale: on ? 1.12 : 1,
                                            borderColor: on || done ? "#F2600B" : "rgba(255,255,255,0.15)",
                                        }}
                                        transition={{ duration: 0.35 }}
                                        className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 bg-[#0c0705] ${
                                            on
                                                ? "text-[#F2600B] shadow-[0_0_24px_rgba(242,96,11,0.5)]"
                                                : done
                                                ? "text-[#F2600B]/70"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        {done ? <Check size={20} /> : <NodeIcon size={20} />}
                                    </motion.span>

                                    <span
                                        className={`mt-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                                            on ? "text-[#ff8534]" : "text-gray-600"
                                        }`}
                                    >
                                        {s.actor}
                                    </span>
                                    <span
                                        className={`hero-display mt-1 text-sm font-bold leading-tight transition-colors ${
                                            on || done ? "text-white" : "text-gray-500"
                                        }`}
                                    >
                                        {s.title}
                                    </span>
                                </li>
                            );
                        })}
                    </ol>
                </div>

                {/* Step dots — also a manual control */}
                <div className="mt-8 flex justify-center gap-2">
                    {STEPS.map((s, i) => (
                        <button
                            key={s.title}
                            type="button"
                            onClick={() => setActive(i)}
                            aria-label={`Show step ${i + 1}: ${s.title}`}
                            aria-current={i === active}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                i === active
                                    ? "w-6 bg-[#F2600B]"
                                    : "w-1.5 bg-[#F2600B]/30 hover:bg-[#F2600B]/60"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* ── What the system just did ────────────────────────────── */}
            <div className="rounded-2xl border border-[#F2600B]/20 bg-[#111111] p-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#F2600B]/30 bg-[#F2600B]/10 text-[#F2600B]">
                            <StepIcon size={20} />
                        </span>
                        <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-[#ff8534]">
                            Step {active + 1} of {STEPS.length} · {step.actor}
                        </p>
                        <h3 className="hero-display mt-1 text-xl font-bold text-white">
                            {step.title}
                        </h3>
                        <p className="mt-3 min-h-[4.5rem] text-sm leading-relaxed text-gray-300">
                            {step.happens}
                        </p>
                    </motion.div>
                </AnimatePresence>

                <p className="mt-2 border-t border-white/10 pt-4 text-xs leading-relaxed text-gray-500">
                    An example flow. Yours is mapped from how your team already works — we
                    don&apos;t make you adopt someone else&apos;s process.
                </p>
            </div>
        </div>
    );
}
