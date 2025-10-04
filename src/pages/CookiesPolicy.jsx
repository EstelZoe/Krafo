import React from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import { Link } from "react-router-dom";

export default function CookiesPolicy() {
  return (
    <div className="bg-black text-white font-body">
      <Navbar />
      <main className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
        {/* Animated Cyber Background Grid */}
        <div className="absolute inset-0 -z-10 opacity-10 animate-pulse bg-[radial-gradient(#F2600B22_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Cookies Policy
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              This is the Cookie Policy for Krafo Systems, accessible from
              yourwebsite.com
            </p>
          </div>

          <div className="mt-16 space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                What Are Cookies?
              </h2>
              <p>
                Cookies are small text files placed on your device by websites to help enhance your browsing experience. They allow websites to remember your preferences and activities, making your interactions smoother and more personalized.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                How We Use Cookies
              </h2>
              <p>
                We use cookies for a variety of reasons detailed below.
                Unfortunately, in most cases, there are no industry standard
                options for disabling cookies without completely disabling the
                functionality and features they add to this site. It is
                recommended that you leave on all cookies if you are not sure
                whether you need them or not in case they are used to provide a
                service that you use.
              </p>
            </section>

            {/* Add more sections as per your full cookies policy */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}