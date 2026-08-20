// ContactUs — a channel chooser, and nothing else.
//
// The old page had a <form> with no handler and no action, so Submit reloaded
// the page and threw the answer away. Rather than wire up an endpoint nobody
// asked for, this routes people to the three channels we actually monitor:
// WhatsApp, email, and a booked call.
//
// No hero and no footer: the three cards ARE the page, and anything above or
// below them only delays the one decision there is to make.
//
// The topic chips are the part that earns their place — picking one pre-fills
// whichever channel you then choose, so the message arrives with context and
// the visitor never faces an empty compose box.

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Copy, X } from "lucide-react";
import Navbar from "../assets/components/Navbar";

import photoWhatsApp from "../assets/images/contact-whatsapp.webp";
import photoEmail from "../assets/images/contact-email.webp";
import photoCall from "../assets/images/contact-call.webp";

const WHATSAPP_NUMBER = "233593196002";
const WHATSAPP_DISPLAY = "+233 59 319 6002";
const EMAIL = "info@krafosystems.com";
const CALENDLY_URL = "https://calendly.com/krafosystems";

/* ── Marks ────────────────────────────────────────────────────────────
   WhatsApp is its own glyph, drawn accurately — it's the mark people scan
   for, and an approximation would read as a knock-off.

   Calendly and email are deliberately NOT their companies' logos. See the
   note above each. */

const WhatsAppMark = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

// An envelope, not Gmail's or Proton's mark. `mailto:` opens whatever client
// the VISITOR has set as default — Outlook, Apple Mail, Thunderbird — so
// showing Gmail's logo would tell them something untrue about what happens
// next, quite apart from Google's rules on using it.
const EnvelopeMark = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <rect
      x="2.25"
      y="4.75"
      width="19.5"
      height="14.5"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M3.5 7.5 10.6 12.6a2.4 2.4 0 0 0 2.8 0L20.5 7.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M3.6 18.2 9.4 13m11 5.2L14.6 13"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.45"
    />
  </svg>
);

// A calendar with a booked slot — again, not Calendly's actual logo, which I
// won't reproduce from memory badly. If you want the real one, download the
// official SVG from calendly.com/brand, drop it in assets, and swap this out.
const BookingMark = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M3 10h18M8 3v4M16 3v4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <rect x="6.75" y="13" width="5" height="4.5" rx="1.2" fill="currentColor" />
    <path
      d="m14 16.2 1.7 1.7 3.1-3.4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TOPICS = [
  { key: "project", label: "A new website or app", text: "a new website or app" },
  { key: "security", label: "Cybersecurity help", text: "cybersecurity help" },
  { key: "training", label: "Training for my team", text: "training for my team" },
  {
    key: "support",
    label: "Support with something live",
    text: "support with something we already have",
  },
  { key: "other", label: "Something else", text: "an enquiry" },
];

// Brand orange carries everything Krafo says — names, details, rails, glow.
// The only place a channel's own colour survives is its mark, because that's
// the bit people scan for; WhatsApp not being green would cost more in
// recognition than it gains in consistency.
//
// Tailwind can't see class names it doesn't find as literal strings, so these
// are written out in full rather than interpolated.
const MARK_TILES = {
  whatsapp:
    "border-emerald-400/40 bg-emerald-500/15 text-emerald-400 group-hover:border-emerald-400/80 group-hover:bg-emerald-500/25",
  email:
    "border-[#F2600B]/40 bg-[#F2600B]/15 text-[#F2600B] group-hover:border-[#F2600B]/80 group-hover:bg-[#F2600B]/25",
  call: "border-sky-400/40 bg-sky-500/15 text-sky-400 group-hover:border-sky-400/80 group-hover:bg-sky-500/25",
};

/**
 * Asked after the visitor has picked a channel, not before.
 *
 * The question only makes sense once someone has decided to get in touch —
 * putting it above the cards made it the first thing on the page, which is a
 * hurdle in front of a decision nobody had made yet. Here it costs one tap and
 * arrives when it's obviously useful.
 */
function TopicDialog({
  channel,
  topicKey,
  onPick,
  intro,
  onClose,
  onCopyMessage,
  messageCopied,
}) {
  const firstChipRef = useRef(null);
  const restoreFocusRef = useRef(null);
  const Mark = channel.Mark;

  useEffect(() => {
    restoreFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    firstChipRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      restoreFocusRef.current?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Get in touch on ${channel.name}`}
    >
      <motion.div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#F2600B]/25 bg-[#0d0906] p-6 shadow-2xl shadow-black/70 sm:p-8"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-400 transition hover:border-[#F2600B] hover:text-white"
        >
          <X size={17} />
        </button>

        <span
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${channel.tile}`}
        >
          <Mark className="h-6 w-6" />
        </span>

        <h2 className="hero-display mt-4 text-2xl font-extrabold text-[#F2600B]">
          {channel.name}
        </h2>

        <p className="mt-4 text-sm font-medium text-gray-300">
          What&apos;s it about?{" "}
          <span className="text-gray-600">Optional — it just saves you typing.</span>
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {TOPICS.map((t, i) => {
            const on = t.key === topicKey;
            return (
              <button
                key={t.key}
                ref={i === 0 ? firstChipRef : undefined}
                type="button"
                onClick={() => onPick(on ? null : t.key)}
                aria-pressed={on}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                  on
                    ? "bg-[#F2600B] text-white shadow-[0_0_18px_rgba(242,96,11,0.35)]"
                    : "border border-white/15 text-gray-300 hover:border-[#F2600B]/50 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Showing the pre-filled line is what makes the feature worth the
            extra tap — otherwise it just looks like a question in the way. */}
        <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-relaxed text-gray-400">
          <span className="text-gray-600">Your message will start:</span>
          <br />
          <motion.span
            key={intro}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#ff8534]"
          >
            &ldquo;{intro}&rdquo;
          </motion.span>
        </p>

        <a
          href={channel.href}
          {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          onClick={onClose}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#F2600B] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#d94f00]"
        >
          {channel.cta}
          <ArrowUpRight size={17} />
        </a>

        {/* Somewhere to go when the primary action silently does nothing */}
        {channel.alternates && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
            <span>Nothing opened? Compose in</span>
            {channel.alternates.map((alt) => (
              <a
                key={alt.label}
                href={alt.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="rounded-full border border-white/15 px-3 py-1 font-semibold text-gray-300 transition hover:border-[#F2600B]/60 hover:text-[#ff8534]"
              >
                {alt.label}
              </a>
            ))}
            <span>or</span>
            <button
              type="button"
              onClick={onCopyMessage}
              className="rounded-full border border-white/15 px-3 py-1 font-semibold text-gray-300 transition hover:border-[#F2600B]/60 hover:text-[#ff8534]"
            >
              {messageCopied ? "Copied" : "copy it"}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ContactUs() {
  const [topicKey, setTopicKey] = useState(null);
  const [pendingKey, setPendingKey] = useState(null);
  const [copied, setCopied] = useState(null);

  const topic = TOPICS.find((t) => t.key === topicKey);
  const intro = `Hello Krafo Systems, I'd like to talk about ${
    topic ? topic.text : "a project"
  }.`;
  const subject = topic ? `Enquiry — ${topic.label}` : "Enquiry from krafosystems.com";

  // The `meta` lines are deliberately soft — "usually the fastest" rather than
  // "within 2 hours". A stated response time is a promise, and a channel that
  // answers slower than it advertises does more damage than one that never
  // said. Swap in real figures once you know you can hold them.
  const CHANNELS = [
    {
      key: "whatsapp",
      Mark: WhatsAppMark,
      photo: photoWhatsApp,
      alt: "Someone taking a call while working at a laptop",
      tile: MARK_TILES.whatsapp,
      name: "WhatsApp",
      bestFor: "A quick question, or a fast back-and-forth.",
      detail: WHATSAPP_DISPLAY,
      meta: "Usually the fastest way to reach us",
      cta: "Open WhatsApp",
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(intro)}`,
      external: true,
    },
    {
      key: "email",
      Mark: EnvelopeMark,
      photo: photoEmail,
      alt: "A desk covered in documents and charts",
      tile: MARK_TILES.email,
      name: "Email",
      bestFor: "Detail — a brief, documents, or a written quote.",
      detail: EMAIL,
      meta: "Best when there's something to attach",
      cta: "Open your mail app",
      href: `mailto:${EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(`${intro}\n\n`)}`,
      external: false,
      // `mailto:` hands off to whatever the OS has registered as the default
      // mail client. On a machine with no desktop mail app — which is most
      // people who live in webmail — clicking it does nothing at all, with no
      // error. These give that visitor somewhere to go instead of a dead end.
      alternates: [
        {
          label: "Gmail",
          href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
            EMAIL
          )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(intro)}`,
        },
        {
          label: "Outlook",
          href: `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
            EMAIL
          )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(intro)}`,
        },
      ],
    },
    {
      key: "call",
      Mark: BookingMark,
      photo: photoCall,
      alt: "Two people talking across a table",
      tile: MARK_TILES.call,
      name: "Book a call",
      bestFor: "When it's easier to just talk it through.",
      detail: "30 minutes · free",
      meta: "Pick a slot that suits you",
      cta: "See available times",
      // Calendly's `a1` prefills the answer to the FIRST custom question on the
      // event type. If the booking page has no custom question, Calendly drops
      // the param silently — which is why this card skips the topic dialog: it
      // would be an extra tap for nothing. Add a "What's this about?" question
      // to the event in Calendly and flip skipDialog to false to switch it on.
      href: `${CALENDLY_URL}?a1=${encodeURIComponent(intro)}`,
      external: true,
      skipDialog: true,
    },
  ];

  // Looked up rather than stored, so the dialog's link always carries the
  // topic chosen inside it — CHANNELS is rebuilt whenever `intro` changes.
  const pending = CHANNELS.find((c) => c.key === pendingKey) || null;

  const copy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard is blocked in some browsers and over plain HTTP. The detail
      // is on screen either way, so failing quietly is the right behaviour.
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <style>{`.hero-display { font-family: 'Proxon', sans-serif; }`}</style>

      <Navbar />

      <main className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28 md:pt-24">
        {/* A single soft wash — the cards are the only thing on this page with
            structure, and nothing should compete with them. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#F2600B14,transparent_65%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#F2600B 1px, transparent 1px), linear-gradient(90deg, #F2600B 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl">
          {/* ── The three ways through ───────────────────────────────── */}
          <div className="grid gap-5 md:grid-cols-3">
            {CHANNELS.map((c, i) => {
              const Mark = c.Mark;
              return (
                <motion.div
                  key={c.key}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.09 }}
                  className="group relative"
                >
                  {/* The halo. It has to live outside the card, because the
                      card clips its own overflow to keep the photo's corners
                      rounded — a glow drawn inside would be cut off at the
                      exact edge it needs to spill past. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-4 rounded-[2.25rem] bg-[#F2600B]/0 opacity-0 blur-2xl transition-all duration-500 group-hover:bg-[#F2600B]/[0.075] group-hover:opacity-100"
                  />

                  <a
                    href={c.href}
                    {...(c.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    onClick={(e) => {
                      // Channels whose destination can't use the context go
                      // straight through — the link is left to behave normally.
                      if (c.skipDialog) return;
                      // Otherwise intercept the left click to ask first, but
                      // leave the href in place so right-click / middle-click /
                      // "open in new tab" still work and go straight through.
                      e.preventDefault();
                      setPendingKey(c.key);
                    }}
                    className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0906] transition-all duration-500 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2600B] group-hover:border-[#F2600B]/70 group-hover:shadow-[0_0_40px_-14px_rgba(242,96,11,0.125),0_24px_60px_-30px_rgba(242,96,11,0.175)]"
                  >
                    {/* Accent rail — draws across the top edge on hover */}
                    <span className="absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 bg-[#F2600B] transition-transform duration-500 group-hover:scale-x-100" />

                    {/* Photo band. Held back at rest so the page stays calm,
                        then given its colour when the card is the one being
                        considered. */}
                    <div className="relative h-36 shrink-0 overflow-hidden">
                      <img
                        src={c.photo}
                        alt={c.alt}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale-[45%] brightness-[0.72] transition-all duration-700 group-hover:scale-[1.06] group-hover:grayscale-0 group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0906] via-[#0d0906]/45 to-transparent" />
                    </div>

                    <div className="relative flex flex-1 flex-col px-7 pb-7">
                      {/* Mark straddles the photo's lower edge */}
                      <span
                        className={`-mt-8 flex h-16 w-16 items-center justify-center rounded-2xl border backdrop-blur-md transition-all duration-500 ${c.tile}`}
                      >
                        <Mark className="h-7 w-7" />
                      </span>

                      <h2 className="hero-display mt-5 text-2xl font-extrabold text-[#F2600B]">
                        {c.name}
                      </h2>
                      <p className="mt-2.5 text-sm leading-relaxed text-gray-400">
                        {c.bestFor}
                      </p>

                      {/* Pushes the detail + action to the bottom so all three
                          line up regardless of copy length. */}
                      <div className="min-h-[1.25rem] flex-1" />

                      <div className="border-t border-white/10 pt-5">
                        {/* The lighter orange, not #F2600B — at 14px on this
                            ground the brand orange sits under a comfortable
                            contrast ratio, and this is the line people are
                            trying to read off the screen. */}
                        <p className="font-mono text-sm font-medium tracking-tight text-[#ff8534]">
                          {c.detail}
                        </p>
                        <p className="mt-1.5 flex items-center gap-2 text-xs text-gray-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#F2600B]" />
                          {c.meta}
                        </p>

                        <span className="mt-5 flex items-center justify-between gap-3 text-sm font-bold text-white">
                          {c.cta}
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-transparent group-hover:bg-[#F2600B] group-hover:text-white">
                            <ArrowUpRight size={17} />
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* ── For anyone who'd rather copy than be redirected ──────── */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            {[
              { key: "email", label: EMAIL, Mark: EnvelopeMark },
              { key: "phone", label: WHATSAPP_DISPLAY, Mark: WhatsAppMark },
            ].map((d) => {
              const Mark = d.Mark;
              const done = copied === d.key;
              return (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => copy(d.label, d.key)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-gray-400 transition hover:border-[#F2600B]/40 hover:text-white"
                >
                  <Mark className="h-3.5 w-3.5 text-[#F2600B]" />
                  {d.label}
                  {done ? (
                    <span className="flex items-center gap-1 font-sans font-semibold text-emerald-400">
                      <Check size={12} /> Copied
                    </span>
                  ) : (
                    <Copy size={12} className="text-gray-600" />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {pending && (
          <TopicDialog
            key={pending.key}
            channel={pending}
            topicKey={topicKey}
            intro={intro}
            onPick={setTopicKey}
            onClose={() => setPendingKey(null)}
            messageCopied={copied === "message"}
            onCopyMessage={() => copy(`${EMAIL}\n\n${subject}\n\n${intro}`, "message")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
