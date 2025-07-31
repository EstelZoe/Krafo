
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import Consult from "../assets/images/corectedconsult.png";

export default function Consultation() {
    return (
        <>
            <Navbar />
            <main>
                <section
                    className="relative bg-cover bg-center text-white pt-24 pb-12 md:pt-32 md:pb-12 px-4 md:px-20"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.8) 75%, rgb(0, 0, 0) 100%), url(${Consult})` }}
                >
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">
                            Let’s Get You Secured
                        </h1>
                        <p className="text-lg md:text-xl mb-8">
                            Book your consultation or training session with our cybersecurity experts.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-md transition">
                                Book Consultation
                            </button>
                            <button className="bg-black hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-md transition">
                                Book Training
                            </button>
                        </div>
                    </div>
                </section>

                <section className="pt-12 pb-16 px-4 md:px-20 bg-black relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 shadow-[0_0_50px_15px_rgba(234,88,12,0.7)] z-10" />

                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-white">Schedule Your Consultation</h2>
                    <p className="text-center text-orange-600 mb-10">Select a service and choose your preferred time slot</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Services Selection */}
                        <div className="group rounded-xl border border-[#F2600B33] bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] backdrop-blur-md p-8 transition-all duration-300 hover:shadow-[0_0_30px_#F2600B33] hover:scale-[1.02]">
                            <label className="block text-lg font-medium text-gray-400">Select Services</label>
                            <div className="space-y-3">
                                {["Penetration Test", "Web App Audit", "Network Review", "Cybersecurity Training", "Other"].map((service, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <input
                                            id={service}
                                            type="checkbox"
                                            name="services"
                                            value={service}
                                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor={service} className="ml-2 block text-sm text-gray-400">
                                            {service}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Calendar Placeholder */}
                        <div className="group rounded-xl border border-[#F2600B33] bg-gradient-to-br from-[#F2600B0D] to-[#0000001A] backdrop-blur-md p-8 transition-all duration-300 hover:shadow-[0_0_30px_#F2600B33] hover:scale-[1.02]">
                            <div className="text-2xl text-gray-400 text-center">Calendar / Date Picker Placeholder</div>
                        </div>
                    </div>
                </section>
                <section className="py-10 px-6 md:px-20  text-black bg-gradient-to-br from-orange-700 to-black">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Book a Training Slot</h2>

                    <form className="space-y-6">
                        {/* Training Type */}
                        <div>
                            <label className="block font-medium mb-2">Training Type</label>
                            <select className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                                <option value="">Select Type</option>
                                <option value="physical">Physical</option>
                                <option value="virtual">Virtual</option>
                            </select>
                        </div>

                        {/* Time Slot */}
                        <div>
                            <label className="block font-medium mb-2">Preferred Time Slot</label>
                            <input type="time" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>



                        {/* Number of Participants */}
                        <div>
                            <label className="block font-medium mb-2">Number of Participants</label>
                            <input type="number" min="1" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g., 20" />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-center">
                            <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-2 rounded-md transition duration-200">
                                Submit Booking
                            </button>
                        </div>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    )
}