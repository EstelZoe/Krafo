// import React, { useEffect, useRef, useState } from "react";


// const DEFAULT_ITEMS = [
//     {
//         name: "Kwame Mensah",
//         title: "Cybersecurity Strategist",
//         company: "Krafo Systems",
//         summary:
//             "With 12+ years securing fintech and public sector systems, Kwame blends risk management with hands‑on incident response to build defenses that actually hold up.",
//         videoSrc: "https://www.youtube.com/watch?v=uGyWgktVfYM", // Replace with your file path
//         poster: "/posters/partner1.jpg",
//     },
//     {
//         name: "Ama Boateng",
//         title: "Cloud Security Architect",
//         company: "SecureEdge",
//         summary:
//             "Ama designs zero‑trust architectures and migration blueprints for enterprises scaling securely on multi‑cloud.",
//         videoSrc: "https://www.youtube.com/watch?v=uGyWgktVfYM",
//         poster: "/posters/partner2.jpg",
//     },
//     {
//         name: "Kofi Asare",
//         title: "GRC Lead Consultant",
//         company: "TrustLine",
//         summary:
//             "Kofi aligns policy with practice—mapping controls to business goals and coaching teams to sustain compliance.",
//         videoSrc: "https://www.youtube.com/watch?v=uGyWgktVfYM",
//         poster: "/posters/partner3.jpg",
//     },
// ];

// export default function PartnershipCarousel({
//     items = DEFAULT_ITEMS,
//     autoRotate = true,
//     intervalMs = 7000,
// }) {
//     const [current, setCurrent] = useState(0);
//     const [isUserInteracting, setIsUserInteracting] = useState(false);
//     const videoRefs = useRef([]); // HTMLVideoElement[]

//     // Pause all videos except the active one (which stays paused until hover/click)
//     useEffect(() => {
//         videoRefs.current.forEach((v, idx) => {
//             if (!v) return;
//             try {
//                 if (idx !== current) {
//                     v.pause();
//                     v.currentTime = 0;
//                     v.muted = true; // reset to muted state
//                 } else {
//                     // Ensure active slide doesn't auto-play with sound
//                     v.pause();
//                     v.muted = true;
//                 }
//             } catch { }
//         });
//     }, [current]);

//     // Auto-rotate (pauses when the user interacts with controls)
//     useEffect(() => {
//         if (!autoRotate || isUserInteracting) return;
//         const id = setInterval(() => {
//             setCurrent((c) => (c + 1) % items.length);
//         }, intervalMs);
//         return () => clearInterval(id);
//     }, [autoRotate, intervalMs, items.length, isUserInteracting]);

//     const goTo = (idx) => {
//         setCurrent((idx + items.length) % items.length);
//     };

//     const next = () => {
//         setIsUserInteracting(true);
//         goTo(current + 1);
//     };

//     const prev = () => {
//         setIsUserInteracting(true);
//         goTo(current - 1);
//     };

//     const handleMouseEnter = (idx) => {
//         const v = videoRefs.current[idx];
//         if (!v) return;
//         try {
//             v.muted = true; // preview muted on hover
//             v.play().catch(() => { });
//         } catch { }
//     };

//     const handleMouseLeave = (idx) => {
//         const v = videoRefs.current[idx];
//         if (!v) return;
//         try {
//             // Pause when leaving to avoid background playback
//             v.pause();
//         } catch { }
//     };

//     const handleClickToggleSound = (idx) => {
//         const v = videoRefs.current[idx];
//         if (!v) return;
//         setIsUserInteracting(true);
//         try {
//             if (v.paused) {
//                 // first click: play with sound
//                 v.muted = false;
//                 v.play().catch(() => { });
//             } else {
//                 // toggle mute state if already playing
//                 v.muted = !v.muted;
//                 if (!v.muted) {
//                     v.play().catch(() => { });
//                 }
//             }
//         } catch { }
//     };

//     return (
//         <section className="w-full bg-black text-white py-16 px-6 md:px-12 lg:px-20">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//                 {/* LEFT: Fade Carousel (Video) */}
//                 <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-neutral-900">
//                     {items.map((item, idx) => (
//                         <div
//                             key={idx}
//                             className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === current ? "opacity-100" : "opacity-0 pointer-events-none"
//                                 }`}
//                         >
//                             <div className="relative w-full h-full">
//                                 <iframe
//                                     className="w-full h-full rounded-2xl"
//                                     src={item.videoSrc.replace("watch?v=", "embed/")}
//                                     title={item.name}
//                                     frameBorder="0"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                     allowFullScreen
//                                 ></iframe>

//                                 {/* Overlay CTA */}
//                                 <div className="pointer-events-none absolute inset-0 flex items-end md:items-center justify-center bg-gradient-to-t from-black/50 via-black/10 to-transparent">
//                                     <div className="mb-4 md:mb-0 md:rounded-full md:px-4 md:py-2 px-3 py-2 bg-black/50 backdrop-blur-sm border border-white/10 text-sm md:text-base">
//                                         <span className="hidden md:inline">Hover to preview • </span>
//                                         Click/Tap for sound
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}

//                     {/* Controls */}
//                     <button
//                         aria-label="Previous"
//                         onClick={prev}
//                         className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 border border-white/15 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                             <path d="M15.75 19.5L8.25 12l7.5-7.5" />
//                         </svg>
//                     </button>
//                     <button
//                         aria-label="Next"
//                         onClick={next}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 border border-white/15 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                             <path d="M8.25 4.5L15.75 12l-7.5 7.5" />
//                         </svg>
//                     </button>

//                     {/* Dots */}
//                     <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
//                         {items.map((_, i) => (
//                             <button
//                                 key={i}
//                                 aria-label={`Go to slide ${i + 1}`}
//                                 onClick={() => {
//                                     setIsUserInteracting(true);
//                                     goTo(i);
//                                 }}
//                                 className={`h-2 w-2 rounded-full border border-white/50 transition-all ${i === current ? "w-6 bg-white" : "bg-white/30 hover:bg-white/50"
//                                     }`}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 {/* RIGHT: Synced Dark Card (glows on hover) */}
//                 <div className="group">
//                     <article
//                         aria-live="polite"
//                         className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 md:p-8 transition shadow-lg hover:shadow-[0_0_50px_rgba(251,146,60,0.35)] hover:border-orange-500/40"
//                     >
//                         <div className="flex items-center gap-3 mb-4">
//                             <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-400" />
//                             <div>
//                                 <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
//                                     {items[current]?.name}
//                                 </h3>
//                                 <p className="text-sm text-white/70">
//                                     {[items[current]?.title, items[current]?.company].filter(Boolean).join(" • ")}
//                                 </p>
//                             </div>
//                         </div>

//                         <p className="text-white/90 leading-relaxed text-base md:text-lg">
//                             {items[current]?.summary}
//                         </p>

//                         <div className="mt-6 flex items-center gap-3">
//                             <button
//                                 onClick={prev}
//                                 className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
//                             >
//                                 Previous
//                             </button>
//                             <button
//                                 onClick={next}
//                                 className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </article>
//                 </div>
//             </div>
//         </section>
//     );
// }







import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react"; 
import Pic from "../images/krafowhite.png";

export default function PartnerVideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/partner1.mp4" // local file path
        poster={Pic} 
        muted
        playsInline
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="bg-black/60 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl max-w-xl text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F2600B]">
            Kwame Mensah
          </h2>
          <p className="text-gray-300 text-sm md:text-base mt-2">
            Cybersecurity Strategist at Krafo Systems
          </p>
          <p className="mt-6 text-base md:text-lg leading-relaxed">
            With 12+ years securing fintech and public sector systems, Kwame blends
            risk management with hands-on incident response to build defenses that
            actually hold up.
          </p>

          {/* Play / Pause Button */}
          <button
            onClick={handleToggle}
            className="mt-8 flex items-center gap-2 px-6 py-3 bg-[#F2600B] text-black font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-[0_0_30px_#F2600Baa] transition-all duration-300 mx-auto"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" /> Pause Video
              </>
            ) : (
              <>
                <Play className="w-5 h-5" /> Play Video
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
