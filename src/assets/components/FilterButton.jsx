import React from "react";

export default function FilterButton({ label }) {
    return (
        <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition">
            {label}
        </button>
    );
}
