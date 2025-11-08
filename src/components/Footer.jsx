import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" rounded-3xl bg-gray-600 text-white text-sm">

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-lg font-semibold mb-4">Cities</h3>
        <div className="flex flex-wrap gap-3">
          {[
            "Kerala",
            "Kasaragod",
            "Kannur",
            "Kozhikode",
            "Cochin",
            "Calicut",
            "Thiruvananthapuram",
            "Wayanad",
            "Malappuram",
            "Thrissur",
            "Ernakulam",
            "Palakkad",
            "Kottayam",
            "Idukki",
            "Pathanamthitta",
            "Kollam",
            "Alappuzha"
          ].map((city, i) => (
            <div
              key={i}
              className="flex items-center space-x-1 bg-gray-800 px-3 py-1 rounded-full text-xs"
            >
              <span className="inline-block w-4 h-4 bg-white text-black rounded-full text-center text-[10px] font-bold">
                🚗
              </span>
              <span>
                Self drive cars in{" "}
                <span className="text-lime-400 font-semibold">{city}</span>
              </span>
            </div>
          ))}
        </div>


        <hr className="my-6 border-gray-700" />


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">

          <div>
            <h4 className="font-semibold mb-2 text-white">Helpful links</h4>
            <ul className="space-y-1">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/" className="hover:text-white">Blog</a></li>
              <li><a href="/" className="hover:text-white">Privacy policy</a></li>
              <li><a href="/" className="hover:text-white">About Us</a></li>
              <li><a href="/" className="hover:text-white">Contact Us</a></li>
              <li><a href="/" className="hover:text-white">FAQs</a></li>
              <li><a href="/" className="hover:text-white">Terms of Use</a></li>
            </ul>
          </div>


          <div>
            <h4 className="font-semibold mb-2 text-white">Get in touch</h4>
            <div className="flex items-start space-x-2 mb-2">
              <FaMapMarkerAlt className="mt-1" />
              <p>
                3, 1047/2, dreamdrive Motor Company Pvt LTD B.C. Road,<br />
                Vidyanagar,Kasaragod, Kerala, 671123
              </p>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <FaEnvelope />
              <p>support@dreamdrive.in</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhoneAlt />
              <p>+91 9876543210</p>
            </div>
          </div>


          <div>
            <h4 className="font-semibold mb-2 text-white">Follow us on</h4>
            <div className="flex space-x-4 mb-4 text-xl">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaYoutube /></a>
            </div>
            <h4 className="font-semibold mb-2 text-white">Download App</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>


      <div className=" rounded-3xl bg-gray-900 text-center py-3 border-t border-gray-800 text-gray-400">
        &copy; 2025 DreamDrive. All rights reserved.
      </div>
    </footer>
  );
}
