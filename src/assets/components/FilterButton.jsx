import React from "react";
import { motion } from "framer-motion";

export default function FilterButton({ label, onClick, isActive, count, disabled = false }) {
  return (
    <motion.button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={!disabled ? { y: -2, boxShadow: "0 10px 30px rgba(242,96,11,.25)" } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      viewport={{ once: true }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={[
        "relative inline-flex items-center gap-2 rounded-full px-5 py-2.5",
        "font-medium tracking-wide border backdrop-blur-md",
        "transition-all duration-300 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-orange-500/70 focus:ring-offset-2 focus:ring-offset-black",
        "shadow-lg shadow-orange-500/10",
        isActive
          ? "bg-orange-500 text-white border-orange-500 shadow-orange-500/30"
          : "border-orange-500 text-orange-400 bg-white/5 hover:bg-orange-500/10",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      <span>{label}</span>

      {typeof count === "number" && (
        <span
          className={[
            "ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center",
            "rounded-full px-1.5 text-xs",
            isActive ? "bg-white/20 text-white" : "bg-orange-500/15 text-orange-300",
          ].join(" ")}
        >
          {count}
        </span>
      )}

      {/* subtle active ring */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-full ring-2 ring-orange-500/0 ${
          isActive ? "ring-orange-500/40" : ""
        }`}
      />
    </motion.button>
  );
}
