/**
 * Login view
 * Demo login form for the app. Only accepts username 'user' and password 'password'.
 *
 * @author Brendon Serrano
 */
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";

/**
 * Login page component
 * Handles demo authentication and redirects after login.
 */
export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  /**
   * Handles form submission and demo login logic.
   * @param {React.FormEvent} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Only allow demo login with user/password
    if (username === "user" && password === "password") {
      login(username);
      navigate(from, { replace: true });
    } else {
      setError("Invalid credentials. Try 'user' and 'password'.");
    }
  };

  return (
    <div className="login-container flex min-h-[60vh] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6"
        style={{ boxShadow: "0 4px 32px 0 rgba(0,0,0,0.45)" }}
        aria-label="Login form">
        <h2 className="text-2xl font-bold text-center text-accent mb-2 tracking-tight">
          Login
        </h2>
        {/* Demo credentials prompt */}
        <p className="text-center text-neutral-400 text-sm mb-2">
          Demo: Use <span className="font-semibold text-neutral-100">user</span>{" "}
          / <span className="font-semibold text-neutral-100">password</span> to
          log in.
        </p>
        {/* Username field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-neutral-300 font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            autoComplete="username"
            className="bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent transition"
            placeholder="Enter your username"
          />
        </div>
        {/* Password field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-neutral-300 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent transition"
            placeholder="Enter your password"
          />
        </div>
        {/* Error message */}
        {error && (
          <div className="text-red-500 text-center text-sm font-semibold">
            {error}
          </div>
        )}
        {/* Submit button */}
        <Button
          type="submit"
          className="mt-2 w-full py-2 text-lg font-semibold">
          Login
        </Button>
      </form>
    </div>
  );
}
