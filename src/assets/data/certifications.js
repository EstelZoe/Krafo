// The credentials Krafo holds, in one place — the Consultation page renders
// them as a full-width marquee with hover descriptions, the homepage hero as a
// compact rail. Adding a badge here puts it in both.

import certCEH from "../images/CEH.png";
import certSecurityPlus from "../images/Comptia Security+.png";
import certNetworkPlus from "../images/Comptia Network+.png";
import certAPlus from "../images/Comptia A+.png";
import certCSIS from "../images/Comptia CSIS.png";
import certCIOS from "../images/Comptia CIOS.png";

export const certifications = [
    {
        src: certCEH,
        alt: "Certified Ethical Hacker (CEH)",
        desc: "A skilled professional who understands how to find weaknesses and vulnerabilities in target systems, using the same knowledge and tools as a malicious hacker — but lawfully, to assess an organisation's security posture.",
    },
    {
        src: certSecurityPlus,
        alt: "CompTIA Security+",
        desc: "Security+ practitioners know how to identify and address potential threats, attacks, and vulnerabilities, with advanced techniques in risk management, risk mitigation, threat management, and intrusion detection.",
    },
    {
        src: certNetworkPlus,
        alt: "CompTIA Network+",
        desc: "Network+ holders can design and implement functional networks; configure, manage, and maintain essential network devices; implement network security; and troubleshoot network problems.",
    },
    {
        src: certAPlus,
        alt: "CompTIA A+",
        desc: "A+ recipients perform critical IT support tasks — device configuration, data backup and recovery, and OS setup — with baseline security skills to detect and remove malware, address privacy concerns, and resolve core service issues.",
    },
    {
        src: certCSIS,
        alt: "Secure Infrastructure Specialist (CSIS)",
        desc: "Secure Infrastructure Specialists have the knowledge and skill to support hardware and software systems, and to protect an organisation's assets from internal and external threats.",
    },
    {
        src: certCIOS,
        alt: "IT Operations Specialist (CIOS)",
        desc: "IT Operations Specialists manage the flow of a workplace and optimise day-to-day activities, with the ability to analyse business operations and identify customer needs.",
    },
];

export default certifications;
