import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import useDebounce from "../../hooks/useDebounce";
import { searchMovies } from "../../api/api";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import SkeletonCard from "../../components/Skeleton/SkeletonCard";
import ErrorState from "../../components/Error/ErrorState";

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
      setResults(res.data);

      setLoading(false);
    }

    load();
  }, [debouncedQuery]);


  useEffect(() => {
    let list = [...results];

    if (filters.genre) {
      list = list.filter((m) => m.genre === filters.genre);
    }

    if (filters.year) {
      list = list.filter((m) => {
        if (!m.release_date) return false;
        return Number(m.release_date.slice(0, 4)) === Number(filters.year);
      });
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
          {[...Array(12)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && query.trim() && (
        <p style={{ color: "#999", padding: "20px" }}>No results found</p>
      )}

      {!loading && filtered.length > 0 && (
        <MovieGrid movies={filtered} />
      )}
    </div>
  );
}
