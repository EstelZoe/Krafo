import React from "react";
import EventCard from "../assets/components/EventCard";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";

const events = [
    {
        date: "MAR 15",
        title: "Tech Innovation Summit 2025",
        description: "Join industry leaders and innovators...",
        time: "9:00 AM - 5:00 PM",
        location: "Convention Center",
        category: "Technology",
    },
    {
        date: "MAR 22",
        title: "Startup Pitch Competition",
        description: "Watch emerging startups present...",
        time: "6:00 PM - 9:00 PM",
        location: "Business Hub",
        category: "Business",
    },
    
    {
        date: "APR 05",
        title: "Cybersecurity Workshop",
        description: "A hands-on workshop on ethical hacking and defense mechanisms.",
        time: "10:00 AM - 4:00 PM",
        location: "Online Webinar",
        category: "Cybersecurity",
    },
    {
        date: "APR 12",
        title: "Digital Marketing Conference",
        description: "Learn the latest trends in digital marketing from top experts.",
        time: "9:00 AM - 6:00 PM",
        location: "Grand Expo Hall",
        category: "Marketing",
    },
    {
        date: "MAY 01",
        title: "AI in Business Summit",
        description: "Explore the impact of Artificial Intelligence on modern businesses.",
        time: "1:00 PM - 5:00 PM",
        location: "Tech Park Auditorium",
        category: "AI",
    },
    {
        date: "MAY 18",
        title: "Youth Coding Challenge",
        description: "A fun and challenging coding competition for young developers.",
        time: "10:00 AM - 2:00 PM",
        location: "Community Center",
        category: "Education",
    },

];

export default function EventPage() {
    return (
        <>
            <Navbar />
            <div className="px-4 pt-24 pb-12 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-black">What's Coming Up</h1>
                <p className="text-gray-600">Discover upcoming events and register for the ones that interest you</p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                <input
                    type="text"
                    placeholder="Search events..."
                    className="border rounded px-4 py-2 w-full md:w-1/2"
                />
                <select className="border rounded px-4 py-2 w-full md:w-auto">
                    <option>All Categories</option>
                </select>
                <select className="border rounded px-4 py-2 w-full md:w-auto">
                    <option>All Dates</option>
                </select>
            </div>

            {/* Event Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event, index) => (
                    <EventCard key={index} {...event} />
                ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-8">
                <button className="border px-6 py-2 rounded text-sm text-black hover:bg-orange-500 hover:text-white transition">
                    Load More Events
                </button>
            </div>
            </div>
            <Footer />
        </>
    );
}
