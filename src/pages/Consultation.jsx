import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, CalendarClock } from "lucide-react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import { EXPERTISE } from "./expertiseData";

// Hero background — the bridge ("the bridge between your business and cyber resilience").
import bridge from "../assets/images/40128.jpg";
// Kept from the previous page (strategy section visual).
import studyGroup from "../assets/images/studygroup2.jpg";

// ── Certifications carousel images ───────────────────────────────────────────
// TODO (team): replace these placeholders with real certificate / accreditation
// scans. Drop the files in src/assets/images/ (or a /certs subfolder), import
// them here, and swap them into the `certifications` array below. The carousel
// auto-adjusts to however many you provide.
import certPlaceholder1 from "../assets/images/cyberdefense.jpeg";
import certPlaceholder2 from "../assets/images/africadefense.jpeg";
import certPlaceholder3 from "../assets/images/cyberart.jpg";
import certPlaceholder4 from "../assets/images/hacking.jpeg";

const CALENDLY_URL = "https://calendly.com/krafosystems";

const certifications = [
  { src: certPlaceholder1, alt: "Certification placeholder 1" },
  { src: certPlaceholder2, alt: "Certification placeholder 2" },
  { src: certPlaceholder3, alt: "Certification placeholder 3" },
  { src: certPlaceholder4, alt: "Certification placeholder 4" },
];

// Real testimonials — kept from the previous consultation page.
const testimonials = [
  {
    name: "Diana D. Osei",
    role: "",
    quote:
      "This course has been very useful to my career development as a young African technology professional. It has taught me that Africans need to be cybersecurity aware because there's strength in each one of us knowing how to defend ourselves online, instead of working independently to mitigate cyber risks. I've gained very practical skills in protecting data and assets, for myself and for others. Thank you, Krafo Systems.",
  },
  {
    name: "Godswill Akuffo",
    role: "",
    quote:
      "I'll say Krafo System is a perfect institution for both beginners and advanced learners. Joining and taking the Krafo Cybersecurity Capacity Building Course has been one of the best decisions I have ever made. I love that I get to accumulate more knowledge from experienced facilitators. I'll definitely recommend Krafo as a solid choice for those looking to enter or advance in the cybersecurity field.",
  },
  {
    name: "Raphael Kwadzo Awazi",
    role: "",
    quote:
      "So far so good. I am okay with the class — the facilitators Mr Elikem Komla and Miss Fafali Mamagah are excellent and very supportive.",
  },
];

// Real FAQs — kept from the previous consultation page.
const faqs = [
  {
    question: "How quickly can we start after requesting consultation?",
    answer:
      "We typically schedule after receiving your request. For urgent security matters, we can offer expedited scheduling.",
  },
  {
    question: "What information do I need to prepare for the consultation?",
    answer:
      "We recommend having information about your current security tools, recent security incidents, compliance requirements, and business objectives. If you're not sure, our experts will guide you through the process.",
  },
  {
    question: "Can you help implement your recommendations?",
    answer:
      "Yes, we offer implementation support ranging from guidance to fully managed execution, depending on your needs and resources.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We have experience across financial services, healthcare, government, e-commerce, and critical infrastructure sectors, with frameworks tailored to each.",
  },
];

export default function Consultation() {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero: The Bridge ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[560px] md:h-[640px] overflow-hidden">
        <img
          src={bridge}
          alt="A bridge at dusk"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Darkening + brand gradient so text stays legible over any image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center py-24">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Solid orange block holding the headline (echoes the reference site) */}
            <div className="bg-[#F2600B] rounded-sm p-8 md:p-10 shadow-2xl shadow-orange-900/30">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
                The Bridge Between Your Business and{" "}
                <span className="text-black">Cyber Resilience</span>
              </h1>
            </div>
            <p className="text-gray-200 text-base md:text-lg mt-6 max-w-lg leading-relaxed">
              Expert cybersecurity consultation for organisations that can&apos;t afford to
              gamble with their data. We help you cross safely from risk to resilience.
            </p>
            <div className="mt-8">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-600/40 text-lg"
              >
                Book a Consultation <CalendarClock size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white/75 text-sm">
          <span className="border border-white/60 px-3 py-1 rounded-full">Scroll ↓</span>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-12 h-1 bg-orange-600 mx-auto mb-6 rounded-full" />
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            <span className="text-white font-semibold">Krafo Systems</span> is a licensed
            Cybersecurity Service Provider with Ghana&apos;s Cyber Security Authority and
            registered with the Data Protection Commission. We deliver practical,
            human-centred security — tailored to SMEs and institutions across the West
            African region.
          </p>
        </div>
      </section>

      {/* ── Our Expertise grid (links to the Expertise page) ─────────────── */}
      <section className="py-16 bg-gradient-to-b from-black to-[#0a0503]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-orange-600 mx-auto mb-4 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Our <span className="text-orange-600">Expertise</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-3">
              Explore the areas where we help organisations reduce cyber risk. Select any
              area to see exactly what&apos;s involved.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {EXPERTISE.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                >
                  <Link
                    to={`/expertise#${item.slug}`}
                    className="group flex flex-col items-center text-center h-full bg-[#111] border border-orange-500/15 rounded-2xl p-5 md:p-6 hover:border-orange-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-600/20 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                      <Icon className="text-orange-500" size={26} />
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-white leading-snug group-hover:text-orange-500 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/expertise"
              className="inline-flex items-center gap-2 border border-orange-500/40 hover:border-orange-500 hover:bg-orange-500/10 text-white font-semibold py-3 px-8 rounded-full transition"
            >
              Explore Full Expertise <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Strategy section (kept) ──────────────────────────────────────── */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-orange-500/20">
              <img src={studyGroup} alt="Krafo team collaborating" className="w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-orange-500 mb-2 flex items-center gap-2">
              <span className="w-4 h-4 border border-orange-500 rounded-full flex items-center justify-center text-[10px]">i</span>
              STRATEGIC PARTNERSHIP
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-snug mb-4">
              Building Cyber Resilience Through{" "}
              <span className="text-orange-600">Strategic Partnership</span>
            </h2>
            <p className="text-gray-400 mb-6">
              We don&apos;t just identify vulnerabilities — we help you build a comprehensive
              security strategy aligned with your business objectives and risk tolerance.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                ["Threat-Centric Methodology:", "Focused on your specific adversary landscape"],
                ["Business-Aligned Security:", "Solutions that support your operational goals"],
                ["Measurable Outcomes:", "Clear metrics to track security ROI"],
              ].map(([title, desc], idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="text-orange-500 mt-1">⦿</span>
                  <div>
                    <span className="text-white font-medium">{title}</span>{" "}
                    <span className="text-gray-400">{desc}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-600/40 inline-flex items-center gap-2"
            >
              Schedule Strategy Session <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Certifications & Accreditations carousel ─────────────────────── */}
      <section className="py-16 bg-[#0a0503] border-y border-orange-500/10 overflow-hidden">
        <div className="text-center mb-10 px-6">
          <div className="w-12 h-1 bg-orange-600 mx-auto mb-4 rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold">
            Certifications &amp; <span className="text-orange-600">Accreditations</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-3">
            Credentials that back our expertise.
          </p>
        </div>

        {/* Seamless auto-scrolling marquee (duplicated list for a smooth loop). */}
        <div className="group relative w-full">
          <div className="flex w-max animate-cert-scroll group-hover:[animation-play-state:paused]">
            {[...certifications, ...certifications].map((cert, i) => (
              <div key={i} className="mx-4 shrink-0">
                <div className="w-56 h-40 rounded-xl overflow-hidden border border-orange-500/20 bg-[#111] shadow-lg">
                  <img src={cert.src} alt={cert.alt} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes cert-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-cert-scroll {
            animation: cert-scroll 30s linear infinite;
          }
        `}</style>
      </section>

      {/* ── Testimonials (kept) ──────────────────────────────────────────── */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-orange-600 mx-auto mb-4 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">
              What Our <span className="text-orange-600">Clients Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-[#0d0400] to-[#1a0a00] rounded-xl p-6 border border-gray-800 shadow-xl transition duration-300 transform hover:scale-[1.02] hover:shadow-orange-600/40"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <h4 className="font-bold text-white">{t.name}</h4>
                {t.role && <p className="text-orange-500 text-sm">{t.role}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (kept) ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-orange-600 mx-auto mb-4 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Consultation <span className="text-orange-600">FAQs</span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-[#0d0400] to-[#1a0a00] rounded-lg overflow-hidden border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ delay: idx * 0.1 }}
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => setExpandedIndex(expandedIndex === idx ? -1 : idx)}
                  aria-expanded={expandedIndex === idx}
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  <ChevronDown
                    className={`h-6 w-6 text-orange-500 transition-transform shrink-0 ${expandedIndex === idx ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {expandedIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-gray-800">
                        <p className="text-gray-300">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating booking button (kept) */}
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a consultation"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4 rounded-full shadow-lg z-50 hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </a>
    </div>
  );
}
