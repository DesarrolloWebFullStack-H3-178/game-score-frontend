'use client';

import React from "react";
import Link from "next/link";
import FooterNavbarLinks from "../Organisms/Navbars/FooterNavbarComponentOrganism";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-gray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
            <div className="text-sm text-gray-400 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <Link
                  href="https://github.com/CQuiroga"
                  className="text-white hover:text-gray-100 text-sm font-semibold py-1"
                >
                  Camilo Quiroga
                </Link>
              </div>
            </div>
            <FooterNavbarLinks />
          </div>
        </div>
      </footer>
    </>
  );
}
