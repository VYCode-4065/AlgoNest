import React from "react";
import AlgoNestLogo from "./Logo";
import StyledBtn from "./StyledBtn";

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-purple-100 py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Description */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <AlgoNestLogo textColor={"white"} />
            <p className="text-purple-300 max-w-sm">
              Empowering learners worldwide with quality online education and
              innovative tools.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mb-8 md:mb-0 md:w-1/3 flex justify-between">
            <div>
              <h3 className="font-semibold mb-3">Courses</h3>
              <ul>
                <li className="mb-2 hover:text-purple-400 cursor-pointer">
                  Programming
                </li>
                <li className="mb-2 hover:text-purple-400 cursor-pointer">
                  Data Science
                </li>
                <li className="mb-2 hover:text-purple-400 cursor-pointer">
                  Design
                </li>
                <li className="mb-2 hover:text-purple-400 cursor-pointer">
                  Marketing
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul>
                <li className="mb-2 hover:text-purple-400 cursor-pointer">
                  About Us
                </li>
                <li className="mb-2 hover:text-purple-400 cursor-pointer">
                  Careers
                </li>
                <li className="mb-2 hover:text-purple-400 cursor-pointer">
                  Blog
                </li>
                <li className="mb-2 hover:text-purple-400 cursor-pointer">
                  Contact
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="md:w-1/3 flex flex-col items-center">
            <h3 className="font-semibold mb-3">Stay Connected</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-purple-400"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.5 9.87v-6.98h-2.3v-2.9h2.3v-2.2c0-2.27 1.35-3.53 3.42-3.53.99 0 2.02.18 2.02.18v2.22h-1.14c-1.12 0-1.47.7-1.47 1.42v1.7h2.5l-.4 2.9h-2.1v6.98A10 10 0 0022 12z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-purple-400"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.14 9.14 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.12A12.8 12.8 0 013 4.15a4.52 4.52 0 001.4 6.04 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9 9 0 013 19.54a12.7 12.7 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-purple-400"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5a2.5 2.5 0 11-.001 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3V9zm7 0h3.6v1.71h.05c.5-.95 1.72-1.95 3.54-1.95 3.79 0 4.5 2.5 4.5 5.75V21H17v-5.5c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92V21H10V9z" />
                </svg>
              </a>
            </div>

            <form className="flex flex-col sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-md text-purple-900 focus:outline-none mb-3 sm:mb-0 sm:mr-3"
              />
              <StyledBtn>Subscribe</StyledBtn>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-purple-700 pt-6 text-center text-purple-400 text-sm">
          &copy; {new Date().getFullYear()} EduTech. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
