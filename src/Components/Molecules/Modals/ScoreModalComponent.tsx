import axios from "axios";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScoreModalProps {
  userId: string;
  isOpen: boolean;
  onClose: (state: boolean) => void;
  action: string;
}

const backdropVariants = {
  hidden: { opacity: 0.5 },
  visible: {
    opacity: 0.98,
    transition: { duration: 1.3, delayChildren: 0.2 },
  },
};

const modalVariants = {
  hidden: { y: "-100vh" },
  visible: {
    y: 0,
    transition: { type: "spring", stiffness: 70 },
  },
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const ScoreModal: React.FC<ScoreModalProps> = ({ userId, isOpen, onClose, action }) => {
  const [userData, setUserData] = useState({
    userId: '',
    name: '',
    username: '',
    email: '',
    roles: [] as string[],
    avatar: '',
    isActive: ''
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId && action === "View") {
        try {
          const response = await axios.get(`${backendUrl}/users/admin/${userId}`);
          if (response.status === 200) {
            const { data } = response;
            setUserData({
              userId,
              name: data.name,
              username: data.username,
              email: data.email,
              roles: data.roles || [],
              avatar: data.avatar,
              isActive: data.isActive
            });
          }
        } catch (error) {
          console.error("error fetching data for this user.");
        }
      }
    };

    if (action === "View") fetchUserDetails();
  }, [userId, action]);

  const renderContent = () => {
    switch (action) {
      case 'userView':
        return (
          <>
            <h2 className="text-lg font-bold mb-4 text-center">
              <small>User</small> <strong>{userData.name}</strong> <small>Details</small>
            </h2>
            <img
              src={userData.avatar}
              alt={`User ${userId}`}
              className="mx-auto mb-4 rounded-md"
              style={{ height: "130px" }}
            />
            <table className="w-full text-left text-gray-700">
              <tbody>
                <tr><th className="p-2 border-b font-semibold">Id:</th><td className="p-2 border-b">{userData.userId}</td></tr>
                <tr><th className="p-2 border-b font-semibold">Name:</th><td className="p-2 border-b">{userData.name}</td></tr>
                <tr><th className="p-2 border-b font-semibold">Username:</th><td className="p-2 border-b">{userData.username}</td></tr>
                <tr><th className="p-2 border-b font-semibold">Email:</th><td className="p-2 border-b">{userData.email}</td></tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Roles:</th>
                  <td className="p-2 border-b">
                    {userData.roles.length > 0 ? (
                      <ul>{userData.roles.map((role, index) => <li key={index}>{role}</li>)}</ul>
                    ) : (
                      <span>No roles assigned</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        );
      case 'findUserById':
        return (
          <form className="flex flex-col">
            <h2 className="text-lg font-bold mb-4">Find User</h2>
            <p>Please enter the user ID to search</p>
            <input
                type="text"
                name="name"
                className="border-solid border-2 border-sky-500 rounded-md mb-4"
            />
            <button className="px-4 p-2 bg-green-500 text-white rounded-lg">
                Search
            </button>
          </form>
        );
      
      case 'userEdit':
        return (
          <form className="flex flex-col">
            <h2 className="text-lg font-bold mb-4">Find User</h2>
            <p>Please type user Id to Edit</p>
            <input
                type="text"
                name="name"
                className="border-solid border-2 border-sky-500 rounded-md mb-4"
            />
            <button className="px-4 p-2 bg-green-500 text-white rounded-lg">
                Search
            </button>
          </form>
        );
      case 'userBlock':
        return (
          <form className="flex flex-col">
            <h2 className="text-lg font-bold mb-4">Find User</h2>
            <p>Please type user Id to Block</p>
            <input
                type="text"
                name="name"
                className="border-solid border-2 border-sky-500 rounded-md mb-4"
            />
            <button className="px-4 p-2 bg-green-500 text-white rounded-lg">
                Search
            </button>
          </form>
        );
      case 'userBlock':
        return (
          <form className="flex flex-col">
            <h2 className="text-lg font-bold mb-4">Find User</h2>
            <p>Please type user Id to Block</p>
            <input
                type="text"
                name="name"
                className="border-solid border-2 border-sky-500 rounded-md mb-4"
            />
            <button className="px-4 p-2 bg-green-500 text-white rounded-lg">
                Search
            </button>
          </form>
        );
      case 'userSession':
        return (
          <form className="flex flex-col">
            <h2 className="text-lg font-bold mb-4">Find User</h2>
            <p>Please type user Id to Check Session</p>
            <input
                type="text"
                name="name"
                className="border-solid border-2 border-sky-500 rounded-md mb-4"
            />
            <button className="px-4 p-2 bg-green-500 text-white rounded-lg">
                Search
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop fixed inset-0 bg-gray-700 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="modal-container bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
            style={{ width: "35em" }}
            variants={modalVariants}
          >
            {renderContent()}
            <motion.div
              whileHover={{ rotate: 45 }}
              className="close"
              onClick={() => onClose(false)}
            >
              <div></div>
              <div></div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(ScoreModal);
