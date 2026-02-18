import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../api/client";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import FilterButton from "../assets/components/FilterButton";
import BlogCard from "../assets/components/BlogCard";
import BgPic from "../assets/images/gradientbackground.jpg";


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
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [activeFilter, setActiveFilter] = useState("All Posts");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await apiClient.get("blogs");

                const postsArray = Array.isArray(data) ? data : data.posts || [];
                setPosts(postsArray);
                console.log(data)
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

    const handleReadMore = (id) => {
        navigate(`/blog/${id}`);
    };

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
                    {!loading ? (
                        filteredPosts.length > 0 ? (
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
                        )
                    ) : (
                        <p className="text-white col-span-full text-center">Loading posts...</p>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
}
