
import React from "react";

export default function YouTubePlayer({ videoSrc, title }) {
  if (!videoSrc) return null;

  const embedUrl = videoSrc.includes("watch?v=")
    ? videoSrc.replace("watch?v=", "embed/")
    : videoSrc;

  return (
    <iframe
      className="w-full h-full rounded-2xl"
      src={`${embedUrl}?controls=0&showinfo=0&rel=0&modestbranding=1`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
