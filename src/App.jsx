/**
 * App entry point for route definitions.
 * All routes except /login are protected and require authentication.
 *
 * @author Brendon Serrano
 */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Ingredients from "./views/Ingredients";
import MealsByIngredient from "./views/MealsByIngredient";
import MealDetails from "./views/MealDetails";
import Login from "./views/Login";
import ProtectedPage from "./views/ProtectedPage";
import RequireAuth from "./context/RequireAuth";

/**
 * Main App component with route protection.
 */
function App() {
  return (
    <Routes>
      {/* Public login route */}
      <Route path="/login" element={<Login />} />
      {/* Protected routes */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/ingredients"
        element={
          <RequireAuth>
            <Ingredients />
          </RequireAuth>
        }
      />
      <Route
        path="/ingredient/:ingredient"
        element={
          <RequireAuth>
            <MealsByIngredient />
          </RequireAuth>
        }
      />
      <Route
        path="/meal/:id"
        element={
          <RequireAuth>
            <MealDetails />
          </RequireAuth>
        }
      />
      <Route
        path="/protected"
        element={
          <RequireAuth>
            <ProtectedPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
