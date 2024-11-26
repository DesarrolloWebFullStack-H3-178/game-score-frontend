
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserCreate from "game-score-frontend/Components/Templates/Users/UserCreateTemplate";
import ScoreCreate from "game-score-frontend/Components/Templates/Scores/ScoreCreateTemplate";
import UserDetails from "game-score-frontend/Components/Templates/Users/UserDetailsTemplate";
import UserUpdate from "game-score-frontend/Components/Templates/Users/UserUpdateTemplate";
import ScoreUpdate from "game-score-frontend/Components/Templates/Scores/ScoreUpdateTemplate";
import UserBlock from "game-score-frontend/Components/Templates/Users/UserBlockTemplate";
import ScoreBlock from "game-score-frontend/Components/Templates/Scores/ScoreBlockTemplate";
import UserSession from "game-score-frontend/Components/Templates/Users/UserSessionTemplate";
import axios from "axios";
import ScoreDetails from "game-score-frontend/Components/Templates/Scores/ScoreDetailsTemplate";

interface UserModalProps {
  userId: string;
  scoreId?: string;
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

const SidebarAdminUserModal: React.FC<UserModalProps> = ({ userId, scoreId, isOpen, onClose, action }) => {
  const [isModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    userId: '',
    name: '',
    username: '',
    email: '',
    password: '',
    role: '',
    avatar: '',
    isActive: true
  });

  const [scoreData, setScoreData] = useState({
    scoreId: '',
    playerId: '',
    score: 0,
    game: '',
    createdAt: '',
    isActive: false
  });

const [isSearched, setIsSearched] = useState<boolean>(false);


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
            role: data.role,
            password: data.password,
            avatar: data.avatar,
            isActive: data.isActive
          });
        }
      } catch (error) {
        console.error("error fetching data for this user.", error);
      }
    }
  };

  useEffect(() => {
    if (action === "userView" || action === "userEditByName" || action === "userBlock" || action === "findUserById") 
      fetchUserDetails(userId);
  }, [userId, action]);

  const fetchScoreDetails = async (scoreId: string) => {
    if (scoreId && action === "scoreView" || action === "scoreEdit" || action === "scoreBlock") {
      try {
        const response = await axios.get(`${backendUrl}/scores/${scoreId}`);
        if (response.status === 200) {
          const { data } = response;
          setScoreData({
            scoreId,
            playerId: data.playerId,
            score: data.score,
            game: data.game,
            createdAt: data.createdAt,
            isActive: data.isActive
          });
        }
      } catch (error) {
        console.error("error fetching data for this score.", error);
      }
    }
  };

  useEffect(() => {
    if (action === "scoreView" || action === "scoreEditByName" || action === "scoreBlock" || action === "findScoreById") {
      if (scoreId) fetchScoreDetails(scoreId);
    }
  }, [scoreId, action]);

  const [formData, setFormData] = useState({
    userId: '3bf93fcd',
    scoreId: '',
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    avatar: "",
    isActive: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFindUserById = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    const findUserById = formData.userId;
  
    try {
      const response = await axios.get(`${backendUrl}/users/admin/${findUserById}`);
  
      if (response.status === 200 || response.status === 201) {
        setUserData(response.data);
        setIsSearched(true);
      }
    } catch (error) {
      console.error('error searching user', error);
      onClose(true, "Error", 'error searching user');
    }
  };

  const handleFindScoreById = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    const findScoreById = formData.scoreId;
  
    try {
      const response = await axios.get(`${backendUrl}/scores/admin/${findScoreById}`);
  
      if (response.status === 200 || response.status === 201) {
        setScoreData(response.data);
        setIsSearched(true);
      }
    } catch (error) {
      console.error('error searching score', error);
      onClose(true, "Error", 'error searching score');
    }
  };
  

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
      case 'scoreCreate':
        return (
          <ScoreCreate
              scoreData={scoreData}
              isOpen={isModalOpen}
              onClose={() => onClose(true, "Success", "Score created successfully")}
              action="create score"
          />
        );
      case 'userView':
        return <UserDetails userData={userData} onClose={() => onClose(true, "", "")} />;
      case 'scoreView':
        return <ScoreDetails scoreData={scoreData} onClose={() => onClose(true, "", "")} />;
      case 'findUserById':
        return (
          <>
          {!isSearched && (
            <form className="flex flex-col items-center">
              <h2 className="text-lg font-bold mb-4">Find User</h2>
              <p>Please enter the user ID to search</p>
              <input
                  type="text"
                  name="userId"
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Enter User ID"
                  autoComplete="off"
                  value={formData.userId}
                  onChange={handleChange}
                />
              <button className="px-4 p-2 bg-green-500 text-white rounded-lg" onClick={handleFindUserById}>
                Search
              </button>
            </form>
            )}
            {userData && isSearched && <UserDetails userData={userData} onClose={() => onClose(true, "", "")} />}
          </>
        );
      case 'findScoreById':
        return (
          <>
            {!isSearched && (
              <form className="flex flex-col items-center">
                <h2 className="text-lg font-bold mb-4">Find Score</h2>
                <p>Please enter the score ID to search</p>
                <input
                    type="text"
                    name="scoreId"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter Score ID"
                    autoComplete="off"
                    value={formData.scoreId}
                    onChange={handleChange}
                  />
                <button className="px-4 p-2 bg-green-500 text-white rounded-lg" onClick={handleFindScoreById}>
                  Search
                </button>
              </form>
              )}
              {scoreData && isSearched && <ScoreDetails scoreData={scoreData} onClose={() => onClose(true, "", "")} />}
            </>
          );
      case 'userEditById':
        return (
          <>
          {!isSearched && (
            <form className="flex flex-col items-center">
              <h2 className="text-lg font-bold mb-4">Find User</h2>
              <p>Please enter the user ID to search</p>
              <input
                  type="text"
                  name="userId"
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Enter User ID"
                  value={formData.userId}
                  autoComplete="off"
                  onChange={handleChange}
                />
              <button className="px-4 p-2 bg-green-500 text-white rounded-lg" onClick={handleFindUserById}>
                Search
              </button>
            </form>
            )}
            {userData && isSearched && 
            <UserUpdate 
            userData={userData} 
            isOpen={isModalOpen} 
            onClose={() => onClose(true, "Success", "User updated successfully")}
            action="userUpdate"/>}
          </>
        );
      case 'scoreEditById':
        return (
          <>
            {!isSearched && (
              <form className="flex flex-col items-center">
                <h2 className="text-lg font-bold mb-4">Find Score</h2>
                <p>Please enter the score ID to search</p>
                <input
                    type="text"
                    name="scoreId"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter User ID"
                    value={formData.scoreId}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                <button className="px-4 p-2 bg-green-500 text-white rounded-lg" onClick={handleFindScoreById}>
                  Search
                </button>
              </form>
              )}
              {userData && isSearched && 
              <ScoreUpdate 
              scoreData={scoreData} 
              isOpen={isModalOpen} 
              onClose={() => onClose(true, "Success", "Score updated successfully")}
              action="scoreUpdate"/>}
          </>
        );      
      case 'userBlock':
        return (
          <>
          {!isSearched && (
            <form className="flex flex-col items-center">
              <h2 className="text-lg font-bold mb-4">Find User</h2>
              <p>Please enter the user ID to search</p>
              <input
                  type="text"
                  name="userId"
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Enter User ID"
                  autoComplete="off"
                  value={formData.userId}
                  onChange={handleChange}
                />
              <button className="px-4 p-2 bg-green-500 text-white rounded-lg" onClick={handleFindUserById}>
                Search
              </button>
            </form>
            )}
            {userData && isSearched && 
            <UserBlock 
            userData={userData} 
            isOpen={isModalOpen} 
            onClose={() => onClose(true, "Success", "User Blocked successfully")}
            action="userBlock"/>}
          </>
        );
      case 'scoreBlock':
        return (
          <>
            {!isSearched && (
              <form className="flex flex-col items-center">
                <h2 className="text-lg font-bold mb-4">Find Score</h2>
                <p>Please enter the score ID to search</p>
                <input
                    type="text"
                    name="scoreId"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter Score ID"
                    autoComplete="off"
                    value={formData.scoreId}
                    onChange={handleChange}
                  />
                <button className="px-4 p-2 bg-green-500 text-white rounded-lg" onClick={handleFindScoreById}>
                  Search
                </button>
              </form>
              )}
              {scoreData && isSearched && 
              <ScoreBlock 
              scoreData={scoreData} 
              isOpen={isModalOpen} 
              onClose={() => onClose(true, "Success", "Score Blocked successfully")}
              action="scoreBlock"/>}
          </>
        );
      case 'userSession':
        return (
          <>
            {!isSearched && (
              <form className="flex flex-col items-center">
                <h2 className="text-lg font-bold mb-4">Find User</h2>
                <p>Please enter the user ID to search</p>
                <input
                    type="text"
                    name="userId"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter User ID"
                    autoComplete="off"
                    value={formData.userId}
                    onChange={handleChange}
                  />
                <button className="px-4 p-2 bg-green-500 text-white rounded-lg" onClick={handleFindUserById}>
                  Search
                </button>
              </form>
              )}
              {userData && isSearched && 
              <UserSession 
              userData={userData} 
              isOpen={isModalOpen} 
              onClose={() => onClose(true, "", "")}
              action="userUpdate"/>}
          </>
        );        
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

export default SidebarAdminUserModal;
