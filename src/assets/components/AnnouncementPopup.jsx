import { useEffect, useState } from "react";
import { apiClient } from "../../api/client";

export default function AnnouncementPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fetch active popup from API
  useEffect(() => {
    const fetchActivePopup = async () => {
      try {
        const { data } = await apiClient.get("popups/active");
        if (data && data.title) {
          setPopup(data);
          setShowPopup(true);
        }
      } catch (error) {
        console.error("Error fetching popup:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePopup();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!popup?.eventDate) return;

    const eventDate = new Date(popup.eventDate);
    
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
  }, [popup?.eventDate]);

  // Don't render if loading, no popup, or user closed it
  if (loading || !showPopup || !popup) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg sm:max-w-md relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 bg-black text-white rounded-full px-2 py-1 text-sm hover:bg-gray-800 z-10"
        >
          ✕
        </button>

        {/* Popup Image */}
        {popup.image && (
          <img 
            src={popup.image} 
            alt={popup.title} 
            className="w-full h-auto sm:max-h-[400px] object-contain" 
          />
        )}

        {/* Content Section */}
        <div className="p-4 text-center bg-black text-white">
          {/* Title */}
          <h3 className="text-xl font-bold mb-2">{popup.title}</h3>
          
          {/* Description */}
          {popup.description && (
            <p className="text-gray-300 text-sm mb-3">{popup.description}</p>
          )}

          {/* Countdown (if event date exists and countdown is enabled) */}
          {popup.eventDate && popup.countdownEnabled !== false && (
            <>
              <p className="text-lg font-semibold mb-2">Event starts in:</p>
              <div className="flex justify-center gap-4 text-xl font-bold mb-4">
                <div>{timeLeft.days}d</div>
                <div>{timeLeft.hours}h</div>
                <div>{timeLeft.minutes}m</div>
                <div>{timeLeft.seconds}s</div>
              </div>
            </>
          )}

          {/* Register Button */}
          {popup.registrationUrl && (
            <a
              href={popup.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-full font-semibold transition-colors"
            >
              Register Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
