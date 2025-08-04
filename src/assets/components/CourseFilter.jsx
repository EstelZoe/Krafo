import React from "react";

export default function CourseFilter() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 my-10 px-4 sm:px-6 lg:px-0">
  {/* Filter Dropdowns */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
    {/* Category Dropdown */}
    <div className="relative w-full">
      <select className="w-full appearance-none px-4 py-3 bg-white/20 text-white rounded-lg border border-white/30 backdrop-blur-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
        <option className="text-black bg-white">All Categories</option>
        <option className="text-black bg-white">Cybersecurity</option>
        <option className="text-black bg-white">Digital Skills</option>
        <option className="text-black bg-white">Ethical Hacking</option>
      </select>
      {/* Custom Chevron Icon */}
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    {/* Level Dropdown */}
    <div className="relative w-full">
      <select className="w-full appearance-none px-4 py-3 bg-white/20 text-white rounded-lg border border-white/30 backdrop-blur-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
        <option className="text-black bg-white">All Levels</option>
        <option className="text-black bg-white">Beginner</option>
        <option className="text-black bg-white">Intermediate</option>
        <option className="text-black bg-white">Advanced</option>
      </select>
      {/* Custom Chevron Icon */}
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>

  {/* Search Button */}
  <button className="px-6 py-3 bg-white/10 text-orange-500 backdrop-blur-lg border border-white/30 rounded-lg text-sm font-semibold transition duration-300 ease-in-out shadow-md hover:bg-orange-500 hover:text-white hover:shadow-orange-600/30">
    Search Courses
  </button>
</div>

    );
}