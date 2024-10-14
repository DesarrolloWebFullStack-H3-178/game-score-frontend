"use client";
import {useEffect, useState} from "react";
import type { NextPage } from 'next'

interface User {
    id: number;
    playerId: string;
    score: string;
    createdAt: string;
    game: string;
}

const ScorePage : NextPage = () => {
    const [score, setScore] = useState<User[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/scores")
            .then(res => res.json())
            .then(data => {
                setScore(data.scores);
                console.log( data.scores );
                
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-gray-700">
            <div className="mb-4">
                <h1 className="text-green-700 text-2xl font-bold">Scores Page</h1>
            </div>
            <table className="table-fixed bg-white p-6 rounded-lg shadow-md max-w-screen-md w-full">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="p-4 border-b">User Id</th>
                        <th className="p-4 border-b">Score</th>
                        <th className="p-4 border-b">Date</th>
                        <th className="p-4 border-b">Game</th>
                    </tr>
                </thead>
                <tbody>
                    {score.map(scr => (
                        <tr key={scr.id} className="bg-white hover:bg-gray-50 border-b border-dashed">
                            <td className="p-4 text-center">{scr.playerId}</td>
                            <td className="p-4 text-center">{scr.score}</td>
                            <td className="p-4 text-center">{scr.createdAt}</td>
                            <td className="p-4 text-center">{scr.game}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ScorePage;