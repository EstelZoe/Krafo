import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../api/client";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Linkedin, Link as LinkIcon } from "react-feather";
import Admin from "../assets/images/KRAFO ORIGINAL MARKAsset 73@3x.png";

const formatAuthor = (author) => {
  if (!author) return "KRAFO Team";
  if (typeof author === "object") {
    const name = `${author.firstName || ""} ${author.lastName || ""}`.trim();
    return name || "KRAFO Team";
  }
  return author;
};

const calculateReadTime = (content) => {
  if (!content) return "1 min read";
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get(`blogs/${id}`);
        setPost(data.post || data);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F2600B] border-t-transparent"></div>
            <p className="text-gray-400">Loading article...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
          <div className="text-6xl mb-6">📄</div>
          <h1 className="text-3xl font-bold mb-2">Article Not Found</h1>
          <p className="text-gray-400 mb-8 text-center">The blog post you're looking for doesn't exist or has been removed.</p>
          <motion.button
            onClick={() => navigate("/blog-page")}
            className="px-8 py-3 bg-[#F2600B] rounded-lg font-medium border border-[#F2600B]"
            whileHover={{ 
              boxShadow: "0 0 25px rgba(242, 96, 11, 0.6)",
            }}
          >
            Browse All Articles
          </motion.button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(242,96,11,0.08),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(242,96,11,0.05),transparent_50%)]"></div>
        </div>

        {/* Hero Section */}
        <div className="relative pt-20">
          {post.thumbnail ? (
            <div className="relative h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
            </div>
          ) : (
            <div className="h-[200px] bg-gradient-to-b from-[#F2600B]/10 to-black" />
          )}
          
          {/* Back Button */}
          <motion.button
            onClick={() => navigate("/blog-page")}
            className="absolute top-28 left-4 md:left-8 flex items-center gap-2 px-5 py-2.5 bg-black/60 backdrop-blur-sm rounded-full text-white border border-white/10 group"
            whileHover={{ 
              boxShadow: "0 0 20px rgba(242, 96, 11, 0.4)",
              borderColor: "rgba(242, 96, 11, 0.5)"
            }}
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-[#F2600B]" />
            <span className="font-medium">Back</span>
          </motion.button>
        </div>

        {/* Main Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 relative z-10">
          {/* Article Card */}
          <motion.div 
            className="bg-black/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              boxShadow: "0 0 40px rgba(242, 96, 11, 0.15)",
              borderColor: "rgba(242, 96, 11, 0.3)"
            }}
          >
            {/* Article Header */}
            <div className="p-6 md:p-10">
              {/* Category & Read Time */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {post.category && (
                  <span className="px-4 py-1.5 bg-[#F2600B] text-black text-sm font-bold rounded-full">
                    {post.category}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Clock size={14} className="text-[#F2600B]" />
                  {calculateReadTime(post.content)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Author & Meta Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {post.author?.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={formatAuthor(post.author)}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#F2600B]/50"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center border-2 border-[#F2600B]/50">
                        <img src={Admin} alt="Author" className="w-9 h-9" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">{formatAuthor(post.author)}</p>
                    <p className="text-sm text-[#F2600B]">Cybersecurity Expert</p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <Calendar size={16} className="text-[#F2600B]" />
                  <span className="text-sm">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Description/Excerpt */}
              {post.description && (
                <p className="text-xl text-gray-300 mt-6 leading-relaxed font-light italic border-l-4 border-[#F2600B] pl-4 bg-white/5 py-4 pr-4 rounded-r-lg">
                  {post.description}
                </p>
              )}
            </div>

            {/* Article Content */}
            <div className="px-6 md:px-10 pb-10">
              <article
                className="blog-content text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              />
            </div>

            {/* Share Section */}
            <div className="px-6 md:px-10 py-6 bg-white/5 border-t border-white/10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-gray-400 font-medium">Share this article</p>
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={shareOnTwitter}
                    className="p-3 bg-black rounded-full border border-white/10"
                    whileHover={{ 
                      boxShadow: "0 0 15px rgba(242, 96, 11, 0.5)",
                      borderColor: "rgba(242, 96, 11, 0.5)",
                      scale: 1.1
                    }}
                    title="Share on X"
                  >
                    {/* X (formerly Twitter) icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#F2600B]">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={shareOnLinkedIn}
                    className="p-3 bg-black rounded-full border border-white/10"
                    whileHover={{ 
                      boxShadow: "0 0 15px rgba(242, 96, 11, 0.5)",
                      borderColor: "rgba(242, 96, 11, 0.5)",
                      scale: 1.1
                    }}
                    title="Share on LinkedIn"
                  >
                    <Linkedin size={18} className="text-[#F2600B]" />
                  </motion.button>
                  <motion.button
                    onClick={handleShare}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all ${
                      copied 
                        ? 'bg-green-600 border-green-500 text-white' 
                        : 'bg-black border-white/10'
                    }`}
                    whileHover={!copied ? { 
                      boxShadow: "0 0 15px rgba(242, 96, 11, 0.5)",
                      borderColor: "rgba(242, 96, 11, 0.5)"
                    } : {}}
                    title="Copy link"
                  >
                    <LinkIcon size={16} className={copied ? 'text-white' : 'text-[#F2600B]'} />
                    <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="relative py-20 mt-16 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,96,11,0.1),transparent_60%)]"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay <span className="text-[#F2600B]">Cyber</span> Aware
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
              Explore more insights, tips, and expert analysis from our cybersecurity team.
            </p>
            <motion.button
              onClick={() => navigate("/blog-page")}
              className="px-10 py-4 bg-[#F2600B] text-black rounded-lg font-bold text-lg border border-[#F2600B]"
              whileHover={{ 
                boxShadow: "0 0 30px rgba(242, 96, 11, 0.6)",
                scale: 1.05
              }}
              transition={{ duration: 0.2 }}
            >
              View All Articles
            </motion.button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
