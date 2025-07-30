// components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-4 text-left">
        <div>
          <h2 className="text-xl font-bold mb-2">JobPortal</h2>
          <p className="mb-3 text-gray-300">We connect talent with the best career opportunities globally. Start your journey today!</p>
          <div className="flex items-center space-x-4 mt-3">
            {/* Replace these with React Icons for real projects */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">FB</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">TW</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">IN</a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-400">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Jobs</a></li>
            <li><a href="#" className="hover:text-white">Employers</a></li>
            <li><a href="#" className="hover:text-white">Support</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-gray-400">Email: support@jobportal.com</p>
          <p className="text-gray-400">Phone: +91 9876543210</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
          <form className="flex flex-col">
            <input type="email" className="rounded p-2 mb-2 text-black" placeholder="Enter your email" />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded py-2">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8">
        <p className="text-center text-gray-400 py-5 text-sm">
          © 2025 JobPortal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
