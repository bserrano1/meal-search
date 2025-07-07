import { useEffect, useRef } from "react";
import Button from "./Button";

const SearchForm = ({search, setSearch, handleSearch}) => {
  const inputRef = useRef(null);

  const onSearch = (e) => {
    e.preventDefault();
    handleSearch(search);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={onSearch}
      className="w-full max-w-2xl mx-auto p-4">
      <div className="flex gap-2">
        <input
          type="search"
          placeholder="Search for meals..."
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-dark)] focus:border-[var(--color-primary-dark)] transition-colors duration-200"
        />
        <Button
          type="submit"
          variant="primary"
          className="px-6 py-2"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
