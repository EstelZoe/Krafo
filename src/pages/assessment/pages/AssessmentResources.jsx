import { BookOpen, FileText, Shield, ExternalLink } from 'lucide-react';
import ToolkitNavbar from '../components/ToolkitNavbar';
import Footer from '../../../assets/components/Footer';

const resources = [
  {
    icon: Shield,
    title: 'NIST Cybersecurity Framework',
    description: 'Comprehensive guide to the NIST CSF pillars: Identify, Protect, Detect, Respond, and Recover.',
    link: 'https://www.nist.gov/cyberframework'
  },
  {
    icon: FileText,
    title: 'Security Checklists',
    description: 'Downloadable checklists for implementing cybersecurity best practices in your organization.',
    link: '#'
  },
  {
    icon: BookOpen,
    title: 'CISA Resources',
    description: 'Free cybersecurity tools and resources from the Cybersecurity and Infrastructure Security Agency.',
    link: 'https://www.cisa.gov/resources-tools'
  }
];

export default function AssessmentResources() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />
      
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cybersecurity <span className="text-orange-500">Resources</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Access guides, frameworks, and tools to strengthen your organization's security posture.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, idx) => (
            <a
              key={idx}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#111] border border-gray-800 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(249,115,22,0.35)] transition-all duration-300"
            >
              <resource.icon className="text-orange-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3 text-white">{resource.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
              <div className="flex items-center gap-2 text-orange-500 text-sm font-medium">
                Learn More <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>

      <Footer variant="dark" termsLink="/assessment-toolkit/terms" privacyLink="/assessment-toolkit/privacy" />
    </div>
  );
}
