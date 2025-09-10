import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 w-ful h-55 mt-10">
      {/* Full-width background container */}
      <div className="w-full">
        {/* Centered content container */}
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold mb-2">SmartVote</h2>
            <p className="text-sm">
              A secure, modern voting platform for school-wide elections.
            </p>
          </div>

          {/* Quick Links */}
          <div >
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li><Link to="/register" className="hover:underline">Register</Link></li>
              <li><Link to="#" className="hover:underline">About</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">Email: support@smartvote.edu</p>
            <p className="text-sm">Phone: +63 912 345 6789</p>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="max-w-screen-xl mx-auto text-center text-sm text-gray-500 mt-6 px-6">
          © {new Date().getFullYear()} SmartVote. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
