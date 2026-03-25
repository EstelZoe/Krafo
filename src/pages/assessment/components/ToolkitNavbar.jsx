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
                    <Link to="/assessment-toolkit" className="hover:text-orange-500">
                        Toolkit
                    </Link>

                    <Link to="/assessment-toolkit/solutions" className="hover:text-orange-500">
                        Solutions
                    </Link>

                    <Link to="/assessment-toolkit/resources" className="hover:text-orange-500">
                        Resources
                    </Link>

                    <Link to="/assessment-toolkit/contact" className="hover:text-orange-500">
                        Contact
                    </Link>

                    <Link
                        to="/assessment-toolkit/start"
                        className="border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-500 hover:text-black transition"
                    >
                        Start Assessment
                    </Link>
                </div>

                {/* Mobile Button */}
                <div className="md:hidden">
                    <button onClick={() => setOpen(!open)}>
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-black px-4 pb-4 space-y-3">
                    <Link to="/assessment-toolkit" className="block hover:text-orange-500">
                        Toolkit
                    </Link>

                    <Link to="/assessment-toolkit/solutions" className="block hover:text-orange-500">
                        Solutions
                    </Link>

                    <Link to="/assessment-toolkit/resources" className="block hover:text-orange-500">
                        Resources
                    </Link>

                    <Link to="/assessment-toolkit/contact" className="block hover:text-orange-500">
                        Contact
                    </Link>

                    <Link
                        to="/assessment-toolkit/start"
                        className="block border border-orange-500 text-orange-500 px-4 py-2 rounded-md text-center hover:bg-orange-500 hover:text-black"
                    >
                        Start Assessment
                    </Link>
                </div>
            )}
        </nav>
    );
}