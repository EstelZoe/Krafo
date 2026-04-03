import { Shield, Users, FileCheck, Zap, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ToolkitNavbar from '../components/ToolkitNavbar';
import Footer from '../../../assets/components/Footer';

const solutions = [
  {
    icon: Shield,
    title: 'Security Consulting',
    description: 'Expert guidance on building and improving your cybersecurity program.',
    features: ['Risk assessments', 'Security architecture', 'Policy development']
  },
  {
    icon: Users,
    title: 'Managed Security Services',
    description: '24/7 monitoring and management of your security infrastructure.',
    features: ['SOC services', 'Threat monitoring', 'Incident response']
  },
  {
    icon: FileCheck,
    title: 'Compliance Assistance',
    description: 'Navigate regulatory requirements with confidence.',
    features: ['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR']
  },
  {
    icon: Zap,
    title: 'Incident Response',
    description: 'Rapid response to security incidents and breaches.',
    features: ['24/7 availability', 'Forensics', 'Recovery planning']
  },
  {
    icon: GraduationCap,
    title: 'Security Training',
    description: 'Empower your team with cybersecurity awareness and skills.',
    features: ['Awareness training', 'Technical workshops', 'Phishing simulations']
  }
];

export default function AssessmentSolutions() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />
      
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-orange-500">Solutions</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive cybersecurity services tailored to your organization's needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, idx) => (
            <div
              key={idx}
              className="bg-[#111] border border-gray-800 rounded-2xl p-8 hover:border-orange-500/40 hover:glow-orange-sm hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <solution.icon className="text-orange-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3 text-white">{solution.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{solution.description}</p>
              <ul className="space-y-2">
                {solution.features.map((feature, i) => (
                  <li key={i} className="text-gray-500 text-sm flex items-center gap-2">
                    <span className="text-orange-500">•</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-[#111] border-2 border-orange-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
          <p className="text-gray-400 mb-6">Contact us for a free consultation and custom quote.</p>
          <Link
            to="/assessment-toolkit/contact"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <Footer variant="dark" termsLink="/assessment-toolkit/terms" privacyLink="/assessment-toolkit/privacy" />
    </div>
  );
}
