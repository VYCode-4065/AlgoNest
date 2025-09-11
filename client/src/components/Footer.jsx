import React from "react";
import AlgoNestLogo from "./Logo";
import StyledBtn from "./StyledBtn";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-800 dark:text-slate-300  py-10">
      <hr />
      <div className="container mx-auto px-6 md:px-12 py-2">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Description */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <AlgoNestLogo textColor={"white"} />
            <p className="text-purple-500 dark:text-slate-300 max-w-sm">
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
                target="_blank"
                href="https://github.com/VYCode-4065"
                aria-label="Github"
                className="hover:text-purple-400"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/vishaldev003"
                target="_blank"
                aria-label="LinkedIn"
                className="hover:text-purple-400"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-purple-400"
              >
                <FaInstagram size={20} />
              </a>
            </div>

            <form className="flex gap-4 lg:gap-0 flex-col lg:flex-row sm:items-end lg:mt-10 mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="ml-4 lg:ml-0 lg:w-full px-4 py-1 rounded-md text-purple-900 dark:text-slate-300 focus:outline-none mb-3 sm:mb-0 sm:mr-3 border dark:focus-within:border-pink-500"
              />
              <StyledBtn>Subscribe</StyledBtn>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-purple-700 pt-6 text-center text-purple-400 dark:text-slate-300 text-sm">
          &copy; {new Date().getFullYear()} EduTech. All rights reserved. |
          Developed by ❤️ with Vishal Yadav
        </div>
      </div>
    </footer>
  );
};

export default Footer;
