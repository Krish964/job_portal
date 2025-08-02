import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black via-gray-900 to-gray-800 text-gray-300 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-4 text-left">
        {/* Brand & About */}
        <div>
          <h2 className="text-2xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 select-none">
            JobPortal
          </h2>
          <p className="mb-6 leading-relaxed text-gray-400">
            We connect talent with the best career opportunities globally. Start your journey today!
          </p>
          <div className="flex items-center space-x-6">
            {/* Social Links */}
            {[
              {
                href: "https://facebook.com",
                label: "Facebook",
                className:
                  "bg-gray-800 hover:bg-cyan-600 text-cyan-400 hover:text-white shadow-lg transition-colors rounded-full w-10 h-10 flex items-center justify-center font-semibold select-none",
                text: "FB",
              },
              {
                href: "https://twitter.com",
                label: "Twitter",
                className:
                  "bg-gray-800 hover:bg-sky-500 text-cyan-400 hover:text-white shadow-lg transition-colors rounded-full w-10 h-10 flex items-center justify-center font-semibold select-none",
                text: "TW",
              },
              {
                href: "https://linkedin.com",
                label: "LinkedIn",
                className:
                  "bg-gray-800 hover:bg-cyan-500 text-cyan-400 hover:text-white shadow-lg transition-colors rounded-full w-10 h-10 flex items-center justify-center font-semibold select-none",
                text: "IN",
              },
            ].map(({ href, label, className, text }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={className}
              >
                {text}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-cyan-400">Quick Links</h3>
          <ul className="space-y-3">
            {["About Us", "Jobs", "Employers", "Support"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors font-medium"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-cyan-400">Contact</h3>
          <p className="text-gray-400 mb-2">Email: <a href="mailto:support@jobportal.com" className="hover:underline">support@jobportal.com</a></p>
          <p className="text-gray-400">Phone: <a href="tel:+919876543210" className="hover:underline">+91 9876543210</a></p>
        </div>

        {/* Subscription Form */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-cyan-400">Stay Updated</h3>
          <form
            className="flex flex-col space-y-4"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Subscribe form"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="rounded-lg p-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg py-3 font-semibold shadow-lg transition"
              aria-label="Subscribe"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <p className="text-center text-gray-500 py-6 text-sm select-none">
          © 2025 JobPortal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
