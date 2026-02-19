import React, { useState, useEffect } from "react";
import EventCard from "../assets/components/EventCard";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { apiClient } from "../api/client";

const EventPage = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleEvents, setVisibleEvents] = useState(6);
    const [isScrolled, setIsScrolled] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [categories, setCategories] = useState(["All", "Technology", "Business", "Cybersecurity", "Marketing", "AI", "Education"]);
    
    // API state management
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Intersection observer for scroll animations
    const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [ctaRef, ctaInView] = useInView({ threshold: 0.1, triggerOnce: true });

    // Fetch events from API on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await apiClient.get('/events');
                
                // Handle different response structures
                const eventsData = response.data.events || response.data || [];
                setEvents(eventsData);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError(err.message || 'Failed to load events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

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
    }, [activeCategory, searchQuery, visibleEvents, events]);

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

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="inline-block p-8 bg-black/30 rounded-xl border border-white/10 backdrop-blur-sm">
                                <motion.div
                                    animate={{
                                        rotate: 360
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </motion.div>
                                <p className="mt-4 text-gray-300">Loading events...</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="inline-block p-8 bg-red-900/20 rounded-xl border border-red-500/30 backdrop-blur-sm max-w-md">
                                <svg className="w-12 h-12 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-xl font-medium text-red-400 mb-2">Error Loading Events</h3>
                                <p className="text-gray-300">{error}</p>
                                <button
                                    className="mt-4 px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
                                    onClick={() => window.location.reload()}
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Event Cards Grid */}
                    {!loading && !error && filteredEvents.length > 0 && (
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
                                            key={`${event._id || event.title}-${index}`}
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
                                        className="px-8 py-4 bg-black rounded-xl text-white font-semibold border border-white/10 relative overflow-hidden group"
                                        onClick={loadMoreEvents}
                                        whileHover={{
                                            boxShadow: "0 0 30px rgba(242, 96, 11, 0.5)",
                                            borderColor: "rgba(242, 96, 11, 0.5)"
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="relative z-10 flex items-center">
                                            <span className="bg-gradient-to-r from-[#F2600B] to-orange-400 bg-clip-text text-transparent font-bold">
                                                Load More Events
                                            </span>
                                            <svg className="w-5 h-5 ml-2 text-[#F2600B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </motion.button>
                                </div>
                            )}
                        </>
                    )}

                    {/* No Events Found */}
                    {!loading && !error && filteredEvents.length === 0 && (
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
                                    className="mt-6 px-6 py-2.5 bg-black border border-white/10 rounded-lg font-medium"
                                    onClick={() => {
                                        setActiveCategory("All");
                                        setSearchQuery("");
                                    }}
                                    whileHover={{ 
                                        boxShadow: "0 0 20px rgba(242, 96, 11, 0.5)",
                                        borderColor: "rgba(242, 96, 11, 0.5)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="bg-gradient-to-r from-[#F2600B] to-orange-400 bg-clip-text text-transparent">
                                        Reset Filters
                                    </span>
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default EventPage;
