import { NextResponse } from 'next/server';
import data from 'game-score-frontend/data/fake_game_scores_data.json';

interface NewScore {
    playerId: string;
    score: number;
    game: string;
}

export async function POST(request: Request) {
    try {
        const body: NewScore = await request.json();
        const { playerId, score, game } = body;

        if (!playerId || !score || !game) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const playerExists = data.users.some(
            (user) => user.id === playerId
        );

        if (!playerExists) {
            return NextResponse.json(
                { message: "Player not found" },
                { status: 404 }
            );
        }

        const newScore = {
            id: `${Math.random().toString(36).substring(2, 15)}-${Math.random()
                .toString(36)
                .substring(2, 15)}`,
            playerId,
            score,
            game,
            date: new Date().toLocaleString("en-US", { timeZone: "America/Bogota" }),
        };

        return NextResponse.json(
            { message: "Score registered successfully", score: newScore },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );
    }
}
