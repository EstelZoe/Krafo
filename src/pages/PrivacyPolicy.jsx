import React from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="bg-black text-white font-body">
      <Navbar />
      <main className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
        {/* Animated Cyber Background Grid */}
        <div className="absolute inset-0 -z-10 opacity-10 animate-pulse bg-[radial-gradient(#F2600B22_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Last updated: October 1, 2025
            </p>
          </div>

          <div className="mt-16 space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                1. Introduction
              </h2>
              <p>
                Welcome to KrafoSystems. We respect your privacy and are
                committed to protecting your personal data. This policy explains
                how we collect, use, disclose, and safeguard your information
                when you use our website, book a consultation, or enroll in our
                courses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                2. Data Controller Information
              </h2>
              <p>
                KrafoSystems is the data controller under the Data Protection
                Act, 2012 (Act 843) of Ghana. For any questions or requests
                concerning your personal data, you can contact us at:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 pl-4">
                <li>
                  <strong>Physical Address:</strong> GE-294-1752, 14 Haatso
                  Atomic Rd, Accra Ghana
                </li>
                <li>
                  <strong>Email address:</strong>{" "}
                  <a
                    href="mailto:info@krafosystems.com"
                    className="text-orange-500 hover:underline"
                  >
                    info@krafosystems.com
                  </a>
                </li>
                <li>
                  <strong>Phone number:</strong> (+233) 59-319-6002
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                3. Data We Collect
              </h2>
              <p>We collect the following personal data when you:</p>
              <ul className="list-disc list-inside mt-4 space-y-2 pl-4">
                <li>
                  <strong>Book a consultation or enroll in a course:</strong>{" "}
                  Name, Email, Phone / WhatsApp number
                </li>
                <li>
                  Other information you may provide voluntarily in forms (course
                  preferences, feedback etc.)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                4. Purpose of Processing/ Why We Collect Your Data
              </h2>
              <p>We use your data to:</p>
              <ul className="list-disc list-inside mt-4 space-y-2 pl-4">
                <li>Respond to your enquiries and schedule consultations</li>
                <li>Enroll you in courses and manage course delivery</li>
                <li>
                  Send you relevant updates / information about courses or
                  services (only if you opt in)
                </li>
                <li>Improve our website, services and user experience</li>
                <li>
                  Send marketing emails — only if you’ve agreed to receive them
                </li>
              </ul>
              <p className="mt-4">
                We do not sell your information or spam you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                5. Legal Basis
              </h2>
              <p>
                Under Ghana’s Data Protection Act, your consent is the legal
                basis for processing your personal data for the purposes above.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                6. Data Sharing & Recipients
              </h2>
              <p>
                We do not sell your data. We may share your information with:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 pl-4">
                <li>
                  Our staff / contractors who assist in course delivery or
                  customer support
                </li>
                <li>
                  Service providers (e.g. email service providers, cloud
                  hosting) under contract, who also ensure confidentiality and
                  security
                </li>
              </ul>
              <p className="mt-4">
                We do not share your information with advertisers or unrelated
                third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                7. Cookies & Tracking Technologies
              </h2>
              <p>
                We use necessary cookies for essential site functionality. We may
                use analytics / tracking cookies (e.g. Google Analytics) - only
                if you consent to them - to understand how people use our
                website. You can refuse or withdraw consent at any time via the
                cookie settings. You can read more in our{" "}
                <Link to="/cookies-policy" className="text-orange-500 hover:underline">Cookies Notice</Link>.
                You can also control cookies in your browser settings or through
                our cookie pop-up.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                8. Data Retention/ How Long We Keep Your Data
              </h2>
              <p>
                We will retain your personal data for as long as needed to
                fulfil the purposes above, or as required by law. We only keep
                your information as long as we need to — for example:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 pl-4">
                <li>While you are taking a course</li>
                <li>To follow up after a consultation</li>
                <li>To meet legal or business requirements</li>
              </ul>
              <p className="mt-4">
                After that, we delete or anonymize your information. Unless you
                request deletion, data related to course records may be kept for
                12 months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                9. Security/ How We Keep Your Data Safe
              </h2>
              <p>
                We implement technical and organizational measures to protect
                your data from unauthorized access, loss, alteration, or
                destruction. These include HTTPS, access controls, regular
                backups and staff training.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                10. Your Rights
              </h2>
              <p>
                As a data subject under Ghana’s Data Protection Act 843, you
                have the right to:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 pl-4">
                <li>Ask what personal data we hold about you</li>
                <li>Access your personal data</li>
                <li>Correct / update inaccurate or incomplete data</li>
                <li>Ask us to delete your data (where applicable)</li>
                <li>Withdraw consent at any time</li>
                <li>
                  Lodge a complaint with the Data Protection Commission if you
                  believe we are not complying
                </li>
              </ul>
              <p className="mt-4">
                To use any of these rights, contact us at{" "}
                <a
                  href="mailto:info@krafosystems.com"
                  className="text-orange-500 hover:underline"
                >
                  info@krafosystems.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                11. International Transfers
              </h2>
              <p>
                If your data is transferred outside Ghana (e.g. for hosting or
                cloud services), we will ensure that proper safeguards are in
                place, such as data processing agreements or other legal means
                as required under Act 843.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                12. International Visitors
              </h2>
              <p>
                Although we are based in Ghana, people from around the world can
                use our website. We follow Ghana’s privacy laws and aim to meet
                global standards like GDPR (used in the EU).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                13. Changes to this Policy
              </h2>
              <p>
                We may update this Privacy Policy periodically. We will notify
                you of any big changes by posting the new policy on our website
                with an updated “Last updated” date.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}