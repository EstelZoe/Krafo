import React from "react";

export default function CourseFilter() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-6">
            <div className="flex gap-4 w-full md:w-auto">
                <select className="px-4 py-2 border rounded w-full md:w-auto">
                    <option>All Categories</option>
                    <option>Cybersecurity</option>
                    <option>Digital Skills</option>
                    <option>Ethical Hacking</option>
                </select>

                <select className="px-4 py-2 border rounded w-full md:w-auto">
                    <option>All Levels</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>
            </div>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded w-full md:w-auto">
                Search Courses
            </button>
        </div>
    );
}
