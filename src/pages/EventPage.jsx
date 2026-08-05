import React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Handshake, CalendarDays } from "lucide-react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import heroBg from "../assets/images/evetskrafo.jpg";
import pic from "../assets/images/IMG-7.jpg";
import { Lightbulb, Users, ShieldCheck } from "lucide-react";
import pics from "../assets/images/flye2.jpeg";

const EventPage = () => {
    const banners = [
        {
            title: "Partner With Us For Events",
            icon: Handshake,
            description:
                "Partner with KRAFO Systems to deliver impactful cybersecurity events and workshops.",
            button: "Partner With Us",
            bg: "bg-[#F2600B]",
            text: "text-black",
            button:
                "Partner With Us",
            buttonClass:
                "border border-black text-black hover:bg-black hover:text-[#F2600B]",
        },
        {
            title: "Book Us For Events",
            icon: CalendarDays,
            description:
                "Invite KRAFO Systems to speak, train and host cybersecurity sessions for your organization or institution.",
            button: "Book KRAFO",
            bg: "bg-black",
            text: "text-[#F2600B]",
            buttonClass:
                "border border-[#F2600B] text-[#F2600B] hover:bg-[#F2600B] hover:text-black",
        },
    ];

    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 7000);



        return () => clearInterval(timer);
    }, []);

    const Icon = banners[currentBanner].icon;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <section className="relative min-h-screen overflow-hidden flex items-center justify-center">

                {/* Background */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <img
                        src={heroBg}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/70"></div>

                {/* Orange Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,96,11,0.18),transparent_65%)]"></div>

                {/* Floating Glow */}
                <motion.div
                    className="absolute w-72 h-72 rounded-full bg-[#F2600B] blur-[130px]"
                    style={{
                        top: "15%",
                        left: "50%",
                        x: "-50%",
                    }}
                    animate={{
                        y: [0, -25, 0],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                    }}
                />

                {/* Content */}
                <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .6 }}
                    >
                        <span
                            style={{ fontFamily: "Proxon" }}
                            className="inline-flex items-center gap-2 rounded-full border border-[#F2600B]/40 bg-[#F2600B]/10 px-6 py-2 uppercase tracking-[0.2em] text-xs text-[#F2600B] backdrop-blur-md">


                            <span className="h-2 w-2 rounded-full bg-[#F2600B] animate-pulse"></span>

                            Upcoming Events

                        </span>
                    </motion.div>

                    {/* Heading */}

                    <motion.h1
                        style={{ fontFamily: "Proxon" }}
                        className="mt-20 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold"
                    >
                        The Future of

                        <span className="block text-[#F2600B]">
                            Cybersecurity
                        </span>

                        Starts Here.
                    </motion.h1>

                    {/* Typewriter */}

                    <motion.div
                        // style={{ fontFamily: "Proxon" }}
                        className="mt-6 h-20 text-gray-300 text-base md:text-lg max-w-lg leading-relaxed"
                    >
                        <Typewriter
                            words={[
                                "Exclusive conferences are coming soon.",
                                "World-class cybersecurity experts will be speaking.",
                                "Hands-on workshops are almost here.",
                                "Stay tuned... something extraordinary is on the way."
                            ]}
                            loop={false}
                            cursor
                            cursorStyle="|"
                            typeSpeed={45}
                            deleteSpeed={20}
                            delaySpeed={2500}
                        />
                    </motion.div>

                    {/* Buttons */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .8 }}
                        className="mt-12 flex flex-wrap justify-center gap-5"
                    >
                        <button
                            // style={{ fontFamily: "Proxon" }}
                            className="rounded-xl bg-[#F2600B] px-8 py-4 font-semibold ..."
                        >
                            Read More
                        </button>

                        <button
                            // style={{ fontFamily: "Proxon" }}
                            className="rounded-xl border border-white/20 px-8 py-4 font-semibold ..."
                        >
                            Learn More
                        </button>
                    </motion.div>

                    {/* Scroll */}

                    <motion.div
                        animate={{
                            y: [0, 12, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                        className="mt-20 flex flex-col items-center text-gray-400"
                    >
                        <span className="text-xs uppercase tracking-[0.4em]">
                            Scroll
                        </span>

                        <svg
                            className="mt-3 h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </motion.div>

                </div>

            </section>

            {/* Banner Carousel */}

            <section className="relative overflow-hidden h-24">
                <AnimatePresence mode="sync">
                    <motion.div
                        key={currentBanner}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{
                            duration: 0.9,
                            ease: [0.77, 0, 0.175, 1],
                        }}
                        className={`absolute inset-0 ${banners[currentBanner].bg}`}>
                        <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">
                            {/* Left Arrow */}
                            <button
                                onClick={() =>
                                    setCurrentBanner(
                                        currentBanner === 0
                                            ? banners.length - 1
                                            : currentBanner - 1
                                    )
                                }
                                className={`${banners[currentBanner].text} text-5xl hover:scale-110 transition`}
                            >
                                &#8249;
                            </button>

                            <div className="hidden lg:flex items-center justify-center mx-6">
                                <Icon
                                    className={`w-10 h-10 ${banners[currentBanner].text}`}
                                />
                            </div>

                            {/* Center */}

                            <div className="flex-1 text-center px-8">
                                <h2
                                    className={`text-4xl font-bold ${banners[currentBanner].text}`}
                                >
                                    {banners[currentBanner].title}
                                </h2>

                                <p
                                    className={`mt-2 ${banners[currentBanner].text}`}>
                                    {banners[currentBanner].description}
                                </p>
                            </div>

                            {/* Button */}
                            <button
                                className={`px-7 py-3 rounded-lg transition-all duration-300 ${banners[currentBanner].buttonClass}`}                           >
                                {banners[currentBanner].button}
                            </button>

                            {/* Right Arrow */}

                            <button
                                onClick={() =>
                                    setCurrentBanner(
                                        (currentBanner + 1) % banners.length
                                    )
                                }
                                className={`${banners[currentBanner].text} text-5xl ml-8 hover:scale-110 transition`}
                            >
                                &#8250;
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </section>

            {/*UPCOMING EVENT */}

            <section className="bg-[#050505] py-8 lg:py-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

                        {/*  LEFT CONTENT  */}
                        <motion.div initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1">

                            <p className="uppercase tracking-[0.35em] text-[#F2600B] text-sm font-semibold">
                                Coming Soon
                            </p>

                            <h2 style={{ fontFamily: "Proxon" }}
                                className="mt-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
                                Something Big Is

                                <span style={{ fontFamily: "Proxon" }}
                                    className=" block text-2xl text-orange-500 sm:text-3xl md:text-4xl lg:text-5xl font-medium">
                                    On The Horizon
                                </span>

                            </h2>

                            <p className="mt-8 text-gray-400 text-lg leading-8">
                                We are preparing an exciting cybersecurity experience
                                designed to educate, inspire and connect professionals,
                                students, businesses and technology enthusiasts.
                                Be among the first to hear when we officially announce it.
                            </p>
                            {/* Highlights */}
                            <div className="mt-10 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#F2600B]/10 p-3 rounded-xl">
                                        <Lightbulb
                                            className="text-[#F2600B]"
                                            size={22} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">
                                            Learn
                                        </h4>
                                        <p className="text-gray-400 mt-1">
                                            Gain practical cybersecurity insights from
                                            experienced professionals.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#F2600B]/10 p-3 rounded-xl">
                                        <Users
                                            className="text-[#F2600B]"
                                            size={22} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">
                                            Connect
                                        </h4>
                                        <p className="text-gray-400 mt-1">
                                            Network with industry experts, businesses,
                                            students and innovators.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#F2600B]/10 p-3 rounded-xl">
                                        <ShieldCheck
                                            className="text-[#F2600B]"
                                            size={22}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">
                                            Discover
                                        </h4>
                                        <p className="text-gray-400 mt-1">
                                            Explore emerging cybersecurity trends,
                                            technologies and real-world solutions.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <button
                                className="mt-12 px-8 py-4 rounded-xl bg-[#F2600B] text-black font-semibold hover:bg-orange-500 hover:scale-105 transition duration-300">
                                I'm Interested
                            </button>
                        </motion.div>

                        {/*RIGHT IMAGE*/}
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2">
                            <div className="relative">

                                {/* Orange Glow */}
                                <div className="absolute -inset-4 bg-[#F2600B]/20 blur-3xl rounded-3xl"></div>
                                <img src={pics} alt="Upcoming Event"
                                    className="relative w-full rounded-3xl shadow-2xl object-cover hover:scale-[1.02] transition duration-500"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="bg-[#0a0a0a] py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT */}
                        <div className="relative flex justify-center items-center">
                            <div className="absolute w-[90%] h-[90%] rounded-full bg-[#F2600B]/50 blur-[120px]"></div>
                            <div className="relative rounded-3xl overflow-hidden z-10">
                                <img src={pic} alt=""
                                    className="w-full h-[500px] object-cover transition duration-500 hover:scale-120" />
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div>
                            <p className="uppercase tracking-[0.35em] text-[#F2600B] text-sm font-semibold">
                                Past Events
                            </p>
                            <h2 className="mt-4 text-5xl font-bold leading-tight text-white">
                                Reliving Moments
                                <span className="block text-[#F2600B]">
                                    That Made An Impact
                                </span>
                            </h2>

                            <h3 className="mt-10 text-2xl font-semibold text-white">
                                Cybersecurity Summit 2025
                            </h3>
                            <p className="mt-5 text-gray-400 leading-8">
                                Our cybersecurity summit brought together professionals,
                                students and organizations to discuss emerging threats,
                                cyber resilience and the future of digital security.
                            </p>
                            <div className="mt-10 space-y-4">
                                <div className="flex items-center gap-3">📍
                                    <span className="text-gray-300">
                                        Accra, Ghana
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">👥
                                    <span className="text-gray-300">
                                        300+ Participants
                                    </span>
                                </div>
                                <div className="flex items-center gap-3"> 🗓
                                    <span className="text-gray-300">
                                        March 2025
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default EventPage;