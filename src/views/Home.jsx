/**
 * Home view
 * Displays the main search and meal browsing interface, including random meals and search results.
 * Handles API calls, search, and error/loading states.
 *
 * @author Brendon Serrano
 */
import { MealCard } from "../components/MealCard";
import MainLayout from "../layouts/MainLayout";
import SearchForm from "../components/SearchForm";
import { useState, useEffect } from "react";

// API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Home page component
 * Fetches and displays random meals or search results.
 */
export default function Home() {
  // State for search input, meals, error, heading, and loading
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");
  const [heading, setHeading] = useState("Random Meals");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetches a single random meal from the API.
   * @returns {Promise<Object|null>} The meal object or null on error.
   */
  const fetchRandomMeal = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/random.php`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.meals[0];
    } catch (error) {
      setError("Failed to fetch random meal. Please try again later.");
      console.error("Error fetching random meal:", error);
      return null;
    }
  };

  /**
   * Fetches multiple random meals for the initial display.
   */
  const fetchRandomMeals = async () => {
    setIsLoading(true);
    setError("");
    try {
      const mealPromises = Array(6)
        .fill()
        .map(() => fetchRandomMeal());
      const randomMeals = await Promise.all(mealPromises);
      const filteredMeals = randomMeals.filter((meal) => meal !== null);
      if (filteredMeals.length === 0) {
        setError("Unable to fetch any meals. Please try again later.");
      }
      setMeals(filteredMeals);
    } catch (error) {
      setError("Failed to fetch meals. Please try again later.");
      console.error("Error fetching initial meals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles search form submission and fetches meals by query.
   * @param {string} query - The search query.
   */
  const handleSearch = async (query) => {
    if (!query) {
      setHeading("Random Meals");
      fetchRandomMeals();
      return;
    }

    setError("");
    setMeals([]);
    setIsLoading(true);
    try {
      const url = `${API_BASE_URL}/search.php?s=${query}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.meals) {
        setError(`No meals found for "${query}"`);
        setMeals([]);
        return;
      }
      setHeading(`Search results for "${query}"`);
      setMeals(data.meals);
    } catch (error) {
      setError("Failed to search meals. Please try again later.");
      console.error("Error searching meals:", error);
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMeals();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8">
        <SearchForm
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
        <h2 className="text-center text-2xl font-semibold text-neutral-100">
          {heading}
        </h2>
        {error && (
          <p className="text-center text-xl font-semibold text-red-500 mb-2">
            {error}
          </p>
        )}
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neutral-100"></div>
          </div>
        ) : (
          <>
            {!error && meals.length === 0 && (
              <p className="text-center text-xl font-semibold text-neutral-100 mb-2">
                No meals found
              </p>
            )}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {meals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
