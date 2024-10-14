import { NextResponse } from 'next/server';
import data from 'game-score-frontend/data/fake_game_scores_data.json';

export async function DELETE(request: Request, { params }: { params: { playerId: string } }) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    if (token !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJpYXQiOjE3Mjg4Njk0MTIsImV4cCI6MTcyODg4MzgxMn0.MaXY4Lr8jpOQ_v-Jf_iSKl9vVXLHhnRSh4t6SvktyFE') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { playerId } = params;

    // Encontrar el índice del primer score que pertenece al playerId
    const scoreIndex = data.scores.findIndex(score => score.playerId === playerId);

    if (scoreIndex === -1) {
      return NextResponse.json({ message: 'No scores found for this player' }, { status: 404 });
    }

    // Eliminar el score encontrado
    data.scores.splice(scoreIndex, 1);

    return NextResponse.json({ message: 'Score deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
