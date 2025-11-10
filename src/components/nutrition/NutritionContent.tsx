"use client";
import { useEffect, useState } from "react";
import { Leaf, PlayCircle } from "lucide-react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
}

interface NutritionContentProps {
  filters: {
    goal: string;
    mealType: string;
    calorieLevel: string;
  };
}

export function NutritionContent({ filters }: NutritionContentProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Mapeo de filtros a consultas
  const getQueryFromFilters = () => {
    const { goal, mealType, calorieLevel } = filters;

    if (goal === "mass") return "chicken";
    if (goal === "weight-loss") return "salad";
    if (goal === "energy") return "rice";
    if (mealType === "vegan") return "vegan";
    if (mealType === "vegetarian") return "vegetarian";
    if (mealType === "low-fat") return "fish";
    if (mealType === "protein") return "beef";
    if (calorieLevel === "low") return "fruit";
    if (calorieLevel === "high") return "pasta";
    return ""; // <- sin filtros = carga general
  };

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const query = getQueryFromFilters();

      const url = query
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        : "https://www.themealdb.com/api/json/v1/1/search.php?s=a"; 

      const res = await fetch(url);
      const data = await res.json();

      if (data.meals && data.meals.length > 0) {
        setMeals(data.meals.slice(0, 12)); 
      } else {
        const backup = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken");
        const backupData = await backup.json();
        setMeals(backupData.meals.slice(0, 12));
      }

      setLoading(false);
    };

    fetchMeals();
  }, [filters]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#f4eae0] animate-fade-in rounded-xl">
        <img
          src="/images/meditation-load.jpg"
          alt="Cargando nutrición"
          className="w-48 h-auto mb-6 animate-float"
        />
        <p className="text-gray-700 font-medium">Cargando recetas saludables...</p>
      </div>
    );

  return (
    <div className="p-6 md:p-8 bg-white rounded-3xl shadow-md animate-scale-in">
      <h1 className="text-3xl font-light text-[#4b6043] mb-8 flex items-center gap-2">
        <Leaf className="w-7 h-7 text-green-600" />
        Recetas y nutrición saludable
      </h1>

      {meals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all animate-scale-in"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-60 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#4b6043] mb-2">
                  {meal.strMeal}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  {meal.strCategory} — {meal.strArea}
                </p>
                <p className="text-gray-500 text-sm mb-3 line-clamp-3">
                  {meal.strInstructions}
                </p>
                {meal.strYoutube && (
                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-600 font-medium hover:underline"
                  >
                    <PlayCircle className="w-5 h-5" /> Ver video
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No se encontraron resultados para los filtros seleccionados 🥗
        </p>
      )}
    </div>
  );
}
