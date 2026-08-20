import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CloudOff, Loader2, Plus, RefreshCw, WifiOff } from "lucide-react";
import PhoneFrame from "./PhoneFrame";

/**
 * Working with no signal, then catching up when it returns.
 *
 * Offline support is listed as an Advanced-tier feature, which undersells what
 * it means to anyone selling into a market where the connection drops in a
 * lift, a basement, a rural district or halfway through a delivery run. Most
 * apps simply fail there. Letting a visitor cut the connection themselves and
 * watch the app keep accepting work is the whole pitch in one interaction.
 *
 * Nothing is faked beyond timing: entries queue locally, then reconcile when
 * the connection comes back, which is exactly the real behaviour.
 */

const SEED = [
    { id: 1, ref: "DL-4471", place: "Osu", state: "synced" },
    { id: 2, ref: "DL-4470", place: "Labone", state: "synced" },
];

const NEXT_PLACES = ["Adabraka", "Cantonments", "Airport City", "Madina", "Tema"];

export default function OfflineDemo() {
    const [online, setOnline] = useState(true);
    const [entries, setEntries] = useState(SEED);
    const [syncing, setSyncing] = useState(false);
    const nextId = useRef(3);
    const timers = useRef([]);

    // Any pending timeout has to be cleared on unmount, or a sync landing after
    // the section is gone will try to set state on nothing.
    useEffect(
        () => () => {
            timers.current.forEach(clearTimeout);
        },
        []
    );

    const queued = entries.filter((e) => e.state === "queued").length;

    const addEntry = () => {
        const place = NEXT_PLACES[(nextId.current - 3) % NEXT_PLACES.length];
        const entry = {
            id: nextId.current,
            ref: `DL-44${72 + nextId.current - 3}`,
            place,
            state: online ? "synced" : "queued",
        };
        nextId.current += 1;
        setEntries((prev) => [entry, ...prev].slice(0, 5));
    };

    const toggleConnection = () => {
        const goingOnline = !online;
        setOnline(goingOnline);

        if (goingOnline && entries.some((e) => e.state === "queued")) {
            setSyncing(true);
            timers.current.push(
                setTimeout(() => {
                    setEntries((prev) => prev.map((e) => ({ ...e, state: "synced" })));
                    setSyncing(false);
                }, 1400)
            );
        }
    };

    return (
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:gap-14">
            {/* ── The phone ───────────────────────────────────────────── */}
            <div className="flex justify-center">
                <PhoneFrame platform="ios" className="h-[420px] w-[210px]">
                    {/* Connection banner */}
                    <AnimatePresence>
                        {!online && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-amber-500"
                            >
                                <p className="flex items-center justify-center gap-1.5 px-2 py-1 text-[9px] font-bold text-white">
                                    <WifiOff size={9} /> No connection — working offline
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {syncing && (
                        <div className="bg-[#F2600B]">
                            <p className="flex items-center justify-center gap-1.5 px-2 py-1 text-[9px] font-bold text-white">
                                <Loader2 size={9} className="animate-spin" /> Syncing {queued}{" "}
                                change{queued === 1 ? "" : "s"}…
                            </p>
                        </div>
                    )}

                    {/* App header */}
                    <div className="flex items-center justify-between px-3.5 pb-2 pt-2">
                        <p className="text-[11px] font-bold text-slate-900">Deliveries</p>
                        <span
                            className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold ${
                                queued > 0
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-emerald-100 text-emerald-700"
                            }`}
                        >
                            {queued > 0 ? `${queued} pending` : "All saved"}
                        </span>
                    </div>

                    {/* Entries */}
                    <div className="space-y-1.5 px-3.5">
                        <AnimatePresence initial={false}>
                            {entries.map((e) => (
                                <motion.div
                                    key={e.id}
                                    layout
                                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2"
                                >
                                    <span
                                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                            e.state === "synced"
                                                ? "bg-emerald-100 text-emerald-600"
                                                : "bg-amber-100 text-amber-600"
                                        }`}
                                    >
                                        {e.state === "synced" ? (
                                            <Check size={10} />
                                        ) : (
                                            <CloudOff size={9} />
                                        )}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block text-[9.5px] font-semibold text-slate-800">
                                            {e.ref}
                                        </span>
                                        <span className="block text-[8.5px] text-slate-500">
                                            {e.place}
                                        </span>
                                    </span>
                                    <span
                                        className={`shrink-0 text-[8px] font-bold uppercase ${
                                            e.state === "synced"
                                                ? "text-emerald-600"
                                                : "text-amber-600"
                                        }`}
                                    >
                                        {e.state === "synced" ? "Saved" : "Queued"}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* In-app action */}
                    <div className="absolute inset-x-0 bottom-0 border-t border-slate-200 bg-white p-2.5">
                        <button
                            type="button"
                            onClick={addEntry}
                            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#F2600B] py-2 text-[9px] font-bold text-white transition hover:bg-[#d94f00]"
                        >
                            <Plus size={10} /> Log a delivery
                        </button>
                    </div>
                </PhoneFrame>
            </div>

            {/* ── Controls + explanation ──────────────────────────────── */}
            <div>
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        onClick={toggleConnection}
                        className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 ${
                            online
                                ? "border border-white/20 bg-white/5 text-white hover:border-[#F2600B]/60"
                                : "bg-[#F2600B] text-white shadow-lg shadow-[#F2600B]/30 hover:bg-[#d94f00]"
                        }`}
                    >
                        {online ? (
                            <>
                                <WifiOff size={16} /> Cut the connection
                            </>
                        ) : (
                            <>
                                <RefreshCw size={16} /> Bring it back
                            </>
                        )}
                    </button>

                    <span
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold ${
                            online
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                        }`}
                    >
                        <span
                            className={`h-2 w-2 rounded-full ${
                                online ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
                            }`}
                        />
                        {online ? "Online" : "Offline"}
                    </span>
                </div>

                <h3 className="hero-display mt-7 text-2xl font-bold text-white">
                    {online ? "Everything saves as it happens" : "Still working, still saving"}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-300">
                    {online
                        ? "Cut the connection and keep logging deliveries — the app doesn't stop, and nothing is lost. Bring the signal back and watch it catch up."
                        : "The signal is gone and the app is still accepting work. Each entry is held on the device and marked pending. Restore the connection and they reconcile on their own."}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                    {[
                        "Works in a basement, a lift, or out past the last mast",
                        "Nothing re-typed later — the queue syncs itself",
                        "Staff stop waiting for signal to do their job",
                    ].map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-gray-300">
                            <Check size={15} className="mt-0.5 shrink-0 text-[#F2600B]" />
                            {point}
                        </li>
                    ))}
                </ul>

                <p className="mt-5 text-xs leading-relaxed text-gray-500">
                    Offline support and real-time sync are Advanced-tier capabilities.
                </p>
            </div>
        </div>
    );
}
