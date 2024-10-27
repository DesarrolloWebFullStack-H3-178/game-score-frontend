'use client';

import Link from "next/link";
import NotificationDropdown from "../../Dropdowns/NotificationDropdown";
import UserDropdown from "../../Dropdowns/UserDropdown";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState<string>("hidden");
  const [pathname, setPathname] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  return (
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        {/* Toggler */}
        <button
          className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
        >
          <i className="fas fa-bars"></i>
          <FontAwesomeIcon icon={faBars} className="text-gray-500 w-6 h-6 mr-1" />
        </button>
        {/* Brand */}
        <Link
          className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
          href="/">
          Game Scores Dashboard
        </Link>
        {/* User */}
        <ul className="md:hidden items-center flex flex-wrap list-none">
          <li className="inline-block relative">
            <NotificationDropdown />
          </li>
          <li className="inline-block relative">
            <UserDropdown />
          </li>
        </ul>
        {/* Collapse */}
        <div className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ${collapseShow}`}>
          {/* Collapse header */}
          <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-200">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                <Link
                  className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  href="/">
                  Game Scores Dashboard
                </Link>
              </div>
              <div className="w-6/12 flex justify-end">
                <button
                  type="button"
                  className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
          {/* Form */}
          {/* <form className="mt-6 mb-4 md:hidden">
            <div className="mb-3 pt-0">
              <input
                type="text"
                placeholder="Search"
                className="border-0 px-3 py-2 h-12 border-solid  border-gray-500 placeholder-gray-300 text-gray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
              />
            </div>
          </form> */}
          {/* Divider */}
          <hr className="my-4 md:min-w-full" />
          {/* Heading */}
          <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Section 1 Links
          </h6>
          {/* Navigation */}
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link
                className={
                  "text-xs uppercase py-3 font-bold block " +
                  (pathname.indexOf("#") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-gray-700 hover:text-gray-500")
                }
                href="#"
              >
                <i
                  className={
                    "fas fa-tv mr-2 text-sm " +
                    (pathname.indexOf("#") !== -1
                      ? "opacity-75"
                      : "text-gray-300")
                  }
                ></i>{" "}
                Link 1
              </Link>
            </li>
            <li className="items-center">
              <Link
                className={
                  "text-xs uppercase py-3 font-bold block " +
                  (pathname.indexOf("#") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-gray-700 hover:text-gray-500")
                }
                href="#">
                <i
                  className={
                    "fas fa-tools mr-2 text-sm " +
                    (pathname.indexOf("#") !== -1
                      ? "opacity-75"
                      : "text-gray-300")
                  }
                ></i>{" "}
                Link 2
              </Link>
            </li>
            <li className="items-center">
              <Link
                className={
                  "text-xs uppercase py-3 font-bold block " +
                  (pathname.indexOf("#") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-gray-700 hover:text-gray-500")
                }
                href="#">
                <i
                  className={
                    "fas fa-table mr-2 text-sm " +
                    (pathname.indexOf("#") !== -1
                      ? "opacity-75"
                      : "text-gray-300")
                  }
                ></i>{" "}
                Link3
              </Link>
            </li>
            <li className="items-center">
              <Link
                className={
                  "text-xs uppercase py-3 font-bold block " +
                  (pathname.indexOf("#") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-gray-700 hover:text-gray-500")
                }
                href="#">
                <i
                  className={
                    "fas fa-map-marked mr-2 text-sm " +
                    (pathname.indexOf("#") !== -1
                      ? "opacity-75"
                      : "text-gray-300")
                  }
                ></i>{" "}
                Link 4
              </Link>
            </li>
          </ul>
          {/* Divider */}
          <hr className="my-4 md:min-w-full" />
          {/* Heading */}
          <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
          Section 2 Links
          </h6>
          {/* Navigation */}
          <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li className="items-center">
              <Link
                className="text-gray-700 hover:text-gray-500 text-xs uppercase py-3 font-bold block"
                href="#">
                <i className="fas fa-fingerprint text-gray-400 mr-2 text-sm"></i>{" "}
                Link 1
              </Link>
            </li>
            <li className="items-center">
              <Link
                className="text-gray-700 hover:text-gray-500 text-xs uppercase py-3 font-bold block"
                href="#">
                <i className="fas fa-clipboard-list text-gray-300 mr-2 text-sm"></i>{" "}
                Link 2
              </Link>
            </li>
          </ul>
          {/* Divider */}
          <hr className="my-4 md:min-w-full" />
          {/* Heading */}
          <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Other Links
          </h6>
          {/* Navigation */}
          <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li className="items-center">
              <Link
                className="text-gray-700 hover:text-gray-500 text-xs uppercase py-3 font-bold block"
                href="#">
                <i className="fas fa-file-alt text-gray-400 mr-2 text-sm"></i>{" "}
                Link 1
              </Link>
            </li>
            <li className="items-center">
              <Link
                className="text-gray-700 hover:text-gray-500 text-xs uppercase py-3 font-bold block"
                href="#">
                <i className="fas fa-user-circle text-gray-400 mr-2 text-sm"></i>{" "}
                Link 2
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
