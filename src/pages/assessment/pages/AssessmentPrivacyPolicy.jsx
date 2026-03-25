import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ToolkitNavbar from '../components/ToolkitNavbar';

const LAST_UPDATED = 'March 2025';
const COMPANY = 'KRAFO Systems';
const EMAIL = 'info@krafosystems.com';

export default function AssessmentPrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/assessment-toolkit/start" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition">
          <ArrowLeft size={16} /> Back
        </Link>

        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">1. Introduction</h2>
            <p>
              {COMPANY} ("we", "us", or "our") operates the Cybersecurity Assessment Toolkit (the "Service").
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
              you use the Service. Please read this policy carefully. If you disagree with its terms, please
              discontinue use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">2. Information We Collect</h2>
            <p>We collect the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><span className="text-white font-medium">Account Information:</span> First name, last name, email address, company name, and a hashed password when you register.</li>
              <li><span className="text-white font-medium">Assessment Responses:</span> Your answers to the 37 cybersecurity maturity questions across seven NIST domains.</li>
              <li><span className="text-white font-medium">Derived Data:</span> Risk scores, NIST function scores, and risk level classifications calculated from your responses.</li>
              <li><span className="text-white font-medium">Usage Data:</span> Timestamps of assessment completion, login activity, and reminder interactions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Create and manage your assessment account.</li>
              <li>Generate your personalised cybersecurity risk report and PDF.</li>
              <li>Send you your assessment results and follow-up communications.</li>
              <li>Send a one-time reminder (approximately 48 hours after completion) if you have not yet booked a consultation.</li>
              <li>Improve the accuracy and relevance of our assessment methodology.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">4. Legal Basis for Processing</h2>
            <p>
              We process your personal data on the basis of your explicit consent provided at registration,
              and where necessary for the performance of the service you have requested. You may withdraw
              consent at any time by contacting us at <a href={`mailto:${EMAIL}`} className="text-orange-400 hover:underline">{EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">5. Data Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share
              aggregated, anonymised data for research or marketing purposes. We may disclose your
              information where required by law or to protect the rights and safety of {COMPANY} and its users.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">6. Data Retention</h2>
            <p>
              We retain your account and assessment data for as long as your account is active or as needed
              to provide the Service. You may request deletion of your data at any time by contacting us.
              Upon deletion, your personal information will be permanently removed within 30 days, except
              where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">7. Data Security</h2>
            <p>
              We implement industry-standard security measures including password hashing (bcrypt), JWT-based
              authentication, HTTPS encryption in transit, and access controls. No method of transmission
              over the internet is 100% secure; we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">8. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data ("right to be forgotten").</li>
              <li>Object to or restrict processing of your data.</li>
              <li>Data portability — receive your data in a structured, machine-readable format.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at <a href={`mailto:${EMAIL}`} className="text-orange-400 hover:underline">{EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">9. Cookies</h2>
            <p>
              The Assessment Toolkit uses browser localStorage to persist your session token and assessment
              progress. No third-party tracking cookies are used within the assessment flow.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes
              by updating the "Last updated" date above. Continued use of the Service after changes
              constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">11. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at:{' '}
              <a href={`mailto:${EMAIL}`} className="text-orange-400 hover:underline">{EMAIL}</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
