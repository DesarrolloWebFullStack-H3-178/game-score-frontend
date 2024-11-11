
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScoreCreate from "game-score-frontend/Components/Templates/Scores/ScoreCreateTemplate";
import ScoreDetails from "game-score-frontend/Components/Templates/Scores/ScoreDetailsTemplate";
import ScoreUpdate from "game-score-frontend/Components/Templates/Scores/ScoreUpdateTemplate";
import ScoreBlock from "game-score-frontend/Components/Templates/Scores/ScoreBlockTemplate";
import axios from "axios";

interface ScoreModalProps {
/*   scoreData: {
    scoreId: string;
    playerId: string;
    score: number;
    game: string;
    createdAt: string
}; */
  scoreId: string | null;
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

const ScoreModal: React.FC<ScoreModalProps> = ({ scoreId, isOpen, onClose, action }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [scoreData, setScoreData] = useState({
    scoreId: '',
    playerId: '',
    score: 0,
    game: '',
    createdAt: '',
    isActive: true
  });

  const fetchScoreDetails = async (scoreId: string) => {
    if (scoreId && action === "scoreView" || action === "scoreEdit" || action === "scoreBlock") {
      try {
        const response = await axios.get(`${backendUrl}/scores/admin/${scoreId}`);
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
        console.error("error fetching data for this score.");
      }
    }
  };

  useEffect(() => {
    if (scoreId && (action === "scoreView" || action === "scoreEdit" || action === "scoreBlock" || action === "findScoreById")) {
      fetchScoreDetails(scoreId);
    }
  }, [scoreId, action]);

  const [formData, setFormData] = useState({
    scoreId: '',
    playerId: '',
    score: 0,
    game: '',
    createdAt: '',
    isActive: false
  });

  const renderContent = () => {
    switch (action) {
      case 'scoreCreate':
        return (
          <ScoreCreate
            scoreData={scoreData}
            isOpen={isModalOpen}
            onClose={() => onClose(true, "Success", "Score created successfully")}
              action="createScore"
              />
        );
       case 'scoreView':
        return <ScoreDetails scoreData={scoreData} onClose={() => onClose(true, "", "")} />;
      case 'scoreEdit':
        return <ScoreUpdate 
        scoreData={scoreData} 
        isOpen={isModalOpen} 
        onClose={() => onClose(true, "Success", "Score updated successfully")}
        action="scoreUpdate"
        />
      
      case 'scoreBlock':
        return <ScoreBlock 
        scoreData={scoreData} 
        isOpen={isModalOpen} 
        onClose={() => onClose(true, "Success", "Score Blocked successfully")}
        action="scoreBlock"
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

export default React.memo(ScoreModal);
