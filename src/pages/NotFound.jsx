import { Instagram, Linkedin, Youtube, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../assets/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <style>{`.hero-display{font-family:'Proxon',sans-serif;}`}</style>
      <Navbar />

      <section className="relative isolate flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        {/* Brand washes + faint grid, matching the rest of the site */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_35%,#F2600B1f,transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(#F2600B14_1px,transparent_1px)] [background-size:22px_22px] opacity-20"
        />

        {/* Oversized outlined 404, echoing the homepage process numerals */}
        <span
          aria-hidden="true"
          className="hero-display select-none text-[7rem] font-extrabold leading-none text-transparent md:text-[12rem]"
          style={{ WebkitTextStroke: "2px rgba(242,96,11,0.55)" }}
        >
          404
        </span>

        <h1 className="hero-display mt-4 text-3xl font-extrabold md:text-4xl">
          This page went <span className="text-[#F2600B]">dark.</span>
        </h1>
        <p className="mt-3 max-w-md text-balance text-gray-400">
          We can&apos;t find the page you&apos;re looking for — it may have moved,
          or the link might be out of date.
        </p>

        <Link
          to="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#F2600B] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#F2600B]/30 transition-all duration-300 hover:scale-[1.03] hover:bg-[#d94f00]"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
          Back to homepage
        </Link>

        <div className="mt-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Follow us
          </p>
          <div className="flex justify-center gap-5 text-[#F2600B]">
            <a href="https://www.instagram.com/krafosystems" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-[#ff8534]">
              <Instagram />
            </a>
            <a href="https://www.linkedin.com/company/krafosystems" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-[#ff8534]">
              <Linkedin />
            </a>
            <a href="https://www.youtube.com/@krafosystems" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-colors hover:text-[#ff8534]">
              <Youtube />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
