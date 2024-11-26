import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy  } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

interface ScoreBlockProps {
  scoreData: {
    scoreId: string;
    playerId: string;
    score: number;
    game: string;
    createdAt: string;
    isActive: boolean;
  };
  isOpen: boolean;
  onClose: (state: boolean, type?: string, message?: string) => void;
  action: string;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const ScoreBlock: React.FC<ScoreBlockProps> = ({ scoreData, onClose }) => {
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

    const handleScoreBlock = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
          const response = await axios.patch(`${backendUrl}/scores/admin/${scoreData.scoreId}`);
          if (response.status === 200) {
            onClose(true, "Success", "Score Status has been modified" );
          }
        } catch (error) {
          console.error(`error in alter status for score ${scoreData.game}`, error);
          onClose(true, "Error", `error in alter status for user ${scoreData.game}`);
        }
      }

  return (
    <>
      <h2 className="text-lg font-bold mb-4 text-center">
        <small>Score</small> <strong>{scoreData.game}</strong> <small>Details</small>
      </h2>
      <table className="w-full text-left text-gray-700">
        <tbody>
          <tr>
            <th className="p-2 border-b font-semibold">Id:</th>
            <td className="p-2 border-b flex items-center">
                    {scoreData.scoreId}
                    <button
                      className="ml-2 text-green-500 hover:text-green-700"
                      onClick={() => handleCopyToClipboard(scoreData.scoreId)}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                    {copied && <span className="ml-2 text-green-500">Copied!</span>}
                  </td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Player Id:</th>
            <td className="p-2 border-b">{scoreData.playerId}</td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Score:</th>
            <td className="p-2 border-b">{scoreData.score}</td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Game:</th>
            <td className="p-2 border-b">{scoreData.game}</td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Created At:</th>
            <td className="p-2 border-b">{scoreData.createdAt}</td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">isActive:</th>
            <td className="p-2 border-b">{scoreData.isActive ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>
        <div className="flex justify-center mt-4">
        <button className="px-4 p-2 bg-purple-600 text-white rounded-lg mx-auto mt-4" onClick={handleScoreBlock}>
            {scoreData.isActive ? "Block Score" : "UnBlock Score"}
        </button>
      </div>
    </>
  );
};

export default ScoreBlock;
