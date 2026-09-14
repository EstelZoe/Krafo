import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, X } from "lucide-react";
import { apiClient } from "../../api/client";

/**
 * The thin bar above the navbar. One live announcement at a time, chosen by
 * the API; nothing renders when there is none.
 *
 * Behaviours worth knowing:
 *
 *   - The message scrolls right-to-left, and stops the moment a pointer is
 *     over the bar. A moving message catches the eye; a moving message that
 *     cannot be stopped is just something to be annoyed by.
 *
 *   - The whole strip is the link, not just the label at the end. Chasing a
 *     small moving target with a cursor is a bad way to spend an afternoon.
 *
 *   - It is dismissible, and the dismissal is remembered per announcement id.
 *     A visitor who closed October's offer should not see it again on every
 *     page, but they must still see November's when it replaces it.
 *
 *   - It renders nothing at all until a live announcement arrives, rather than
 *     reserving space. A bar that pops in and shoves the page down is worse
 *     than one that appears a moment late.
 */

const DISMISSED_KEY = "krafo.announcement.dismissed";

// A short message would whip past in a couple of seconds at a fixed duration,
// so the pace is derived from the length instead: roughly a constant reading
// speed, with a floor so nothing is ever frantic.
const SECONDS_PER_CHARACTER = 0.32;
const MINIMUM_SECONDS = 18;

const readDismissed = () => {
    try {
        return localStorage.getItem(DISMISSED_KEY);
    } catch {
        // Private windows and hardened browsers throw on access. Not being able
        // to remember a dismissal is not a reason to hide the announcement.
        return null;
    }
};

export default function AnnouncementBar() {
    const [announcement, setAnnouncement] = useState(null);

    useEffect(() => {
        let cancelled = false;

        apiClient
            .get("/announcements/active")
            .then(({ data }) => {
                if (cancelled || !data?.message) return;
                if (readDismissed() === String(data.id)) return;
                setAnnouncement(data);
            })
            .catch(() => {
                // Offline, or the endpoint is not deployed yet. The bar is
                // additive — its absence is not worth reporting to a visitor.
            });

        return () => {
            cancelled = true;
        };
    }, []);

    if (!announcement) return null;

    const dismiss = () => {
        try {
            localStorage.setItem(DISMISSED_KEY, String(announcement.id));
        } catch {
            // Nothing to do — it will simply reappear next visit.
        }
        setAnnouncement(null);
    };

    const { message, linkUrl, linkLabel } = announcement;
    const external = linkUrl && /^https?:\/\//i.test(linkUrl);

    const duration = Math.max(
        MINIMUM_SECONDS,
        (message.length + (linkLabel?.length || 0)) * SECONDS_PER_CHARACTER
    );

    // One run of the message. Rendered twice inside the track; the clone is
    // hidden from assistive technology so the notice is announced once.
    const segment = (clone) => (
        <span
            data-marquee-clone={clone || undefined}
            aria-hidden={clone || undefined}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap px-8 text-[13px] leading-none sm:text-sm"
        >
            <Megaphone size={14} className="shrink-0 opacity-80" aria-hidden="true" />
            <span>{message}</span>
            {linkUrl && (
                <span className="inline-flex items-center gap-1 font-bold underline underline-offset-2">
                    {linkLabel || "Find out more"}
                    <ArrowRight size={13} />
                </span>
            )}
        </span>
    );

    const track = (
        <div className="krafo-marquee overflow-hidden py-2.5">
            <div
                className="krafo-marquee-track flex w-max items-center"
                style={{ "--marquee-duration": `${duration}s` }}
            >
                {segment(false)}
                {segment(true)}
            </div>
        </div>
    );

    // The whole strip is the click target when there is somewhere to go.
    // Without a link it stays a plain div rather than a button that does
    // nothing.
    const body = !linkUrl ? (
        track
    ) : external ? (
        <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${message} — ${linkLabel || "Find out more"}`}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
        >
            {track}
        </a>
    ) : (
        <Link
            to={linkUrl}
            aria-label={`${message} — ${linkLabel || "Find out more"}`}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
        >
            {track}
        </Link>
    );

    return (
        <div
            role="region"
            aria-label="Site announcement"
            className="relative z-[60] overflow-hidden bg-[#F2600B] text-white"
        >
            {body}

            {/* Edge fades, so the message slides in and out rather than being
                clipped at a hard line — and so it disappears cleanly behind the
                dismiss button. Both must stay click-through: an overlay that
                swallows pointer events is what made the FAQ accordion dead. */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#F2600B] to-transparent"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F2600B] via-[#F2600B] to-transparent"
            />

            <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss announcement"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-1.5 opacity-75 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
                <X size={15} />
            </button>
        </div>
    );
}
