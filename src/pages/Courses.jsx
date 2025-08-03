import React from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import CourseFilter from "../assets/components/CourseFilter";
import Courses from "../assets/images/coursespic.jpg";
import CourseCard from "../assets/components/CourseCard";
import Placeholder from "../assets/images/studentlearning.png";
import bugGif from "../assets/videos/bug.gif";
import computerGif from "../assets/videos/computer.gif";
import exchangeGif from "../assets/videos/exchange.gif";
import malwareGif from "../assets/videos/malware.gif";
import palmGif from "../assets/videos/palm.gif";
import dataGif from "../assets/videos/data.gif";
import Vid1 from "../assets/videos/Vid2.mp4";





export default function Course() {
    return (
        <>
            <Navbar />

            <section className="relative text-center py-28 px-4 pt-40 overflow-hidden backdrop-blur-3xl bg-black text-white">
                {/* <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"
                > */}
                {/* <div
                        className="mx-auto aspect-[1155/678] w-[1155px] opacity-30"
                        style={{
                            background: "linear-gradient(to top right, #F2600B, #F2600B55)",
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    ></div> */}
                {/* </div> */}
                {/* Background Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src={Vid1} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Optional Dark Overlay */}
                {/* <div className="absolute inset-0 bg-black/60 z-0"></div> */}

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

                    <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-orange-600/40">
                        Explore All Courses
                    </button>
                </div>
            </section>

            <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 backdrop-blur-3xl bg-gradient-to-br from-black via-[#000000] to-[#0a0400] text-white overflow-hidden">

                {/* Glassy Gradient Background Decoration */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden px-36 blur-3xl sm:block hidden"
                >
                    {/* <div
      className="mx-auto aspect-[1155/678] w-[1155px] opacity-30"
      style={{
        background: "linear-gradient(to top right, #F2600B, #F2600B55)",
        clipPath:
          "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
      }}
    ></div> */}
                </div>

                {/* Section Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        Explore Our Featured Courses
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
                        Learn practical, high-demand skills in Cybersecurity, Digital Literacy, and more.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="mb-10">
                    <CourseFilter />
                </div>

                {/* Course Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
                    {[...Array(6)].map((_, index) => (
                        <CourseCard
                            key={index}
                            title={`Course Title ${index + 1}`}
                            description="This is a brief description of the course."
                            image={Placeholder}
                        />
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
}
