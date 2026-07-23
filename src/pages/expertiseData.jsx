/**
 * Single source of truth for Krafo's cybersecurity expertise areas.
 *
 * Used by BOTH:
 *   - Consultation.jsx  → the "Our Expertise" icon grid (title + icon + link)
 *   - Expertise.jsx     → the detailed expertise page (summary + bullets)
 *
 * Keeping them here means the grid and the detail page can never fall out of
 * sync. Each card on the Consultation page deep-links to `#{slug}` on the
 * Expertise page.
 *
 * Content is grounded in Krafo's actual positioning: a licensed Cybersecurity
 * Service Provider (Cyber Security Authority) registered with the Data
 * Protection Commission, aligned to NIST CSF and Ghana's Acts 843 / 1038 / 772.
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

export const EXPERTISE = [
  {
    slug: 'network-monitoring',
    title: 'Network Monitoring & Threat Detection',
    Icon: Radar,
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
