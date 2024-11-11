import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCopy  } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

interface ScoreUpdateProps {
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

const ScoreUpdate: React.FC<ScoreUpdateProps> = ({ scoreData, onClose, action }) => {

    const [formData, setFormData] = useState({
      scoreId: '',
      playerId: '',
      score: 0,
      game: '',
      createdAt: '',
      isActive: false,
      });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleScoreEdit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedFormData = {
      ...scoreData,
      ...formData,
      isActive: formData.isActive? true : false
    };

    try {
      const response = await axios.put(`${backendUrl}/scores/admin/${scoreData.scoreId}`, updatedFormData)
      if (response.status === 200 ) {
        onClose(true, "Success", "Score updated successfully");
      }
    } catch (error) {
      console.error(`error editting score ${formData.game}`, error);
      onClose(true, "Error", `error editting score ${updatedFormData.game}`);
    }
  }

  return (
    <form>
            <h2 className="text-lg font-bold mb-4 text-center">
              Edit Score <strong>{scoreData.game}</strong>
              </h2>
              
            <table className="w-full text-left text-gray-700">
              <tbody>
                <tr>
                  <th className="p-2 border-b font-semibold">Score Id:</th>
                  <td className="p-2 border-b">
                    {scoreData.scoreId}
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Player Id:</th>
                  <td className="p-2 border-b">
                  <input type="text" className="bg-transparent" name="playerId" value={formData.playerId || scoreData.playerId} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Score:</th><td className="p-2 border-b">
                  <input type="number" className="bg-transparent" name="score" value={formData.score || scoreData.score} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Game:</th><td className="p-2 border-b">
                  <input type="text" className="bg-transparent" name="game" value={formData.game || scoreData.game} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Created At:</th><td className="p-2 border-b">
                  <input type="datetime-local" className="bg-transparent" name="createdAt"  value={formData.createdAt || formData.createdAt} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <th className="p-2 border-b font-semibold">Is Active?:</th>
                  <td className="p-2 border-b">
                  <select
                    name="isActive"
                    className="p-2 border rounded bg-transparent"
                    value={scoreData.isActive ? "Yes" : "No"}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button className="px-4 p-2 bg-green-500 text-white rounded-lg mx-auto mt-4" onClick={handleScoreEdit}>
                Edit Score
              </button>
            </div>
          </form>
  );
};

export default ScoreUpdate;
