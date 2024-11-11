
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserCreate from "game-score-frontend/Components/Templates/Users/UserCreateTemplate";
import UserDetails from "game-score-frontend/Components/Templates/Users/UserDetailsTemplate";
import UserUpdate from "game-score-frontend/Components/Templates/Users/UserUpdateTemplate";
import UserBlock from "game-score-frontend/Components/Templates/Users/UserBlockTemplate";
import axios from "axios";

interface UserModalProps {
  /* userData: {
    userId: string;
    name: string;
    username: string;
    email: string;
    avatar?: string;
    roles: string[];
    isActive: boolean;
  }; */
  userId: string | null;
  isOpen: boolean;
  onClose: (state: boolean, type?: string, message?: string) => void;
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

const UserModal: React.FC<UserModalProps> = ({ userId, isOpen, onClose, action }) => {
  const [isModalOpen, setModalOpen] = useState(false);
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

  const fetchUserDetails = async (userId: string) => {
    if (userId && action === "userView" || action === "userEdit" || action === "userBlock") {
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
            password: data.password,
            avatar: data.avatar,
            isActive: data.isActive
          });
        }
      } catch (error) {
        console.error("error fetching data for this user.");
      }
    }
  };

  useEffect(() => {
    if (userId && (action === "userView" || action === "userEdit" || action === "userBlock" || action === "findUserById")) {
      fetchUserDetails(userId);
    }
  }, [userId, action]);

  const [formData, setFormData] = useState({
    userId: '',
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    avatar: "",
    isActive: false,
  });

  

  const renderContent = () => {
    switch (action) {
      case 'userCreate':
        return (
          <UserCreate
              userData={userData}
              isOpen={isModalOpen}
              onClose={() => onClose(true, "Success", "User created successfully")}
              action="create"
          />
        );
      case 'userView':
        return <UserDetails userData={userData} onClose={() => onClose(true, "", "")} />;
      case 'userEdit':
        return <UserUpdate 
        userData={userData} 
        isOpen={isModalOpen} 
        onClose={() => onClose(true, "Success", "User updated successfully")}
        action="userUpdate"
        />
      case 'userBlock':
        return <UserBlock 
        userData={userData} 
        isOpen={isModalOpen} 
        onClose={() => onClose(true, "Success", "User Blocked successfully")}
        action="UserBlock"
        />
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
            className="modal-container bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
            style={{ width: "35em", minHeight: "40em" }}
            variants={modalVariants}
          >
            {renderContent()}
            <motion.div
              whileHover={{ rotate: 45 }}
              className="close absolute top-4 right-4 cursor-pointer"
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

export default React.memo(UserModal);
