'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faEye, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import UserModal from 'game-score-frontend/Components/Molecules/Modals/UserModalComponent';
import { useMemo } from 'react';

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(null);

  const [state, setState] = useState(true);
  const [type, setType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const openModal = (userId: string, action: string) => {
    setSelectedUserId(userId);
    setModalOpen(true);
    setAction(action);
  };

  const closeModal = (state: boolean, type?: string, message = "") => {
    setModalOpen(false);
    setSelectedUserId(null);
    setAction(null);
    if (state) {
      setState(state);
      setType(type || "");
      setAlertMessage(message);
      setProgress(0);
    }
  };

  useEffect(() => {
    if (alertMessage) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setAlertMessage("");
              window.location.reload();
            }, 100); // Time for close Alert
            return 100;
          }
          return prev + 5; // Increment Bar (step By Step)
        });
      }, 180); // Total time Duration
      return () => clearInterval(interval);
    }
  }, [alertMessage]);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchData = async (page: number) => {
    try {
      const response = await axios.get(`${backendUrl}/users/admin`, {
        params: {
          limit: usersPerPage,
          page: page,
        },
      });

      if (response.status === 200 || response.status === 201) {
        const data = response.data.data || [];
        setUsers(data.slice(0, usersPerPage));
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

  const memorizedAction = useMemo(() => action, [action]);

  return (
    <div className="flex flex-col justify-center items-center text-gray-700">
      {alertMessage && type && (
  <div className={`absolute top-4 right-4 ${type === 'Success' ? 'bg-green-100' : 'bg-red-100'} border px-4 py-3 rounded w-96 shadow-md z-50`} role="alert">
    <p><strong className="font-bold">¡{type}!</strong></p>
    <p className="block sm:inline">{alertMessage}</p>
    <div className="h-1 mt-2 rounded" style={{ background: type === 'Success' ? '#4CAF50' : '#F44336' }}>
      <div className="h-full rounded" style={{ width: `${progress}%`, background: type === 'Success' ? '#2E7D32' : '#D32F2F' }}></div>
    </div>
  </div>
)}
    
      <div className="mb-4">
        <h1 className="text-gray-200 text-2xl font-bold">All Users</h1>
      </div>

      <table className="table-fixed bg-white p-6 rounded-lg shadow-md max-w-screen-xl w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="p-4 border-b w-1/5 text-center">Name</th>
            <th className="p-4 border-b w-1/5 text-center">UserName</th>
            <th className="p-4 border-b w-52 text-center">Email</th>
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
                <td className="p-4 text-center w-52">{user.email}</td>
                <td className="p-4 text-center">{user.roles}</td>
                <td className="p-4 text-center">
                  <img src={user.avatar ? user.avatar : '../../img/image_not_found.jpg'} alt={user.name} className="w-12 h-12 rounded-full mx-auto" />
                </td>
                <td className="p-4 text-center">{user.isActive ? 'Yes' : 'No'}</td>
                <td className="p-4 text-center">
                  <Link href='#' onClick={() => openModal(user.userId, 'userView')}>
                    <FontAwesomeIcon icon={faEye} className="text-[#11cef0] w-6 h-6 mr-2" />
                  </Link>
                  <Link href={''} onClick={() => openModal(user.userId, 'userEdit')}>
                    <FontAwesomeIcon icon={faPenToSquare} className="text-[#2dcf89] w-6 h-6 mr-2" />
                  </Link>
                  <Link href={'#'} onClick={() => openModal(user.userId, 'userBlock')}>
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

      {selectedUserId && (
        <UserModal 
        userId={selectedUserId} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        action={memorizedAction || ''} />
      )}
    </div>
  );
}
