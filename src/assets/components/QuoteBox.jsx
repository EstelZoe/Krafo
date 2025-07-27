import React from "react";

export default function QuoteBox({ quote, author }) {
    return (
        <div className="bg-orange-100 text-orange-600 p-6 rounded-xl shadow-md text-center italic">
            <p className="mb-2">"{quote}"</p>
            <p className="font-semibold">— {author}</p>
        </div>
    );
}