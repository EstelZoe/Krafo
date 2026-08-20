import React from "react";
import { motion } from "framer-motion";
import {
    BarChart3,
    CalendarCheck,
    LayoutDashboard,
    Lock,
    Settings,
    User,
    Users,
} from "lucide-react";
import { useAutoCycle } from "./useAutoCycle";

/**
 * Hero visual for /services/webapps — one app, seen through three sets of eyes.
 *
 * The Websites hero proves "responsive" by reflowing. The equivalent claim
 * here is role-based access, so this proves it the same way: switch role and
 * the same dashboard visibly loses navigation, tiles, columns and rows. Saying
 * "admins, staff and customers each see only what they should" is a sentence;
 * watching the Revenue tile disappear is an argument.
 *
 * Everything is drawn in CSS/JSX — no screenshots of anyone's real system, and
 * no download weight.
 */

const ROLES = [
    {
        key: "admin",
        label: "Admin",
        Icon: Settings,
        nav: ["Dashboard", "Bookings", "Members", "Reports", "Users", "Settings"],
        // Rendered left to right; each role keeps a prefix of this list.
        tiles: [
            { label: "Revenue", value: "₵48,200", accent: true },
            { label: "Bookings", value: "312" },
            { label: "Members", value: "1,204" },
        ],
        rows: 4,
        showActions: true,
        note: "Everything: revenue, every record, and user management.",
    },
    {
        key: "staff",
        label: "Staff",
        Icon: Users,
        nav: ["Dashboard", "Bookings", "Members"],
        tiles: [
            { label: "Bookings", value: "312" },
            { label: "Members", value: "1,204" },
        ],
        rows: 4,
        showActions: false,
        note: "The records they work on — no revenue, no user administration.",
    },
    {
        key: "customer",
        label: "Customer",
        Icon: User,
        nav: ["My Bookings", "Profile"],
        tiles: [{ label: "My Bookings", value: "3" }],
        rows: 2,
        showActions: false,
        note: "Their own bookings only. Other customers' records don't exist to them.",
    },
];

const AUTO_MS = 3600;

// One dataset, filtered by role — the same shape a real permission layer
// produces, rather than three unrelated tables.
const RECORDS = [
    { ref: "BK-1042", who: "A. Mensah", status: "Confirmed", tone: "emerald", own: true },
    { ref: "BK-1041", who: "K. Boateng", status: "Pending", tone: "amber", own: false },
    { ref: "BK-1039", who: "N. Owusu", status: "Confirmed", tone: "emerald", own: false },
    { ref: "BK-1036", who: "A. Mensah", status: "Complete", tone: "slate", own: true },
];

const TONES = {
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    slate: "bg-slate-100 text-slate-600",
};

const NAV_ICONS = {
    Dashboard: LayoutDashboard,
    "My Bookings": CalendarCheck,
    Bookings: CalendarCheck,
    Members: Users,
    Reports: BarChart3,
    Users: Users,
    Settings: Settings,
    Profile: User,
};

export default function WebAppMockup({ className = "" }) {
    const [roleIndex, selectRole] = useAutoCycle(ROLES.length, { intervalMs: AUTO_MS });
    const roleKey = ROLES[roleIndex].key;

    const role = ROLES.find((r) => r.key === roleKey) || ROLES[0];
    const isCustomer = role.key === "customer";
    const visibleRecords = (isCustomer ? RECORDS.filter((r) => r.own) : RECORDS).slice(
        0,
        role.rows
    );


    return (
        <div className={`relative ${className}`}>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[#F2600B]/10 blur-3xl"
            />

            {/* ── Role toggle ─────────────────────────────────────────── */}
            <div
                className="relative mx-auto mb-5 flex w-fit items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md"
                role="group"
                aria-label="Preview the app as different kinds of user"
            >
                {ROLES.map((r) => {
                    const RoleIcon = r.Icon;
                    const on = r.key === roleKey;
                    return (
                        <button
                            key={r.key}
                            type="button"
                            onClick={() => selectRole(ROLES.indexOf(r))}
                            aria-pressed={on}
                            className={`relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2600B] ${
                                on ? "text-white" : "text-gray-400 hover:text-white"
                            }`}
                        >
                            {on && (
                                <motion.span
                                    layoutId="role-pill"
                                    className="absolute inset-0 rounded-full bg-[#F2600B]"
                                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                />
                            )}
                            <span className="relative flex items-center gap-1.5">
                                <RoleIcon size={13} />
                                {r.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* ── The app ─────────────────────────────────────────────── */}
            <div className="relative h-[390px] rounded-2xl border border-white/15 bg-[#0c0705] p-2 shadow-2xl shadow-black/70 sm:h-[430px]">
                <div className="flex h-full overflow-hidden rounded-xl bg-white">
                    {/* Sidebar */}
                    <aside className="flex w-[34%] max-w-[150px] shrink-0 flex-col border-r border-slate-200 bg-slate-50 p-2.5">
                        <div className="flex items-center gap-1.5 px-1 pb-2.5">
                            <span className="h-4 w-4 rounded bg-[#F2600B]" />
                            <span className="h-1.5 w-10 rounded-full bg-slate-800" />
                        </div>

                        <nav className="flex-1 space-y-0.5">
                            {ROLES[0].nav.map((item) => {
                                const allowed = role.nav.includes(item);
                                const NavIcon = NAV_ICONS[item] || LayoutDashboard;
                                // Denied items stay in place rather than vanishing,
                                // so you can see exactly what's being withheld.
                                return (
                                    <motion.div
                                        key={item}
                                        animate={{ opacity: allowed ? 1 : 0.28 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex items-center gap-1.5 rounded-md px-1.5 py-1.5 ${
                                            allowed && item === role.nav[0]
                                                ? "bg-[#F2600B]/10"
                                                : ""
                                        }`}
                                    >
                                        <NavIcon
                                            size={11}
                                            className={
                                                allowed && item === role.nav[0]
                                                    ? "text-[#F2600B]"
                                                    : "text-slate-400"
                                            }
                                        />
                                        <span
                                            className={`h-1.5 flex-1 rounded-full ${
                                                allowed && item === role.nav[0]
                                                    ? "bg-[#F2600B]"
                                                    : "bg-slate-300"
                                            }`}
                                        />
                                        {!allowed && (
                                            <Lock size={9} className="shrink-0 text-slate-400" />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </nav>

                        <div className="flex items-center gap-1.5 border-t border-slate-200 px-1 pt-2.5">
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-300 text-[8px] font-bold text-slate-600">
                                {role.label[0]}
                            </span>
                            <span className="text-[9px] font-semibold text-slate-500">
                                {role.label}
                            </span>
                        </div>
                    </aside>

                    {/* Main */}
                    <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
                            <span className="h-1.5 w-14 rounded-full bg-slate-800" />
                            <span className="rounded-full bg-[#F2600B]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#F2600B]">
                                {role.label}
                            </span>
                        </div>

                        <div className="min-h-0 flex-1 overflow-hidden p-3">
                            {/* KPI tiles */}
                            <motion.div layout className="flex gap-2">
                                {role.tiles.map((t) => (
                                    <motion.div
                                        key={t.label}
                                        layout
                                        initial={{ opacity: 0, scale: 0.94 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`min-w-0 flex-1 rounded-lg border p-2 ${
                                            t.accent
                                                ? "border-[#F2600B]/30 bg-[#F2600B]/[0.07]"
                                                : "border-slate-200 bg-slate-50"
                                        }`}
                                    >
                                        <p className="truncate text-[8.5px] font-medium uppercase tracking-wide text-slate-500">
                                            {t.label}
                                        </p>
                                        <p
                                            className={`mt-0.5 truncate text-xs font-bold ${
                                                t.accent ? "text-[#F2600B]" : "text-slate-800"
                                            }`}
                                        >
                                            {t.value}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Records table */}
                            <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
                                <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
                                    <span className="w-12 text-[8.5px] font-bold uppercase text-slate-500">
                                        Ref
                                    </span>
                                    <span className="flex-1 text-[8.5px] font-bold uppercase text-slate-500">
                                        Name
                                    </span>
                                    <span className="w-14 text-[8.5px] font-bold uppercase text-slate-500">
                                        Status
                                    </span>
                                    {role.showActions && (
                                        <span className="w-8 text-[8.5px] font-bold uppercase text-slate-500">
                                            •••
                                        </span>
                                    )}
                                </div>

                                {visibleRecords.map((r) => (
                                    <motion.div
                                        key={r.ref}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex items-center gap-2 border-b border-slate-100 px-2 py-1.5 last:border-0"
                                    >
                                        <span className="w-12 text-[9px] font-semibold text-slate-700">
                                            {r.ref}
                                        </span>
                                        <span className="flex-1 truncate text-[9px] text-slate-600">
                                            {r.who}
                                        </span>
                                        <span className="w-14">
                                            <span
                                                className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold ${TONES[r.tone]}`}
                                            >
                                                {r.status}
                                            </span>
                                        </span>
                                        {role.showActions && (
                                            <span className="flex w-8 gap-0.5">
                                                <span className="h-3 w-3 rounded bg-[#F2600B]/20" />
                                                <span className="h-3 w-3 rounded bg-slate-200" />
                                            </span>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* What just happened, in words */}
            <motion.p
                key={role.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative mt-5 min-h-[2.5rem] text-center text-xs leading-relaxed text-gray-400"
            >
                <span className="font-semibold text-[#ff8534]">{role.label}:</span> {role.note}
            </motion.p>
        </div>
    );
}
