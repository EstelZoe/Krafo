import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { courses as coursesData } from "../assets/data/courses";

/**
 * Reusable "Explore Our Featured Courses" section — the expandable course cards
 * from the Courses page, extracted so both the Courses page and the Services
 * page can share the exact same section.
 *
 * Props:
 *   - title / titleAccent: heading text (accent word is gradient-highlighted)
 *   - subtitle: supporting line under the heading
 */
export default function FeaturedCourses({
  title = "Explore Our",
  titleAccent = "Featured Courses",
  subtitle = "Practical, high-demand training in Cybersecurity, Digital Literacy, and more — built for teams and personnel.",
}) {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const courses = coursesData;

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-black via-[#000000] to-[#1d0b00] text-white overflow-hidden">
      {/* Animated Particle Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(242,96,11,0.15),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.1),transparent_60%)] animate-pulse"></div>
      </div>

      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          {title}{" "}
          <span className="bg-gradient-to-r from-[#F2600B] to-orange-300 bg-clip-text text-transparent">
            {titleAccent}
          </span>
        </h2>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">{subtitle}</p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course, idx) => (
          <motion.div
            key={idx}
            id={course.id}
            layout
            className={`relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer h-full ${expandedIndex === idx ? "lg:col-span-2" : ""}`}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            whileHover={expandedIndex !== idx ? { y: -5, boxShadow: "0 20px 25px -5px rgba(242, 96, 11, 0.1), 0 10px 10px -5px rgba(242, 96, 11, 0.04)" } : {}}
          >
            <div className="h-full flex flex-col lg:flex-row">
              {/* Main Card Content */}
              <div className={`flex-grow ${expandedIndex === idx ? "lg:w-1/2" : ""}`} onClick={() => expandedIndex !== idx && setExpandedIndex(idx)}>
                <div className="relative overflow-hidden">
                  <motion.img layout="position" src={course.image} alt={course.title} className="h-52 w-full object-cover" whileHover={{ scale: expandedIndex !== idx ? 1.05 : 1 }} transition={{ duration: 0.3 }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold bg-[#F2600B] text-black rounded-full">
                    {course.price}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <motion.h3 layout="position" className="text-xl font-bold group-hover:text-[#F2600B]">
                      {course.title}
                    </motion.h3>
                    <AnimatePresence mode="wait">
                      <motion.p key={expandedIndex === idx ? "expanded" : "collapsed"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-gray-400 text-sm mt-2">
                        {course.description}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="mt-4">
                    <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="absolute h-full w-1/2 bg-gradient-to-r from-[#F2600B] to-orange-300 animate-indeterminate-progress"></div>
                    </div>
                    <motion.button
                      layout="position"
                      className="mt-4 w-full py-2.5 text-sm bg-gradient-to-r from-black/30 to-black/60 hover:from-black/40 hover:to-black/70 rounded-lg transition-all font-medium flex items-center justify-center group border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                      onClick={(e) => { e.stopPropagation(); setExpandedIndex(expandedIndex === idx ? -1 : idx); }}
                      whileHover={{ boxShadow: "0 0 20px rgba(242, 96, 11, 0.4)", borderColor: "rgba(242, 96, 11, 0.3)" }}
                    >
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1.5 text-[#F2600B] transition-transform ${expandedIndex === idx ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="bg-gradient-to-r from-[#F2600B] to-orange-300 bg-clip-text text-transparent font-semibold">
                          {expandedIndex === idx ? "Show Less" : "More Info"}
                        </span>
                      </span>
                    </motion.button>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F2600B]/30 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Expanded Details Panel */}
              <AnimatePresence>
                {expandedIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }}
                    className="lg:w-1/2 p-6 bg-gradient-to-br from-[#1a0a00] to-[#0d0400] border-l border-[#F2600B]/30 relative"
                  >
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-black/30 rounded-full p-1.5 z-10" onClick={() => setExpandedIndex(-1)} aria-label="Close details">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="h-full flex flex-col">
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-[#F2600B]">Course Breakdown</h4>
                        <div className="mb-5 p-4 bg-black/20 rounded-xl border border-white/10 backdrop-blur-sm">
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              ["Duration", "16 weeks"],
                              ["Format", "Hybrid"],
                              ["Tuition per Head", course.price],
                              ["Support", "24/7 Mentors"],
                            ].map(([label, value], mi) => (
                              <div key={mi} className="flex items-center text-sm">
                                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-[#F2600B]/10 flex items-center justify-center mr-2">
                                  <span className="w-2 h-2 rounded-full bg-[#F2600B]" />
                                </div>
                                <div>
                                  <div className="text-gray-400 text-xs">{label}</div>
                                  <div className="text-gray-300">{value}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow mb-5">
                        <h5 className="font-medium mb-3 text-[#F2600B]/90">Highlights:</h5>
                        <ul className="space-y-3">
                          {(course.details || []).map((detail, i) => (
                            <motion.li key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-start p-3 bg-black/20 rounded-lg border border-white/5 hover:border-[#F2600B]/30 transition-colors">
                              <span className="text-[#F2600B] mr-2 mt-1.5 text-lg">•</span>
                              <span className="text-gray-300 text-sm">{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-auto">
                        <Link to={`/courses/${course.slug}`} className="block text-center py-3 bg-gradient-to-r from-[#F2600B] to-orange-500 text-black font-bold rounded-lg hover:from-orange-500 hover:to-[#F2600B] transition-all shadow-lg hover:shadow-orange-500/40 relative overflow-hidden group">
                          <span className="relative z-10">View Details &amp; Enroll</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {expandedIndex === idx && (
              <div className="absolute top-4 right-4 bg-[#F2600B] text-black text-xs font-bold px-2 py-1 rounded-full z-10">
                EXPERT LEVEL
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
