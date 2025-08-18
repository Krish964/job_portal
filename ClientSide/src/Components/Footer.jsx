import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto shadow-inner border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4 text-left">
        {/* Brand & About */}
        <div>
          <h2 className="text-3xl font-extrabold mb-5 select-none tracking-wide text-white">
            JobPortal
          </h2>
          <p className="mb-6 leading-relaxed max-w-sm text-gray-300">
            We connect talent with the best career opportunities globally.
            Start your journey today!
          </p>
          <div className="flex items-center space-x-5">
            {[
              {
                href: "https://facebook.com",
                label: "Facebook",
                className:
                  "bg-gray-800 hover:bg-gray-600 text-gray-500 hover:text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold select-none transition-colors",
                text: "FB",
              },
              {
                href: "https://twitter.com",
                label: "Twitter",
                className:
                  "bg-gray-800 hover:bg-sky-500 text-sky-400 hover:text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold select-none transition-colors",
                text: "TW",
              },
              {
                href: "https://linkedin.com",
                label: "LinkedIn",
                className:
                  "bg-gray-800 hover:bg-gray-700 text-gray-600 hover:text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold select-none transition-colors",
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
          <h3 className="text-2xl font-semibold mb-6 text-white tracking-wide">
            Quick Links
          </h3>
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
          <h3 className="text-2xl font-semibold mb-6 text-white tracking-wide">
            Contact
          </h3>
          <p className="text-gray-400 mb-3">
            Email:{" "}
            <a
              href="mailto:support@jobportal.com"
              className="hover:underline text-white font-medium"
            >
              support@jobportal.com
            </a>
          </p>
          <p className="text-gray-400">
            Phone:{" "}
            <a
              href="tel:+919876543210"
              className="hover:underline text-white font-medium"
            >
              +91 9876543210
            </a>
          </p>
        </div>

        {/* Subscription Form */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-white tracking-wide">
            Stay Updated
          </h3>
          <form
            className="flex flex-col space-y-4"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Subscribe form"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="rounded-lg p-3 bg-gray-800 border border-gray-100 text-white placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-white hover:bg-gray-200 text-black rounded-lg py-3 font-semibold transition"
              aria-label="Subscribe"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <p className="text-center text-gray-500 py-6 text-sm select-none">
          © 2025 JobPortal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
