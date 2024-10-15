'use client';
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
export default function Navbar() {
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-800">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap" href="/">
                BootCamp Talento Tech FullStack
            </Link>
          </div>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-200 text-gray-700 px-3 py-4 lg:py-2 flex items-center text-xs font-bold"
                  href="https://api.whatsapp.com/send/?phone=573044018870&text&type=phone_number&app_absent=0"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-gray-500 w-6 h-6 mr-1" />
                  <span className="inline-block ml-2">WhatsApp</span>
                </a>
              </li>
            <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-200 text-gray-700 px-3 py-4 lg:py-2 flex items-center text-xs font-bold"
                  href="https://github.com/CQuiroga"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faGithub} className="text-gray-500 w-6 h-6 mr-1" />
                  <span className="inline-block ml-2">GitHub</span>
                </a>
              </li>

            </ul>
        </div>
      </nav>
    </>
  );
}
