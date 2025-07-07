/**
 * ProtectedPage view
 * Example of a protected route that requires authentication.
 *
 * @author Brendon Serrano
 */
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

/**
 * Protected page component
 * Displays a welcome message and logout button for authenticated users.
 */
export default function ProtectedPage() {
  const { user, logout } = useAuth();
  return (
    <div className="protected-container">
      <h2>Protected Page</h2>
      <p>
        Welcome, <b>{user}</b>! You are viewing a protected page.
      </p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
