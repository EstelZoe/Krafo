import React from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import CourseFilter from "../assets/components/CourseFilter";
import Courses from "../assets/images/coursespic.jpg";
import CourseCard from "../assets/components/CourseCard";
import Placeholder from "../assets/images/studentlearning.png";





export default function Course() {
    return (
        <>
            <Navbar />
            <section
                className="relative h-150 bg-cover bg-center text-white flex items-center justify-center"
                style={{ backgroundImage: `url(${Courses})` }}
            >
                <div className="absolute inset-0 bg-black/60"></div> {/* dark overlay */}
                <div className="relative z-10 text-center space-y-2 px-4">
                    <h1 className="text-3xl md:text-4xl font-bold">Explore Our Courses</h1>
                    <p className="text-sm md:text-base">
                        Discover our comprehensive range of courses designed to enhance your skills and advance your career
                    </p>
                </div>
            </section>
            <section>
                <CourseFilter />
                <hr className="my-6 border-t border-gray-300" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
