import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Shared shell for legal / policy pages (Terms, Privacy, Cookies, …) so they
 * inherit the site's brand system instead of the old plain template:
 *   • Proxon `hero-display` heading + orange-bar eyebrow
 *   • black ground with the #F2600B radial wash used across the site
 *   • a consistent prose container that upgrades every child <h2> to the
 *     display font (via an arbitrary-property variant), so page bodies stay
 *     simple and can never drift apart again.
 *
 * Props:
 *   eyebrow  – small uppercase label above the title (default "Legal")
 *   title    – the page heading
 *   updated  – optional "Last updated" date string
 *   intro    – optional lead paragraph under the title
 *   children – the policy body (a series of <section> blocks)
 */
export default function LegalPageLayout({
  eyebrow = "Legal",
  title,
  updated,
  intro,
  children,
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <style>{`.hero-display{font-family:'Proxon',sans-serif;}`}</style>

      <Navbar />

      {/* Hero — branded but compact; legal pages don't need the full parallax. */}
      <section className="relative isolate overflow-hidden border-b border-[#F2600B]/10 px-6 pt-28 pb-14 md:pt-32 md:pb-16 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_-10%,#F2600B1f,transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(#F2600B14_1px,transparent_1px)] [background-size:22px_22px] opacity-20"
        />
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#F2600B]" />
          <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
            {eyebrow}
          </span>
          <h1 className="hero-display mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {title}
          </h1>
          {updated && (
            <p className="mt-4 text-sm text-gray-400">Last updated: {updated}</p>
          )}
          {intro && (
            <p className="mx-auto mt-5 max-w-2xl text-balance leading-relaxed text-gray-300">
              {intro}
            </p>
          )}
        </div>
      </section>

      {/* Body — the arbitrary-property variant upgrades every child <h2> to the
          Proxon display font without touching each page's markup. */}
      <main className="relative px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8 leading-relaxed text-gray-300 [&_h2]:[font-family:'Proxon',sans-serif]">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
