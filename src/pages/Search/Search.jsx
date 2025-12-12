import { useState, useEffect } from "react";

import SearchBar from "../../components/SearchBar.jsx";
import Filters from "../../components/Filters.jsx";
import MovieGrid from "../../components/MovieGrid.jsx";
import SkeletonCard from "../../components/SkeletonCard.jsx";
import ErrorState from "../../components/ErrorState.jsx";

import useDebounce from "../../hooks/useDebounce";
import { searchMovies } from "../../api/api";

export default function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const [results, setResults] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    rating: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (debouncedQuery.trim() === "") {
        setResults([]);
        setFiltered([]);
        return;
      }

      setLoading(true);

      const res = await searchMovies(debouncedQuery);
      setResults(res.data || []);

      setLoading(false);
    }

    load();
  }, [debouncedQuery]);

  function extractYear(release_date) {
    if (!release_date) return null;
    const match = String(release_date).match(/(\d{4})/);
    return match ? Number(match[1]) : null;
  }

  function yearMatches(release_date, yearFilter) {
    if (!yearFilter) return true;

    const movieYear = extractYear(release_date);
    if (!movieYear) return false;

    if (yearFilter === "before-1970") {
      return movieYear < 1970;
    }

    if (yearFilter.includes("-")) {
      const parts = yearFilter
        .split("-")
        .map((p) => Number(p))
        .filter((n) => !isNaN(n));

      if (parts.length === 2) {
        const [a, b] = parts;
        const start = Math.max(a, b);
        const end = Math.min(a, b);
        return movieYear <= start && movieYear >= end;
      }

      return false;
    }

    const filterYear = Number(yearFilter);
    return !isNaN(filterYear) && movieYear === filterYear;
  }

  useEffect(() => {
    let list = [...results];

    if (filters.genre) {
      list = list.filter((m) => m.genre === filters.genre);
    }

    if (filters.year) {
      list = list.filter((m) => yearMatches(m.release_date, filters.year));
    }

    if (filters.rating) {
      list = list.filter((m) => m.vote_average >= Number(filters.rating));
    }

    setFiltered(list);
  }, [filters, results]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResults((prev) => [...prev]);
    }, 700);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page-container">
      <SearchBar onSearch={setQuery} />
      <Filters onFilterChange={setFilters} />

      {loading && (
        <div className="movie-grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && query.trim() !== "" && (
        <p style={{ color: "#999", padding: "20px" }}>No results found</p>
      )}

      {!loading && filtered.length > 0 && (
        <MovieGrid movies={filtered} />
      )}
    </div>
  );
}
