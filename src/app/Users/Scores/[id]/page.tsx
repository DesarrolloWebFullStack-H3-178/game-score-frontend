"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import type { NextPage } from 'next';

interface Score {
    id: string;
    playerId: string;
    score: number;
    createdAt: string;
    game: string;
}

const UserScoresPage: NextPage = () => {
    const [scores, setScores] = useState<Score[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchScores  = async () => {
            // Obtener el id de la URL
            const playerId = window.location.pathname.split('/').pop(); // Obtener el último segmento de la URL
            
            if (playerId) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/v1/users/scores/${playerId}`, {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJpYXQiOjE3Mjg4Njk0MTIsImV4cCI6MTcyODg4MzgxMn0.MaXY4Lr8jpOQ_v-Jf_iSKl9vVXLHhnRSh4t6SvktyFE'
                        }
                    });

                    if (response.status === 200) {
                        setScores(response.data); // Guarda los *scores* recibidos
                        console.log(response.data);
                    }
                } catch (err) {
                    setError("Hubo un error al obtener los datos del usuario.");
                    console.error(err);
                }
            }
        };

        fetchScores();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-gray-700">
            <div className="mb-4">
                <h1 className="text-green-700">Player Scores</h1>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {scores.length > 0 ? (
                <table className="table-fixed bg-white p-6 rounded-lg shadow-md max-w-screen-md w-full">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="p-4 border-b">Score Id</th>
                            <th className="p-4 border-b">Score</th>
                            <th className="p-4 border-b">Date</th>
                            <th className="p-4 border-b">Game</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map(score => (
                            <tr key={score.id} className="bg-white hover:bg-gray-50 border-b border-dashed">
                                <td className="p-4 text-center">{score.id}</td>
                                <td className="p-4 text-center">{score.score}</td>
                                <td className="p-4 text-center">{new Date(score.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 text-center">{score.game}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Cargando scores...</p>
            )}
        </div>
    );
};

export default UserScoresPage;
