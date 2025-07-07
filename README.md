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
- [Docker](https://www.docker.com/) + [Nginx](https://www.nginx.com/) (for deployment)

## Getting Started (Development)
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

## Docker Deployment

1. **Build the Docker image:**
   ```bash
   docker build -t meal-search-app .
   ```
2. **Run the container:**
   ```bash
   docker run -d -p 8080:80 --name meal-search meal-search-app
   ```
3. **Visit your app:**
   - Open [http://localhost:8080](http://localhost:8080) (or your server's IP)

> The provided `Dockerfile` uses multi-stage builds and Nginx for production-ready static serving. The `nginx.conf` ensures proper SPA routing.

## Folder Structure
- `src/components/` — Reusable UI components
- `src/views/` — Main pages (Home, Login, MealDetails, etc.)
- `src/context/` — Auth context and protected route logic
- `src/layouts/` — Layout components (Header, Footer, etc.)

## Author
**Brendon Serrano**

---
Feel free to fork, contribute, or use as a starter for your own projects!
