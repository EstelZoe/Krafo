// AudienceMosaic — the "Who we work with" section, opened by a canopy of real
// photographs from past Krafo events.
//
// The photographs are pulled from PAST_EVENTS rather than imported directly,
// so every tile is a genuine event we ran and each one can name itself in its
// alt text. If the events data changes, this changes with it.
//
// Layout follows the reference: a staggered band of rounded photo tiles that
// dips in the middle, with the section heading sitting in the clearing.

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Landmark, GraduationCap, HeartHandshake, ArrowUpRight } from "lucide-react";
import { PAST_EVENTS } from "../events/eventsContent";
import { INDUSTRY_PROFILES, PROFILE_KEYS } from "./industryProfiles";

/**
 * Every distinct photograph across the past events, each still carrying the
 * event it came from. De-duplicated because several events share a frame.
 */
const EVENT_PHOTOS = (() => {
  const seen = new Set();
  const out = [];
  for (const event of PAST_EVENTS) {
    for (const src of event.photos || [event.image]) {
      if (!src || seen.has(src)) continue;
      seen.add(src);
      out.push({ src, title: event.title });
    }
  }
  return out;
})();

/**
 * The canopy's shape: height and vertical drop for each tile, in order.
 * Deliberately dips at index 4–6 so the heading has a clearing to sit in,
 * and the outer tiles ride lower so the band reads as an arc rather than a
 * ruler-straight row.
 *
 * `hide` drops a tile at narrower widths — eleven tiles at phone width would
 * be eleven slivers.
 */
const CANOPY = [
  { h: 170, drop: 45, hide: "hidden lg:block" },
  { h: 235, drop: 10, hide: "hidden md:block" },
  { h: 200, drop: 60, hide: "hidden sm:block" },
  { h: 110, drop: 30, hide: "" },
  { h: 95, drop: 55, hide: "hidden sm:block" },
  { h: 85, drop: 70, hide: "hidden lg:block" },
  { h: 95, drop: 55, hide: "hidden sm:block" },
  { h: 110, drop: 30, hide: "" },
  { h: 200, drop: 60, hide: "hidden sm:block" },
  { h: 235, drop: 10, hide: "hidden md:block" },
  { h: 170, drop: 45, hide: "hidden lg:block" },
];

const AUDIENCE_ICONS = {
  [PROFILE_KEYS.GOVERNMENT]: Landmark,
  [PROFILE_KEYS.BUSINESS]: Building2,
  [PROFILE_KEYS.INSTITUTION]: GraduationCap,
  [PROFILE_KEYS.NGO]: HeartHandshake,
};

export default function AudienceMosaic() {
  return (
    <div className="relative">
      {/* ── The canopy ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-center gap-2 sm:gap-3 md:gap-4">
        {CANOPY.map((tile, i) => {
          const photo = EVENT_PHOTOS[i % EVENT_PHOTOS.length];
          if (!photo) return null;
          return (
            <motion.figure
              key={`${photo.src}-${i}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.5, delay: Math.abs(i - 5) * 0.05 }}
              style={{ height: tile.h, marginTop: tile.drop }}
              className={`group relative w-[13%] shrink-0 overflow-hidden rounded-2xl sm:w-[11%] md:w-[9.5%] ${tile.hide}`}
            >
              <img
                src={photo.src}
                alt={`From ${photo.title}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Bottom fade so the band sinks into the section rather than
                  ending on a hard edge. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
              />
            </motion.figure>
          );
        })}
      </div>

      {/* ── The heading, tucked into the dip ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative z-10 -mt-6 text-center sm:-mt-12 lg:-mt-16"
      >
        {/* The canopy's outer tiles still reach down beside the heading, so a
            soft scrim guarantees the type reads whatever photograph lands
            behind it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.92)_38%,rgba(0,0,0,0.7)_58%,transparent_78%)]"
        />
        <span className="inline-flex items-center rounded-full border border-[#F2600B]/35 bg-black/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ff8534] backdrop-blur-md">
          Who We Serve
        </span>
        <h2 className="hero-display mx-auto mt-4 max-w-2xl text-balance text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
          Trusted across sectors,{" "}
          <span className="text-[#F2600B]">from ministries to start-ups</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-gray-400">
          Four kinds of organisation, one standard of protection — from a
          ministry&apos;s public records to a founder&apos;s first hundred
          customers.
        </p>
      </motion.div>

      {/* ── The four segments ───────────────────────────────────────── */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {INDUSTRY_PROFILES.map((aud, i) => {
          const Icon = AUDIENCE_ICONS[aud.key] || Building2;
          return (
            <motion.article
              key={aud.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#F2600B]/45 hover:bg-white/[0.06]"
            >
              {/* A sliver of the segment's own photography, kept faint so the
                  copy stays the thing you read. */}
              <img
                src={aud.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.14]"
              />

              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#F2600B]/30 bg-[#F2600B]/10 text-[#F2600B]">
                <Icon size={20} />
              </span>

              <h3 className="hero-display relative mt-4 text-lg font-bold text-white">
                {aud.label}
              </h3>
              <p className="relative mt-2 flex-1 text-sm leading-relaxed text-gray-400">
                {aud.shortText}
              </p>

              <Link
                to="/consultation"
                className="relative mt-5 inline-flex items-center gap-1.5 border-t border-white/10 pt-4 text-sm font-semibold text-white/70 transition-colors group-hover:text-[#F2600B]"
              >
                See how we help
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
