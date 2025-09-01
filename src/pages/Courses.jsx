import React, { useState, useEffect } from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
// import CourseFilter from "../assets/components/CourseFilter";
// import Courses from "../assets/images/coursespic.jpg";
// import CourseCard from "../assets/components/CourseCard";
// import Placeholder from "../assets/images/studentlearning.png";
// import bugGif from "../assets/videos/bug.gif";
import computerGif from "../assets/videos/computer.gif";
import exchangeGif from "../assets/videos/exchange.gif";
import malwareGif from "../assets/videos/malware.gif";
import palmGif from "../assets/videos/palm.gif";
import dataGif from "../assets/videos/data.gif";
import Vid1 from "../assets/videos/Vid2.mp4";
import vr from "../assets/images/vr.jpg";
import studyGroup from "../assets/images/studygroup.jpg";
import { motion, AnimatePresence } from "framer-motion";
import ccbc from "../assets/images/ccbc.png"
import ai from "../assets/images/AI&Cyber.png"
import ceo from "../assets/images/ceo.png"
import { div } from "framer-motion/client";




const checklistItems = [
    "We have a five-layer approach to making your business cyber resilient",
    "Experienced in securing research and development network projects",
    "Support for entrepreneurs and large organizations in cybersecurity",
    "High operational standards and leadership"
];

export default function Course() {
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const courses = [
        {

            id: "cybersecurity-course",
            title: "Cybersecurity Capacity Building Course (CCBC)",
            description:
                "A comprehensive program designed to build a strong foundation in cybersecurity principles, from network defense to incident response.",
            image: ccbc,
            price: "GHC 5,750",
            link: "https://chat.whatsapp.com/G86UT6B9BrCF51nExXybV5",
            details: [
                "12 months online access to resources.",
                "Networking & a Certificate of Completion.",
                "18 topics with quizzes & hands-on exercises.",
            ],
        },
        {
            id: "ai-cybersecurity-course",
            title: "AI & Cybersecurity",
            description:
                "Explore the dual role of AI in cybersecurity, learning to leverage it for defense and to protect against AI-driven threats.",
            image: ai,
            price: "Free",
            link: "https://example.com/courses/ai-cybersecurity",
            details: [
                "Understand how AI is used in cyber attacks.",
                "Build AI-powered security monitoring tools.",
                "Explore the ethics of AI in security.",
            ],
        },
        {
            id: "cyber-ceo",
            title: "Cyber CEO",
            description:
                "Equip yourself with the strategic knowledge to lead your organization through complex cyber challenges and manage digital risk effectively.",
            image: ceo,
            price: "Free",
            link: "https://example.com/courses/cyber-ceo",
            details: [
                "Develop a robust cybersecurity strategy.",
                "Learn about governance, risk, and compliance (GRC).",
                "Manage cybersecurity budgets and investments.",
            ],
        },
    ];
    useEffect(() => {
        if (window.location.hash) {
            const element = document.querySelector(window.location.hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    return (
        <>
            <Navbar />
            <section className="relative text-center py-28 px-4 pt-40 overflow-hidden backdrop-blur-3xl bg-black text-white">
                {/* Background Video */}
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
                    <source src={Vid1} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Optional Dark Overlay */}
                {/* Floating Icons - Hidden on Mobile */}
                <div className="absolute left-[10%] top-16 animate-float-slow z-10 hidden sm:block">
                    <img
                        src={computerGif}
                        alt="Computer Icon"
                        className="w-10 sm:w-12 h-10 sm:h-12 opacity-60 rounded-lg animate-rotate-slow"
                    />
                </div>
                <div className="absolute left-[80%] bottom-16 animate-float-medium z-10 hidden sm:block">
                    <img
                        src={exchangeGif}
                        alt="Data Exchange Icon"
                        className="w-10 sm:w-12 h-10 sm:h-12 opacity-60 rounded-lg animate-antirotate-slow"
                    />
                </div>
                <div className="absolute right-[15%] top-20 animate-float-medium z-10 hidden sm:block">
                    <img
                        src={palmGif}
                        alt="Palm Icon"
                        className="w-10 sm:w-12 h-10 sm:h-12 opacity-60 rounded-lg animate-rotate-slow"
                    />
                </div>
                <div className="absolute right-[80%] bottom-14 animate-float-slow z-10 hidden sm:block">
                    <img
                        src={malwareGif}
                        alt="Malware Icon"
                        className="w-10 sm:w-12 h-10 sm:h-12 opacity-60 rounded-lg animate-antirotate-slow"
                    />
                </div>
                <div className="absolute left-1/2 top-20 transform -translate-x-1/2 animate-pulse-slow z-10 hidden sm:block">
                    <img
                        src={dataGif}
                        alt="Data Icon"
                        className="w-10 sm:w-12 h-10 sm:h-12 opacity-60 rounded-lg animate-antirotate-slow"
                    />
                </div>
                {/* Optional Gradient Glow on top of the video */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-blue-100/10 to-indigo-200/10 opacity-30 blur-3xl pointer-events-none z-0"></div>

                {/* Main Content */}
                <div className="relative z-20 max-w-3xl mx-auto text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
                        Master the Art of <span className="text-orange-600">Cyber Defense</span>
                    </h1>
                    <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                        Our cutting-edge courses are your gateway to the world of cybersecurity. Learn to <span className="font-medium text-orange-600">protect</span> systems, <span className="font-medium text-orange-600">detect</span> vulnerabilities, and <span className="font-medium text-orange-600">respond</span> to modern cyber threats.
                    </p>
                    <a
                        href="https://krafocapacitybuilder.learnworlds.com/pages/home?preview=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-orange-600/40"
                    >
                        Explore All Courses
                    </a>
                </div>
            </section>
            {/* About Section For Courses */}
            <section className="bg-black text-white py-16">
                <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Images */}
                    <div className="relative">
                        {/* Main Image */}
                        <img
                            src={studyGroup}
                            alt="Students learning"
                            className="rounded-lg shadow-lg"
                        />

                        {/* Small Image */}
                        <img
                            src={vr}
                            alt="Students studying"
                            className="absolute bottom-[-40px] right-[-40px] w-48 h-auto rounded-lg shadow-lg border-4 border-black"
                        />

                        {/* Experience Badge */}
                        <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 bg-black rounded-full shadow-lg p-4 w-27 h-27 flex flex-col items-center justify-center text-center border-4 border-[#FB8C00]">
                            <span className="text-xs font-bold text-[#FB8C00]">EXPERIENCE</span>
                            <span className="text-lg font-bold text-[#FB8C00]">24+</span>
                            <span className="text-xs font-bold text-[#FB8C00]">YEARS</span>
                        </div>
                    </div>

                    {/* Right: Text */}
                    <div>
                        <p className="text-sm font-semibold text-[#FB8C00] mb-2 flex items-center gap-2">
                            <span className="w-4 h-4 border border-[#FB8C00] rounded-full flex items-center justify-center">i</span>
                            GET TO KNOW All COURSES
                        </p>

                        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-snug mb-4">
                            Dive into our <span className="text-orange-600">Online Courses</span> <br /> and Ignite Your Learning!
                        </h2>

                        <p className="text-gray-400 mb-6">
                            Our courses are designed for real-world impact. We provide hands-on training in crucial areas like network security, ethical hacking, and threat analysis, equipping you with the practical skills to solve complex cybersecurity challenges and advance your career.
                        </p>

                        {/* Checklist */}
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[#FB8C00] mt-1">⦿</span>
                                Master both foundational concepts and advanced, real-world techniques.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#FB8C00] mt-1">⦿</span>
                                Learn to protect your mind
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#FB8C00] mt-1">⦿</span>
                                Learn the high-impact skills that top companies want
                            </li>
                        </ul>

                        {/* CTA Button */}
                        <a
                            href="https://krafocapacitybuilder.learnworlds.com/pages/home?preview=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-7 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-orange-600/40"
                        >
                            All COURSES →
                        </a>
                    </div>
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-black via-[#000000] to-[#1d0b00] text-white overflow-hidden">
                {/* Animated Particle Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(242,96,11,0.15),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.1),transparent_60%)] animate-pulse"></div>
                </div>

                {/* Section Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Explore Our <span className="bg-gradient-to-r from-[#F2600B] to-orange-300 bg-clip-text text-transparent">Featured Courses</span>
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                        Learn practical, high-demand skills in Cybersecurity, Digital Literacy, and more.
                    </p>
                </div>

                {/* Card Grid */}
                {/* Enhanced Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {courses.map((course, idx) => (<motion.div key={idx}  id= {course.id} layout
                        className={`relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer h-full ${expandedIndex === idx ? "lg:col-span-2" : ""
                            }`} transition={{ duration: 0.4, ease: "easeInOut" }} whileHover={expandedIndex !== idx ? { y: -5, boxShadow: "0 20px 25px -5px rgba(242, 96, 11, 0.1), 0 10px 10px -5px rgba(242, 96, 11, 0.04)" } : {}} >
                        <div className="h-full flex flex-col lg:flex-row">
                            {/* Main Card Content */}
                            <div className={`flex-grow ${expandedIndex === idx ? "lg:w-1/2" : ""}`} onClick={() => expandedIndex !== idx && setExpandedIndex(idx)} >
                                {/* Enhanced Image Container */}
                                <div className="relative overflow-hidden">
                                    <motion.img layout="position" src={course.image} alt={course.title}
                                        className="h-52 w-full object-cover" whileHover={{ scale: expandedIndex !== idx ? 1.05 : 1 }} transition={{ duration: 0.3 }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold bg-[#F2600B] text-black rounded-full">
                                        {course.price}
                                    </span>
                                </div>
                                {/* Content Area */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex-grow">
                                        <motion.h3
                                            layout="position"
                                            className="text-xl font-bold group-hover:text-[#F2600B]"
                                        >
                                            {course.title}
                                        </motion.h3>

                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={expandedIndex === idx ? 'expanded' : 'collapsed'}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-gray-400 text-sm mt-2"
                                            >
                                                {course.description}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>

                                    {/* Action Area */}
                                    <div className="mt-4">
                                        <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-[#F2600B] to-orange-300 animate-indeterminate-progress"></div>
                                        </div>

                                        <motion.button
                                            layout="position"
                                            className="mt-4 w-full py-2.5 text-sm bg-gradient-to-r from-black/30 to-black/60 hover:from-black/40 hover:to-black/70 rounded-lg transition-all font-medium flex items-center justify-center group border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setExpandedIndex(expandedIndex === idx ? -1 : idx);
                                            }}
                                            whileHover={{
                                                boxShadow: "0 0 20px rgba(242, 96, 11, 0.4)",
                                                borderColor: "rgba(242, 96, 11, 0.3)"
                                            }}
                                        >
                                            {expandedIndex === idx ? (
                                                <span className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#F2600B] group-hover:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="bg-gradient-to-r from-[#F2600B] to-orange-300 bg-clip-text text-transparent font-semibold">
                                                        Show Less
                                                    </span>
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#F2600B] group-hover:translate-y-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="bg-gradient-to-r from-[#F2600B] to-orange-300 bg-clip-text text-transparent font-semibold">
                                                        More Info
                                                    </span>
                                                </span>
                                            )}
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Glow Hover Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F2600B]/30 via-transparent to-transparent pointer-events-none"></div>
                            </div>

                            {/* Premium Details Panel */}
                            <AnimatePresence>
                                {expandedIndex === idx && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: -20,
                                            transition: { duration: 0.3, ease: "easeIn" }
                                        }}
                                        className="lg:w-1/2 p-6 bg-gradient-to-br from-[#1a0a00] to-[#0d0400] border-l border-[#F2600B]/30 relative"
                                    >
                                        {/* Close Button */}
                                        <button
                                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-black/30 rounded-full p-1.5 z-10"
                                            onClick={() => setExpandedIndex(-1)}
                                            aria-label="Close details"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>

                                        {/* Panel Content */}
                                        <div className="h-full flex flex-col">
                                            <div>
                                                <h4 className="text-lg font-semibold mb-4 text-[#F2600B]">Course Breakdown</h4>

                                                {/* Metadata Card */}
                                                <div className="mb-5 p-4 bg-black/20 rounded-xl border border-white/10 backdrop-blur-sm">
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="flex items-center text-sm">
                                                            <div className="flex-shrink-0 w-8 h-8 rounded-md bg-[#F2600B]/10 flex items-center justify-center mr-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F2600B]" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <div className="text-gray-400 text-xs">Duration</div>
                                                                <div className="text-gray-300">16 weeks</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center text-sm">
                                                            <div className="flex-shrink-0 w-8 h-8 rounded-md bg-[#F2600B]/10 flex items-center justify-center mr-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F2600B]" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <div className="text-gray-400 text-xs">Format</div>
                                                                <div className="text-gray-300">Hybrid</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center text-sm">
                                                            <div className="flex-shrink-0 w-8 h-8 rounded-md bg-[#F2600B]/10 flex items-center justify-center mr-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F2600B]" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <div className="text-gray-400 text-xs">Tuition per Head</div>
                                                                <div className="text-gray-300">{course.price}</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center text-sm">
                                                            <div className="flex-shrink-0 w-8 h-8 rounded-md bg-[#F2600B]/10 flex items-center justify-center mr-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F2600B]" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <div className="text-gray-400 text-xs">Support</div>
                                                                <div className="text-gray-300">24/7 Mentors</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Curriculum Section */}
                                            <div className="flex-grow mb-5">
                                                <h5 className="font-medium mb-3 text-[#F2600B]/90"> Highlights:</h5>
                                                <ul className="space-y-3">
                                                    {course.details.map((detail, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: 10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="flex items-start p-3 bg-black/20 rounded-lg border border-white/5 hover:border-[#F2600B]/30 transition-colors"
                                                        >
                                                            <span className="text-[#F2600B] mr-2 mt-1.5 text-lg">•</span>
                                                            <span className="text-gray-300 text-sm">{detail}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* CTA Section */}
                                            <div className="mt-auto">
                                                <a
                                                    href={course.link}
                                                    className="block text-center py-3 bg-gradient-to-r from-[#F2600B] to-orange-500 text-black font-bold rounded-lg hover:from-orange-500 hover:to-[#F2600B] transition-all shadow-lg hover:shadow-orange-500/40 relative overflow-hidden group"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <span className="relative z-10">Enroll Now - Limited Seats!</span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-[#F2600B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    <div className="absolute top-0 left-0 w-full h-0.5 bg-white/30"></div>
                                                </a>
                                                {/* <p className="text-center text-gray-400 text-xs mt-2">
                                                        Registration closes 
                                                        August 26, 2025
                                                    </p> */}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Expert Badge - Only shows when expanded */}
                        {expandedIndex === idx && (
                            <div className="absolute top-4 right-4 bg-[#F2600B] text-black text-xs font-bold px-2 py-1 rounded-full z-10">
                                EXPERT LEVEL
                            </div>
                        )}
                    </motion.div>
                    ))}
                </div></section>

            {/* Video Section */}
            <section className="relative bg-[#000000] text-white py-28 px-4 sm:px-6 overflow-hidden">
                {/* Cyber Grid Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(31,41,55,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMzNzQxNTAiIHN0cm9rZS13aWR0aD0iMC41Ij48cGF0aCBkPSJNIDAgMCBMIDYwIDAgNjAgNjAgMCA2MCBaIi8+PGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iNjAiIHkyPSI2MCIvPjxsaW5lIHgxPSI2MCIgeTE9IjAiIHgyPSIwIiB5Mj0iNjAiLz48L2c+PC9zdmc+')] opacity-20"></div>
                </div>

                {/* Animated Binary Rain */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-0 text-green-400/10 font-mono text-xl"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animation: `fall ${15 + Math.random() * 20}s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                                textShadow: '0 0 5px rgba(74, 222, 128, 0.5)'
                            }}
                        >
                            {[...Array(30)].map((_, j) => (
                                Math.floor(Math.random() * 2)
                            )).join('')}
                        </div>
                    ))}
                </div>

                {/* Content Wrapper */}
                <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Text + Interactive Elements */}
                    <motion.div
                        className="relative space-y-8 z-10"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        {/* Floating Icons with enhanced animations */}
                        <div className="absolute left-[-30px] top-[-40px] animate-float-slow">
                            <motion.img
                                src={palmGif}
                                alt="Hacker fingerprint"
                                className="w-16 h-16 rounded-xl shadow-lg"
                                whileHover={{
                                    scale: 1.1,
                                    rotate: [0, 5, -5, 0],
                                    transition: { duration: 0.5 }
                                }}
                            />
                        </div>
                        <div className="absolute right-[-30px] bottom-[-40px] animate-float-slower">
                            <motion.img
                                src={dataGif}
                                alt="Data streams"
                                className="w-16 h-16 rounded-xl shadow-lg"
                                whileHover={{
                                    scale: 1.1,
                                    rotate: [0, -5, 5, 0],
                                    transition: { duration: 0.5 }
                                }}
                            />
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">
                            <span className="text-white block">Beyond the Code:</span>
                            Master the Hacker Mindset
                        </h2>

                        <p className="text-lg text-gray-300 max-w-md border-l-4 border-orange-500 pl-4 py-2 bg-black/20 backdrop-blur-sm rounded-r-lg">
                            This is where strategy meets skill. Our curriculum is built on a 'mind-first' approach, teaching you to analyze threats, understand attacker motivations, and build a proactive security posture.
                        </p>

                        {/* Interactive Cyber Terminal Button */}
                        <motion.a
                            href="https://krafocapacitybuilder.learnworlds.com/pages/home?preview=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-gradient-to-r from-black via-[#0d0d0d] to-black rounded-lg shadow-lg group border border-orange-500/30 relative overflow-hidden"
                            whileHover={{
                                y: -5,
                                boxShadow: "0 10px 25px -5px rgba(242, 96, 11, 0.5)"
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10 font-bold text-lg">
                                Explore Our Courses
                            </span>
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(242,96,11,0.1)_100%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-transparent group-hover:via-orange-400"></div>
                        </motion.a>


                    </motion.div>

                    {/* Right Side - Cyber Enhanced Video Showcase */}
                    <motion.div
                        className="relative group"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {/* HUD-style Frame */}
                        <div className="absolute -inset-2 border border-orange-500/30 rounded-2xl pointer-events-none"></div>
                        <div className="absolute -inset-4 border border-orange-500/10 rounded-2xl pointer-events-none"></div>

                        {/* Corner elements */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500 rounded-tl-lg"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500 rounded-tr-lg"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500 rounded-bl-lg"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500 rounded-br-lg"></div>

                        {/* Video Container */}
                        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-orange-500/20 transform translate-z-0">


                            <iframe
                                className="w-full h-72 md:h-[28rem] rounded-xl"
                                src="https://www.youtube.com/embed/3Ed79CH1J2E?enablejsapi=1"
                                title="YouTube video"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>


                        </div>


                    </motion.div>
                </div>

                {/* CSS for animations */}
                <style jsx>{`
    @keyframes fall {
      to { transform: translateY(100vh); }
    }
    .typing-demo {
      width: 34ch;
      animation: typing 5s steps(34) infinite, blink 0.5s step-end infinite alternate;
      white-space: nowrap;
      overflow: hidden;
      border-right: 3px solid;
    }
    @keyframes typing {
      0% { width: 0; }
      50% { width: 34ch; }
      90% { width: 34ch; }
      100% { width: 0; }
    }
    @keyframes blink {
      50% { border-color: transparent; }
    }
  `}</style>
            </section>


            {/* Tactical Advantage */}
            <section className="bg-[#000000] py-28 px-4 sm:px-6 relative overflow-hidden">
                {/* Cyber Defense Grid Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,96,11,0.03)_0%,transparent_70%)]"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMzNzQxNTAiIHN0cm9rZS13aWR0aD0iMC41Ij48cGF0aCBkPSJNIDAgMCBMIDEwMCAwIDEwMCAxMDAgMCAxMDAgWiIvPjxwYXRoIGQ9Ik0gMjAgMjAgTCA4MCAyMCA4MCA4MCAyMCA4MCIvPjxwYXRoIGQ9Ik0gNDAgNDAgTCA2MCA0MCA2MCA2MCA0MCA2MCIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
                </div>

                {/* Animated Radar Scan */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] -z-10">
                    <div className="absolute inset-0 border border-orange-500/10 rounded-full animate-ping-slow"></div>
                    <div className="absolute inset-[10%] border border-orange-500/15 rounded-full animate-ping-slower"></div>
                    <div className="absolute inset-[20%] border border-orange-500/20 rounded-full animate-ping-slowest"></div>
                    <div className="absolute top-1/2 left-1/2 w-0 h-0 border-t-[20px] border-t-orange-500 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent transform rotate-0 animate-radar-scan origin-left"></div>
                </div>

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center max-w-4xl mx-auto relative"
                >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#F2600B] to-transparent"></div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white leading-snug">
                        Tactical Advantage: Why <span className="text-[#F2600B]">KRAFO SYSTEMS</span> Dominates Cyber Defense
                    </h2>
                    <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
                        <span className="text-[#F2600B] font-medium">Decades of frontline experience</span> securing America's most sensitive networks against nation-state threats
                    </p>
                </motion.header>

                {/* Cyber Defense Grid */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {checklistItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="relative"
                        >
                            {/* Holographic Card */}
                            <div className="bg-gradient-to-br from-[#0a0a0a] to-[#111] rounded-xl p-6 border border-white/10 shadow-xl h-full overflow-hidden">
                                {/* Glowing Corner */}
                                <div className="absolute top-0 right-0 w-16 h-16">
                                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#F2600B] rounded-bl-full opacity-20"></div>
                                </div>

                                {/* Cyber Icon */}
                                <div className="mb-5 p-3 bg-[#F2600B]/10 rounded-lg inline-block border border-[#F2600B]/30">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8 text-[#F2600B]"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        {idx === 0 && (
                                            <>
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                                <path d="M12 8v4"></path>
                                                <path d="M12 16h.01"></path>
                                            </>
                                        )}
                                        {idx === 1 && (
                                            <>
                                                <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
                                                <path d="M9 12h6"></path>
                                            </>
                                        )}
                                        {idx === 2 && (
                                            <>
                                                <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z"></path>
                                                <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z"></path>
                                                <path d="m18.5 8.5L22 12l-3.5 3.5L15 12l3.5-3.5Z"></path>
                                                <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z"></path>
                                            </>
                                        )}
                                        {idx === 3 && (
                                            <>
                                                <path d="M12 3v18"></path>
                                                <path d="M2 12h20"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                                <path d="m5 5 14 14"></path>
                                            </>
                                        )}
                                    </svg>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                                    {item.split(":")[0]}
                                </h3>
                                <p className="text-gray-300">{item.split(":")[1] || item}</p>

                                {/* Status Bar */}
                                <div className="mt-6 flex items-center">
                                    <div className="flex items-center text-sm text-[#F2600B] mr-4">
                                        <div className="w-2 h-2 rounded-full bg-[#00ff66] mr-2 animate-pulse"></div>
                                        SECURE
                                    </div>
                                    <div className="h-1 flex-grow bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#F2600B] to-orange-500"
                                            style={{ width: `${90 + idx * 3}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Holographic Effect */}
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,96,11,0.05)_0%,transparent_70%)] rounded-xl pointer-events-none -z-10"></div>
                        </motion.div>
                    ))}
                </div>

                {/* Military Badge */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center bg-black/40 px-6 py-3 rounded-full border border-[#F2600B]/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#F2600B]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300">Experts that have Experience with U.S. Department of Defense</span>
                    </div>
                </div>

                {/* Animation Styles */}
                <style jsx>{`
    @keyframes ping-slow {
      0% { transform: scale(1); opacity: 1; }
      75%, 100% { transform: scale(1.5); opacity: 0; }
    }
    .animate-ping-slow {
      animation: ping-slow 4s cubic-bezier(0,0,0.2,1) infinite;
    }
    .animate-ping-slower {
      animation: ping-slow 5s cubic-bezier(0,0,0.2,1) infinite;
      animation-delay: 0.5s;
    }
    .animate-ping-slowest {
      animation: ping-slow 6s cubic-bezier(0,0,0.2,1) infinite;
      animation-delay: 1s;
    }
    @keyframes radar-scan {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .animate-radar-scan {
      animation: radar-scan 6s linear infinite;
    }
  `}</style>
            </section>

            <style>{`
                @keyframes indeterminate-progress {
                    from {
                        transform: translateX(-100%);
                    }
                    to {
                        transform: translateX(200%);
                    }
                }
                .animate-indeterminate-progress {
                    animation: indeterminate-progress 2.5s linear infinite;
                }
            `}</style>

            <Footer />
        </>
    );
}
