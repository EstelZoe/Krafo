
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ToolkitNavbar from "./components/ToolkitNavbar";
import ParticleNetwork from "./components/ParticleNetwork";
import { ArrowRight } from "lucide-react";



// ── Reusable Components ─────────────────────────────────────────────────────



function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 115, 0, 0.32), rgba(139, 92, 246, 0.22), rgba(14, 165, 233, 0.16), transparent 36%)`,
      }}
    />
  );
}

function AnimatedHeading() {
  return (
    <div className="text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-orange-500">
        Cybersecurity Risk
      </h1>

      <h1 className="text-5xl md:text-6xl font-bold">
        Assessment Toolkit
      </h1>

      <p className="mt-4 text-gray-400 max-w-xl mx-auto">
        Discover gaps, measure risk, and get a clear report to improve your organization’s cyber safety.
      </p>
    </div>
  );
}

export default function CyberAssessmentToolkitHome() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-white">
      <ParticleNetwork />
      <MouseGlow />
      <ToolkitNavbar />

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[-12%] top-[-10%] h-[360px] w-[360px] rounded-full bg-orange-500/25 blur-[110px] sm:h-[480px] sm:w-[480px]" />
        <div className="absolute right-[-15%] top-[20%] h-[360px] w-[360px] rounded-full bg-violet-600/25 blur-[120px] sm:h-[520px] sm:w-[520px]" />
        <div className="absolute bottom-[-18%] left-[35%] h-[360px] w-[360px] rounded-full bg-sky-500/20 blur-[120px] sm:h-[500px] sm:w-[500px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      </div>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center mt-[-40px]">


          <div className="mt-[-100px]">
            <AnimatedHeading />
          </div>


<div className="relative mt-12 flex w-full justify-center lg:mt-16">
            <motion.a
              href="/assessment-toolkit/start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: [0, -6, 0],
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 1.25 },
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }
              }}
              whileHover={{ scale: 1.08, y: -10, boxShadow: "0 20px 50px -10px rgba(249, 115, 22, 0.5), 0 0 40px rgba(249, 115, 22, 0.2)" }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-10 py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              Take a Free Assessment
              <ArrowRight size={20} />
            </motion.a>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </main>
  );
}


