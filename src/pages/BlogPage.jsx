import React from "react";
import BlogCard from "../assets/components/BlogCard";
import FilterButton from "../assets/components/FilterButton";
import Footer from "../assets/components/Footer";
import Navbar from "../assets/components/Navbar";
import BgPic from "../assets/images/gradientbackground.jpg";


const BlogData = [
    {
        title: "Cybersecurity Threat Landscape 2025",
        description: "How evolving cybersecurity threats are shaping 2025 strategies.",
        category: "Cybersecurity",
        author: "hardtruth",
        date: "July 21, 2025",
    },
    {
        title: "Personal Data Breach Prevention",
        description: "Tips and tools to safeguard your personal information in 2025.",
        category: "Data Privacy",
        author: "nana k.",
        date: "July 18, 2025",
    },
    {
        title: "Faith, Cybersecurity & Education",
        description: "How faith-based institutions are adapting to digital risks.",
        category: "Education",
        author: "Boateng A.",
        date: "July 15, 2025",
    },
    {
        title: "Phishing Attack Prevention",
        description: "How to spot and avoid phishing attacks in your inbox.",
        category: "Protection",
        author: "Estel Zoe",
        date: "July 10, 2025",
    },
    {
        title: "Cyber Security for Small Businesses",
        description: "Steps small businesses can take to reduce cyber risk.",
        category: "Small Business",
        author: "hardtruth",
        date: "July 5, 2025",
    },
    {
        title: "AI in Cybersecurity",
        description: "How AI is reshaping modern cybersecurity strategies.",
        category: "AI",
        author: "Boateng A.",
        date: "July 1, 2025",
    },
];

export default function Blog() {
    return (
        <>
            <Navbar />
            <div className="bg-white min-h-screen text-black">
                {/* Header */}

                <div className="relative flex items-center justify-center text-center px-4 md:px-0 bg-cover bg-center bg-no-repeat text-white h-120"
                    style={{ backgroundImage: `url(${BgPic})` }} >

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>

                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">
                            Thoughts from the Cyber Frontline
                        </h1>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Stay informed with the latest cybersecurity insights, tips, and security news from our expert team.
                        </p>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-10 mt-10">
                    {["All Posts", "Threats", "Data", "Faith", "Awareness"].map((label, i) => (
                        <FilterButton key={i} label={label} />
                    ))}
                </div>

                {/* Blog Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6 md:px-12 pb-16 bg-black">
                    {BlogData.map((post, index) => (
                        <BlogCard key={index} {...post} />
                    ))}
                </div>

                <Footer />
            </div>
        </>

    );
}
