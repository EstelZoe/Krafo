import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ToolkitNavbar from "../components/ToolkitNavbar";
import Footer from "../../../assets/components/Footer";
import { ClipboardList, BarChart3, FileText, Search, ShieldCheck, Radar, Zap, RefreshCcw, } from "lucide-react";

export default function AssessmentToolkit() {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate("/assessment-toolkit/signup");
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Orange glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 
        w-[900px] h-[500px] 
        bg-orange-500/20 
        blur-[160px] 
        rounded-full"
      ></div>

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black to-black"></div>

      <div className="relative z-10">
        <ToolkitNavbar />

        {/* HOW IT WORKS */}
        <section className="relative pt-40 pb-24 px-6 border-t border-gray-800">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 
            w-[900px] h-[500px] 
            bg-orange-500/20 
            blur-[160px] 
            rounded-full"
          ></div>

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How the Assessment Works
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto mb-16">
              Our toolkit walks you through a structured evaluation of your
              cybersecurity posture and provides actionable insights.
            </p>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="group relative overflow-hidden bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-orange-400/80 hover:shadow-[0_0_120px_rgba(249,115,22,0.55)] hover:-translate-y-2 transition-all duration-500 ease-out">
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-500/25 blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />
                </div>
                <ClipboardList
                  className="text-orange-500 mb-4 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_18px_rgba(249,115,22,0.95)]"
                  size={32} />
                <h3 className="text-xl font-semibold mb-3 text-orange-500">
                  1. Questionnaire
                </h3>
                <p className="text-gray-400">
                  Complete a guided questionnaire covering key cybersecurity
                  areas like governance, risk management, and technical controls.
                </p>
              </div>

              <div className="group relative overflow-hidden bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-orange-400/80 hover:shadow-[0_0_120px_rgba(249,115,22,0.55)] hover:-translate-y-2 transition-all duration-500 ease-out">
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-500/25 blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />
                </div>
                <BarChart3 className="text-orange-500 mb-4 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_18px_rgba(249,115,22,0.95)]"
                  size={32} />
                <h3 className="text-xl font-semibold mb-3 text-orange-500">
                  2. Analyze
                </h3>
                <p className="text-gray-400">
                  Our system analyzes your responses and compares them with
                  industry best practices and security frameworks.
                </p>
              </div>

              <div className="group relative overflow-hidden bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-orange-400/80 hover:shadow-[0_0_120px_rgba(249,115,22,0.55)] hover:-translate-y-2 transition-all duration-500 ease-out">
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-500/25 blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />
                </div>
                <FileText className="text-orange-500 mb-4 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_18px_rgba(249,115,22,0.95)]"
                  size={32} />
                <h3 className="text-xl font-semibold mb-3 text-orange-500">
                  3. Get Your Report
                </h3>
                <p className="text-gray-400">
                  Receive a clear report highlighting vulnerabilities,
                  strengths, and practical recommendations to improve security.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHO SECTION */}
        <section className="relative py-24 px-6 border-t border-gray-800 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 
            w-[700px] h-[200px] 
            bg-orange-500/20 
            blur-[120px]"
          ></div>

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Who Is This Toolkit For?
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto mb-16">
              Designed for organizations and teams that want to understand and
              strengthen their cybersecurity posture.
            </p>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-orange-500/40 hover:glow-orange-sm hover:-translate-y-1 transition-all duration-300 ease-out">
                <h3 className="text-xl font-semibold mb-3 text-orange-500">
                  Small Businesses
                </h3>
                <p className="text-gray-400">
                  Identify security gaps and protect your growing business from
                  cyber threats.
                </p>
              </div>

              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-orange-500/40 hover:glow-orange-sm hover:-translate-y-1 transition-all duration-300 ease-out">
                <h3 className="text-xl font-semibold mb-3 text-orange-500">
                  IT Teams
                </h3>
                <p className="text-gray-400">
                  Evaluate your current controls and get insights into improving
                  your organization’s security posture.
                </p>
              </div>

              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-orange-500/40 hover:glow-orange-sm hover:-translate-y-1 transition-all duration-300 ease-out">
                <h3 className="text-xl font-semibold mb-3 text-orange-500">
                  Executives & Leaders
                </h3>
                <p className="text-gray-400">
                  Gain visibility into cybersecurity risks and make informed
                  strategic decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NIST SECTION */}
        <section className="relative py-24 px-6 border-t border-gray-800 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 
            w-[700px] h-[200px] 
            bg-orange-500/20 
            blur-[120px]"
          ></div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Core Security Pillars
            </h2>

            <p className="text-gray-400 mb-12">
              Based on the NIST Cybersecurity Framework to ensure comprehensive
              coverage.
            </p>

            <div className="grid md:grid-cols-5 gap-6">
              <div className="group relative overflow-hidden bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-orange-400/80 hover:shadow-[0_0_120px_rgba(249,115,22,0.55)] hover:-translate-y-2 transition-all duration-500 ease-out">
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-500/25 blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />
                </div>
                <Search className="text-orange-500 mb-4 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_18px_rgba(249,115,22,0.95)]"
                  size={20} />
                <h3 className="text-orange-500 font-semibold mb-2">
                  Identify
                </h3>
                <p className="text-gray-400 text-sm">
                  Understand and manage risk to systems, assets, data, and
                  capabilities.
                </p>
              </div>

              <div className="group relative overflow-hidden bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-orange-400/80 hover:shadow-[0_0_120px_rgba(249,115,22,0.55)] hover:-translate-y-2 transition-all duration-500 ease-out">
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-500/25 blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />
                </div>
                <ShieldCheck className="text-orange-500 mb-4 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_18px_rgba(249,115,22,0.95)]"
                  size={20} />
                <h3 className="text-orange-500 font-semibold mb-2">
                  Protect
                </h3>
                <p className="text-gray-400 text-sm">
                  Develop and implement safeguards to ensure delivery of
                  services.
                </p>
              </div>

              <div className="group relative overflow-hidden bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-orange-400/80 hover:shadow-[0_0_120px_rgba(249,115,22,0.55)] hover:-translate-y-2 transition-all duration-500 ease-out">
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-500/25 blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />
                </div>
                <Radar className="text-orange-500 mb-4 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_18px_rgba(249,115,22,0.95)]"
                  size={20} />
                <h3 className="text-orange-500 font-semibold mb-2">Detect</h3>
                <p className="text-gray-400 text-sm">
                  Identify the occurrence of a cybersecurity event in a timely
                  manner.
                </p>
              </div>

              <div className="group relative overflow-hidden bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-orange-400/80 hover:shadow-[0_0_120px_rgba(249,115,22,0.55)] hover:-translate-y-2 transition-all duration-500 ease-out">
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-500/25 blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />
                </div>
                <Zap className="text-orange-500 mb-4 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_18px_rgba(249,115,22,0.95)]"
                  size={20} />
                <h3 className="text-orange-500 font-semibold mb-2">Respond</h3>
                <p className="text-gray-400 text-sm">
                  Take action regarding a detected cybersecurity incident.
                </p>
              </div>

              <div className="group relative overflow-hidden bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-orange-400/80 hover:shadow-[0_0_120px_rgba(249,115,22,0.55)] hover:-translate-y-2 transition-all duration-500 ease-out">
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-500/25 blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />
                </div>
                <RefreshCcw className="text-orange-500 mb-4 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_18px_rgba(249,115,22,0.95)]"
                  size={20} />
                <h3 className="text-orange-500 font-semibold mb-2">Recover</h3>
                <p className="text-gray-400 text-sm">
                  Maintain plans for resilience and restore capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative py-28 px-6 border-t border-gray-800 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 
            w-[700px] h-[200px] 
            bg-orange-500/20 
            blur-[120px]"
          ></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Assess Your Cybersecurity Posture?
            </h2>

            <p className="text-gray-400 mb-10">
              Complete the assessment and receive a detailed report highlighting
              risks, strengths, and actionable recommendations.
            </p>

            <motion.button
              onClick={handleStartAssessment}
              animate={{
                y: [0, -10, 0],
                boxShadow: [
                  "0 0 20px rgba(249,115,22,0.25)",
                  "0 0 45px rgba(249,115,22,0.55)",
                  "0 0 20px rgba(249,115,22,0.25)",
                ],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{
                scale: 1.06,
                y: -6,
              }}
              whileTap={{ scale: 0.96 }}
             className="group relative overflow-hidden rounded-xl border border-orange-300 bg-orange-500 px-10 py-4 font-semibold text-white shadow-[0_0_60px_rgba(249,115,22,0.75)] transition-all duration-300 hover:border-white hover:bg-orange-400 hover:shadow-[0_0_140px_rgba(249,115,22,1)]"
            >
              <span className="relative z-10">
                Start Free Assessment
              </span>

              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-white/20 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-orange-200/30 blur-3xl" />
              </div>
            </motion.button>
          </div>
        </section>

        <Footer
          variant="dark"
          termsLink="/assessment-toolkit/terms"
          privacyLink="/assessment-toolkit/privacy"
        />
      </div>
    </div>
  );
}