/**
 * Reads past and planned events from the API, falling back to the records in
 * eventsContent.js.
 *
 * The fallback is the point of this hook, not a safety net bolted on after.
 * These sections were hardcoded long before there was anywhere to store them,
 * so on the day the endpoints ship the database is empty — and an events page
 * that renders nothing until someone re-enters twelve records by hand is worse
 * than the page we already have. So: show whatever the API returns, and show
 * the built-in records whenever it returns nothing, errors, or is unreachable.
 *
 * That also means the migration can happen one record at a time, and a backend
 * outage degrades to the current page rather than to an empty one.
 */

import { useEffect, useState } from "react";
import { apiClient } from "../../api/client";
import * as Icons from "lucide-react";
import { PAST_EVENTS, PAST_EVENT_YEARS, PLANNED_EVENTS } from "./eventsContent";

/**
 * A stored record carries an icon *name*; the page needs a component. An
 * unknown or missing name resolves to Sparkles rather than throwing, so a typo
 * in the dashboard can never blank the section.
 */
export const iconFromName = (name) =>
    (name && Icons[name]) || Icons.Sparkles;

/** Reshape an API planned event into what the existing components expect. */
const adaptPlanned = (e) => ({
    id: e.slug,
    goal: e.goal,
    media: e.mediaUrl ? { type: e.mediaType || "image", src: e.mediaUrl } : undefined,
    Icon: iconFromName(e.iconName),
    title: e.title,
    window: e.window,
    venue: e.venue,
    format: e.format,
    pitch: e.pitch,
    signals: e.signals || [],
});

/** Reshape an API past event; `photos` is stored as objects, rendered as URLs. */
const adaptPast = (e) => ({
    id: e.slug,
    year: e.year,
    date: e.date,
    title: e.title,
    location: e.location,
    tag: e.tag,
    stat: e.stat,
    image: e.image,
    photos: (e.photos || []).map((p) => p.url).filter(Boolean),
    blurb: e.blurb,
});

function useRemoteOrBuiltIn(path, adapt, builtIn) {
    const [items, setItems] = useState(builtIn);
    const [source, setSource] = useState("built-in");

    useEffect(() => {
        let cancelled = false;

        apiClient
            .get(path)
            .then((res) => {
                const rows = res.data?.events;
                // An empty collection is not an error — it means nothing has
                // been migrated yet, so the built-in records stand.
                if (cancelled || !Array.isArray(rows) || rows.length === 0) return;
                setItems(rows.map(adapt));
                setSource("api");
            })
            .catch(() => {
                // Offline, or the endpoint is not deployed. The built-in
                // records are already rendered; nothing to report to a visitor.
            });

        return () => {
            cancelled = true;
        };
        // `adapt` is a module-level constant, so it is stable across renders;
        // listing it keeps the dependency check honest rather than silenced.
    }, [path, adapt]);

    return { items, source };
}

export function usePlannedEvents() {
    const { items, source } = useRemoteOrBuiltIn(
        "/events/planned",
        adaptPlanned,
        PLANNED_EVENTS
    );
    return { plannedEvents: items, source };
}

export function usePastEvents() {
    const { items, source } = useRemoteOrBuiltIn("/events/past", adaptPast, PAST_EVENTS);

    // Derive the year filter from whatever is actually being shown, so it can
    // never offer a year with nothing behind it.
    const years =
        source === "api"
            ? [...new Set(items.map((e) => e.year))].sort((a, b) => String(b).localeCompare(String(a)))
            : PAST_EVENT_YEARS;

    return { pastEvents: items, years, source };
}
