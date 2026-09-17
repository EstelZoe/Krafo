import { useEffect, useState } from "react";
import { CalendarDays, Clock, Flame, Images, MapPin } from "lucide-react";
import { iconFromName } from "../../constants/eventIcons";

/**
 * Live previews for the three event editors.
 *
 * These deliberately mirror the public cards rather than the admin theme: the
 * question an editor is actually asking is "what will a visitor see", and a
 * preview rendered in dashboard colours answers a different question. So the
 * dark ground, the orange accents and the glass panel are copied from
 * pages/events/PlannedEvents.jsx, PastEvents.jsx and pages/EventPage.jsx.
 *
 * They are approximations, not the components themselves. Reusing the real
 * cards would drag in the interest modal, the demand-meter fetch and the layout
 * logic that decides which event leads — none of which mean anything inside a
 * form. The tradeoff is that a change to a public card has to be echoed here;
 * the alternative was rendering a live card against a record that does not
 * exist yet.
 *
 * One layout rule runs through all three: the artwork is an absolutely
 * positioned backdrop and the copy sits in normal flow on top of it, so a card
 * grows to fit whatever has been typed. An earlier version pinned the panel to
 * the bottom of a fixed 16:10 box, and a long pitch simply overflowed off the
 * top of the card with the title clipped — a preview that misleads is worse
 * than no preview.
 */

/**
 * A blob URL for a file the editor has picked but not yet uploaded, falling
 * back to whatever is already stored.
 *
 * The revoke matters: every object URL pins its file in memory until released,
 * and this runs again on every file change while someone tries three different
 * flyers.
 */
function usePreviewUrl(file, storedUrl) {
    const [url, setUrl] = useState(storedUrl || null);

    useEffect(() => {
        if (!file) {
            setUrl(storedUrl || null);
            return undefined;
        }
        const objectUrl = URL.createObjectURL(file);
        setUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file, storedUrl]);

    return url;
}

// Sits at the top rather than dead centre: the copy in every card is
// bottom-anchored, and a centred label reads straight through the title.
const Placeholder = ({ label }) => (
    <div className="absolute inset-0 flex items-start justify-center bg-[#1a1210] pt-5 text-center text-[10px] text-white/25">
        {label}
    </div>
);

/** The artwork layer plus its scrim, shared by all three previews. */
const Backdrop = ({ url, isVideo, emptyLabel, scrim }) => (
    <>
        {url ? (
            isVideo ? (
                <video
                    src={url}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ) : (
                <img src={url} alt="" className="absolute inset-0 h-full w-full object-cover" />
            )
        ) : (
            <Placeholder label={emptyLabel} />
        )}
        <div aria-hidden="true" className={`absolute inset-0 ${scrim}`} />
    </>
);

/**
 * How the planned event will appear in "Events we're planning".
 */
export function PlannedEventPreview({
    form,
    file,
    storedMediaUrl,
    storedMediaType,
    interestCount = 0,
}) {
    // Three places artwork can come from, in priority order: a file just
    // picked, a URL typed into the "hosted elsewhere" field, or whatever is
    // already on the record. The last one matters because the form field is
    // deliberately blank for artwork we host, so reading form.mediaUrl alone
    // reports "no artwork" for events that plainly have some.
    const fallbackUrl = form.mediaUrl || storedMediaUrl || "";
    const mediaUrl = usePreviewUrl(file, fallbackUrl);
    const isVideo = file
        ? file.type.startsWith("video")
        : (form.mediaUrl ? form.mediaType : storedMediaType || form.mediaType) === "video";
    const CardIcon = iconFromName(form.iconName);

    const goal = Number(form.goal) || 0;
    const pct = goal ? Math.min(100, Math.round((interestCount / goal) * 100)) : 0;

    const signals = String(form.signals || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    return (
        <div className="relative w-full overflow-hidden rounded-2xl bg-[#0c0705]">
            <Backdrop
                url={mediaUrl}
                isVideo={isVideo}
                emptyLabel="No artwork yet"
                scrim="bg-gradient-to-t from-black/70 via-black/20 to-black/40"
            />

            {/* min-h keeps the artwork visible on a nearly-empty form; the flow
                layout lets the card grow past it once there is copy. */}
            <div className="relative flex min-h-[15rem] flex-col p-3 pt-14">
                <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2600B] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-[#F2600B]/30">
                        <Flame size={12} />
                        Most wanted
                    </span>
                    {form.window && (
                        <span className="rounded-full border border-white/25 bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                            {form.window}
                        </span>
                    )}
                </div>

                <div className="mt-auto rounded-2xl border border-white/20 bg-black/50 p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                    <div className="flex items-start gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#F2600B]/40 bg-[#F2600B]/15 text-[#F2600B]">
                            <CardIcon size={16} />
                        </span>
                        <h3 className="text-sm font-bold leading-snug text-white">
                            {form.title || "Untitled event"}
                        </h3>
                    </div>

                    {form.pitch && (
                        <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-gray-200">
                            {form.pitch}
                        </p>
                    )}

                    {(form.format || form.venue) && (
                        <p className="mt-1.5 text-[10px] leading-relaxed text-gray-400">
                            {[form.format, form.venue].filter(Boolean).join(" · ")}
                        </p>
                    )}

                    {signals.length > 0 && (
                        <ul className="mt-2 flex flex-wrap gap-1">
                            {signals.map((s) => (
                                <li
                                    key={s}
                                    className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-gray-400"
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-3 border-t border-white/15 pt-2.5">
                        <div className="flex items-baseline justify-between">
                            <span className="text-sm font-bold text-white">
                                {interestCount}
                                <span className="ml-1 text-[10px] font-medium text-gray-500">
                                    / {goal || "?"}
                                </span>
                            </span>
                            <span className="text-[10px] text-gray-500">interested</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                                className="h-full rounded-full bg-[#F2600B] transition-all duration-500"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * How the past event will appear in the "Where we've already been" grid.
 *
 * `coverFile` is the first newly-picked file, which is what the API promotes to
 * the cover when a record has none — so the preview shows the same thing the
 * save will produce rather than whatever is stored today.
 */
export function PastEventPreview({ form, coverFile, storedImage, photoCount = 0 }) {
    const image = usePreviewUrl(coverFile, storedImage);

    return (
        <div className="relative w-full overflow-hidden rounded-2xl border border-[#F2600B]/15 bg-[#0c0705]">
            <Backdrop
                url={image}
                isVideo={false}
                emptyLabel="No cover image yet"
                scrim="bg-gradient-to-t from-black via-black/60 to-black/10"
            />

            <div className="relative flex min-h-[14rem] flex-col p-4 pt-12">
                <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
                    {form.tag ? (
                        <span className="inline-flex items-center rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                            {form.tag}
                        </span>
                    ) : (
                        <span />
                    )}
                    {form.year && (
                        <span className="text-sm font-bold text-[#ff8534]">{form.year}</span>
                    )}
                </div>

                <div className="mt-auto">
                    <h3 className="text-sm font-bold leading-snug text-white">
                        {form.title || "Untitled event"}
                    </h3>
                    {form.location && (
                        <p className="mt-1.5 flex items-start gap-1.5 text-[11px] text-gray-300">
                            <MapPin size={12} className="mt-0.5 shrink-0 text-[#F2600B]" />
                            <span>{form.location}</span>
                        </p>
                    )}
                    {(form.date || form.stat) && (
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-gray-400">
                            {form.date && <span>{form.date}</span>}
                            {form.date && form.stat && (
                                <span className="h-1 w-1 rounded-full bg-[#F2600B]/60" />
                            )}
                            {form.stat && <span>{form.stat}</span>}
                        </div>
                    )}
                    {photoCount > 0 && (
                        <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                            <Images size={12} />
                            {photoCount} {photoCount === 1 ? "photo" : "photos"}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

/**
 * How the upcoming event will appear in the spotlight on the events page.
 *
 * The real spotlight splits artwork and copy into two columns side by side, so
 * nothing needs a scrim. At preview width there is no room for that, and the
 * layout stacks — artwork on top, copy on its own solid ground below, which is
 * what the real card collapses to on a phone anyway.
 */
export function UpcomingEventPreview({ form, file }) {
    const image = usePreviewUrl(file, form.image);

    const meta = [
        { Icon: CalendarDays, value: form.dateRange },
        { Icon: Clock, value: form.time },
        { Icon: MapPin, value: form.location },
    ].filter((m) => m.value);

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-[#F2600B]/15 bg-[#0c0705]">
            <div className="relative aspect-[16/9] w-full">
                {image ? (
                    <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                    <div className="absolute inset-0 flex items-start justify-center bg-gradient-to-br from-[#1a0d05] to-[#0c0705] pt-5 text-[10px] text-white/25">
                        No image yet
                    </div>
                )}

                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    Registration open
                </div>

                {/* Corner accents — the architectural motif from the real card. */}
                <div
                    aria-hidden="true"
                    className="absolute right-3 top-3 h-8 w-8 border-r-2 border-t-2 border-[#F2600B]/30"
                />
                <div
                    aria-hidden="true"
                    className="absolute bottom-3 left-3 h-8 w-8 border-b-2 border-l-2 border-[#F2600B]/30"
                />

                {form.featured && (
                    <span className="absolute bottom-3 right-3 rounded-full bg-[#F2600B] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-[#F2600B]/30">
                        Featured
                    </span>
                )}
            </div>

            <div className="p-4">
                {form.category && (
                    <span className="inline-flex items-center rounded-full border border-[#F2600B]/30 bg-[#F2600B]/10 px-2.5 py-1 text-[10px] font-semibold text-[#ff8534]">
                        {form.category}
                    </span>
                )}

                <h3 className="mt-2.5 text-base font-extrabold leading-tight text-white">
                    {form.title || "Untitled event"}
                </h3>

                {form.description && (
                    <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-gray-300">
                        {form.description}
                    </p>
                )}

                {meta.length > 0 && (
                    <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
                        {meta.map(({ Icon, value }) => (
                            <div key={value} className="flex items-start gap-2">
                                <Icon size={13} className="mt-0.5 shrink-0 text-[#F2600B]" />
                                <span className="text-[11px] leading-relaxed text-gray-300">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <span
                    className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-[11px] font-bold ${
                        form.registrationUrl
                            ? "bg-[#F2600B] text-white shadow-lg shadow-[#F2600B]/30"
                            : "border border-white/15 text-gray-500"
                    }`}
                >
                    {form.registrationUrl ? "Register now" : "No registration link yet"}
                </span>
            </div>
        </div>
    );
}
