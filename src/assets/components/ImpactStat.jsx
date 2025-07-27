import React from "react";

export default function ImpactStat({ value, label }) {
    return (
        <div className="text-center bg-white rounded-xl shadow-md p-6">
            <p className="text-3xl font-bold text-orange-600">{value}</p>
            <p className="text-gray-700 text-sm mt-2">{label}</p>
        </div>
    );
}