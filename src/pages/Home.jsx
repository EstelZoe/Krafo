import React from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import Book from "../assets/images/cyberart.jpg";
import Backimage from "../assets/images/bgimage.jpg";
import { GraduationCapIcon, SchoolIcon, } from "lucide-react";
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
      <section className="relative w-full max-w-[1440px] h-[700px] mx-auto">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center animate-zoom"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${Backimage})` }} ></div>

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
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded">
              Explore Courses
            </button>
            <button className="animate-pixelPop hover:bg-black bg-orange-500 text-white font-semibold px-6 py-2 rounded">
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-orange-700 from-[5%] to-black to-[50%] text-white px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-orange-500">Who We Serve</h2>
          <p className="text-gray-300 mb-10">
            We provide cybersecurity education and consultation to various sectors across Africa
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="bg-orange-400 rounded-lg p-6  hover:bg-gray-400 shadow-md transition ">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-200 p-4 rounded-full">
                  <GraduationCapIcon className="w-6 h-6" />

                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">JHS/SHS Students</h3>
              <p className="text-sm text-gray-700">
                Building cyber awareness from early education stages to create a security-conscious generation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-orange-400 rounded-lg p-6  hover:bg-gray-400 shadow-md transition ">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-200 p-4 rounded-full">
                  🎓
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Universities</h3>
              <p className="text-sm text-gray-700">
                Advanced cybersecurity programs and research initiatives for higher education institutions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-orange-400 rounded-lg p-6  hover:bg-gray-400 shadow-md transition ">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-200 p-4 rounded-full">
                  <SchoolIcon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Organizations</h3>
              <p className="text-sm text-gray-700">
                Post-breach recovery and prevention strategies for businesses and government entities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-black text-orange-600 px-4 py-16">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Courses</h2>
          <p className="text-gray-300 mb-10">
            Master cybersecurity with our comprehensive course offerings
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Cybersecurity Fundamentals",
                desc: "Learn the basics of cybersecurity including threat identification and prevention.",
                price: "$99",
                image: cybersecurityFundamentals,
              },
              {
                title: "Network Security",
                desc: "Advanced network protection techniques and implementation strategies.",
                price: "$149",
                image: networkSecurity,
              },
              {
                title: "Incident Response",
                desc: "Learn how to effectively respond to and manage cybersecurity incidents.",
                price: "$199",
                image: incidentResponse,
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-white border border-orange-500 rounded-lg shadow-md p-6 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="h-48 mb-4 bg-cover bg-center rounded-t-lg"
                    style={{ backgroundImage: `url(${course.image})` }}
                  ></div>
                  <h3 className="font-bold text-lg mb-2 text-black">
                    {course.title}
                  </h3>
                  <p className="text-sm text-black mb-4">{course.desc}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-orange-500">
                    {course.price}
                  </span>
                  <button className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 text-sm">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 py-16 bg-orange-500 text-black">
        {/* Upcoming Events */}
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Upcoming Events</h2>
          <p className="text-black mb-10">
            Join our upcoming cybersecurity events and workshops
          </p>

          <div className="grid gap-6 md:grid-cols-3">
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
              <div key={index} className="bg-white border border-orange-500 rounded-lg shadow-md p-6 text-left">
                <p className="text-sm text-orange-600 mb-2">{event.date}</p>
                <h3 className="font-bold text-lg mb-2 text-black">{event.title}</h3>
                <p className="text-sm text-black mb-4">{event.desc}</p>
                <button className="bg-black text-white px-4 py-1 rounded text-sm hover:bg-orange-500">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-auto md:h-[400px] overflow-hidden">
        {/* Background Video + Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 px-4 md:px-16 py-8 md:py-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Text Side */}
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                About Us
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                We are building Africa’s cybersecurity future, one digital warrior at a time.
              </p>
            </div>

            {/* Image Side */}
            <img
              src={cybered}
              alt="Cyber Visual"
              className="w-full max-w-xs md:max-w-sm h-auto md:h-[300px] rounded-lg shadow-lg object-cover mx-auto"
            />

          </div>
        </div>
      </section>



      {/* 1. Book a Consultation */}
      <section
        className="px-4 md:px-20 py-12 space-y-16 bg-cover bg-center bg-no-repeat text-white bg-black"
        style={{
          // backgroundImage: ` url(${Book})`
        }}
      >


        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-600">Book a Consultation</h2>
          <p className="text-sm md:text-base text-orange-600">Get personalized cybersecurity guidance for your organization</p>

          <div className="max-w-xl mx-auto bg-gray-100 p-6 rounded shadow">
            {/* Replace this with your actual Calendly embed */}
            <div className="h-48 bg-gray-300 flex items-center justify-center">
              Calendly Scheduler Embed
            </div>
            <button className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-orange-500">
              Schedule Now
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-20 py-12 space-y-16 bg-white text-black">
        {/* 2. Latest Insights */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">Latest Insights</h2>
          <p className="text-sm md:text-base mb-6">Stay updated with the latest cybersecurity trends and insights</p>

          <div className="grid md:grid-cols-3 gap-6">
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
              <div key={idx} className="bg-gray-100 p-4 rounded shadow text-left space-y-2">
                <div className="bg-gray-300 h-24 w-full rounded">Article Thumbnail</div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-20 py-12 space-y-16 bg-white text-black">
        {/* 3. Testimonials */}
        <div className="text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold">What Our Partners Say</h2>
          <p className="text-sm md:text-base">Testimonials from organizations we've helped secure</p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-100 p-4 rounded shadow space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full text-sm font-bold">👨‍🏫</div>
                <div>
                  <p className="font-semibold">Dr. Kwame Asante</p>
                  <p className="text-sm">University Lecturer</p>
                </div>
              </div>
              <p className="text-sm mt-2">“Krafo Systems transformed our approach to cybersecurity education. Their programs are comprehensive and culturally relevant.”</p>
            </div>

            <div className="bg-gray-100 p-4 rounded shadow space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full text-sm font-bold">👩‍💼</div>
                <div>
                  <p className="font-semibold">Sarah Owusu</p>
                  <p className="text-sm">Tech Director, SaaS Co.</p>
                </div>
              </div>
              <p className="text-sm mt-2">“After a security breach, Krafo Systems helped us rebuild our defenses and train our team. Highly recommended!”</p>
            </div>
          </div>
        </div>

      </section>


      <Footer />
    </>
  );
}
