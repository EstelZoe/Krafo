/**
 * Single source of truth for Krafo's cybersecurity expertise areas.
 *
 * Used by BOTH:
 *   - Consultation.jsx  → the "Our Expertise" icon grid (title + icon + link)
 *   - Expertise.jsx     → the detailed expertise page (image + summary + bullets)
 *
 * Keeping them here means the grid and the detail page can never fall out of
 * sync. Each card on the Consultation page deep-links to `#{slug}` on the
 * Expertise page.
 *
 * ── IMAGES ───────────────────────────────────────────────────────────────────
 * Each item has an `image` used on the Expertise page. These are PLACEHOLDERS
 * (existing cyber photos). To use real images: drop the file in
 * src/assets/images/, import it below, and set it as the item's `image`.
 */
import {
  Radar,
  ShieldAlert,
  Bug,
  GraduationCap,
  Scale,
  Siren,
  Lock,
  Cloud,
  ClipboardCheck,
  Cpu,
  Network,
  Eye,
} from 'lucide-react';

// ── Placeholder images (swap with real, topic-specific images) ───────────────
import imgNetwork from '../assets/images/data1.jpg';
import imgRisk from '../assets/images/data2.jpg';
import imgPentest from '../assets/images/penetration testing image.jpg';
import imgTraining from '../assets/images/studygroup2.jpg';
import imgGrc from '../assets/images/ictConst.jpg';
import imgIncident from '../assets/images/Incident Response & Recovery.jpg';
import imgData from '../assets/images/data3.jpg';
import imgCloud from '../assets/images/data4.jpg';
import imgPolicy from '../assets/images/policy management.jpg';
import imgConsulting from '../assets/images/ict consulting and advisory.jpg';
import imgArchitecture from '../assets/images/Security Architecture Review.jpg';
import imgManaged from '../assets/images/Managed Security Services.jpg';

export const EXPERTISE = [
  {
    slug: 'network-monitoring',
    title: 'Network Monitoring & Threat Detection',
    Icon: Radar,
    image: imgNetwork,
    summary:
      'Always on, always aware. We continuously watch your networks and systems so suspicious activity is spotted and contained before it becomes a breach.',
    bullets: [
      '24/7 monitoring of network and endpoint activity',
      'Early-warning alerts on anomalous behaviour',
      'Threat intelligence tuned to the African threat landscape',
      'Clear escalation paths so nothing slips through',
    ],
  },
  {
    slug: 'risk-vulnerability-assessment',
    title: 'Risk & Vulnerability Assessment',
    Icon: ShieldAlert,
    image: imgRisk,
    summary:
      'We identify, analyse, and prioritise the security gaps in your digital infrastructure — then hand you a practical roadmap to close them before attackers find them.',
    bullets: [
      'Full asset and attack-surface discovery',
      'Prioritised risk register mapped to business impact',
      'NIST CSF-aligned maturity scoring',
      'Actionable remediation roadmap',
    ],
  },
  {
    slug: 'penetration-testing',
    title: 'Penetration Testing',
    Icon: Bug,
    image: imgPentest,
    summary:
      'Ethical, controlled attacks that reveal how a real adversary would get in — across your web apps, networks, and cloud — with findings you can actually act on.',
    bullets: [
      'Web application and API testing',
      'Internal and external network testing',
      'Cloud configuration review',
      'Prioritised findings with proof-of-concept and fixes',
    ],
  },
  {
    slug: 'security-awareness-training',
    title: 'Security Awareness Training',
    Icon: GraduationCap,
    image: imgTraining,
    summary:
      'People are the first line of defence. We build a security-first culture with practical, role-relevant training that helps your team recognise and stop threats.',
    bullets: [
      'Phishing simulations and coaching',
      'Role-based training for staff and leadership',
      'NIST-inspired awareness modules',
      'Certificates of completion for participants',
    ],
  },
  {
    slug: 'governance-risk-compliance',
    title: 'Governance, Risk & Compliance',
    Icon: Scale,
    image: imgGrc,
    summary:
      'We help you meet your obligations under Ghana\u2019s Data Protection Act (Act 843) and Cybersecurity Act (Act 1038), turning regulatory pressure into a clear, defensible programme.',
    bullets: [
      'Compliance gap analysis against Acts 843 & 1038',
      'Policy and procedure development',
      'Audit preparation and evidence support',
      'Board-level risk reporting',
    ],
  },
  {
    slug: 'incident-response',
    title: 'Incident Response & Recovery',
    Icon: Siren,
    image: imgIncident,
    summary:
      'When something goes wrong, minutes matter. We prepare you to respond calmly and recover quickly — and we stand with you when an incident hits.',
    bullets: [
      'Custom incident response playbooks',
      'Tabletop exercises and simulations',
      'Breach containment and forensic readiness',
      'Post-incident review and hardening',
    ],
  },
  {
    slug: 'data-protection-privacy',
    title: 'Data Protection & Privacy',
    Icon: Lock,
    image: imgData,
    summary:
      'As a firm registered with the Data Protection Commission, we help you handle personal data lawfully and safely across its entire lifecycle.',
    bullets: [
      'Data Protection Act (Act 843) alignment',
      'Data mapping and classification',
      'DPC registration and privacy notices',
      'Encryption and secure data handling practices',
    ],
  },
  {
    slug: 'cloud-infrastructure-security',
    title: 'Cloud & Infrastructure Security',
    Icon: Cloud,
    image: imgCloud,
    summary:
      'Secure your cloud and on-premise infrastructure with hardened configurations, strong identity controls, and a path toward zero-trust.',
    bullets: [
      'Cloud security posture review',
      'Identity and access management (IAM)',
      'Network segmentation and hardening',
      'Zero-trust implementation roadmap',
    ],
  },
  {
    slug: 'policy-management',
    title: 'Security Policy Management',
    Icon: ClipboardCheck,
    image: imgPolicy,
    summary:
      'We create, update, and refine your IT and security policies — turning technical rules into operational clarity your whole team can follow.',
    bullets: [
      'Acceptable use and access policies',
      'Backup, retention, and disposal policies',
      'Vendor and third-party risk policies',
      'Ongoing policy review cycles',
    ],
  },
  {
    slug: 'ict-consulting',
    title: 'ICT Consulting & Advisory',
    Icon: Cpu,
    image: imgConsulting,
    summary:
      'Our consultants assess your current posture, identify vulnerabilities, and provide tailored recommendations to strengthen your defences and support your goals.',
    bullets: [
      'Security posture assessment',
      'Technology and tooling advisory',
      'Budget and investment guidance',
      'Vendor-neutral recommendations',
    ],
  },
  {
    slug: 'security-architecture',
    title: 'Security Architecture Review',
    Icon: Network,
    image: imgArchitecture,
    summary:
      'We evaluate and optimise your security architecture end to end, so protection is designed in — not bolted on after the fact.',
    bullets: [
      'Architecture and data-flow review',
      'Endpoint and email security optimisation',
      'Defence-in-depth design',
      'Resilience and redundancy planning',
    ],
  },
  {
    slug: 'managed-security',
    title: 'Managed Security Services',
    Icon: Eye,
    image: imgManaged,
    summary:
      'Extend your team with ongoing, managed protection — so you get enterprise-grade security without the overhead of building it all in-house.',
    bullets: [
      'Ongoing monitoring and management',
      'Patch and vulnerability management',
      'Regular security reporting',
      'A dedicated point of contact',
    ],
  },
];

export default EXPERTISE;
