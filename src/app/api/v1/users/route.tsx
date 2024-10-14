import {NextResponse} from 'next/server';
import data from 'game-score-frontend/data/fake_game_scores_data.json';

export async function GET() {
  return NextResponse.json(data);
}