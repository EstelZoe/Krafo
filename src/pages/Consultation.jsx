import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import Vid2 from "../assets/videos/Vid2.mp4";

const CONSULTATION_SERVICES = ["Penetration Test", "Web App Audit", "Network Review", "Cybersecurity Training", "Other"];

export default function Consultation() {
    const [bookingType, setBookingType] = useState(null); // 'consultation' or 'training'
    const formRef = useRef(null);
    return (
        <>
            <Navbar />
            <main>
                <section className="pt-28 pb-16 px-4 md:px-20 relative overflow-hidden">
                    <div ref={formRef} className="absolute top-0 left-0 w-full h-1 bg-orange-600 shadow-[0_0_50px_15px_rgba(234,88,12,0.7)] z-10" />

                    {/* Background Video */}
                    <video
                        className="absolute inset-0 w-full h-full object-cover -z-20"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src={Vid2} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Black Overlay on Top of Video */}
                    <div className="absolute inset-0 bg-black/70 -z-10"></div>

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="lg:sticky lg:top-24 text-left">
                            <h2 className="text-4xl md:text-5xl font-extrabold font-proxon tracking-tight text-white mb-4">
                                Schedule Your Session
                            </h2>
                            <p className="mt-4 text-xl text-gray-300">
                                Your first step towards a more secure digital frontier.
                            </p>
                            <div className="mt-8 space-y-5 text-gray-300 text-lg">
                                <p>Your security is our priority. Our experts are ready to provide tailored guidance to meet your specific challenges and help you:</p>
                                <ul className="list-disc list-inside space-y-2 pl-2">
                                    <li> 
                                        <span className="text-orange-600 font-medium">Fortify</span> your organization's defenses against modern threats.
                                    </li>
                                    <li>
                                        <span className="text-orange-600 font-medium">Empower</span> your team with critical cybersecurity skills.
                                    </li>
                                    <li>
                                        Receive <span className="text-orange-600 font-medium">tailored guidance</span> to meet your unique security needs.
                                    </li>
                                </ul>
                                <p>
                                    Simply select your desired service; consultation or training, and provide us with some initial details. This helps us understand your needs and prepare for a productive conversation.
                                </p>
                                <div className="mt-6 p-4 rounded-lg bg-orange-900/20 border border-orange-400/30">
                                    <p className="font-semibold text-orange-400">
                                        Once you submit your request, our team will get back to you to confirm the details and finalize your booking.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="">
                                <div className="group rounded-xl border border-[#F2600B33] bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] backdrop-blur-md p-8 transition-all duration-300 hover:shadow-[0_0_30px_#F2600B33] hover:scale-[1.02]">
                                    <label className="block text-lg font-medium text-gray-400 mb-4">1. What would you like to book?</label>
                                    <div className="flex space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setBookingType('consultation')}
                                            className={`w-full font-semibold py-3 px-6 rounded-md transition ${bookingType === 'consultation' ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                                        >
                                            Consultation
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setBookingType('training')}
                                            className={`w-full font-semibold py-3 px-6 rounded-md transition ${bookingType === 'training' ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                                        >
                                            Training
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <AnimatePresence mode="wait">
                                {bookingType === 'consultation' && (
                                    <motion.div
                                        key="consultation-form"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="space-y-8"
                                    >
                                        <div className="group rounded-xl border border-[#F2600B33] bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] backdrop-blur-md p-8 transition-all duration-300 hover:shadow-[0_0_30px_#F2600B33] hover:scale-[1.02]">
                                            <label className="block text-lg font-medium text-gray-400 mb-4">2. Select Services</label>
                                            <motion.div
                                                className="space-y-3"
                                                variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                                                initial="hidden"
                                                animate="visible"
                                            >
                                                {CONSULTATION_SERVICES.map((service, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        className="flex items-center"
                                                        variants={{
                                                            hidden: { opacity: 0, x: -20 },
                                                            visible: { opacity: 1, x: 0 },
                                                        }}
                                                    >
                                                        <input
                                                            id={`service-${idx}`}
                                                            type="checkbox"
                                                            name="services"
                                                            value={service}
                                                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded bg-gray-700"
                                                        />
                                                        <label htmlFor={`service-${idx}`} className="ml-3 block text-sm text-gray-300">
                                                            {service}
                                                        </label>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </div>
                                        <div className="group rounded-xl border border-[#F2600B33] bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] backdrop-blur-md p-8 transition-all duration-300 hover:shadow-[0_0_30px_#F2600B33] hover:scale-[1.02]">
                                            <label htmlFor="consultationDate" className="block text-lg font-medium text-gray-400 mb-4">3. Choose a Date & Time</label>
                                            <input
                                                id="consultationDate"
                                                name="consultationDate"
                                                type="datetime-local"
                                                className="w-full bg-gray-800 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-300"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {bookingType === 'training' && (
                                    <motion.div
                                        key="training-form"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="group rounded-xl border border-[#F2600B33] bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] backdrop-blur-md p-8 transition-all duration-300 hover:shadow-[0_0_30px_#F2600B33] hover:scale-[1.02] space-y-6 text-white"
                                    >
                                        <h3 className="text-lg font-medium text-gray-400">2. Training Details</h3>
                                        <div>
                                            <label htmlFor="trainingType" className="block font-medium mb-2">Training Type</label>
                                            <select id="trainingType" name="trainingType" className="w-full bg-gray-800 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                                                <option value="">Select Type</option>
                                                <option value="physical">Physical</option>
                                                <option value="virtual">Virtual</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="participants" className="block font-medium mb-2">Number of Participants</label>
                                            <input id="participants" name="participants" type="number" min="1" className="w-full bg-gray-800 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g., 20" />
                                        </div>
                                        <div>
                                            <label htmlFor="trainingDate" className="block font-medium mb-2">Preferred Date & Time</label>
                                            <input id="trainingDate" name="trainingDate" type="datetime-local" className="w-full bg-gray-800 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {bookingType && (
                                <div className="pt-4 flex justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(234, 88, 12, 0.6)" }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit" className="bg-orange-600 text-white font-semibold py-3 px-8 rounded-md"
                                    >
                                        Submit Booking
                                    </motion.button>
                                </div>
                            )}
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}