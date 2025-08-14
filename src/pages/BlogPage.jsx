import React, { useState, useEffect } from "react";
import { apiClient } from "../api/client";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import DOMPurify from "dompurify";
import FilterButton from "../assets/components/FilterButton";
import BlogCard from "../assets/components/BlogCard";
import BgPic from "../assets/images/gradientbackground.jpg";
import { X, User } from "react-feather";
import Admin from "../assets/images/KRAFO ORIGINAL MARKAsset 73@3x.png";


// Helper function to format author name
const formatAuthor = (author) => {
    if (!author) return "Unknown";
    if (typeof author === "object") {
        const name = `${author.firstName || ""} ${author.lastName || ""}`.trim();
        return name || "Unknown";
    }
    return author;
};

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [activeFilter, setActiveFilter] = useState("All Posts");
    const [selectedPost, setSelectedPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await apiClient.get("blog");
                const postsArray = Array.isArray(data) ? data : data.posts || [];
                setPosts(postsArray);
            } catch (error) {
                console.error("Error fetching blog posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const categories = ["All Posts", ...new Set(posts.map(post => post.category))];
    const filteredPosts = activeFilter === "All Posts"
        ? posts
        : posts.filter(post => post.category === activeFilter);

    const handleReadMore = async (id) => {
        try {
            const { data } = await apiClient.get(`blog/${id}`);
            setSelectedPost(data.post || data);
        } catch (error) {
            console.error("Error fetching single post:", error);
        }
    };

    // Close modal when clicking outside content
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setSelectedPost(null);
        }
    };

    // Close modal with Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setSelectedPost(null);
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <>
            <Navbar />
            <div className="bg-white min-h-screen text-black">
                {/* Hero Section */}
                <div
                    className="relative flex items-center justify-center text-center bg-cover bg-center bg-no-repeat text-white h-[380px] md:h-[480px]"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url(${BgPic})`,
                    }}
                >
                    <div className="relative z-10 p-4">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8">
                            Thoughts from the <span className="text-[#F2600B]">Cyber</span> Frontline
                        </h1>
                        <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto">
                            Stay informed with the latest cybersecurity insights, tips, and security news from our expert team.
                        </p>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 py-12 bg-black">
                    {categories.map((category, i) => (
                        <FilterButton
                            key={i}
                            label={category}
                            onClick={() => setActiveFilter(category)}
                            isActive={activeFilter === category}
                        />
                    ))}
                </div>

                {/* Blog Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6 md:px-12 pb-16 bg-black">
                    {loading ? (
                        <p className="text-white col-span-full text-center">Loading posts...</p>
                    ) : filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <BlogCard
                                key={post._id}
                                title={post.title}
                                description={post.description?.substring(0, 100) + "..."}
                                category={post.category}
                                author={formatAuthor(post.author)}
                                date={new Date(post.createdAt).toLocaleDateString()}
                                image={post.thumbnail}
                                onReadMore={() => handleReadMore(post._id)}
                            />
                        ))
                    ) : (
                        <p className="text-white col-span-full text-center">No posts found.</p>
                    )}
                </div>

                {/* Floating Modal */}
                {selectedPost && (
                    <div
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={handleBackdropClick}
                    >
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 max-w-4xl w-full rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                            {/* Header with close button */}
                            <div className="flex justify-between items-center p-4 bg-black/30 border-b border-gray-800">
                                <div className="flex items-center space-x-2">
                                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm">
                                        {selectedPost.category}
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                        {new Date(selectedPost.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <button
                                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                                    onClick={() => setSelectedPost(null)}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Scrollable content */}
                            <div className="overflow-y-auto flex-grow">
                                {/* Thumbnail */}
                                {selectedPost.thumbnail && (
                                    <img
                                        src={selectedPost.thumbnail}
                                        alt={selectedPost.title}
                                        className="w-full h-64 object-cover"
                                    />
                                )}

                                <div className="p-6">
                                    {/* Title */}
                                    <h1 className="text-3xl font-bold text-white mb-4">
                                        {selectedPost.title}
                                    </h1>

                                    {/* Author */}
                                    <div className="flex items-center mb-6">
                                        {selectedPost.author?.avatar ? (
                                            <img
                                                src={selectedPost.author.avatar}
                                                alt={formatAuthor(selectedPost.author)}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                                <img src={Admin} alt="User Icon" size={20} className="text-gray-400" />
                                            </div>
                                        )}
                                        <div className="ml-3">
                                            <p className="font-medium text-white">
                                                {formatAuthor(selectedPost.author)}
                                            </p>
                                            <p className="text-sm text-gray-400">Security Expert</p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div
                                        className="prose prose-invert max-w-none text-gray-300"
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedPost.content) }}
                                    />
                                </div>
                            </div>

                            {/* Footer with social sharing */}
                            <div className="p-4 bg-black/30 border-t border-gray-800 flex justify-between">
                                <div className="text-gray-400 text-sm">
                                    {selectedPost.body
                                        ? `${Math.ceil(selectedPost.body.split(/\s+/).length / 200)} min read`
                                        : 'Quick read'}
                                </div>
                                <div className="flex space-x-3">
                                    {/* <button className="text-gray-400 hover:text-blue-400 transition-colors">
                                        <InstagramIcon />
                                    </button> */}
                                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                        <LinkedInIcon />
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-300 transition-colors">
                                        <LinkIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </>
    );
}

// Simple icon components (replace with actual icons if available)
const LinkedInIcon = () => (
    <a
        href="https://www.linkedin.com/company/krafo-systems/?originalSubdomain=gh"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit our LinkedIn page"
        className="inline-block hover:opacity-80 transition-opacity"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-[#0A66C2]" // LinkedIn brand blue
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    </a>
);

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);
