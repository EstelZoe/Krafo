import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import krafoLogo from '../images/KRAFO ORIGINAL WHITEAsset 70-8.png';
import { Link } from "react-router";

const navLinks = [
    // { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Events", path: "/event-page" },
    { name: "Blog", path: "/blog-page" },
    { name: "Youth Cyber Ed", path: "/youth-cyber-ed" },
    { name: "Consultation", path: "/consultation" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-black text-white fixed w-full z-50 mb-8">
            <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                <div>
                    <img src={krafoLogo} alt="Logo" className="h-8" />
                </div>
                </Link>
                {/* <div className="text-xl font-bold">Logo</div> */}


                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="text-orange-500 hover:text-white transition-colors duration-200"
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Language Selector */}
                    <div className="flex space-x-2 items-center text-sm font-semibold">
                        <button className="hover:text-white focus:outline-none">ENG</button>
                        <span>|</span>
                        <button className="hover:text-white focus:outline-none">FR</button>
                        <span>|</span>
                        <button className="hover:text-white focus:outline-none">TWI</button>
                    </div>

                    {/* Auth Buttons */}
                    <Link to="/signup" className="ml-4 px-4 py-1 border border-white rounded hover:bg-orange-500 hover:border-orange-500 transition-colors">
                        Sign Up
                    </Link>
                    <Link to="/login" className="ml-2 px-4 py-1 bg-orange-500 border border-orange-500 rounded hover:bg-orange-600 transition-colors">
                        Login
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {
                isOpen && (
                    <div className="md:hidden bg-black px-4 pb-4 space-y-3">
                        {navLinks.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className="block hover:text-orange-500"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Language Options */}
                        <div className="flex space-x-2 items-center text-sm font-semibold">
                            <button className="hover:text-orange-500 focus:outline-none">ENG</button>
                            <span>|</span>
                            <button className="hover:text-orange-500 focus:outline-none">FR</button>
                            <span>|</span>
                            <button className="hover:text-orange-500 focus:outline-none">TWI</button>
                        </div>


                        {/* Auth Buttons */}
                        <div className="flex space-x-2 pt-2">
                            <Link to="/signup" className="text-center w-full border border-white py-1 rounded hover:text-orange-500 " onClick={() => setIsOpen(false)}>
                                Sign Up
                            </Link>
                            <Link to="/login" className="text-center w-full bg-orange-500 border-orange-500 py-1 rounded hover:bg-orange-600" onClick={() => setIsOpen(false)}>
                                Login
                            </Link>
                        </div>
                    </div>
                )
            }
        </nav >
    );
}
