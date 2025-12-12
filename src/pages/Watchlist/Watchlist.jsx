import { Link } from "react-router-dom";
import { useWatchlist } from "../../context/WatchlistContext.jsx";

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="page">
      <h2 className="section-title">Your Watchlist</h2>

      {watchlist.length === 0 ? (
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1.1rem",
            padding: "20px",
          }}
        >
          Your watchlist is empty.
        </p>
      ) : (
        <div className="movie-grid">
          {watchlist.map((movie) => {
            const poster =
              movie.poster_path ||
              "https://via.placeholder.com/300x450?text=No+Image";

            const genre = movie.genre || movie.genres?.[0] || "Drama";

            return (
              <div className="movie-card" key={movie.id}>
                <div className="poster-wrapper">
                  <img
                    src={poster}
                    alt={movie.original_title}
                    className="movie-poster"
                  />
                </div>

                <div className="movie-info">
                  <h3 className="movie-title">{movie.original_title}</h3>

                  <div className="movie-meta-row">
                    <span>{genre}</span>
                    <span className="movie-rating">
                      ⭐ {movie.vote_average}
                    </span>
                  </div>
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
                    className="watchlist-btn"
                    style={{ background: "#ff4b4b", color: "#fff" }}
                    onClick={() => removeFromWatchlist(movie.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
