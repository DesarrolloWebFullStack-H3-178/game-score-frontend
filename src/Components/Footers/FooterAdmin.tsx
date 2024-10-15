'use client';

import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
            <div className="text-sm text-gray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://github.com/CQuiroga"
                  className="text-white hover:text-gray-300 text-sm font-semibold py-1"
                >
                  Camilo Quiroga
                </a>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end justify-center">
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3"
                  >
                    Link 1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3"
                  >
                    Link 2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3"
                  >
                    Link 3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3"
                  >
                    Link 4
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
