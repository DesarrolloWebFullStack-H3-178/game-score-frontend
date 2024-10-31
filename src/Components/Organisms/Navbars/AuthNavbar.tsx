'use client';
import React from "react";
import Link from "next/link";
import LinksHeaderComponentMolecule from "../../Molecules/HeaderAuth/LinksHeaderComponentMolecule";
export default function Navbar() {
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap" href="/">
                BootCamp Talento Tech FullStack
            </Link>
          </div>
            <LinksHeaderComponentMolecule />
        </div>
      </nav>
    </>
  );
}
