import { useState, ChangeEvent } from 'react';
import axios from 'axios';

interface ScoreCreateProps {
    scoreData: {
        playerId: string;
        score: number;
        game: string;
        createdAt: string
    };
    isOpen: boolean;
    onClose: (state: boolean, type?: string, message?: string) => void;
    action: string;
}

const ScoreCreate: React.FC<ScoreCreateProps> = ({ scoreData, isOpen, onClose, action }) => {
    const [formData, setFormData] = useState({
        playerId: scoreData.playerId,
        score: scoreData.score,
        game: scoreData.game,
        isActive: true,
        createdAt: scoreData.createdAt
    });

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleScoreCreate = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const createScoreFormData = {
      ...formData,
      isActive: formData.isActive? true : false
    };

    try {
      const response = await axios.post(`${backendUrl}/scores`, createScoreFormData)
      if (response.status === 201 ) {
        onClose(true, "Success", "Score created successfully");
      }
    } catch (error) {
      console.error(`Error for creation a new user ${createScoreFormData.game}`, error);
      onClose(true, "Error", "Error for creation a new score");
    }
  }

  const getLocalDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() - 5); // UTC-5
    return now.toISOString().slice(0, 16);
  };

  return (
    <form>
      <h2 className="text-lg font-bold mb-4 text-center text-gray-700">
        Create New Score <strong>{scoreData.game}</strong>
      </h2>
      <table className="w-full text-left text-gray-700">
        <tbody>
          <tr>
            <td className="p-4 text-center">
                    <img src={'../../img/image_not_found.jpg'} className="w-12 h-12 rounded-full mx-auto" />
            </td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Player Id:</th>
            <td className="p-2 border-b">
              <input
                type="text"
                className="bg-transparent"
                name="playerId"
                value={formData.playerId}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Score:</th>
            <td className="p-2 border-b">
              <input
                type="number"
                className="bg-transparent"
                name="score"
                value={formData.score}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Game:</th>
            <td className="p-2 border-b">
              <input
                type="text"
                className="bg-transparent"
                name="game"
                value={formData.game}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th className="p-2 border-b font-semibold">Created At:</th><td className="p-2 border-b">
            <input type="datetime-local" className="bg-transparent" name="createdAt"  value={getLocalDateTime()} onChange={handleChange} />
            </td>
          </tr>          
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button type="button" className="px-4 p-2 bg-green-500 text-white rounded-lg mx-auto mt-4" onClick={handleScoreCreate}>
          Create Score
        </button>
      </div>
    </form>
    
  );
};

export default ScoreCreate;
