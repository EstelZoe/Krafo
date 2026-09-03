import React from "react";
import LegalPageLayout from "../assets/components/LegalPageLayout";

export default function TermsAndConditions() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="October 1, 2025"
      intro="How your use of KrafoSystems.com, our services, consultations and training is governed."
    >
            <section>
              <p className="leading-relaxed">
                Welcome to KrafoSystems.com, operated by Krafo Systems Ltd ("we", "our", or "us"). These
                Terms and Conditions ("Terms") govern your use of our website, services, and any related
                interactions, including booking consultations and enrolling in cybersecurity training.
              </p>
              <p className="leading-relaxed mt-4">
                By accessing or using our website, you agree to be bound by these Terms.
              </p>
            </section>

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
    </LegalPageLayout>
  );
}