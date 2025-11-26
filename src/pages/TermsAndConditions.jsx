import React from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";

export default function TermsAndConditions() {
  return (
    <div className="bg-black text-white font-body">
      <Navbar />
      <main className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
        {/* Animated Cyber Background Grid */}
        <div className="absolute inset-0 -z-10 opacity-10 animate-pulse bg-[radial-gradient(#F2600B22_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Terms and Conditions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Last updated: October 1, 2025
            </p>
          </div>

          <div className="mt-16 space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">1. Services Offered</h2>
              <p className="leading-relaxed">
                We are a cybersecurity service provider (CSP) that bridges the gap between organizations and cybersecurity awareness by providing ICT consulting, training, risk and vulnerability assessments, policy management, and network monitoring. We also provide online courses. We reserve the right to modify or discontinue any service without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">2. User Responsibilities</h2>
              <p className="leading-relaxed">By using our site or services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 leading-relaxed">
                <li>Provide accurate, up-to-date information when registering or booking</li>
                <li>Not use the website for any unlawful purpose</li>
                <li>Not copy, reproduce, or misuse any content or materials from this website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">3. Booking Consultations</h2>
              <p className="leading-relaxed">
                Consultation bookings are subject to availability. We may reschedule or cancel in rare circumstances, in which case we will notify you promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">4. Course Enrollment</h2>
              <p className="leading-relaxed">
                Course access details (dates, delivery mode, requirements) will be shared upon registration and payment, if applicable.
              </p>
              <p className="leading-relaxed mt-4">We reserve the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 leading-relaxed">
                <li>Refuse or cancel enrollment in cases of non-compliance or misuse</li>
                <li>Modify course content or schedules for quality or technical reasons</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">5. Refunds & Cancellations</h2>
              <p className="leading-relaxed">
                If refunds apply, they will be guided by a separate Refund Policy (available on request or on the course page). Not all courses are refundable after access is granted.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">6. Intellectual Property</h2>
              <p className="leading-relaxed">
                All website content — including logos, text, videos, and course materials — is the intellectual property of Krafo Systems Ltd or its licensors. You may not reproduce, distribute, or reuse without our written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">7. Limitation of Liability</h2>
              <p className="leading-relaxed">We do our best to provide accurate, secure services. However, Krafo Systems Ltd is not liable for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 leading-relaxed">
                <li>Technical issues beyond our control</li>
                <li>Losses due to user negligence or misuse</li>
                <li>Any indirect, incidental, or consequential damages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">8. Data Protection & Privacy</h2>
              <p className="leading-relaxed">
                Your use of this website is also governed by our Privacy Policy and Cookies Notice. We comply with the Data Protection Act, 2012 (Act 843) of Ghana.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">9. Modifications</h2>
              <p className="leading-relaxed">
                We may update these Terms from time to time. By continuing to use the site, you accept any revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">10. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms are governed by the laws of the Republic of Ghana. Any disputes shall be resolved under the jurisdiction of Ghanaian courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">11. Contact</h2>
              <p className="leading-relaxed">
                For questions about these Terms, please contact:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 leading-relaxed">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:info@krafosystems.com"
                    className="text-[#F2600B] hover:text-orange-500 underline transition-colors duration-200"
                  >
                    info@krafosystems.com
                  </a>
                </li>
                <li>Phone: (+233) 59-319-6002</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}