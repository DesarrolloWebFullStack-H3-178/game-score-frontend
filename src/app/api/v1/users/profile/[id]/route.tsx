import { NextResponse } from 'next/server';
import data from 'game-score-frontend/data/fake_game_scores_data.json';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    if (token !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJpYXQiOjE3Mjg4Njk0MTIsImV4cCI6MTcyODg4MzgxMn0.MaXY4Lr8jpOQ_v-Jf_iSKl9vVXLHhnRSh4t6SvktyFE') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const user = data.users.find(user => user.id === id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    if (token !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJpYXQiOjE3Mjg4Njk0MTIsImV4cCI6MTcyODg4MzgxMn0.MaXY4Lr8jpOQ_v-Jf_iSKl9vVXLHhnRSh4t6SvktyFE') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const userIndex = data.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    data.users[userIndex] = { ...data.users[userIndex], ...body };

    return NextResponse.json(data.users[userIndex], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
