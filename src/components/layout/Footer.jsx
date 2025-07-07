// filepath: f:\programming-stuffs\repositories\meal-search\src\components\layout\Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <p className="text-[var(--color-text-muted)] text-sm">
            © {new Date().getFullYear()} Meal Search. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;