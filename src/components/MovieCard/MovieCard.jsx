import { Link } from "react-router-dom";
import { useWatchlist } from "../../context/WatchlistContext";

export default function MovieCard({ movie }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const added = isInWatchlist(movie.id);

  const poster =
    movie.poster_path || "https://via.placeholder.com/300x450?text=No+Image";

  const genre = movie.genre || movie.genres?.[0] || "Unknown";

  const year = movie.release_date
    ? movie.release_date.slice(11,16)
    : "Unknown";

  return (
    <div className="movie-card">
      <div className="poster-wrapper">
        <img src={poster} alt={movie.original_title} className="movie-poster" />
      </div>

      <h3 className="movie-title">{movie.original_title}</h3>

      <div className="movie-meta-row">
        <span className="movie-genre">{genre}</span>
        <span className="movie-year">{year}</span>
        <span className="movie-rating">⭐ {movie.vote_average}</span>
      </div>

      <div className="movie-buttons">
        <Link
          to={`/movie/${movie.id}`}
          state={{ movie }}
          className="details-btn"
        >
          Details
        </Link>

        <button
          className={`watchlist-btn ${added ? "added" : ""}`}
          onClick={() =>
            added ? removeFromWatchlist(movie.id) : addToWatchlist(movie)
          }
        >
          {added ? "Added ✓" : "Watchlist"}
        </button>
      </div>
    </div>
  );
}
