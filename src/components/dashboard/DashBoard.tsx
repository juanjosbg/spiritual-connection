import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import { CalendarCheck2, Activity } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

export const DashBoard = () => {
  const [activeDays, setActiveDays] = useState(5);
  const [moodData, setMoodData] = useState<number[]>([2, 4, 3, 5, 4, 2, 5]);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Mood Level",
        data: moodData,
        borderColor: "rgba(139, 92, 246, 0.9)",
        backgroundColor: "rgba(167, 139, 250, 0.3)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: [
          "#ef4444",
          "#f59e0b",
          "#10b981",
          "#6366f1",
          "#a855f7",
          "#3b82f6",
          "#22c55e",
        ],
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        display: false,
        min: 0,
        max: 6,
      },
      x: {
        grid: { display: false },
        ticks: { color: "#9ca3af" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1f2937",
        callbacks: {
          label: (context: any) => `Mood Level: ${context.parsed.y}`,
        },
      },
    },
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card className="p-6 rounded-2xl col-span-2 border-0">
        <h2 className="text-xl font-light text-gray-800 mb-4">
          Track Your Daily Mood
        </h2>
        <Line data={data} options={options} />
      </Card>

      <Card className="p-6 hover:shadow-lg flex flex-col justify-between border-0">
        <div className="text-center space-y-2">
          <CalendarCheck2 className="w-7 h-7 mx-auto text-indigo-400" />
          <h3 className="text-lg font-light text-gray-800">Días Activos</h3>
        </div>

        <div className="text-center space-y-2">
          <p className="text-3xl font-semibold text-indigo-500 dark:text-indigo-400 pt-5">
            {activeDays}/7
          </p>
          <p className="text-lg  font-light text-gray-800">Esta semana</p>
        </div>

        <div className="text-center space-y-2">
          <Activity className="w78 h-7 mx-auto text-indigo-400" />
          <h3 className="text-lg  font-light text-gray-800">
            Nivel de Energía -
            <span className="text-lg  font-light text-gray-800"> Alta</span>
          </h3>
        </div>
      </Card>
    </div>
  );
};
