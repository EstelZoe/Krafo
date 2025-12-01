import React, { useState, useEffect } from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import ProgramCard from "../assets/components/ProgramCard";
import ImpactStat from "../assets/components/ImpactStat";
import HeroImage from "../assets/images/cyberyouthed2.png";
import { School, Laptop, Users, GraduationCap, Shield, BriefcaseBusiness, BookOpenCheck, Globe2 } from "lucide-react";
import ProgramOptionCard from "../assets/components/ProgramOptionCard";
import OutreachImpact from "../assets/components/OutreachImpact";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import ceo from "../assets/images/ceo.png";
import ai from "../assets/images/AI&Cyber.png"
import ccbc from "../assets/images/ccbc.png"
import data1 from "../assets/images/data1.jpg";
import data2 from "../assets/images/data2.jpg";
import data3 from "../assets/images/data3.jpg";
import data4 from "../assets/images/data4.jpg";
import studyGroup from "../assets/images/studygroup2.jpg"
import image2 from "../assets/images/ccbc.png";
import image3 from "../assets/images/ceo.png";
import Video from "../assets/videos/backgroundcybered.mp4";
import cybered from "../assets/images/cyberbyte.png";
import img3 from "../assets/images/IMG-3.jpg";
import img4 from "../assets/images/IMG-7.jpg";
import img5 from "../assets/images/IMG-10.jpg";
import img6 from "../assets/images/IMG-15.jpg";
import img7 from "../assets/images/IMG-17.jpg";
import img8 from "../assets/images/IMG-19.jpg";
import img9 from "../assets/images/IMG-34.jpg";
import img10 from "../assets/images/IMG-35.jpg";
import img11 from "../assets/images/IMG-56.jpg";
import img12 from "../assets/images/IMG-61.jpg";
import img13 from "../assets/images/IMG-63.jpg";

import whatsappIcon from "../assets/images/whatsapp.png";
import tiktokIcon from "../assets/images/tik-tok.png";
import youtubeIcon from "../assets/images/youtube.png";
import instagramIcon from "../assets/images/instagram.png";
import mobileTransferIcon from "../assets/images/mobile-transfer.png";

export default function YouthCyberEducation() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const images = [
        img13, img4, img5, img7, img9, img11, img8,
    ];

    const programs = [
        {
            icon: School,
            title: "Cyber Clubs in Schools",
            description: "Creating engaging cyber clubs to foster interest in cybersecurity among students.",
        },
        {
            icon: Laptop,
            title: "Workshops & Seminars",
            description: "Hands-on sessions on cyber hygiene, safety, and ethical online behavior.",
        },
        {
            icon: Users,
            title: "Mentorship Program",
            description: "Connecting students with cybersecurity professionals for guidance and support.",
        },
    ];

    const impactStats = [
        { value: "5,000+", label: "Students Trained Goal" },
        { value: "45+", label: "Schools Goal" },
        { value: "50+", label: "Volunteers & Mentors Goal" },
    ];



    const slides = [
        {
            id: 1,
            bg: "bg-gradient-to-r from-[#f2600b]/20 via-[#f2600b]/10 to-black",
            title: "Empowering Africa's Digital Generation",
            highlight: "Youth Cyber Literacy",
            description: "Building cybersecurity skills for the next generation of African leaders.",
            cta: "Explore Programs",
            image: img13
        },
        {
            id: 2,
            bg: "bg-gradient-to-r from-[#ff8c42]/20 via-[#ff8c42]/10 to-black",
            title: "Empowering Africa's Digital Generation",
            highlight: "Youth Cyber Literacy",
            description: "Practical cybersecurity training tailored for African youth.",
            cta: "Explore Programs",
            image: cybered
        },
        {
            id: 3,
            bg: "bg-gradient-to-r from-[#ffb142]/20 via-[#ffb142]/10 to-black",
            title: "Empowering Africa's Digital Generation",
            highlight: "Hands-on Learning",
            description: "Building cybersecurity skills for the next generation of African leaders.",
            cta: "Explore Programs",
            image: ai
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % images.length);
        }, 5000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    return (
        <div className="bg-white text-black">
            <Navbar />


            {/* Hero Section */}
            <section className="relative bg-black text-white pt-10 overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute inset-0 -z-10">
                    <div
                        className={`absolute inset-0 transition-all duration-5000 ${slides[currentSlide].bg}`}
                    />

                    {/* Floating Tech Elements */}
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, Math.random() * 40 - 20],
                                x: [0, Math.random() * 40 - 20],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                                duration: 5 + Math.random() * 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="text-orange-500">
                                {i % 3 === 0 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                ) : i % 3 === 1 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row h-auto md:h-[34rem] max-w-7xl mx-auto">
                    {/* Text Side */}
                    <div className="md:w-1/2 flex items-center justify-center p-8 z-10">
                        <div className="text-center md:text-left">
                            <motion.h1
                                className="text-3xl md:text-5xl font-bold mb-4"
                                key={currentSlide}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                {slides[currentSlide].title}
                                <span className="block bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                                    {slides[currentSlide].highlight}
                                </span>
                            </motion.h1>

                            <motion.p
                                className="max-w-md text-lg text-orange-300 mb-6"
                                key={`desc-${currentSlide}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                {slides[currentSlide].description}
                            </motion.p>

                            <motion.div
                                className="flex justify-center md:justify-start space-x-4 pointer-cursor"
                                key={`buttons-${currentSlide}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <a href="https://krafocapacitybuilder.learnworlds.com/home?preview=true" target="_blank" rel="noopener noreferrer">
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition flex items-center">
                                        {slides[currentSlide].cta}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </a>
                                {/* <button className="bg-transparent border-2 border-orange-500 text-orange-500 font-semibold px-6 py-2 rounded-lg hover:bg-orange-500/10 transition">
                                    Request Demo
                                </button> */}
                            </motion.div>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="md:w-1/2 h-64 md:h-full relative flex items-center justify-center p-4">
                        {/* Animated Circles */}
                        <motion.div
                            className="absolute top-1/4 left-1/2 w-64 h-64 rounded-full border-2 border-orange-500/30"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute top-1/3 left-1/3 w-48 h-48 rounded-full border-2 border-yellow-400/30"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        <motion.img
                            key={`hero-img-${currentSlide}`}
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            className="relative z-10 w-full max-w-sm object-contain drop-shadow-xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />

                        {/* Carousel Indicators */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-orange-500' : 'bg-gray-600'}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Animated Scroll Indicator */}
                <motion.div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <span className="text-sm text-orange-400 mb-1">Scroll to explore</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </section>

            <section id="programs" className="relative py-24 px-6 pt-0 bg-black text-white overflow-hidden z-10">

                {/* Decorative Particles / Starfield */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(#F2600B33_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>

                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-5xl md:text-4xl font-bold pt-10 pb-5 bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text p-1">
                        Our Programs Overview
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-5">
                        Our comprehensive cybersecurity education program is designed to build a strong foundation for the next generation of digital citizens..
                    </p>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[ // Service cards
                            {
                                title: "Cyber Clubs in Schools",
                                desc: "Creating engaging cyber clubs to foster interest in cybersecurity among students.",
                                img: img10,
                            },
                            {
                                title: "Workshops & Seminars",
                                desc: "IHands-on sessions on cyber hygiene, safety, and ethical online behavior.",
                                img: img12,
                            },
                            {
                                title: "Mentorship Program",
                                desc: "Empower the next generation with cybersecurity knowledge to secure Africa's digital future. ",
                                img: img3,
                            },

                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="group relative rounded-xl border border-[#F2600B33] bg-gradient-to-br from-[#1a1a1a] to-[#000000] backdrop-blur-md shadow-xl hover:shadow-orange-600/30 hover:scale-[1.02] transition-transform duration-300 overflow-hidden"
                            >
                                {/* Image */}
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={service.img}
                                        alt={service.title}
                                        className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Glass reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 pointer-events-none"></div>
                                </div>

                                {/* Text */}
                                <div className="p-6 relative">
                                    <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-[#F2600B] transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {service.desc}
                                    </p>

                                    {/* Subtle glow bar */}
                                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#F2600B] group-hover:w-full transition-all duration-500"></span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Outreach Impact Section */}
            <section id="outreach" className="py-16 bg-black">
                <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-5xl font-bold text-orange-500 mb-2 flex items-center gap-2">
                        <Globe2 className="w-10 h-10 pt-3" />
                        OUR OUTREACH GOAL
                    </p>
                </div>
                <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >

                        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-snug mb-4">
                            A Cyber-Smart Generation for <span className="text-orange-600">a Secure Africa</span>
                        </h2>

                        <p className="text-gray-400 mb-6">
                            Our mission is to equip every young African with the knowledge to navigate the digital world safely. We aim to build a strong, resilient digital future for the continent, one student at a time.
                        </p>

                        <ul className="space-y-3 mb-6">
                            <motion.li
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                            >
                                <span className="text-orange-500 mt-1">⦿</span>
                                <div>
                                    <span className="text-white font-medium">Expand School Partnerships:</span>
                                    <span className="text-gray-400"> Establish cyber clubs in hundreds of schools across the continent.</span>
                                </div>
                            </motion.li>
                            <motion.li
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <span className="text-orange-500 mt-1">⦿</span>
                                <div>
                                    <span className="text-white font-medium">Empower More Students:</span>
                                    <span className="text-gray-400"> Reach and train thousands more young people in critical cybersecurity skills.</span>
                                </div>
                            </motion.li>
                            <motion.li
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <span className="text-orange-500 mt-1">⦿</span>
                                <div>
                                    <span className="text-white font-medium">Grow Our Community:</span>
                                    <span className="text-gray-400"> Recruit and support a vibrant network of volunteers and mentors.</span>
                                </div>
                            </motion.li>
                        </ul>

                        <motion.a
                            href="https://calendly.com/krafosystems"
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-orange-600/40 inline-flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Partner With Us
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </motion.a>
                    </motion.div>

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div
                            className="relative rounded-xl overflow-hidden shadow-2xl border border-orange-500/20 scale-105 animate-zoom"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className="bg-gradient-to-br from-gray-900 to-black w-full h-96">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentImageIndex}
                                        className="absolute inset-0 w-full h-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <img
                                            src={images[currentImageIndex]}
                                            alt={`Slide ${currentImageIndex}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Progress bar */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-1 bg-gray-800 z-10"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 5, ease: "linear" }}
                                    key={currentImageIndex}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            </div>
                        </div>
                    </motion.div>


                </div>

                {/* Stat Card */}
                <div className="py-16 pt-5 px-6 md:px-20 bg-black">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
                        {impactStats.map((stat, idx) => (
                            <ImpactStat key={idx} {...stat} />
                        ))}
                    </div>
                </div>
            </section >

            {/* Parent Safety Section */}
            <section id="parent-safety" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-[#0b0602] to-[#1a0a00]">
                {/* Cyber Background Elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2600B]/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F2600B]/10 rounded-full blur-2xl"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(#F2600B22_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F2600B]/10 border border-[#F2600B]/30 mb-4"
                        >
                            <svg className="w-4 h-4 text-[#F2600B]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-semibold text-[#F2600B] uppercase tracking-wider">Parent Safety Guide</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
                        >
                            Protect Your Child <span className="text-[#F2600B]">Online</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto"
                        >
                            Quick actions and clear steps to secure your child's digital world — no tech expertise needed.
                        </motion.p>
                    </div>

                    {/* 5 Critical Actions - Premium Cards */}
                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-8 justify-center">
                            <div className="w-8 h-8 bg-[#F2600B] rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white">5 Critical Actions <span className="text-[#F2600B]">(Do These Today)</span></h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
    {[
        {
            number: "1",
            title: "Make Accounts Private",
            items: ["Instagram, TikTok, WhatsApp", "Settings → Privacy → Private", "5 minutes"],
            icon: "shield"
        },
        {
            number: "2",
            title: "Set Up Parent Controls",
            items: ["Instagram Supervision", "TikTok Family Pairing", "10 minutes"],
            icon: "settings"
        },
        {
            number: "3",
            title: "Enable 2‑Factor Auth",
            items: ["All social + Mobile Money", "Extra security layer", "5 minutes"],
            icon: "lock"
        },
        {
            number: "4",
            title: "Review Followers",
            items: ["Delete strangers", "Check who they follow", "5 minutes"],
            icon: "users"
        },
        {
            number: "5",
            title: "Create Phone Rules",
            items: ["No phones at dinner", "Charge outside bedroom", "5 minutes"],
            icon: "phone"
        },
    ].map((card, i) => (
        <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative rounded-2xl bg-gradient-to-br from-[#1A1A1A]/60 to-[#0A0A0A] border border-[#F2600B]/20 p-6 backdrop-blur-sm hover:border-[#F2600B]/40 hover:shadow-[0_0_30px_rgba(242,96,11,0.2)] transition-all duration-300"
        >
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#F2600B] rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg">
                {card.number}
            </div>

            <div className="mb-4 p-3 bg-[#F2600B]/10 rounded-lg inline-flex">
                <svg className="w-6 h-6 text-[#F2600B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Shield icon - Correct */}
                    {card.icon === "shield" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                    
                    {/* Settings (Cog) icon - Fixed */}
                    {card.icon === "settings" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />}
                    
                    {/* Lock icon - Correct */}
                    {card.icon === "lock" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />}
                    
                    {/* Users (User Group) icon - Fixed */}
                    {card.icon === "users" && (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2 M7 10a4 4 0 118 0 4 4 0 01-8 0z M23 20v-2a4 4 0 00-3-3.87M17 10a4 4 0 110-8 4 4 0 010 8z"/>
)}

                    
                    {/* Phone icon - Correct */}
                    {card.icon === "phone" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                </svg>
            </div>

            <h4 className="text-lg font-bold text-white mb-3 group-hover:text-[#F2600B] transition-colors">{card.title}</h4>

            <ul className="space-y-2">
                {card.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-[#F2600B] rounded-full flex-shrink-0"></div>
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    ))}
</div>
                    </div>

                    {/* Warning Signs & Top Threats Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-20">
                        {/* Warning Signs */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white">Warning Signs <span className="text-red-400">— Act Immediately</span></h3>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    "Suddenly secretive about phone",
                                    "Switches screens when you approach",
                                    "Has expensive items unexplained",
                                    "Talks about 'online friends'",
                                    "Withdrawn or depressed",
                                    "Anxious about phone constantly",
                                    "Grades dropping suddenly",
                                    "Multiple hidden accounts",
                                ].map((warning, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.05 }}
                                        className="flex items-center gap-4 p-4 bg-red-500/10 border-l-4 border-red-500 rounded-lg hover:bg-red-500/15 transition-colors"
                                    >
                                        <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                        <span className="text-gray-200">{warning}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                                <p className="text-center text-red-400 font-semibold">
                                    <img src={new URL('../assets/images/alarm.png', import.meta.url).href} alt="Warning" className="inline-block h-4 w-4 align-[-0.15rem] mx-1" /> If you see 3+ red flags: Have a calm conversation TODAY
                                </p>
                            </div>
                        </motion.div>

                        {/* Top 5 Threats */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white">Top 5 Threats <span className="text-orange-400">to African Youth</span></h3>
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Predators / Grooming",
                                        description: "Pretend to be teens, build 'friendship', request intimate photos, threaten blackmail",
                                        action: "Screenshot everything, report to police immediately"
                                    },
                                    {
                                        title: "Sextortion",
                                        description: "Convince child to send intimate photos, then threaten to share unless they pay",
                                        action: "Teach: 'Once you send a photo, you lose control forever'"
                                    },
                                    {
                                        title: "Mobile Money Scams",
                                        description: "'Wrong transfer' scam, SIM swap, fake free data offers",
                                        action: "Register in YOUR name, set daily limits ₵500-1,000"
                                    },
                                    {
                                        title: "Cyberbullying",
                                        description: "Mean comments, threats, rumors, exclusion from groups",
                                        action: "Screenshot, block, report to platform + school + police if severe"
                                    },
                                    {
                                        title: "Inappropriate Content",
                                        description: "Violence, sexual content, dangerous challenges and trends",
                                        action: "Enable Restricted Mode, weekly check-ins on what they watch"
                                    }
                                ].map((threat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/30 transition-all group"
                                    >
                                        <h4 className="font-bold text-orange-400 mb-2 group-hover:text-orange-300 transition-colors">
                                            {i + 1}. {threat.title}
                                        </h4>
                                        <div className="space-y-2 text-sm text-gray-300">
                                            <p><strong className="text-white">What happens:</strong> {threat.description}</p>
                                            <p><strong className="text-white">Action:</strong> {threat.action}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Platform Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-20"
                    >
                        <div className="flex items-center gap-3 mb-8 justify-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white">Platform <span className="text-blue-400">Quick Actions</span></h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {[
                                {
                                    img: instagramIcon,
                                    name: "Instagram",
                                    actions: ["Settings → Privacy → Private", "Set up Supervision", "Set time limits", "Remove location from bio"]
                                },
                                {
                                    img: tiktokIcon,
                                    name: "TikTok",
                                    actions: ["Private Account", "Family Pairing", "Restricted Mode", "Delete uniform/address videos"]
                                },
                                {
                                    img: whatsappIcon,
                                    name: "WhatsApp",
                                    actions: ["Profile Photo → Contacts", "Last Seen → Contacts", "Groups → Contacts", "Two-Step Verification"]
                                },
                                {
                                    img: youtubeIcon,
                                    name: "YouTube",
                                    actions: ["Restricted Mode ON", "Use YouTube Kids", "Check watch history", "Review subscriptions"]
                                },
                                {
                                    img: mobileTransferIcon,
                                    name: "Mobile Money",
                                    actions: ["Register in your name", "SMS alerts for all", "Daily limit ₵500-1,000", "Never share OTP codes"]
                                }
                            ].map((platform, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-400/40 transition-all"
                                >
                                    <img src={platform.img} alt={`${platform.name} icon`} className="h-10 w-auto mx-auto mb-3 object-contain" />
                                    <h4 className="font-bold text-white mb-4">{platform.name}</h4>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        {platform.actions.map((action, j) => (
                                            <li key={j} className="flex items-center gap-2">
                                                <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                {action}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Emergency Contacts */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-20"
                    >
                        <div className="bg-gradient-to-r from-[#F2600B] to-orange-600 rounded-2xl p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>

                            <div className="flex items-center gap-3 mb-6 justify-center">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-[#F2600B]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold">Emergency Contacts</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                                {[
                                    {
                                        country: "🇬🇭 Ghana",
                                        contacts: ["Police Cybercrime: 191 or 18555", "Cyber Security Authority: cybersecurity.gov.gh"]
                                    },
                                    {
                                        country: "🇳🇬 Nigeria",
                                        contacts: ["EFCC Cybercrime: +234 9-9044751", "Police: 112"]
                                    },
                                    {
                                        country: "🇰🇪 Kenya",
                                        contacts: ["DCI Cybercrime Unit: +254 20 341 4601", "Safaricom: 100"]
                                    },
                                    {
                                        country: "🇿🇦 South Africa",
                                        contacts: ["SAPS Cybercrime: 10111", "Child Protection: 0800 222 777"]
                                    }
                                ].map((country, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="bg-black/30 rounded-xl p-6 backdrop-blur-sm border border-white/10"
                                    >
                                        <h4 className="font-bold text-lg mb-3">{country.country}</h4>
                                        <ul className="space-y-2 text-sm">
                                            {country.contacts.map((contact, j) => (
                                                <li key={j} className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0"></div>
                                                    {contact}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 7-Day Action Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-20"
                    >
                        <div className="flex items-center gap-3 mb-8 justify-center">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white">Your <span className="text-green-400">7-Day Action Plan</span></h3>
                        </div>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F2600B] via-orange-400 to-[#F2600B] opacity-30"></div>

                            <div className="space-y-8">
                                {[
                                    {
                                        time: "TODAY",
                                        duration: "30 Minutes",
                                        color: "bg-[#F2600B]",
                                        tasks: [
                                            "Do the 5 critical actions above",
                                            "Have conversation about online safety",
                                            "Create phone rules together"
                                        ]
                                    },
                                    {
                                        time: "WEEK 1",
                                        duration: "1 Hour Total",
                                        color: "bg-orange-500",
                                        tasks: [
                                            "Set up Instagram Supervision / TikTok Family Pairing",
                                            "Review WhatsApp settings together",
                                            "Check mobile money security",
                                            "Create phone charging station outside bedroom"
                                        ]
                                    },
                                    {
                                        time: "ONGOING",
                                        duration: "Every Week",
                                        color: "bg-yellow-500",
                                        tasks: [
                                            "Weekly 15-minute check-ins (not surveillance)",
                                            "Monitor for warning signs",
                                            "Keep communication open",
                                            "Stay educated on new platforms/threats"
                                        ]
                                    }
                                ].map((phase, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: i * 0.2 }}
                                        className="relative flex items-start gap-6"
                                    >
                                        <div className={`flex-shrink-0 w-16 h-16 ${phase.color} rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg`}>
                                            {phase.time}
                                        </div>

                                        <div className="flex-1 bg-black/40 rounded-xl p-6 border border-white/10 hover:border-[#F2600B]/30 transition-all">
                                            <h4 className="text-lg font-bold text-[#F2600B] mb-2">{phase.duration}</h4>
                                            <div className="space-y-2 text-sm text-gray-300">
                                                {phase.tasks.map((task, j) => (
                                                    <div key={j} className="flex items-center gap-3">
                                                        <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        {task}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Parent Checklist */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-8 justify-center">
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white">Parent <span className="text-emerald-400">Checklist</span></h3>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-900/20 to-black rounded-2xl p-8 border border-emerald-500/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {[
                                    "Made child's accounts private",
                                    "Set up parental controls (Instagram/TikTok)",
                                    "Enabled two-factor authentication",
                                    "Reviewed follower lists together",
                                    "Created phone rules together",
                                    "Checked mobile money security",
                                    "Scheduled weekly check-ins",
                                    "Had conversation about online dangers",
                                    "Know emergency contact numbers",
                                    "Child knows they can tell me if scared online"
                                ].map((item, i) => (
                                    <motion.label
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                        className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer group"
                                    >
                                        <input type="checkbox" className="w-5 h-5 text-[#F2600B] bg-black border-2 border-gray-600 rounded focus:ring-[#F2600B] focus:ring-2" />
                                        <span className="text-gray-200 group-hover:text-white transition-colors">{item}</span>
                                    </motion.label>
                                ))}
                            </div>

                            <div className="text-center p-4 bg-black/30 rounded-lg border border-emerald-500/20">
                                <div className="text-lg font-bold text-emerald-400 mb-2">Your Safety Score</div>
                                <div className="text-sm text-gray-300">
                                    <span className="text-emerald-400">10/10 = <img src={new URL('../assets/images/trophy.png', import.meta.url).href} alt="Trophy icon" className="inline-block h-4 w-4 align-[-0.15rem] mx-1" /> Excellent!</span> •
                                    <span className="text-yellow-400"> 7-9 = <img src={new URL('../assets/images/defence.png', import.meta.url).href} alt="Shield icon" className="inline-block h-4 w-4 align-[-0.15rem] mx-1" /> Good Job!</span> •
                                    <span className="text-orange-400"> 4-6 = <img src={new URL('../assets/images/alarm.png', import.meta.url).href} alt="Warning icon" className="inline-block h-4 w-4 align-[-0.15rem] mx-1" /> Keep Going</span> •
                                    <span className="text-red-400"> 0-3 = <img src={new URL('../assets/images/today.png', import.meta.url).href} alt="Urgent start today icon" className="inline-block h-4 w-4 align-[-0.15rem] mx-1" /> Start Today</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Final CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mt-16 p-8 bg-gradient-to-r from-[#F2600B]/10 to-orange-500/10 rounded-2xl border border-[#F2600B]/30"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">Remember, Parent/Guardian:</h3>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                            You don't need to be a tech expert — just stay involved. It's never too late to start.
                            Balance is key: not total restriction, not total freedom. The best filter is an educated parent.
                        </p>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </div >
    );
}
