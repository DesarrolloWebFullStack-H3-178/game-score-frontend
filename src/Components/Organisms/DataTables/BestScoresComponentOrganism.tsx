import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Score {
    scoreId: string;
    playerId: string;
    score: number;
    game: string;
    isActive: boolean;
    createdAt: string;
}
  
interface TopScoresChartProps {
scores: Score[];
}

const BestScoresCharts: React.FC<TopScoresChartProps> = ({ scores }) => {

    const sortedScores = scores.sort((a, b) => b.score - a.score).slice(0, 10);
    const chartData = {
        labels: sortedScores.map((score) => `Player: ${score.playerId}`),
        datasets: [
          {
            label: 'Top Score',
            data: sortedScores.map((score) => score.score),
            borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo debajo de la línea
            borderWidth: 2,
            fill: true,
            tension: 0.9,
          },
        ],
      };

      const options = {
        responsive: true,
        type: Line,
        plugins: {
          legend: {
            display: true,
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Best Scores',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Players',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Score',
            },
            beginAtZero: true,
          },
        },
      };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default BestScoresCharts;

