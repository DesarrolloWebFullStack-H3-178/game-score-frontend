'use client';

import React from "react";
import Image from "next/image";

export default function GoogleComponentAtom() {
    return (
        <>
          <button
            className="bg-white active:bg-gray-50 text-gray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
            type="button"
          >
            <Image alt="Google" className="w-5 mr-1" width={20} height={20} src="/img/google.svg" />Google
          </button>
        </>
    );
}