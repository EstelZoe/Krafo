import React, { useState } from "react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import Vid1 from "../assets/videos/Vid2.mp4";
import computerGif from "../assets/videos/computer.gif";
import exchangeGif from "../assets/videos/exchange.gif";
import malwareGif from "../assets/videos/malware.gif";
import palmGif from "../assets/videos/palm.gif";
import dataGif from "../assets/videos/data.gif";
import strategyImg from "../assets/images/ccbc.png";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import data4 from "../assets/images/data4.jpg";
import data1 from "../assets/images/data1.jpg";
import data2 from "../assets/images/data2.jpg";
import data3 from "../assets/images/data3.jpg";
import studyGroup from "../assets/images/studygroup2.jpg"

// const consultationServices = [
//     {
//         title: "Network Monitoring",
//         description: "Always on. Always aware. We alert you before vulnerabilities become breaches — with predictive insights.",
//         icon: "🔍",
//         details: [
//             "Network scanning and penetration testing",
//             "Web application vulnerability detection",
//             "Cloud infrastructure security audit",
//             "Detailed risk assessment report",
//             "Remediation roadmap"
//         ],
//         price: "Starting at GHC 12,500"

//     },
//     {
//         title: "Incident Response Planning",
//         description: "Prepare your organization to effectively respond to security breaches and minimize damage.",
//         icon: "🚨",
//         details: [
//             "Custom incident response playbook",
//             "Tabletop exercises and simulations",
//             "Forensic readiness planning",
//             "Communication strategy development",
//             "Post-incident review framework"
//         ],
//         price: "Starting at GHC 18,000"
//     },
//     {
//         title: "Compliance Strategy",
//         description: "Achieve and maintain regulatory compliance with industry standards and frameworks.",
//         icon: "📋",
//         details: [
//             "GDPR, HIPAA, PCI-DSS compliance",
//             "ISO 27001 implementation",
//             "Policy and procedure development",
//             "Compliance gap analysis",
//             "Audit preparation support"
//         ],
//         price: "Starting at GHC 15,000"
//     },
//     {
//         title: "Security Architecture Review",
//         description: "Evaluate and optimize your security infrastructure for maximum protection.",
//         icon: "🏗️",
//         details: [
//             "Network segmentation analysis",
//             "Identity and access management review",
//             "Endpoint security optimization",
//             "Cloud security configuration",
//             "Zero-trust implementation roadmap"
//         ],
//         price: "Starting at GHC 20,000"
//     }
// ];

const testimonials = [
    {
        name: "Dr. Kwame Mensah",
        role: "CTO, Ghana National Bank",
        quote: "Krafo's consultation identified critical vulnerabilities we'd overlooked for years. Their strategic roadmap transformed our security posture.",
        avatar: "👩🏿‍⚕️"
    },
    {
        name: "Ama Serwaa",
        role: "Director, HealthTech Solutions",
        quote: "The incident response planning saved us during a ransomware attack. We contained the breach in under 2 hours thanks to their playbook.",
        avatar: "👩🏿‍⚕️"
    },
    {
        name: "Kojo Ankomah",
        role: "CEO, E-Commerce Ghana",
        quote: "Achieving PCI-DSS compliance seemed impossible until Krafo streamlined our processes. Their expertise is unparalleled in West Africa.",
        avatar: "👨🏿‍💻"
    }
];


const faqs = [
    {
        question: "How quickly can we start after requesting consultation?",
        answer: "We typically schedule initial discovery calls within 24-48 hours of receiving your request. For urgent security matters, we offer expedited scheduling."
    },
    {
        question: "What information do I need to prepare for the consultation?",
        answer: "We recommend having information about your current security tools, recent security incidents, compliance requirements, and business objectives. If you're not sure, our experts will guide you through the process."
    },
    // {
    //     question: "Do you sign NDAs before consultation?",
    //     answer: "Absolutely. We prioritize confidentiality and are happy to sign NDAs before any information sharing. Our standard consulting agreement also includes comprehensive confidentiality clauses."
    // },
    {
        question: "Can you help implement your recommendations?",
        answer: "Yes, we offer implementation support ranging from guidance to fully managed execution, depending on your needs and resources."
    },
    {
        question: "What industries do you specialize in?",
        answer: "We have extensive experience across financial services, healthcare, government, e-commerce, and critical infrastructure sectors, with specialized frameworks for each."
    }
];

const navigation = [
    { name: 'Consultation', href: '#' },
];

export default function Consultation() {
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("services");
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setIsSubmitted(true);

        // Reset form after submission
        setTimeout(() => {
            setFormData({
                name: "",
                company: "",
                email: "",
                phone: "",
                service: "",
                message: ""
            });
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#0d0400]  text-white overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-black ">
                <div className="relative isolate px-6 pt-0 lg:px-8">

                    {/* Top blur effect */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            className="relative leftl-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#F2600B] to-[#F2600B] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>

                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">

                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
                                Secure <span className="text-orange-600">your future</span> with our Consultation
                            </h1>
                            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                                Partner with our expert cybersecurity team to safeguard your digital assets.
                            </p>

                        </div>

                        {/* Button */}
                        <div className="flex justify-center mt-8">
                            <a
                                href="https://calendly.com/krafosystems"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-orange-600/40 text-center text-lg sm:text-xl w-auto"
                            >
                                Book Now
                            </a>
                        </div>
                    </div>
                    {/* Button */}


                    {/* Bottom blur effect */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#F2600B] to-[#F2600B] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>


                {/* Scroll Cue */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce text-white text-sm opacity-75">
                    <span className="border border-white px-3 py-1 rounded-full">Scroll ↓</span>
                </div>
                <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
            </section>



            {/* Consultation Tabs */}
            <section className="py-16 bg-gradient-to-br bg-black">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold mb-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            Enterprise <span className="text-orange-600">Cyber Resilience</span> Solutions
                        </motion.h2>
                        <motion.p
                            className="text-gray-400 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Tailored security strategies for organizations facing complex digital threats
                        </motion.p>
                    </div>

                    <div className="flex justify-center mb-12">
                        <div className="inline-flex p-1 bg-gray-900 rounded-lg">
                            {["services", "testimonials"].map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-6 py-3 rounded-md text-sm font-medium transition-colors duration-300 ${activeTab === tab
                                        ? "bg-orange-600 text-white"
                                        : "text-gray-300 hover:text-white"
                                        }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="will-change-transform"
                        >
                            {activeTab === "services" && (
                                <div>
                                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(#F2600B33_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>

                                    <div className="max-w-7xl mx-auto text-center">

                                        <div className="grid md:grid-cols-2 gap-10">
                                            {[ // Service cards
                                                {
                                                    title: "Network Monitoring",
                                                    desc: "Always on. Always aware. We alert you before vulnerabilities become breaches — with predictive insights.",
                                                    img: data4,
                                                },
                                                {
                                                    title: "Risk & Vulnerability Assessment",
                                                    desc: "Identify, analyze, and close the security gaps in your digital infrastructure before attackers do.",
                                                    img: data1,
                                                },
                                                {
                                                    title: "Awareness Training",
                                                    desc: "Empower your team to recognize and respond to threats. We build a security-first culture from the inside out.",
                                                    img: data2,
                                                },
                                                {
                                                    title: "Policy Management",
                                                    desc: "We create, update, and refine your IT policies — turning technical rules into operational clarity.",
                                                    img: data3,
                                                }
                                            ].map((service, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 60 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.7, delay: i * 0.2 }}
                                                    viewport={{ once: true }}
                                                    className="group relative rounded-xl border border-[#F2600B33] bg-gradient-to-br from-[#1a1a1a] to-[#000000] backdrop-blur-md shadow-xl hover:shadow-orange-600/30 hover:scale-[1.02] transition-transform duration-300 overflow-hidden"
                                                >
                                                    {/* Image */}
                                                    <div className="relative h-52 overflow-hidden">
                                                        <img
                                                            src={service.img}
                                                            alt={service.title}
                                                            className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                        {/* Glass reflection */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 pointer-events-none"></div>
                                                    </div>

                                                    {/* Text */}
                                                    <div className="p-6 relative">
                                                        <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-[#F2600B] transition-colors duration-300">
                                                            {service.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-300 leading-relaxed">
                                                            {service.desc}
                                                        </p>

                                                        {/* Subtle glow bar */}
                                                        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#F2600B] group-hover:w-full transition-all duration-500"></span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>


                            )}

                            {/* {activeTab === "process" && (
                               <div>    </div>
                            )} */}

                            {activeTab === "testimonials" && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {testimonials.map((testimonial, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="bg-gradient-to-br from-[#0d0400] to-[#1a0a00] rounded-xl p-6 border border-gray-800 shadow-xl"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                                            transition={{ delay: idx * 0.1 }}
                                            layout
                                        >
                                            <div className="flex items-center mb-4">
                                                <div className="text-3xl mr-4">{testimonial.avatar}</div>
                                                <div>
                                                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                                                    <p className="text-orange-500 text-sm">{testimonial.role}</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                                            <div className="flex mt-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Consultation Strategy Section */}
            <section className="py-16 bg-black">
                <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-orange-500/20">
                            <div className="bg-gradient-to-br from-gray-900 to-black w-full h-96 flex items-center justify-center">
                                {/* Left: Images */}
                                <div className="relative">
                                    {/* Main Image */}
                                    <img
                                        src={studyGroup}
                                        alt="Students learning"
                                        className="rounded-lg shadow-lg"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                            </div>
                            </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-sm font-semibold text-orange-500 mb-2 flex items-center gap-2">
                            <span className="w-4 h-4 border border-orange-500 rounded-full flex items-center justify-center">i</span>
                            OUR CONSULTATION via Calendly
                        </p>

                        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-snug mb-4">
                            Building Cyber Resilience Through <span className="text-orange-600">Strategic Partnership</span>
                        </h2>

                        <p className="text-gray-400 mb-6">
                            We don't just identify vulnerabilities - we help you build a comprehensive security strategy aligned with your business objectives and risk tolerance.
                        </p>

                        <ul className="space-y-3 mb-6">
                            <motion.li
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <span className="text-orange-500 mt-1">⦿</span>
                                <div>
                                    <span className="text-white font-medium">Threat-Centric Methodology:</span>
                                    <span className="text-gray-400"> Focused on your specific adversary landscape</span>
                                </div>
                            </motion.li>
                            <motion.li
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="text-orange-500 mt-1">⦿</span>
                                <div>
                                    <span className="text-white font-medium">Business-Aligned Security:</span>
                                    <span className="text-gray-400"> Solutions that support your operational goals</span>
                                </div>
                            </motion.li>
                            <motion.li
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className="text-orange-500 mt-1">⦿</span>
                                <div>
                                    <span className="text-white font-medium">Measurable Outcomes:</span>
                                    <span className="text-gray-400"> Clear metrics to track security ROI</span>
                                </div>
                            </motion.li>
                        </ul>

                        <a
                            href="https://calendly.com/krafosystems"
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-orange-600/40 inline-flex items-center"
                        >
                            Schedule Strategy Session
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-black">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Consultation <span className="text-orange-600">FAQs</span>
                        </motion.h2>
                        <motion.p
                            className="text-gray-400 max-w-xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Common questions about our cybersecurity consultation services
                        </motion.p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                className="bg-gradient-to-br from-[#0d0400] to-[#1a0a00] rounded-lg overflow-hidden border border-gray-800"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                                transition={{ delay: idx * 0.1 }}
                                layout
                            >
                                <button
                                    className="flex justify-between items-center w-full p-6 text-left"
                                    onClick={() => setExpandedIndex(expandedIndex === idx ? -1 : idx)}
                                >
                                    <span className="text-lg font-medium text-white">{faq.question}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-6 w-6 text-orange-500 transition-transform ${expandedIndex === idx ? "rotate-180" : ""}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {expandedIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-2 border-t border-gray-800">
                                                <p className="text-gray-300">{faq.answer}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            {/* Floating Consultation Button */}
            <a
                href="#consultation-form"
                className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4 rounded-full shadow-lg z-50 hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </a>
        </div>
    );
}