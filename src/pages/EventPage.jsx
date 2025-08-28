import React, { useState, useEffect } from "react";
import EventCard from "../assets/components/EventCard";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import aicc from "../assets/images/flye.jpg";
import ccbc from "../assets/images/ccbc.png";

const events = [
    {
        date: "12-14 Nov",
        title: "Hacking the Human Mind: They’re Already Inside Your Mind",
        description: "Cybercriminals don’t just hack computers; they also hack humans. Learn the manipulation tactics targeting you daily and the methods to counter these strategic attacks. Master the psychological defenses that separate victims from defenders.",
        time: "TBD",
        location: "AICC, Accra",
        category: "Technology",
        image: aicc,
        featured: true,
        registrationUrl: "https://gdiw.com.gh" // Add the registration link here
    },
    // {
    //     date: "MAR 22",
    //     title: "Startup Pitch Competition",
    //     description: "Watch emerging startups present their groundbreaking ideas to a panel of investors. Network with founders and discover the next big thing in tech.",
    //     time: "6:00 PM - 9:00 PM",
    //     location: "Business Hub",
    //     category: "Business",
    //     image: ccbc
    // },
    // {
    //     date: "APR 05",
    //     title: "Cybersecurity Workshop",
    //     description: "A hands-on workshop on ethical hacking and defense mechanisms. Learn penetration testing techniques from security experts.",
    //     time: "10:00 AM - 4:00 PM",
    //     location: "Online Webinar",
    //     category: "Cybersecurity",
    // },
    // {
    //     date: "APR 12",
    //     title: "Digital Marketing Conference",
    //     description: "Learn the latest trends in digital marketing from top experts. Covers SEO, social media, content strategy, and performance analytics.",
    //     time: "9:00 AM - 6:00 PM",
    //     location: "Grand Expo Hall",
    //     category: "Marketing",
    // },
    // {
    //     date: "MAY 01",
    //     title: "AI in Business Summit",
    //     description: "Explore the impact of Artificial Intelligence on modern businesses. Case studies from Fortune 500 companies implementing AI solutions.",
    //     time: "1:00 PM - 5:00 PM",
    //     location: "Tech Park Auditorium",
    //     category: "AI",
    // },
    // {
    //     date: "MAY 18",
    //     title: "Youth Coding Challenge",
    //     description: "A fun and challenging coding competition for young developers aged 12-18. Prizes include scholarships and tech gadgets.",
    //     time: "10:00 AM - 2:00 PM",
    //     location: "Community Center",
    //     category: "Education",
    // },
];

const EventPage = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleEvents, setVisibleEvents] = useState(6);
    const [isScrolled, setIsScrolled] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [categories, setCategories] = useState(["All", "Technology", "Business", "Cybersecurity", "Marketing", "AI", "Education"]);

    // Intersection observer for scroll animations
    const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [ctaRef, ctaInView] = useInView({ threshold: 0.1, triggerOnce: true });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const filtered = events
            .filter(event =>
                (activeCategory === "All" || event.category === activeCategory) &&
                (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    event.description.toLowerCase().includes(searchQuery.toLowerCase())
                ))
            .slice(0, visibleEvents);

        setFilteredEvents(filtered);
    }, [activeCategory, searchQuery, visibleEvents]);

    const loadMoreEvents = () => {
        setVisibleEvents(prev => prev + 6);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar scrolled={isScrolled} />

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative overflow-hidden bg-gradient-to-br from-[#0d0d0d] to-[#1a0a00] pt-32 pb-28"
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMyYTI4MjgiIHN0cm9rZS13aWR0aD0iMC41Ij48cGF0aCBkPSJNIDAgMCBMIDEwMCAwIDEwMCAxMDAgMCAxMDAgWiIvPjxwYXRoIGQ9Ik0gMjAgMjAgTCA4MCAyMCA4MCA4MCAyMCA4MCIvPjxwYXRoIGQ9Ik0gNDAgNDAgTCA2MCA0MCA2MCA2MCA0MCA2MCIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,96,11,0.08)_0%,transparent_70%)]"></div>

                    {/* Floating Particles */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-[#F2600B] opacity-[0.15]"
                            style={{
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, (Math.random() - 0.5) * 100],
                                x: [0, (Math.random() - 0.5) * 50],
                                opacity: [0.1, 0.2, 0.1],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        className="text-center max-w-3xl mx-auto"
                        initial="hidden"
                        animate={heroInView ? "visible" : "hidden"}
                        variants={containerVariants}
                    >
                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight"
                            variants={itemVariants}
                        >
                            <span className="block">Experience the Future at</span>
                            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                                KRAFO SYSTEMS Events
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
                            variants={itemVariants}
                        >
                            Join industry leaders, innovators, and cybersecurity experts at our premier events designed to inspire and educate.
                        </motion.p>

                        {/* Enhanced Search Bar */}
                        <motion.div
                            className="relative max-w-2xl mx-auto"
                            variants={itemVariants}
                        >
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <motion.input
                                type="text"
                                placeholder="Search events by name, category, or keyword..."
                                className="block w-full pl-10 pr-3 py-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                whileFocus={{
                                    boxShadow: "0 0 0 3px rgba(242, 96, 11, 0.3)",
                                    scale: 1.01
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-[#0a0a0a] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                    {/* Enhanced Category Filter */}
                    <motion.div
                        className="mb-12 overflow-x-auto pb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="flex space-x-2 min-w-max">
                            {categories.map((category) => (
                                <motion.button
                                    key={category}
                                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${activeCategory === category
                                            ? "bg-gradient-to-r from-[#F2600B] to-orange-500 text-black font-semibold shadow-lg shadow-orange-500/20"
                                            : "bg-black/30 text-gray-300 hover:bg-white/10 hover:text-white"
                                        }`}
                                    onClick={() => setActiveCategory(category)}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: activeCategory !== category ? "0 4px 15px -5px rgba(242, 96, 11, 0.3)" : "none"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {category}
                                    {activeCategory === category && (
                                        <motion.span
                                            className="ml-2"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </motion.span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Event Cards Grid */}
                    {filteredEvents.length > 0 ? (
                        <>
                            <motion.div
                                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <AnimatePresence>
                                    {filteredEvents.map((event, index) => (
                                        <motion.div
                                            key={`${event.title}-${index}`}
                                            variants={itemVariants}
                                            layout
                                            whileHover={{
                                                y: -5,
                                                transition: { duration: 0.3 }
                                            }}
                                        >
                                            <EventCard
                                                {...event}
                                                featured={event.featured}
                                                className={event.featured ? "sm:col-span-2" : ""}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>

                            {/* Load More Button */}
                            {visibleEvents < events.length && (
                                <div className="flex justify-center mt-16">
                                    <motion.button
                                        className="px-8 py-4 bg-gradient-to-r from-black to-black rounded-lg text-white font-medium border border-orange-500/30 hover:border-orange-500/60 relative overflow-hidden group transition-all duration-300"
                                        onClick={loadMoreEvents}
                                        whileHover={{
                                            y: -3,
                                            boxShadow: "0 10px 25px -5px rgba(242, 96, 11, 0.5)"
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="relative z-10 flex items-center">
                                            Load More Events
                                            <motion.span
                                                className="ml-2"
                                                animate={{
                                                    rotate: [0, 360],
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </motion.span>
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#F2600B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </motion.button>
                                </div>
                            )}
                        </>
                    ) : (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-block p-8 bg-black/30 rounded-xl border border-white/10 backdrop-blur-sm">
                                <motion.div
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                        y: [0, -5, 5, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                >
                                    <svg className="w-20 h-20 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </motion.div>
                                <h3 className="mt-6 text-2xl font-medium text-gray-300">No events found</h3>
                                <p className="mt-3 text-gray-500 max-w-md mx-auto">
                                    Try adjusting your search or filter criteria. We add new events regularly!
                                </p>
                                <motion.button
                                    className="mt-6 px-6 py-2 text-orange-500 border border-orange-500/30 rounded-lg hover:bg-orange-500/10 transition-colors duration-300"
                                    onClick={() => {
                                        setActiveCategory("All");
                                        setSearchQuery("");
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Reset Filters
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Enhanced CTA Section */}
            {/* <section
                ref={ctaRef}
                className="relative bg-gradient-to-r from-[#1a0a00] to-[#0d0400] py-24 overflow-hidden"
            > */}
                {/* Animated background elements */}
                {/* <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMyYTI4MjgiIHN0cm9rZS13aWR0aD0iMC41Ij48cGF0aCBkPSJNIDAgMCBMIDEwMCAwIDEwMCAxMDAgMCAxMDAgWiIvPjxwYXRoIGQ9Ik0gMjAgMjAgTCA4MCAyMCA4MCA4MCAyMCA4MCIvPjxwYXRoIGQ9Ik0gNDAgNDAgTCA2MCA0MCA2MCA2MCA0MCA2MCIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,96,11,0.05)_0%,transparent_70%)]"></div> */}

                    {/* Floating elements */}
                    {/* <motion.div
                        className="absolute top-20 left-1/4 w-8 h-8 bg-[#F2600B] rounded-full blur-xl opacity-20"
                        animate={{
                            y: [0, -20, 0],
                            x: [0, 10, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-40 right-1/3 w-10 h-10 bg-[#F2600B] rounded-full blur-xl opacity-15"
                        animate={{
                            y: [0, 15, 0],
                            x: [0, -15, 0]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: 2
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        animate={ctaInView ? "visible" : "hidden"}
                        variants={containerVariants}
                    >
                        <motion.h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
                            variants={itemVariants}
                        >
                            <span className="block">Host Your Event With Us</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">World-Class Facilities</span>
                        </motion.h2>

                        <motion.p
                            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
                            variants={itemVariants}
                        >
                            Our state-of-the-art facilities and cybersecurity infrastructure provide the perfect venue for your next conference, workshop, or summit.
                        </motion.p>

                        <motion.div variants={itemVariants}>
                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-[#F2600B] to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 25px -5px rgba(242, 96, 11, 0.8)"
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10">Inquire About Venue Booking</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-[#F2600B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div> */}
            {/* </section> */}

            <Footer />
        </div>
    );
};

export default EventPage;