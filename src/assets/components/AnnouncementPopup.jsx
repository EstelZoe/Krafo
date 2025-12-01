import { useEffect, useState } from "react";
import agricyber from "../images/AgriCyber.jpeg";
import gdiw25 from "../images/gdiw25.jpeg";

export default function AnnouncementPopup() {
  const [showPopup, setShowPopup] = useState(true);

  // Correct event date: 14th Nov 2025, 1:10 PM
  const eventDate = new Date("2025-12-05T13:10:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const distance = eventDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg sm:max-w-md  relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 bg-black text-white rounded-full px-2 py-1 text-sm hover:bg-gray-800"
        >
          ✕
        </button>

        {/* Flier Image */}
        <img src={agricyber} alt="Seminar Announcement" className="w-full h-auto sm:5-[400px] object-contain" />

        {/* Countdown */}
        <div className="p-4 text-center bg-black text-white">
          <p className="text-lg font-semibold mb-2">Seminar starts in:</p>
          <div className="flex justify-center gap-4 text-xl font-bold">
            <div>{timeLeft.days}d</div>
            <div>{timeLeft.hours}h</div>
            <div>{timeLeft.minutes}m</div>
            <div>{timeLeft.seconds}s</div>
          </div>


          {/* Register Button */}
          <a
            href="https://egotickets.com/events/you-can-t-defend-yourself-if-you-can-t-feed-yourself"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-full font-semibold transition-colors"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
}
