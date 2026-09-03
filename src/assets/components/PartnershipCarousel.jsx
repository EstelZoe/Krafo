import React, { useEffect, useRef, useState } from "react";
import YouTubePlayer from "../components/YouTubePlayer";

// Testimonials from people trained and working with Krafo. Rendered as a fade
// carousel (video on the left, synced detail card on the right).
const DEFAULT_ITEMS = [
    {
        name: "Khadijah",
        title: "Cybersecurity Strategist",
        company: "Krafo Systems",
        summary:
            "A cybersecurity defender who earned her training at Krafo Systems.",
        videoSrc: "https://www.youtube.com/watch?v=uGyWgktVfYM",
        poster: "/posters/partner1.jpg",
    },
    {
        name: "Benjamin",
        title: "Cybersecurity Instructor",
        company: "Krafo Systems",
        summary:
            "He came in a novice; after the programme he's now a defender and an instructor at Krafo Systems.",
        videoSrc: "https://www.youtube.com/watch?v=oNJ4YpAV5hY",
        poster: "/posters/partner2.jpg",
    },
];

export default function PartnershipCarousel({
    items = DEFAULT_ITEMS,
    autoRotate = true,
    intervalMs = 7000,
}) {
    const [current, setCurrent] = useState(0);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const videoRefs = useRef([]);

    useEffect(() => {
        videoRefs.current.forEach((v, idx) => {
            if (!v) return;
            try {
                if (idx !== current) {
                    v.pause();
                    v.currentTime = 0;
                    v.muted = true;
                } else {
                    v.pause();
                    v.muted = true;
                }
            } catch { }
        });
    }, [current]);

    useEffect(() => {
        if (!autoRotate || isUserInteracting) return;
        const id = setInterval(() => {
            setCurrent((c) => (c + 1) % items.length);
        }, intervalMs);
        return () => clearInterval(id);
    }, [autoRotate, intervalMs, items.length, isUserInteracting]);

    const goTo = (idx) => setCurrent((idx + items.length) % items.length);
    const next = () => { setIsUserInteracting(true); goTo(current + 1); };
    const prev = () => { setIsUserInteracting(true); goTo(current - 1); };

    return (
        <div className="w-full text-white">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-10">
                {/* LEFT: fade carousel (video) */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl shadow-black/50">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === current ? "opacity-100" : "pointer-events-none opacity-0"}`}
                        >
                            <div className="relative h-full w-full">
                                <YouTubePlayer videoSrc={item.videoSrc} title={item.name} />
                            </div>
                        </div>
                    ))}

                    {/* Controls */}
                    <button
                        aria-label="Previous testimonial"
                        onClick={prev}
                        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-2 backdrop-blur-md transition hover:border-[#F2600B]/60 hover:bg-[#F2600B]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        aria-label="Next testimonial"
                        onClick={next}
                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-2 backdrop-blur-md transition hover:border-[#F2600B]/60 hover:bg-[#F2600B]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <path d="M9 6l6 6-6 6" />
                        </svg>
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                        {items.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Go to testimonial ${i + 1}`}
                                onClick={() => { setIsUserInteracting(true); goTo(i); }}
                                className={`h-2 rounded-full border transition-all ${i === current ? "w-6 border-transparent bg-[#F2600B]" : "w-2 border-white/40 bg-white/30 hover:bg-white/50"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT: synced detail card */}
                <article
                    aria-live="polite"
                    className="group rounded-2xl border border-[#F2600B]/15 bg-[#111111] p-6 shadow-lg transition duration-500 hover:border-[#F2600B]/45 hover:shadow-[0_0_50px_-12px_rgba(242,96,11,0.4)] md:p-8"
                >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff8534]">
                        In their words
                    </span>
                    <div className="mt-4 flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F2600B] to-[#ff8534] text-base font-bold text-white">
                            {items[current]?.name?.[0]}
                        </div>
                        <div>
                            <h3 className="hero-display text-xl font-bold tracking-tight md:text-2xl">
                                {items[current]?.name}
                            </h3>
                            <p className="text-sm text-white/60">
                                {[items[current]?.title, items[current]?.company].filter(Boolean).join(" · ")}
                            </p>
                        </div>
                    </div>

                    <p className="mt-5 text-base leading-relaxed text-white/90 md:text-lg">
                        “{items[current]?.summary}”
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                        <button
                            onClick={prev}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-[#F2600B]/50 hover:bg-[#F2600B]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534]"
                        >
                            Previous
                        </button>
                        <button
                            onClick={next}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-[#F2600B]/50 hover:bg-[#F2600B]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534]"
                        >
                            Next
                        </button>
                    </div>
                </article>
            </div>
        </div>
    );
}
