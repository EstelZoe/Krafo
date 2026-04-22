import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ToolkitNavbar from '../components/ToolkitNavbar';

const LAST_UPDATED = 'March 2025';
const COMPANY = 'KRAFO Systems';
const EMAIL = 'info@krafosystems.com';

export default function AssessmentTermsOfUse() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/assessment-toolkit/start" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition">
          <ArrowLeft size={16} /> Back
        </Link>

        <h1 className="text-3xl font-bold mb-2">Terms of Use</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By creating an account and using the {COMPANY} Cybersecurity Assessment Toolkit (the "Service"),
              you agree to be bound by these Terms of Use. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">2. Description of Service</h2>
            <p>
              The Service provides a self-assessment tool based on the NIST Cybersecurity Framework to help
              organisations evaluate their cybersecurity maturity. The Service generates a risk report and
              facilitates connection with {COMPANY} cybersecurity consultants.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">3. Eligibility</h2>
            <p>
              You must be at least 18 years of age and have the authority to represent the organisation on
              whose behalf you are completing the assessment. By registering, you confirm that the information
              you provide is accurate and complete.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">4. Account Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must notify us immediately of any unauthorised use of your account.</li>
              <li>You may not share your account with others or create accounts on behalf of third parties without authorisation.</li>
              <li>One account per individual or organisation is permitted.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Provide false or misleading information in your assessment responses.</li>
              <li>Attempt to reverse-engineer, scrape, or extract the assessment scoring methodology.</li>
              <li>Use the Service for any unlawful purpose or in violation of any applicable regulations.</li>
              <li>Interfere with or disrupt the integrity or performance of the Service.</li>
              <li>Attempt to gain unauthorised access to any part of the Service or its infrastructure.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">6. Disclaimer of Warranties</h2>
            <p>
              The Service and its outputs, including risk scores and reports, are provided for informational
              purposes only. They do not constitute professional cybersecurity advice, legal advice, or a
              guarantee of security. {COMPANY} makes no warranties, express or implied, regarding the
              accuracy, completeness, or fitness for a particular purpose of the assessment results.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, {COMPANY} shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of or inability
              to use the Service, even if advised of the possibility of such damages. Our total liability
              shall not exceed the amount paid by you for the Service in the twelve months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">8. Intellectual Property</h2>
            <p>
              All content, scoring methodology, report templates, and software comprising the Service are
              the exclusive property of {COMPANY} and are protected by applicable intellectual property laws.
              You are granted a limited, non-exclusive, non-transferable licence to use the Service for its
              intended purpose only.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">9. Communications</h2>
            <p>
              By creating an account, you consent to receive transactional emails related to your assessment
              (e.g., your report, OTP codes) and a single follow-up reminder approximately 48 hours after
              completing your assessment. You may opt out of non-transactional communications at any time.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">10. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at our discretion if you violate
              these Terms. You may delete your account at any time by contacting us at{' '}
              <a href={`mailto:${EMAIL}`} className="text-orange-400 hover:underline">{EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction
              in which {COMPANY} is registered, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">12. Changes to Terms</h2>
            <p>
              We may revise these Terms at any time. Continued use of the Service after changes are posted
              constitutes your acceptance of the revised Terms. We will update the "Last updated" date above
              when changes are made.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">13. Contact</h2>
            <p>
              For questions about these Terms, contact us at:{' '}
              <a href={`mailto:${EMAIL}`} className="text-orange-400 hover:underline">{EMAIL}</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

