import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

interface UserSessionProps {
  userData: {
    userId: string;
    name: string;
    username: string;
    email: string;
    avatar?: string;
    roles: string[];
    isActive: boolean;
  };
  isOpen: boolean;
  onClose: (state: boolean, type?: string, message?: string) => void;
  action: string;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const UserSession: React.FC<UserSessionProps> = ({ userData, onClose, action }) => {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [expiresAt, setExpiresAt] = useState('');

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get(`${backendUrl}/users/session/${userData.userId}`);
        if (response.status === 200) {
          const { sessionToken, expiresAt } = response.data.data;
          const { message } = response.data;

          setMessage(message);
          setSessionToken(sessionToken);
          setExpiresAt(expiresAt);
        }
      } catch (error) {
        console.error(`Error fetching session details for user ${userData.userId}`, error);
        onClose(true, "Error", `Error fetching session details for user ${userData.userId}`);
      }
    };

    fetchUserSession(); // Llamada al API al montar el componente
  }, [userData.userId, onClose]); // Dependencia para que se ejecute solo cuando `userData.userId` cambia

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
        <small>User</small> <strong>{userData.username}</strong><small> Session Details</small>
      </h2>

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
            <th className="p-2 border-b font-semibold">Status:</th>
            <td className="p-2 border-b">{message || 'N/A'}</td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Token:</th>
            <td className="p-2 border-b">{sessionToken || 'N/A'}</td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Expires At:</th>
            <td className="p-2 border-b">{expiresAt || 'N/A'}</td>
          </tr>
        </tbody>
      </table>
      {onClose && (
        <div className="flex justify-center mt-4">
          <button className="px-4 p-2 bg-purple-600 text-white rounded-lg mx-auto mt-4" onClick={() => onClose(true, '', '')}>
            Ok
          </button>
        </div>
      )}
    </>
  );
};

export default UserSession;
