import { useState } from "react";
import { getMovies } from "../api/api";
import useFetch from "../hooks/useFetch";
import MovieGrid from "../components/MovieGrid/MovieGrid";
import SkeletonCard from "../components/Skeleton/SkeletonCard";
import ErrorState from "../components/Error/ErrorState";

export default function Home() {
  const [page, setPage] = useState(1);

  const { data, loading, error, refetch } = useFetch(
    () => getMovies(page),
    [page]
  );

  const movies = data?.data || [];
  const totalPages = data?.last_page || 20;

  return (
    <div className="page-container">
      {loading && (
        <div className="movie-grid">
          {Array.from({ length: 18 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {error && <ErrorState retry={refetch} />}

      {!loading && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} />

          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>

            <span className="page-info">
              Page {page} of 20
            </span>

            <button
              className="page-btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
