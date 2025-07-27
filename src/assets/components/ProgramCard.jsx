import React from "react";


export default function ProgramCard({ title, description, icon, buttonLabel }) {
    return (
        <div className="bg-white shadow-md rounded-2xl p-6 text-center space-y-4 border hover:shadow-lg transition duration-300">
            <div className="flex justify-center text-orange-500">{icon}</div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
            {buttonLabel && (
                <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800">
                    {buttonLabel}
                </button>
            )}
        </div>
    );
}
