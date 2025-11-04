"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/database/supabaseClient";
import { Card } from "@/components/ui/card";
import { Line, Doughnut } from "react-chartjs-2";
import { CalendarCheck2, Timer, BarChart3 } from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ArcElement
);

export const DashBoard = () => {
  const [activeDays, setActiveDays] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [byCategory, setByCategory] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [weeklyTarget, setWeeklyTarget] = useState(10);
  const [consistency, setConsistency] = useState(0);

  // Fechas base
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1); // lunes
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const formatISO = (date: Date) => date.toISOString().split("T")[0];

  const minutesTarget = 300; // meta semanal en minutos

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id;
      if (!userId) return;

      const { data: activityData } = await supabase
        .from("user_activity")
        .select("activity_date")
        .gte("activity_date", formatISO(weekStart))
        .lte("activity_date", formatISO(weekEnd))
        .eq("user_id", userId);

      const days = new Set(activityData?.map((d) => d.activity_date)).size;
      setActiveDays(days);

      const { data: tasks } = await supabase
        .from("user_tasks")
        .select("id")
        .eq("user_id", userId)
        .eq("status", "completed")
        .gte("completed_at", formatISO(weekStart))
        .lte("completed_at", formatISO(weekEnd));
      setCompletedTasks(tasks?.length ?? 0);

      const { data: mins } = await supabase
        .from("user_tasks")
        .select("minutes")
        .eq("user_id", userId)
        .eq("status", "completed")
        .gte("completed_at", formatISO(weekStart))
        .lte("completed_at", formatISO(weekEnd));
      const totalMin = (mins ?? []).reduce((s, m) => s + (m.minutes || 0), 0);
      setTotalMinutes(totalMin);

      const { data: byCatRaw } = await supabase
        .from("user_tasks")
        .select("category")
        .eq("user_id", userId)
        .eq("status", "completed")
        .gte("completed_at", formatISO(monthStart))
        .lte("completed_at", formatISO(monthEnd));

      const categoryMap: Record<string, number> = {};
      (byCatRaw || []).forEach((item) => {
        const category = item.category || "Sin categoría";
        categoryMap[category] = (categoryMap[category] || 0) + 1;
      });

      const grouped = Object.entries(categoryMap).map(([category, count]) => ({
        category,
        count,
      }));
      setByCategory(grouped);

      const { data: streakData } = await supabase
        .from("user_activity")
        .select("activity_date")
        .eq("user_id", userId)
        .order("activity_date", { ascending: false });

      if (streakData) {
        let current = 0;
        let best = 0;
        let prevDate = new Date();
        for (const entry of streakData) {
          const date = new Date(entry.activity_date);
          const diff =
            (prevDate.getTime() - date.getTime()) / (1000 * 3600 * 24);
          if (diff <= 1.1) {
            current++;
          } else {
            best = Math.max(best, current);
            current = 1;
          }
          prevDate = date;
        }
        best = Math.max(best, current);
        setStreak(current);
        setBestStreak(best);
      }
      setConsistency(Math.round((days / 7) * 100));
    };

    fetchMetrics();
  }, []);

  // 🔹 Gráfico donut de categorías
  const donutData = {
    labels: byCategory.map((c) => c.category),
    datasets: [
      {
        data: byCategory.map((c) => c.count),
        backgroundColor: [
          "#6366f1",
          "#8b5cf6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ],
      },
    ],
  };

  // 🔹 Gráfico línea semanal (dummy)
  const lineData = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    datasets: [
      {
        label: "Actividades",
        data: [2, 3, 4, 2, 5, 1, 3],
        borderColor: "rgba(139, 92, 246, 0.9)",
        backgroundColor: "rgba(167, 139, 250, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 py-5 px-5">
      <div className="col-span-1 space-y-4">
        {/* Streak y consistencia */}
        <Card className="p-6 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Streak actual
              </p>
              <p className="text-3xl font-semibold">🔥 {streak} días</p>
              <p className="text-xs text-gray-400 mt-1">Máximo: {bestStreak}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Consistencia
              </p>
              <p className="text-2xl font-semibold">{consistency}%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded">
              <div
                className="h-2 bg-indigo-500 rounded"
                style={{ width: `${consistency}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Meta semanal */}
        <Card className="p-6 border-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Meta semanal
          </p>
          <p className="text-xl font-semibold">
            {completedTasks}/{weeklyTarget}
          </p>
          <div className="h-2 mt-3 bg-gray-200 dark:bg-gray-700 rounded">
            <div
              className="h-2 bg-emerald-500 rounded"
              style={{
                width: `${Math.min(
                  100,
                  (completedTasks / weeklyTarget) * 100
                )}%`,
              }}
            />
          </div>
        </Card>
      </div>

      <Card className="p-6 col-span-2 border-0">
        <h2 className="text-xl font-light text-gray-800 dark:text-gray-200 mb-4">
          Actividades completadas por día
        </h2>
        {completedTasks > 0 ? (
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false } },
                y: { beginAtZero: true },
              },
            }}
          />
        ) : (
          <p className="text-gray-400 text-sm">No hay datos todavía.</p>
        )}
      </Card>

      <Card className="p-6 border-0">
        <div className="flex flex-row justify-between">
          <div className="flex items-left justify-left gap-2 mb-2">
            <CalendarCheck2 className="w-5 h-5 text-gray-600" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Días activos
            </p>
          </div>

          <p className="text-2xl font-semibold text-gray-900 text-right">
            {activeDays}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-left">
            Meta semanal
          </p>
          <p className="text-xl font-semibold text-left">
            {completedTasks}/{weeklyTarget}
          </p>
          <div className="h-2 mt-3 bg-gray-200 dark:bg-gray-700 rounded">
            <div
              className="h-2 bg-emerald-500 rounded"
              style={{
                width: `${Math.min(
                  100,
                  (completedTasks / weeklyTarget) * 100
                )}%`,
              }}
            />
          </div>
        </div>
      </Card>
      <Card className="p-6 border-0">
        <div className="flex flex-row justify-between items-start">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-gray-600" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Minutos totales
            </p>
          </div>

          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {totalMinutes}
            <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              min
            </span>
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Meta semanal
          </p>
          <p className="text-xl font-semibold">
            {totalMinutes}/{minutesTarget} min
          </p>
          <div className="h-2 mt-3 bg-gray-200 dark:bg-gray-700 rounded">
            <div
              className="h-2 bg-emerald-500 rounded"
              style={{
                width: `${Math.min(
                  100,
                  (totalMinutes / minutesTarget) * 100
                )}%`,
              }}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 border-0">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-gray-600" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Actividades por categoría
          </p>
        </div>
        {byCategory.length > 0 ? (
          <Doughnut data={donutData} />
        ) : (
          <p className="text-gray-400 text-sm text-center">
            No hay datos de categorías aún.
          </p>
        )}
      </Card>
    </div>
  );
};
