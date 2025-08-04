import React from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import ProgramCard from "../assets/components/ProgramCard";
import ImpactStat from "../assets/components/ImpactStat";
import HeroImage from "../assets/images/cyberyouthed2.png";
import { School, Laptop, Users, GraduationCapIcon, ShieldIcon, BriefcaseBusinessIcon, BookOpenCheck, Globe2 } from "lucide-react";
import ProgramOptionCard from "../assets/components/ProgramOptionCard";
import OutreachImpact from "../assets/components/OutreachImpact";
import { motion } from "framer-motion";
import CountUp from "react-countup";



export default function YouthCyberEducation() {
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
        { value: "1,200+", label: "Students Trained" },
        { value: "45+", label: "Schools Reached" },
        { value: "30+", label: "Volunteers & Mentors" },
    ];

    const OutreachStats = [
        { end: 50, label: "Schools Reached", Icon: School },
        { end: 5000, label: "Students Trained", Icon: Users },
        { end: 100, label: "Educators Trained", Icon: BookOpenCheck },
        { end: 25, label: "Communities Served", Icon: Globe2 },
    ];

    return (
        <div className="bg-white text-black">
            <Navbar />


            {/* Hero Section */}
            <section className="relative bg-black text-white pt-10">
                <div className="flex flex-col md:flex-row h-auto md:h-[34rem]">

                    {/* Text Side */}
                    <div className="md:w-1/2 flex items-center justify-center p-8 z-10">
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">Youth Cyber Education</h1>
                            <p className="max-w-md text-lg text-orange-500 mb-6">
                                Empowering young minds with knowledge, tools, and support to stay safe and thrive in the digital age.
                            </p>
                            <div className="flex justify-center md:justify-start space-x-4 pointer-cursor">
                                <a href=" https://mycyberbytes.africa/" target="_blank" rel="noopener noreferrer"  >
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition">
                                        Visit Website
                                    </button>
                                </a>
                                <button className="bg-white text-black font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition">
                                    Request Demo
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="md:w-1/2 h-64 md:h-full bg-cover bg-center relative" style={{ backgroundImage: `url(${HeroImage})` }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                </div>
            </section>



            <section className="relative bg-[#000000] text-white py-20 px-6 md:px-20 font-body overflow-hidden">
                {/* BLURRED BACKGROUND GRADIENT OVERLAY */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/4 left-1/2 w-[80vw] h-[80vw] bg-orange-500 opacity-20 blur-[120px] transform -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[#F2600B] opacity-10 blur-[100px] transform translate-x-1/3 translate-y-1/3 rounded-full pointer-events-none" />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Heading */}
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold mb- bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text p-1">
                            Our Programs Overview
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base mt-1">
                            Our comprehensive cybersecurity education program is designed to build a strong foundation for the next generation of digital citizens.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programs.map((program, idx) => {
                            const Icon = program.icon;
                            return (
                                <div
                                    key={idx}
                                    className="groupbg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent rounded-xl p-6 shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-[1.03] backdrop-blur-md border border-orange-400/10"
                                >
                                    <div className="flex items-center justify-center w-14 h-14 mb-4 bg-black rounded-full border-2 border-orange-500 shadow-md">
                                        <Icon className="w-6 h-6 text-orange-400 group-hover:animate-ping-slow" />
                                    </div>
                                    <h3 className="text-xl font-bold text-orange-400 group-hover:text-white transition-colors mb-2">
                                        {program.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                        {program.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* Program Options Section */}
            <section className="bg-[#000000] text-orange-600 py-20 px-4 md:px-12 font-body pt-0">
                <div className="max-w-7xl mx-auto">
                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                        Program Options
                    </h2>

                    {/* Card Grid */}
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
                        {[
                            {
                                title: "Cyber Basics",
                                desc: "Learn the fundamentals of staying safe online, recognizing threats, and protecting your identity.",
                                Icon: GraduationCapIcon
                            },
                            {
                                title: "Secure Habits",
                                desc: "Understand password hygiene, 2FA, and safe internet practices tailored for youth.",
                                Icon: ShieldIcon
                            },
                            {
                                title: "Digital Citizenship",
                                desc: "Explore ethics, social media safety, and responsible behavior in the digital world.",
                                Icon: BriefcaseBusinessIcon
                            }
                        ].map(({ title, desc, Icon }, idx) => (
                            <div
                                key={idx}
                                className="group bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent backdrop-blur-xl p-8 rounded-2xl border border-orange-500/20 hover:shadow-[0_0_30px_#F2600B33] transition duration-300"
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 mb-4 mx-auto flex items-center justify-center rounded-full bg-black border-2 border-orange-500 shadow-inner group-hover:shadow-orange-500/40 transition-all">
                                    <Icon className="text-orange-500 w-7 h-7 group-hover:scale-110 transition-transform" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-center group-hover:text-white transition-colors">
                                    {title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-400 text-center mt-3 group-hover:text-white transition-colors">
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Outreach Impact Section */}

            <section className="py-16 bg-gray-100 dark:bg-black text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12">Our Outreach Impact</h2>

                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.2,
                                duration: 0.5,
                                ease: "easeOut"
                            }
                        }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4"
                >
                    {OutreachStats.map(({ end, label, Icon }, idx) => (
                        <motion.div
                            key={idx}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0 }
                            }}
                            className="group bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent backdrop-blur-xl p-8 rounded-2xl border border-orange-500/20 hover:shadow-[0_0_30px_#F2600B33] transition duration-300"
                        >
                            <div className="w-16 h-16 mb-4 mx-auto flex items-center justify-center rounded-full bg-black border-2 border-orange-500 shadow-inner group-hover:shadow-orange-500/40 transition-all">
                                <Icon className="text-orange-500 w-7 h-7 group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-4xl font-bold text-orange-600 text-center group-hover:scale-105 transition-transform">
                                <CountUp end={end} duration={2} separator="," />+
                            </h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 text-center">
                                {label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Impact Section */}
            <section className="py-16 px-6 md:px-20 bg-orange-50">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-black">Our Impact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {impactStats.map((stat, idx) => (
                        <ImpactStat key={idx} {...stat} />
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
