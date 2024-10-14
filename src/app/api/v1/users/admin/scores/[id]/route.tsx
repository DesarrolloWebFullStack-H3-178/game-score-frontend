import { NextResponse } from 'next/server';
import data from 'game-score-frontend/data/fake_game_scores_data.json';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    if (token !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJpYXQiOjE3Mjg4Njk0MTIsImV4cCI6MTcyODg4MzgxMn0.MaXY4Lr8jpOQ_v-Jf_iSKl9vVXLHhnRSh4t6SvktyFE') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id: playerId } = params;

    if (!playerId) {
      return NextResponse.json({ message: 'No playerId provided in the URL' }, { status: 400 });
    }

    const initialLength = data.scores.length;
    data.scores = data.scores.filter(score => score.playerId !== playerId);
    
    if (data.scores.length === initialLength) {
      return NextResponse.json({ message: `No scores found for playerId: ${playerId}` }, { status: 404 });
    }

    return NextResponse.json({ message: 'Scores deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
