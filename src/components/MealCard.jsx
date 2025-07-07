/**
 * MealCard component
 * Displays a meal card with image, title, short description, and external links.
 * Card is clickable and navigates to meal details. External links (YouTube/Source) are accessible and do not trigger card navigation.
 *
 * @author Brendon Serrano
 */
import { useNavigate } from "react-router-dom";
import Button from "./Button";

/**
 * Renders a single meal card.
 * @param {Object} props
 * @param {Object} props.meal - The meal object to display.
 */
export const MealCard = ({ meal }) => {
  const navigate = useNavigate();

  /**
   * Handles card click, navigates to meal details unless an inner link/button was clicked.
   * @param {React.MouseEvent} e
   */
  const handleCardClick = (e) => {
    // Prevent navigation if a button/link inside is clicked
    if (e.target.closest("a,button")) return;
    navigate(`/meal/${meal.idMeal}`);
  };

  return (
    <div
      className="w-full max-w-xs flex flex-col justify-start mx-auto bg-[var(--color-surface)] rounded-xl shadow-lg overflow-hidden border border-[var(--color-surface)] p-6 mb-6 transition-transform duration-200 hover:shadow-2xl hover:-translate-y-1 group cursor-pointer"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${meal.strMeal}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleCardClick(e);
      }}>
      {/* Meal image */}
      <div className="md:flex-shrink-0">
        <img
          className="h-48 w-full object-cover rounded shadow"
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />
      </div>
      <div className="pt-4 flex-1 flex flex-col">
        {/* Meal title */}
        <h2
          className="text-xl font-semibold text-[var(--color-text)] mb-2 transition-colors duration-150 group-hover:text-[var(--color-primary-dark)] truncate"
          title={meal.strMeal}
          style={{ maxWidth: "100%" }}>
          {meal.strMeal}
        </h2>
        {/* Short description */}
        <p className="text-[var(--color-text-muted)]">
          {meal.strInstructions?.slice(0, 100)}...
        </p>
        {/* External links */}
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
    </div>
  );
};
