
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faEye, faLock, faLockOpen, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
// import UserModalComponent from 'game-score-frontend/Components/Molecules/Modals/UserModalComponent';
import ScoreModalComponent from 'game-score-frontend/Components/Molecules/Modals/ScoreModalComponent';
import { useMemo } from 'react';

interface Score {
  scoreId: string;
  userId?: string;
  playerId: string;
  score: number;
  game: string;
  createdAt: string;
  isActive: boolean;
}

export default function ScoresAdmin() {
  const [scores, setScores] = useState<Score[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalScores, setTotalScores] = useState(0);
  const [scoresPerPage] = useState(20);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedScoreId, setSelectedScoreId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [action, setAction] = useState<string | null>(null);

  const [state, setState] = useState(true);
  const [type, setType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const openModal = (scoreId: string, userId: string, action: string) => {
    setSelectedScoreId(scoreId);
    setSelectedUserId(userId);
    setModalOpen(true);
    setAction(action);
  };

  const closeModal = (state: boolean, type?: string, message = "") => {
    setModalOpen(false);
    setSelectedScoreId(null);
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
      const response = await axios.get(`${backendUrl}/scores/admin`, {
        params: {
          limit: scoresPerPage,
          page: page,
        },
      });

      if (response.status === 200) {
        const data = response.data.data || [];
        setScores(data.slice(0, scoresPerPage).reverse());
        setTotalScores(response.data.total);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalScores / scoresPerPage);

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
          <div className={`h-1 mt-2 rounded ${type === 'Success' ? 'bg-green-500' : 'bg-red-500'}`}>
            <div 
            className={`h-full rounded ${type === 'Success' ? 'bg-green-700' : 'bg-red-700'}`}
            style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    
    <div className="flex justify-between mb-6 gap-40">
      <Link href={''} onClick={() => openModal(' ', ' ', 'userCreate')}>
        <button className="bg-fuchsia-600 p-4 text-white rounded-lg w-64 items-center">
          Create New User 
          <FontAwesomeIcon icon={faUserPlus} className="ml-2" />
        </button>
      </Link>
      
      <Link href={''} onClick={() => openModal(' ', ' ', 'scoreCreate')}>
        <button className="bg-green-600 p-4 text-white rounded-lg w-64 items-center">
          Create New Score 
          <FontAwesomeIcon icon={faUserPlus} className="ml-2" />
        </button>
      </Link>
    </div>
        <h1 className="text-gray-200 text-2xl font-bold mb-6">All Scores List</h1>

        <table className="table-fixed bg-white p-6 rounded-lg shadow-md max-w-screen-xl w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="p-4 border-b w-1/5 text-center">Score</th>
            <th className="p-4 border-b w-1/5 text-center">Game</th>
            <th className="p-4 border-b w-52 text-center">Created At</th>
            <th className="p-4 border-b w-1/5 text-center">isActive?</th>
            <th className="p-4 border-b w-1/5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scores.length > 0 ? (
            scores.map(score => (
              <tr key={score.scoreId} className="bg-white hover:bg-gray-50 border-b border-dashed">
                <td className="p-4 text-center">{score.score}</td>
                <td className="p-4 text-center w-52">{score.game}</td>
                <td className="p-4 text-center">{score.createdAt}</td>
                <td className="p-4 text-center">{score.isActive ? 'Yes' : 'No'}</td>
                <td className="p-4 text-center">
                  <Link href='#' onClick={() => openModal(score.scoreId, ' ', 'scoreView')}>
                    <FontAwesomeIcon icon={faEye} className="text-[#11cef0] w-6 h-6 mr-2" />
                  </Link>
                  <Link href={''} onClick={() => openModal(score.scoreId, ' ',  'scoreEdit')}>
                    <FontAwesomeIcon icon={faPenToSquare} className="text-[#2dcf89] w-6 h-6 mr-2" />
                  </Link>
                  <Link href={'#'} onClick={() => openModal(score.scoreId, ' ',  'scoreBlock')}>
                    <FontAwesomeIcon icon={score.isActive ? faLock : faLockOpen} className="text-gray-500 w-6 h-6 mr-2" />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center">No scores found</td>
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

      {/* {(selectedUserId || selectedScoreId) && (
        selectedUserId ? (
          <UserModalComponent 
            userId={selectedUserId} 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            action={memorizedAction || ''} 
          />
        ) : (
          <ScoreModalComponent 
            isOpen={isModalOpen} 
            scoreId={selectedScoreId as string} 
            onClose={closeModal} 
            action={memorizedAction || ''} 
          />
        )
      )} */}
      {(selectedScoreId) && (
        
          <ScoreModalComponent 
            isOpen={isModalOpen} 
            scoreId={selectedScoreId as string} 
            onClose={closeModal} 
            action={memorizedAction || ''} 
          />
        )}
    </div>
  );
}
