
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ToolkitNavbar from "./components/ToolkitNavbar";
// import Footer from "../../assets/components/Footer";
import ParticleNetwork from "./components/ParticleNetwork";
import { ShieldCheck, FileText, ArrowRight, LockKeyhole } from "lucide-react";



// ── Reusable Components ─────────────────────────────────────────────────────




function CyberNetworkBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-[size:34px_34px] animate-[networkMove_18s_linear_infinite]" />

      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,115,0,0.12),transparent)] animate-[networkGlow_8s_ease-in-out_infinite]" />
    </div>
  );
}



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
  const words = "CYBER SECURITY ASSESSMENT TOOLKIT".split(" ");

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

function FloatingActionCard({
  title,
  description,
  icon: Icon,
  href,
  primary = false,
  className = "",
  delay = 0,
}) {
  const [text, setText] = useState("");
  const fullText = description;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, [fullText]);
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 42, scale: 0.96 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -14, 0],
        x: primary ? [0, 10, 0] : [0, -10, 0],
        rotate: primary ? [0, 1.5, 0] : [0, -1.5, 0],
      }}
      transition={{
        opacity: { duration: 0.7, delay },
        scale: { duration: 0.7, delay },
        y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay },
        x: { duration: 9, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 10, repeat: Infinity, ease: "easeInOut", delay },
      }}
      whileHover={{ scale: 1.04, y: -8 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full overflow-hidden rounded-3xl border  text-left shadow-2xl backdrop-blur-xl transition duration-300 w-full md:w-[480px] lg:w-[520px] min-h-[260px] p-10 flex items-center justify-center ${primary
        ? "border-orange-400/40 bg-orange-500/15 shadow-orange-500/20 hover:border-orange-300 hover:shadow-[0_0_120px_rgba(249,115,22,0.9)]"
        : "border-white/15 bg-white/10 shadow-black/30 hover:border-sky-300 hover:shadow-[0_0_120px_rgba(56,189,248,0.85)]"
        } ${className}`}
    >
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-400/25 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-sky-400/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-5 text-center min-h-[180px]">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-110 ${primary
            ? "bg-orange-400 text-black group-hover:shadow-[0_0_35px_rgba(249,115,22,0.95)]"
            : "bg-white/10 text-white group-hover:shadow-[0_0_35px_rgba(56,189,248,0.85)]"
            }`}
        >
          <Icon size={24} />
        </div>

        <div className="min-w-0">

          <h2 className="text-xl font-bold uppercase tracking-wide text-white sm:text-2xl">
            {title}
          </h2>

         
        </div>
        <ArrowRight className="ml-auto mt-1 shrink-0 text-white/60 transition group-hover:translate-x-1 group-hover:text-white" size={20} />
      </div>
    </motion.a>
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
            <FloatingActionCard
              href="#assessment"
              title="Start Free Assessment"
              description="Begin a guided security check and see where your organization stands."
              icon={ShieldCheck}
              primary
              delay={1.25}
            />

            {/* <FloatingActionCard
              href="#example-report"
              title="See Example Report"
              description="Preview the kind of insight, scoring, and recommendations you will receive."
              icon={FileText}
              delay={1.45}
            /> */}
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </main>
  );
}


