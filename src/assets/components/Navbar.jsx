import React, { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import krafoLogo from '../images/KRAFO ORIGINAL WHITEAsset 70-8.png';


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-black text-white fixed w-full z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <div>
                            <img src={krafoLogo} alt="Logo" className="h-8" />
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* <Link to="/" className="text-orange-600 hover:text-white">Home</Link> */}
                        <Link to="/about" className="text-orange-600 hover:text-white">About</Link>
                        <Link to="/courses" className="text-orange-600 hover:text-white">Courses</Link>
                        <Link to="/event-page" className="text-orange-600 hover:text-white">Events</Link>
                        <Link to="/blog-page" className="text-orange-600 hover:text-white">Blog</Link>
                        <Link to="/youth-cyber-ed" className="text-orange-600 hover:text-white">Youth Cyber Ed</Link>
                        <Link to="/consultation" className="text-orange-600 hover:text-white">Consultation</Link>

                        {/* language links */}
                        {/* <div className="text-white">
                            <span className="cursor-pointer hover:text-orange-600">ENG</span>
                            <span className="mx-2 text-orange-600">|</span>
                            <span className="cursor-pointer hover:text-orange-600">FR</span>
                            <span className="mx-2 text-orange-600">|</span>
                            <span className="cursor-pointer hover:text-orange-600">TWI</span>
                        </div> */}


                        {/* Contact Us Button */}
                        <Link
                            to="/contact"
                            className="bg-orange-600 text-white px-2 py-2 rounded-lg hover:bg-orange-500 transition"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center">
                        <button onClick={toggleMenu} className="focus:outline-none">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black text-white px-4 py-3 space-y-3">
                    {/* <Link to="/" className="block hover:text-orange-500" onClick={toggleMenu}>Home</Link> */}
                    <Link to="/about" className="block hover:text-orange-500" onClick={toggleMenu}>About</Link>
                    <Link to="/courses" className="block hover:text-orange-500" onClick={toggleMenu}>Courses</Link>
                    <Link to="/events" className="block hover:text-orange-500" onClick={toggleMenu}>Events</Link>
                    <Link to="/blog" className="block hover:text-orange-500" onClick={toggleMenu}>Blog</Link>
                    <Link to="/youth-cyber-ed" className="block hover:text-orange-500" onClick={toggleMenu}>Youth Cyber Ed</Link>
                    <Link to="/consultation" className="block hover:text-orange-500" onClick={toggleMenu}>Consultation</Link>

                    {/* Contact Us Button Mobile */}
                    <Link
                        to="/contact"
                        className="block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                        onClick={toggleMenu}
                    >
                        Contact Us
                    </Link>
                </div>
            )}
        </nav>
    );
}
