import React from "react";
import { User, CalendarDays } from "lucide-react";

export default function BlogCard({ title, description, category, author, date, image }) {
    return (
        <div className="bg-white text-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition h-80">
            {/* Image Placeholder */}
            <div className="h-48 bg-gok but the card ray-300 flex items-center justify-center">
                <span className="text-gray-500">Image Placeholder</span>
            </div>

            {/* Content */}
            <div className="p-4">
                <p className="text-xs uppercase text-orange-500 mb-1">{category}</p>
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-sm text-gray-700 mb-4">{description}</p>
                <div className="flex justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {author}
                    </span>
                    <span className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {date}
                    </span>
                </div>
            </div>
        </div>
    );
}
