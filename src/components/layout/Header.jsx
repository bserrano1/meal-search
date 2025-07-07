import { NavLink, Link } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
    isActive
      ? "bg-[var(--color-primary-dark)] text-[var(--color-text)] shadow"
      : "text-[var(--color-text)] hover:text-[var(--color-primary)]"
  }`;

const Header = () => {
  return (
    <header>
      <nav className="bg-[var(--color-surface)] border-b border-[var(--color-surface)] fixed w-full z-10 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-2 text-[var(--color-text)] text-xl font-bold hover:text-[var(--color-primary-dark)] transition-colors duration-150"
              >
                <img
                  src="/meal-icon.png"
                  alt="Meal Search Icon"
                  className="h-7 w-7 object-contain"
                />
                <span>Meal Search</span>
              </Link>
            </div>
            <div className="flex space-x-4">
              <NavLink to="/" className={navLinkClass} end>
                Home
              </NavLink>
              <NavLink to="/ingredients" className={navLinkClass}>
                Ingredients
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;