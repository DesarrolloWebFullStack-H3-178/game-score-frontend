import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy  } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import axios from 'axios';

interface UserBlockProps {
  userData: {
    userId: string;
    name: string;
    username: string;
    email: string;
    avatar?: string;
    role: string;
    isActive: boolean;
  };
  isOpen: boolean;
  onClose: (state: boolean, type?: string, message?: string) => void;
  action: string;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const UserBlock: React.FC<UserBlockProps> = ({ userData, onClose }) => {
    const [copied, setCopied] = useState(false);
    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
            console.error("Failed to copy text: ", err);
        });
    };

    const handleUserBlock = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
          const response = await axios.patch(`${backendUrl}/users/admin/${userData.userId}`);
          if (response.status === 200) {
            onClose(true, "Success", "User Status has been modified" );
          }
        } catch (error) {
          console.error(`error in alter status for user ${userData.username}`, error);
          onClose(true, "Error", `error in alter status for user ${userData.username}`);
        }
      }

  return (
    <>
      <h2 className="text-lg font-bold mb-4 text-center">
        <small>User</small> <strong>{userData.name}</strong> <small>Details</small>
      </h2>
      <div className="flex justify-center mb-4">
        <Image
          src={userData.avatar ? userData.avatar : '/img/image_not_found.jpg'}
          alt={`User ${userData.userId}`}
          className="rounded-full"
          width={100} height={100}
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <table className="w-full text-left text-gray-700">
        <tbody>
          <tr>
            <th className="p-2 border-b font-semibold">Id:</th>
            <td className="p-2 border-b flex items-center">
                    {userData.userId}
                    <button
                      className="ml-2 text-green-500 hover:text-green-700"
                      onClick={() => handleCopyToClipboard(userData.userId)}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                    {copied && <span className="ml-2 text-green-500">Copied!</span>}
                  </td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Name:</th>
            <td className="p-2 border-b">{userData.name}</td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">username:</th>
            <td className="p-2 border-b">{userData.username}</td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Email:</th>
            <td className="p-2 border-b">{userData.email}</td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Password:</th>
            <td className="p-2 border-b">********</td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Role:</th>
            <td className="p-2 border-b">
              {userData.role.length > 0 ? (
                <ul>{userData.role}</ul>
              ) : (
                <span>No roles assigned</span>
              )}
            </td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">isActive:</th>
            <td className="p-2 border-b">{userData.isActive ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>
        <div className="flex justify-center mt-4">
        <button className="px-4 p-2 bg-purple-600 text-white rounded-lg mx-auto mt-4" onClick={handleUserBlock}>
            {userData.isActive ? "Block User" : "UnBlock User"}
        </button>
      </div>
    </>
  );
};

export default UserBlock;
