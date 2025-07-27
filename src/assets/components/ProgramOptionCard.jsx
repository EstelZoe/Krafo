import React from "react";

export default function ProgramOptionCard({ icon: Icon, title, description }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gray-100 hover:text-orange-600">
            <div className="flex justify-center items-center mb-4 text-black hover:text-orange-600">
                {Icon && <Icon size={40} />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <button className="bg-black hover:text-orange-500 text-white px-4 py-2 rounded transition">
                Learn More
            </button>
        </div>
    );
}
