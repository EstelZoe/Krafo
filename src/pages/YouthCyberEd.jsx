import React from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import ProgramCard from "../assets/components/ProgramCard";
import ImpactStat from "../assets/components/ImpactStat";
import HeroImage from "../assets/images/cyberyouthed2.png";
import { School, Laptop, Users, GraduationCapIcon, ShieldIcon, BriefcaseBusinessIcon, BookOpenCheck, Globe2 } from "lucide-react";
import ProgramOptionCard from "../assets/components/ProgramOptionCard";
import OutreachImpact from "../assets/components/OutreachImpact";



export default function YouthCyberEducation() {
    const programs = [
        {
            icon: <School size={48} />,
            title: "Cyber Clubs in Schools",
            description: "Creating engaging cyber clubs to foster interest in cybersecurity among students."
        },
        {
            icon: <Laptop size={48} />,
            title: "Workshops & Seminars",
            description: "Hands-on sessions on cyber hygiene, safety, and ethical online behavior."
        },
        {
            icon: <Users size={48} />,
            title: "Mentorship Program",
            description: "Connecting students with cybersecurity professionals for guidance and support."
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


            <div className="flex flex-col md:flex-row h-auto md:h-[32rem] bg-white text-black">

                {/* Text Side */}
                <div className="md:w-1/2 flex items-center justify-center p-8 bg-black">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">Youth Cyber Education</h1>
                        <p className="max-w-md text-base md:text-lg text-orange-600 mb-6">
                            Empowering young minds with knowledge, tools, and support to stay safe and thrive in the digital age.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg">
                                View Curriculum
                            </button>
                            <button className="bg-white text-black font-semibold px-6 py-2 rounded-lg hover:bg-gray-200">
                                Request Demo
                            </button>
                        </div>
                    </div>
                </div>
                {/* Image Side */}
                <div className="md:w-1/2 h-64 md:h-full bg-cover bg-center" style={{ backgroundImage: `url(${HeroImage})` }}></div>
            </div>


            {/* Programs Section */}
            <section className="py-16 px-6 md:px-20 bg-gray-50">

                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-black">Our Programs Overview</h2>
                <p className="text-center text-gray-700 max-w-xl mx-auto mb-10">
                    Our Comprehensive Cybersecurity Education Program Is Designed To Build A Strong Foundation For The Next Generation Of Digital Citizens.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program, idx) => (
                        <ProgramCard key={idx} {...program} />
                    ))}
                </div>
                {/* programcards */}
            </section>
            <section className="bg-black text-orange-600 py-16 px-4 md:px-12 ">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Program Options</h2>

                <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
                    <ProgramOptionCard
                        icon={GraduationCapIcon}
                        title="Cyber Basics"
                        description="Learn the fundamentals of staying safe online, recognizing threats, and protecting your identity."
                    />
                    <ProgramOptionCard
                        icon={ShieldIcon}
                        title="Secure Habits"
                        description="Understand password hygiene, 2FA, and safe internet practices tailored for youth."
                    />
                    <ProgramOptionCard
                        icon={BriefcaseBusinessIcon}
                        title="Digital Citizenship"
                        description="Explore ethics, social media safety, and responsible behavior in the digital world."
                    />
                </div>
            </section>

            {/* Outreach Impact Section */}
            <section className="py-16 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Outreach Impact</h2>
                <OutreachImpact stats={OutreachStats} />
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
