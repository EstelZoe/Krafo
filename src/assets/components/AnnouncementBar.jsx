import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, X } from "lucide-react";
import { apiClient } from "../../api/client";

/**
 * The thin bar above the navbar. One live announcement at a time, chosen by
 * the API; nothing renders when there is none.
 *
 * Two behaviours worth knowing:
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

    const cta = linkUrl && (
        external ? (
            <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-1 font-bold underline underline-offset-2 hover:no-underline"
            >
                {linkLabel || "Find out more"}
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </a>
        ) : (
            <Link
                to={linkUrl}
                className="group inline-flex shrink-0 items-center gap-1 font-bold underline underline-offset-2 hover:no-underline"
            >
                {linkLabel || "Find out more"}
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
        )
    );

    return (
        <div
            role="region"
            aria-label="Site announcement"
            className="relative z-[60] bg-[#F2600B] text-white"
        >
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 pr-10 sm:px-6">
                <Megaphone size={15} className="hidden shrink-0 opacity-80 sm:block" aria-hidden="true" />
                <p className="flex flex-1 flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-[13px] leading-snug sm:text-sm">
                    <span>{message}</span>
                    {cta}
                </p>
            </div>

            <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss announcement"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 opacity-75 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
                <X size={15} />
            </button>
        </div>
    );
}
