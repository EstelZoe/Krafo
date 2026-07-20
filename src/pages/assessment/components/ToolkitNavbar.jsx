import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import krafoLogo from "../images/krafo-logo1.png";


export default function ToolkitNavbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-black text-white w-full shadow-md">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

                {/* Logo / Title */}
                <Link to="/" className="flex items-center">
                    <div>
                        <img src={krafoLogo} alt="Logo" className="h-8" />
                    </div>
                </Link>
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link 
                        to="/assessment-toolkit" 
                        className="text-white hover:text-orange-500 transition-colors duration-200 ease-out relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Toolkit
                    </Link>

                    <Link 
                        to="/assessment-toolkit/solutions" 
                        className="text-white hover:text-orange-500 transition-colors duration-200 ease-out relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Solutions
                    </Link>

                    <Link 
                        to="/assessment-toolkit/resources" 
                        className="text-white hover:text-orange-500 transition-colors duration-200 ease-out relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Resources
                    </Link>

                    {/* <Link 
                        to="/assessment-toolkit/contact" 
                        className="text-white hover:text-orange-500 transition-colors duration-200 ease-out relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Contact
                    </Link> */}

                    {/* My Dashboard removed — users access dashboard through login flow */}
                </div>

                {/* Mobile Button */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setOpen(!open)}
                        className="p-2 rounded-lg hover:bg-gray-900 hover:scale-110 active:scale-95 transition-all duration-200 ease-out"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`
                md:hidden 
                bg-black 
                px-4 
                pb-4 
                space-y-3
                transition-all
                duration-300
                ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
            `}>
                <Link 
                    to="/assessment-toolkit" 
                    className="block hover:text-orange-500 transition-colors duration-200"
                    style={{ 
                        transitionDelay: open ? '0ms' : '0ms',
                        opacity: open ? 1 : 0,
                        transform: open ? 'translateY(0)' : 'translateY(-8px)',
                        transition: 'opacity 300ms, transform 300ms, color 200ms'
                    }}
                >
                    Toolkit
                </Link>

                <Link 
                    to="/assessment-toolkit/solutions" 
                    className="block hover:text-orange-500 transition-colors duration-200"
                    style={{ 
                        transitionDelay: open ? '50ms' : '0ms',
                        opacity: open ? 1 : 0,
                        transform: open ? 'translateY(0)' : 'translateY(-8px)',
                        transition: 'opacity 300ms, transform 300ms, color 200ms'
                    }}
                >
                    Solutions
                </Link>

                <Link 
                    to="/assessment-toolkit/resources" 
                    className="block hover:text-orange-500 transition-colors duration-200"
                    style={{ 
                        transitionDelay: open ? '100ms' : '0ms',
                        opacity: open ? 1 : 0,
                        transform: open ? 'translateY(0)' : 'translateY(-8px)',
                        transition: 'opacity 300ms, transform 300ms, color 200ms'
                    }}
                >
                    Resources
                </Link>

                <Link 
                    to="/assessment-toolkit/contact" 
                    className="block hover:text-orange-500 transition-colors duration-200"
                    style={{ 
                        transitionDelay: open ? '150ms' : '0ms',
                        opacity: open ? 1 : 0,
                        transform: open ? 'translateY(0)' : 'translateY(-8px)',
                        transition: 'opacity 300ms, transform 300ms, color 200ms'
                    }}
                >
                    Contact
                </Link>

                {/* My Dashboard removed — users access dashboard through login flow */}
            </div>
        </nav>
    );
}