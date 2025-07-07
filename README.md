# Meal Search App

A modern, dark-themed React app for searching and exploring meals, built with Vite. Features a beautiful UI inspired by angular.dev, protected routes, and interactive search powered by [TheMealDB API](https://www.themealdb.com/api.php).

## Features
- **Modern dark theme** with accent colors and accessible UI
- **Search meals** by name or ingredient
- **View meal details** with images, instructions, and ingredients
- **Browse by ingredient**
- **Protected routes** using React Router v6 and context
- **Demo authentication** (see below)
- **Responsive design** for desktop and mobile
- **Reusable components** and maintainable code structure

## Demo Login
> Use the following credentials to log in:
> - **Username:** `user`
> - **Password:** `password`

## Tech Stack
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router v6](https://reactrouter.com/)
- [TheMealDB API](https://www.themealdb.com/api.php)
- [Tailwind CSS](https://tailwindcss.com/) (utility classes)

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up environment variables:**
   - Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` (defaults to `https://www.themealdb.com/api/json/v1/1`)
3. **Run the app:**
   ```bash
   npm run dev
   ```
4. **Open in browser:**
   - Visit [http://localhost:5173](http://localhost:5173)

## Folder Structure
- `src/components/` — Reusable UI components
- `src/views/` — Main pages (Home, Login, MealDetails, etc.)
- `src/context/` — Auth context and protected route logic
- `src/layouts/` — Layout components (Header, Footer, etc.)

## Author
**Brendon Serrano**

---
Feel free to fork, contribute, or use as a starter for your own projects!
