import React from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="bg-black text-white font-body">
      <Navbar />
      <main className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
        {/* Animated Cyber Background Grid */}
        <div className="absolute inset-0 -z-10 opacity-10 animate-pulse bg-[radial-gradient(#F2600B22_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-[#F2600B]">
              Privacy Policy for KrafoSystems.com
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Last updated: May 20, 2026
            </p>
          </div>

          <div className="mt-16 space-y-8 text-gray-300">
            {/* 1. Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                Krafo Systems is a licensed Cybersecurity Service Provider with the Cyber Security Authority and Registered with the
                Data Protection Commission. We are committed to protecting your personal data in compliance with Ghana's Data
                Protection Act, 2012 (Act 843), the Cybersecurity Act, 2020 (Act 1038), and the Electronic Transactions Act, 2008 (Act
                772).
              </p>
            </section>

            {/* 2. Data Controller */}
            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">2. What Personal Data We Collect</h2>
              <p className="leading-relaxed">
                When you use our services, attend our training, or contact us, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 leading-relaxed mt-4">
                <li>Your name, email address, phone number, and business details to include compliance status.</li>
                <li>
                  Payment information for services and training
                </li>
                <li>Cybersecurity assessment results (where you have engaged us for an audit)</li>
                <li>Certification and training records (retained permanently for verification purposes)</li>
              </ul>
              <p>We collect only the information we need to deliver your services. We do not sell, rent, or trade your personal data.</p>
            </section>

            {/* 3. Data We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">3. Why We Process Your Data</h2>
              <p className="leading-relaxed">We process your personal data to deliver the services you have requested, process your payments, issue certifications,
                and communicate with you about your engagement with us. When we send you marketing information we will always ask
                for your consent first either verbally , in writing , and or through consent ackn owledgement on your beha lf. By law y ou can
                withdraw it at any time.</p>

            </section>

            {/* 4. Purpose */}
            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">4. How Long We keep Your Data For?</h2>

              <ul className="list-disc list-inside space-y-2 ml-4 leading-relaxed mt-2">
                <li>Your name, email address, phone number, and business details : Kept during the duration of the relationship
                  between our clients and either after relationship has ended with the client or 6 years depending on which on
                  either Act 772 s.8(2) or Act 843 s.24(5)</li>
                <li>Client payment records: Kept for the duration of your service relationship and for 7 years after it ends, as
                  required by Ghana Revenue Authority tax obligations.</li>
                <li>Cybersecurity assessment results are kept for as long as the data is needed b ut will de -identify the
                  information to pr otect ou r clients .</li>
                <li>Certification records: Kept permanently so that your qualification can be verified at any time.</li>
                <li>Marketing data: Until you withdraw your consent.</li>
              </ul>

            </section>

            {/* 5. Legal Basis */}
            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">5. Your rights under Act 843</h2>
              <p className="leading-relaxed">
                Under Ghana's Data Protection Act, 2012 (Act 843), you have the right to:
              </p>
              <ul>
                <li>
                  Access: Request a copy of the personal data we hold about you.
                </li>

                <li>
                  Correction:Ask us to correct any inaccurate or incomplete data.
                </li>
                <li>
                  Deletion: Ask us to delete your data where we no longer have a legal reason to hold it.
                </li>
                <li>
                  Objection: Opt out of marketing communications at any time.
                </li>
                <li>
                  Withdraw consent: At any time, without affecting anything we have already done lawfully.
                </li>
              </ul>
            </section>

            {/* 6. Data Sharing */}
            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">6. Contact Us </h2>
              <p className="leading-relaxed">We will respond to all requests within 21 days. </p>
              <ul className="list-disc list-inside space-y-2 ml-4 leading-relaxed mt-2">
                <li>
                  To exercise your rights, please visit:
                  <a
                    href="https://krafosystems.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://krafosystems.com
                  </a>
                </li>
                <li>
                  Service providers (e.g. email service providers, cloud hosting) under contract, who also
                  ensure confidentiality and security
                </li>
                <li>
                  Or call us on:
                  <a href="tel:+23359319600">+233 59 319 600</a>
                </li>
              </ul>
            </section>

            {/* 7. Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">7. How we protect your data</h2>
              <ul className="list-disc list-inside space-y-2 ml-4 leading-relaxed">
                <li>We apply the security measures required under Act 843 s.28 including encryption of data at rest and in transit, multi -
                  factor authentication on all business accounts, role -based access controls, regular backups, and annual staff data
                  protection training. Al l third -party processors who handle your data on our behalf sign a Data Processing Agreement and must meet our security standards.</li>
              </ul>
            </section>

            {/* 8. Retention */}
            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">8. If Something Goes Wrong</h2>
              <p className="leading-relaxed">
                In the event of a data breach we will notify the Cyber Security Authority (CSA) within 24 hours as required by Act 1038
                s.6(1), notify the Data Protection Commission (DPC) as soon as reasonably practicable as required by Act 843 s.31, and contact you directly with the information you need to protect yourself.
              </p>
              <p className="leading-relaxed mt-4">If you are not satisfied with how we handle your data you have the right to contact the Data Protection Commission directly:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 leading-relaxed mt-2">
                <li>
                  Data Protection Commission:
                  <a
                    href="https://www.dataprotection.org.gh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.dataprotection.org.gh
                  </a>
                   </li>
                  <li>
                    <a href="mailto:registration@dataprotection.org.gh">
                      registration@dataprotection.org.gh
                    </a>
                  </li>

                  <li>
                    <a href="tel:+233256302031">
                      +233 25 630 2031
                    </a>
                  </li>

               
              </ul>

            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
