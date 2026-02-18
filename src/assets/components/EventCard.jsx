import React from 'react';
import { motion } from 'framer-motion';

const EventCard = ({ dateRange, date, title, description, time, location, category, registrationUrl, image }) => {
  // Support both dateRange (from API) and date (legacy)
  const displayDate = dateRange || date;
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
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      <motion.div 
        className="h-full bg-black rounded-2xl overflow-hidden border border-white/10 flex flex-col group"
        whileHover={{
          boxShadow: "0 0 30px rgba(242, 96, 11, 0.2)",
          borderColor: "rgba(242, 96, 11, 0.4)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          {/* Date Ribbon */}
          <div className="absolute top-4 left-0 bg-[#F2600B] text-black font-bold px-4 py-2 rounded-r-lg z-10 shadow-lg shadow-orange-500/30">
            {displayDate}
          </div>
          <motion.img 
            src={image} 
            alt={title} 
            className="h-40 w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-4 gap-2">
              <h3 className="text-xl font-bold text-white group-hover:text-[#F2600B] transition-colors duration-300">
                {title}
              </h3>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${categoryColors[category] || "from-gray-600 to-gray-400"} text-black whitespace-nowrap`}>
                {category}
              </span>
            </div>
            
            <p className="text-gray-400 mb-6 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>
          
          {/* Meta Information */}
          <div className="border-t border-white/10 pt-4 space-y-3">
            <div className="flex items-center text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-[#F2600B]/10 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F2600B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{time}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-[#F2600B]/10 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F2600B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{location}</span>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-white/5 border-t border-white/10">
          <motion.a
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 text-sm bg-black rounded-lg font-semibold flex items-center justify-center border border-white/10"
            whileHover={{
              boxShadow: "0 0 20px rgba(242, 96, 11, 0.5)",
              borderColor: "rgba(242, 96, 11, 0.5)"
            }}
          >
            <span className="bg-gradient-to-r from-[#F2600B] to-orange-400 bg-clip-text text-transparent">
              Register Now
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-[#F2600B] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </div>

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,rgba(242,96,11,0.1),transparent_70%)] pointer-events-none"></div>
      </motion.div>
    </motion.div>
  );
};

export default EventCard;
