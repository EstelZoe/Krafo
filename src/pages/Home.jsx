import React from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import Book from "../assets/images/cyberart.jpg";
import Backimage from "../assets/images/bgimage.jpg";
import { GraduationCapIcon, SchoolIcon, Building2 } from "lucide-react";
import cybered from "../assets/images/abstract.jpg";
import insightes from "../assets/images/insight3.jpg";
import insight from "../assets/images/insight1.jpg";
import insights from "../assets/images/insight2.jpg";
import Video from "../assets/videos/backgroundcybered.mp4";
import { motion } from "framer-motion";
import data1 from "../assets/images/data1.jpg";
import data2 from "../assets/images/data2.jpg";
import data3 from "../assets/images/data3.jpg";
import data4 from "../assets/images/data4.jpg";
import Countdown from "../assets/components/Countdown";
import { Link } from "react-router";
import ccbc from "../assets/images/ccbc.png"
import studyGroup from "../assets/images/consultationpic.jpg"
import PartnershipCarousel from "../assets/components/PartnershipCarousel";
import video from "../assets/videos/backgroundhome.mp4";
import useBlogs from "../hooks/useBlogs"
import { image } from "framer-motion/client";






export default function Home() {
  // const { blogs, loading } = useBlogs();
  // if (loading) return <p className="text-center text-white">Loading...</p>;



  return (
    <>
      <Navbar />

      <section className="relative w-full h-[650px] overflow-hidden">
        {/* Background Layer */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover scale-105 animate-zoom"
          src={video} autoPlay loop muted playsInline />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-black"></div>
        {/* Reduced Glass Blur Overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1.5px] z-0" />

        {/* Text Sector */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full text-left text-white px-6 md:px-16">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 max-w-2xl leading-tight animate-fadein-up">
            Protecting Africa Through <br className="hidden md:block" /> Cyber Literacy
          </h1>
          <p className="text-base md:text-xl mb-6 max-w-2xl text-gray-200 animate-fadein-up delay-100">
            Empowering the next generation with cybersecurity knowledge and skills to secure Africa's digital future.
          </p>

          <div className="flex flex-wrap gap-4 animate-fadein-up delay-200">
            <Link to="/courses">
              <button className="bg-[#F2600B] hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-transform hover:scale-105">
                Explore Courses
              </button>
            </Link>
            <Link to="/consultation">
              <button className="border border-[#F2600B] hover:bg-[#F2600B] text-white px-6 py-2 rounded-md transition-transform hover:scale-105">
                Book Consultation
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce text-white text-sm opacity-75">
          <span className="border border-white px-3 py-1 rounded-full">Scroll ↓</span>
        </div>

        {/* Animations */}
        <style jsx>{`
    @keyframes zoom {
      0% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1.1);
      }
    }

    .animate-zoom {
      animation: zoom 5s ease-in-out infinite alternate;
    }

    @keyframes fadein-up {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fadein-up {
      animation: fadein-up 1s ease-out forwards;
    }

    .delay-100 {
      animation-delay: 0.1s;
    }

    .delay-200 {
      animation-delay: 0.2s;
    }
  `}</style>
      </section>



      {/* Our services Section */}
      <section className="relative py-24 px-6 pt-0 bg-black text-white overflow-hidden z-10">

        {/* Decorative Particles / Starfield */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#F2600B33_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>

        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black tracking-tight mb-6 text-[#F2600B] leading-tight">
            Our Services
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-20">
            Practical. Predictive. Human-centric cybersecurity solutions tailored for real-world impact.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {[ // Service cards
              {
                title: "Network Monitoring",
                desc: "Always on. Always aware. We alert you before vulnerabilities become breaches — with predictive insights.",
                img: data1,
              },
              {
                title: "Risk & Vulnerability Assessment",
                desc: "Identify, analyze, and close the security gaps in your digital infrastructure before attackers do.",
                img: data2,
              },
              {
                title: "Awareness Training",
                desc: "Empower your team to recognize and respond to threats. We build a security-first culture from the inside out.",
                img: data4,
              },
              {
                title: "Policy Management",
                desc: "We create, update, and refine your IT policies — turning technical rules into operational clarity.",
                img: data3,
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group relative rounded-xl border border-[#F2600B33] bg-gradient-to-br from-[#1a1a1a] to-[#000000] backdrop-blur-md shadow-xl hover:shadow-orange-600/30 hover:scale-[1.02] transition-transform duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 pointer-events-none"></div>
                </div>

                {/* Text */}
                <div className="p-6 relative">
                  <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-[#F2600B] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {service.desc}
                  </p>

                  {/* Subtle glow bar */}
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#F2600B] group-hover:w-full transition-all duration-500"></span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      <section className="relative isolate px-6 py-24 sm:py-32 lg:px-8 bg-[#000000] text-white font-body overflow-hidden">
        {/* Animated Cyber Background Grid */}
        <div className="absolute inset-0 -z-10 opacity-10 animate-pulse bg-[radial-gradient(#F2600B22_1px,transparent_1px)] [background-size:20px_20px]" />


        {/* Courses Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 pt-0">
          <h2 className="text-base font-semibold text-[#F2600B] tracking-wider uppercase animate-fade-up">Courses</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl animate-fade-up delay-100">
            Choose the right program for you
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-gray-400 animate-fade-up delay-200">
            Empower your journey in cybersecurity with courses tailored for students, professionals, and organizations across Africa.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-6 gap-x-6 md:grid-cols-2 lg:grid-cols-3 items-start">
          {[
            {
              title: "AI & Cybersucurity",
              price: "Coming Soon",
              tierColor: "text-orange-400",
              bg: "bg-[#0E0E0E]",
              ring: "ring-[#F2600B55]",
              features: [
                "Understand how AI is used in cyber attacks.",
                "Build AI-powered security monitoring tools.",
                "Explore the ethics of AI in security.",
              ],
              icon: "",
            },
            {
              title: "Cybersecurity Capacity Building Course",
              price: "¢5750",
              tierColor: "text-[#F2600B]",
              bg: "bg-[#1A1A1A]/60",
              ring: "ring-[#F2600B33]",
              image: ccbc.png,
              discription: "A comprehensive program designed to build a strong foundation in cybersecurity principles, from network defense to incident response",

              features: [
                "12 months online access to resources.",
                "Networking & a Certificate of Completion.",
                "18 topics with quizzes & hands-on exercises.",
              ],
              icon: "",
            },
            {
              title: "Cyber Elite",
              price: "Coming soon",
              tierColor: "text-orange-300",
              bg: "bg-[#131313]",
              ring: "ring-[#F2600B88]",
              features: [
                "Develop a robust cybersecurity strategy.",
                "Learn about governance, risk, and compliance (GRC).",
                "Manage cybersecurity budgets and investments.",
              ],
              icon: "",
            },
          ].map((course, index) => (
            <div
              key={index}
              className={`rounded-3xl ${course.bg} p-9 ring-1 ${course.ring} backdrop-blur-md hover:shadow-[0_0_25px_#F2600B88] hover:ring-[#F2600B] hover:scale-[1.02] transition duration-300 animate-fade-up delay-[${300 + index * 100}ms]`}
            >
              <div className="text-4xl mb-3">{course.icon}</div>
              <h3 className={`text-base font-semibold ${course.tierColor}`}>{course.title}</h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-white">{course.price}</span>
                <span className="text-base text-gray-400">/course</span>
              </p>
              <p className="mt-6 text-base text-gray-400">
                {index === 0
                  ? "Start your journey into cybersecurity with a foundational course built for newcomers."
                  : index === 1
                    ? "A career-focused track for professionals seeking industry-level cybersecurity mastery."
                    : "For leaders, auditors, and security officers driving strategy, compliance, and enterprise defense."}
              </p>
              <ul className="mt-8 space-y-3 text-sm text-gray-300">
                {course.features.map((feat, i) => (
                  <li key={i} className="flex gap-x-3">{feat}</li>
                ))}
              </ul>
              <Link
                to="/courses#cybersecurity-course"
                className={`mt-8 block rounded-md ${index === 1
                  ? "bg-[#F2600B] text-white"
                  : "text-[#F2600B] ring-1 ring-[#F2600B44] hover:bg-[#F2600B22]"
                  } text-center text-sm font-semibold transition px-3.5 py-2.5`} >
                Enroll Now
              </Link>
            </div>))}
        </div>

        {/* Keyframe Animations (Tailwind Plugin or Custom CSS) */}
        <style>
          {`
      @keyframes fade-up {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-up {
        animation: fade-up 0.8s ease forwards;
      }
      .delay-100 { animation-delay: 0.1s; }
      .delay-200 { animation-delay: 0.2s; }
      .delay-[300ms] { animation-delay: 0.3s; }
      .delay-[400ms] { animation-delay: 0.4s; }
      .delay-[500ms] { animation-delay: 0.5s; }
    `}
        </style>
      </section>


      <section className="relative px-6 py-24 pt-0 bg-[#000000] text-white font-body overflow-hidden">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 -z-10 opacity-10 animate-pulse bg-[radial-gradient(#F2600B22_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F2600B] animate-fade-up">Upcoming Events</h2>
          <p className="text-gray-300 mt-2 text-lg animate-fade-up delay-100">
            Join our live cybersecurity workshops, summits, and bootcamps across Africa.
          </p>

          {/* Next Event Countdown */}
          <div className="mt-6 text-white font-mono text-sm md:text-base flex justify-center gap-4 items-center animate-fade-up delay-200">
            <span className="bg-[#F2600B] px-3 py-1.5 rounded text-black font-bold">Next Event:</span>
            <Countdown targetDate="2025-03-15T10:00:00" />
          </div>
        </div>

        {/* Event Cards */}
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              date: "March 15, 2025",
              title: "Cybersecurity Awareness Workshop",
              desc: "Interactive workshop on identifying and preventing cyber threats.",
              extra: "Speaker: Dr. Anita Mensah • Venue: Accra Digital Center",
            },
            {
              date: "March 22, 2025",
              title: "Youth Cyber Champions Summit",
              desc: "Empowering young Africans with cybersecurity knowledge.",
              extra: "Speaker: Kwame Opoku • Venue: University of Lagos",
            },
            {
              date: "April 5, 2025",
              title: "Enterprise Security Bootcamp",
              desc: "Advanced security strategies for business organizations.",
              extra: "Panel: 6 Experts • Virtual + In-Person Hybrid",
            },
          ].map((event, index) => (
            <div
              key={index}
              className="group bg-[#131313]/60 border border-[#F2600B33] backdrop-blur-md p-6 rounded-2xl relative transform transition duration-300 hover:scale-[1.03] hover:ring-1 hover:ring-[#F2600B] hover:shadow-[0_0_25px_#F2600B55] animate-fade-up delay-[300ms]"
            >
              <div className="absolute top-3 right-3 text-sm bg-[#F2600B] text-black px-2 py-0.5 rounded font-bold shadow-md">
                {event.date}
              </div>

              <h3 className="text-lg font-bold mt-8 mb-2 group-hover:text-[#F2600B] transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-gray-300 mb-3">{event.desc}</p>
              <p className="text-xs text-gray-500 italic">{event.extra}</p>

              <button className="mt-6 w-full bg-[#F2600B] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-orange-600 hover:shadow-lg hover:shadow-[#F2600B55] transition duration-300">
                Register
              </button>
            </div>
          ))}
        </div>

        {/* Keyframes */}
        <style>
          {`
      @keyframes fade-up {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-up {
        animation: fade-up 0.8s ease forwards;
      }
      .delay-100 { animation-delay: 0.1s; }
      .delay-200 { animation-delay: 0.2s; }
      .delay-[300ms] { animation-delay: 0.3s; }
    `}
        </style>
      </section>


      {/* CyberEd Visual */}
      <section className="relative h-auto md:h-[500px] overflow-hidden bg-black text-white font-body">
        {/* Background Video + Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Dual Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C88] via-[#0B0B0CAA] to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-transparent"></div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 px-6 md:px-16 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Side */}
            <div className="space-y-6 text-center md:text-left animate-fade-in-down">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-[#F2600B] drop-shadow-md">
                About CyberEd
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0 leading-relaxed">
                We are building Africa’s cybersecurity future—one digital warrior at a time.
                Through education, innovation, and strategy, we empower the next generation of secure tech leaders.
              </p>
              <Link to="/youth-cyber-ed"
                className="inline-block mt-4 px-6 py-3 bg-[#F2600B] hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-all shadow-lg hover:scale-105 active:scale-100">
                Learn More
              </Link>
            </div>

            {/* Image Side */}
            <div className="flex justify-center animate-fade-in-up">
              <img
                src={cybered}
                alt="Cyber Visual"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-2xl border border-[#F2600B33] shadow-[0_10px_40px_rgba(242,96,11,0.25)] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Animation keyframes (via Tailwind's plugin or custom in global CSS) */}
        <style>
          {`
      @keyframes fade-in-down {
        0% { opacity: 0; transform: translateY(-20px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      .animate-fade-in-down {
        animation: fade-in-down 0.8s ease-out forwards;
      }

      .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
      }
    `}
        </style>
      </section>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-orange-500 mb-2 flex items-center gap-2">
              <span className="w-4 h-4 border border-orange-500 rounded-full flex items-center justify-center">i</span>
              BOOK A CONSULTAION WITH US
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-snug mb-4">
              Get A Personalized Cybersecurity Guidance <span className="text-orange-600">Tailored To Your Organization's Needs</span>
            </h2>

            <p className="text-gray-400 mb-6">
              We do more than spot risks — we help you design a complete security plan that fits your business goals and comfort with risk.
            </p>

            <ul className="space-y-3 mb-6">
              <motion.li
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-orange-500 mt-1">⦿</span>
                <div>
                  <span className="text-white font-medium">Threat-Centric Methodology:</span>
                  <span className="text-gray-400"> Focused on your specific adversary landscape</span>
                </div>
              </motion.li>
              <motion.li
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-orange-500 mt-1">⦿</span>
                <div>
                  <span className="text-white font-medium">Business-Aligned Security:</span>
                  <span className="text-gray-400"> Solutions that support your operational goals</span>
                </div>
              </motion.li>
              <motion.li
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-orange-500 mt-1">⦿</span>
                <div>
                  <span className="text-white font-medium">Measurable Outcomes:</span>
                  <span className="text-gray-400"> Clear metrics to track security ROI</span>
                </div>
              </motion.li>
            </ul>

            <a href="https://calendly.com/krafosystems" target="_blank" rel="noopener noreferrer">
              <div className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-orange-600/40 inline-flex items-center" >
                Book a Session Now
              </div>
            </a>

          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-orange-500/20">
              <div className="bg-gradient-to-br from-gray-900 to-black w-full h-96 flex items-center justify-center">
                {/* Left: Images */}
                <div className="relative">
                  {/* Main Image */}
                  <img
                    src={studyGroup}
                    alt="Students learning"
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

              </div>
            </div>
          </motion.div>


        </div>
      </section>


      {/*Latest Insights Section*/}

      <section className="px-6 md:px-20 py-20 pt-0 bg-[#000000] text-white font-body">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F2600B]">Latest Insights</h2> <p className="text-base md:text-lg text-gray-300 mt-2"> Stay updated with the latest cybersecurity trends and stories shaping Africa’s digital future. </p>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {[
            {
              image: insight,
              title: "Education in 2025: Embracing Technology for Personalized Learning",
              desc: "Education in 2025 is characterized by the integration of technology to create personalized learning ....",
            },
            {
              image: insightes,
              title: "Protection in 2025: Advancements in Security Technologies",
              desc: "In 2025, protection technologies have evolved to address new challenges.....",
            },
            {
              image: insights,
              title: "Data Privacy in 2025: Striking a Balance Between Innovation and Protection",
              desc: "As data breaches become more frequent, individuals and organizations are prioritizing data privacy.....",
            },
          ].map((item, idx) =>
          (<div key={idx}
            className="group bg-white/5 p-6 rounded-2xl border border-[#F2600B22] shadow-xl hover:shadow-[0_0_25px_#F2600B33] hover:scale-[1.02] transition-all duration-300" >
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-32 object-cover rounded-xl mb-4"
              />
            ) : (
              <div className="bg-gradient-to-br from-[#F2600B22] to-[#ffffff0d] h-32 rounded-xl flex items-center justify-center text-xs text-orange-200 mb-4">
                Article Thumbnail
              </div>
            )}

            <h3 className="font-semibold text-lg text-white group-hover:text-[#F2600B] transition-colors duration-300">
              {item.title} </h3> <p className="text-sm text-gray-300 mt-2"> {item.desc} </p>
            <Link
              to="/blog-page" className="inline-block mt-4 text-sm font-medium text-[#F2600B] hover:underline" >
              Read More →
            </Link>
          </div>
          ))}
        </div>
      </section>


      {/* Partnership Section */}
      <PartnershipCarousel />


      {/* <section className="px-6 md:px-20 py-20 bg-[#0B0B0C] text-white font-body">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F2600B]">What Our Partners Say</h2>
          <p className="text-base md:text-lg text-gray-300">
            Testimonials from organizations we've helped secure
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {[
            {
              name: "Dr. Kwame Asante",
              role: "University Lecturer",
              avatar: "👨‍🏫",
              quote:
                "Krafo Systems transformed our approach to cybersecurity education. Their programs are comprehensive and culturally relevant.",
            },
            {
              name: "Sarah Owusu",
              role: "Tech Director, SaaS Co.",
              avatar: "👩‍💼",
              quote:
                "After a security breach, Krafo Systems helped us rebuild our defenses and train our team. Highly recommended!",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="group bg-white/5 p-6 rounded-2xl border border-[#F2600B22] backdrop-blur-md shadow-lg hover:shadow-[0_0_25px_#F2600B33] hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#F2600B] text-black flex items-center justify-center rounded-full text-lg font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mt-4 italic border-l-4 border-[#F2600B] pl-4">
                “{t.quote}”
              </p>
            </div>
          ))}
        </div>
      </section> */}


      <Footer />
    </>
  );
}