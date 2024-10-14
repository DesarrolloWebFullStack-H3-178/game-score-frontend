import { NextResponse } from 'next/server';
import { generarJWT } from 'game-score-frontend/app/helpers/JWTGenerate';
import data from 'game-score-frontend/data/fake_game_scores_data.json';

interface LoginUser {
    email: string;
    password: string;
}

export async function POST(request: Request) {
    try {
        const body: LoginUser = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = data.users.find((user) => user.email === email);

        if (!user || user.password !== password) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        const token = await generarJWT(user.id); 

        return NextResponse.json(
            { message: "Login successful", token },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
