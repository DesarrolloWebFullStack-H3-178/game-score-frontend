import React, { useRef, useState } from "react";
import { createPopper } from "@popperjs/core";

const UserDropdown: React.FC = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef<HTMLAnchorElement>(null);
  const popoverDropdownRef = useRef<HTMLDivElement>(null);

  const openDropdownPopover = () => {
    if (btnDropdownRef.current && popoverDropdownRef.current) {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "bottom-start",
      });
      setDropdownPopoverShow(true);
    }
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <a
        className="text-gray-500 block"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-gray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="/img/react.jpg"
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
          onClick={(e) => e.preventDefault()}
        >
          Action 1
        </a>
        <a
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
          onClick={(e) => e.preventDefault()}
        >
          Action 2
        </a>
        <a
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
          onClick={(e) => e.preventDefault()}
        >
          Action 3
        </a>
        <div className="h-0 my-2 border border-solid border-gray-100" />
        <a
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700"
          onClick={(e) => e.preventDefault()}
        >
          LogOut
        </a>
      </div>
    </>
  );
};

export default UserDropdown;