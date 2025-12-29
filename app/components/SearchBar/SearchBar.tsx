import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { Icon } from "~/components/Icon/Icon";

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  initialQuery = "",
  onSearch,
  placeholder = "Search products...",
  className = "",
  autoFocus = false,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (onSearch) {
        onSearch(searchQuery);
      } else if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    },
    [navigate, onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Debounce for live search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (onSearch) {
      debounceRef.current = setTimeout(() => {
        handleSearch(value);
      }, 300);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    handleSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Icon.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-slate-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all"
          aria-label="Search products"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Clear search"
          >
            <Icon.Close className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
    </form>
  );
};
