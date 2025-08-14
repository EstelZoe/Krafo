import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
// import Krafoimage from "../assets/images/KRAFO ORIGINAL MARKAsset 73@2x.png";
import Aml from "../assets/images/aml.jpg";
import Ks from "../assets/images/ks.jpg";
import Sl from "../assets/images/studentlearning.png";
import Ms from "../assets/images/ms.jpg";
import Cl from "../assets/images/cl.jpg";
import HeroVid from "../assets/videos/Vid2.mp4";
import { motion } from "framer-motion";
import { Shield, GraduationCapIcon, Lightbulb, FileText, Lock, Home, ShieldCheck, Globe, SchoolIcon, Building2, Briefcase, } from "lucide-react";
import { image } from "framer-motion/client";
import pic1 from "../assets/images/origilogo.png";
import pic2 from "../assets/images/krafoashanti.png";
import pic3 from "../assets/images/bgremover2.png";


const journeyData = [
  {
    year: "2020",
    description: "Founded with a vision to democratize cybersecurity education",
  },
  {
    year: "2022",
    description: "Launched comprehensive training programs for enterprises",
  },
  {
    year: "2025",
    description: "Expanding globally with innovative security solutions",
  },
];

export default function About() {
  return (
    <>
      <Navbar />

      <section className=" text-white pt-28 pb-20 px-4 md:px-20 relative font-body overflow-hidden">

        {/* 🎥 Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover -z-20"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={HeroVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 🌌 Black Overlay on Top of Video */}
        <div className="absolute inset-0 bg-black/70 -z-10"></div>

        {/* 💫 Optional Glow */}
        <div className="absolute inset-0 -z-10 opacity-20 blur-3xl" style={{ background: "radial-gradient(circle at 30% 30%, #F2600B22, transparent 70%)" }}></div>

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative z-10 ">
          {/* Text Side */}
          <div className="max-w-xl space-y-6 text-center md:text-left bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] border border-orange-700/40 rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_#F2600B33] hover:scale-[1.02] w-full md:w-[45%]">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
              We’re shaping Africa’s <span className="text-[#F2600B]">cyber future</span>
            </h2>
            <p className="text-gray-300 text-lg">
              KRAFO empowers schools, youth, and businesses with cybersecurity training, tools, and guidance to build a digitally secure continent.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <button className="bg-[#F2600B] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#e05600] transition">
                Get Involved
              </button>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition underline underline-offset-4">
                See our work →
              </a>
            </div>
          </div>

          {/* Floating Image Tiles */}
          <div className="grid grid-cols-2 gap-4">
          </div>
        </div>
      </section>


      {/* /* Our Achievements Section */} 
      <section className="overflow-hidden pb-12 pt-20 lg:pb-16 lg:pt-24 relative bg-black">
        {/* Pattern Background */}

        <div className="container mx-auto px-4 relative z-10">
          {/* Grid Layout */}
          <div className="-mx-4 flex flex-wrap items-center">
            {/* Image Gallery Column */}
            <div className="w-full px-4 lg:w-6/12">
              <div className="-mx-3 flex items-center sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <div className="relative overflow-hidden rounded-2xl shadow-xl w-50 h-50">
                      <img src={pic1} alt="Cybersecurity training" className="w-full h-50 object-cover" />
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-[#f2600b]/30 to-black/50 mix-blend-multiply"
                      ></div> 
                    </div>
                  </div>
                  <div className="py-3 sm:py-4">
                    <div className="relative overflow-hidden rounded-2xl shadow-xl">
                      <img src={pic2} alt="Krafo Systems team" className="w-full h-64 object-cover" />
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-[#f2600b]/30 to-black/50 mix-blend-multiply"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <div className="relative overflow-hidden rounded-2xl shadow-xl">
                      <img src={pic3} alt="Student learning cybersecurity" className="w-full h-80 object-cover" />
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-[#f2600b]/30 to-black/50 mix-blend-multiply"
                      ></div>
                    </div>
                    <span className="absolute -bottom-7 -right-7 z-[-1]">
                      <svg width="134" height="106" viewBox="0 0 134 106" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="1.66667" cy="104" r="1.66667" transform="rotate(-90 1.66667 104)" fill="#f2600b" />
                        <circle cx="16.3333" cy="104" r="1.66667" transform="rotate(-90 16.3333 104)" fill="#f2600b" />
                        <circle cx="31" cy="104" r="1.66667" transform="rotate(-90 31 104)" fill="#f2600b" />
                        {/* Additional circles */}
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <span className="mb-4 block text-lg font-semibold text-[#f2600b] tracking-wider">
                  WHAT OUR NAME REPRESENTS
                </span>
                
                
                <h2 className="mb-5 text-3xl font-bold text-white sm:text-[40px]/[48px] uppercase">
                  PROTECTING AFRICA'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2600b] to-[#ffb142]">CYBER FUTURE</span>
                </h2>
                <p className="mb-5 text-base text-gray-300 leading-relaxed">
                 Krafo Systems comes from the Akan word “KRA,” meaning the soul—divine in origin, holding life, consciousness, and destiny. “KRAFO” means “Togetherness of souls,” and “Systems” symbolizes unity toward a higher goal. Our mission is to protect Africa physically and spiritually, using cybersecurity to guard against threats online and offline.
                </p>
                <p className="mb-8 text-base text-gray-300 leading-relaxed">
                 Our motto, “Let’s Connect & Protect,” draws from Ubuntu: “I am because we are.” This philosophy values community over individuality, recognizing that relationships shape identity. In an increasingly divided world, we promote interdependence, empathy, and responsibility—connecting people to strengthen collective defenses for a safer, more harmonious, and sustainable future.
                </p>

                {/* Stats Section */}
                <div className="mb-10 grid grid-cols-3 gap-6">
                  <div className="bg-[#0E0E0E] p-7 shadow-2xl ring-1 ring-[#F2600B55] rounded-xl text-center hover:transform hover:-translate-y-1 transition-all  border">
                    <h3 className="mb-2 text-4xl font-bold text-[#f2600b]">
                      500+
                    </h3>
                    <p className="text-sm text-gray-400">
                      SECURED ORGANIZATIONS
                    </p>
                  </div>
                  <div className="bg-[#0E0E0E] p-7 shadow-2xl ring-1 ring-[#F2600B55] rounded-xl text-center hover:transform hover:-translate-y-1 transition-all  border">
                    <h3 className="mb-2 text-4xl font-bold text-[#f2600b]">
                      92%
                    </h3>
                    <p className="text-sm text-gray-400">
                      SATISFACTION RATE
                    </p>
                  </div>
                  <div className="bg-[#0E0E0E] p-7 shadow-2xl ring-1 ring-[#F2600B55] rounded-xl text-center hover:transform hover:-translate-y-1 transition-all  border">
                    <h3 className="mb-2 text-4xl font-bold text-[#f2600b]">
                      10+
                    </h3>
                    <p className="text-sm text-gray-400">
                      AFRICAN COUNTRIES
                    </p>
                  </div>
                </div>

                <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#f2600b] px-7 py-3 text-center text-base font-medium text-white hover:bg-[#d45509] transition-colors tracking-wider uppercase">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="relative bg-black py-24 px-4 md:px-20 text-white font-body overflow-hidden">
        {/* Background with fixed positioning */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: "linear-gradient(to top right, #F2600B, rgba(242, 96, 11, 0.3))",
              clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              transform: "translate3d(0, 0, 0)",
              filter: "blur(50px)",
            }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500 bg-clip-text text-transparent">
            Our Journey
          </h2>

          {/* Timeline wrapper */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 via-yellow-400 to-red-500 z-0 rounded-full"></div>

            <div className="space-y-20">
              {[
                {
                  date: "2019",
                  title: "KRAFO Founded",
                  text: "KRAFO is born with a bold vision to raise cybersecurity awareness in African schools.",
                  color: "bg-red-600",
                },
                {
                  date: "2020",
                  title: "First Program Launched",
                  text: "Our debut school program launches across 5 regions with overwhelming reception.",
                  color: "bg-orange-500",
                },
                {
                  date: "2021",
                  title: "20+ Partners Strong",
                  text: "Institutions, NGOs, and communities join us in spreading digital safety education.",
                  color: "bg-yellow-400",
                },
                {
                  date: "2023",
                  title: "Enterprise Services",
                  text: "Began offering tailored training + consultancy to businesses & organizations.",
                  color: "bg-orange-600",
                },
                {
                  date: "2024",
                  title: "AI Integration",
                  text: "AI-driven awareness and training platforms deployed in pilot schools.",
                  color: "bg-orange-700",
                },
                {
                  date: "2025",
                  title: "Continental Scale",
                  text: "KRAFO expands across 10+ African countries with localized programs.",
                  color: "bg-red-700",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`relative flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  {/* Timeline Card */}
                  <div
                    className={`relative bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] border border-orange-700/40 rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_#F2600B33] hover:scale-[1.02] w-full md:w-[45%]`}
                  >
                    {/* Circle Marker */}
                    <span
                      className={`absolute top-6 ${index % 2 === 0 ? "-right-3 md:-right-3" : "-left-3 md:-left-3"
                        } w-6 h-6 ${item.color} rounded-full border-4 border-[#0B0B0C] shadow-xl z-10`}
                    ></span>

                    <time className="text-xs font-medium text-orange-300 block mb-1">{item.date}</time>
                    <h3 className="text-xl font-semibold text-orange-400 mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section>

      </section>

      {/* Meet Our Team Section */}
      <section className="bg-[#000000] py-16 px-4 md:px-20 pt-0 text-white font-body relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">Meet The Leadership</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-400 text-lg">We're a dynamic group of cybersecurity advocates working to secure Africa's digital future.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[{
              name: "Komla Elikem",
              role: "CEO & Founder",
              desc: "Visionary leader with 15+ years in tech innovation.",
              image: "https://media.licdn.com/dms/image/v2/D4E03AQFLO3cJ_SD6qg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1666098530425?e=1756944000&v=beta&t=Oyxx1M9J79uWuirrvRIuq9WB_RaGGa51ko_c_OUpYNk",
              linkedin: "https://www.linkedin.com/in/komla-m-a2a915253/",
              twitter: "#"
            }, {
              name: "Mamaga Ami Fafali Mathis",
              role: "Co-Founder & CTO",
              desc: "Renowned Systems Engineer and Cybersecurity Expert.",
              image: "https://media.licdn.com/dms/image/v2/D4E03AQFNm__FaX3USw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1668438336606?e=1756944000&v=beta&t=RamtsaY9o_Tg1mgkl3ndPlh3bFZsyH6sV46dFOAZZic",
              linkedin: "https://www.linkedin.com/in/amifafali/",
              twitter: "#"
            }, {
              name: "Michael Chen",
              role: "CTO",
              desc: "Tech expert with AI and machine learning experience.",
              image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
              linkedin: "#",
              twitter: "#"
            }, {
              name: "Emily Rodriguez",
              role: "Marketing Director",
              desc: "Creative strategist focused on brand growth.",
              image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
              linkedin: "#",
              twitter: "#"
            }].map((member, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#F2600B0D] to-[#2726261a] backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_#F2600B33] hover:scale-[1.02]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-[3/4] object-cover object-center transform group-hover:scale-105 transition duration-300 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                  <div className="flex space-x-4">
                    <a href={member.linkedin} className="bg-white text-black hover:bg-orange-500 hover:text-white p-2 rounded-full transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48s.88 1.98 1.98 1.98c1.1 0 1.98-.88 1.98-1.98S6.08 3.5 4.98 3.5zM3 8h4v13H3V8zm7.5 0h3.4v1.8h.05c.47-.89 1.63-1.8 3.35-1.8 3.6 0 4.27 2.37 4.27 5.45V21h-4v-6.5c0-1.55-.03-3.55-2.17-3.55-2.18 0-2.52 1.7-2.52 3.45V21h-4V8z" /></svg>
                    </a>
                  </div>
                </div>
                <div className="text-center px-4 py-6">
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-orange-500 font-medium">{member.role}</p>
                  <p className="text-gray-400 mt-2 text-sm">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-6 bg-brand-dark bg-black text-[#F2600B] text-brand-dark-foreground px-8 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-orange">Who We Serve</h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto text-white">
            We provide cybersecurity education and consultation to various sectors across Africa
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="group rounded-xl border border-[#F2600B33] bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] backdrop-blur-md p-8 transition-all duration-300 hover:shadow-[0_0_30px_#F2600B33] hover:scale-[1.02]">
              <div className="flex justify-center mb-6">
                <div className="bg-[#F2600B1A] p-4 rounded-full border border-[#F2600B33]">
                  <GraduationCapIcon className="w-8 h-8 text-[#F2600B]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F2600B] transition-colors">JHS/SHS Students</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Building cyber awareness from early education stages to create a security-conscious generation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-xl border border-[#F2600B33] bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] backdrop-blur-md p-8 transition-all duration-300 hover:shadow-[0_0_30px_#F2600B33] hover:scale-[1.02]">
              <div className="flex justify-center mb-6">
                <div className="bg-[#F2600B1A] p-4 rounded-full border border-[#F2600B33]">
                  <SchoolIcon className="w-8 h-8 text-brand-orange" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F2600B] transition-colors">Universities</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Advanced cybersecurity programs and research initiatives for higher education institutions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-xl border border-[#F2600B33] bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] backdrop-blur-md p-8 transition-all duration-300 hover:shadow-[0_0_30px_#F2600B33] hover:scale-[1.02]">
              <div className="flex justify-center mb-6">
                <div className="bg-[#F2600B1A] p-4 rounded-full border border-[#F2600B33]">
                  <Building2 className="w-8 h-8 text-brand-orange" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F2600B] transition-colors">Organizations</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Post-breach recovery and prevention strategies for businesses and government entities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-[#000000] py-20 px-4 md:px-20 text-white font-body relative">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-12">
            These values guide our mission to secure Africa's digital ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Protect */}
            <div className="bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] border-y-2 border-orange-500/40 p-6 rounded-2xl transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_#F2600B44] group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-orange-500 flex items-center justify-center bg-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-orange-400 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-orange-400 group-hover:text-white transition-colors duration-300">
                Protect
              </h3>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed group-hover:text-white transition-colors">
                Safeguarding digital assets and infrastructure from emerging threats.
              </p>
            </div>

            {/* Card 2 - Prevent */}
            <div className="bg-gradient-to-br from-[#F2600B0D] to-[#0000001A]  border-y-2 border-yellow-500/90 p-6 rounded-2xl transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_#FFC10755] group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-yellow-400 flex items-center justify-center bg-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-yellow-400 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-yellow-400 group-hover:text-white transition-colors duration-300">
                Prevent
              </h3>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed group-hover:text-white transition-colors">
                Proactive measures to stop security breaches before they occur.
              </p>
            </div>

            {/* Card 3 - Educate */}
            <div className="bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] border-y-2 border-red-900/90 p-6 rounded-2xl transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_#FF4D4D88] group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-red-900 flex items-center justify-center bg-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-900 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-900 group-hover:text-white transition-colors duration-300">
                Educate
              </h3>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed group-hover:text-white transition-colors">
                Empowering individuals with knowledge and practical skills.
              </p>
            </div>
          </div>
        </div>
      </section>

    <section className="bg-black text-white py-20 px-4 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 md:grid-rows-5 gap-6">
          {/* Text Block */}
          <div className="col-span-3 row-span-3 flex flex-col justify-center items-start p-6 bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] rounded-xl shadow-lg relative overflow-hidden">
            {/* Glow */}
            <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-[#F2600B11] via-transparent to-transparent blur-2xl" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Join Our <span className="text-[#F2600B]">Mission</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-6 max-w-md">
              Be part of the cybersecurity revolution. Together, we can build a safer digital world for everyone.
            </p>
            <button className="bg-[#F2600B] hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition">
              Get Started Today
            </button>
          </div>

          {/* Animated Image Tiles - Responsive */}
          {/* Tile 1 */}
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{
              repeat: Infinity,
              duration: 3,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="bg-[#1A1A1C] rounded-xl shadow-md hidden items-center justify-center col-start-4 row-start-1 row-span-2 md:flex"
          >
            <motion.img
              src={Ks}
              alt="Workshop"
              className="w-full h-80 object-cover rounded-xl"
            />
          </motion.div>

          {/* Tile 2 */}
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: -10 }}
            transition={{
              repeat: Infinity,
              duration: 3,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="bg-[#1A1A1C] rounded-xl shadow-md hidden items-center justify-center col-start-5 row-start-1 row-span-1 md:flex"
          >
            <motion.img
              src={Ms}
              alt="Mission"
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>

          {/* Tile 3 */}
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="bg-[#1A1A1C] rounded-xl shadow-md hidden items-center justify-center col-start-4 row-start-3 row-span-1 md:flex"
          >
            <motion.img
              src={Aml}
              alt="Awareness"
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>

          {/* Tile 4 */}
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: -10 }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="bg-[#1A1A1C] rounded-xl shadow-md hidden items-center justify-center col-start-5 row-start-2 row-span-2 md:flex"
          >
            <motion.img
              src={Cl}
              alt="Collaboration"
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>

          {/* Mobile version tiles */}
          <div className="md:hidden space-y-6 mt-10">
            {[Ks, Ms, Aml, Cl].map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ y: idx % 2 === 0 ? -10 : 10 }}
                animate={{ y: idx % 2 === 0 ? 10 : -10 }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + idx * 0.5,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="bg-[#1A1A1C] rounded-xl shadow-md flex items-center justify-center"
              >
                <motion.img
                  src={src}
                  alt={`Visual ${idx + 1}`}
                  className="w-full h-60 object-cover rounded-xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer variant="orange" />

    </>
  );
}