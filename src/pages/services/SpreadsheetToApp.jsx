import React from "react";
import { AlertTriangle, Search } from "lucide-react";
import CompareSlider from "./CompareSlider";

/**
 * The shared spreadsheet against the app that replaces it.
 *
 * "Organisations replacing spreadsheets and manual processes" is the first line
 * of who this product is for, and nearly every prospect arrives running one.
 * Showing the two side by side is more persuasive than describing either.
 *
 * The "before" is drawn from the failure modes people actually recognise — a
 * duplicated row, a date typed three different ways, a formula error, a status
 * column filled in by hand — rather than a generically ugly grid. Recognition
 * is the whole mechanism; a spreadsheet that nobody recognises argues nothing.
 */

const SHEET_ROWS = [
    ["BK-1042", "A. Mensah", "12/03/25", "confirmed", "GHS 450"],
    ["BK-1041", "K. Boateng", "2025-03-13", "Pending", "450"],
    ["BK-1041", "K Boateng", "13/3/25", "pending?", "450.00"], // duplicate, re-typed
    ["BK-1039", "N. Owusu", "14 Mar", "CONFIRMED", "#REF!"], // broken formula
    ["BK-1036", "A. Mensah", "", "done", "₵300"], // missing date
];

const APP_ROWS = [
    { ref: "BK-1042", who: "A. Mensah", date: "12 Mar 2025", status: "Confirmed", amount: "₵450" },
    { ref: "BK-1041", who: "K. Boateng", date: "13 Mar 2025", status: "Pending", amount: "₵450" },
    { ref: "BK-1039", who: "N. Owusu", date: "14 Mar 2025", status: "Confirmed", amount: "₵450" },
    { ref: "BK-1036", who: "A. Mensah", date: "09 Mar 2025", status: "Complete", amount: "₵300" },
];

const STATUS_TONE = {
    Confirmed: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    Complete: "bg-slate-100 text-slate-600",
};

/* ── Before: the shared sheet ─────────────────────────────────────────── */
const Spreadsheet = () => (
    <div className="flex h-full flex-col bg-[#f8f9fa] font-sans">
        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b border-slate-300 bg-[#eceff1] px-3 py-1.5">
            <span className="text-[9px] font-semibold text-slate-600">
                bookings_FINAL_v3(2).xlsx
            </span>
            <span className="ml-auto flex items-center gap-1 text-[9px] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Last edited by 3 people
            </span>
        </div>

        {/* Column letters */}
        <div className="flex border-b border-slate-300 bg-[#eceff1] text-[8px] font-semibold text-slate-500">
            <span className="w-6 shrink-0 border-r border-slate-300 py-1 text-center">#</span>
            {["A", "B", "C", "D", "E"].map((c) => (
                <span
                    key={c}
                    className="flex-1 border-r border-slate-300 py-1 text-center last:border-0"
                >
                    {c}
                </span>
            ))}
        </div>

        {/* Cells */}
        <div className="flex-1 overflow-hidden">
            {SHEET_ROWS.map((row, r) => (
                <div key={r} className="flex border-b border-slate-200 text-[9px]">
                    <span className="w-6 shrink-0 border-r border-slate-300 bg-[#eceff1] py-1.5 text-center text-slate-500">
                        {r + 2}
                    </span>
                    {row.map((cell, c) => {
                        const broken = cell === "#REF!";
                        const empty = cell === "";
                        const dupe = r === 2;
                        return (
                            <span
                                key={c}
                                className={`flex-1 truncate border-r border-slate-200 px-1.5 py-1.5 last:border-0 ${
                                    broken
                                        ? "bg-red-50 font-semibold text-red-600"
                                        : empty
                                        ? "bg-amber-50"
                                        : dupe
                                        ? "bg-amber-50/60 text-slate-500"
                                        : "text-slate-700"
                                }`}
                            >
                                {cell}
                            </span>
                        );
                    })}
                </div>
            ))}
        </div>

        {/* The bit everyone recognises */}
        <div className="flex items-center gap-1.5 border-t border-slate-300 bg-red-50 px-3 py-1.5">
            <AlertTriangle size={10} className="shrink-0 text-red-500" />
            <span className="text-[9px] font-medium text-red-700">
                Duplicate row · 3 date formats · 1 broken formula
            </span>
        </div>
    </div>
);

/* ── After: the app ──────────────────────────────────────────────────── */
const AppTable = () => (
    <div className="flex h-full flex-col bg-white">
        {/* App bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-2">
            <span className="h-4 w-4 shrink-0 rounded bg-[#F2600B]" />
            <span className="h-1.5 w-14 rounded-full bg-slate-800" />
            <span className="ml-auto flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1">
                <Search size={9} className="text-slate-400" />
                <span className="h-1 w-10 rounded-full bg-slate-300" />
            </span>
            <span className="h-5 w-12 shrink-0 rounded-full bg-[#F2600B]" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-1.5 text-[8.5px] font-bold uppercase tracking-wide text-slate-500">
            <span className="w-12">Ref</span>
            <span className="flex-1">Customer</span>
            <span className="w-16">Date</span>
            <span className="w-14">Status</span>
            <span className="w-10 text-right">Amount</span>
        </div>

        {/* Rows */}
        <div className="flex-1">
            {APP_ROWS.map((r) => (
                <div
                    key={r.ref}
                    className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 last:border-0"
                >
                    <span className="w-12 text-[9px] font-semibold text-slate-700">{r.ref}</span>
                    <span className="flex-1 truncate text-[9px] text-slate-600">{r.who}</span>
                    <span className="w-16 text-[9px] tabular-nums text-slate-500">{r.date}</span>
                    <span className="w-14">
                        <span
                            className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold ${STATUS_TONE[r.status]}`}
                        >
                            {r.status}
                        </span>
                    </span>
                    <span className="w-10 text-right text-[9px] font-semibold tabular-nums text-slate-700">
                        {r.amount}
                    </span>
                </div>
            ))}
        </div>

        {/* Footer state */}
        <div className="flex items-center gap-1.5 border-t border-slate-200 bg-emerald-50 px-3 py-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-medium text-emerald-700">
                One source of truth · validated on entry · full history
            </span>
        </div>
    </div>
);

export default function SpreadsheetToApp() {
    return (
        <CompareSlider
            aspect="aspect-[16/10]"
            beforeLabel="The spreadsheet"
            afterLabel="The app"
            rangeLabel="Slide to compare the spreadsheet with the app that replaces it"
            caption="Illustrative — but every problem on the left is one we've been called in to fix."
            before={<Spreadsheet />}
            after={<AppTable />}
        />
    );
}
