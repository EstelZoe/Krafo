import React from "react";
import phoneImage from "../assets/images/3221.jpg";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";

export default function ContactUs() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black flex items-center justify-center p-4 pt-14">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row max-w-5xl w-full hover:shadow-orange-600/30 hover:scale-[1.02] transition-transform duration-300">

          {/* Left side - Image */}
          <div className="md:w-1/2 bg-gradient-to-br from-orange-700 to-black">
            <img
              src={phoneImage}
              alt="Contact"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - Form */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-[#0a0a0a] to-[#111]">
            <h2 className="text-2xl font-bold text-orange-500 mb-2">
              Need support?
            </h2>
            <a href="https://calendly.com/krafosystems" target="_blank" rel="noopener noreferrer">
              <div className="pt-2 pb-4 ">
                <button type="submit" className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-lg transition cursor-pointer">
                  Contact Us For Any Assistance
                </button>
              </div>
            </a>
            <form>

              {/* Optional: "How did you hear about us?" */}
              <div>
                <select name="referral" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-900"  >
                  <option value="">How did you hear about us?</option>
                  <option value="search">Search Engine</option>
                  <option value="social">Social Media</option>
                  <option value="friend">Friend/Colleague</option>
                  <option value="event">Event/Conference</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="pt-2 pb-4 ">
                <button type="submit" className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-lg transition cursor-pointer">
                 Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}