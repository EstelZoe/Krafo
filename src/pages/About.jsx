import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import Krafoimage from "../assets/images/KRAFO ORIGINAL MARKAsset 73@2x.png";
import { Shield, GraduationCapIcon, Lightbulb, FileText, Lock, Home } from "lucide-react";
// import TeamCarousel from "../assets/components/TeamCarousel";

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
      <section className="bg-gray-300 text-black pt-24 pb-12 px-4 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Image Side */}
          <div>
            <img
              src={Krafoimage}
              alt="The KRAFO logo mark"
              className="w-full max-w-sm mx-auto max-h-[400px] object-contain rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
          {/* Text Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              About KRAFO
            </h2>
            <p className="text-gray-700 mb-4">
              KRAFO is dedicated to empowering African communities through
              cybersecurity education, awareness, and skills development. We
              work with schools, organizations, and individuals to create a
              safer digital environment.
            </p>
            <p className="text-gray-700">
              Our mission is to bridge the digital safety gap by providing
              accessible training and consulting services to everyone, from
              students to enterprises.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black py-16 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-orange-600 mb-12">
            Our Journey
          </h2>

          {/* Horizontal Timeline - uniform vertical layout for all years */}
          <div className="relative w-full flex flex-col items-center">
            {/* Timeline Bar */}
            <div className="relative w-full h-3 flex items-center mb-16">
              {/* Colored Segments */}
              <div className="flex w-full h-3 rounded-full overflow-hidden">
                <div className="flex-1 bg-red-400" />
                <div className="flex-1 bg-orange-400" />
                <div className="flex-1 bg-orange-600" />
              </div>
              {/* Year Dots (for accessibility/decoration) */}
              {journeyData.map((item, i) => (
                <div
                  key={item.year}
                  className="absolute"
                  style={{
                    left: `calc(${(i / (journeyData.length - 1)) * 100}% - 12px)`
                  }}
                >
                  <div className="w-6 h-6 bg-orange-500 rounded-full border-4 border-white shadow-lg" />
                </div>
              ))}
            </div>

            {/* Timeline Items - all centered below the timeline */}
            <div className="w-full flex justify-between relative" style={{ zIndex: 2 }}>
              {journeyData.map((item, i) => {
                // Pick icon
                const icons = [Lightbulb, FileText, Home, Lock];
                const Icon = icons[i % icons.length];
                // Color for icon bg
                const colors = ["bg-red-400", "bg-orange-400", "bg-orange-600", "bg-orange-500"];
                const color = colors[i % colors.length];
                return (
                  <div key={item.year} className="flex flex-col items-center w-1/5 min-w-[120px]">
                    {/* Dot above */}
                    <div className="w-5 h-5 bg-orange-500 rounded-full border-4 border-white shadow mb-1" />
                    {/* Vertical line */}
                    <div className="w-1 h-8 bg-gray-300" />
                    {/* Icon */}
                    <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white mb-2 shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {/* Description */}
                    <div className="text-center text-white text-sm max-w-[160px] mb-1 mt-1">{item.description}</div>
                    {/* Year */}
                    <div className="text-2xl font-bold text-orange-600">{item.year}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12 px-4 md:px-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-10">
          Meet Our Team
        </h2>

        {/* Animated 3D Carousel */}
        {/* <TeamCarousel /> */}
      </section>
      <section className="bg-black py-16 px-4 md:px-20">
        <h2 className="text-3xl md:text-3xl font-bold text-center text-black mb-10">
          Our Core Values
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="flex-1 min-w-[240px] bg-cyan-100 rounded-xl shadow-lg p-8 flex flex-col items-center border-2 border-cyan-500">
            <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-cyan-500 bg-white mb-4">
              <Shield className="w-7 h-7 text-cyan-600" strokeWidth={2.2} />
            </div>
            <h3 className="font-bold text-lg text-cyan-900 mb-2">Protect</h3>
            <p className="text-gray-700 text-center text-sm">Safeguarding digital assets and infrastructure from emerging threats</p>
          </div>
          {/* Card 2 */}
          <div className="flex-1 min-w-[240px] bg-orange-100 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-orange-400 bg-white mb-4">
              <FileText className="w-7 h-7 text-orange-500" strokeWidth={2.2} />
            </div>
            <h3 className="font-bold text-lg text-orange-900 mb-2">Prevent</h3>
            <p className="text-gray-700 text-center text-sm">Proactive measures to stop security breaches before they occur</p>
          </div>
          {/* Card 3 */}
          <div className="flex-1 min-w-[240px] bg-yellow-100 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-yellow-400 bg-white mb-4">
              <GraduationCapIcon className="w-7 h-7 text-yellow-500" strokeWidth={2.2} />
            </div>
            <h3 className="font-bold text-lg text-yellow-900 mb-2">Educate</h3>
            <p className="text-gray-700 text-center text-sm">Empowering individuals with knowledge and practical skills</p>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-16 px-4 md:px-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Join Our Mission</h2>
        <p className="max-w-xl mx-auto text-sm md:text-base mb-6">
          Be part of the cybersecurity revolution. Together, we can build a safer digital world for everyone.
        </p>
        <button className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-orange-500 hover:text-white transition-colors">
          Get Started Today
        </button>
      </section>



      <Footer variant="orange" />  
    
    </>
  );
}