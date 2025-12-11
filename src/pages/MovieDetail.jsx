import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import { getMovieById, getMovies } from "../api/api";

export default function MovieDetail() {
  const { id } = useParams();
  const location = useLocation();

  const [movie, setMovie] = useState(location.state?.movie || null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(!movie);
  const [showTrailer, setShowTrailer] = useState(false);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useWatchlist();

  const trailerURL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

  // ---------------------------
  // LOAD MAIN MOVIE
  // ---------------------------
  useEffect(() => {
    async function loadMovie() {
      setLoading(true);

      let fetched = movie;
      if (!movie || movie.id != id) {
        fetched = await getMovieById(id);
      }

      setMovie(fetched);
      setLoading(false);
    }

    loadMovie();
  }, [id]);

  // ---------------------------
  // LOAD RELATED MOVIES
  // ---------------------------
  useEffect(() => {
    async function loadRelated() {
      if (!movie) return;

      let all = [];

      // Fetch 5 pages for variety
      for (let p = 1; p <= 5; p++) {
        const res = await getMovies(p);
        all.push(...res.data);
      }

      // Remove current movie
      all = all.filter((m) => m.id !== movie.id);

      // Shuffle randomly
      all.sort(() => Math.random() - 0.5);

      // Pick first 6
      setRelated(all.slice(0, 6));
    }

    loadRelated();
  }, [movie]);

  if (loading || !movie) {
    return <h2 style={{ color: "white", padding: "20px" }}>Loading...</h2>;
  }

  const poster =
    movie.poster_path || "https://via.placeholder.com/400x600?text=No+Image";

  const genres = movie.genres || [movie.genre || "Unknown"];
  const genreStr = genres.join(", ");

  return (
    <div className="movie-detail-container">
      {/* ---------------- HEADER ---------------- */}
      <div className="movie-detail-header">
        <img src={poster} className="movie-detail-poster" alt="" />

        <div className="movie-detail-info">
          <h1>{movie.original_title}</h1>

          <div className="movie-detail-meta">
            <span>⭐ {movie.vote_average}</span>
            <span>Year: {movie.release_date?.slice(-4) || "N/A"}</span>
            <span>Genre: {genreStr}</span>
          </div>

          <p className="movie-detail-overview">{movie.overview}</p>

          {/* WATCHLIST BUTTON */}
          <button
            className="detail-watchlist-btn"
            onClick={() =>
              isInWatchlist(movie.id)
                ? removeFromWatchlist(movie.id)
                : addToWatchlist(movie)
            }
          >
            {isInWatchlist(movie.id)
              ? "Remove from Watchlist"
              : "Add to Watchlist"}
          </button>

          {/* TRAILER BUTTON */}
          <button
            className="trailer-btn"
            onClick={() => setShowTrailer(true)}
          >
            ▶ Watch Trailer
          </button>
        </div>
      </div>

      {/* ---------------- CAST SECTION ---------------- */}
      <h2 className="section-title">Cast</h2>

      <div className="cast-grid">
        {(movie.casts || []).slice(0, 10).map((c) => (
          <div className="cast-card" key={c.id}>
            <img
              src={
                c.profile_path ||
                "https://via.placeholder.com/200x250?text=No+Image"
              }
              className="cast-image"
            />
            <p className="cast-name">{c.name}</p>
            <p className="cast-role">{c.character}</p>
          </div>
        ))}
      </div>

      {/* ---------------- TRAILER MODAL ---------------- */}
      {showTrailer && (
        <div
          className="trailer-modal-overlay"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="trailer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe src={trailerURL} allowFullScreen></iframe>

            <button
              className="close-modal"
              onClick={() => setShowTrailer(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ---------------- RELATED MOVIES ---------------- */}
      <h2 className="section-title">Related Movies</h2>

      <div className="related-grid">
        {related.map((m) => (
          <div className="related-card" key={m.id}>
            <img
              src={
                m.poster_path ||
                "https://via.placeholder.com/300x400?text=No+Image"
              }
              className="related-poster"
            />

            <p className="related-title">{m.original_title}</p>
            <p className="related-rating">⭐ {m.vote_average}</p>

            <div className="related-buttons">
              <Link
                to={`/movie/${m.id}`}
                state={{ movie: m }}
                className="details-btn"
              >
                Details
              </Link>

              <button
                className={`watchlist-btn ${
                  isInWatchlist(m.id) ? "added" : ""
                }`}
                onClick={() =>
                  isInWatchlist(m.id)
                    ? removeFromWatchlist(m.id)
                    : addToWatchlist(m)
                }
              >
                {isInWatchlist(m.id) ? "Remove" : "Watchlist"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
