import React from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import Book from "../assets/images/cyberart.jpg";
import Backimage from "../assets/images/bgimage.jpg";
import { GraduationCapIcon, SchoolIcon, Building2 } from "lucide-react";
import cybered from "../assets/images/abstract.jpg";
import cybersecurityFundamentals from "../assets/images/cyberyouthed1.png";
import incidentResponse from "../assets/images/cyber.jpg";
import networkSecurity from "../assets/images/cyberart.jpg";
import Video from "../assets/videos/backgroundcybered.mp4";



export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full max-w-[1440px] h-[650px] mx-auto">
        <div
          className="absolute top-0 left-0 w-full h-[100%] bg-cover bg-center animate-zoom"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 3)), url(${Backimage})`
          }}
        ></div>

        {/* text-sector */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full text-left text-white px-8 md:px-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 max-w-2xl">
            Protecting Africa Through Cyber Literacy
          </h1>
          <p className="text-lg md:text-xl mb-4 max-w-2xl">
            Empowering the next generation with cybersecurity knowledge and
            skills to secure Africa's digital future
          </p>

          <div className="flex space-x-4">
            <button className="bg-[#F2600B] hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md transition">
              Explore Courses
            </button>
            <button className="border border-[#F2600B] hover:bg-[#F2600B] text-white px-6 py-2 rounded-md transition">
              Book Consultation
            </button>
          </div>
        </div>
      </section>
      
      {/* Who We Serve */}
      <section className="py-6 bg-brand-dark bg-black text-[#F2600B] text-brand-dark-foreground px-8 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-orange">Our Services</h2>
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

      {/*Featured Courses*/}
      <section className="relative isolate px-6 pt-0 py-24 sm:py-32 sm:pt-20 lg:px-8 bg-[#000000] text-white font-body">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            className="mx-auto aspect-[1155/678] w-[1155px] opacity-30"
            style={{
              background: "linear-gradient(to top right, #F2600B, #F2600B55)",
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold text-[#F2600B] tracking-wider uppercase">Courses</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose the right program for you
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-gray-400">
            Empower your journey in cybersecurity with courses tailored for students, professionals, and organizations across Africa.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-y-6 gap-x-6 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* Cyber Essentials */}
          <div className="rounded-3xl bg-[#1A1A1A]/60 p-9 ring-1 ring-[#F2600B33] backdrop-blur-md hover:shadow-[0_0_25px_#F2600B88] hover:ring-[#F2600B] hover:scale-[1.02] transition duration-300">
            <h3 className="text-base font-semibold text-[#F2600B]">Cyber Essentials</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-4xl font-semibold tracking-tight text-white">$49</span>
              <span className="text-base text-gray-400">/course</span>
            </p>
            <p className="mt-6 text-base text-gray-400">
              Start your journey into cybersecurity with a foundational course built for newcomers.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-gray-300">
              <li className="flex gap-x-3">✓ Threat basics and safe online behavior</li>
              <li className="flex gap-x-3">✓ Lifetime access & resources</li>
              <li className="flex gap-x-3">✓ Certificate of completion</li>
            </ul>
            <a
              href="#"
              className="mt-8 block rounded-md text-[#F2600B] text-center text-sm font-semibold ring-1 ring-[#F2600B44] hover:bg-[#F2600B22] transition px-3.5 py-2.5"
            >
              Enroll Now
            </a>
          </div>

          {/* Cyber Pro */}
          <div className="rounded-3xl bg-[#0E0E0E] p-7 shadow-2xl ring-1 ring-[#F2600B55] hover:shadow-[0_0_25px_#F2600B88] hover:ring-[#F2600B] hover:scale-[1.02] transition duration-300">
            <h3 className="text-base font-semibold text-orange-400">Cyber Pro</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-4xl font-semibold tracking-tight text-white">$149</span>
              <span className="text-base text-gray-400">/course</span>
            </p>
            <p className="mt-6 text-base text-gray-300">
              A career-focused track for professionals seeking industry-level cybersecurity mastery.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-gray-300">
              <li className="flex gap-x-3">✓ Penetration testing techniques</li>
              <li className="flex gap-x-3">✓ Real-world case simulations</li>
              <li className="flex gap-x-3">✓ Community & mentorship access</li>
              <li className="flex gap-x-3">✓ Exclusive digital credentials</li>
            </ul>
            <a
              href="#"
              className="mt-8 block rounded-md bg-[#F2600B] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow hover:bg-orange-600 transition"
            >
              Enroll Now
            </a>
          </div>

          {/* Cyber Elite */}
          <div className="rounded-3xl bg-[#131313] p-8 ring-1 ring-[#F2600B88] backdrop-blur-md hover:shadow-[0_0_25px_#F2600B88] hover:ring-[#F2600B] hover:scale-[1.02] transition duration-300">
            <h3 className="text-base font-semibold text-orange-300">Cyber Elite</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-4xl font-semibold tracking-tight text-white">$249</span>
              <span className="text-base text-gray-400">/course</span>
            </p>
            <p className="mt-6 text-base text-gray-400">
              For leaders, auditors, and security officers driving strategy, compliance, and enterprise defense.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-gray-300">
              <li className="flex gap-x-3">✓ Red team/Blue team simulations</li>
              <li className="flex gap-x-3">✓ Governance, risk & compliance (GRC)</li>
              <li className="flex gap-x-3">✓ Incident response and leadership</li>
              <li className="flex gap-x-3">✓ Private cohort and live workshops</li>
            </ul>
            <a
              href="#"
              className="mt-8 block rounded-md text-[#F2600B] text-center text-sm font-semibold ring-1 ring-[#F2600B44] hover:bg-[#F2600B22] transition px-3.5 py-2.5"
            >
              Enroll Now
            </a>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="px-6 py-24 pt-0 bg-[#000000] text-white font-body">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F2600B] mb-4">Upcoming Events</h2>
          <p className="text-gray-300 mb-12 text-lg">
            Join our upcoming cybersecurity events and workshops
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                date: "March 15, 2025",
                title: "Cybersecurity Awareness Workshop",
                desc: "Interactive workshop on identifying and preventing cyber threats.",
              },
              {
                date: "March 22, 2025",
                title: "Youth Cyber Champions Summit",
                desc: "Empowering young Africans with cybersecurity knowledge.",
              },
              {
                date: "April 5, 2025",
                title: "Enterprise Security Bootcamp",
                desc: "Advanced security strategies for business organizations.",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="group bg-[#131313]/60 border border-[#F2600B33] backdrop-blur-md p-6 rounded-2xl text-left transition-all duration-300 hover:ring-1 hover:ring-[#F2600B] hover:shadow-[0_0_25px_#F2600B55] hover:scale-[1.02]"
              >
                <p className="text-sm text-[#F2600B] mb-2">{event.date}</p>
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#F2600B] transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-300 mb-4">{event.desc}</p>
                <button className="bg-[#F2600B] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-orange-600 transition">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
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
        <div className="relative z-10 px-6 md:px-16 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Side */}
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-[#F2600B] drop-shadow-md">
                About CyberEd
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0">
                We are building Africa’s cybersecurity future—one digital warrior at a time. Through education, innovation, and strategy, we empower the next generation of secure tech leaders.
              </p>
              <a
                href="#"
                className="inline-block mt-4 px-6 py-3 bg-[#F2600B] hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-all shadow-lg"
              >
                Learn More
              </a>
            </div>

            {/* Image Side */}
            <div className="flex justify-center">
              <img
                src={cybered}
                alt="Cyber Visual"
                className="w-full max-w-sm md:max-w-md h-auto rounded-2xl border border-[#F2600B33] shadow-2xl object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>



      {/*Book a Consultation*/}
      <section
        className="relative px-6 md:px-20 py-20 pt-0 bg-black text-white overflow-hidden font-body"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.98))`,
        }}
      >
        {/* Decorative Gradient Blob */}
        <div
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 blur-3xl opacity-30 -z-10"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle at center, #F2600B55 0%, transparent 70%)",
          }}
        ></div>

        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F2600B]">Book a Consultation</h2>
          <p className="text-md md:text-lg text-gray-300 max-w-xl mx-auto">
            Get personalized cybersecurity guidance tailored to your organization's needs.
          </p>

          <div className="max-w-2xl mx-auto mt-10 bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-[#F2600B33] shadow-xl transition hover:shadow-[0_0_30px_#F2600B33] hover:scale-[1.01]">
            {/* Calendly Embed Placeholder */}
            <div className="h-56 md:h-64 bg-gradient-to-br from-[#F2600B22] to-[#ffffff0d] border border-dashed border-[#F2600B66] rounded flex items-center justify-center text-sm text-orange-200 italic">
              Calendly Scheduler Embed
            </div>
            <button className="mt-6 bg-[#F2600B] hover:bg-orange-600 text-white px-6 py-3 rounded-md text-sm font-semibold shadow transition">
              Schedule Now
            </button>
          </div>
        </div>
      </section>


      {/*Latest Insights Section*/}

      <section className="px-6 md:px-20 py-20 pt-0 bg-[#000000] text-white font-body">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F2600B]">Latest Insights</h2>
          <p className="text-base md:text-lg text-gray-300 mt-2">
            Stay updated with the latest cybersecurity trends and stories shaping Africa’s digital future.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "The Rise of Cyber Threats in Africa",
              desc: "Understanding the evolving landscape of cybersecurity challenges across the continent.",
            },
            {
              title: "Building Cyber Resilience in Schools",
              desc: "How educational institutions can protect themselves from cyber attacks.",
            },
            {
              title: "Youth as Cyber Champions",
              desc: "Empowering the next generation to lead Africa's cybersecurity efforts.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group bg-white/5 p-6 rounded-2xl border border-[#F2600B22] shadow-xl backdrop-blur-md hover:shadow-[0_0_25px_#F2600B33] hover:scale-[1.02] transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-[#F2600B22] to-[#ffffff0d] h-32 rounded-xl flex items-center justify-center text-xs text-orange-200 mb-4">
                Article Thumbnail
              </div>
              <h3 className="font-semibold text-lg text-white group-hover:text-[#F2600B] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-gray-300 mt-2">
                {item.desc}
              </p>
              <a
                href="#"
                className="inline-block mt-4 text-sm font-medium text-[#F2600B] hover:underline"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-20 py-20 bg-[#0B0B0C] text-white font-body">
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
      </section>


      <Footer />
    </>
  );
}
