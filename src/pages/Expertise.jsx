import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, CalendarClock } from 'lucide-react';
import Navbar from '../assets/components/Navbar';
import Footer from '../assets/components/Footer';
import { EXPERTISE } from './expertiseData';

const CALENDLY_URL = 'https://calendly.com/krafosystems';

export default function Expertise() {
  const { hash } = useLocation();

  // Deep-link support: when arriving at /expertise#slug (e.g. from a card on the
  // Consultation page), scroll to that section. A short delay lets the content
  // render and wins over the global ScrollToTop reset.
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative isolate px-6 lg:px-8 pt-24 pb-16 border-b border-orange-500/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#F2600B22_1px,transparent_1px)] [background-size:22px_22px] opacity-20" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            What We Do
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            Our <span className="text-orange-600">Cybersecurity</span> Expertise
          </motion.h1>
          <motion.p
            className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            From continuous monitoring to compliance with Ghana&apos;s Data Protection and
            Cybersecurity Acts, our services are built to help you understand, reduce, and
            manage cyber risk — practically and affordably.
          </motion.p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-7 rounded-full transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-600/40"
            >
              Book a Consultation <CalendarClock size={18} />
            </a>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 border border-orange-500/40 hover:border-orange-500 text-white font-semibold py-3 px-7 rounded-full transition"
            >
              <ArrowLeft size={18} /> Back to Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Expertise detail list */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 md:space-y-16">
          {EXPERTISE.map((item, i) => {
            const Icon = item.Icon;
            return (
              <motion.article
                key={item.slug}
                id={item.slug}
                className="group scroll-mt-28 relative rounded-2xl overflow-hidden border border-orange-500/15 shadow-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                transition={{ duration: 0.5 }}
              >
                {/* Dimmed background image */}
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dimming layers keep text legible on any image */}
                <div className="absolute inset-0 bg-black/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />

                {/* Content over the image */}
                <div className="relative p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-orange-500/15 border border-orange-500/40 backdrop-blur flex items-center justify-center">
                        <Icon className="text-orange-500" size={26} />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                        {item.title}
                      </h2>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{item.summary}</p>
                  </div>

                  <div className="lg:pl-8">
                    <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-4">
                      What&apos;s included
                    </p>
                    <ul className="space-y-3">
                      {item.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                            <Check size={12} className="text-orange-400" />
                          </span>
                          <span className="text-gray-200">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-500/10 via-black to-black border-t border-orange-500/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Not sure where to <span className="text-orange-600">start?</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Book a free consultation and we&apos;ll help you identify your biggest risks and the
            fastest wins — no jargon, no pressure.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-600/40"
          >
            Schedule Your Session <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
