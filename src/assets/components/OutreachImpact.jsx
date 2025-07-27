import React from "react";
import CountUp from "react-countup";

// This is the individual stat card. I've renamed it from `ImpactStat` to
// `OutreachStatCard` to avoid confusion with the other `ImpactStat` component
// and to be more descriptive.
function OutreachStatCard({ end, label, Icon }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 text-center w-64 transition duration-300 hover:shadow-xl hover:scale-105">
            <div className="flex justify-center mb-4 text-blue-600">
               <Icon className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold text-blue-600 mb-2">
                <CountUp end={end} duration={2.5} separator="," />+
            </h2>
            <p className="text-gray-700 font-medium">{label}</p>
        </div>
    );
}

// This is the main component that will be imported. It was missing before.
// It takes the `stats` array and maps over it to render the cards.
export default function OutreachImpact({ stats }) {
    return (
        <div className="flex flex-wrap justify-center gap-8">
            {stats.map((stat, index) => (
                <OutreachStatCard key={index} {...stat} />
            ))}
        </div>
    );
}
