import { useNavigate } from "react-router-dom";
import ToolkitNavbar from "./components/ToolkitNavbar";
import Footer from "../../assets/components/Footer";
import tab from "../assessment/images/tabremove.png"
import { ClipboardList, BarChart3, FileText, Search, ShieldCheck, Radar, Zap, RefreshCcw, Shield } from "lucide-react";


export default function AssessmentToolkit() {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment-toolkit/signup');
  };

  const handleExampleReport = () => {
    // Navigate to start page which will redirect logged-in users appropriately
    navigate('/assessment-toolkit/start');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Orange glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 
                      w-[900px] h-[500px] 
                      bg-orange-500/20 
                      blur-[160px] 
                      rounded-full">
      </div>

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black to-black"></div>

      <div className="relative z-10">
        <ToolkitNavbar />

        {/* HERO */}
        <section className="flex flex-col items-center text-center pt-4 px-6"> <h1 className="text-4xl md:text-5xl font-bold text-orange-500"> Cybersecurity Risk </h1> <h1 className="text-4xl md:text-5xl font-bold"> Assessment Toolkit </h1> <p className="mt-4 text-gray-400 max-w-xl"> Evaluate your organization's security posture, identify hidden vulnerabilities, and get actionable recommendations in minutes. </p> <div className="flex gap-4 mt-6"> <button onClick={handleStartAssessment} className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-md font-medium transition" > Start Free Assessment </button> <button onClick={handleExampleReport} className="border border-gray-500 hover:border-white px-6 py-2 rounded-md transition" > See Example Report </button> </div> <img src={tab} alt="Graph Preview" className="mt-4 w-[900px] max-w-full h-auto object-contain" /> </section>

        {/* HOW IT WORKS */}
        <section className="relative py-24 px-6 border-t border-gray-800">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 
                      w-[900px] h-[500px] 
                      bg-orange-500/20 
                      blur-[160px] 
                      rounded-full">
          </div>

          <div className="relative z-10 max-w-6xl mx-auto text-center">

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How the Assessment Works
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto mb-16">
              Our toolkit walks you through a structured evaluation of your
              cybersecurity posture and provides actionable insights.
            </p>

            <div className="grid md:grid-cols-3 gap-10">

              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 
                transition-all duration-300  hover:-translate-y-2  hover:shadow-[0_10px_40px_rgba(249,115,22,0.35)]">
                <ClipboardList className="text-orange-500 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3 text-orange-500">
                  1. Questionaire
                </h3>
                <p className="text-gray-400">
                  Complete a guided questionnaire covering key cybersecurity
                  areas like governance, risk management, and technical controls.
                </p>
              </div>

              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 
                transition-all duration-300  hover:-translate-y-2  hover:shadow-[0_10px_40px_rgba(249,115,22,0.35)]">
                <BarChart3 className="text-orange-500 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3 text-orange-500">
                  2. Analyze
                </h3>
                <p className="text-gray-400">
                  Our system analyzes your responses and compares them with
                  industry best practices and security frameworks.
                </p>
              </div>

              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 
                transition-all duration-300  hover:-translate-y-2  hover:shadow-[0_10px_40px_rgba(249,115,22,0.35)]">
                <FileText className="text-orange-500 mb-4" size={32} />
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

        {/* THE WHO SECTION */}
        <section className="relative py-24 px-6 border-t border-gray-800 overflow-hidden">

          {/* orange glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 
                  w-[700px] h-[200px] 
                  bg-orange-500/20 
                  blur-[120px]">
          </div>

          <div className="relative z-10 max-w-6xl mx-auto text-center">

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Who Is This Toolkit For?
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto mb-16">
              Designed for organizations and teams that want to understand and
              strengthen their cybersecurity posture.
            </p>

            <div className="grid md:grid-cols-3 gap-10">

              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 
                transition-all duration-300  hover:-translate-y-2  hover:shadow-[0_10px_40px_rgba(249,115,22,0.35)]">
                <h3 className="text-xl font-semibold mb-3 text-orange-500">
                  Small Businesses
                </h3>
                <p className="text-gray-400">
                  Identify security gaps and protect your growing business from
                  cyber threats.
                </p>
              </div>

              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 
                transition-all duration-300  hover:-translate-y-2  hover:shadow-[0_10px_40px_rgba(249,115,22,0.35)]">
                <h3 className="text-xl font-semibold mb-3 text-orange-500">
                  IT Teams
                </h3>
                <p className="text-gray-400">
                  Evaluate your current controls and get insights into improving
                  your organization’s security posture.
                </p>
              </div>

              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 
                transition-all duration-300  hover:-translate-y-2  hover:shadow-[0_10px_40px_rgba(249,115,22,0.35)]">
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

          {/* glow from separator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 
                  w-[700px] h-[200px] 
                  bg-orange-500/20 
                  blur-[120px]">
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">

            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Core Security Pillars
            </h2>

            <p className="text-gray-400 mb-12">
              Based on the NIST Cybersecurity Framework to ensure comprehensive coverage.
            </p>

            <div className="grid md:grid-cols-5 gap-6">

              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 
                transition-all duration-300  hover:-translate-y-2  hover:shadow-[0_10px_40px_rgba(249,115,22,0.35)]">
                <Search className="text-orange-500 mb-3" size={20} />
                <h3 className="text-orange-500 font-semibold mb-2">Identify</h3>
                <p className="text-gray-400 text-sm">
                  Understand and manage risk to systems, assets, data, and capabilities.
                </p>
              </div>

              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 
                transition-all duration-300  hover:-translate-y-2  hover:shadow-[0_10px_40px_rgba(249,115,22,0.35)]">
                <ShieldCheck className="text-orange-500 mb-3" size={20} />
                <h3 className="text-orange-500 font-semibold mb-2">Protect</h3>
                <p className="text-gray-400 text-sm">
                  Develop and implement safeguards to ensure delivery of services.
                </p>
              </div>

              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 
                transition-all duration-300  hover:-translate-y-2  hover:shadow-[0_10px_40px_rgba(249,115,22,0.35)]">
                <Radar className="text-orange-500 mb-3" size={20} />
                <h3 className="text-orange-500 font-semibold mb-2">Detect</h3>
                <p className="text-gray-400 text-sm">
                  Identify the occurrence of a cybersecurity event in a timely manner.
                </p>
              </div>

              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 
                transition-all duration-300  hover:-translate-y-2  hover:shadow-[0_10px_40px_rgba(249,115,22,0.35)]">
                <Zap className="text-orange-500 mb-3" size={20} />
                <h3 className="text-orange-500 font-semibold mb-2">Respond</h3>
                <p className="text-gray-400 text-sm">
                  Take action regarding a detected cybersecurity incident.
                </p>
              </div>

              <div className="bg-[#111] p-8 rounded-xl border border-gray-800 
                transition-all duration-300  hover:-translate-y-2  hover:shadow-[0_10px_40px_rgba(249,115,22,0.35)]">
                <RefreshCcw className="text-orange-500 mb-3" size={20} />
                <h3 className="text-orange-500 font-semibold mb-2">Recover</h3>
                <p className="text-gray-400 text-sm">
                  Maintain plans for resilience and restore capabilities.
                </p>
              </div>

            </div>

          </div>
        </section>
        <section className="relative py-28 px-6 border-t border-gray-800 overflow-hidden">

          {/* orange glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 
                  w-[700px] h-[200px] 
                  bg-orange-500/20 
                  blur-[120px]">
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Assess Your Cybersecurity Posture?
            </h2>

            <p className="text-gray-400 mb-10">
              Complete the assessment and receive a detailed report highlighting
              risks, strengths, and actionable recommendations.
            </p>

            <button
              onClick={handleStartAssessment}
              className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-md font-medium transition"
            >
              Start Free Assessment
            </button>

          </div>

        </section>

        {/* FOOTER */}
        <Footer variant="dark" termsLink="/assessment-toolkit/terms" privacyLink="/assessment-toolkit/privacy" />
      </div>
    </div>
  );
}