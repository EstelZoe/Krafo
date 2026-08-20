import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Boxes, LayoutDashboard, Lock, Settings, Users } from "lucide-react";
import { useAutoCycle } from "./useAutoCycle";

/**
 * Hero visual for /services/saas — one product, three customers.
 *
 * Multi-tenancy is the hardest of the three product claims to picture, because
 * when it's built correctly it's invisible: every customer thinks they're
 * looking at software made for them. Switching tenant here re-skins the whole
 * app — name, mark, accent, data — while the navigation and layout stay
 * pixel-identical, which is exactly the point. One codebase, many customers.
 *
 * The tenant accent colours are deliberately not Krafo orange. Each customer
 * branding their own workspace IS the feature; rendering them all in our brand
 * would quietly argue the opposite.
 */

const TENANTS = [
    {
        key: "logistics",
        name: "Adinkra Logistics",
        short: "AL",
        accent: "#0ea5e9",
        soft: "rgba(14,165,233,0.10)",
        plan: "Business",
        stats: [
            { label: "Shipments", value: "1,847" },
            { label: "On time", value: "94%" },
        ],
        rows: [
            ["SH-8821", "Tema → Kumasi", "In transit"],
            ["SH-8814", "Accra → Takoradi", "Delivered"],
            ["SH-8809", "Tamale → Accra", "Delivered"],
        ],
    },
    {
        key: "health",
        name: "Nkwa Health",
        short: "NH",
        accent: "#10b981",
        soft: "rgba(16,185,129,0.10)",
        plan: "Growth",
        stats: [
            { label: "Patients", value: "612" },
            { label: "This week", value: "88" },
        ],
        rows: [
            ["PT-2043", "Morning clinic", "Checked in"],
            ["PT-2041", "Follow-up", "Scheduled"],
            ["PT-2038", "Consultation", "Complete"],
        ],
    },
    {
        key: "studio",
        name: "Sankofa Studio",
        short: "SS",
        accent: "#8b5cf6",
        soft: "rgba(139,92,246,0.10)",
        plan: "Starter",
        stats: [
            { label: "Projects", value: "27" },
            { label: "Invoiced", value: "₵91k" },
        ],
        rows: [
            ["PR-118", "Brand refresh", "In review"],
            ["PR-115", "Campaign site", "Active"],
            ["PR-110", "Photography", "Complete"],
        ],
    },
];

const NAV = [
    { label: "Dashboard", Icon: LayoutDashboard },
    { label: "Records", Icon: Boxes },
    { label: "Team", Icon: Users },
    { label: "Reports", Icon: BarChart3 },
    { label: "Settings", Icon: Settings },
];

const AUTO_MS = 3800;

export default function SaasMockup({ className = "" }) {
    const [tenantIndex, selectTenant] = useAutoCycle(TENANTS.length, {
        intervalMs: AUTO_MS,
    });
    const key = TENANTS[tenantIndex].key;

    const tenant = TENANTS.find((t) => t.key === key) || TENANTS[0];


    return (
        <div className={`relative ${className}`}>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[#F2600B]/10 blur-3xl"
            />

            {/* ── Tenant switcher ─────────────────────────────────────── */}
            <div
                className="relative mx-auto mb-5 flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md"
                role="group"
                aria-label="Preview the platform as different customers"
            >
                {TENANTS.map((t) => {
                    const on = t.key === key;
                    return (
                        <button
                            key={t.key}
                            type="button"
                            onClick={() => selectTenant(TENANTS.indexOf(t))}
                            aria-pressed={on}
                            className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2600B] ${
                                on ? "text-white" : "text-gray-400 hover:text-white"
                            }`}
                        >
                            {on && (
                                <motion.span
                                    layoutId="tenant-pill"
                                    className="absolute inset-0 rounded-full"
                                    style={{ backgroundColor: t.accent }}
                                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                />
                            )}
                            <span className="relative flex items-center gap-1.5">
                                <span
                                    className="flex h-4 w-4 items-center justify-center rounded text-[8px] font-bold text-white"
                                    style={{ backgroundColor: on ? "rgba(0,0,0,0.25)" : t.accent }}
                                >
                                    {t.short}
                                </span>
                                {t.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* ── The platform ────────────────────────────────────────── */}
            <div className="relative h-[390px] rounded-2xl border border-white/15 bg-[#0c0705] p-2 shadow-2xl shadow-black/70 sm:h-[430px]">
                <div className="flex h-full overflow-hidden rounded-xl bg-white">
                    {/* Sidebar — identical for every tenant, only the accent moves */}
                    <aside className="flex w-[34%] max-w-[150px] shrink-0 flex-col border-r border-slate-200 bg-slate-50 p-2.5">
                        <div className="flex items-center gap-1.5 px-1 pb-3">
                            <motion.span
                                key={`${tenant.key}-mark`}
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="flex h-5 w-5 items-center justify-center rounded text-[9px] font-bold text-white"
                                style={{ backgroundColor: tenant.accent }}
                            >
                                {tenant.short}
                            </motion.span>
                            <motion.span
                                key={`${tenant.key}-name`}
                                initial={{ opacity: 0, x: -4 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="truncate text-[9px] font-bold text-slate-800"
                            >
                                {tenant.name}
                            </motion.span>
                        </div>

                        <nav className="flex-1 space-y-0.5">
                            {NAV.map((item, i) => {
                                const NavIcon = item.Icon;
                                const current = i === 0;
                                return (
                                    <div
                                        key={item.label}
                                        className="flex items-center gap-1.5 rounded-md px-1.5 py-1.5"
                                        style={
                                            current ? { backgroundColor: tenant.soft } : undefined
                                        }
                                    >
                                        <NavIcon
                                            size={11}
                                            style={{
                                                color: current ? tenant.accent : "#94a3b8",
                                            }}
                                        />
                                        <span
                                            className="h-1.5 flex-1 rounded-full"
                                            style={{
                                                backgroundColor: current
                                                    ? tenant.accent
                                                    : "#cbd5e1",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </nav>

                        <div className="flex items-center gap-1 border-t border-slate-200 px-1 pt-2.5">
                            <Lock size={9} className="shrink-0 text-slate-400" />
                            <span className="text-[8px] font-medium text-slate-500">
                                Own data only
                            </span>
                        </div>
                    </aside>

                    {/* Main */}
                    <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
                            <span className="h-1.5 w-14 rounded-full bg-slate-800" />
                            <motion.span
                                key={`${tenant.key}-plan`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                                style={{ backgroundColor: tenant.soft, color: tenant.accent }}
                            >
                                {tenant.plan} plan
                            </motion.span>
                        </div>

                        <div className="min-h-0 flex-1 overflow-hidden p-3">
                            <div className="flex gap-2">
                                {tenant.stats.map((s) => (
                                    <motion.div
                                        key={`${tenant.key}-${s.label}`}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="min-w-0 flex-1 rounded-lg border border-slate-200 p-2"
                                        style={{ backgroundColor: tenant.soft }}
                                    >
                                        <p className="truncate text-[8.5px] font-medium uppercase tracking-wide text-slate-500">
                                            {s.label}
                                        </p>
                                        <p
                                            className="mt-0.5 truncate text-xs font-bold"
                                            style={{ color: tenant.accent }}
                                        >
                                            {s.value}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
                                {tenant.rows.map(([ref, what, status], i) => (
                                    <motion.div
                                        key={`${tenant.key}-${ref}`}
                                        initial={{ opacity: 0, x: -6 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.28, delay: i * 0.05 }}
                                        className="flex items-center gap-2 border-b border-slate-100 px-2 py-1.5 last:border-0"
                                    >
                                        <span className="w-12 shrink-0 text-[9px] font-semibold text-slate-700">
                                            {ref}
                                        </span>
                                        <span className="flex-1 truncate text-[9px] text-slate-600">
                                            {what}
                                        </span>
                                        <span
                                            className="shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold"
                                            style={{
                                                backgroundColor: tenant.soft,
                                                color: tenant.accent,
                                            }}
                                        >
                                            {status}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p className="relative mt-5 text-center text-xs leading-relaxed text-gray-400">
                One codebase. Three customers.{" "}
                <span className="font-semibold text-[#ff8534]">
                    None of them can see each other&apos;s data.
                </span>
            </p>
        </div>
    );
}
