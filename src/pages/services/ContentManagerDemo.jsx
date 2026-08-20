import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Pencil, Send } from "lucide-react";
import postImage from "../../assets/images/cm-demo-post.webp";

/**
 * A working miniature of the Content Manager that ships with every site.
 *
 * "You can update it yourself, no developer needed" is the strongest claim on
 * the Websites page and the hardest to believe from a paragraph. Letting people
 * actually type and watch the page change settles it in about four seconds.
 *
 * Nothing here talks to a server — it's a demonstration of the editing
 * experience, and the publish button says so rather than pretending otherwise.
 */

const SAMPLE = {
    title: "We're open on Saturdays",
    body: "From this month we're open 9am–2pm on Saturdays, so you can drop in without taking time off work.",
};

const MAX_TITLE = 60;
const MAX_BODY = 180;

export default function ContentManagerDemo() {
    const [title, setTitle] = useState(SAMPLE.title);
    const [body, setBody] = useState(SAMPLE.body);
    const [status, setStatus] = useState("idle"); // idle | publishing | done

    const publish = () => {
        if (status !== "idle") return;
        setStatus("publishing");
        // A beat of latency, so the button behaves like the real thing rather
        // than snapping to "done" in a way that reads as fake.
        setTimeout(() => setStatus("done"), 900);
        setTimeout(() => setStatus("idle"), 3200);
    };

    const touched = () => status !== "idle" && setStatus("idle");

    return (
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* ── The editor ──────────────────────────────────────────── */}
            <div className="rounded-2xl border border-[#F2600B]/20 bg-[#111111] p-5 sm:p-6">
                <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#F2600B]/30 bg-[#F2600B]/10 text-[#F2600B]">
                        <Pencil size={16} />
                    </span>
                    <div>
                        <p className="text-sm font-semibold text-white">Content Manager</p>
                        <p className="text-[11px] text-gray-500">New post</p>
                    </div>
                </div>

                <div className="mt-5 space-y-4">
                    <div>
                        <label
                            htmlFor="cm-title"
                            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400"
                        >
                            Headline
                        </label>
                        <input
                            id="cm-title"
                            type="text"
                            value={title}
                            maxLength={MAX_TITLE}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                touched();
                            }}
                            className="w-full rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#F2600B]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="cm-body"
                            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400"
                        >
                            Body
                        </label>
                        <textarea
                            id="cm-body"
                            rows={4}
                            value={body}
                            maxLength={MAX_BODY}
                            onChange={(e) => {
                                setBody(e.target.value);
                                touched();
                            }}
                            className="w-full resize-none rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm leading-relaxed text-white transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#F2600B]"
                        />
                        <p className="mt-1 text-right text-[11px] text-gray-600">
                            {body.length} / {MAX_BODY}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={publish}
                        disabled={status !== "idle"}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F2600B] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#F2600B]/25 transition hover:bg-[#d94f00] disabled:opacity-70"
                    >
                        {status === "publishing" && (
                            <>
                                <Loader2 size={16} className="animate-spin" /> Publishing…
                            </>
                        )}
                        {status === "done" && (
                            <>
                                <Check size={16} /> Published
                            </>
                        )}
                        {status === "idle" && (
                            <>
                                <Send size={15} /> Publish
                            </>
                        )}
                    </button>

                    <p className="text-center text-[11px] text-gray-600">
                        A demo of the editor — nothing is saved or sent.
                    </p>
                </div>
            </div>

            {/* ── The live result ─────────────────────────────────────── */}
            <div className="flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        Live on your site
                    </p>
                </div>

                <div className="relative flex-1 rounded-2xl border border-white/15 bg-[#0c0705] p-2 shadow-2xl shadow-black/60">
                    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
                        {/* Site nav */}
                        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
                            <span className="flex items-center gap-1.5">
                                <span className="h-4 w-4 rounded bg-[#F2600B]" />
                                <span className="h-1.5 w-10 rounded-full bg-slate-800" />
                            </span>
                            <span className="flex items-center gap-2">
                                {[10, 8, 11].map((w, i) => (
                                    <span
                                        key={i}
                                        className="h-1.5 rounded-full bg-slate-300"
                                        style={{ width: `${w}px` }}
                                    />
                                ))}
                                <span className="h-4 w-10 rounded-full bg-[#F2600B]" />
                            </span>
                        </div>

                        {/* The post, rendered from what's in the editor */}
                        <article className="flex-1 px-5 py-6">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#F2600B]">
                                News
                            </p>
                            <h3
                                className="hero-display mt-2 break-words text-xl font-bold leading-tight text-slate-900 sm:text-2xl"
                                // Keyed on the text so each edit re-triggers the
                                // fade — it's what makes the link between the two
                                // panels obvious.
                                key={title}
                            >
                                {title || (
                                    <span className="text-slate-300">Your headline appears here</span>
                                )}
                            </h3>
                            <p className="mt-1.5 text-[11px] text-slate-400">
                                Posted today · 2 min read
                            </p>

                            <img
                                src={postImage}
                                alt=""
                                loading="lazy"
                                className="mt-4 aspect-[16/9] w-full rounded-lg object-cover"
                            />

                            <motion.p
                                key={body}
                                initial={{ opacity: 0.35 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.25 }}
                                className="mt-4 break-words text-sm leading-relaxed text-slate-600"
                            >
                                {body || (
                                    <span className="text-slate-300">
                                        Your words appear here as you type them.
                                    </span>
                                )}
                            </motion.p>
                        </article>

                        {status === "done" && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 border-t border-emerald-200 bg-emerald-50 px-5 py-2.5 text-xs font-medium text-emerald-700"
                            >
                                <Check size={14} />
                                Published — live for your visitors
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
