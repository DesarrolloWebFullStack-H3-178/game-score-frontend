'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faEye, faTrash, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Swal from 'sweetalert2'

interface User {
  userId: string;
  name: string;
  username: string;
  email: string;
  roles: string[];
  avatar: string;
  isActive: boolean;
}

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage] = useState(20);

  const backendUrl = process.env.BACKEND_URL;

  const handleUserDetails = (option: string) => {

    const userId = option;

    Swal.fire({
      title: `User ${userId} Details`,
      html: `
        <table>
        <tr>
          <th>Name:</th>
          <td>${userId}</td>
        </tr>
        </table>
      `
    })
  }

  const handleUserEdit = (option: string) => {

    const userId = option;

    Swal.fire({
      title: `User ${userId} Details`,
      html: `
        <table>
        <tr>
          <th>Name:</th>
          <td>${userId}</td>
        </tr>
        </table>
      `
    })
  }

  const handleUserBlock = (option: string) => {

    const userId = option;

    Swal.fire({
      title: `User ${userId} Details`,
      html: `
        <table>
        <tr>
          <th>Name:</th>
          <td>${userId}</td>
        </tr>
        </table>
      `
    })
  }

  const fetchData = async (page: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/users/admin`, {
        params: {
          limit: usersPerPage,
          page: page,
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        console.log("Datos recibidos:", response.data.data);
        setUsers(response.data.data || []);
        setTotalUsers(response.data.total);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching users for page:", currentPage);
    fetchData(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-gray-700">
      <div className="mb-4">
        <h1 className="text-gray-200 text-2xl font-bold">All Users</h1>
      </div>

      <table className="table-fixed bg-white p-6 rounded-lg shadow-md  max-w-screen-xl w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="p-4 border-b w-1/5 text-center">Name</th>
            <th className="p-4 border-b w-1/5 text-center">UserName</th>
            <th className="p-4 border-b w-1/5 text-center">Email</th>
            <th className="p-4 border-b w-1/5 text-center">Roles</th>
            <th className="p-4 border-b w-1/5 text-center">Avatar</th>
            <th className="p-4 border-b w-1/5 text-center">isActive?</th>
            <th className="p-4 border-b w-1/5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.userId} className="bg-white hover:bg-gray-50 border-b border-dashed">
                <td className="p-4 text-center">{user.name}</td>
                <td className="p-4 text-center">{user.username}</td>
                <td className="p-4 text-center">{user.email}</td>
                <td className="p-4 text-center">{user.roles.join(', ')}</td>
                <td className="p-4 text-center">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mx-auto" />
                </td>
                <td className="p-4 text-center">{user.isActive ? 'Yes' : 'No'}</td>
                <td className="p-4 text-center">
                  <Link href={''} onClick={() => handleUserDetails(user.userId)}>
                    <FontAwesomeIcon icon={faEye} className="text-[#11cef0] w-6 h-6 mr-2" />
                  </Link>
                  <Link href={''} onClick={ () => handleUserEdit(user.userId)}>
                    <FontAwesomeIcon icon={faPenToSquare} className="text-[#2dcf89] w-6 h-6 mr-2" />
                  </Link>
                  <Link href={'#'} onClick={ () => handleUserBlock(user.userId)}>
                    <FontAwesomeIcon icon={user.isActive ? faLock : faLockOpen} className="text-gray-500 w-6 h-6 mr-2" />
                  </Link>
                 
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginador */}
      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-green-500 text-white'} rounded-lg`}
        >
          Previous
        </button>
        <span className='bg-gray-100 p-1'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-green-500 text-white'} rounded-lg`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
