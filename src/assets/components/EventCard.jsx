import React from "react";
import { MapPin, Clock } from "lucide-react";




export default function EventCard({ date, title, description, time, location, category }) {
  return (
    <div className="bg-gray-300 border rounded-xl shadow-xl hover:shadow-lg transition p-4 w-full max-w-sm">
      <div className="flex items-center justify-between text-xs text-white mb-2">
        <span className="bg-black px-2 py-1 rounded">{date}</span>
        <span className="text-gray-500">{category}</span>
      </div>
      <h3 className="font-bold text-md text-black mb-1">{title}</h3>
      <p className="text-sm text-gray-700 mb-3">{description}</p>
      <div className="flex items-center text-sm text-gray-600 gap-1 mb-1">
        <Clock className="w-4 h-4" />
        <span>{time}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 gap-1 mb-3">
        <MapPin className="w-4 h-4" />
        <span>{location}</span>
      </div>
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm w-full">
        Register
      </button>
    </div>
  );
}
