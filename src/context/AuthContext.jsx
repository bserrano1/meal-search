/**
 * Authentication context and provider for the app.
 * Provides login/logout logic and user state to consumers.
 *
 * @author Brendon Serrano
 */
import { createContext, useContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

/**
 * AuthProvider wraps children with authentication context.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function AuthProvider({ children }) {
  // User state (null if not logged in)
  const [user, setUser] = useState(null);

  /**
   * Logs in a user (demo: just sets user state)
   * @param {string} userData
   */
  const login = (userData) => setUser(userData);
  /**
   * Logs out the user
   */
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access authentication context.
 */
export function useAuth() {
  return useContext(AuthContext);
}
