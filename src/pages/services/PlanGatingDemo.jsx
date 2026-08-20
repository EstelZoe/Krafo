import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Lock, Users } from "lucide-react";

/**
 * Plans gating real features inside a running product.
 *
 * "Subscription and payment logic" reads like plumbing. What a founder is
 * actually buying is the ability to charge different customers different
 * amounts and have the product enforce it — so this shows the enforcement,
 * not a pricing table. Switch plan and features lock, seat counts change, and
 * a locked feature produces the upgrade prompt their customers would see.
 *
 * The plans here are an example set for a customer's own product. They are
 * NOT Krafo's pricing — the note under the demo says so, because a visitor
 * scanning this page could otherwise read it as our tiers.
 */

const PLANS = [
    { key: "starter", name: "Starter", price: "₵120", seats: 3 },
    { key: "growth", name: "Growth", price: "₵420", seats: 25, popular: true },
    { key: "business", name: "Business", price: "₵1,100", seats: "Unlimited" },
];

// Which plan each capability unlocks at. Ordered as a product would present
// them: everyday things first, the expensive infrastructure last.
const FEATURES = [
    { label: "Core records & dashboard", from: "starter" },
    { label: "Email notifications", from: "starter" },
    { label: "Custom branding", from: "growth" },
    { label: "Advanced reports & exports", from: "growth" },
    { label: "API access & integrations", from: "business" },
    { label: "Audit log & SSO", from: "business" },
];

const RANK = { starter: 0, growth: 1, business: 2 };

export default function PlanGatingDemo() {
    const [planKey, setPlanKey] = useState("starter");
    const [blocked, setBlocked] = useState(null);

    const plan = PLANS.find((p) => p.key === planKey) || PLANS[0];

    const choose = (key) => {
        setPlanKey(key);
        setBlocked(null);
    };

    return (
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:gap-10">
            {/* ── Plan picker ─────────────────────────────────────────── */}
            <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Your customer&apos;s plan
                </p>
                <div className="space-y-2.5">
                    {PLANS.map((p) => {
                        const on = p.key === planKey;
                        return (
                            <button
                                key={p.key}
                                type="button"
                                onClick={() => choose(p.key)}
                                aria-pressed={on}
                                className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-300 ${
                                    on
                                        ? "border-[#F2600B] bg-[#F2600B]/10 shadow-[0_0_28px_-12px_rgba(242,96,11,0.7)]"
                                        : "border-white/10 bg-[#111111] hover:border-[#F2600B]/40"
                                }`}
                            >
                                <span
                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                                        on ? "border-[#F2600B] bg-[#F2600B]" : "border-white/25"
                                    }`}
                                >
                                    {on && <Check size={9} className="text-white" />}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-white">
                                            {p.name}
                                        </span>
                                        {p.popular && (
                                            <span className="rounded-full bg-[#F2600B]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#ff8534]">
                                                Popular
                                            </span>
                                        )}
                                    </span>
                                    <span className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-400">
                                        <Users size={11} />
                                        {p.seats} {p.seats === "Unlimited" ? "seats" : "seats"}
                                    </span>
                                </span>
                                <span className="shrink-0 text-right">
                                    <span className="text-sm font-bold text-white">{p.price}</span>
                                    <span className="block text-[10px] text-gray-500">/month</span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <p className="mt-4 text-xs leading-relaxed text-gray-500">
                    An example plan set for a product you&apos;d own — not Krafo&apos;s pricing.
                    You decide the tiers; the platform enforces them.
                </p>
            </div>

            {/* ── The product, enforcing it ───────────────────────────── */}
            <div className="rounded-2xl border border-white/15 bg-[#0c0705] p-2 shadow-2xl shadow-black/60">
                <div className="overflow-hidden rounded-xl bg-white">
                    {/* App bar */}
                    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
                        <span className="flex items-center gap-1.5">
                            <span className="h-4 w-4 rounded bg-[#F2600B]" />
                            <span className="h-1.5 w-12 rounded-full bg-slate-800" />
                        </span>
                        <motion.span
                            key={plan.key}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-full bg-[#F2600B]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#F2600B]"
                        >
                            {plan.name}
                        </motion.span>
                    </div>

                    {/* Seat meter */}
                    <div className="border-b border-slate-100 px-4 py-3">
                        <div className="flex items-center justify-between text-[10px]">
                            <span className="font-semibold text-slate-600">Team seats</span>
                            <motion.span
                                key={`${plan.key}-seats`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-bold text-slate-800"
                            >
                                3 of {plan.seats}
                            </motion.span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                            <motion.div
                                className="h-full rounded-full bg-[#F2600B]"
                                animate={{
                                    width:
                                        plan.seats === "Unlimited"
                                            ? "8%"
                                            : `${(3 / plan.seats) * 100}%`,
                                }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </div>
                    </div>

                    {/* Feature list */}
                    <ul className="divide-y divide-slate-100">
                        {FEATURES.map((f) => {
                            const unlocked = RANK[plan.key] >= RANK[f.from];
                            const needs = PLANS.find((p) => p.key === f.from);
                            return (
                                <li key={f.label}>
                                    <button
                                        type="button"
                                        onClick={() => !unlocked && setBlocked(f)}
                                        disabled={unlocked}
                                        className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition-colors ${
                                            unlocked ? "cursor-default" : "hover:bg-slate-50"
                                        }`}
                                    >
                                        <span
                                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                                unlocked
                                                    ? "bg-emerald-100 text-emerald-600"
                                                    : "bg-slate-100 text-slate-400"
                                            }`}
                                        >
                                            {unlocked ? <Check size={11} /> : <Lock size={10} />}
                                        </span>
                                        <span
                                            className={`flex-1 text-[11px] ${
                                                unlocked
                                                    ? "font-medium text-slate-700"
                                                    : "text-slate-400"
                                            }`}
                                        >
                                            {f.label}
                                        </span>
                                        {!unlocked && (
                                            <span className="shrink-0 rounded-full bg-[#F2600B]/10 px-2 py-0.5 text-[9.5px] font-bold uppercase text-[#F2600B]">
                                                {needs?.name}
                                            </span>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* The prompt their customer would actually see */}
                    <AnimatePresence mode="wait">
                        {blocked && (
                            <motion.div
                                key={blocked.label}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden border-t border-[#F2600B]/20 bg-[#F2600B]/[0.06]"
                            >
                                <div className="flex items-center gap-3 px-4 py-3">
                                    <Lock size={14} className="shrink-0 text-[#F2600B]" />
                                    <p className="flex-1 text-[11px] leading-snug text-slate-600">
                                        <span className="font-semibold text-slate-800">
                                            {blocked.label}
                                        </span>{" "}
                                        is on{" "}
                                        {PLANS.find((p) => p.key === blocked.from)?.name}.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => choose(blocked.from)}
                                        className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F2600B] px-3 py-1.5 text-[10px] font-bold text-white transition hover:bg-[#d94f00]"
                                    >
                                        Upgrade <ArrowUpRight size={11} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!blocked && (
                        <p className="border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-center text-[10px] text-slate-400">
                            Try clicking a locked feature
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
