import {NextResponse} from 'next/server';
import data from 'game-score-frontend/data/fake_game_scores_data.json';

interface NewUser {
    name: string;
    username: string;
    email: string;
    password: string;
}

export async function POST(request: Request) {
    try {
        const body: NewUser = await request.json();
        const { name, username, email, password } = body;
    
        /* 201 si el usuario se creó con éxito.
        400 si falta algún campo en el cuerpo de la solicitud.
        409 si el usuario ya existe.
        500 si ocurre un error en el servidor. */

        if (!name || !username || !email || !password) {
          return NextResponse.json(
            { message: "All fields are required" },
            { status: 400 }
          );
        }
    
        const userExists = data.users.some(
          (user) => user.username === username || user.email === email
        );

        if (userExists) {
          return NextResponse.json(
            { message: "User Already Exists" },
            { status: 409 }
          );
        }
    
        const newUser = {
          id: `${Math.random().toString(36).substring(2, 15)}-${Math.random()
            .toString(36)
            .substring(2, 15)}`,
          name,
          username,
          email,
          role: "PLAYER",
          isBlocked: false,
          image: `https://gameScores/${username}Avatar.webp`,
          highScore: 0,
          password: '123'
        };
        return NextResponse.json(
          { message: "User created successfully", user: newUser },
          { status: 201 }
        );
      } catch (error) {
        return NextResponse.json(
          { message: "Server error", error },
          { status: 500 }
        );
      }
    }