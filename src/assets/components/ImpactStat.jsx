import React from "react";

export default function ImpactStat({ value, label }) {
    return (
        <div className="text-center border  bg-black border-orange-500/20 bg-gradient-to-br from-black to-gray-900 hover:shadow-orange-600 hover:scale-[1.02] transition-transform duration-300  rounded-xl shadow-md p-6  ">
            <p className="text-3xl font-bold text-orange-600">{value}</p>
            <p className="text-white text-sm mt-2">{label}</p>
        </div>
    );
}

// bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-orange-600/40 inline-flex items-center"

// border border-[#F2600B33] bg-gradient-to-br from-[#1a1a1a] to-[#000000] backdrop-blur-md shadow-xl hover:shadow-orange-600/30 hover:scale-[1.02] transition-transform duration-300