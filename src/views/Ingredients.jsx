/**
 * Ingredients view
 * Displays a list of all available ingredients fetched from the API.
 *
 * @author Brendon Serrano
 */
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

// API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Ingredients page component
 * Fetches and displays all ingredients as cards with links.
 */
export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/list.php?i=list`);
        if (!res.ok) throw new Error("Failed to fetch ingredients");
        const data = await res.json();
        setIngredients(data.meals || []);
      } catch (err) {
        setError("Could not load ingredients.");
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-2xl text-center font-bold mb-4 text-[var(--color-text)]">
        Ingredients
      </h1>
      {loading && <Loading />}
      {error && <p className="text-[var(--color-text-muted)]">{error}</p>}
      {!loading && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {ingredients.map((ingredient) => (
            <Link
              key={ingredient.idIngredient}
              to={`/ingredient/${encodeURIComponent(ingredient.strIngredient)}`}
              className="block">
              <Card ingredient={ingredient}>
                <h2 className="font-semibold text-lg mb-2 text-[var(--color-text)] text-center transition-colors duration-150 group-hover:text-[var(--color-primary-dark)]">
                  {ingredient.strIngredient}
                </h2>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </MainLayout>
  );
}
