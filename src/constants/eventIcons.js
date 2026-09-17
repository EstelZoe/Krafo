import {
    Brain,
    Building2,
    GraduationCap,
    HeartHandshake,
    Landmark,
    Rocket,
    ShieldCheck,
    Sparkles,
    Stethoscope,
    Users,
} from "lucide-react";

/**
 * The icons a planned event may choose from.
 *
 * This file exists to keep `import * as Icons from "lucide-react"` out of the
 * bundle. A planned event stores its icon as a *name*, looked up at runtime, so
 * a namespace import is the obvious way to resolve it — and it is the reason
 * every visitor was downloading 784KB of icons on first paint. A dynamic
 * `Icons[name]` tells the bundler nothing about which icons are reachable, so
 * it has to keep all ~1,500 of them, and the entry chunk pulled the lot in on
 * every page of the site.
 *
 * Naming each import explicitly restores tree-shaking: ten icons ship instead
 * of the library. The cost is that this list is now the authority on what an
 * event may use — adding a new option means adding it here, not just typing a
 * name into the dashboard.
 *
 * That constraint is deliberate rather than a side effect. The admin dropdown
 * already offered exactly these ten, so the set was closed in practice; it just
 * was not closed anywhere the bundler could see.
 */
export const EVENT_ICONS = Object.freeze({
    Brain,
    Building2,
    GraduationCap,
    HeartHandshake,
    Landmark,
    Rocket,
    ShieldCheck,
    Sparkles,
    Stethoscope,
    Users,
});

/** The names, for the dashboard's icon picker. */
export const EVENT_ICON_NAMES = Object.freeze(Object.keys(EVENT_ICONS));

/**
 * Resolve a stored icon name to a component.
 *
 * Falls back to Sparkles rather than throwing, so a name that predates this
 * list — or a typo saved before the picker constrained it — degrades to a
 * generic icon instead of blanking the section it appears in.
 */
export const iconFromName = (name) => EVENT_ICONS[name] || Sparkles;
