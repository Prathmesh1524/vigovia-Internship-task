import Logo from "../../assets/logo.jpg";
import Image from "next/image";
import payments from "../../assets/Payments.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full pt-28">
      {/* Top border */}
      <div className="w-full border-0 border-t border-slate-500"></div>
      
      {/* Main footer content */}
      <div className="mx-auto w-full flex flex-col lg:flex-row justify-between bg-purple-100 px-4 lg:px-8 xl:px-14">
        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 w-full lg:w-auto">
          {[
            {
              title: "Our Offering",
              links: ["Holidays", "visa", "forex", "Hotels", "Flights"]
            },
            {
              title: "Popular Destinations",
              links: ["Dubai", "Bali", "Thailand", "Singapore", "Malaysia"]
            },
            {
              title: "VIgovia Special",
              links: ["Featured Experience", "Group Tours", "Backpackers Club", "Offline Events", "Terms & Conditions"]
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Vigovia Blog", "Partner Portal", "Accreditations"]
            }
          ].map((section, index) => (
            <div key={index}>
              <ul className="font-medium">
                <li className="mb-4">
                  <a href="#" className="footer">{section.title}</a>
                </li>
                <div className="footer-content">
                  {section.links.map((link, i) => (
                    <li key={i} className="mb-4">
                      <a href="#" className="hover:underline">{link}</a>
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          ))}
        </div>
        
        {/* Contact info */}
        <div className="py-6 w-full lg:w-[240px] px-4 lg:px-0">
          <button className="text-black btn px-4 p-2 rounded-full w-full lg:w-auto">Need help? Call us</button>
          <p className="p-3 text-purple-900 font-bold text-lg">+91-98xxx64641</p>
          <div className="pb-3 text-purple-900 text-md">
            <p className="text-purple-900 font-bold text-lg pb-2">Email</p>
            <p>contact@vigovia.com</p>
          </div>
          <div className="text-purple-900">
            <p className="pb-2 font-bold text-lg">Address</p>
            <p className="text-sm">HD-109 Cinnabar Hills, Links Business Park, Bangalore North, Bangalore, Karnataka, India-560071</p>
          </div>
        </div>
      </div>
      
      {/* Logo and payments section */}
      <div className="w-full border-0 border-t border-slate-500 p-3">
        <div className="flex flex-col md:flex-row justify-around items-center gap-6 px-4 md:px-10">
          <div>
            <Image alt="Vigovia Logo" src={Logo} className="w-[200px] h-[100px] object-contain" />
          </div>
          <div className="text-center md:text-left">
            <div className="title text-[30px]">Payment</div>
            <Image className="w-full max-w-[400px] h-auto" src={payments} alt="Payment methods" />
          </div>
        </div>
      </div>
      
      {/* Bottom footer */}
      <div className="px-4 py-6 footer-bg flex flex-col md:flex-row md:items-center md:justify-around gap-4">
        <span className="text-sm text-white text-center md:text-left">
          © 2025 Vigovia Travel Technologies (P) Ltd. All rights reserved.
        </span>
        
        <div className="flex justify-center gap-5">
          {[
            { icon: <FaFacebookF className="cursor-pointer" /> },
            { icon: <FaInstagram className="cursor-pointer" /> },
            { icon: <FaLinkedinIn className="cursor-pointer" /> },
            { icon: <FaYoutube className="cursor-pointer" /> }
          ].map((social, i) => (
            <button key={i} className="bg-white p-3 md:p-5 rounded-full">
              {social.icon}
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-white text-sm">
          <div>Privacy Policy</div>
          <div>Legal notice</div>
          <div>Accessibility</div>
        </div>
      </div>
    </footer>
  );
}