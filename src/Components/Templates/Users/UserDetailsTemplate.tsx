import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy  } from "@fortawesome/free-solid-svg-icons";

interface UserDetailsProps {
  userData: {
    userId: string;
    name: string;
    username: string;
    email: string;
    avatar?: string;
    roles: string[];
    isActive: boolean;
  };
  onClose?: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userData, onClose }) => {

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

  return (
    <>
      <h2 className="text-lg font-bold mb-4 text-center">
        <small>User</small> <strong>{userData.name}</strong> <small>Details</small>
      </h2>
      <div className="flex justify-center mb-4">
        <img
          src={userData.avatar ? userData.avatar : '../../img/image_not_found.jpg'}
          alt={`User ${userData.userId}`}
          className="rounded-full"
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
            <th className="p-2 border-b font-semibold">Username:</th>
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
              {userData.roles.length > 0 ? (
                <ul>{userData.roles.map((role, index) => <li key={index}>{role}</li>)}</ul>
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
      {onClose && (
        <div className="flex justify-center mt-4">
          <button className="px-4 p-2 bg-purple-600 text-white rounded-lg mx-auto mt-4" onClick={onClose}>
            Ok
          </button>
        </div>
      )}
    </>
  );
};

export default UserDetails;
