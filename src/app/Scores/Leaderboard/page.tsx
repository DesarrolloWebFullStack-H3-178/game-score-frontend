"use client";
import React from 'react';
import BestScoresCharts from 'game-score-frontend/Components/Organisms/DataTables/BestScoresComponentOrganism';

const mockScores = [
    {
        "scoreId": "27f744aa-d975-42bd-a64d-57c0e206d003",
        "playerId": "5f638de9-f4ac-4ec0-96c7-cf87b3556d82",
        "score": 12,
        "game": "FIFA",
        "isActive": true,
        "createdAt": "2024-06-10T20:53:13.223Z"
    },
    {
        "scoreId": "7304ed95-dd7a-4d20-bb2a-f5cf7927f4ea",
        "playerId": "02f77295-8a38-4c1f-8bba-d1710a106bc5",
        "score": 88,
        "game": "Final Fantasy",
        "isActive": true,
        "createdAt": "2024-09-03T13:31:23.415Z"
    },
    {
        "scoreId": "b689ed75-b3ff-48f4-9b8c-e7fc29e557a7",
        "playerId": "a9c8955d-19a8-4e02-b78f-6040d0221260",
        "score": 3,
        "game": "Final Fantasy",
        "isActive": true,
        "createdAt": "2024-05-31T10:45:45.582Z"
    },
    {
        "scoreId": "b0c8000c-d891-408a-a5c3-e927e359e6bf",
        "playerId": "ce5a54ae-c0f8-4fc7-bf6f-d7e4600d3650",
        "score": 40,
        "game": "Crash",
        "isActive": true,
        "createdAt": "2024-08-02T12:52:30.650Z"
    },
    {
        "scoreId": "f45957f0-cb4e-4789-85a4-4a80b23334ca",
        "playerId": "19ad4743-2942-4ff4-b458-daf914e97773",
        "score": 81,
        "game": "FIFA",
        "isActive": true,
        "createdAt": "2024-06-16T17:24:21.637Z"
    },
    {
        "scoreId": "c23662b7-2887-4fc0-b652-2c2cf7697be8",
        "playerId": "898062f3-fa76-4d04-b353-a428bcdb131b",
        "score": 15,
        "game": "FIFA",
        "isActive": true,
        "createdAt": "2024-07-14T17:04:05.604Z"
    },
    {
        "scoreId": "1cc53d8a-8b58-4f62-9d9d-9f4055139673",
        "playerId": "9e643834-76d5-47d4-bcf2-6762e26ad32b",
        "score": 120,
        "game": "FIFA",
        "isActive": true,
        "createdAt": "2024-01-24T06:59:20.643Z"
    },
    {
        "scoreId": "aa131cc1-11a2-46ca-bd7f-130bc2fd8368",
        "playerId": "91f56308-a380-4325-8c11-61ec701290ee",
        "score": 5,
        "game": "Call Of Duty",
        "isActive": true,
        "createdAt": "2024-05-12T15:07:02.074Z"
    },
    {
        "scoreId": "64633202-58ae-4af4-a464-7bfe8d1ea8f0",
        "playerId": "287b669f-d140-4780-9c23-4787caaeb675",
        "score": 90,
        "game": "FIFA",
        "isActive": true,
        "createdAt": "2024-09-19T04:39:57.197Z"
    },
    {
        "scoreId": "d07b45cc-18da-4b5d-b0d0-c7f1ce78210f",
        "playerId": "e4207995-e123-473e-8c43-51b32b0e4754",
        "score": 90,
        "game": "FIFA",
        "isActive": true,
        "createdAt": "2024-03-16T20:13:19.655Z"
    }
  ];

const Leaderboard: React.FC = () => {
    return (
        <div className="text-gray-700 w-full">
          <h1 className="text-2xl font-bold mb-4 text-gray-200">Leaderboard de Puntuaciones</h1>
          <div className="p-6 bg-gray-100 min-h-screen">
            <BestScoresCharts scores={mockScores} />
          </div>
        </div>
    );
} 
export default Leaderboard;