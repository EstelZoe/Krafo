// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { Instagram, Facebook, Linkedin, Twitter, Youtube, } from "lucide-react";
import Oops from "../assets/krafo2svg.svg";

import { Link } from "react-router";

export default function NotFound() {
    return (
        <>
            {/* <Navbar /> */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 bg-black">
                {/* <img src={Oops} alt="404" className="w-64 md:w-94 mb-6" /> */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-10 text-orange-600">Oops!</h1>
                    <p className="text-gray-300 mt-2 mb-6">We can't seem to find the page you looking for</p>
                </div>
                <Link to="/" ><button className="bg-orange-600 text-white px-4 py-2 hover:bg-orange-700 rounded-full text-sm font-bold ">Go To HomePage</button></Link>
                <div className="mt-8">
                    <p className="text-black-100 font-bold mb-2">Follow Us On</p>
                    <div className="flex justify-center gap-4 text-orange-600 text-2xl">
                        <Instagram />
                        {/* <Facebook /> */}
                        <Linkedin />
                        {/* <Twitter /> */}
                        <Youtube />
                    </div>
                </div>

            </section >
            {/* <Footer /> */}
        </>
    );
}