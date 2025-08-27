import React, { useState, useEffect } from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import ProgramCard from "../assets/components/ProgramCard";
import ImpactStat from "../assets/components/ImpactStat";
import HeroImage from "../assets/images/cyberyouthed2.png";
import { School, Laptop, Users, GraduationCapIcon, ShieldIcon, BriefcaseBusinessIcon, BookOpenCheck, Globe2 } from "lucide-react";
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










export default function YouthCyberEducation() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const images = [
        img13,
        img4,
        img5,
        img7,
        img9,
        img11,
        img8,

        // Add more images as needed
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
            image: ccbc
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

            {/* CyberEd Visual */}
            <section className="relative h-auto md:h-[500px] overflow-hidden bg-black text-white font-body">
                {/* Background Video + Overlay */}
                <div className="absolute inset-0 w-full h-full">
                    <video
                        className="w-full h-full object-cover opacity-60"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src={Video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Dual Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C88] via-[#0B0B0CAA] to-black"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-transparent"></div>
                </div>

                {/* Foreground Content */}
                <div className="relative z-10 px-6 md:px-16 py-16 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Text Side */}
                        <div className="space-y-6 text-center md:text-left animate-fade-in-down">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-[#F2600B] drop-shadow-md">
                                CyberBytes
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0 leading-relaxed">
                                We are building Africa’s cybersecurity future—one digital warrior at a time.
                                Through education, innovation, and strategy, we empower the next generation of secure tech leaders.
                            </p>
                            <a
                                href="https://mycyberbytes.africa/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 px-6 py-3 bg-[#F2600B] hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-all shadow-lg hover:scale-105 active:scale-100"
                            >
                                Learn More
                            </a>
                        </div>

                        {/* Image Side */}
                        <div className="flex justify-center animate-fade-in-up">
                            <a href="https://mycyberbytes.africa/" target="_blank" rel="noopener noreferrer">
                                <img
                                    src={cybered}
                                    alt="Cyber Visual"
                                    className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-2xl border border-[#F2600B33] shadow-[0_10px_40px_rgba(242,96,11,0.25)] object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </a>
                        </div>


                    </div>
                </div>


                {/* initial={{ y: -10 }}
                            animate={{ y: 10 }}
                            transition={{
                              repeat: Infinity,
                              duration: 3,
                              repeatType: "reverse",
                              ease: "easeInOut",
                            }}
                            className="bg-[#1A1A1C] rounded-xl shadow-md hidden items-center justify-center col-start-4 row-start-1 row-span-2 md:flex"
                          >
                            <motion.img
                              src={Ks}
                              alt="Workshop"
                              className="w-full h-80 object-cover rounded-xl"
                            /> */}




                {/* Animation keyframes (via Tailwind's plugin or custom in global CSS) */}
                <style>
                    {`
      @keyframes fade-in-down {
        0% { opacity: 0; transform: translateY(-20px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      .animate-fade-in-down {
        animation: fade-in-down 0.8s ease-out forwards;
      }

      .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
      }
    `}
                </style>
            </section >

            <Footer />
        </div >
    );
}
