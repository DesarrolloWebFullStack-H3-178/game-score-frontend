'use client';
import React from "react";
import LinksComponentMolecule from "../Molecules/FooterAuth/LinksFooterComponentMolecule";

export default function FooterAuth() {
  return (
    <>
      <footer
        className="absolute w-full bottom-0 bg-gray-800"
      >
        <div className="container mx-auto px-4 py-4">
          <hr className="mb-6 border-b-1 border-gray-600" />
          <LinksComponentMolecule />
        </div>
      </footer>
    </>
  );
}
