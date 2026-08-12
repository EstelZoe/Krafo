import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock, MapPin, Star } from "lucide-react";

// Each category keeps a small colour tell (the dot on the pill) so the grid
// stays scannable, while the pill itself stays glass + white — the brand
// orange is reserved for Krafo's own accents.
const categoryDot = {
    Technology: "bg-sky-400",
    Business: "bg-violet-400",
    Cybersecurity: "bg-[#F2600B]",
    Marketing: "bg-rose-400",
    AI: "bg-emerald-400",
    Education: "bg-amber-400",
};

const EventCard = ({
    dateRange,
    date,
    title,
    description,
    time,
    location,
    category,
    registrationUrl,
    image,
    featured = false,
}) => {
    // Support both dateRange (from API) and date (legacy)
    const displayDate = dateRange || date;

    return (
        <div className="group relative h-full">
            {/* Ambient glow — matches the co-founder / testimonial cards */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 rounded-[1.75rem] bg-[#F2600B]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            />

            <motion.article
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#F2600B]/15 bg-[#0c0705] transition-colors duration-500 group-hover:border-[#F2600B]/50"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
            >
                {/* ── Image ── */}
                <div className="relative h-44 shrink-0 overflow-hidden">
                    {image ? (
                        <img
                            src={image}
                            alt={title || "Event"}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#1a0d05] to-[#0c0705]" />
                    )}
                    {/* No scrim over the artwork — these are flyers, and the
                        point is that they're seen. The date and featured chips
                        each carry their own frosted backing instead. */}

                    {/* Date chip */}
                    {displayDate && (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                            <CalendarDays size={13} className="text-[#F2600B]" />
                            {displayDate}
                        </span>
                    )}

                    {/* Featured flag */}
                    {featured && (
                        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#F2600B] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-[#F2600B]/30">
                            <Star size={11} className="fill-white" />
                            Featured
                        </span>
                    )}
                </div>

                {/* ── Body ── */}
                <div className="flex flex-1 flex-col p-5">
                    {category && (
                        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-gray-300">
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                    categoryDot[category] || "bg-gray-400"
                                }`}
                            />
                            {category}
                        </span>
                    )}

                    <h3 className="hero-display text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#F2600B]">
                        {title}
                    </h3>

                    {description && (
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-400">
                            {description}
                        </p>
                    )}

                    {/* Meta */}
                    <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
                        {time && (
                            <p className="flex items-center gap-2.5 text-sm text-gray-300">
                                <Clock size={15} className="shrink-0 text-[#F2600B]" />
                                {time}
                            </p>
                        )}
                        {location && (
                            <p className="flex items-center gap-2.5 text-sm text-gray-300">
                                <MapPin size={15} className="shrink-0 text-[#F2600B]" />
                                {location}
                            </p>
                        )}
                    </div>

                    {/* Action — pinned to the bottom so cards line up */}
                    <div className="mt-5 pt-1">
                        {registrationUrl ? (
                            <a
                                href={registrationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F2600B] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#F2600B]/20 transition-all duration-300 hover:bg-[#d94f00] hover:shadow-[#F2600B]/40"
                            >
                                Register
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </a>
                        ) : (
                            <span className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-500">
                                Registration opening soon
                            </span>
                        )}
                    </div>
                </div>
            </motion.article>
        </div>
    );
};

export default EventCard;
