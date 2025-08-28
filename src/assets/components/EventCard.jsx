import React from 'react';
import { motion } from 'framer-motion';

const EventCard = ({ date, title, description, time, location, category, registrationUrl, image }) => {
  const categoryColors = {
    Technology: "from-blue-500 to-cyan-400",
    Business: "from-purple-500 to-indigo-400",
    Cybersecurity: "from-[#F2600B] to-orange-400",
    Marketing: "from-pink-500 to-rose-400",
    AI: "from-teal-500 to-emerald-400",
    Education: "from-yellow-500 to-amber-400",
  };
  
  return (
    <motion.div 
      className="h-full"
      whileHover={{ y: -10 }}
    >
      <div className="h-full bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] rounded-xl overflow-hidden border border-white/10 shadow-xl flex flex-col group hover:shadow-2xl transition-shadow">
        {/* Date Ribbon */}
        <div className="relative">
          <div className="absolute top-4 left-0 bg-gradient-to-r from-[#F2600B] to-orange-500 text-black font-bold px-4 py-2 rounded-r-lg z-10">
            {date}
          </div>
          <img src={image} alt={title} className="h-32 w-full object-cover" />
        </div>
        
        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                {title}
              </h3>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${categoryColors[category] || "from-gray-600 to-gray-400"} text-black`}>
                {category}
              </span>
            </div>
            
            <p className="text-gray-400 mb-6 text-sm">
              {description}
            </p>
          </div>
          
          {/* Meta Information */}
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center text-gray-300 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#F2600B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{time}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#F2600B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{location}</span>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-black/30 border-t border-white/10">
          <a
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 text-sm bg-gradient-to-r from-black/30 to-black/60 hover:from-black/40 hover:to-black/70 rounded-lg transition-all font-medium flex items-center justify-center group border border-white/10"
          >
            Register Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;