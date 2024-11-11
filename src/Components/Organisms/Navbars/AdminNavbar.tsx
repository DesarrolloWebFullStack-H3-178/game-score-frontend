'use client';

import React, { useEffect, useState } from "react";
import UserDropdown from "game-score-frontend/Components/Dropdowns/UserDropdown";
import axios from "axios";

export default function AdminNavbar() {

  const [userData, setUserData] = useState({
    userId: '',
    name: '',
    username: '',
    email: '',
    password: '',
    roles: [] as string[],
    avatar: '',
    isActive: true
  });
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


    const data = localStorage.getItem('user');

    if (data) {

      const parsedUser = JSON.parse(data);
        const userId = parsedUser.id; 
        // console.log(userId);

      const fetchData = async () => {
        try {
          const response = await axios.get(`${backendUrl}/users/admin/${userId}`);
    
          if (response.status === 200) {
            // setUserData(response.data);
            // console.log(response);
            
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchData();
    
      try {
        const parsedUser = JSON.parse(data);
        const userId = parsedUser.id; 
        // console.log(userId);
        
        const fetchUserDetails = async () => {
          const response = await axios.get(`${backendUrl}/users/admin/${userId}`);

          if (response.status === 200) {
            setUserData(response.data);
            // console.log(response.data);
            
          }
        }
        fetchUserDetails();
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    


  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
             {`Welcome, ${userData ? userData.name : 'User'}`}
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-300 rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
