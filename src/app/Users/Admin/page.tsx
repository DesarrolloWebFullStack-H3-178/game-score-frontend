'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  const fetchData = async (page: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/users/admin`, {
        params: {
          limit: usersPerPage,
          page: page - 1, // Ajusta si tu API usa un index base 0 o base 1 para las páginas
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        setUsers(response.data.data || []); 
        setTotalUsers(response.data.total);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
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
        <h1 className="text-green-700 text-2xl font-bold">Best Scores Page</h1>
      </div>

      <table className="table-fixed bg-white p-6 rounded-lg shadow-md max-w-screen-md w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">UserName</th>
            <th className="p-4 border-b">Email</th>
            <th className="p-4 border-b">Roles</th>
            <th className="p-4 border-b">Avatar</th>
            <th className="p-4 border-b">isActive?</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userId} className="bg-white hover:bg-gray-50 border-b border-dashed">
              <td className="p-4 text-center">{user.name}</td>
              <td className="p-4 text-center">{user.username}</td>
              <td className="p-4 text-center">{user.email}</td>
              <td className="p-4 text-center">{user.roles.join(', ')}</td>
              <td className="p-4 text-center">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
              </td>
              <td className="p-4 text-center">{user.isActive ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginador */}
      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-green-500 text-white'} rounded`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-green-500 text-white'} rounded`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
