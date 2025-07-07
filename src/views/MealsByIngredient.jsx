/**
 * MealsByIngredient view
 * Displays all meals that use a specific ingredient, with navigation to meal details.
 *
 * @author Brendon Serrano
 */
import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

// API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * MealsByIngredient page component
 * Fetches and displays all meals for a given ingredient.
 */
export default function MealsByIngredient() {
  const { ingredient } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      setError("");
      try {
        // Always encode the ingredient name for the API call
        const res = await fetch(
          `${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
        );
        if (!res.ok) throw new Error("Failed to fetch meals");
        const data = await res.json();
        // Fetch full meal details for each meal
        const mealsWithDetails = await Promise.all(
          (data.meals || []).map(async (meal) => {
            const detailRes = await fetch(
              `${API_BASE_URL}/lookup.php?i=${meal.idMeal}`
            );
            if (!detailRes.ok) return meal;
            const detailData = await detailRes.json();
            return detailData.meals ? detailData.meals[0] : meal;
          })
        );
        setMeals(mealsWithDetails);
      } catch (err) {
        setError("Could not load meals.");
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [ingredient]);

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Meals with {ingredient}
      </h1>
      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${meal.strMeal}`}
              onClick={() => navigate(`/meal/${meal.idMeal}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(`/meal/${meal.idMeal}`);
                }
              }}
              className="block group w-full max-w-xs flex flex-col justify-start mx-auto bg-[var(--color-surface)] rounded-xl shadow-lg overflow-hidden border border-[var(--color-surface)] p-6 mb-6 transition-transform duration-200 hover:shadow-2xl hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-dark)]">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h2
                className="font-semibold text-lg text-[var(--color-text)] text-center transition-colors duration-150 group-hover:text-[var(--color-primary-dark)] mb-2 truncate"
                title={meal.strMeal}
                style={{ maxWidth: "100%" }}>
                {meal.strMeal}
              </h2>
              <div className="flex gap-2 justify-center mt-2">
                {meal.strYoutube && (
                  <Button
                    as="a"
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    className="px-3 py-1"
                    onClick={(e) => e.stopPropagation()}
                    tabIndex={0}>
                    YouTube
                  </Button>
                )}
                {meal.strSource && (
                  <Button
                    as="a"
                    href={meal.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="accent"
                    className="px-3 py-1"
                    onClick={(e) => e.stopPropagation()}
                    tabIndex={0}>
                    Source
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
}
