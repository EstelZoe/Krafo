import React from "react";
import LegalPageLayout from "../assets/components/LegalPageLayout";

export default function CookiesPolicy() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Cookie Policy"
      intro='How Krafo Systems ("we", "us", "our") uses cookies and similar technologies when you visit krafosystems.com.'
    >
            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                What Are Cookies?
              </h2>
              <p className="leading-relaxed">
                Cookies are small text files that websites store on your device. They can be used for various purposes including site functionality, user tracking, analytics, and advertising. At Krafo Systems, we only utilize essential browser storage necessary for basic website operations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                How We Use Cookies
              </h2>
              <p className="leading-relaxed mb-4">
                At Krafo Systems, we are committed to transparency and your privacy. <strong>We do not use cookies for tracking, marketing, or analytics purposes.</strong>
              </p>
              <p className="leading-relaxed mb-4">
                Our website only uses essential browser functionality to ensure proper site operation. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 leading-relaxed">
                <li><strong>Session Management:</strong> Basic browser storage to maintain your navigation state as you move between pages</li>
                <li><strong>Site Functionality:</strong> Essential technical features required for the website to work properly</li>
                <li><strong>Security:</strong> Protection against common web vulnerabilities and ensuring secure browsing</li>
              </ul>
              <p className="leading-relaxed mt-4">
                We do not use third-party cookies, advertising cookies, or any tracking technologies that monitor your behavior across websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                Your Privacy Matters
              </h2>
              <p className="leading-relaxed">
                As a cybersecurity education company, we practice what we teach. We believe in respecting your privacy and only collecting data that is absolutely necessary for site functionality. You can browse our website with confidence knowing that we are not tracking or profiling your activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                Browser Settings
              </h2>
              <p className="leading-relaxed">
                Since we only use essential browser functionality, there is no need to manage or disable cookies on our site. However, if you wish to control how your browser handles storage and cookies in general, you can adjust your browser's privacy settings. Please note that blocking essential functionality may prevent certain features of our website from working properly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                Updates to This Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#F2600B] mb-4">
                Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have any questions about our Cookie Policy, please contact us at{" "}
                <a 
                  href="mailto:info@krafosystems.com" 
                  className="text-[#F2600B] hover:text-orange-500 underline transition-colors duration-200"
                >
                  info@krafosystems.com
                </a>.
              </p>
            </section>
    </LegalPageLayout>
  );
}
