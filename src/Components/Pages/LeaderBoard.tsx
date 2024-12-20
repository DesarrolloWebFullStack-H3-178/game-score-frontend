import { useEffect, useState } from "react";
import axios from "axios";
interface Score {
    scoreId: string;
    playerId: string;
    score: number;
    game: string;
    isActive: boolean
}

export default function Leaderboard() {

    const [scores, setScores] = useState<Score[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/scores/leaderboard?limit=10&page=5`, {
                    /* headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJpYXQiOjE3Mjg4Njk0MTIsImV4cCI6MTcyODg4MzgxMn0.MaXY4Lr8jpOQ_v-Jf_iSKl9vVXLHhnRSh4t6SvktyFE'
                    } */
                });

                if (response.status === 200) {
                    setScores(response.data.data); // Guarda los scores recibidos
                    console.log(response.data.data);
                }
            } catch (err) {
                setError("Hubo un error al obtener los datos del leaderboard.");
                console.error(err);
            }
        };

        fetchScores();
    }, []);
    
    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-gray-700">
            <div className="mb-4">
                <h1 className="text-green-700">Leaderboard</h1>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {scores.length > 0 ? (
                <table className="table-fixed bg-white p-6 rounded-lg shadow-md max-w-screen-md w-full">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="p-4 border-b">Score Id</th>
                            <th className="p-4 border-b">Player Id</th>
                            <th className="p-4 border-b">Score</th>
                            <th className="p-4 border-b">Game</th>
                            <th className="p-4 border-b">isActive</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map(score => (
                            <tr key={score.scoreId} className="bg-white hover:bg-gray-50 border-b border-dashed">
                                <td className="p-4 text-center">{score.scoreId}</td>
                                <td className="p-4 text-center">{score.playerId}</td>
                                <td className="p-4 text-center">{score.score}</td>
                                <td className="p-4 text-center">{score.game}</td>
                                <td className="p-4 text-center">{score.isActive ? <span className="text-green-600">True</span> : <span className="text-red-600">False</span> }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Cargando scores...</p>
            )}
        </div>
    )
}