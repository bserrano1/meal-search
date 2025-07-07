/**
 * MealDetails view
 * Displays detailed information for a single meal, including ingredients, instructions, and external links.
 *
 * @author Brendon Serrano
 */
import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Button from "../components/Button";

// API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * MealDetails page component
 * Fetches and displays details for a single meal by ID.
 */
export default function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
        if (!res.ok) throw new Error("Failed to fetch meal details");
        const data = await res.json();
        setMeal(data.meals ? data.meals[0] : null);
      } catch (err) {
        setError("Could not load meal details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  // Extract ingredients and measurements from meal object
  let ingredients = [],
    measurements = [];
  if (meal) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(ingredient);
        measurements.push(measure || "");
      }
    }
  }

  return (
    <MainLayout>
      {loading && <Loading />}
      {error && <p className="text-red-500 text-center mt-8">{error}</p>}
      {!loading && meal && (
        <div className="max-w-2xl mx-auto bg-[var(--color-surface)] rounded-xl shadow-lg p-8 mt-8 border border-[var(--color-surface)]">
          <h1 className="text-3xl font-bold text-center text-[var(--color-text)] mb-4">
            {meal.strMeal}
          </h1>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="mx-auto rounded mb-4 max-h-80 object-cover shadow-lg"
          />
          <div className="flex flex-wrap justify-center gap-8 mb-4 text-[var(--color-text)] text-lg font-medium">
            <div>
              <span className="font-semibold">Category:</span>{" "}
              {meal.strCategory}
            </div>
            <div>
              <span className="font-semibold">Area:</span> {meal.strArea}
            </div>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Ingredients:</span>
            <ul className="list-disc list-inside ml-4">
              {ingredients.map((ingredient, i) => (
                <li key={i} className="text-[var(--color-text)]">
                  {ingredient}{" "}
                  {measurements[i] && (
                    <span className="text-[var(--color-text-muted)]">
                      - {measurements[i]}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Instructions:</span>
            <p className="whitespace-pre-line text-[var(--color-text)] mt-2">
              {meal.strInstructions}
            </p>
          </div>
          <div className="flex gap-4 justify-center mt-6">
            {meal.strYoutube && (
              <Button
                as="a"
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="px-4 py-2">
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
                className="px-4 py-2">
                Source
              </Button>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
}
